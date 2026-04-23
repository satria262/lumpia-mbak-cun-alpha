import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import RevealOnScroll from "./components/RevealOnScroll";
import TestimonialCarousel from "./components/TestimonialCarousel";
import {
  formatCompactPrice,
  getHomeProductTitle,
  getProducts,
  getSiteContent,
} from "../lib/content";

const highlightItems = [
  {
    title: "Rebung Segar",
    description:
      "Didatangkan setiap hari dari dataran tinggi Jawa Tengah, memastikan tekstur renyah manis tanpa aroma yang menyengat.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M18.5 5.5c-7 0-12 5-12 10.2 0 2.1 1.7 3.8 3.8 3.8 5.2 0 10.2-5 10.2-12 0-1.1-.9-2-2-2Z" />
        <path d="M9 15c1.5-1.4 3.2-2.7 5-3.8" />
      </svg>
    ),
  },
  {
    title: "Telur Pilihan",
    description:
      "Kami hanya menggunakan telur bebek angon untuk isian, menciptakan tekstur yang lebih kaya dan gurih yang mengikat cita rasa.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M12 4.5c-2.7 3-4.8 5.8-4.8 8.7a4.8 4.8 0 0 0 9.6 0c0-3-2.1-5.7-4.8-8.7Z" />
        <path d="M12 11.2c-.8.7-1.2 1.5-1.2 2.4" />
      </svg>
    ),
  },
  {
    title: "Tanpa Pengawet",
    description:
      "Komitmen terhadap kesehatan dan kemurnian. Lumpia kami dibuat segar setiap pagi, setia pada etika kuliner tradisional.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="m12 3 2 2.2 3-.2.8 2.9 2.6 1.4-1 2.8 1 2.8-2.6 1.4-.8 2.9-3-.2L12 21l-2-2.2-3 .2-.8-2.9-2.6-1.4 1-2.8-1-2.8 2.6-1.4.8-2.9 3 .2L12 3Z" />
        <path d="m9.6 12 1.6 1.6 3.4-3.5" />
      </svg>
    ),
  },
];

export default function Home() {
  const products = getProducts();
  const site = getSiteContent();

  return (
    <div className="theme-shell">
      <Navbar />

      <section className="overflow-x-clip bg-white py-8 md:py-10 lg:py-12">
        <div className="mx-auto grid max-w-[1360px] gap-12 px-3 sm:px-4 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-28 lg:px-3">
          <RevealOnScroll className="max-w-xl space-y-8" delay={60}>
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--secondary)]">
                Sejak 1998 - Semarang
              </p>
              <h1 className="max-w-md text-5xl leading-[0.96] font-semibold tracking-[-0.05em] text-[#231f19] sm:text-6xl lg:text-[4.6rem]">
                Cita Rasa
                <br />
                Otentik
                <br />
                Semarangan
              </h1>
              <p className="max-w-lg text-base leading-8 text-[#655f52] sm:text-lg">
                Temukan resep warisan keluarga yang diturunkan lintas generasi.
                Kulit emas yang renyah membalut rebung pilihan dan bahan-bahan
                premium segar dari pertanian.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#products"
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--primary)] px-6 py-4 text-sm font-semibold text-[#2f2b16] shadow-[0_16px_34px_-20px_var(--shadow)] transition hover:-translate-y-px hover:bg-[var(--primary-strong)] hover:shadow-[0_20px_36px_-20px_rgba(138,125,83,0.28)]"
              >
                Jelajahi Menu
              </Link>
              <Link
                href="/#about"
                className="inline-flex items-center justify-center rounded-2xl border border-[rgba(231,223,196,0.92)] bg-[rgba(255,252,247,0.9)] px-6 py-4 text-sm font-semibold text-[#4e483e] transition hover:border-[var(--primary)] hover:bg-[var(--primary-ghost)] hover:text-[#373119]"
              >
                Kisah Kami
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            className="relative lg:mr-[calc(50%-50vw)] lg:pl-10"
            delay={180}
            variant="right"
          >
            <div className="absolute -inset-6 hidden rounded-[48px] bg-[radial-gradient(circle_at_top_right,rgba(206,199,111,0.2),transparent_55%)] lg:block" />
            <div className="home-hero-image relative overflow-hidden rounded-l-[40px] rounded-r-none bg-[#e7d7bd] shadow-[0_28px_70px_-34px_rgba(70,52,26,0.38)]">
              <Image
                src="/lumpia-pinterest.jpg"
                alt="Lumpia goreng hangat di atas piring saji"
                width={1200}
                height={880}
                className="h-[320px] w-full rounded-l-[40px] rounded-r-none object-cover object-center sm:h-[420px] lg:h-[500px]"
                priority
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-white py-8" id="about">
        <div className="mx-auto grid max-w-[1360px] gap-14 px-3 sm:px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20 lg:px-3">
          <section id="about" className="contents">
            <RevealOnScroll className="relative min-h-[520px]" variant="left">
              <div className="absolute left-2 top-4 w-[62%] rotate-[-4deg] bg-gray-200 p-4 shadow-[0_30px_60px_-36px_rgba(67,48,21,0.35)] sm:w-[56%]">
                <div className="overflow-hidden bg-[#9d9988]">
                  <Image
                    src="/system/amazing-semarang.jpg"
                    alt="Poster warisan Lumpia Mbak Cun"
                    width={700}
                    height={900}
                    className="h-[360px] w-full object-cover"
                  />
                </div>
                <h1 className="pt-5 text-center font-[var(--font-noto-serif)] text-xl text-[#6c6455]">
                  Semarang Heritage
                </h1>
              </div>

              <div className="absolute top-[5rem] left-[20%] z-10 w-[42%] rotate-[6deg] bg-gray-200 p-3 shadow-[0_28px_60px_-32px_rgba(33,24,10,0.4)] sm:left-[34%] sm:w-[40%]">
                <div className="overflow-hidden bg-[#26211b]">
                  <Image
                    src="/products/lumpiasemarang.jpg"
                    alt="Resep warisan Lumpia Mbak Cun"
                    width={620}
                    height={760}
                    className="h-[240px] w-full object-cover"
                  />
                </div>
                <h1 className="pt-4 text-center font-[var(--font-noto-serif)] text-lg text-[#6c6455]">
                  Resep Warisan
                </h1>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="max-w-2xl space-y-8" delay={140}>
              <div className="space-y-6">
                <h2 className="max-w-xl text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-[#231f19] sm:text-[3.4rem]">
                  Dibuat oleh Sejarah,
                  <br />
                  Dijaga dengan Cinta
                </h2>
                <div className="max-w-xl border-l-2 border-[var(--primary)] pl-5 text-lg leading-8 text-[#6c6455]">
                  &ldquo;Mbak Cun memulai dengan warung kecil di dekat pelabuhan.
                  Beliau percaya bahwa rahasianya bukan hanya pada bumbu,
                  melainkan pada kesabaran dalam proses memasak yang
                  perlahan.&rdquo;
                </div>
              </div>

              <p className="max-w-2xl text-base leading-8 text-[#655f52]">
                Setiap lumpia yang keluar dari dapur kami membawa serta tiga
                puluh tahun jiwa kuliner Semarang. Kami menggunakan bahan-bahan
                terbaik dan jalur pasokan rebung yang sama seperti yang kami
                lakukan sejak awal merintis, menjadikan setiap sajian bukan cuma
                makanan, tetapi narasi sebuah kota.
              </p>

              <Link
                href="/location"
                className="inline-flex items-center gap-3 text-base font-semibold text-[var(--primary-strong)] transition hover:text-[#938a39]"
              >
                Baca Biografi Selengkapnya
                <span aria-hidden="true" className="text-xl leading-none">
                  &rarr;
                </span>
              </Link>
            </RevealOnScroll>
          </section>
        </div>
      </section>

      <main className="mx-auto max-w-[1360px] px-3 py-10 sm:px-4 lg:px-3">
        <section id="products" className="mt-16">
          <RevealOnScroll className="text-center">
            <p
              className="text-4xl font-normal tracking-[-0.04em] text-[#111111] sm:text-5xl"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              Varian{" "}
              <span className="relative inline-block">
                Unggulan
                <span className="absolute inset-x-0 -bottom-4 h-[4px] rounded-full bg-[rgba(206,199,111,0.75)]" />
              </span>{" "}
              Kami
            </p>
            <h2 className="mt-8 text-2xl font-semibold text-[#111111] sm:text-xl">
              Dipilih dengan cermat, disiapkan dengan hormat. Pilih pengalaman
              warisan Anda.
            </h2>
          </RevealOnScroll>

          <div className="mt-8 grid gap-16 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <RevealOnScroll key={product.slug} delay={index * 110}>
                <article className="home-product-card flex h-full flex-col overflow-hidden rounded-4xl bg-[rgba(255,253,247,0.96)] shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={420}
                    className="h-56 w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="mb-3 grid grid-cols-2 gap-4">
                      <h3 className="whitespace-nowrap text-2xl font-semibold text-[#1f1b15]">
                        {getHomeProductTitle(product)}
                      </h3>
                      <p className="text-lg font-bold text-right text-[var(--primary-strong)] sm:text-xl">
                        {formatCompactPrice(product.price)}
                      </p>
                      <p className="col-span-2 mb-6 text-sm leading-7 text-[#5f5a4b]">
                        {product.description}
                      </p>
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[#2f2b16] shadow-[0_16px_34px_-20px_var(--shadow)] transition hover:-translate-y-px hover:bg-[var(--primary-strong)] hover:shadow-[0_20px_36px_-20px_rgba(138,125,83,0.28)]"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </main>

      <section className="mt-20 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-[1360px] px-3 sm:px-4 lg:px-3">
          <RevealOnScroll
            className="rounded-[44px] bg-[#E7E1DF] px-6 py-10 sm:px-8 lg:px-12 lg:py-14"
            variant="zoom"
          >
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {highlightItems.map((item, index) => (
                <RevealOnScroll key={item.title} className="h-full" delay={index * 120}>
                  <article className="home-feature-card flex h-full flex-col items-center text-center">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(255,252,247,0.92)] text-[var(--primary-strong)] shadow-[0_16px_28px_-22px_rgba(90,70,36,0.35)]">
                      {item.icon}
                    </div>
                    <h3
                      className="text-3xl font-semibold text-[#1f1b15]"
                      style={{ fontFamily: "var(--font-noto-serif)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-[20rem] text-base leading-8 text-[#5f5a4b]">
                      {item.description}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-white pt-20">
        <div className="mx-auto grid max-w-[1360px] gap-16 px-3 py-20 sm:px-4 lg:grid-cols-2 lg:px-3">
          <RevealOnScroll className="space-y-8">
            <h2 className="text-4xl">Apa Kata Tamu Kami</h2>
            <TestimonialCarousel />
          </RevealOnScroll>

          <RevealOnScroll className="home-map-shell" delay={140} variant="right">
            <div className="flex justify-between">
              <h2 className="text-4xl">Lokasi Kedai Kami</h2>
              <p className="text-[#CEC76F]">Jl. Pandanaran 12 No 4</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4707680841634!2d110.41851497504511!3d-7.071288692931386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70895fd178d4d7%3A0xc355f2c536e952d0!2sLumpia%20Semarang%20%7C%20Lumpia%20Mbak%20Cun!5e0!3m2!1sid!2sjp!4v1776675251597!5m2!1sid!2sjp"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg w-full"
            />
          </RevealOnScroll>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-[rgba(255,253,247,0.9)] py-8">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-4 px-3 text-sm text-[#5f5a4b] sm:px-4 md:flex-row md:items-center md:justify-between lg:px-3">
          <p>&copy; 2026 {site.name}. Semua hak cipta dilindungi.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/#about">Tentang</Link>
            <Link href="/#products">Menu</Link>
            <Link href="/location">Lokasi</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
