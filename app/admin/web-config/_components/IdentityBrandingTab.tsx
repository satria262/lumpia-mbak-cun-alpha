import {
  IconUploadField,
  SectionCard,
  TextField,
} from "./WebConfigFields";
import { type WebConfigValues } from "./WebConfigTypes";

export function IdentityBrandingTab({
  values,
}: {
  values: WebConfigValues;
}) {
  return (
    <SectionCard
      title="Identity & Branding"
      description="Identitas dasar yang membentuk nama, rasa brand, dan area produk."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="Judul Web" name="siteTitle" value={values.siteTitle} />
        <TextField
          label="Sub Judul Web"
          name="siteSubtitle"
          value={values.siteSubtitle}
        />
        <TextField
          label="Judul Bagian Produk"
          name="productSectionTitle"
          value={values.productSectionTitle}
        />
        <IconUploadField />
      </div>
    </SectionCard>
  );
}
