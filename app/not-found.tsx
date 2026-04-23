import Link from "next/link";

export default function NotFound() {
  return (
    <main className="theme-shell flex min-h-screen items-center justify-center px-4 py-16">
      <div className="max-w-lg rounded-[32px] border border-[var(--border)] bg-[rgba(255,253,247,0.94)] p-8 text-left shadow-[0_28px_60px_-38px_rgba(70,52,26,0.28)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--secondary)]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[#231f19]">
          Halaman tidak ditemukan.
        </h1>
        <p className="mt-4 text-base leading-8 text-[#5f5a4b]">
          Tautan yang kamu buka mungkin sudah berubah atau produknya belum
          tersedia lagi.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="button-primary inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/#products"
            className="button-secondary inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold"
          >
            Lihat Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
