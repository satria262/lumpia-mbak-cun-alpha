import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { AdminHeader } from "../../../_components/AdminHeader";
import { AdminSidebar } from "../../../_components/AdminSidebar";
import { AdminFlashNotice } from "../../../_components/AdminFlashNotice";
import { EditProductForm } from "./_components/EditProductForm";
import {
  buildFlashRedirectUrl,
  getFlashFromSearchParams,
} from "@/lib/admin-query-flash";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    success?: string | string[];
    error?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Edit Produk | Lumpia Mbak Cun",
  description: "Edit produk Lumpia Mbak Cun.",
};

export default async function EditProductPage({
  params,
  searchParams,
}: EditProductPageProps) {
  const session = await requireAdminSession();
  const { id } = await params;
  const flash = getFlashFromSearchParams(await searchParams);
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    redirect(
      buildFlashRedirectUrl(
        "/admin/products",
        "error",
        "Invalid product",
      ),
    );
  }

  let product: Awaited<ReturnType<typeof prisma.product.findUnique>>;

  try {
    product = await prisma.product.findUnique({
      where: { id: productId },
    });
  } catch (error) {
    console.error("Failed to load product.", error);
    redirect(
      buildFlashRedirectUrl(
        "/admin/products",
        "error",
        "Failed to load product",
      ),
    );
  }

  if (!product) {
    redirect(
      buildFlashRedirectUrl(
        "/admin/products",
        "error",
        "Product not found",
      ),
    );
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
            <AdminFlashNotice flash={flash} />
            <EditProductForm product={product} />
          </section>
        </div>
      </div>
    </main>
  );
}
