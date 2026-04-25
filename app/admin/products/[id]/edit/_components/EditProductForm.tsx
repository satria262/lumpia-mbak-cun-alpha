"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useActionState,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import { AdminIcon } from "../../../../_components/AdminIcons";
import { DeleteProductButton } from "../../../_components/DeleteProductButton";
import { updateProduct } from "../actions";

export type EditableProduct = {
  id: number;
  slug: string;
  name: string;
  price?: number | null;
  stock?: number | null;
  description: string;
  highlights: string[];
  image: string;
  availability: boolean;
  badge: string;
  portion: string;
  philosophy: string;
  ingredients: string[];
  storageTip: string;
  imageNote: string;
};

type FieldProps = {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string | number;
  type?: "text" | "number";
  required?: boolean;
  min?: string;
  step?: string;
};

function TextField({
  id,
  label,
  name,
  placeholder,
  defaultValue,
  type = "text",
  required = false,
  min,
  step,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-xs font-semibold text-[#575248]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        min={min}
        step={step}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 text-sm text-[#211d16] outline-none transition placeholder:text-[#a9a397] focus:border-[#92a25f] focus:bg-white focus:ring-4 focus:ring-[#eef3da]"
      />
    </div>
  );
}

type TextAreaFieldProps = FieldProps & {
  rows?: number;
};

function TextAreaField({
  id,
  label,
  name,
  placeholder,
  defaultValue,
  rows = 4,
  required = false,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-xs font-semibold text-[#575248]">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 py-3 text-sm leading-6 text-[#211d16] outline-none transition placeholder:text-[#a9a397] focus:border-[#92a25f] focus:bg-white focus:ring-4 focus:ring-[#eef3da]"
      />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#526b2d] px-5 text-sm font-bold text-white transition hover:bg-[#435724] disabled:cursor-not-allowed disabled:opacity-65"
    >
      <AdminIcon name="edit" className="h-4 w-4" />
      {pending ? "Menyimpan..." : "Simpan Perubahan"}
    </button>
  );
}

function normalizeList(values: string[]) {
  const normalized = values.filter(Boolean);

  while (normalized.length < 3) {
    normalized.push("");
  }

  return normalized;
}

function getSafeNumber(value: number | null | undefined) {
  const safeValue = Number(value ?? 0);

  return Number.isFinite(safeValue) ? safeValue : 0;
}

function formatPrice(value: number | null | undefined) {
  return `Rp${getSafeNumber(value).toLocaleString("id-ID")}`;
}

function formatStock(value: number | null | undefined) {
  return getSafeNumber(value).toLocaleString("id-ID");
}

export function EditProductForm({ product }: { product: EditableProduct }) {
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, formAction] = useActionState(updateProductWithId, {});
  const [availability, setAvailability] = useState(product.availability);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState("");
  const [selectedImagePreview, setSelectedImagePreview] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const highlights = useMemo(
    () => normalizeList(product.highlights ?? []),
    [product.highlights],
  );
  const ingredients = useMemo(
    () => normalizeList(product.ingredients ?? []),
    [product.ingredients],
  );
  const imagePreview =
    selectedImagePreview || product.image || "/system/lumpia-logo.png";

  useEffect(() => {
    return () => {
      if (selectedImagePreview) {
        URL.revokeObjectURL(selectedImagePreview);
      }
    };
  }, [selectedImagePreview]);

  function setPreviewFromFile(file: File | null | undefined) {
    if (!file) {
      setSelectedImageName("");
      setSelectedImagePreview("");
      return;
    }

    setSelectedImageName(file.name);
    setSelectedImagePreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }

      return URL.createObjectURL(file);
    });
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    setPreviewFromFile(event.target.files?.[0]);
  }

  function handleImageDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDraggingImage(false);

    const file = event.dataTransfer.files.item(0);

    if (!file || !imageInputRef.current) {
      return;
    }

    const transfer = new DataTransfer();
    transfer.items.add(file);
    imageInputRef.current.files = transfer.files;
    setPreviewFromFile(file);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(20rem,0.75fr)_minmax(0,1.25fr)] xl:items-start">
        <aside className="space-y-6">
          <section className="overflow-hidden rounded-xl border border-[#eee8dc] bg-white shadow-[0_18px_45px_-36px_rgba(70,52,26,0.45)]">
            <div className="relative aspect-[4/3] bg-[#f0eee8]">
              <Image
                src={product.image || "/system/lumpia-logo.png"}
                alt={product.name}
                fill
                sizes="(min-width: 1280px) 26vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-5 p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#526b2d]">
                  Pratinjau Produk
                </p>
                <h2 className="mt-2 font-[var(--font-noto-serif)] text-2xl font-semibold text-[#211d16]">
                  {product.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#6f6a5c]">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-[#fbfaf6] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#9c978d]">
                    Harga
                  </p>
                  <p className="mt-2 font-[var(--font-noto-serif)] text-xl font-semibold text-[#526b2d]">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <div className="rounded-lg bg-[#fbfaf6] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#9c978d]">
                    Stok
                  </p>
                  <p className="mt-2 font-[var(--font-noto-serif)] text-xl font-semibold text-[#211d16]">
                    {formatStock(product.stock)} unit
                  </p>
                </div>
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#e5dfd2] bg-white px-5 text-sm font-bold text-[#575248] transition hover:border-[#92a25f] hover:text-[#526b2d]"
              >
                <AdminIcon name="eye" className="h-4 w-4" />
                Lihat Halaman Publik
              </Link>
              <DeleteProductButton
                productId={product.id}
                productName={product.name || "produk"}
              />
            </div>
          </section>
        </aside>

        <form action={formAction} className="space-y-6">
          <div className="flex flex-col gap-4 rounded-xl border border-[#eee8dc] bg-white p-5 shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#526b2d]">
                Edit Produk
              </p>
              <p className="mt-1 text-sm text-[#6f6a5c]">
                Perbarui detail, stok, media, dan status etalase.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/products"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-[#e5dfd2] bg-white px-5 text-sm font-bold text-[#575248] transition hover:border-[#92a25f] hover:text-[#526b2d]"
              >
                Batal
              </Link>
              <SubmitButton />
            </div>
          </div>

          {state.error ? (
            <p className="rounded-lg border border-[#f0d5c8] bg-[#fff6f1] px-4 py-3 text-sm font-medium text-[#9a3f1d]">
              {state.error}
            </p>
          ) : null}

          <section className="rounded-xl border border-[#eee8dc] bg-white p-5 shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)]">
            <h3 className="mb-5 font-[var(--font-noto-serif)] text-lg font-semibold text-[#211d16]">
              Informasi Dasar
            </h3>
            <div className="space-y-5">
              <TextField
                id="name"
                name="name"
                label="Nama Produk"
                placeholder="Nama produk"
                defaultValue={product.name}
                required
              />
              <div className="grid gap-5 md:grid-cols-3">
                <TextField
                  id="price"
                  name="price"
                  label="Harga"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="22000"
                  defaultValue={getSafeNumber(product.price)}
                  required
                />
                <TextField
                  id="stock"
                  name="stock"
                  label="Stok"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  defaultValue={getSafeNumber(product.stock)}
                  required
                />
                <TextField
                  id="portion"
                  name="portion"
                  label="Porsi"
                  placeholder="Contoh: Per box isi 12"
                  defaultValue={product.portion}
                  required
                />
              </div>
              <TextAreaField
                id="description"
                name="description"
                label="Deskripsi"
                placeholder="Jelaskan rasa, tekstur, dan karakter produk..."
                defaultValue={product.description}
                required
              />
            </div>
          </section>

          <section className="rounded-xl border border-[#eee8dc] bg-white p-5 shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)]">
            <h3 className="mb-5 font-[var(--font-noto-serif)] text-lg font-semibold text-[#211d16]">
              Detail Kuliner
            </h3>
            <div className="space-y-5">
              <TextAreaField
                id="philosophy"
                name="philosophy"
                label="Filosofi & Cerita"
                placeholder="Ceritakan inspirasi di balik resep ini..."
                defaultValue={product.philosophy}
                required
              />
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-3">
                  <label
                    htmlFor="ingredient-1"
                    className="text-xs font-semibold text-[#575248]"
                  >
                    Bahan
                  </label>
                  {ingredients.map((item, index) => (
                    <input
                      key={`ingredient-${index}`}
                      id={`ingredient-${index + 1}`}
                      name="ingredients"
                      type="text"
                      required={index === 0}
                      defaultValue={item}
                      placeholder={`Bahan ${index + 1}`}
                      className="h-10 w-full rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 text-sm text-[#211d16] outline-none transition placeholder:text-[#a9a397] focus:border-[#92a25f] focus:bg-white focus:ring-4 focus:ring-[#eef3da]"
                    />
                  ))}
                </div>
                <TextAreaField
                  id="storageTip"
                  name="storageTip"
                  label="Tips Penyimpanan"
                  placeholder="Cara menyimpan agar tetap segar..."
                  defaultValue={product.storageTip}
                  required
                />
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-xl border border-[#eee8dc] bg-white p-5 shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)]">
              <h3 className="mb-5 font-[var(--font-noto-serif)] text-lg font-semibold text-[#211d16]">
                Media Produk
              </h3>
              <div className="space-y-5">
                <label
                  htmlFor="image"
                  onDragEnter={(event) => {
                    event.preventDefault();
                    setIsDraggingImage(true);
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDraggingImage(true);
                  }}
                  onDragLeave={() => setIsDraggingImage(false)}
                  onDrop={handleImageDrop}
                  className={`group relative flex min-h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed px-4 text-center transition ${
                    isDraggingImage
                      ? "border-[#526b2d] bg-[#eef3da]"
                      : "border-[#d8cfb5] bg-[#fbfaf6] hover:border-[#92a25f] hover:bg-[#f7faee]"
                  }`}
                >
                  <span
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("${imagePreview}")` }}
                    aria-hidden="true"
                  />
                  <span className="absolute inset-0 bg-[#211d16]/48 transition group-hover:bg-[#211d16]/42" />
                  <span className="relative grid h-11 w-11 place-items-center rounded-full bg-white text-2xl text-[#92a25f] shadow-[0_12px_26px_-22px_rgba(70,52,26,0.45)]">
                    +
                  </span>
                  <span className="relative mt-2 text-sm font-semibold text-white">
                    {selectedImageName || "Ganti gambar produk"}
                  </span>
                  <span className="relative mt-1 text-xs text-white/85">
                    Kosongkan jika tidak ingin mengganti gambar
                  </span>
                  <input
                    ref={imageInputRef}
                    id="image"
                    name="image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <TextAreaField
                  id="imageNote"
                  name="imageNote"
                  label="Catatan Gambar"
                  placeholder="Contoh: Foto utama dengan saus pendamping"
                  defaultValue={product.imageNote}
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#eee8dc] bg-white p-5 shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)]">
              <h3 className="mb-5 font-[var(--font-noto-serif)] text-lg font-semibold text-[#211d16]">
                Kategorisasi
              </h3>
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4 rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 py-3">
                  <div>
                    <label
                      htmlFor="availability"
                      className="text-xs font-semibold text-[#575248]"
                    >
                      Ketersediaan
                    </label>
                    <p className="text-xs text-[#8b8578]">Tampil di etalase</p>
                  </div>
                  <button
                    id="availability"
                    name="availability"
                    type="button"
                    aria-pressed={availability}
                    onClick={() => setAvailability((current) => !current)}
                    className={`relative h-7 w-12 rounded-full transition ${
                      availability ? "bg-[#526b2d]" : "bg-[#d8d6d2]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                        availability ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                  <input
                    type="hidden"
                    name="availability"
                    value={availability ? "true" : "false"}
                  />
                </div>

                <TextField
                  id="badge"
                  name="badge"
                  label="Badge"
                  placeholder="Contoh: Best Seller"
                  defaultValue={product.badge}
                  required
                />

                <div className="space-y-3">
                  <label
                    htmlFor="highlight-1"
                    className="text-xs font-semibold text-[#575248]"
                  >
                    Keunggulan Produk
                  </label>
                  {highlights.map((item, index) => (
                    <input
                      key={`highlight-${index}`}
                      id={`highlight-${index + 1}`}
                      name="highlights"
                      type="text"
                      required={index === 0}
                      defaultValue={item}
                      placeholder={`Keunggulan ${index + 1}`}
                      className="h-10 w-full rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 text-sm text-[#211d16] outline-none transition placeholder:text-[#a9a397] focus:border-[#92a25f] focus:bg-white focus:ring-4 focus:ring-[#eef3da]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
