"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen bg-[var(--background)] px-4 py-16 text-[var(--foreground)]"
      lang="id"
    >
      <main className="mx-auto flex max-w-xl flex-col items-start rounded-[32px] border border-[var(--border)] bg-[rgba(255,253,247,0.94)] p-8 shadow-[0_28px_60px_-38px_rgba(70,52,26,0.28)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--secondary)]">
          Aksi Belum Berhasil
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[#231f19]">
          Silakan coba lagi.
        </h1>
        <p className="mt-4 text-base leading-8 text-[#5f5a4b]">
          Permintaan barusan belum selesai diproses. Gunakan tombol di bawah
          untuk memuat ulang bagian ini.
        </p>
        <button
          type="button"
          onClick={reset}
          className="button-primary mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold"
        >
          Coba Lagi
        </button>
        {error.digest ? (
          <p className="mt-4 text-xs text-[#8a7d53]">
            Reference: {error.digest}
          </p>
        ) : null}
      </main>
    </div>
  );
}
