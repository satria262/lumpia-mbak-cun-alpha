import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { AdminHeader } from "../_components/AdminHeader";
import { AdminFlashNotice } from "../_components/AdminFlashNotice";
import { AdminIcon } from "../_components/AdminIcons";
import { AdminSidebar } from "../_components/AdminSidebar";
import { DeleteProductButton } from "./_components/DeleteProductButton";
import { getFlashFromSearchParams } from "@/lib/admin-query-flash";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Inventaris Produk | Lumpia Mbak Cun",
  description: "Kelola katalog produk Lumpia Mbak Cun.",
};

const fallbackImage = "/system/lumpia-logo.png";

type AdminProductsPageProps = {
  searchParams?: Promise<{
    success?: string | string[];
    error?: string | string[];
  }>;
};

function formatPrice(value: number | null | undefined) {
  const price = Number(value ?? 0);

  if (!Number.isFinite(price)) {
    return "Rp0";
  }

  return `Rp${price.toLocaleString("id-ID")}`;
}

function formatStock(value: number | null | undefined) {
  const stock = Number(value ?? 0);

  if (!Number.isFinite(stock)) {
    return "STOK: 0 UNIT";
  }

  return `STOK: ${stock.toLocaleString("id-ID")} UNIT`;
}

function getProductImage(src: string | null | undefined) {
  const value = src?.trim();
  return value && value.length > 0 ? value : fallbackImage;
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const session = await requireAdminSession();
  const queryFlash = getFlashFromSearchParams(await searchParams);
  let flash = queryFlash;
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  let loadFailed = false;

  try {
    products = await prisma.product.findMany({
      orderBy: { id: "asc" },
    });
  } catch (error) {
    console.error("Failed to load products.", error);
    loadFailed = true;
    flash ??= {
      type: "error",
      message: "Failed to load products",
    };
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#211d16]">
      <div className="min-h-screen lg:pl-64">
        <AdminSidebar email={session.user.email} />

        <div className="min-w-0">
          <AdminHeader
            title="Inventaris Produk"
            subtitle="Arsip visual bahan dan menu siap saji yang dikelola dari database."
          />

          <section className="px-6 py-8 md:px-10">
            <AdminFlashNotice flash={flash} />

            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h1 className="font-[var(--font-noto-serif)] text-2xl font-semibold text-[#211d16]">
                  Portofolio Produk
                </h1>
                <p className="mt-2 text-sm leading-6 text-[#6f6a5c]">
                  Pantau stok, harga, dan status produk yang tampil di katalog
                  Lumpia Mbak Cun.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-[#e5dfd2] bg-white px-5 text-sm font-bold text-[#575248] transition hover:border-[#92a25f] hover:text-[#526b2d]"
                >
                  Ekspor Katalog
                </button>
                <Link
                  href="/admin/products/create"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-[#526b2d] px-5 text-sm font-bold text-white transition hover:bg-[#435724]"
                >
                  Tambah Produk
                </Link>
              </div>
            </div>

            {loadFailed ? (
              <div className="rounded-xl border border-[#f0d5c8] bg-[#fff6f1] p-8 text-center shadow-[0_18px_45px_-36px_rgba(70,52,26,0.45)]">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-[#9a3f1d]">
                  <AdminIcon name="message" className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-[var(--font-noto-serif)] text-xl font-semibold text-[#211d16]">
                  Data produk tidak bisa dimuat.
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6f6a5c]">
                  Tidak ada data palsu yang ditampilkan. Coba muat ulang
                  halaman setelah koneksi database siap.
                </p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-xl border border-[#eee8dc] bg-white shadow-[0_18px_45px_-36px_rgba(70,52,26,0.45)] transition hover:-translate-y-1 hover:shadow-[0_26px_55px_-38px_rgba(70,52,26,0.5)]"
                  >
                    <div className="relative aspect-[4/3] bg-[#f0eee8]">
                      <Image
                        src={getProductImage(product.image)}
                        alt={product.name || "Produk Lumpia Mbak Cun"}
                        fill
                        sizes="(min-width: 1280px) 26vw, (min-width: 640px) 42vw, 90vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between gap-3 bg-gradient-to-t from-[#211d16]/78 to-transparent p-4 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-xs font-bold text-[#211d16] shadow-sm transition hover:bg-[#eef3da] hover:text-[#526b2d]"
                        >
                          <AdminIcon name="eye" className="h-4 w-4" />
                          Lihat
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="inline-flex h-9 items-center gap-2 rounded-full bg-[#526b2d] px-4 text-xs font-bold text-white shadow-sm transition hover:bg-[#435724]"
                        >
                          <AdminIcon name="edit" className="h-4 w-4" />
                          Edit
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="min-w-0 font-[var(--font-noto-serif)] text-lg font-semibold text-[#211d16]">
                          {product.name || "Produk Tanpa Nama"}
                        </h2>
                        <div className="flex shrink-0 items-center gap-2">
                          <span
                            className={`h-3 w-3 rounded-full border ${
                              product.availability
                                ? "border-[#526b2d] bg-[#526b2d]"
                                : "border-[#d8d6d2] bg-white"
                            }`}
                            title={
                              product.availability
                                ? "Produk tersedia"
                                : "Produk tidak tersedia"
                            }
                          />
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="grid h-8 w-8 place-items-center rounded-full bg-[#eef3da] text-[#526b2d] transition hover:bg-[#526b2d] hover:text-white"
                            aria-label={`Edit ${product.name || "produk"}`}
                          >
                            <AdminIcon name="edit" className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>

                      <p className="line-clamp-2 text-sm leading-6 text-[#6f6a5c]">
                        {product.description || "Belum ada deskripsi produk."}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                        <p className="font-semibold uppercase tracking-[0.04em] text-[#9c978d]">
                          {formatStock(product.stock)}
                        </p>
                        <p className="font-[var(--font-noto-serif)] font-semibold text-[#526b2d]">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(product.highlights ?? []).slice(0, 2).map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-[#eef3da] px-3 py-1 text-xs font-semibold text-[#526b2d]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-3 pt-1">
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] text-sm font-bold text-[#575248] transition hover:border-[#92a25f] hover:bg-white hover:text-[#526b2d]"
                        >
                          <AdminIcon name="eye" className="h-4 w-4" />
                          Lihat
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#526b2d] text-sm font-bold text-white transition hover:bg-[#435724]"
                        >
                          <AdminIcon name="edit" className="h-4 w-4" />
                          Edit
                        </Link>
                        <DeleteProductButton
                          productId={product.id}
                          productName={product.name || "produk"}
                          compact
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#d8cfb5] bg-white p-8 text-sm text-[#6f6a5c]">
                Belum ada produk di database.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
