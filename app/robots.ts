import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl().toString();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
