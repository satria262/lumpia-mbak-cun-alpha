"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMounted } from "../../lib/useMounted";

type NavItem = {
  label: string;
  href: string;
  matches: (pathname: string, hash: string) => boolean;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    label: "Beranda",
    href: "/",
    matches: (pathname: string, hash: string) => pathname === "/" && hash === "",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M4.75 10.5 12 4l7.25 6.5V19A1.25 1.25 0 0 1 18 20.25h-3.5V14.5h-5v5.75H6A1.25 1.25 0 0 1 4.75 19V10.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Tentang",
    href: "/#about",
    matches: (pathname: string, hash: string) =>
      pathname === "/" && hash === "#about",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M12 10.25v4.25"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle cx="12" cy="7.75" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Menu",
    href: "/#products",
    matches: (pathname: string, hash: string) =>
      pathname.startsWith("/products") ||
      (pathname === "/" && hash === "#products"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M7 5.5v13"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M10 5.5v6.25A2.25 2.25 0 0 1 7.75 14H7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 5.5c1.93 0 3.5 1.57 3.5 3.5v9.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M15.5 5.5v13"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Lokasi",
    href: "/location",
    matches: (pathname: string) => pathname === "/location",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 20.25s5.25-4.8 5.25-9a5.25 5.25 0 1 0-10.5 0c0 4.2 5.25 9 5.25 9Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11.25" r="1.75" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const mounted = useMounted();
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

  const activeHash = mounted ? hash : "";
  const stickyVisible = mounted ? isStickyVisible : false;

  const navContent = (
    <div className="mx-auto flex max-w-[1360px] items-center justify-between px-3 py-5 sm:px-4 lg:px-3">
      <Link href="/" className="flex items-center">
        <Image
          src="/system/lumpia-logo.png"
          alt="Lumpia Mbak Cun"
          width={132}
          height={40}
          className="w-auto object-left object-cover"
          priority
        />
        <h1 className="italic font-semibold text-xl -ml-24">Lumpia Mbak Cun</h1>
      </Link>

      <nav className="hidden items-center gap-3 text-sm md:flex">
        {navItems.map((item) => {
          const isActive = item.matches(pathname, activeHash);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "nav-link px-1 py-2",
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

      <div className="hidden items-center gap-3 text-sm md:flex">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="desktop-anchor-link"
        >
          instagram
        </a>
        <span className="desktop-anchor-bullet" aria-hidden="true">
          •
        </span>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noreferrer"
          className="desktop-anchor-link"
        >
          TikTok
        </a>
        <span className="desktop-anchor-bullet" aria-hidden="true">
          •
        </span>
        <a
          href="https://gofood.co.id"
          target="_blank"
          rel="noreferrer"
          className="desktop-anchor-link"
        >
          GoFood
        </a>
        <span className="desktop-anchor-bullet" aria-hidden="true">
          •
        </span>
        <a
          href="https://linktr.ee"
          target="_blank"
          rel="noreferrer"
          className="desktop-anchor-link"
        >
          Linktree
        </a>
      </div>
    </div>
  );

  const mobileNavContent = (
    <nav className="mx-auto grid max-w-md grid-cols-4 gap-2">
      {navItems.map((item) => {
        const isActive = item.matches(pathname, activeHash);

        return (
          <a
            key={item.label}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={[
              "mobile-nav-link flex flex-col items-center justify-center gap-1 rounded-[1.35rem] px-2 py-3 text-[0.68rem] font-semibold tracking-[0.08em]",
              isActive ? "mobile-nav-link-active" : "",
            ].join(" ")}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );

  return (
    <>
      <header
        className={[
          "theme-header normal-navbar hidden border-b backdrop-blur-sm md:block",
          stickyVisible ? "is-hidden" : "",
        ].join(" ")}
      >
        {navContent}
      </header>

      <div
        aria-hidden={!stickyVisible}
        className={[
          "sticky-navbar-shell fixed inset-x-0 top-0 z-50 hidden md:block",
          stickyVisible ? "is-visible" : "",
        ].join(" ")}
      >
        <header className="theme-header sticky-navbar border-b shadow-[0_22px_48px_-28px_rgba(70,52,26,0.38)]">
          {navContent}
        </header>
      </div>

      <div className="mobile-nav-shell fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 md:hidden">
        <div className="mobile-nav-dock">
          {mobileNavContent}
        </div>
      </div>
    </>
  );
}
