import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [
    {
      url: new URL("/", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/location", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const products = await prisma.product.findMany({
      where: {
        availability: true,
        slug: { not: "" },
      },
      select: {
        slug: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    routes.push(
      ...products.map((product) => ({
        url: new URL(
          `/products/${encodeURIComponent(product.slug)}`,
          siteUrl,
        ).toString(),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      })),
    );
  } catch (error) {
    console.error("Failed to build product sitemap entries.", error);
  }

  return routes;
}
