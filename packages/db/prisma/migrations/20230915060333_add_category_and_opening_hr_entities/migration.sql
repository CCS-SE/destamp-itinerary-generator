/*
  Warnings:

  - You are about to drop the column `isMenuImg` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `isPlaceImg` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `isProfileImg` on the `images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "isMenuImg",
DROP COLUMN "isPlaceImg",
DROP COLUMN "isProfileImg",
ADD COLUMN     "is_menu_img" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_place_img" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_profile_img" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "placeId" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opening_hours" (
    "id" SERIAL NOT NULL,
    "placeId" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "opening_hours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opening_hours" ADD CONSTRAINT "opening_hours_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;
