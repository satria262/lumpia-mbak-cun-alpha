"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

function productRedirectUrl(type: "success" | "error", message: string) {
  const params = new URLSearchParams({ [type]: message });
  return `/admin/products?${params.toString()}`;
}

export async function deleteProduct(formData: FormData) {
  await requireAdminSession();
  let redirectUrl = productRedirectUrl("success", "Product deleted successfully");

  try {
    const productId = Number(formData.get("productId"));

    if (!Number.isInteger(productId)) {
      redirectUrl = productRedirectUrl("error", "Invalid product");
      throw new Error("Invalid product id.");
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });

    if (!existingProduct) {
      redirectUrl = productRedirectUrl("error", "Product not found");
      throw new Error(`Product ${productId} not found.`);
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to delete product.", error);

    if (!redirectUrl.includes("?error=")) {
      redirectUrl = productRedirectUrl("error", "Failed to delete product");
    }
  }

  redirect(redirectUrl);
}
