import type { DashboardSummary } from "../dashboard-data";
import { AdminIcon } from "./AdminIcons";

type DashboardSummaryCardProps = {
  summary: DashboardSummary;
};

export function DashboardSummaryCard({ summary }: DashboardSummaryCardProps) {
  const isPrimary = summary.tone === "primary";

  return (
    <article
      className={`flex min-h-28 items-center justify-between rounded-lg border p-5 shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)] ${
        isPrimary
          ? "border-[#526b2d] bg-[#526b2d] text-white"
          : "border-[#eee8dc] bg-white text-[#211d16]"
      }`}
    >
      <div>
        <p
          className={`text-[0.65rem] font-bold uppercase tracking-[0.08em] ${
            isPrimary ? "text-[#dfe8c4]" : "text-[#9c978d]"
          }`}
        >
          {summary.label}
        </p>
        <p className="mt-3 text-2xl font-bold">{summary.value}</p>
      </div>
      <AdminIcon
        name={summary.icon}
        className={`h-8 w-8 ${isPrimary ? "text-[#b4c17d]" : "text-[#dedbd3]"}`}
      />
    </article>
  );
}
