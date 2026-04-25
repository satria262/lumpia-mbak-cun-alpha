import Link from "next/link";

import { AdminIcon } from "./AdminIcons";

export function FloatingActionButton() {
  return (
    <Link
      href="/admin/products/create"
      className="fixed bottom-8 right-8 grid h-14 w-14 place-items-center rounded-full bg-[#526b2d] text-white shadow-[0_18px_32px_-18px_rgba(47,63,24,0.9)] transition hover:-translate-y-0.5 hover:bg-[#435724] focus:outline-none focus:ring-4 focus:ring-[#dfe8c4]"
      aria-label="Create product"
    >
      <AdminIcon name="plus" className="h-7 w-7" />
    </Link>
  );
}
