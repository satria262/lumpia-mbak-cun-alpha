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

export type EditProductFormState = {
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

async function createUniqueSlug(name: string, productId: number) {
  const baseSlug = createBaseSlug(name);
  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existingProduct || existingProduct.id === productId) {
      return slug;
    }

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

function productRedirectUrl(
  productId: number,
  type: "success" | "error",
  message: string,
) {
  const params = new URLSearchParams({ [type]: message });

  if (type === "error") {
    return `/admin/products/${productId}/edit?${params.toString()}`;
  }

  return `/admin/products?${params.toString()}`;
}

export async function updateProduct(
  productId: number,
  _previousState: EditProductFormState,
  formData: FormData,
): Promise<EditProductFormState> {
  await requireAdminSession();
  const fallbackErrorPath = Number.isInteger(productId)
    ? `/admin/products/${productId}/edit`
    : "/admin/products";
  let redirectUrl = productRedirectUrl(
    productId,
    "success",
    "Product updated successfully",
  );
  let phase: "validation" | "lookup" | "upload" | "database" = "validation";

  try {
    if (!Number.isInteger(productId)) {
      redirectUrl = `${fallbackErrorPath}?${new URLSearchParams({
        error: "Invalid product",
      }).toString()}`;
      throw new Error("Invalid product id.");
    }

    const rawData = extractProductFormData(formData);
    const fieldsValidation = validateProductFields(rawData);

    if (!fieldsValidation.success) {
      redirectUrl = productRedirectUrl(
        productId,
        "error",
        fieldsValidation.error,
      );
      throw new Error(fieldsValidation.error);
    }

    phase = "lookup";
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, slug: true, image: true },
    });

    if (!existingProduct) {
      redirectUrl = productRedirectUrl(productId, "error", "Product not found");
      throw new Error(`Product ${productId} not found.`);
    }

    const imageValidation = validateProductImageInput(rawData.image, {
      required: !existingProduct.image,
    });

    if (!imageValidation.success) {
      redirectUrl = productRedirectUrl(
        productId,
        "error",
        imageValidation.message,
      );
      throw new Error(imageValidation.message);
    }

    const product = fieldsValidation.data;
    phase = "database";
    const slug = await createUniqueSlug(product.name, productId);
    phase = imageValidation.file ? "upload" : "database";
    const imagePath = imageValidation.file
      ? await uploadProductImage(imageValidation.file, slug)
      : existingProduct.image;

    phase = "database";
    await prisma.product.update({
      where: { id: productId },
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
    revalidatePath(`/products/${existingProduct.slug}`);
    revalidatePath(`/products/${slug}`);
  } catch (error) {
    console.error("Failed to update product.", error);

    if (!redirectUrl.includes("?error=")) {
      const message =
        phase === "upload" && error instanceof Error
          ? error.message
          : "Failed to update product";

      redirectUrl = productRedirectUrl(
        productId,
        "error",
        message,
      );
    }
  }

  redirect(redirectUrl);
}
