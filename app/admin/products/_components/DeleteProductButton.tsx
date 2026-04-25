"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { AdminIcon } from "../../_components/AdminIcons";
import { deleteProduct } from "../actions";

type DeleteProductButtonProps = {
  productId: number;
  productName: string;
  compact?: boolean;
};

function SubmitButton({ compact = false }: { compact?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#9a3f1d] px-5 text-sm font-bold text-white transition hover:bg-[#823417] disabled:cursor-not-allowed disabled:opacity-65"
    >
      <AdminIcon name="trash" className="h-4 w-4" />
      {pending ? (compact ? "..." : "Menghapus...") : "Ya, Hapus"}
    </button>
  );
}

export function DeleteProductButton({
  productId,
  productName,
  compact = false,
}: DeleteProductButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={
          compact
            ? "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#f0d5c8] bg-[#fff6f1] text-sm font-bold text-[#9a3f1d] transition hover:bg-[#ffe9dd]"
            : "inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#f0d5c8] bg-[#fff6f1] px-5 text-sm font-bold text-[#9a3f1d] transition hover:bg-[#ffe9dd]"
        }
      >
        <AdminIcon name="trash" className="h-4 w-4" />
        {compact ? "Hapus" : "Hapus Produk"}
      </button>

      <div
        aria-hidden={!isModalOpen}
        className={`fixed inset-0 z-50 grid place-items-center px-4 transition duration-300 ${
          isModalOpen
            ? "pointer-events-auto bg-[#211d16]/45 opacity-100 backdrop-blur-sm"
            : "pointer-events-none bg-[#211d16]/0 opacity-0 backdrop-blur-0"
        }`}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setIsModalOpen(false);
          }
        }}
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby={`delete-product-${productId}-title`}
          className={`w-full max-w-md rounded-2xl border border-[#f0d5c8] bg-white p-6 shadow-[0_24px_80px_-38px_rgba(70,52,26,0.55)] transition duration-300 ${
            isModalOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-95 opacity-0"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#fff6f1] text-[#9a3f1d]">
              <AdminIcon name="trash" className="h-5 w-5" />
            </div>
            <div>
              <h2
                id={`delete-product-${productId}-title`}
                className="font-[var(--font-noto-serif)] text-xl font-semibold text-[#211d16]"
              >
                Hapus produk?
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#6f6a5c]">
                Produk{" "}
                <span className="font-semibold text-[#211d16]">
                  {productName}
                </span>{" "}
                akan dihapus dari inventaris. Tindakan ini tidak bisa
                dibatalkan.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-[#e5dfd2] bg-white px-5 text-sm font-bold text-[#575248] transition hover:border-[#92a25f] hover:text-[#526b2d]"
            >
              Batal
            </button>
            <form action={deleteProduct} className="flex flex-1">
              <input type="hidden" name="productId" value={productId} />
              <SubmitButton compact={compact} />
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
