"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export type TestimonialFormState = {
  error?: string;
};

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type CloudinaryUploadResponse = {
  secure_url?: string;
  error?: {
    message?: string;
  };
};

function getRequiredString(formData: FormData, name: string) {
  const value = formData.get(name);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error("Lengkapi semua field wajib sebelum menyimpan testimoni.");
  }

  return value.trim();
}

async function uploadAvatar(file: File, userName: string) {
  if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
    throw new Error("Format avatar harus PNG, JPG, atau WebP.");
  }

  if (file.size > MAX_AVATAR_SIZE) {
    throw new Error("Ukuran avatar maksimal 5MB.");
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Konfigurasi Cloudinary belum lengkap.");
  }

  const safeName = userName
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", uploadPreset);
  uploadData.append("folder", "testimonials/avatar");
  uploadData.append("public_id", `${safeName || "testimonial"}-${Date.now()}`);

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
      result.error?.message ?? "Upload avatar ke Cloudinary gagal.",
    );
  }

  return result.secure_url;
}

async function getOptionalAvatar(formData: FormData, userName: string) {
  const avatar = formData.get("userAvatar");

  if (!(avatar instanceof File) || avatar.size === 0) {
    return "";
  }

  return uploadAvatar(avatar, userName);
}

export async function createTestimonial(
  _previousState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  await requireAdminSession();

  try {
    const userName = getRequiredString(formData, "userName");

    await prisma.testimonial.create({
      data: {
        testimonial: getRequiredString(formData, "testimonial"),
        userName,
        userOccupation: getRequiredString(formData, "userOccupation"),
        userAvatar: await getOptionalAvatar(formData, userName),
      },
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Testimoni gagal dibuat. Periksa kembali datanya.",
    };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  testimonialId: number,
  _previousState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  await requireAdminSession();

  const existingTestimonial = await prisma.testimonial.findUnique({
    where: { id: testimonialId },
    select: { id: true, userAvatar: true },
  });

  if (!existingTestimonial) {
    notFound();
  }

  try {
    const userName = getRequiredString(formData, "userName");
    const newAvatar = await getOptionalAvatar(formData, userName);

    await prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        testimonial: getRequiredString(formData, "testimonial"),
        userName,
        userOccupation: getRequiredString(formData, "userOccupation"),
        userAvatar: newAvatar || existingTestimonial.userAvatar,
      },
    });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Testimoni gagal diperbarui. Periksa kembali datanya.",
    };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdminSession();

  const testimonialId = Number(formData.get("testimonialId"));

  if (!Number.isInteger(testimonialId)) {
    throw new Error("Testimoni tidak valid.");
  }

  await prisma.testimonial.delete({
    where: { id: testimonialId },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}
