-- CreateTable
CREATE TABLE "common_content_items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "common_content_items_pkey" PRIMARY KEY ("id")
);
