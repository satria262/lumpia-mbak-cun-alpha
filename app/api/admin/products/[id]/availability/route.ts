import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type AvailabilityRequestBody = {
  availability?: unknown;
};

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/admin/products/[id]/availability">,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    return NextResponse.json(
      { error: "Produk tidak valid." },
      { status: 400 },
    );
  }

  let body: AvailabilityRequestBody;

  try {
    body = (await request.json()) as AvailabilityRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Payload request tidak valid." },
      { status: 400 },
    );
  }

  if (typeof body.availability !== "boolean") {
    return NextResponse.json(
      { error: "Availability harus berupa boolean." },
      { status: 400 },
    );
  }

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: { availability: body.availability },
      select: {
        id: true,
        slug: true,
        availability: true,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath(`/products/${product.slug}`);

    return NextResponse.json({
      id: product.id,
      availability: product.availability,
    });
  } catch {
    return NextResponse.json(
      { error: "Produk tidak ditemukan atau gagal diperbarui." },
      { status: 404 },
    );
  }
}
