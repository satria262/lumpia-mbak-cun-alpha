"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export type TestimonialFormState = {
  status?: "success" | "error";
  message?: string;
  redirectTo?: string;
  timestamp?: number;
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

function getAvatarFile(formData: FormData) {
  const avatar = formData.get("userAvatar");

  if (!(avatar instanceof File) || avatar.size === 0) {
    return null;
  }

  return avatar;
}

async function getRequiredAvatar(formData: FormData, userName: string) {
  const avatar = getAvatarFile(formData);

  if (!avatar) {
    throw new Error("Avatar pelanggan wajib diunggah.");
  }

  return uploadAvatar(avatar, userName);
}

async function getTestimonialAvatar(
  formData: FormData,
  userName: string,
  existingAvatar?: string | null,
) {
  const avatar = getAvatarFile(formData);

  if (avatar) {
    return uploadAvatar(avatar, userName);
  }

  const currentAvatar = existingAvatar?.trim();

  if (!currentAvatar) {
    throw new Error("Avatar pelanggan wajib diunggah.");
  }

  return currentAvatar;
}

function actionState(
  status: "success" | "error",
  message: string,
  redirectTo?: string,
): TestimonialFormState {
  return {
    status,
    message,
    redirectTo,
    timestamp: Date.now(),
  };
}

export async function createTestimonial(
  _previousState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  await requireAdminSession();
  let phase: "validation" | "upload" | "database" = "validation";

  try {
    const testimonial = getRequiredString(formData, "testimonial");
    const userName = getRequiredString(formData, "userName");
    const userOccupation = getRequiredString(formData, "userOccupation");
    phase = "upload";
    const userAvatar = await getRequiredAvatar(formData, userName);

    phase = "database";
    await prisma.testimonial.create({
      data: {
        testimonial,
        userName,
        userOccupation,
        userAvatar,
      },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return actionState(
      "success",
      "Testimonial created",
      "/admin/testimonials",
    );
  } catch (error) {
    console.error("Failed to create testimonial.", error);
    const message =
      (phase === "validation" || phase === "upload") && error instanceof Error
        ? error.message
        : "Failed to create testimonial";
    return actionState("error", message);
  }
}

export async function updateTestimonial(
  testimonialId: number,
  _previousState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  await requireAdminSession();
  let phase: "validation" | "lookup" | "upload" | "database" = "validation";

  try {
    if (!Number.isInteger(testimonialId)) {
      throw new Error("Invalid testimonial id.");
    }

    const testimonial = getRequiredString(formData, "testimonial");
    const userName = getRequiredString(formData, "userName");
    const userOccupation = getRequiredString(formData, "userOccupation");

    phase = "lookup";
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
      select: { id: true, userAvatar: true },
    });

    if (!existingTestimonial) {
      throw new Error(`Testimonial ${testimonialId} not found.`);
    }

    phase = "upload";
    const userAvatar = await getTestimonialAvatar(
      formData,
      userName,
      existingTestimonial.userAvatar,
    );

    phase = "database";
    await prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        testimonial,
        userName,
        userOccupation,
        userAvatar,
      },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return actionState(
      "success",
      "Testimonial updated",
      "/admin/testimonials",
    );
  } catch (error) {
    console.error("Failed to update testimonial.", error);
    const message =
      (phase === "validation" || phase === "upload") && error instanceof Error
        ? error.message
        : "Failed to update testimonial";
    return actionState("error", message);
  }
}

export async function deleteTestimonial(
  _previousState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  await requireAdminSession();

  try {
    const testimonialId = Number(formData.get("testimonialId"));

    if (!Number.isInteger(testimonialId)) {
      throw new Error("Invalid testimonial id.");
    }

    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
      select: { id: true },
    });

    if (!existingTestimonial) {
      throw new Error(`Testimonial ${testimonialId} not found.`);
    }

    await prisma.testimonial.delete({
      where: { id: testimonialId },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return actionState("success", "Testimonial deleted");
  } catch (error) {
    console.error("Failed to delete testimonial.", error);
    return actionState("error", "Failed to delete testimonial");
  }
}
