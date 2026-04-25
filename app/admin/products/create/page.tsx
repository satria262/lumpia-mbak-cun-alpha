import type { Metadata } from "next";

import { AdminHeader } from "../../_components/AdminHeader";
import { AdminSidebar } from "../../_components/AdminSidebar";
import { CreateProductForm } from "./_components/CreateProductForm";
import { requireAdminSession } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Buat Produk | Lumpia Mbak Cun",
  description: "Buat produk baru untuk Lumpia Mbak Cun.",
};

export default async function CreateProductPage() {
  const session = await requireAdminSession();

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#211d16]">
      <div className="min-h-screen lg:pl-64">
        <AdminSidebar email={session.user.email} />

        <div className="min-w-0">
          <AdminHeader
            title="Buat Produk"
            subtitle="Siapkan produk baru untuk katalog etalase."
          />

          <div className="px-6 py-8 md:px-10">
            <CreateProductForm />
          </div>
        </div>
      </div>
    </main>
  );
}
