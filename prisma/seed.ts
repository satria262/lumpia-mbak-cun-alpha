import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD?.trim();

  if (!email) {
    throw new Error("Missing ADMIN_SEED_EMAIL in environment variables.");
  }

  if (!password) {
    throw new Error("Missing ADMIN_SEED_PASSWORD in environment variables.");
  }

  if (password.length < 8) {
    throw new Error("ADMIN_SEED_PASSWORD must be at least 8 characters long.");
  }

  const existingAdmin = await prisma.admin.findFirst({
    select: { id: true, email: true },
  });

  if (existingAdmin) {
    throw new Error(
      `Admin already exists (${existingAdmin.email}). Seed aborted to prevent duplicates.`,
    );
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

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
