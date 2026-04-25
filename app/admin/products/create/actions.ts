"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export type CreateProductFormState = {
  error?: string;
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Map([
  ["image/jpeg", true],
  ["image/png", true],
  ["image/webp", true],
]);

type CloudinaryUploadResponse = {
  secure_url?: string;
  error?: {
    message?: string;
  };
};

function getRequiredString(formData: FormData, name: string) {
  const value = formData.get(name);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error("Lengkapi semua field wajib sebelum menerbitkan produk.");
  }

  return value.trim();
}

function getStringList(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);
}

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

function parsePrice(value: string) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue < 0) {
    throw new Error("Harga harus berupa angka valid.");
  }

  return Math.round(numericValue);
}

function parseStock(value: string) {
  const numericValue = Number(value);

  if (!Number.isInteger(numericValue) || numericValue < 0) {
    throw new Error("Stok harus berupa angka bulat minimal 0.");
  }

  return numericValue;
}

async function saveProductImage(file: File, slug: string) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Format gambar harus PNG, JPG, atau WebP.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Ukuran gambar maksimal 5MB.");
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Konfigurasi Cloudinary belum lengkap.");
  }

  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", uploadPreset);
  uploadData.append("folder", "products/image");
  uploadData.append("public_id", `${slug}-${Date.now()}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: uploadData,
    },
  );
  const result = (await response.json()) as CloudinaryUploadResponse;

  if (!response.ok || !result.secure_url) {
    throw new Error(
      result.error?.message ?? "Upload gambar ke Cloudinary gagal.",
    );
  }

  return result.secure_url;
}

export async function createProduct(
  _previousState: CreateProductFormState,
  formData: FormData,
): Promise<CreateProductFormState> {
  await requireAdminSession();

  try {
    const name = getRequiredString(formData, "name");
    const slug = await createUniqueSlug(name);
    const image = formData.get("image");

    if (!(image instanceof File) || image.size === 0) {
      throw new Error("Pilih gambar produk terlebih dahulu.");
    }

    const highlights = getStringList(formData, "highlights");
    const ingredients = getStringList(formData, "ingredients");

    if (highlights.length === 0) {
      throw new Error("Tambahkan minimal satu keunggulan produk.");
    }

    if (ingredients.length === 0) {
      throw new Error("Tambahkan minimal satu bahan produk.");
    }

    const imagePath = await saveProductImage(image, slug);

    await prisma.product.create({
      data: {
        slug,
        name,
        price: parsePrice(getRequiredString(formData, "price")),
        stock: parseStock(getRequiredString(formData, "stock")),
        description: getRequiredString(formData, "description"),
        highlights,
        image: imagePath,
        availability: formData.get("availability") === "true",
        badge: getRequiredString(formData, "badge"),
        portion: getRequiredString(formData, "portion"),
        philosophy: getRequiredString(formData, "philosophy"),
        ingredients,
        storageTip: getRequiredString(formData, "storageTip"),
        imageNote: getRequiredString(formData, "imageNote"),
      },
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Produk gagal dibuat. Periksa kembali data produk.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}
