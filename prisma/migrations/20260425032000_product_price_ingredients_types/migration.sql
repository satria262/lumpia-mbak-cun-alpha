-- Convert existing product prices like "Rp22.000" into integer rupiah values.
ALTER TABLE "products"
ALTER COLUMN "price" TYPE INTEGER
USING NULLIF(regexp_replace("price", '\D', '', 'g'), '')::INTEGER;

-- Convert existing comma-separated ingredients into a PostgreSQL text array.
ALTER TABLE "products"
ALTER COLUMN "ingredients" TYPE TEXT[]
USING CASE
  WHEN trim("ingredients") = '' THEN ARRAY[]::TEXT[]
  ELSE regexp_split_to_array("ingredients", '\s*,\s*')
END;
