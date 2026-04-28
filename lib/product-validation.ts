import { z } from "zod";

export const MAX_PRODUCT_IMAGE_SIZE_MB = 8;
export const MAX_PRODUCT_IMAGE_SIZE = MAX_PRODUCT_IMAGE_SIZE_MB * 1024 * 1024;
export const PRODUCT_IMAGE_SIZE_LABEL = `${MAX_PRODUCT_IMAGE_SIZE_MB}MB`;

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);
const allowedImageExtensions = new Set(["jpg", "jpeg", "png", "webp"]);

export type ProductFormField =
  | "name"
  | "price"
  | "stock"
  | "description"
  | "highlights"
  | "image"
  | "badge"
  | "portion"
  | "philosophy"
  | "ingredients"
  | "storageTip"
  | "imageNote";

export type ProductFormErrors = Partial<Record<ProductFormField, string>>;

export type RawProductFormData = {
  name: FormDataEntryValue | null;
  price: FormDataEntryValue | null;
  stock: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  highlights: FormDataEntryValue[];
  image: FormDataEntryValue | null;
  availability: boolean;
  badge: FormDataEntryValue | null;
  portion: FormDataEntryValue | null;
  philosophy: FormDataEntryValue | null;
  ingredients: FormDataEntryValue[];
  storageTip: FormDataEntryValue | null;
  imageNote: FormDataEntryValue | null;
};

export type ProductFieldsData = {
  name: string;
  price: number;
  stock: number;
  description: string;
  highlights: string[];
  availability: boolean;
  badge: string;
  portion: string;
  philosophy: string;
  ingredients: string[];
  storageTip: string;
  imageNote: string;
};

export type ProductFieldsValidationResult =
  | { success: true; data: ProductFieldsData }
  | {
      success: false;
      error: string;
      fieldErrors: ProductFormErrors;
    };

export type ProductImageValidationResult =
  | { success: true; file?: File }
  | { success: false; message: string };

const requiredText = (label: string) =>
  z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : value),
    z.string().min(1, `${label} wajib diisi.`),
  );

const integerText = (label: string) =>
  requiredText(label)
    .refine((value) => Number.isFinite(Number(value)), {
      message: `${label} harus berupa angka valid.`,
    })
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value), {
      message: `${label} harus berupa angka bulat.`,
    })
    .refine((value) => value >= 0, {
      message: `${label} minimal 0.`,
    });

const requiredList = (label: string) =>
  z
    .array(z.unknown())
    .transform((values) =>
      values
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter((value) => value.length > 0),
    )
    .refine((values) => values.length > 0, {
      message: `Tambahkan minimal satu ${label}.`,
    });

const productFieldsSchema = z.object({
  name: requiredText("Nama produk"),
  price: integerText("Harga"),
  stock: integerText("Stok"),
  description: requiredText("Deskripsi"),
  highlights: requiredList("keunggulan produk"),
  availability: z.boolean(),
  badge: requiredText("Badge"),
  portion: requiredText("Porsi"),
  philosophy: requiredText("Filosofi & cerita"),
  ingredients: requiredList("bahan produk"),
  storageTip: requiredText("Tips penyimpanan"),
  imageNote: requiredText("Catatan gambar"),
});

function firstFieldError(errors: string[] | undefined) {
  return errors?.[0];
}

function firstProductError(fieldErrors: ProductFormErrors) {
  return (
    fieldErrors.name ??
    fieldErrors.price ??
    fieldErrors.stock ??
    fieldErrors.description ??
    fieldErrors.highlights ??
    fieldErrors.badge ??
    fieldErrors.portion ??
    fieldErrors.philosophy ??
    fieldErrors.ingredients ??
    fieldErrors.storageTip ??
    fieldErrors.imageNote ??
    "Invalid product data"
  );
}

function isUploadedFile(value: unknown): value is File {
  return value instanceof File && value.size > 0;
}

function getFileExtension(file: File) {
  return file.name.split(".").pop()?.toLowerCase() ?? "";
}

export function extractProductFormData(formData: FormData): RawProductFormData {
  return {
    name: formData.get("name"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    description: formData.get("description"),
    highlights: formData.getAll("highlights"),
    image: formData.get("image"),
    availability: formData.get("availability") === "true",
    badge: formData.get("badge"),
    portion: formData.get("portion"),
    philosophy: formData.get("philosophy"),
    ingredients: formData.getAll("ingredients"),
    storageTip: formData.get("storageTip"),
    imageNote: formData.get("imageNote"),
  };
}

export function validateProductFields(
  rawData: RawProductFormData,
): ProductFieldsValidationResult {
  const result = productFieldsSchema.safeParse(rawData);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const flattened = result.error.flatten().fieldErrors;
  const fieldErrors: ProductFormErrors = {
    name: firstFieldError(flattened.name),
    price: firstFieldError(flattened.price),
    stock: firstFieldError(flattened.stock),
    description: firstFieldError(flattened.description),
    highlights: firstFieldError(flattened.highlights),
    badge: firstFieldError(flattened.badge),
    portion: firstFieldError(flattened.portion),
    philosophy: firstFieldError(flattened.philosophy),
    ingredients: firstFieldError(flattened.ingredients),
    storageTip: firstFieldError(flattened.storageTip),
    imageNote: firstFieldError(flattened.imageNote),
  };
  const cleanFieldErrors = Object.fromEntries(
    Object.entries(fieldErrors).filter(([, message]) => Boolean(message)),
  ) as ProductFormErrors;

  return {
    success: false,
    error: firstProductError(cleanFieldErrors),
    fieldErrors: cleanFieldErrors,
  };
}

export function validateProductImageInput(
  value: FormDataEntryValue | null,
  options: { required: boolean },
): ProductImageValidationResult {
  if (!isUploadedFile(value)) {
    if (options.required) {
      return {
        success: false,
        message: "Pilih gambar produk terlebih dahulu.",
      };
    }

    return { success: true };
  }

  if (!allowedImageTypes.has(value.type)) {
    return {
      success: false,
      message: "Format gambar harus JPG, JPEG, PNG, atau WebP.",
    };
  }

  if (!allowedImageExtensions.has(getFileExtension(value))) {
    return {
      success: false,
      message: "Ekstensi gambar harus .jpg, .jpeg, .png, atau .webp.",
    };
  }

  if (value.size > MAX_PRODUCT_IMAGE_SIZE) {
    return {
      success: false,
      message: `Ukuran gambar maksimal ${PRODUCT_IMAGE_SIZE_LABEL}.`,
    };
  }

  return { success: true, file: value };
}
