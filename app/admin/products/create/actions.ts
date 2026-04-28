"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/admin-session";
import { uploadProductImage } from "@/lib/product-image-upload";
import {
  extractProductFormData,
  type ProductFormErrors,
  validateProductFields,
  validateProductImageInput,
} from "@/lib/product-validation";
import { prisma } from "@/lib/prisma";

export type CreateProductFormState = {
  error?: string;
  fieldErrors?: ProductFormErrors;
};

function createBaseSlug(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "produk";
}

async function createUniqueSlug(name: string) {
  const baseSlug = createBaseSlug(name);
  let slug = baseSlug;
  let suffix = 2;

  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

function productRedirectUrl(type: "success" | "error", message: string) {
  const params = new URLSearchParams({ [type]: message });
  const pathname =
    type === "error" ? "/admin/products/create" : "/admin/products";

  return `${pathname}?${params.toString()}`;
}

export async function createProduct(
  _previousState: CreateProductFormState,
  formData: FormData,
): Promise<CreateProductFormState> {
  await requireAdminSession();
  let redirectUrl = productRedirectUrl("success", "Product created successfully");
  let phase: "validation" | "upload" | "database" = "validation";

  try {
    const rawData = extractProductFormData(formData);
    const fieldsValidation = validateProductFields(rawData);

    if (!fieldsValidation.success) {
      redirectUrl = productRedirectUrl("error", fieldsValidation.error);
      throw new Error(fieldsValidation.error);
    }

    const imageValidation = validateProductImageInput(rawData.image, {
      required: true,
    });

    if (!imageValidation.success) {
      redirectUrl = productRedirectUrl("error", imageValidation.message);
      throw new Error(imageValidation.message);
    }

    if (!imageValidation.file) {
      redirectUrl = productRedirectUrl(
        "error",
        "Pilih gambar produk terlebih dahulu.",
      );
      throw new Error("Validated create image is missing.");
    }

    const product = fieldsValidation.data;
    phase = "database";
    const slug = await createUniqueSlug(product.name);
    phase = "upload";
    const imagePath = await uploadProductImage(imageValidation.file, slug);

    phase = "database";
    await prisma.product.create({
      data: {
        slug,
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        highlights: product.highlights,
        image: imagePath,
        availability: product.availability,
        badge: product.badge,
        portion: product.portion,
        philosophy: product.philosophy,
        ingredients: product.ingredients,
        storageTip: product.storageTip,
        imageNote: product.imageNote,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to create product.", error);

    if (!redirectUrl.includes("?error=")) {
      const message =
        phase === "upload" && error instanceof Error
          ? error.message
          : "Failed to create product";

      redirectUrl = productRedirectUrl("error", message);
    }
  }

  redirect(redirectUrl);
}
