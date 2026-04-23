import {
  highlights,
  locationInfo,
  products,
  site,
  type Product,
} from "./siteData";

const homeProductTitles: Record<string, string> = {
  "tahu-bakso-khas-semarang": "Tahu Bakso",
  "lumpia-semarang-asli": "Lumpia Rebung",
  "lumpia-spesial-semarang": "Pisang Coklat",
};

export function getSiteContent() {
  return site;
}

export function getLocationContent() {
  return locationInfo;
}

export function getHighlightsContent() {
  return highlights;
}

export function getProducts(): Product[] {
  try {
    return products;
  } catch (error) {
    console.error("Failed to read products content.", error);
    return [];
  }
}

export function getProductBySlug(slug: string): Product | null {
  try {
    return products.find((product) => product.slug === slug) ?? null;
  } catch (error) {
    console.error(`Failed to read product content for slug "${slug}".`, error);
    return null;
  }
}

export function getHomeProductTitle(product: Product) {
  return homeProductTitles[product.slug] ?? product.name;
}

export function formatCompactPrice(price: string) {
  const digits = Number(price.replace(/[^\d]/g, ""));

  if (Number.isNaN(digits)) {
    return price;
  }

  return `Rp ${Math.round(digits / 1000)}K`;
}
