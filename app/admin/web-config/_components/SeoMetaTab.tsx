import { TextAreaField, TextField } from "./WebConfigFields";
import { type WebConfigValues } from "./WebConfigTypes";

export function SeoMetaTab({ values }: { values: WebConfigValues }) {
  return (
    <section className="grid gap-6 rounded-xl border border-[#eee8dc] bg-white p-5 shadow-[0_18px_45px_-36px_rgba(70,52,26,0.45)] lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)]">
      <div className="space-y-5">
        <div>
          <h3 className="font-[var(--font-noto-serif)] text-xl font-semibold text-[#211d16]">
            SEO & Meta
          </h3>
          <p className="mt-1 text-sm leading-6 text-[#8a8376]">
            Metadata khusus halaman beranda.
          </p>
        </div>
        <TextField
          label="home_seo_title"
          name="homeSeoTitle"
          value={values.homeSeoTitle}
        />
        <TextAreaField
          label="home_seo_description"
          name="homeSeoDescription"
          value={values.homeSeoDescription}
          rows={4}
        />
      </div>

      <div className="rounded-xl border border-[#eee8dc] bg-[#fbfaf6] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#92a25f]">
          Search Preview
        </p>
        <p className="mt-4 text-lg font-semibold text-[#1f4f9a]">
          {values.homeSeoTitle}
        </p>
        <p className="mt-1 text-xs text-[#526b2d]">lumpiambakcun.store</p>
        <p className="mt-3 text-sm leading-6 text-[#5f5a4b]">
          {values.homeSeoDescription}
        </p>
      </div>
    </section>
  );
}
