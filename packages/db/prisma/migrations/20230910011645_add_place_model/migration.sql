-- CreateEnum
CREATE TYPE "place_type" AS ENUM ('ACCOMMODATION', 'RESTAURANT', 'ATTRACTION');

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "isMenuImg" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPlaceImg" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isProfileImg" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "placeId" TEXT;

-- CreateTable
CREATE TABLE "places" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "place_type" NOT NULL,
    "address" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "contact_number" TEXT,
    "visit_duration" DOUBLE PRECISION NOT NULL,
    "url" TEXT,
    "website" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "geo_location" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "geo_location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "geo_location_placeId_key" ON "geo_location"("placeId");

-- AddForeignKey
ALTER TABLE "geo_location" ADD CONSTRAINT "geo_location_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;
