"use client";

import { OrderModalTrigger } from "../../components/OrderModal";

type ProductOrderModalProps = {
  productName: string;
};

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

export default function ProductOrderModal({
  productName,
}: ProductOrderModalProps) {
  return (
    <OrderModalTrigger
      productName={productName}
      className="button-primary inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-2xl px-6 text-sm font-semibold"
    >
      <CartIcon />
      Pesan Sekarang
    </OrderModalTrigger>
  );
}
