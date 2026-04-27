import {
  highlights,
  locationInfo,
  site,
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

export function getHomeProductTitle(product: { slug: string; name: string }) {
  return homeProductTitles[product.slug] ?? product.name;
}

export function formatCompactPrice(price: number | string) {
  const digits =
    typeof price === "number" ? price : Number(price.replace(/[^\d]/g, ""));

  if (Number.isNaN(digits)) {
    return String(price);
  }

  return `Rp ${Math.round(digits / 1000)}K`;
}
