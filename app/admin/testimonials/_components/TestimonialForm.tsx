"use client";

import Link from "next/link";
import {
  ChangeEvent,
  DragEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import { AdminIcon } from "../../_components/AdminIcons";
import { createTestimonial, updateTestimonial } from "../actions";

export type TestimonialFormValues = {
  id?: number;
  testimonial: string;
  userName: string;
  userOccupation: string;
  userAvatar: string;
};

type TestimonialFormProps = {
  mode: "create" | "edit";
  testimonial?: TestimonialFormValues;
};

type FieldProps = {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  required?: boolean;
};

function TextField({
  id,
  label,
  name,
  placeholder,
  defaultValue,
  required = false,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-xs font-semibold text-[#575248]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 text-sm text-[#211d16] outline-none transition placeholder:text-[#a9a397] focus:border-[#92a25f] focus:bg-white focus:ring-4 focus:ring-[#eef3da]"
      />
    </div>
  );
}

function TextAreaField({
  id,
  label,
  name,
  placeholder,
  defaultValue,
  required = false,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-xs font-semibold text-[#575248]">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={7}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 py-3 text-sm leading-6 text-[#211d16] outline-none transition placeholder:text-[#a9a397] focus:border-[#92a25f] focus:bg-white focus:ring-4 focus:ring-[#eef3da]"
      />
    </div>
  );
}

function SubmitButton({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#526b2d] px-5 text-sm font-bold text-white transition hover:bg-[#435724] disabled:cursor-not-allowed disabled:opacity-65"
    >
      <AdminIcon
        name={mode === "create" ? "plus" : "edit"}
        className="h-4 w-4"
      />
      {pending
        ? mode === "create"
          ? "Menyimpan..."
          : "Memperbarui..."
        : mode === "create"
          ? "Simpan Testimoni"
          : "Simpan Perubahan"}
    </button>
  );
}

function getInitials(name: string) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return initials || "LC";
}

export function TestimonialForm({ mode, testimonial }: TestimonialFormProps) {
  const action =
    mode === "edit" && testimonial?.id
      ? updateTestimonial.bind(null, testimonial.id)
      : createTestimonial;
  const [state, formAction] = useActionState(action, {});
  const [isDraggingAvatar, setIsDraggingAvatar] = useState(false);
  const [selectedAvatarName, setSelectedAvatarName] = useState("");
  const [selectedAvatarPreview, setSelectedAvatarPreview] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const previewName = testimonial?.userName?.trim() || "Nama Pelanggan";
  const previewOccupation =
    testimonial?.userOccupation?.trim() || "Profesi pelanggan";
  const previewTestimonial =
    testimonial?.testimonial?.trim() ||
    "Testimoni pelanggan akan tampil sebagai pratinjau di panel ini.";
  const avatarPreview =
    selectedAvatarPreview || testimonial?.userAvatar?.trim() || "";
  const avatarStyle = avatarPreview
    ? { backgroundImage: `url("${avatarPreview}")` }
    : undefined;

  useEffect(() => {
    return () => {
      if (selectedAvatarPreview) {
        URL.revokeObjectURL(selectedAvatarPreview);
      }
    };
  }, [selectedAvatarPreview]);

  function setPreviewFromFile(file: File | null | undefined) {
    if (!file) {
      setSelectedAvatarName("");
      setSelectedAvatarPreview("");
      return;
    }

    setSelectedAvatarName(file.name);
    setSelectedAvatarPreview((currentPreview) => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }

      return URL.createObjectURL(file);
    });
  }

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    setPreviewFromFile(event.target.files?.[0]);
  }

  function handleAvatarDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDraggingAvatar(false);

    const file = event.dataTransfer.files.item(0);

    if (!file || !avatarInputRef.current) {
      return;
    }

    const transfer = new DataTransfer();
    transfer.items.add(file);
    avatarInputRef.current.files = transfer.files;
    setPreviewFromFile(file);
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#526b2d]">
            {mode === "create" ? "Testimoni Baru" : "Edit Testimoni"}
          </p>
          <p className="mt-1 text-sm text-[#6f6a5c]">
            Kelola kutipan pelanggan yang tampil di etalase Lumpia Mbak Cun.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/testimonials"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#d8cfb5] bg-white px-5 text-sm font-bold text-[#575248] transition hover:border-[#92a25f] hover:text-[#526b2d]"
          >
            Batal
          </Link>
          <SubmitButton mode={mode} />
        </div>
      </div>

      {state.error ? (
        <p className="rounded-lg border border-[#f0d5c8] bg-[#fff6f1] px-4 py-3 text-sm font-medium text-[#9a3f1d]">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)] xl:items-start">
        <section className="rounded-xl border border-[#eee8dc] bg-white p-5 shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)]">
          <h2 className="mb-5 flex items-center gap-2 font-[var(--font-noto-serif)] text-lg font-semibold text-[#211d16]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#eef3da] text-[#526b2d]">
              <AdminIcon name="message" className="h-3.5 w-3.5" />
            </span>
            Detail Testimoni
          </h2>
          <div className="space-y-5">
            <TextAreaField
              id="testimonial"
              name="testimonial"
              label="Testimoni"
              placeholder="Tulis pengalaman pelanggan secara singkat dan natural..."
              defaultValue={testimonial?.testimonial}
              required
            />
            <div className="grid gap-5 md:grid-cols-2">
              <TextField
                id="userName"
                name="userName"
                label="Nama Pelanggan"
                placeholder="Contoh: Dewi Lestari"
                defaultValue={testimonial?.userName}
                required
              />
              <TextField
                id="userOccupation"
                name="userOccupation"
                label="Pekerjaan / Label"
                placeholder="Contoh: Pelanggan Katering"
                defaultValue={testimonial?.userOccupation}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="userAvatar"
                className="text-xs font-semibold text-[#575248]"
              >
                Avatar Pelanggan
              </label>
              <label
                htmlFor="userAvatar"
                onDragEnter={(event) => {
                  event.preventDefault();
                  setIsDraggingAvatar(true);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDraggingAvatar(true);
                }}
                onDragLeave={() => setIsDraggingAvatar(false)}
                onDrop={handleAvatarDrop}
                className={`flex min-h-36 cursor-pointer items-center gap-4 rounded-xl border border-dashed px-4 py-4 transition ${
                  isDraggingAvatar
                    ? "border-[#526b2d] bg-[#eef3da]"
                    : "border-[#d8cfb5] bg-[#fbfaf6] hover:border-[#92a25f] hover:bg-[#f7faee]"
                }`}
              >
                <span
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#eef3da] bg-cover bg-center font-[var(--font-noto-serif)] text-xl font-semibold text-[#526b2d] ring-4 ring-white"
                  style={avatarStyle}
                >
                  {avatarPreview ? null : getInitials(previewName)}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[#575248]">
                    {selectedAvatarName ||
                      (testimonial?.userAvatar
                        ? "Ganti avatar pelanggan"
                        : "Letakkan avatar di sini")}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#8b8578]">
                    Opsional. Tarik gambar ke sini atau klik untuk memilih PNG,
                    JPG, atau WebP.
                  </span>
                </span>
                <input
                  ref={avatarInputRef}
                  id="userAvatar"
                  name="userAvatar"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleAvatarChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </section>

        <aside className="rounded-xl border border-[#eee8dc] bg-white p-5 shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)]">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#526b2d]">
            Pratinjau
          </p>
          <article className="mt-4 rounded-xl bg-[#fbfaf6] p-5">
            <div className="flex items-center gap-3">
              <div
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#eef3da] bg-cover bg-center font-[var(--font-noto-serif)] text-lg font-semibold text-[#526b2d] ring-4 ring-white"
                style={avatarStyle}
                aria-label={avatarPreview ? `Avatar ${previewName}` : undefined}
              >
                {avatarPreview ? null : getInitials(previewName)}
              </div>
              <div className="min-w-0">
                <h3 className="truncate font-[var(--font-noto-serif)] text-lg font-semibold text-[#211d16]">
                  {previewName}
                </h3>
                <p className="truncate text-sm text-[#6f6a5c]">
                  {previewOccupation}
                </p>
              </div>
            </div>
            <p className="mt-5 text-5xl font-semibold leading-none text-[#92a25f]">
              &quot;
            </p>
            <p className="-mt-3 text-sm leading-7 text-[#575248]">
              {previewTestimonial}
            </p>
          </article>
        </aside>
      </div>
    </form>
  );
}
