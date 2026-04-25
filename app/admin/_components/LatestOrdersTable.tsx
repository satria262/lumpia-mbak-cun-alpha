import type { LatestOrder } from "../dashboard-data";

type LatestOrdersTableProps = {
  orders: LatestOrder[];
};

const statusStyles: Record<LatestOrder["status"], string> = {
  processed: "bg-[#eaf1ff] text-[#2f67d7]",
  completed: "bg-[#eef3e8] text-[#526b2d]",
  pending: "bg-[#fff4d4] text-[#9a6a00]",
};

const statusLabels: Record<LatestOrder["status"], string> = {
  processed: "Diproses",
  completed: "Selesai",
  pending: "Pending",
};

export function LatestOrdersTable({ orders }: LatestOrdersTableProps) {
  return (
    <section
      aria-labelledby="latest-orders-title"
      className="rounded-lg bg-white shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)]"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <h2
          id="latest-orders-title"
          className="text-xl font-semibold text-[#211d16]"
        >
          Pesanan Terbaru
        </h2>
        <p className="text-xs font-semibold uppercase text-[#9c978d]">
          Last 24 Hours
        </p>
      </div>

      {orders.length > 0 ? (
        <>
          <div>
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[23%]" />
                <col className="w-[49%]" />
                <col className="w-[28%]" />
              </colgroup>
              <thead>
                <tr className="border-y border-[#f0ece3] bg-[#fbfaf6] text-[0.65rem] uppercase tracking-[0.08em] text-[#8b8578]">
                  <th className="px-3 py-3 font-bold sm:px-4">Order</th>
                  <th className="px-3 py-3 font-bold sm:px-4">Customer</th>
                  <th className="px-3 py-3 text-right font-bold sm:px-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ece3]">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="truncate px-3 py-3 text-xs font-bold text-[#526b2d] sm:px-4 sm:text-sm">
                      {order.id}
                    </td>
                    <td className="min-w-0 px-3 py-3 sm:px-4">
                      <p className="truncate text-xs font-semibold text-[#211d16] sm:text-sm">
                        {order.customer}
                      </p>
                      <p className="mt-1 truncate text-[0.68rem] text-[#8b8578] sm:text-xs">
                        {order.items}
                      </p>
                    </td>
                    <td className="px-3 py-3 text-right sm:px-4">
                      <span
                        className={`inline-flex max-w-full justify-center rounded-full px-2 py-1 text-[0.65rem] font-bold sm:px-3 sm:text-xs ${statusStyles[order.status]}`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-[#f0ece3] px-5 py-4 text-center">
            <a
              href="#"
              className="text-sm font-semibold text-[#526b2d] transition hover:text-[#2f3f18]"
            >
              View All Transactions
            </a>
          </div>
        </>
      ) : (
        <div className="border-t border-[#f0ece3] px-5 py-8 text-sm text-[#6f6a5c]">
          No recent orders to show.
        </div>
      )}
    </section>
  );
}
