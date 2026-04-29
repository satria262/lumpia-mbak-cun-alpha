import type { Metadata } from "next";

import { site } from "./siteData";

export const defaultOgImage = "/system/lumpia-ai.png";

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "https://lumpiambakcun.com";
  const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  return new URL(url);
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = defaultOgImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = new URL(path, getSiteUrl());

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
