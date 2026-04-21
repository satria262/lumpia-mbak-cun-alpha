import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import { products } from "../../../lib/siteData";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

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

  return (
    <div className="theme-shell">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6 rounded-4xl bg-[rgba(255,253,247,0.96)] p-10 shadow-lg shadow-[var(--shadow)]">
            <div className="flex flex-col gap-4">
              <div className="accent-chip inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
                {product.badge}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-[#1e1a15]">{product.name}</h1>
              <p className="max-w-2xl text-lg leading-8 text-[#5f5b50]">{product.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.highlights.map((item) => (
                <div key={item} className="rounded-3xl border border-[var(--border)] bg-[#faf7ee] p-5 text-sm text-[#5f5b50] shadow-sm">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 rounded-4xl border border-[var(--border)] bg-[#fdfbf3] p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-[#5f5b50]">Harga satuan</p>
                <p className="text-2xl font-semibold text-[#1e1a15]">{product.price}</p>
              </div>
              <button className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-6 py-4 text-sm font-semibold text-[#2f2b16] shadow-[0_16px_34px_-20px_var(--shadow)] transition hover:-translate-y-px hover:bg-[var(--primary-strong)] hover:shadow-[0_20px_36px_-20px_rgba(138,125,83,0.28)]">
                Pesan Sekarang
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-4xl border border-[var(--border)] bg-[rgba(255,253,247,0.96)] p-6 shadow-sm">
              <Image src={product.image} alt={product.name} width={900} height={700} className="h-full w-full rounded-3xl object-cover" />
            </div>
            <div className="rounded-4xl bg-[var(--primary-ghost)] p-8 text-[#5f5b50] shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--secondary)]">Cerita menu</p>
              <p className="mt-4 text-base leading-7">
                Resep kami dikembangkan untuk mempertahankan cita rasa asli Semarang, dengan sentuhan minuman segar dan sambal khas.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
