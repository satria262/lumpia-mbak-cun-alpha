"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AdminIcon } from "./AdminIcons";

const navItems = [
  { label: "Dasbor", href: "/admin", icon: "dashboard" },
  { label: "Inventaris", href: "/admin/products", icon: "inventory" },
  { label: "Testimoni", href: "/admin/testimonials", icon: "message" },
  { label: "Pesanan", href: "#", icon: "orders" },
  { label: "Pengaturan", href: "#", icon: "settings" },
] as const;

type AdminSidebarProps = {
  email?: string | null;
};

export function AdminSidebar({ email }: AdminSidebarProps) {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`flex w-full flex-col overflow-hidden border-b border-[#eee7d8] bg-[#f4f1eb] px-5 py-4 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:h-dvh lg:w-64 lg:border-b-0 lg:border-r lg:py-5 ${
        isMobileExpanded ? "h-dvh" : ""
      }`}
    >
      <div
        className={`flex items-center justify-between gap-4 ${
          isMobileExpanded ? "border-b border-[#e6dece] pb-4" : ""
        } lg:border-b lg:pb-5`}
      >
        <div className="min-w-0">
          <p className="truncate font-[var(--font-noto-serif)] text-xl italic text-[#526b2d]">
            Lumpia Mbak Cun
          </p>
          <p className="truncate text-xs font-bold text-[#526b2d] lg:hidden">
            Admin Kuliner
          </p>
        </div>
        <button
          type="button"
          aria-expanded={isMobileExpanded}
          aria-controls="admin-mobile-sidebar-content"
          onClick={() => setIsMobileExpanded((current) => !current)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#526b2d] shadow-[0_12px_26px_-22px_rgba(70,52,26,0.45)] transition hover:bg-[#eef3da] lg:hidden"
        >
          <span className="sr-only">
            {isMobileExpanded ? "Tutup navigasi" : "Buka navigasi"}
          </span>
          <AdminIcon
            name={isMobileExpanded ? "x" : "menu"}
            className="h-5 w-5"
          />
        </button>
      </div>

      <div
        id="admin-mobile-sidebar-content"
        className={`${isMobileExpanded ? "block" : "hidden"} lg:flex lg:flex-1 lg:flex-col`}
      >
        <div className="mt-6 flex items-center gap-3">
          <Image
            src="/system/lumpia-logo.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full border border-white object-cover"
          />
          <div className="min-w-0">
            <p className="truncate font-[var(--font-noto-serif)] text-lg font-semibold text-[#526b2d]">
              Admin Kuliner
            </p>
            <p className="truncate text-xs text-[#6f6a5c]">
              {email ?? "Manajemen Dapur"}
            </p>
          </div>
        </div>

        <Link
          href="/admin/products/create"
          onClick={() => setIsMobileExpanded(false)}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#526b2d] px-4 text-sm font-bold text-white shadow-[0_14px_28px_-22px_rgba(47,63,24,0.8)] transition hover:bg-[#435724]"
        >
          <AdminIcon name="plus" className="h-4 w-4" />
          Buat Produk
        </Link>

        <nav aria-label="Admin navigation" className="mt-8 space-y-2">
          {navItems.map((item) => {
            const isActive =
              item.href !== "#" &&
              (pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href)));

            return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setIsMobileExpanded(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-[#e3e0d7] text-[#526b2d]"
                  : "text-[#575248] hover:bg-white hover:text-[#526b2d]"
              }`}
            >
              <AdminIcon name={item.icon} className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-xl bg-white px-4 py-4 shadow-[0_14px_34px_-30px_rgba(70,52,26,0.35)] lg:mt-auto">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#526b2d]">
            Status Dapur
          </p>
          <div className="mt-2 flex items-center gap-2 text-sm text-[#6f6a5c]">
            <span className="h-2 w-2 rounded-full bg-[#92a25f]" />
            Menerima Pesanan
          </div>
        </div>
      </div>
    </aside>
  );
}
