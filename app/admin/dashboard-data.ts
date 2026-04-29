export type ProductAvailability = {
  id: string;
  name: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type DashboardSummary = {
  id: string;
  label: string;
  value: string;
  tone?: "primary";
  icon: "cash" | "basket" | "tag";
};

export const dashboardSummary: DashboardSummary[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "Rp 1.420.000",
    tone: "primary",
    icon: "cash",
  },
  {
    id: "orders",
    label: "Total Orders",
    value: "42",
    icon: "basket",
  },
  {
    id: "promos",
    label: "Active Promos",
    value: "2",
    icon: "tag",
  },
];
