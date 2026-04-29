import type { Metadata } from "next";

import { AdminFlashNotice } from "../../_components/AdminFlashNotice";
import { AdminHeader } from "../../_components/AdminHeader";
import { AdminSidebar } from "../../_components/AdminSidebar";
import { CreateProductForm } from "./_components/CreateProductForm";
import { getFlashFromSearchParams } from "@/lib/admin-query-flash";
import { requireAdminSession } from "@/lib/admin-session";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Buat Produk | Lumpia Mbak Cun",
  description: "Buat produk baru untuk Lumpia Mbak Cun.",
  path: "/admin/products/create",
  noIndex: true,
});

type CreateProductPageProps = {
  searchParams?: Promise<{
    success?: string | string[];
    error?: string | string[];
  }>;
};

export default async function CreateProductPage({
  searchParams,
}: CreateProductPageProps) {
  const session = await requireAdminSession();
  const flash = getFlashFromSearchParams(await searchParams);

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
            <AdminFlashNotice flash={flash} />
            <CreateProductForm />
          </div>
        </div>
      </div>
    </main>
  );
}
