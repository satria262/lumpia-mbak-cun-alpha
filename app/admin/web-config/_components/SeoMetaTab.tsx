import { TextAreaField, TextField } from "./WebConfigFields";
import { type WebConfigValues } from "./WebConfigTypes";

export function SeoMetaTab({ values, onChange }: { values: WebConfigValues, onChange: (name: string, value: string) => void }) {
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
          onChange={onChange}
        />
        <TextAreaField
          label="home_seo_description"
          name="homeSeoDescription"
          value={values.homeSeoDescription}
          rows={4}
          onChange={onChange}
        />
      </div>

      <div className="rounded-xl border border-[#eee8dc] bg-[#FFFFFF] p-5  cursor-default">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#92a25f]">
          Search Preview
        </p>
        <div className="flex items-center mt-4 space-x-2 relative w-fit pr-4">
          <img src={values.favicon} alt="" className="rounded-full size-[27px]"/>
          <div className="text-sm">
            <p className="text-[14px]">lumpiambakcun.store</p>
            <p className="text-[12px] text-[#4d5156]">https://lumpiambakcun.store</p>
          </div>
          <p className="tracking-wider rotate-90 absolute right-0 bottom-0 text-md font-semibold">...</p>
        </div>
        <p className="mt-2 text-lg font-semibold text-[#681da8]">
          {values.homeSeoTitle}
        </p>
        <p className="mt-1 text-sm leading-6 text-[#5f5a4b]">
          {values.homeSeoDescription}
        </p>
      </div>
    </section>
  );
}
