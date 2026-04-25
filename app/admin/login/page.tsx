import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Lumpia Mbak Cun",
  description: "Secure admin login for Lumpia Mbak Cun.",
};

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/admin");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(252,220,49,0.18),_transparent_35%),linear-gradient(180deg,_#fbf8ef_0%,_#f7f3e9_45%,_#f0e8d6_100%)]" />
      <div className="absolute inset-x-0 top-0 h-2 bg-[#4a44bd]" />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 shadow-[0_24px_80px_-40px_rgba(70,52,26,0.42)] backdrop-blur">
        <div className="px-8 pt-10 text-center">
          <p className="font-serif text-lg text-[#6f6a59]">Lumpia Mbak Cun</p>
          <div className="mx-auto mt-3 h-px w-16 bg-[#dfd6bd]" />
          <h1 className="mt-6 font-serif text-3xl text-[#2f2b24]">Admin Portal</h1>
          <p className="mt-3 text-sm leading-6 text-[#6a6454]">
            Silakan masuk untuk mengelola stok dan pesanan.
          </p>
        </div>

        <div className="px-8 py-8">
          <LoginForm />

          <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[#9d9789]">
            <span className="h-px flex-1 bg-[#ece4cf]" />
            <span>Authentic Culinary System</span>
            <span className="h-px flex-1 bg-[#ece4cf]" />
          </div>
        </div>

        <div className="relative h-28 w-full">
          <Image
            src="/system/amazing-semarang.jpg"
            alt="Decorative admin login background"
            fill
            className="object-cover opacity-20"
            sizes="(max-width: 768px) 100vw, 448px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white/10" />
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 w-full max-w-md -translate-x-1/2 px-8 text-center text-xs leading-5 text-[#7d7768]">
        <p>&copy; 2026 Lumpia Delish Management System</p>
        <p>Ver. 2.4.0 - Didukung oleh Artisan Tech Solutions</p>
      </div>
    </main>
  );
}
