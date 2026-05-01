export type WebConfigValues = {
  siteTitle: string;
  siteSubtitle: string;
  productSectionTitle: string;
  heroTitle: string;
  heroDescription: string;
  heroSubDescription: string;
  orderButtonLabel: string;
  exploreButtonLabel: string;
  orderButtonLink: string;
  exploreButtonLink: string;
  foundedYear: string;
  address: string;
  openDays: string;
  openHours: string;
  whatsappLink: string;
  mapsLink: string;
  goFoodLink: string;
  homeSeoTitle: string;
  homeSeoDescription: string;
};

export type WebConfigTabId = "identity" | "hero" | "operations" | "seo";

export type WebConfigTabItem = {
  id: WebConfigTabId;
  label: string;
  description: string;
};
