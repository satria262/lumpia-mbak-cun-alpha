export type Product = {
  slug: string;
  name: string;
  price: string;
  description: string;
  highlights: string[];
  image: string;
  badge: string;
  portion: string;
  philosophy: string;
  ingredients: string[];
  storageTip: string;
  imageNote: string;
};

export const products: Product[] = [
  {
    slug: "tahu-bakso-khas-semarang",
    name: "Tahu Bakso Khas Semarang",
    price: "Rp20.000",
    description:
      "Perpaduan tahu lembut dan bakso berbumbu khas Semarang, disajikan dengan kuah hangat dan sambal jeruk segar.",
    highlights: [
      "Rasa otentik Semarang",
      "Bahan lokal pilihan",
      "Sajian hangat siap saji",
    ],
    image: "/products/tahubakso.jpg",
    badge: "Best Seller",
    portion: "Per porsi hangat",
    philosophy:
      "Tahu lembut dan adonan bakso berbumbu diracik agar setiap gigitan terasa gurih, ringan, dan tetap nyaman disantap kapan pun.",
    ingredients: ["Tahu lembut", "Bakso sapi", "Sambal jeruk"],
    storageTip:
      "Simpan dalam wadah tertutup di chiller. Hangatkan dengan kukusan atau air fryer beberapa menit agar teksturnya kembali lembut.",
    imageNote: "Visual penyajian tahu bakso khas Semarang yang dibuat segar setiap hari.",
  },
  {
    slug: "lumpia-semarang-asli",
    name: "Lumpia Semarang Asli",
    price: "Rp22.000",
    description:
      "Lumpia renyah berisi daging, sayuran, dan rempah tradisional yang dibuat menurut resep keluarga.",
    highlights: ["Kulit renyah dan tipis", "Isian harum dan gurih", "Bumbu legendaris"],
    image: "/products/lumpiasemarang.jpg",
    badge: "Pilihan Favorit",
    portion: "Per potong ukuran jumbo",
    philosophy:
      "Perpaduan harmonis antara manisnya rebung pilihan, gurih ayam kampung, dan kesegaran udang laut. Dibungkus dalam kulit renyah yang dibuat manual untuk menjaga tekstur legendaris Semarang.",
    ingredients: ["Rebung muda", "Udang segar", "Ayam pilihan"],
    storageTip:
      "Nikmati dalam kondisi hangat. Jika disimpan, taruh dalam wadah tertutup di lemari pendingin maks. 2 hari lalu panaskan kembali dengan oven atau wajan tanpa banyak minyak.",
    imageNote: "Visual representasi keaslian resep lumpia Semarang racikan turun-temurun.",
  },
  {
    slug: "lumpia-spesial-semarang",
    name: "Lumpia Spesial Semarang",
    price: "Rp20.000",
    description:
      "Varian spesial dengan cita rasa unik, cocok untuk koleksi cemilan harian dan oleh-oleh keluarga.",
    highlights: ["Isian spesial premium", "Kemasannya menarik", "Cemilan siap santap"],
    image: "/products/pisangcoklat.jpg",
    badge: "Varian Unggulan",
    portion: "Per box siap santap",
    philosophy:
      "Varian yang lebih playful dengan sentuhan manis gurih, tetap mempertahankan karakter kulit lumpia yang tipis dan renyah saat disantap.",
    ingredients: ["Kulit lumpia tipis", "Isian premium", "Balutan gurih"],
    storageTip:
      "Simpan di tempat sejuk dan kering bila belum dibuka. Untuk sensasi terbaik, panaskan singkat sebelum disajikan agar aroma dan tekstur lebih hidup.",
    imageNote: "Visual penyajian lumpia spesial yang cocok untuk teman santai dan buah tangan.",
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
