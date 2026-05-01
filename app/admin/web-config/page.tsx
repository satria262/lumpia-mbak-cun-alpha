import type { Metadata } from "next";
import Link from "next/link";

import { AdminHeader } from "../_components/AdminHeader";
import { AdminIcon } from "../_components/AdminIcons";
import { AdminSidebar } from "../_components/AdminSidebar";
import { WebConfigTabs } from "./_components/WebConfigTabs";
import { requireAdminSession } from "@/lib/admin-session";
import { buildPageMetadata } from "@/lib/seo";
import { locationInfo, site } from "@/lib/siteData";

export const metadata: Metadata = buildPageMetadata({
  title: "Konfigurasi Web | Lumpia Mbak Cun",
  description: "Kelola konten utama website Lumpia Mbak Cun.",
  path: "/admin/web-config",
  noIndex: true,
});

export default async function WebConfigPage() {
  const session = await requireAdminSession();

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#211d16]">
      <div className="min-h-screen lg:pl-64">
        <AdminSidebar email={session.user.email} />

        <div className="min-w-0">
          <AdminHeader
            title="Konfigurasi Web"
            subtitle="Atur identitas, headline, kanal, dan metadata website."
          />

          <section className="px-6 py-8 md:px-10">
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-[var(--font-noto-serif)] text-2xl font-semibold text-[#211d16]">
                  Konten Utama Website
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#6f6a5c]">
                  Kelola copy utama website dalam panel yang terpisah rapi,
                  dari identitas brand sampai metadata halaman beranda.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#d8cfb5] bg-white px-5 text-sm font-bold text-[#575248] transition hover:border-[#92a25f] hover:text-[#526b2d]"
              >
                <AdminIcon name="eye" className="h-4 w-4" />
                Lihat Website
              </Link>
            </div>

            <WebConfigTabs
              initialValues={{
                siteTitle: site.name,
                siteSubtitle: "The Heart of Indonesian Crispy Rolls",
                logo: '',
                favicon: "/system/lumpia-ai.png",
                productSectionTitle: "Varian Unggulan Kami",
                heroTitle: "Cita Rasa Otentik Semarangan",
                heroDescription:
                  "Temukan resep warisan keluarga yang diturunkan lintas generasi. Kulit lumpia yang digoreng dengan minyak panas yang pas sehingga menciptakan kulit golden brown yang renyah membalut rebung pilihan dan bahan-bahan premium segar dari pertanian.",
                heroSubDescription:
                  "Dipilih dengan cermat, disiapkan dengan hormat. Pilih pengalaman warisan Anda.",
                orderButtonLabel: "Pesan Sekarang",
                exploreButtonLabel: "Jelajahi Menu",
                orderButtonLink: "https://gofood.link/a/C2kf5TE",
                exploreButtonLink: "/#products",
                foundedYear: "1998",
                address: locationInfo.address,
                openDays: "Senin - Sabtu",
                openHours: "09:00 - 21:00",
                whatsappLink:
                  "https://api.whatsapp.com/send/?phone=6281227816101",
                mapsLink:
                  "https://www.google.com/maps/place/Lumpia+Semarang+%7C+Lumpia+Mbak+Cun",
                goFoodLink: "https://gofood.link/a/C2kf5TE",
                instagramLink: "https://gofood.link/a/C2kf5TE",
                grabFoodLink: "https://gofood.link/a/C2kf5TE",
                homeSeoTitle: "Lumpia Semarang Asli dan Tahu Bakso",
                homeSeoDescription: site.description,
              }}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
