import type { Metadata } from "next";

import { logoutAdmin } from "./actions";
import { requireAdminSession } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Admin Dashboard | Lumpia Mbak Cun",
  description: "Protected admin dashboard for Lumpia Mbak Cun.",
};

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(206,199,111,0.14),_transparent_30%),linear-gradient(180deg,_#fbf8ef_0%,_#f7f3e9_50%,_#efe6d4_100%)] px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(70,52,26,0.45)] backdrop-blur">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7c745f]">
                Admin Dashboard
              </p>
              <h1 className="font-serif text-4xl text-[#2f2b24]">
                Selamat datang kembali
              </h1>
              <p className="text-sm leading-6 text-[#6a6454]">
                Anda login sebagai <span className="font-semibold">{session.user.email}</span>.
              </p>
            </div>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-2xl border border-[#d8cfb5] bg-[#faf7ef] px-5 py-3 text-sm font-semibold text-[#413a2c] transition hover:border-[#b9af87] hover:bg-white"
              >
                Logout
              </button>
            </form>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-[0_18px_45px_-36px_rgba(70,52,26,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7c745f]">
              Admin ID
            </p>
            <p className="mt-4 break-all text-sm text-[#2f2b24]">{session.user.id}</p>
          </article>

          <article className="rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-[0_18px_45px_-36px_rgba(70,52,26,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7c745f]">
              Email
            </p>
            <p className="mt-4 text-sm text-[#2f2b24]">{session.user.email}</p>
          </article>

          <article className="rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-[0_18px_45px_-36px_rgba(70,52,26,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7c745f]">
              Role
            </p>
            <p className="mt-4 text-sm font-semibold text-[#55623d]">{session.user.role}</p>
          </article>
        </section>

        <section className="rounded-[2rem] border border-dashed border-[#d8cfb5] bg-white/70 p-6">
          <h2 className="font-serif text-2xl text-[#2f2b24]">Dashboard siap dipakai</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6a6454]">
            Authentication, route protection, JWT session, dan single-admin seed
            sudah aktif. Anda bisa menambahkan fitur manajemen stok, pesanan, dan
            konten admin di area ini berikutnya.
          </p>
        </section>
      </div>
    </main>
  );
}
