import imageCompression from "browser-image-compression";

const MAX_INPUT_SIZE = 9 * 1024 * 1024;
const TARGET_MAX_SIZE_MB = 0.45;
const MAX_DIMENSION = 800;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const testimonialImageLimits = {
  maxInputSize: MAX_INPUT_SIZE,
  allowedTypes: ALLOWED_TYPES,
};

export function validateTestimonialImage(file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Format gambar tidak didukung";
  }

  if (file.size > MAX_INPUT_SIZE) {
    return "Gambar terlalu besar";
  }

  return "";
}

export async function compressTestimonialImage(file: File) {
  const validationError = validateTestimonialImage(file);

  if (validationError) {
    throw new Error(validationError);
  }

  if (file.size <= 500 * 1024) {
    return file;
  }

  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: TARGET_MAX_SIZE_MB,
      maxWidthOrHeight: MAX_DIMENSION,
      useWebWorker: true,
      fileType: "image/webp",
      initialQuality: 0.82,
      alwaysKeepResolution: false,
    });

    return new File([compressed], replaceExtension(file.name, "webp"), {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch {
    throw new Error("Gagal mengompres gambar");
  }
}

function replaceExtension(fileName: string, extension: string) {
  const safeName = fileName.trim() || "testimonial-avatar";
  const baseName = safeName.replace(/\.[^.]+$/, "");

  return `${baseName}.${extension}`;
}
