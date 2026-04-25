import Link from "next/link";
import type { Metadata } from "next";

import { AdminHeader } from "../_components/AdminHeader";
import { AdminIcon } from "../_components/AdminIcons";
import { AdminSidebar } from "../_components/AdminSidebar";
import { DeleteTestimonialButton } from "./_components/DeleteTestimonialButton";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Testimoni | Lumpia Mbak Cun",
  description: "Kelola testimoni pelanggan Lumpia Mbak Cun.",
};

function getInitials(name: string | null | undefined) {
  const initials = (name ?? "")
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return initials || "LC";
}

function getAvatarStyle(src: string | null | undefined) {
  const value = src?.trim();

  return value ? { backgroundImage: `url("${value}")` } : undefined;
}

export default async function AdminTestimonialsPage() {
  const session = await requireAdminSession();
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#211d16]">
      <div className="min-h-screen lg:pl-64">
        <AdminSidebar email={session.user.email} />

        <div className="min-w-0">
          <AdminHeader
            title="Testimoni"
            subtitle="Kelola suara pelanggan yang tampil di etalase Lumpia Mbak Cun."
          />

          <section className="px-6 py-8 md:px-10">
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <h1 className="font-[var(--font-noto-serif)] text-2xl font-semibold text-[#211d16]">
                  Arsip Testimoni
                </h1>
                <p className="mt-2 text-sm leading-6 text-[#6f6a5c]">
                  Simpan kutipan pelanggan, identitas singkat, dan avatar untuk
                  memperkuat bukti sosial di halaman publik.
                </p>
              </div>

              <Link
                href="/admin/testimonials/create"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#526b2d] px-5 text-sm font-bold text-white transition hover:bg-[#435724]"
              >
                <AdminIcon name="plus" className="h-4 w-4" />
                Tambah Testimoni
              </Link>
            </div>

            {testimonials.length > 0 ? (
              <div className="grid gap-5 xl:grid-cols-2">
                {testimonials.map((testimonial) => {
                  const avatarStyle = getAvatarStyle(testimonial.userAvatar);
                  const userName =
                    testimonial.userName?.trim() || "Pelanggan Tanpa Nama";
                  const occupation =
                    testimonial.userOccupation?.trim() || "Pelanggan";

                  return (
                    <article
                      key={testimonial.id}
                      className="overflow-hidden rounded-xl border border-[#eee8dc] bg-white shadow-[0_18px_45px_-36px_rgba(70,52,26,0.45)] transition hover:-translate-y-1 hover:shadow-[0_26px_55px_-38px_rgba(70,52,26,0.5)]"
                    >
                      <div className="relative min-h-72 bg-[#F8F2F0] p-8 pt-12">
                        <p className="pointer-events-none absolute left-6 top-5 font-[var(--font-noto-serif)] text-6xl font-semibold leading-[0.8] text-[#92a25f]/35">
                          &ldquo;
                        </p>

                        <div className="flex min-h-52 flex-col justify-between gap-6">
                          <p className="line-clamp-5 text-xl leading-8 text-[#231f19]">
                            {testimonial.testimonial ||
                              "Belum ada isi testimoni."}
                          </p>

                          <div className="flex items-center space-x-4">
                            <div
                              className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-lg bg-[#eef3da] bg-cover bg-center font-[var(--font-noto-serif)] text-lg font-semibold text-[#526b2d]"
                              style={avatarStyle}
                              aria-label={
                                avatarStyle ? `Avatar ${userName}` : undefined
                              }
                            >
                              {avatarStyle ? null : getInitials(userName)}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-xl font-semibold text-[#231f19]">
                                {userName}
                              </p>
                              <p className="truncate text-xs font-medium uppercase tracking-[0.18em] text-[#8A726C]">
                                {occupation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#526b2d]">
                          Pratinjau Halaman Utama
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/admin/testimonials/${testimonial.id}/edit`}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e5dfd2] bg-[#fbfaf6] px-4 text-sm font-bold text-[#575248] transition hover:border-[#92a25f] hover:bg-white hover:text-[#526b2d]"
                          >
                            <AdminIcon name="edit" className="h-4 w-4" />
                            Edit
                          </Link>
                          <DeleteTestimonialButton
                            testimonialId={testimonial.id}
                            userName={userName}
                          />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#d8cfb5] bg-white p-8 text-center shadow-[0_18px_45px_-36px_rgba(70,52,26,0.45)]">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#eef3da] text-[#526b2d]">
                  <AdminIcon name="message" className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-[var(--font-noto-serif)] text-xl font-semibold text-[#211d16]">
                  Belum Ada Testimoni
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6f6a5c]">
                  Tambahkan testimoni pertama untuk mulai membangun arsip
                  kepercayaan pelanggan.
                </p>
                <Link
                  href="/admin/testimonials/create"
                  className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#526b2d] px-5 text-sm font-bold text-white transition hover:bg-[#435724]"
                >
                  <AdminIcon name="plus" className="h-4 w-4" />
                  Tambah Testimoni
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
