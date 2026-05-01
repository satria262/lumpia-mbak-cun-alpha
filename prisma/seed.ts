import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client";
import { products } from "../lib/siteData";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const webConfigEntries: Record<string, string> = {
  siteTitle: "Lumpia Mbak Cun",
  siteSubtitle: "The Heart of Indonesian Crispy Rolls",
  logo: "",
  favicon: "/system/lumpia-ai.png",
  productSectionTitle: "Varian Unggulan Kami",
  heroTitle: "Cita Rasa Otentik Semarangan",
  heroDescription:
    "Temukan resep warisan keluarga yang diturunkan lintas generasi. Kulit lumpia yang digoreng dengan minyak panas yang pas sehingga menciptakan kulit golden brown yang renyah membalut rebung pilihan dan bahan-bahan premium segar dari pertanian.",
  heroSubDescription:
    "Dipilih dengan cermat, disiapkan dengan hormat. Pilih pengalaman warisan Anda.",
  orderButtonLabel: "Pesan Sekarang",
  exploreButtonLabel: "Jelajahi Menu",
  orderButtonLink: "https://gofood.link/a/C2kf5TE",
  exploreButtonLink: "/#products",
  foundedYear: "1998",
  address: "Jl. Meranti Barat 1 no. 322 banyumanik semarang",
  openDays: "Senin - Sabtu",
  openHours: "09:00 - 21:00",
  whatsappLink: "https://api.whatsapp.com/send/?phone=6281227816101",
  mapsLink:
    "https://www.google.com/maps/place/Lumpia+Semarang+%7C+Lumpia+Mbak+Cun",
  goFoodLink: "https://gofood.link/a/C2kf5TE",
  instagramLink: "https://gofood.link/a/C2kf5TE",
  grabFoodLink: "https://gofood.link/a/C2kf5TE",
  homeSeoTitle: "Lumpia Semarang Asli dan Tahu Bakso",
  homeSeoDescription:
    "Cita rasa otentik Semarang, Lumpia dan Tahu Bakso khas nusantara yang selalu diracik dengan cinta.",
};

function parsePrice(price: string) {
  const value = Number(price.replace(/[^\d]/g, ""));

  if (!Number.isFinite(value)) {
    throw new Error(`Invalid product price: ${price}`);
  }

  return value;
}

async function seedAdmin() {
  const email = process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD?.trim();

  if (!email || !password) {
    console.log("Admin seed skipped. ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD is missing.");
    return;
  }

  if (password.length < 8) {
    throw new Error("ADMIN_SEED_PASSWORD must be at least 8 characters long.");
  }

  const existingAdmin = await prisma.admin.findFirst({
    select: { id: true, email: true },
  });

  if (existingAdmin) {
    console.log(`Admin seed skipped. Admin already exists (${existingAdmin.email}).`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(`Admin created successfully for ${email}.`);
}

async function seedProducts() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        price: parsePrice(product.price),
        description: product.description,
        highlights: product.highlights,
        image: product.image,
        availability: true,
        badge: product.badge,
        portion: product.portion,
        philosophy: product.philosophy,
        ingredients: product.ingredients,
        storageTip: product.storageTip,
        imageNote: product.imageNote,
      },
      create: {
        slug: product.slug,
        name: product.name,
        price: parsePrice(product.price),
        description: product.description,
        highlights: product.highlights,
        image: product.image,
        availability: true,
        badge: product.badge,
        portion: product.portion,
        philosophy: product.philosophy,
        ingredients: product.ingredients,
        storageTip: product.storageTip,
        imageNote: product.imageNote,
      },
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

async function seedWebConfigs() {
  const entries = Object.entries(webConfigEntries);

  for (const [key, value] of entries) {
    await prisma.webConfig.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
  }

  console.log(`Seeded ${entries.length} web configs.`);
}

async function main() {
  await seedAdmin();
  await seedProducts();
  await seedWebConfigs();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
