-- Drop customer account and order tables. The order_items table is dropped first
-- because it depends on both orders and products.
DROP TABLE IF EXISTS "order_items";
DROP TABLE IF EXISTS "orders";
DROP TABLE IF EXISTS "users";
