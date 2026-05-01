import { SectionCard, TextAreaField, TextField } from "./WebConfigFields";
import { type WebConfigValues } from "./WebConfigTypes";

export function OperationsLinksTab({ values }: { values: WebConfigValues }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.9fr)]">
      <SectionCard
        title="Tombol & Navigasi"
        description="Label tombol dan tujuan klik yang tampil di halaman publik."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            label="Tombol Pesan"
            name="orderButtonLabel"
            value={values.orderButtonLabel}
          />
          <TextField
            label="Tombol Jelajah"
            name="exploreButtonLabel"
            value={values.exploreButtonLabel}
          />
          <TextField
            label="Link Tombol Pesan"
            name="orderButtonLink"
            type="url"
            value={values.orderButtonLink}
          />
          <TextField
            label="Link Tombol Jelajah"
            name="exploreButtonLink"
            value={values.exploreButtonLink}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Operasional & Kanal"
        description="Informasi kunjungan dan kanal eksternal aktif."
      >
        <div className="grid gap-5">
          <TextField
            label="Tahun Berdiri"
            name="foundedYear"
            value={values.foundedYear}
          />
          <TextAreaField
            label="Alamat"
            name="address"
            value={values.address}
            rows={3}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <TextField
              label="Hari Buka"
              name="openDays"
              value={values.openDays}
            />
            <TextField
              label="Jam Buka"
              name="openHours"
              value={values.openHours}
            />
          </div>
          <TextField
            label="Link WA"
            name="whatsappLink"
            type="url"
            value={values.whatsappLink}
          />
          <TextField
            label="Link Maps"
            name="mapsLink"
            type="url"
            value={values.mapsLink}
          />
          <TextField
            label="Link GoFood"
            name="goFoodLink"
            type="url"
            value={values.goFoodLink}
          />
        </div>
      </SectionCard>
    </div>
  );
}
