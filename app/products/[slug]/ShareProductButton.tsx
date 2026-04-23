"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
      />
    </svg>
  );
}

type ShareProductButtonProps = {
  productName: string;
  sharePath: string;
};

export default function ShareProductButton({
  productName,
  sharePath,
}: ShareProductButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pageUrl, setPageUrl] = useState(sharePath);
  const [hasCopied, setHasCopied] = useState(false);
  const canUsePortal = typeof document !== "undefined";

  function openModal() {
    setHasCopied(false);
    if (typeof window !== "undefined") {
      setPageUrl(new URL(sharePath, window.location.origin).toString());
    }
    setIsOpen(true);
  }

  function closeModal() {
    setHasCopied(false);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  async function handleCopy() {
    if (!pageUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(pageUrl);
      setHasCopied(true);
    } catch {
      setHasCopied(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="button-secondary inline-flex min-h-14 items-center justify-center rounded-2xl px-5 text-sm font-semibold sm:w-14"
        aria-label={`Bagikan ${productName}`}
      >
        <ShareIcon />
      </button>

      {canUsePortal && isOpen && createPortal(
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-[rgba(33,27,19,0.2)] px-4 py-6 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-product-title"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-sm rounded-[26px] border border-[rgba(255,255,255,0.72)] bg-[rgba(255,253,247,0.94)] p-6 shadow-[0_30px_80px_-36px_rgba(43,31,14,0.55)] backdrop-blur-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="share-product-title"
                  className="font-[var(--font-noto-serif)] text-2xl font-semibold text-[#211b13]"
                >
                  Bagikan Produk
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5b5549]">
                  Salin tautan halaman {productName} untuk dibagikan.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(231,223,196,0.92)] text-[#5b5549] transition hover:bg-[var(--primary-ghost)]"
                aria-label="Tutup modal bagikan"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-[rgba(231,223,196,0.92)] bg-[rgba(255,252,247,0.82)] px-4 py-3">
              <p className="break-all text-sm leading-6 text-[#423c31]">
                {pageUrl}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleCopy}
                className="button-primary inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold"
              >
                Copy to Clipboard
              </button>
              <p className="text-sm text-[#6e685c]" aria-live="polite">
                {hasCopied ? "Link berhasil disalin." : "Siap untuk disalin."}
              </p>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
