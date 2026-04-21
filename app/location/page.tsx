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

      <section className="overflow-x-clip bg-white py-8 md:py-10 lg:py-12">
        <div className="mx-auto grid max-w-[1360px] gap-12 px-3 sm:px-4 lg:grid-cols-[0.3fr_0.7fr] lg:items-center lg:gap-20 lg:px-3">
          <div className="location-hero-copy max-w-xl space-y-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--secondary)]">
                Visit Our Kitchen
              </p>
              <h1 className="max-w-md text-5xl leading-[0.96] font-semibold tracking-[-0.05em] text-[#231f19] sm:text-6xl">
                The Original
                Taste of
                <br />
                Semarang.
              </h1>
              <p className="max-w-lg text-base leading-8 text-[#655f52] sm:text-lg">
                Experience the heritage of genuine Lumpia, crafted with the
                same secret recipe since our doors first opened in the heart of
                Central Java.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/location#gallery"
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--primary)] px-6 py-4 text-sm font-semibold text-[#2f2b16] shadow-[0_16px_34px_-20px_var(--shadow)] transition hover:-translate-y-px hover:bg-[var(--primary-strong)] hover:shadow-[0_20px_36px_-20px_rgba(138,125,83,0.28)]"
              >
                Lihat Galeri
              </Link>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center rounded-2xl border border-[rgba(231,223,196,0.92)] bg-[rgba(255,252,247,0.9)] px-6 py-4 text-sm font-semibold text-[#4e483e] transition hover:border-[var(--primary)] hover:bg-[var(--primary-ghost)] hover:text-[#373119]"
              >
                Jelajahi Menu
              </Link>
            </div>

            <div className="rounded-[28px] border border-[rgba(231,223,196,0.9)] bg-[rgba(255,252,247,0.88)] p-6 shadow-[0_18px_38px_-30px_var(--shadow)]">
              <div className="grid gap-6 ">
                <div className="flex space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CEC76F" className="bg-[#CEC76F]/10 p-2 rounded-lg size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <div>
                    <h3 className="italic mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                      Address
                    </h3>
                    <p className="text-base leading-7 text-[#4f493d]">
                      {locationInfo.address}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CEC76F" className="bg-[#CEC76F]/10 p-2 rounded-lg size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <div>
                    <h3 className="italic mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                      Operational Hours
                    </h3>
                    <p className="text-base leading-7 text-[#4f493d]">
                      Daily: 09:00 - 21:00
                    </p>
                  </div>
                </div>
                <button className="inline-flex items-center justify-center rounded-2xl bg-[var(--primary)] px-6 py-4 text-sm font-semibold text-[#2f2b16] shadow-[0_16px_34px_-20px_var(--shadow)] transition hover:-translate-y-px hover:bg-[var(--primary-strong)] hover:shadow-[0_20px_36px_-20px_rgba(138,125,83,0.28)]">
                    <a href="https://maps.app.goo.gl/JqA6jZ9V1qVewHeL8">Get Direction</a>
                </button>
              </div>
            </div>
          </div>

          <div className="location-hero-map rounded-[32px] border border-[rgba(231,223,196,0.92)] bg-[rgba(255,252,247,0.9)] p-4 shadow-[0_24px_60px_-38px_rgba(70,52,26,0.32)] sm:p-5">
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[24px] bg-[var(--primary-soft)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4707680841634!2d110.41851497504511!3d-7.071288692931386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70895fd178d4d7%3A0xc355f2c536e952d0!2sLumpia%20Semarang%20%7C%20Lumpia%20Mbak%20Cun!5e0!3m2!1sid!2sjp!4v1776675251597!5m2!1sid!2sjp"
                title="Peta lokasi Lumpia Mbak Cun"
                className="h-full w-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute left-13 bottom-13 rounded-md rounded-bl-none w-80 bg-[rgba(255,252,247,0.94)] px-5 py-4 shadow-[0_18px_40px_-28px_rgba(70,52,26,0.42)] backdrop-blur-sm">
                <h1 className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                  &ldquo;The best lumpia in town, still maintaining its authentic
                  bambo shoot crunch.&rdquo;
                </h1>
                <p className="mt-2 uppercase text-sm leading-6 text-[#4f493d]">
                  - Local Reviewer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-10">

        <section id="gallery" className="grid gap-6 lg:grid-cols-2">
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
