import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { locationInfo, products, site } from "../../lib/siteData";

export const metadata = {
  title: `${site.name} — Lokasi & Galeri`,
  description: "Temukan lokasi Lumpia Mbak Cun dan lihat galeri toko serta menu andalan.",
};

export default function LocationPage() {
  return (
    <div className="theme-shell">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="mb-12 rounded-[32px] bg-[rgba(255,253,247,0.94)] p-10 shadow-lg shadow-[var(--shadow)]">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.24em] text-[var(--secondary)]">
                Lokasi Kedai
              </p>
              <h1 className="mb-6 max-w-xl text-4xl font-semibold tracking-tight text-[#1e1a15]">
                Temukan rasa Semarang yang selalu segar dan hangat setiap hari.
              </h1>
              <p className="mb-8 max-w-2xl text-base leading-8 text-[#5f5b50]">
                Kunjungi toko kami dan nikmati Lumpia, Tahu Bakso, serta pilihan makanan tradisional lain dalam suasana hangat.
              </p>
              <div className="space-y-3 rounded-3xl bg-[#faf7ee] p-6 text-sm text-[#5f5b50] shadow-sm">
                <p className="font-semibold text-[#2e2a23]">Alamat</p>
                <p>{locationInfo.address}</p>
                <p>{locationInfo.note}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--primary-ghost)] p-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[var(--primary-soft)]">
                <Image
                  src="/map.svg"
                  alt="Map Semarang"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {locationInfo.gallery.map((src, index) => (
            <div key={src} className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[rgba(255,253,247,0.96)] shadow-sm">
              <Image src={src} alt={`Galeri toko ${index + 1}`} width={900} height={620} className="h-full w-full object-cover" />
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-[32px] bg-[#f6f1df] p-10 shadow-lg shadow-[var(--shadow)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.24em] text-[var(--secondary)]">Menu Pilihan</p>
              <h2 className="text-3xl font-semibold text-[#1e1a15]">Menu andalan kami di kedai Semarang</h2>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[#2f2b16] shadow-[0_16px_34px_-20px_var(--shadow)] transition hover:-translate-y-px hover:bg-[var(--primary-strong)] hover:shadow-[0_20px_36px_-20px_rgba(138,125,83,0.28)]"
            >
              Kembali ke Beranda
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <article key={product.slug} className="rounded-[32px] border border-[var(--border)] bg-[rgba(255,253,247,0.96)] p-6 shadow-sm">
                <Image src={product.image} alt={product.name} width={540} height={420} className="mb-6 h-56 w-full rounded-[24px] object-cover" />
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[var(--secondary)]">{product.badge}</p>
                <h3 className="mb-3 text-xl font-semibold text-[#1e1a15]">{product.name}</h3>
                <p className="mb-5 text-sm leading-6 text-[#5f5b50]">{product.description}</p>
                <Link
                  href={product.slug === "lumpia-spesial-semarang" ? "/" : `/products/${product.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[#2f2b16] shadow-[0_16px_34px_-20px_var(--shadow)] transition hover:-translate-y-px hover:bg-[var(--primary-strong)] hover:shadow-[0_20px_36px_-20px_rgba(138,125,83,0.28)]"
                >
                  Lihat Menu
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
