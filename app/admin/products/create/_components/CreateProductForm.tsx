"use client";

import Link from "next/link";
import {
  ChangeEvent,
  DragEvent,
  useActionState,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import { createProduct } from "../actions";

type FieldProps = {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "number" | "url";
  required?: boolean;
  min?: string;
  step?: string;
};

function TextField({
  id,
  label,
  name,
  placeholder,
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
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 py-3 text-sm leading-6 text-[#211d16] outline-none transition placeholder:text-[#a9a397] focus:border-[#92a25f] focus:bg-white focus:ring-4 focus:ring-[#eef3da]"
      />
    </div>
  );
}

type SectionProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

function FormSection({ title, icon, children }: SectionProps) {
  return (
    <section className="rounded-xl border border-[#eee8dc] bg-white p-5 shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)]">
      <h2 className="mb-5 flex items-center gap-2 font-[var(--font-noto-serif)] text-lg font-semibold text-[#211d16]">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#eef3da] text-[#526b2d]">
          {icon}
        </span>
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function SmallIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center rounded-lg bg-[#526b2d] px-5 text-sm font-bold text-white transition hover:bg-[#435724] disabled:cursor-not-allowed disabled:opacity-65"
    >
      {pending ? "Menerbitkan..." : "Terbitkan Produk"}
    </button>
  );
}

export function CreateProductForm() {
  const [state, formAction] = useActionState(createProduct, {});
  const [availability, setAvailability] = useState(true);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedImageName(event.target.files?.[0]?.name ?? "");
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
    setSelectedImageName(file.name);
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#526b2d]">
            Buat Produk Baru
          </p>
          <p className="mt-1 text-sm text-[#6f6a5c]">
            Siapkan menu baru untuk katalog Lumpia Mbak Cun.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <SubmitButton />
        </div>
      </div>

      {state.error ? (
        <p className="rounded-lg border border-[#f0d5c8] bg-[#fff6f1] px-4 py-3 text-sm font-medium text-[#9a3f1d]">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(20rem,0.85fr)] xl:items-start">
        <div className="space-y-6">
          <FormSection
            title="Informasi Dasar"
            icon={
              <SmallIcon>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8h.01" />
                <path d="M11 12h1v4h1" />
              </SmallIcon>
            }
          >
            <TextField
              id="name"
              name="name"
              label="Nama Produk"
              placeholder="Contoh: Lumpia Rebung Spesial"
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
                required
              />
              <TextField
                id="portion"
                name="portion"
                label="Porsi"
                placeholder="Contoh: Per box isi 12"
                required
              />
            </div>
            <TextAreaField
              id="description"
              name="description"
              label="Deskripsi"
              placeholder="Jelaskan rasa, tekstur, dan karakter produk..."
              required
            />
          </FormSection>

          <FormSection
            title="Detail Kuliner"
            icon={
              <SmallIcon>
                <path d="M7 3v18" />
                <path d="M4 8h6" />
                <path d="M4 12h6" />
                <path d="M17 3v18" />
                <path d="M14 3h6l-1 8h-4l-1-8Z" />
              </SmallIcon>
            }
          >
            <TextAreaField
              id="philosophy"
              name="philosophy"
              label="Filosofi & Cerita"
              placeholder="Ceritakan inspirasi di balik resep ini..."
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
                {[1, 2, 3].map((index) => (
                  <input
                    key={index}
                    id={`ingredient-${index}`}
                    name="ingredients"
                    type="text"
                    required={index === 1}
                    placeholder={`Bahan ${index}`}
                    className="h-10 w-full rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 text-sm text-[#211d16] outline-none transition placeholder:text-[#a9a397] focus:border-[#92a25f] focus:bg-white focus:ring-4 focus:ring-[#eef3da]"
                  />
                ))}
              </div>
              <TextAreaField
                id="storageTip"
                name="storageTip"
                label="Tips Penyimpanan"
                placeholder="Cara menyimpan agar tetap segar..."
                required
              />
            </div>
          </FormSection>
        </div>

        <aside className="space-y-6">
          <FormSection
            title="Media Produk"
            icon={
              <SmallIcon>
                <path d="M4 5h16v14H4z" />
                <path d="m8 14 2.5-2.5L13 14l2-2 3 3" />
                <circle cx="9" cy="9" r="1" />
              </SmallIcon>
            }
          >
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
              className={`flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 text-center transition ${
                isDraggingImage
                  ? "border-[#526b2d] bg-[#eef3da]"
                  : "border-[#d8cfb5] bg-[#fbfaf6] hover:border-[#92a25f] hover:bg-[#f7faee]"
              }`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-3xl text-[#92a25f] shadow-[0_12px_26px_-22px_rgba(70,52,26,0.45)]">
                +
              </span>
              <span className="mt-2 text-sm font-semibold text-[#575248]">
                {selectedImageName || "Letakkan gambar di sini"}
              </span>
              <span className="mt-1 text-xs text-[#8b8578]">
                Tarik gambar ke sini atau klik untuk memilih
              </span>
              <span className="mt-1 text-xs text-[#8b8578]">
                PNG, JPG, atau WebP, maks. 5MB
              </span>
              <input
                ref={imageInputRef}
                id="image"
                name="image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                required
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
            <TextAreaField
              id="imageNote"
              name="imageNote"
              label="Catatan Gambar"
              placeholder="Contoh: Foto utama dengan saus pendamping"
              rows={3}
              required
            />
          </FormSection>

          <FormSection
            title="Kategorisasi"
            icon={
              <SmallIcon>
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </SmallIcon>
            }
          >
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
              required
            />

            <div className="space-y-3">
              <label
                htmlFor="highlight-1"
                className="text-xs font-semibold text-[#575248]"
              >
                Keunggulan Produk
              </label>
              {[1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`highlight-${index}`}
                  name="highlights"
                  type="text"
                  placeholder={`Keunggulan ${index}`}
                  className="h-10 w-full rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 text-sm text-[#211d16] outline-none transition placeholder:text-[#a9a397] focus:border-[#92a25f] focus:bg-white focus:ring-4 focus:ring-[#eef3da]"
                />
              ))}
            </div>
          </FormSection>

          <div className="flex justify-end">
            <Link
              href="/admin"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#d8cfb5] bg-white px-5 text-sm font-bold text-[#575248] transition hover:border-[#92a25f] hover:text-[#526b2d]"
            >
              Batal
            </Link>
          </div>
        </aside>
      </div>
    </form>
  );
}
