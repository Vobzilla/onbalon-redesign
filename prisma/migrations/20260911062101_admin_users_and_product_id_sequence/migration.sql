-- AlterTable
CREATE SEQUENCE products_id_seq;
ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT nextval('products_id_seq');
ALTER SEQUENCE products_id_seq OWNED BY "products"."id";

-- Existing rows keep the ids migrated from data/products.ts, so the sequence
-- has to continue above them instead of restarting at 1.
SELECT setval('products_id_seq', COALESCE((SELECT MAX("id") FROM "products"), 0) + 1, false);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");
