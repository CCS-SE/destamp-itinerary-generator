/*
  Warnings:

  - You are about to drop the column `date_collected` on the `stamps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stamps" DROP COLUMN "date_collected";

-- CreateTable
CREATE TABLE "business_permits" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "poi_id" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_permits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_permits_image_id_key" ON "business_permits"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_permits_poi_id_key" ON "business_permits"("poi_id");

-- AddForeignKey
ALTER TABLE "business_permits" ADD CONSTRAINT "business_permits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_permits" ADD CONSTRAINT "business_permits_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_permits" ADD CONSTRAINT "business_permits_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "point_of_interests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
