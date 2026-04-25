import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client";
import { products } from "../lib/siteData";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

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

async function main() {
  await seedAdmin();
  await seedProducts();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
