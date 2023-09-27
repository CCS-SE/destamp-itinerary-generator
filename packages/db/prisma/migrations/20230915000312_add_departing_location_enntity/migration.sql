/*
  Warnings:

  - A unique constraint covering the columns `[departingLocationId]` on the table `geo_location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[departingLocationId]` on the table `trips` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "geo_location" ADD COLUMN     "departingLocationId" INTEGER;

-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "departingLocationId" INTEGER,
ADD COLUMN     "isAccommodationIncluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFoodIncluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTransportationIncluded" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "departing_locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "addres" TEXT NOT NULL,

    CONSTRAINT "departing_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "geo_location_departingLocationId_key" ON "geo_location"("departingLocationId");

-- CreateIndex
CREATE UNIQUE INDEX "trips_departingLocationId_key" ON "trips"("departingLocationId");

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_departingLocationId_fkey" FOREIGN KEY ("departingLocationId") REFERENCES "departing_locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geo_location" ADD CONSTRAINT "geo_location_departingLocationId_fkey" FOREIGN KEY ("departingLocationId") REFERENCES "departing_locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
