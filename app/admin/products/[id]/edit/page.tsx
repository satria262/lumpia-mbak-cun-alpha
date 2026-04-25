import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AdminHeader } from "../../../_components/AdminHeader";
import { AdminSidebar } from "../../../_components/AdminSidebar";
import { EditProductForm } from "./_components/EditProductForm";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Edit Produk | Lumpia Mbak Cun",
  description: "Edit produk Lumpia Mbak Cun.",
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const session = await requireAdminSession();
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#211d16]">
      <div className="min-h-screen lg:pl-64">
        <AdminSidebar email={session.user.email} />

        <div className="min-w-0">
          <AdminHeader
            title="Edit Produk"
            subtitle="Perbarui katalog produk dengan presisi dan tetap elegan."
          />

          <section className="px-6 py-8 md:px-10">
            <EditProductForm product={product} />
          </section>
        </div>
      </div>
    </main>
  );
}
