"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useMounted } from "../../lib/useMounted";

type OrderModalState = {
  productName?: string;
};

type OrderModalContextValue = {
  openOrderModal: (state?: OrderModalState) => void;
};

type OrderChannel = {
  name: string;
  label: string;
  href: string;
  logo: string;
};

const OrderModalContext = createContext<OrderModalContextValue | null>(null);

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M8 12h8m0 0-3-3m3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function buildWhatsAppHref(productName?: string) {
  const message = productName
    ? `Halo Lumpia Mbak Cun, saya mau pesan ${productName}.`
    : "Halo Lumpia Mbak Cun, saya mau pesan.";

  return `https://api.whatsapp.com/send/?phone=6281227816101&text=${encodeURIComponent(
    message,
  )}`;
}

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  const [isOpen, setIsOpen] = useState(false);
  const [orderState, setOrderState] = useState<OrderModalState>({});

  const productName = orderState.productName?.trim();
  const productLabel = productName && productName.length > 0 ? productName : null;
  const orderCopy = productLabel
    ? `Pilih cara paling nyaman untuk memesan ${productLabel} anda.`
    : "Pilih cara paling nyaman untuk memesan dari Lumpia Mbak Cun.";

  const channels: OrderChannel[] = useMemo(
    () => [
      {
        name: "GoFood",
        label: "Pesan paling cepat",
        href: "https://gofood.link/a/C2kf5TE",
        logo: "/system/gojekmitra.png",
      },
      {
        name: "WhatsApp",
        label: "Tanya stok dulu",
        href: buildWhatsAppHref(productLabel ?? undefined),
        logo: "/system/whatsapp.svg",
      },
      {
        name: "Linktree",
        label: "Semua kanal resmi",
        href: "https://linktr.ee/lumpiambakcun",
        logo: "/system/lumpia-ai.png",
      },
      {
        name: "Instagram",
        label: "Update dan DM",
        href: "https://www.instagram.com/lumpiambakcun?igsh=M2N6dWtnanJ5YTFn",
        logo: "/system/instagram.svg",
      },
    ],
    [productLabel],
  );

  function openOrderModal(state: OrderModalState = {}) {
    setOrderState(state);
    setIsOpen(true);
  }

  function closeModal() {
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

  const contextValue = useMemo(
    () => ({
      openOrderModal,
    }),
    [],
  );

  return (
    <OrderModalContext.Provider value={contextValue}>
      {children}

      {mounted &&
        isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] grid place-items-center bg-[rgba(33,27,19,0.2)] px-4 py-6 backdrop-blur-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-product-title"
            onClick={closeModal}
          >
            <div
              className="w-full max-w-sm rounded-[26px] border border-[rgba(255,255,255,0.72)] bg-[rgba(255,253,247,0.94)] p-6 shadow-[0_30px_80px_-36px_rgba(43,31,14,0.55)] backdrop-blur-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    id="order-product-title"
                    className="font-[var(--font-noto-serif)] text-2xl font-semibold text-[#211b13]"
                  >
                    Pilih Kanal Pesan
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5b5549]">
                    {orderCopy}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(231,223,196,0.92)] text-[#5b5549] transition hover:bg-[var(--primary-ghost)]"
                  aria-label="Tutup modal pesan"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {channels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-[rgba(231,223,196,0.92)] bg-[rgba(255,252,247,0.82)] px-4 py-3 text-[#423c31] transition hover:bg-[var(--primary-ghost)]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white">
                      <Image
                        src={channel.logo}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">
                        {channel.name}
                      </span>
                      <span className="block truncate text-xs text-[#6e685c]">
                        {channel.label}
                      </span>
                    </span>
                    <span className="text-[#6e685c]">
                      <ArrowIcon />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </OrderModalContext.Provider>
  );
}

export function OrderModalTrigger({
  children,
  className,
  productName,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  productName?: string;
  ariaLabel?: string;
}) {
  const context = useContext(OrderModalContext);

  if (!context) {
    throw new Error("OrderModalTrigger must be used inside OrderModalProvider.");
  }

  return (
    <button
      type="button"
      onClick={() => context.openOrderModal({ productName })}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
