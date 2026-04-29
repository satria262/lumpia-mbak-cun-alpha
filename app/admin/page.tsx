import type { Metadata } from "next";

import { AdminHeader } from "./_components/AdminHeader";
import { AdminSidebar } from "./_components/AdminSidebar";
import { DashboardSummaryCard } from "./_components/DashboardSummaryCard";
import { FloatingActionButton } from "./_components/FloatingActionButton";
import { LatestOrdersTable } from "./_components/LatestOrdersTable";
import { ProductAvailabilityCard } from "./_components/ProductAvailabilityCard";
import { dashboardSummary } from "./dashboard-data";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Admin Dashboard | Lumpia Mbak Cun",
  description: "Culinary operations dashboard for Lumpia Mbak Cun.",
};

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

            <section
              aria-label="Dashboard summary"
              className="mt-10 grid gap-5 md:grid-cols-3"
            >
              {dashboardSummary.length > 0 ? (
                dashboardSummary.map((summary) => (
                  <DashboardSummaryCard key={summary.id} summary={summary} />
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-[#d8cfb5] bg-white p-8 text-sm text-[#6f6a5c] md:col-span-3">
                  No dashboard summary is available yet.
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <FloatingActionButton />
    </main>
  );
}
  
