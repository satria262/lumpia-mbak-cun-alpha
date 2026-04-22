import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import { products } from "../../../lib/siteData";

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

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 5h2l2 9h8.8l2-6.5H7.3" />
      <path d="M10 18.5a1 1 0 1 0 0 .01" />
      <path d="M17 18.5a1 1 0 1 0 0 .01" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M10 7 5 12l5 5" />
      <path d="M6 12h13" />
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

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>
  )
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Halo, saya ingin pesan ${product.name}. Boleh minta info ketersediaan dan cara pemesanannya?`,
  );

  return (
    <div className="theme-shell">
      <Navbar />

      <main className="mx-auto max-w-[1360px] px-4 pb-16 pt-8 sm:px-5 lg:px-6 lg:pb-24 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] lg:items-start lg:gap-14">
          <section className="space-y-4">
            <div className="overflow-hidden rounded-[30px] bg-[#e8decb] shadow-[0_28px_64px_-34px_rgba(70,52,26,0.42)]">
              <Image
                src={product.image}
                alt={product.name}
                width={1200}
                height={960}
                className="h-[360px] w-full object-cover sm:h-[480px] lg:h-[640px]"
                priority
              />
            </div>
            <div className="flex md:items-center space-x-2">
              <CameraIcon />
              <p className="text-xs text-center md:text-start italic text-[#7a7365] ">{product.imageNote}</p>
            </div>
          </section>

          <section className="max-w-[36rem] space-y-7 lg:pt-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">
                <a href="/#products"><span>Produk</span></a>
                <span className="text-[#b4ab90]">/</span>
                <span><b>{product.badge}</b></span>
              </div>

              <div className="space-y-3">
                <h1 className=" text-4xl leading-[0.98] font-semibold tracking-[-0.05em] text-[#211b13] sm:text-5xl">
                  {product.name}
                </h1>
                <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                  <p className="text-3xl font-semibold text-[var(--primary-strong)]">
                    {product.price}
                  </p>
                  <p className="pb-1 text-sm text-[#6e685c]">/ {product.portion}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                Filosofi Rasa
              </p>
              <p className="text-base leading-8 text-[#5b5549]">
                {product.philosophy}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                Bahan Baku Utama
              </p>
              <div className="grid gap-3 grid-cols-3">
                {product.ingredients.map((item) => (
                  <article
                    key={item}
                    className="rounded-[18px] border border-[rgba(231,223,196,0.92)] bg-[rgba(255,252,247,0.82)] px-4 py-4 text-center shadow-[0_16px_30px_-28px_rgba(70,52,26,0.35)]"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-ghost)] text-[var(--primary-strong)]">
                      <IngredientIcon />
                    </div>
                    <p className="mt-3 text-sm font-medium text-[#423c31]">{item}</p>
                  </article>
                ))}
              </div>
            </div>

            <article className="bg-[#CEC76F] pl-[2px] rounded-[22px]">
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
                    {product.storageTip}
                  </p>
                </div>
              </div>
              </div>
            </article>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
                className="button-primary inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-2xl px-6 text-sm font-semibold"
                target="_blank"
                rel="noreferrer"
              >
                <CartIcon />
                Pesan Sekarang
              </Link>
              <Link
                href="/#products"
                className="button-secondary inline-flex min-h-14 items-center justify-center rounded-2xl px-5 text-sm font-semibold sm:w-14"
                aria-label="Kembali ke daftar produk"
              >
                <ShareIcon />
              </Link>
            </div>

            <p className="hidden md:block text-sm leading-7 text-[#6e685c]">{product.description}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
