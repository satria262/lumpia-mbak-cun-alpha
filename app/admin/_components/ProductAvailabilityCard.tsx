"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProductAvailability } from "../dashboard-data";

type ProductAvailabilityCardProps = {
  products: ProductAvailability[];
};

const MAX_ACTIVE_PRODUCTS = 4;

export function ProductAvailabilityCard({
  products,
}: ProductAvailabilityCardProps) {
  const [availability, setAvailability] = useState(products);
  const [loadingProductIds, setLoadingProductIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  function showLimitWarning() {
    setIsLimitModalOpen(true);
  }

  async function updateProductAvailability(
    productId: string,
    nextEnabled: boolean,
  ) {
    const response = await fetch(
      `/api/admin/products/${productId}/availability`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ availability: nextEnabled }),
      },
    );
    const result = (await response.json()) as {
      availability?: boolean;
      error?: string;
    };

    if (!response.ok || typeof result.availability !== "boolean") {
      throw new Error(result.error ?? "Status produk gagal diperbarui.");
    }

    return result.availability;
  }

  async function toggleProduct(productId: string) {
    if (loadingProductIds.has(productId)) {
      return;
    }

    const selectedProduct = availability.find(
      (product) => product.id === productId,
    );

    if (!selectedProduct) {
      return;
    }

    const activeCount = availability.filter((product) => product.enabled).length;
    const previousEnabled = selectedProduct.enabled;
    const nextEnabled = !selectedProduct.enabled;

    if (!selectedProduct.enabled && activeCount >= MAX_ACTIVE_PRODUCTS) {
      showLimitWarning();
      return;
    }

    setErrorMessage("");
    setLoadingProductIds((currentIds) => new Set(currentIds).add(productId));
    setAvailability((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, enabled: nextEnabled } : product,
      ),
    );

    try {
      const savedAvailability = await updateProductAvailability(
        productId,
        nextEnabled,
      );

      setAvailability((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId
            ? { ...product, enabled: savedAvailability }
            : product,
        ),
      );
    } catch (error) {
      setAvailability((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId
            ? { ...product, enabled: previousEnabled }
            : product,
        ),
      );
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Status produk gagal diperbarui.",
      );
    } finally {
      setLoadingProductIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(productId);
        return nextIds;
      });
    }
  }

  async function enableAllProducts() {
    if (loadingProductIds.size > 0) {
      return;
    }

    showLimitWarning();
    const previousAvailability = availability;
    const nextAvailability = availability.map((product, index) => ({
      ...product,
      enabled: index < MAX_ACTIVE_PRODUCTS,
    }));
    const changedProducts = nextAvailability.filter((product, index) => {
      return product.enabled !== previousAvailability[index]?.enabled;
    });

    if (changedProducts.length === 0) {
      return;
    }

    setErrorMessage("");
    setLoadingProductIds(new Set(changedProducts.map((product) => product.id)));
    setAvailability(nextAvailability);

    try {
      await Promise.all(
        changedProducts.map((product) =>
          updateProductAvailability(product.id, product.enabled),
        ),
      );
    } catch (error) {
      setAvailability(previousAvailability);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Status produk gagal diperbarui.",
      );
    } finally {
      setLoadingProductIds(new Set());
    }
  }

  const isAnyProductLoading = loadingProductIds.size > 0;

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
          disabled={isAnyProductLoading}
          className="text-sm font-bold text-[#526b2d] transition hover:text-[#2f3f18] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Aktifkan 4
        </button>
      </div>

      <div className="space-y-6">
        {errorMessage ? (
          <div
            role="alert"
            className="rounded-lg border border-[#f0d0c4] bg-[#fff7f3] px-4 py-3 text-sm font-semibold text-[#9a3f24]"
          >
            {errorMessage}
          </div>
        ) : null}

        {availability.length > 0 ? (
          availability.map((product) => {
            const status = product.enabled ? "available" : "sold-out";
            const isLoading = loadingProductIds.has(product.id);

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
                  disabled={isLoading}
                  onClick={() => toggleProduct(product.id)}
                  className={`relative h-8 w-14 rounded-full transition disabled:cursor-not-allowed disabled:opacity-70 ${
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

      <div
        className={`fixed inset-0 z-50 grid place-items-center bg-[#211d16]/28 px-4 backdrop-blur-sm transition duration-200 ${
          isLimitModalOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isLimitModalOpen}
        onClick={() => setIsLimitModalOpen(false)}
      >
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="availability-limit-title"
          aria-describedby="availability-limit-description"
          className={`w-full max-w-sm rounded-xl border border-[#eee8dc] bg-white p-6 shadow-[0_24px_60px_-28px_rgba(70,52,26,0.55)] transition duration-200 ${
            isLimitModalOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-95 opacity-0"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#fff4d4] text-xl font-bold text-[#9a6a00]">
              !
            </div>
            <div>
              <h3
                id="availability-limit-title"
                className="font-[var(--font-noto-serif)] text-lg font-semibold text-[#211d16]"
              >
                Batas Produk Aktif
              </h3>
              <p
                id="availability-limit-description"
                className="mt-2 text-sm leading-6 text-[#6f6a5c]"
              >
                Maksimal 4 produk bisa aktif di etalase. Nonaktifkan salah satu
                produk aktif sebelum menambahkan produk lain.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLimitModalOpen(false)}
            className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#526b2d] px-4 text-sm font-bold text-white transition hover:bg-[#435724]"
          >
            Mengerti
          </button>
        </div>
      </div>
    </section>
  );
}
