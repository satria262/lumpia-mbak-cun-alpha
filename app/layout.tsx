import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumpia Mbak Cun",
  description:
    "Cita rasa otentik Semarang - Lumpia, Tahu Bakso, dan makanan tradisional khas nusantara.",
  icons: {
    icon: "/system/lumpia-logo.png",
    shortcut: "/system/lumpia-logo.png",
    apple: "/system/lumpia-logo.png",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} min-h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
