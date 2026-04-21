"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "../../lib/siteData";

type NavItem = {
  label: string;
  href: string;
  matches: (pathname: string, hash: string) => boolean;
};

const navItems: NavItem[] = [
  {
    label: "Beranda",
    href: "/",
    matches: (pathname: string, hash: string) => pathname === "/" && hash === "",
  },
  {
    label: "Tentang",
    href: "/#about",
    matches: (pathname: string, hash: string) =>
      pathname === "/" && hash === "#about",
  },
  {
    label: "Menu",
    href: "/#products",
    matches: (pathname: string, hash: string) =>
      pathname.startsWith("/products") ||
      (pathname === "/" && hash === "#products"),
  },
  {
    label: "Lokasi",
    href: "/location",
    matches: (pathname: string) => pathname === "/location",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    const syncStickyHeader = () => setIsStickyVisible(window.scrollY > 56);

    syncHash();
    syncStickyHeader();

    window.addEventListener("hashchange", syncHash);
    window.addEventListener("scroll", syncStickyHeader, { passive: true });

    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("scroll", syncStickyHeader);
    };
  }, [pathname]);

  const navContent = (
    <div className="mx-auto flex max-w-[1360px] items-center justify-between px-3 py-5 sm:px-4 lg:px-3">
      <Link href="/" className="text-lg font-semibold text-[#1d1b16]">
        {site.name}
      </Link>

      <nav className="hidden items-center gap-3 text-sm md:flex">
        {navItems.map((item) => {
          const isActive = item.matches(pathname, hash);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "nav-link rounded-full px-4 py-2",
                isActive
                  ? "nav-link-active font-semibold"
                  : "",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/location"
        className="button-primary rounded-full px-5 py-3 text-sm font-semibold"
      >
        Pesan Sekarang
      </Link>
    </div>
  );

  return (
    <>
      <header
        className={[
          "theme-header normal-navbar border-b backdrop-blur-sm",
          isStickyVisible ? "is-hidden" : "",
        ].join(" ")}
      >
        {navContent}
      </header>

      <div
        aria-hidden={!isStickyVisible}
        className={[
          "sticky-navbar-shell fixed inset-x-0 top-0 z-50",
          isStickyVisible ? "is-visible" : "",
        ].join(" ")}
      >
        <header className="theme-header sticky-navbar border-b shadow-[0_22px_48px_-28px_rgba(70,52,26,0.38)]">
          {navContent}
        </header>
      </div>
    </>
  );
}
