import { SectionCard, TextAreaField, TextField } from "./WebConfigFields";
import { type WebConfigValues } from "./WebConfigTypes";

export function HeroContentTab({ values }: { values: WebConfigValues }) {
  return (
    <SectionCard
      title="Hero & Content"
      description="Teks utama di layar pertama halaman beranda."
    >
      <div className="grid gap-5">
        <TextField
          label="Judul Teks Web"
          name="heroTitle"
          value={values.heroTitle}
        />
        <TextAreaField
          label="Deskripsi Teks Web"
          name="heroDescription"
          value={values.heroDescription}
          rows={5}
        />
        <TextAreaField
          label="Sub Deskripsi Teks Web"
          name="heroSubDescription"
          value={values.heroSubDescription}
          rows={3}
        />
      </div>
    </SectionCard>
  );
}
