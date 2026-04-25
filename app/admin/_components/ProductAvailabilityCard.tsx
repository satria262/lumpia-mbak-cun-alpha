"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProductAvailability } from "../dashboard-data";

type ProductAvailabilityCardProps = {
  products: ProductAvailability[];
};

export function ProductAvailabilityCard({
  products,
}: ProductAvailabilityCardProps) {
  const [availability, setAvailability] = useState(() =>
    products.map((product) => ({
      ...product,
      enabled: product.enabled,
    })),
  );

  function toggleProduct(productId: string) {
    setAvailability((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, enabled: !product.enabled }
          : product,
      ),
    );
  }

  function enableAllProducts() {
    setAvailability((currentProducts) =>
      currentProducts.map((product) => ({ ...product, enabled: true })),
    );
  }

  return (
    <section aria-labelledby="product-availability-title">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2
          id="product-availability-title"
          className="text-xl font-semibold text-[#211d16]"
        >
          Pusat Ketersediaan Produk
        </h2>
        <button
          type="button"
          onClick={enableAllProducts}
          className="text-sm font-bold text-[#526b2d] transition hover:text-[#2f3f18]"
        >
          Update All
        </button>
      </div>

      <div className="space-y-6">
        {availability.length > 0 ? (
          availability.map((product) => {
            const status = product.enabled ? "available" : "sold-out";

            return (
            <article
              key={product.id}
              className="grid gap-4 rounded-lg border border-[#eee8dc] bg-white p-5 shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)] sm:grid-cols-[88px_1fr_auto] sm:items-center"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={120}
                height={120}
                className="h-20 w-20 rounded-md object-cover"
              />

              <div className="min-w-0">
                <h3 className="font-[var(--font-noto-serif)] text-lg font-semibold text-[#211d16]">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-[#6f6a5c]">
                  {product.description}
                </p>
                <span
                  className={`mt-2 inline-flex rounded px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] ${
                    status === "available"
                      ? "bg-[#eef3da] text-[#526b2d]"
                      : "bg-[#f0eee8] text-[#6f6a5c]"
                  }`}
                >
                  {status === "available" ? "Available" : "Sold Out"}
                </span>
              </div>

              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <button
                  type="button"
                  aria-label={`Toggle ${product.name} availability`}
                  aria-pressed={product.enabled}
                  onClick={() => toggleProduct(product.id)}
                  className={`relative h-8 w-14 rounded-full transition ${
                    product.enabled ? "bg-[#92a25f]" : "bg-[#d8d6d2]"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition ${
                      product.enabled ? "left-7" : "left-1"
                    }`}
                  />
                </button>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#8b8578]">
                  Toggle Status
                </span>
              </div>
            </article>
            );
          })
        ) : (
          <div className="rounded-lg border border-dashed border-[#d8cfb5] bg-white p-8 text-sm text-[#6f6a5c]">
            No products are available to manage yet.
          </div>
        )}
      </div>
    </section>
  );
}
