export type ProductAvailability = {
  id: string;
  name: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type LatestOrder = {
  id: string;
  customer: string;
  items: string;
  status: "processed" | "completed" | "pending";
};

export type DashboardSummary = {
  id: string;
  label: string;
  value: string;
  tone?: "primary";
  icon: "cash" | "basket" | "tag";
};

export const latestOrders: LatestOrder[] = [
  {
    id: "#LD-901",
    customer: "Budi Santoso",
    items: "Lumpia Rebung (x5)",
    status: "processed",
  },
  {
    id: "#LD-900",
    customer: "Siti Aminah",
    items: "Pisang Coklat (x10)",
    status: "completed",
  },
  {
    id: "#LD-899",
    customer: "Andi Wijaya",
    items: "Tahu Bakso (x3)",
    status: "completed",
  },
  {
    id: "#LD-898",
    customer: "Dewi Lestari",
    items: "Combo Mixed (x1)",
    status: "processed",
  },
  {
    id: "#LD-897",
    customer: "Hadi Kusuma",
    items: "Lumpia Rebung (x12)",
    status: "completed",
  },
  {
    id: "#LD-896",
    customer: "Rina Sari",
    items: "Tahu Bakso (x6)",
    status: "completed",
  },
  {
    id: "#LD-895",
    customer: "Agus Salim",
    items: "Pisang Coklat (x20)",
    status: "pending",
  },
];

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
