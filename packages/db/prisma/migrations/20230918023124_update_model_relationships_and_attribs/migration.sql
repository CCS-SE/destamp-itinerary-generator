/*
  Warnings:

  - You are about to drop the column `placeId` on the `amenities` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `dining_atmospheres` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `dining_cuisines` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `dining_offerings` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `dining_options` table. All the data in the column will be lost.
  - You are about to drop the column `destinatiodId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `is_menu_img` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `is_place_img` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `is_profile_img` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `travelerId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `opening_hours` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `opening_hours` table. All the data in the column will be lost.
  - You are about to drop the column `itineraryDayId` on the `places` table. All the data in the column will be lost.
  - You are about to drop the `geo_location` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[destinationId]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `latitude` to the `departing_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `departing_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `opening_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `places` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `places` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "amenities" DROP CONSTRAINT "amenities_placeId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_placeId_fkey";

-- DropForeignKey
ALTER TABLE "dining_atmospheres" DROP CONSTRAINT "dining_atmospheres_placeId_fkey";

-- DropForeignKey
ALTER TABLE "dining_cuisines" DROP CONSTRAINT "dining_cuisines_placeId_fkey";

-- DropForeignKey
ALTER TABLE "dining_offerings" DROP CONSTRAINT "dining_offerings_placeId_fkey";

-- DropForeignKey
ALTER TABLE "dining_options" DROP CONSTRAINT "dining_options_placeId_fkey";

-- DropForeignKey
ALTER TABLE "geo_location" DROP CONSTRAINT "geo_location_departingLocationId_fkey";

-- DropForeignKey
ALTER TABLE "geo_location" DROP CONSTRAINT "geo_location_placeId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_destinatiodId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_travelerId_fkey";

-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_itineraryDayId_fkey";

-- DropIndex
DROP INDEX "images_destinatiodId_key";

-- DropIndex
DROP INDEX "images_travelerId_key";

-- AlterTable
ALTER TABLE "amenities" DROP COLUMN "placeId";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "placeId";

-- AlterTable
ALTER TABLE "departing_locations" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "dining_atmospheres" DROP COLUMN "placeId";

-- AlterTable
ALTER TABLE "dining_cuisines" DROP COLUMN "placeId";

-- AlterTable
ALTER TABLE "dining_offerings" DROP COLUMN "placeId";

-- AlterTable
ALTER TABLE "dining_options" DROP COLUMN "placeId";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "destinatiodId",
DROP COLUMN "is_menu_img",
DROP COLUMN "is_place_img",
DROP COLUMN "is_profile_img",
DROP COLUMN "travelerId",
ADD COLUMN     "destinationId" INTEGER;

-- AlterTable
ALTER TABLE "opening_hours" DROP COLUMN "end_date",
DROP COLUMN "start_date",
ADD COLUMN     "close_time" TIMESTAMP(3),
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "open_time" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "places" DROP COLUMN "itineraryDayId",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "geo_location";

-- CreateTable
CREATE TABLE "_DiningAtmosphereToPlace" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DiningOfferingToPlace" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DiningOptionToPlace" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DiningCuisineToPlace" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AmenityToPlace" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToPlace" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ItineraryDayToPlace" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DiningAtmosphereToPlace_AB_unique" ON "_DiningAtmosphereToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_DiningAtmosphereToPlace_B_index" ON "_DiningAtmosphereToPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiningOfferingToPlace_AB_unique" ON "_DiningOfferingToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_DiningOfferingToPlace_B_index" ON "_DiningOfferingToPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiningOptionToPlace_AB_unique" ON "_DiningOptionToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_DiningOptionToPlace_B_index" ON "_DiningOptionToPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiningCuisineToPlace_AB_unique" ON "_DiningCuisineToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_DiningCuisineToPlace_B_index" ON "_DiningCuisineToPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AmenityToPlace_AB_unique" ON "_AmenityToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_AmenityToPlace_B_index" ON "_AmenityToPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPlace_AB_unique" ON "_CategoryToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPlace_B_index" ON "_CategoryToPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItineraryDayToPlace_AB_unique" ON "_ItineraryDayToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_ItineraryDayToPlace_B_index" ON "_ItineraryDayToPlace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "images_destinationId_key" ON "images"("destinationId");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiningAtmosphereToPlace" ADD CONSTRAINT "_DiningAtmosphereToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "dining_atmospheres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiningAtmosphereToPlace" ADD CONSTRAINT "_DiningAtmosphereToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiningOfferingToPlace" ADD CONSTRAINT "_DiningOfferingToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "dining_offerings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiningOfferingToPlace" ADD CONSTRAINT "_DiningOfferingToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiningOptionToPlace" ADD CONSTRAINT "_DiningOptionToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "dining_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiningOptionToPlace" ADD CONSTRAINT "_DiningOptionToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiningCuisineToPlace" ADD CONSTRAINT "_DiningCuisineToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "dining_cuisines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiningCuisineToPlace" ADD CONSTRAINT "_DiningCuisineToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToPlace" ADD CONSTRAINT "_AmenityToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToPlace" ADD CONSTRAINT "_AmenityToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPlace" ADD CONSTRAINT "_CategoryToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPlace" ADD CONSTRAINT "_CategoryToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItineraryDayToPlace" ADD CONSTRAINT "_ItineraryDayToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "itinerary_days"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItineraryDayToPlace" ADD CONSTRAINT "_ItineraryDayToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;
