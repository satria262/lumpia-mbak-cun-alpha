/*
  Warnings:

  - You are about to drop the column `body` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoice]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_name` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_phone` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_address` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_product_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropIndex
DROP INDEX "orders_product_id_idx";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "body",
DROP COLUMN "product_id",
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "customer_phone" TEXT NOT NULL,
ADD COLUMN     "delivery_address" TEXT NOT NULL,
ADD COLUMN     "delivery_fee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "payment_method" TEXT,
ADD COLUMN     "payment_status" TEXT NOT NULL DEFAULT 'unpaid',
ADD COLUMN     "subtotal" INTEGER NOT NULL,
ADD COLUMN     "total_price" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "invoice" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending';

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");

-- CreateIndex
CREATE INDEX "order_items_product_id_idx" ON "order_items"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_invoice_key" ON "orders"("invoice");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_payment_status_idx" ON "orders"("payment_status");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
