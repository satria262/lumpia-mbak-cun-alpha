import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Noto_Serif } from "next/font/google";
import { AdminToaster } from "./admin/_components/AdminToaster";
import { OrderModalProvider } from "./components/OrderModal";
import { buildPageMetadata, defaultOgImage, getSiteUrl } from "@/lib/seo";
import { site } from "@/lib/siteData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteMetadata = buildPageMetadata({
  title: site.name,
  description: site.description,
});

export const metadata: Metadata = {
  ...siteMetadata,
  metadataBase: getSiteUrl(),
  applicationName: site.name,
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  icons: {
    icon: "/system/lumpia-ai.png",
    shortcut: "/system/lumpia-ai.png",
    apple: "/system/lumpia-ai.png",
  },
  openGraph: {
    title: site.name,
    description: site.description,
    url: getSiteUrl(),
    siteName: site.name,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} min-h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">
        <OrderModalProvider>{children}</OrderModalProvider>
        <AdminToaster />
        <Analytics />
      </body>
    </html>
  );
}
