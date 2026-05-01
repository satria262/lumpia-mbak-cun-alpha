-- Convert web_configs from a single-record settings table to key-value storage.
-- Existing single-record values are preserved under their closest matching keys.
CREATE TABLE "web_configs_new" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "web_configs_new_pkey" PRIMARY KEY ("id")
);

INSERT INTO "web_configs_new" ("id", "key", "value")
SELECT concat('migrated_siteTitle_', "id"::text), 'siteTitle', "site_name"
FROM (
    SELECT "id", "site_name"
    FROM "web_configs"
    WHERE "site_name" IS NOT NULL
    ORDER BY "id"
    LIMIT 1
) AS config
WHERE "site_name" IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO "web_configs_new" ("id", "key", "value")
SELECT concat('migrated_logo_', "id"::text), 'logo', "logo"
FROM (
    SELECT "id", "logo"
    FROM "web_configs"
    WHERE "logo" IS NOT NULL
    ORDER BY "id"
    LIMIT 1
) AS config
WHERE "logo" IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO "web_configs_new" ("id", "key", "value")
SELECT concat('migrated_whatsappLink_', "id"::text), 'whatsappLink', "whatsapp_number"
FROM (
    SELECT "id", "whatsapp_number"
    FROM "web_configs"
    WHERE "whatsapp_number" IS NOT NULL
    ORDER BY "id"
    LIMIT 1
) AS config
WHERE "whatsapp_number" IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO "web_configs_new" ("id", "key", "value")
SELECT concat('migrated_address_', "id"::text), 'address', "address"
FROM (
    SELECT "id", "address"
    FROM "web_configs"
    WHERE "address" IS NOT NULL
    ORDER BY "id"
    LIMIT 1
) AS config
WHERE "address" IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO "web_configs_new" ("id", "key", "value")
SELECT concat('migrated_heroBanner_', "id"::text), 'heroBanner', "hero_banner"
FROM (
    SELECT "id", "hero_banner"
    FROM "web_configs"
    WHERE "hero_banner" IS NOT NULL
    ORDER BY "id"
    LIMIT 1
) AS config
WHERE "hero_banner" IS NOT NULL
ON CONFLICT DO NOTHING;

DROP TABLE "web_configs";

ALTER TABLE "web_configs_new" RENAME TO "web_configs";
ALTER TABLE "web_configs" RENAME CONSTRAINT "web_configs_new_pkey" TO "web_configs_pkey";

CREATE UNIQUE INDEX "web_configs_key_key" ON "web_configs"("key");
