import { type ReactNode } from "react";

import { AdminIcon } from "../../_components/AdminIcons";

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="text-xs font-bold uppercase tracking-[0.06em] text-[#8a8376]">
      {children}
    </label>
  );
}

export function TextField({
  label,
  name,
  value,
  type = "text",
  onChange
}: {
  label: string;
  name: string;
  value: string;
  type?: "text" | "url";
  onChange?: (name: string, value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        name={name}
        defaultValue={value}
        onChange={(e) => onChange?.(name, e.target.value)}
        className="h-12 w-full rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 text-sm font-medium text-[#211d16] outline-none transition placeholder:text-[#a9a397] focus:border-[#92a25f] focus:bg-white focus:ring-4 focus:ring-[#eef3da]"
      />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  value,
  rows = 4,
  onChange
}: {
  label: string;
  name: string;
  value: string;
  rows?: number;
  onChange?: (name: string, value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        name={name}
        defaultValue={value}
        rows={rows}
        onChange={(e) => onChange?.(name, e.target.value)}
        className="w-full resize-y rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 py-3 text-sm leading-6 text-[#211d16] outline-none transition placeholder:text-[#a9a397] focus:border-[#92a25f] focus:bg-white focus:ring-4 focus:ring-[#eef3da]"
      />
    </div>
  );
}

export function IconUploadField() {
  return (
    <div className="space-y-2">
      <FieldLabel>Icon Website</FieldLabel>
      <label className="flex min-h-28 cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-[#d8cfb5] bg-[#fbfaf6] px-4 text-left transition hover:border-[#92a25f] hover:bg-[#f7faee]">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-[#8a8376] shadow-[0_12px_24px_-20px_rgba(70,52,26,0.45)]">
          <AdminIcon name="plus" className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-sm font-bold text-[#4d473d]">
            Upload favicon
          </span>
          <span className="mt-1 block text-xs text-[#8a8376]">
            SVG, PNG, or ICO (max 1MB)
          </span>
        </span>
        <input
          type="file"
          name="siteIcon"
          accept=".svg,.png,.ico,image/svg+xml,image/png,image/x-icon"
          className="sr-only"
        />
      </label>
    </div>
  );
}

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#eee8dc] bg-white p-5 shadow-[0_18px_45px_-36px_rgba(70,52,26,0.45)]">
      <div className="mb-6">
        <h3 className="font-[var(--font-noto-serif)] text-xl font-semibold text-[#211d16]">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-[#8a8376]">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function StatusPill() {
  return (
    <span className="inline-flex h-7 items-center gap-2 rounded-full bg-[#fff7d6] px-3 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#7a6515]">
      <span className="h-2 w-2 rounded-full bg-[#e0b91d]" />
      Live
    </span>
  );
}
