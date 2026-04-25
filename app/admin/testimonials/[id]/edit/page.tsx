import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AdminHeader } from "../../../_components/AdminHeader";
import { AdminSidebar } from "../../../_components/AdminSidebar";
import { TestimonialForm } from "../../_components/TestimonialForm";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

type EditTestimonialPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Edit Testimoni | Lumpia Mbak Cun",
  description: "Edit testimoni pelanggan Lumpia Mbak Cun.",
};

export default async function EditTestimonialPage({
  params,
}: EditTestimonialPageProps) {
  const session = await requireAdminSession();
  const { id } = await params;
  const testimonialId = Number(id);

  if (!Number.isInteger(testimonialId)) {
    notFound();
  }

  const testimonial = await prisma.testimonial.findUnique({
    where: { id: testimonialId },
  });

  if (!testimonial) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#211d16]">
      <div className="min-h-screen lg:pl-64">
        <AdminSidebar email={session.user.email} />

        <div className="min-w-0">
          <AdminHeader
            title="Edit Testimoni"
            subtitle="Rapikan kutipan pelanggan tanpa mengubah karakter aslinya."
          />

          <section className="px-6 py-8 md:px-10">
            <TestimonialForm mode="edit" testimonial={testimonial} />
          </section>
        </div>
      </div>
    </main>
  );
}
