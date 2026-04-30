import type { Metadata } from "next";

import { AdminHeader } from "./_components/AdminHeader";
import { AdminSidebar } from "./_components/AdminSidebar";
import { LatestOrdersTable } from "./_components/LatestOrdersTable";
import { ProductAvailabilityCard } from "./_components/ProductAvailabilityCard";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Admin Dashboard | Lumpia Mbak Cun",
  description: "Culinary operations dashboard for Lumpia Mbak Cun.",
  path: "/admin",
  noIndex: true,
});

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });

  const productAvailability = products.map((product) => ({
    id: String(product.id),
    name: product.name,
    description: product.description,
    image: product.image,
    enabled: product.availability ?? true,
  }));

  return (
    <main className="min-h-screen bg-[#fbfaf6] text-[#211d16]">
      <div className="min-h-screen lg:pl-64">
        <AdminSidebar email={session.user.email} />

        <div className="min-w-0">
          <AdminHeader
            title="Dashboard"
            subtitle="Welcome back to the culinary command center."
          />

          <div className="px-6 py-8 md:px-10">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(23rem,0.75fr)]">
              <ProductAvailabilityCard products={productAvailability} />
              <LatestOrdersTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
  
