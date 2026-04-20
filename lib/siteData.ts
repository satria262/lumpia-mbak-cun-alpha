export type Product = {
  slug: string;
  name: string;
  price: string;
  description: string;
  highlights: string[];
  image: string;
  badge: string;
};

export const products: Product[] = [
  {
    slug: "tahu-bakso-khas-semarang",
    name: "Tahu Bakso Khas Semarang",
    price: "Rp45.000",
    description:
      "Perpaduan tahu lembut dan bakso berbumbu khas Semarang, disajikan dengan kuah hangat dan sambal jeruk segar.",
    highlights: [
      "Rasa otentik Semarang",
      "Bahan lokal pilihan",
      "Sajian hangat siap saji",
    ],
    image: "/bakso-card.svg",
    badge: "Best Seller",
  },
  {
    slug: "lumpia-semarang-asli",
    name: "Lumpia Semarang Asli",
    price: "Rp18.000",
    description:
      "Lumpia renyah berisi daging, sayuran, dan rempah tradisional yang dibuat menurut resep keluarga.",
    highlights: ["Kulit renyah dan tipis", "Isian harum dan gurih", "Bumbu legendaris"],
    image: "/lumpia-card.svg",
    badge: "Pilihan Favorit",
  },
  {
    slug: "lumpia-spesial-semarang",
    name: "Lumpia Spesial Semarang",
    price: "Rp22.000",
    description:
      "Varian spesial dengan cita rasa unik, cocok untuk koleksi cemilan harian dan oleh-oleh keluarga.",
    highlights: ["Isian spesial premium", "Kemasannya menarik", "Cemilan siap santap"],
    image: "/hero-lumpia.svg",
    badge: "Varian Unggulan",
  },
];

export const highlights = [
  {
    title: "Resep Turun-temurun",
    description:
      "Setiap menu dibuat berdasarkan resep asli Semarang yang diwariskan turun-temurun.",
  },
  {
    title: "Bahan Pilihan",
    description:
      "Semua bahan kami seleksi dengan ketat untuk memastikan cita rasa terbaik di setiap suapan.",
  },
  {
    title: "Dijaga Kesegaran",
    description:
      "Proses produksi harian menjaga kualitas dan kesegaran makanan sampai ke tangan pelanggan.",
  },
];

export const locationInfo = {
  title: "Lokasi Kedai Kami",
  address: "Jl. Pemuda No. 14, Semarang",
  note: "Terletak dekat pusat kota, mudah dijangkau dan selalu ramai pengunjung.",
  gallery: ["/store-1.svg", "/store-2.svg"],
};

export const site = {
  name: "Lumpia Mbak Cun",
  description:
    "Cita rasa otentik Semarang, Lumpia dan Tahu Bakso khas nusantara yang selalu diracik dengan cinta.",
};
