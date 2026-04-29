import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import type { CSSProperties } from "react";
import Navbar from "../../components/Navbar";
import ProductOrderModal from "./ProductOrderModal";
import ShareProductButton from "./ShareProductButton";
import { prisma } from "@/lib/prisma";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function IngredientIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M7.5 10.5c0-3.1 2.2-5.6 5.1-5.6 2.4 0 4.3 1.7 4.3 4.1 0 5.5-4.1 9.8-8.8 9.8a3.3 3.3 0 0 1-3.3-3.3c0-2.2 1.2-4 2.7-5.8Z" />
      <path d="M10 13.8c1.2-1.3 2.6-2.4 4.1-3.2" />
    </svg>
  );
}

function StorageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M7 4.5h10" />
      <path d="M6.5 7.5h11a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9a1 1 0 0 1 1-1Z" />
      <path d="M9.5 11.2h5" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#7a7365" className="hidden md:block size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
  )
}

export const dynamic = "force-dynamic";

function formatProductPrice(value: number | null | undefined) {
  const price = Number(value ?? 0);

  if (!Number.isFinite(price)) {
    return "Rp0";
  }

  return `Rp${price.toLocaleString("id-ID")}`;
}

const fallbackProductImage = "/system/lumpia-logo.png";

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

function getDisplayText(value: string | null | undefined, fallback: string) {
  const text = value?.trim();
  return text && text.length > 0 ? text : fallback;
}

function getDisplayList(value: string[] | null | undefined) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function getSlugCandidates(value: string) {
  const candidates = new Set<string>();
  candidates.add(value);

  try {
    candidates.add(decodeURIComponent(value));
  } catch {
    // Keep the original route param when decoding fails.
  }

  for (const candidate of Array.from(candidates)) {
    candidates.add(candidate.trim());
  }

  return Array.from(candidates).filter((candidate) => candidate.length > 0);
}

const getProductByRouteParam = cache(async (slug: string) => {
  const slugCandidates = getSlugCandidates(slug);
  const numericId = Number(slugCandidates[0]);

  return prisma.product
    .findFirst({
      where: {
        OR: [
          ...slugCandidates.map((candidate) => ({ slug: candidate })),
          ...(Number.isInteger(numericId) ? [{ id: numericId }] : []),
        ],
      },
      select: {
        slug: true,
        name: true,
        price: true,
        description: true,
        image: true,
        badge: true,
        portion: true,
        philosophy: true,
        ingredients: true,
        storageTip: true,
        imageNote: true,
      },
    })
    .catch((error) => {
      console.error(
        `Failed to fetch product detail for route param "${slug}".`,
        error,
      );
      return null;
    });
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByRouteParam(slug);

  if (!product) {
    return buildPageMetadata({
      title: "Produk Tidak Ditemukan",
      description: "Produk Lumpia Mbak Cun yang Anda cari tidak tersedia.",
      path: `/products/${encodeURIComponent(slug)}`,
    });
  }

  const title = getDisplayText(product.name, "Produk Lumpia Mbak Cun");
  const description = getDisplayText(
    product.description,
    "Informasi produk Lumpia Mbak Cun.",
  );

  return buildPageMetadata({
    title,
    description:
      description.length > 155
        ? `${description.slice(0, 152).trim()}...`
        : description,
    path: `/products/${encodeURIComponent(product.slug || slug)}`,
    image: getProductImage(product.image),
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductByRouteParam(slug);

  if (!product) {
    notFound();
  }

  const displayProduct = {
    slug: product.slug,
    name: getDisplayText(product.name, "Produk Lumpia Mbak Cun"),
    price: product.price,
    description: getDisplayText(
      product.description,
      "Informasi produk belum tersedia.",
    ),
    image: getProductImage(product.image),
    badge: getDisplayText(product.badge, "Produk"),
    portion: getDisplayText(product.portion, "per porsi"),
    philosophy: getDisplayText(
      product.philosophy,
      "Rasa khas Lumpia Mbak Cun yang dibuat segar dan dijaga kualitasnya.",
    ),
    ingredients: getDisplayList(product.ingredients),
    storageTip: getDisplayText(
      product.storageTip,
      "Simpan produk di tempat sejuk dan panaskan kembali sebelum disajikan.",
    ),
    imageNote: getDisplayText(product.imageNote, "Foto produk Lumpia Mbak Cun."),
  };
  const revealStyle = (delay: string) =>
    ({ "--product-delay": delay } as CSSProperties);

  return (
    <div className="theme-shell">
      <Navbar />

      <main className="mx-auto max-w-[1360px] px-4 pb-16 pt-8 sm:px-5 lg:px-6 lg:pb-24 lg:pt-12">
        <div className="product-detail-stage grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] lg:items-start lg:gap-14">
          <section className="product-detail-visual space-y-4">
            <div className="product-detail-image-shell overflow-hidden rounded-[30px] bg-[#e8decb] shadow-[0_28px_64px_-34px_rgba(70,52,26,0.42)]">
              <Image
                src={displayProduct.image}
                alt={displayProduct.name}
                width={1200}
                height={960}
                className="product-detail-image h-[360px] w-full object-cover sm:h-[480px] lg:h-[640px]"
                priority
              />
            </div>
            <div className="product-detail-caption flex md:items-center space-x-2">
              <CameraIcon />
              <p className="text-xs text-center md:text-start italic text-[#7a7365] ">{displayProduct.imageNote}</p>
            </div>
          </section>

          <section className="max-w-[36rem] space-y-7 lg:pt-8">
            <div
              className="product-detail-block space-y-4"
              style={revealStyle("120ms")}
            >
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">
                <Link href="/#products"><span>Produk</span></Link>
                <span className="text-[#b4ab90]">/</span>
                <span><b>{displayProduct.badge}</b></span>
              </div>

              <div className="space-y-3">
                <h1 className=" text-4xl leading-[0.98] font-semibold tracking-[-0.05em] text-[#211b13] sm:text-5xl">
                  {displayProduct.name}
                </h1>
                <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                  <p className="text-3xl font-semibold text-[var(--primary-strong)]">
                    {formatProductPrice(displayProduct.price)}
                  </p>
                  <p className="pb-1 text-sm text-[#6e685c]">/ {displayProduct.portion}</p>
                </div>
              </div>
            </div>

            <div
              className="product-detail-block space-y-3"
              style={revealStyle("220ms")}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                Filosofi Rasa
              </p>
              <p className="text-base leading-8 text-[#5b5549]">
                {displayProduct.philosophy}
              </p>
            </div>

            {displayProduct.ingredients.length > 0 ? (
              <div
                className="product-detail-block space-y-4"
                style={revealStyle("320ms")}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                  Bahan Baku Utama
                </p>
                <div className="grid gap-3 grid-cols-3">
                  {displayProduct.ingredients.map((item, index) => (
                    <article
                      key={`${item}-${index}`}
                      className="product-detail-ingredient rounded-[18px] border border-[rgba(231,223,196,0.92)] bg-[rgba(255,252,247,0.82)] px-4 py-4 text-center shadow-[0_16px_30px_-28px_rgba(70,52,26,0.35)]"
                      style={revealStyle(`${420 + index * 90}ms`)}
                    >
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-ghost)] text-[var(--primary-strong)]">
                        <IngredientIcon />
                      </div>
                      <p className="mt-3 text-sm font-medium text-[#423c31]">{item}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            <article
              className="product-detail-block rounded-[22px] bg-[#FCDC31] pl-[2px]"
              style={revealStyle("520ms")}
            >
              <div className="rounded-[22px] bg-[#FEFBF4] px-5 py-5 shadow-[0_18px_32px_-28px_rgba(70,52,26,0.35)]">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-ghost)] text-[var(--primary-strong)]">
                  <StorageIcon />
                </div>
                <div>
                  <p className="font-[var(--font-noto-serif)] text-xl font-semibold text-[#282118]">
                    Panduan Penyimpanan
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#5b5549]">
                    {displayProduct.storageTip}
                  </p>
                </div>
              </div>
              </div>
            </article>

            <div
              className="product-detail-block flex flex-col gap-3 sm:flex-row"
              style={revealStyle("620ms")}
            >
              <ProductOrderModal productName={displayProduct.name} />
              <ShareProductButton
                productName={displayProduct.name}
                sharePath={`/products/${encodeURIComponent(displayProduct.slug)}`}
              />
            </div>

            <p
              className="product-detail-block hidden text-sm leading-7 text-[#6e685c] md:block"
              style={revealStyle("720ms")}
            >
              {displayProduct.description}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
