"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export async function deleteProduct(formData: FormData) {
  await requireAdminSession();

  const productId = Number(formData.get("productId"));

  if (!Number.isInteger(productId)) {
    throw new Error("Produk tidak valid.");
  }

  await prisma.product.delete({
    where: { id: productId },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}
