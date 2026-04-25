import type { Metadata } from "next";

import { AdminHeader } from "../../_components/AdminHeader";
import { AdminSidebar } from "../../_components/AdminSidebar";
import { TestimonialForm } from "../_components/TestimonialForm";
import { requireAdminSession } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Buat Testimoni | Lumpia Mbak Cun",
  description: "Buat testimoni pelanggan baru.",
};

export default async function CreateTestimonialPage() {
  const session = await requireAdminSession();

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#211d16]">
      <div className="min-h-screen lg:pl-64">
        <AdminSidebar email={session.user.email} />

        <div className="min-w-0">
          <AdminHeader
            title="Buat Testimoni"
            subtitle="Tambahkan suara pelanggan ke arsip etalase."
          />

          <div className="px-6 py-8 md:px-10">
            <TestimonialForm mode="create" />
          </div>
        </div>
      </div>
    </main>
  );
}
