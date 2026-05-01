import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import FlipSection from "./components/FlipSection";
import Navbar from "./components/Navbar";
import { OrderModalTrigger } from "./components/OrderModal";
import TestimonialCarousel from "./components/TestimonialCarousel";
import type { TestimonialItem } from "./components/TestimonialCarousel";
import {
  formatCompactPrice,
  getHomeProductTitle,
  getSiteContent,
} from "../lib/content";
import { prisma } from "@/lib/prisma";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Lumpia Semarang Asli dan Tahu Bakso",
  description:
    "Nikmati Lumpia Mbak Cun, lumpia Semarang otentik, tahu bakso, dan menu rumahan segar dengan resep keluarga sejak 1998.",
});

type HomeProduct = {
  slug: string;
  name: string;
  price: number;
  description: string;
  image: string;
  badge: string;
};

const highlightItems = [
  {
    title: "Rebung Segar",
    description:
      "Didatangkan dan diolah dengan kesabaran, memastikan tekstur renyah manis tanpa aroma yang menyengat.",
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
      "Kami hanya menggunakan telur dari supplier langganan untuk isian, menciptakan tekstur yang lebih kaya dan gurih yang mengikat cita rasa.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M12 3.5c3.4 0 6 5.1 6 9.7 0 4.2-2.5 7.3-6 7.3s-6-3.1-6-7.3c0-4.6 2.6-9.7 6-9.7Z" />
        <path d="M13.2 7.2l.4.9.9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4.4-.9Z" />
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

export const dynamic = "force-dynamic";

const fallbackProductImage = "/system/lumpia-logo.png";

function StarIcon () {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#FCDC31" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FCDC31" className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  )
}

function CheckBadgeIcon () {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00FF8C" className="size-4">
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  )
}

function getProductImage(src: string | null | undefined) {
  const value = src?.trim();

  if (!value) {
    return fallbackProductImage;
  }

  if (value.startsWith("/")) {
    return value;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com"
      ? value
      : fallbackProductImage;
  } catch {
    return fallbackProductImage;
  }
}

async function getHomeProducts(): Promise<HomeProduct[]> {
  try {
    return await prisma.product.findMany({
      where: {
        availability: true,
        slug: { not: "" },
      },
      orderBy: { id: "asc" },
      take: 4,
      select: {
        slug: true,
        name: true,
        price: true,
        description: true,
        image: true,
        badge: true
      },
    });
  } catch (error) {
    console.error("Failed to fetch home products.", error);
    return [];
  }
}

async function getHomeTestimonials(): Promise<TestimonialItem[]> {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { id: "desc" },
      select: {
        id: true,
        testimonial: true,
        userName: true,
        userOccupation: true,
        userAvatar: true,
      },
    });

    return testimonials.map((testimonial) => ({
      id: testimonial.id,
      quote: testimonial.testimonial,
      name: testimonial.userName,
      role: testimonial.userOccupation,
      image: testimonial.userAvatar,
    }));
  } catch (error) {
    console.error("Failed to fetch home testimonials.", error);
    return [];
  }
}

export default async function Home() {
  const [products, testimonials] = await Promise.all([
    getHomeProducts(),
    getHomeTestimonials(),
  ]);
  const site = getSiteContent();

  return (
    <div className="theme-shell">
      <Navbar />

      <main>
      <section className="overflow-x-clip bg-white py-8 md:py-10 lg:py-12">
        <div className="mx-auto grid max-w-[1360px] gap-12 px-3 sm:px-4 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-28 lg:px-3">
          <div className="max-w-xl space-y-8 location-hero-copy">
            <div className="space-y-5 w-full text-center md:text-start">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--secondary)]">
                Est. 1998 - Semarang
              </p>
              <h1 className="text-5xl leading-[0.9] font-semibold  text-[#231f19] sm:text-6xl lg:text-[4.5rem]">
                Cita Rasa Otentik Semarangan
              </h1>
              <p className="max-w-lg text-base leading-8 text-[#655f52] sm:text-lg">
                Temukan resep warisan keluarga yang diturunkan lintas generasi.
                Kulit lumpia yang digoreng dengan minyak panas yang pas sehingga menciptakan kulit golden brown yang renyah membalut rebung pilihan dan bahan-bahan premium segar dari pertanian.              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row -mt-4">
              <OrderModalTrigger
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--primary)] px-6 py-4 text-sm font-semibold text-[#2f2b16] shadow-[0_16px_34px_-20px_var(--shadow)] transition hover:-translate-y-px hover:bg-[var(--primary-strong)] hover:shadow-[0_20px_36px_-20px_rgba(202,166,10,0.38)]"
              >
                Pesan Sekarang
              </OrderModalTrigger>
              <Link
                href="/#product"
                className="inline-flex items-center justify-center rounded-2xl border border-[rgba(231,223,196,0.92)] bg-[rgba(255,252,247,0.9)] px-6 py-4 text-sm font-semibold text-[#4e483e] transition hover:border-[var(--primary)] hover:bg-[var(--primary-ghost)] hover:text-[#373119]"
              >
                Jelajaih Menu
              </Link>
            </div>
          </div>

          <div className="relative lg:mr-[calc(50%-50vw)] lg:pl-10 location-hero-map">
            <div className="absolute -inset-6 hidden rounded-[48px] bg-[radial-gradient(circle_at_top_right,rgba(252,220,49,0.2),transparent_55%)] lg:block" />
            <div className="home-hero-image relative overflow-hidden rounded-l-[40px] rounded-r-none md:bg-[#e7d7bd] shadow-[0_28px_70px_-34px_rgba(70,52,26,0.38)]">
              <Image
                src="/system/hero.jpg"
                alt="Lumpia goreng hangat di atas piring saji"
                width={1200}
                height={880}
                className="h-[320px] w-[710px] rounded-[40px] md:rounded-r-none object-cover object-center sm:h-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8" id="about">
        <div className="mx-auto grid max-w-[1360px] gap-14 px-3 sm:px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20 lg:px-3">
          <section id="about" className="contents">
            <FlipSection className="relative min-h-[520px]">
              <div className="flip-card flip-card-primary absolute left-2 top-4 h-[452px] w-[62%] rotate-[-4deg] sm:w-[56%]">
                <div className="flip-inner">
                  <div className="flip-front bg-gray-200 p-4 shadow-[0_30px_60px_-36px_rgba(67,48,21,0.35)]">
                    <div className="overflow-hidden bg-[#9d9988]">
                      <Image
                        src="/system/amazing-semarang.jpg"
                        alt="Poster warisan Lumpia Mbak Cun"
                        width={700}
                        height={900}
                        className="h-[360px] w-full object-cover"
                      />
                    </div>
                    <p className="font-whisper pt-2 pb-4 text-center text-3xl text-[#6c6455]">
                      Semarang Heritage
                    </p>
                  </div>
                  <div className="flip-back" aria-hidden="true">
                    <div className="flip-back-mark" />
                    <div className="flip-back-lines" />
                  </div>
                </div>
              </div>

              <div className="flip-card flip-card-secondary absolute top-[5rem] left-[50%] z-10 h-[320px] w-[42%] rotate-[6deg] md:left-[40%] sm:left-[34%] sm:w-[40%]">
                <div className="flip-inner">
                  <div className="flip-front bg-gray-200 p-3 shadow-[0_28px_60px_-32px_rgba(33,24,10,0.4)]">
                    <div className="overflow-hidden bg-[#26211b]">
                      <Image
                        src="/products/lumpiasemarang.jpg"
                        alt="Resep warisan Lumpia Mbak Cun"
                        width={620}
                        height={760}
                        className="h-[240px] w-full object-cover"
                      />
                    </div>
                    <p className="font-whisper pt-2 pb-4 text-center text-2xl text-[#6c6455]">
                      Resep Warisan
                    </p>
                  </div>
                  <div className="flip-back" aria-hidden="true">
                    <div className="flip-back-mark" />
                    <div className="flip-back-lines" />
                  </div>
                </div>
              </div>
            </FlipSection>

            <div className="max-w-2xl space-y-8">
              <div className="space-y-6">
                <h2 className="max-w-xl text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-[#231f19] sm:text-[3.4rem]">
                  Dibuat oleh Sejarah,
                  <br />
                  Dijaga dengan Cinta
                </h2>
                <div className="max-w-xl border-l-2 border-[var(--primary)] pl-5 text-lg leading-8 text-[#6c6455] italic">
                  &ldquo;Lumpia Mbak Cun sudah berdiri sejak tahun 1998 dan selalu menjaga rasa dan kualitas makanan kami. Kami memiliki banyak pelanggan setia dan kerjasama dengan berbagai warung di sekitar Semarang.&rdquo;
                </div>
              </div>

              <p className="max-w-2xl text-base leading-8 text-[#655f52]">
                Mbak Cun memulai dengan warung kecil dari rumah yang sederhana``. Beliau percaya bahwa rahasianya bukan hanya pada bumbu, melainkan pada kesabaran dalam proses memasak yang perlahan.
              </p>

              <Link
                href="/location"
                className="inline-flex items-center gap-3 text-base font-semibold text-[var(--primary-strong)] transition hover:text-[#FCDC31]"
              >
                Lokasi
                <span aria-hidden="true" className="text-xl leading-none">
                  &rarr;
                </span>
              </Link>
            </div>
          </section>
        </div>
      </section>

      <div className="mx-auto max-w-[1360px] px-3 py-10 sm:px-4 lg:px-3">
        <section id="products" className="mt-16">
          <div className="text-center">
            <p
              className="text-4xl font-normal tracking-[-0.04em] text-[#111111] sm:text-5xl"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              Varian{" "}
              <span className="relative inline-block">
                Unggulan
                <span className="absolute inset-x-0 -bottom-4 h-[4px] rounded-full bg-[rgba(252,220,49,0.78)]" />
              </span>{" "}
              Kami
            </p>
            <h2 className="mt-8 text-2xl font-semibold text-[#111111] sm:text-xl">
              Dipilih dengan cermat, disiapkan dengan hormat. Pilih pengalaman
              warisan Anda.
            </h2>
          </div>

          {products.length > 0 ? (
            <div className="mt-8 flex flex-wrap lg:flex-nowrap justify-center items-stretch gap-8 lg:gap-4">
              {products.map((product) => (
                <article
                  key={product.slug}
                  className="home-product-card relative flex w-full flex-col overflow-hidden rounded-xl bg-[rgba(255,253,247,0.96)] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="absolute top-3 w-full flex justify-center space-x-2">
                    <div className="flex space-x-1 items-center bg-black/50 px-2 py-1 rounded-md">
                      <StarIcon />
                      <p className="text-white font- text-sm">5.0</p>
                    </div>
                    <div className="flex space-x-1 items-center bg-black/50 px-2 py-1 rounded-md">
                      <CheckBadgeIcon />
                      <p className="text-white font- text-sm">{product.badge}</p>
                    </div>
                  </div>
                  <Image
                    src={getProductImage(product.image)}
                    alt={product.name}
                    width={600}
                    height={420}
                    className="h-56 w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="mb-3 grid grid-cols-2 gap-4">
                      <div className="col-span-2 flex justify-between">
                        <h3 className=" text-2xl font-semibold text-[#1f1b15]">
                          {getHomeProductTitle(product)}
                        </h3>
                        <p className="whitespace-nowrap text-lg font-bold text-right text-[#C9A300] sm:text-lg">
                          {formatCompactPrice(product.price)}
                        </p>
                      </div>
                      <p className="col-span-2 mb-6 text-sm leading-7 text-[#5f5a4b]">
                        {product.description.length > 100 ? product.description.slice(0, 100) + '...' : product.description}
                      </p>
                    </div>
                    <div className="-mt-5 grid gap-2">
                      <Link
                        href={`/products/${encodeURIComponent(product.slug)}`}
                        className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-5 py-4 text-sm font-semibold text-[#2f2b16] shadow-[0_16px_34px_-20px_var(--shadow)] transition hover:-translate-y-px hover:bg-[var(--primary-strong)] hover:shadow-[0_20px_36px_-20px_rgba(202,166,10,0.38)]"
                      >
                        Lihat Detail
                      </Link>
                      <a
                        href={`https://gofood.link/a/C2kf5TE`}
                        target="_blank"
                        className="inline-flex items-center justify-center rounded-md border border-[rgba(231,223,196,0.92)] bg-[rgba(255,252,247,0.9)] px-5 py-4 text-sm font-semibold text-[#4e483e] transition hover:border-[var(--primary)] hover:bg-[var(--primary-ghost)] hover:text-[#373119]"
                      >
                        Pesan Sekarang
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[28px] border border-[rgba(231,223,196,0.92)] bg-[rgba(255,253,247,0.96)] p-8 text-center text-[#5f5a4b] shadow-sm">
              Belum ada produk yang tersedia untuk ditampilkan.
            </div>
          )}
        </section>
      </div>

      <section className="mt-20 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-[1360px] px-3 sm:px-4 lg:px-3">
          <div className="rounded-[44px] bg-[#F7F2E6] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {highlightItems.map((item) => (
                  <article
                    key={item.title}
                    className="home-feature-card flex h-full flex-col items-center text-center"
                  >
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
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-20">
        <div className="mx-auto grid max-w-[1360px] gap-16 px-3 py-20 sm:px-4 lg:grid-cols-2 lg:px-3">
          <div className="space-y-14">
            <h2 className="text-4xl">Apa Kata Tamu Kami</h2>
            <TestimonialCarousel testimonials={testimonials} />
          </div>

          <div className="home-map-shell space-y-4">
            <div className="grid grid-cols-2">
              <h2 className="text-4xl">Lokasi Kedai Kami</h2>
              <p className="text-[#FCDC31]">Jl. Meranti Barat 1 no. 322 Banyumanik Semarang </p>
            </div>
            <iframe
              title="Peta lokasi Lumpia Mbak Cun"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4707680841634!2d110.41851497504511!3d-7.071288692931386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70895fd178d4d7%3A0xc355f2c536e952d0!2sLumpia%20Semarang%20%7C%20Lumpia%20Mbak%20Cun!5e0!3m2!1sid!2sjp!4v1776675251597!5m2!1sid!2sjp"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-[rgba(255,253,247,0.9)] py-8">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-4 px-3 text-sm text-[#5f5a4b] sm:px-4 md:flex-row md:items-center md:justify-between lg:px-3">
          <p>&copy; 2026 {site.name}. All right reserved.</p>
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
