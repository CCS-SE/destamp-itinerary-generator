/*
  Warnings:

  - You are about to alter the column `name` on the `amenities` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `itineraryId` on the `daily_itineraries` table. All the data in the column will be lost.
  - You are about to drop the column `travel_distances` on the `daily_itineraries` table. All the data in the column will be lost.
  - You are about to drop the column `travel_durations` on the `daily_itineraries` table. All the data in the column will be lost.
  - You are about to alter the column `food_cost` on the `daily_itineraries` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `date` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `itineraryId` on the `expenses` table. All the data in the column will be lost.
  - The `category` column on the `expenses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `note` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `destinationId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `adult_count` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `child_count` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `departingLocationId` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `destinationId` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `isAccommodationIncluded` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `isFoodIncluded` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `isTransportationIncluded` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `preferred_time` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `travelerId` on the `trips` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `trips` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `user_type` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `_AmenityToPlace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPlace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DailyItineraryToPlace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DiningAtmosphereToPlace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DiningCuisineToPlace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DiningOfferingToPlace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DiningOptionToPlace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `business_owners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `departing_locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `destinations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dining_atmospheres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dining_cuisines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dining_offerings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dining_options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itineraries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `opening_hours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `places` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `travelers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `trip_id` to the `daily_itineraries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_spent` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trip_id` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Made the column `note` on table `expenses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `starting_location` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_slots` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traveler_count` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "expense_category" AS ENUM ('ACCOMMODATION', 'FOOD', 'TRANSPORTATION', 'SIGHTSEEING', 'SHOPPING', 'ACTIVITY', 'OTHER');

-- DropForeignKey
ALTER TABLE "_AmenityToPlace" DROP CONSTRAINT "_AmenityToPlace_A_fkey";

-- DropForeignKey
ALTER TABLE "_AmenityToPlace" DROP CONSTRAINT "_AmenityToPlace_B_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPlace" DROP CONSTRAINT "_CategoryToPlace_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPlace" DROP CONSTRAINT "_CategoryToPlace_B_fkey";

-- DropForeignKey
ALTER TABLE "_DailyItineraryToPlace" DROP CONSTRAINT "_DailyItineraryToPlace_A_fkey";

-- DropForeignKey
ALTER TABLE "_DailyItineraryToPlace" DROP CONSTRAINT "_DailyItineraryToPlace_B_fkey";

-- DropForeignKey
ALTER TABLE "_DiningAtmosphereToPlace" DROP CONSTRAINT "_DiningAtmosphereToPlace_A_fkey";

-- DropForeignKey
ALTER TABLE "_DiningAtmosphereToPlace" DROP CONSTRAINT "_DiningAtmosphereToPlace_B_fkey";

-- DropForeignKey
ALTER TABLE "_DiningCuisineToPlace" DROP CONSTRAINT "_DiningCuisineToPlace_A_fkey";

-- DropForeignKey
ALTER TABLE "_DiningCuisineToPlace" DROP CONSTRAINT "_DiningCuisineToPlace_B_fkey";

-- DropForeignKey
ALTER TABLE "_DiningOfferingToPlace" DROP CONSTRAINT "_DiningOfferingToPlace_A_fkey";

-- DropForeignKey
ALTER TABLE "_DiningOfferingToPlace" DROP CONSTRAINT "_DiningOfferingToPlace_B_fkey";

-- DropForeignKey
ALTER TABLE "_DiningOptionToPlace" DROP CONSTRAINT "_DiningOptionToPlace_A_fkey";

-- DropForeignKey
ALTER TABLE "_DiningOptionToPlace" DROP CONSTRAINT "_DiningOptionToPlace_B_fkey";

-- DropForeignKey
ALTER TABLE "daily_itineraries" DROP CONSTRAINT "daily_itineraries_itineraryId_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_itineraryId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_placeId_fkey";

-- DropForeignKey
ALTER TABLE "itineraries" DROP CONSTRAINT "itineraries_tripId_fkey";

-- DropForeignKey
ALTER TABLE "opening_hours" DROP CONSTRAINT "opening_hours_placeId_fkey";

-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_businessOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "travelers" DROP CONSTRAINT "travelers_userId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_departingLocationId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_travelerId_fkey";

-- DropIndex
DROP INDEX "images_destinationId_key";

-- DropIndex
DROP INDEX "trips_departingLocationId_key";

-- AlterTable
ALTER TABLE "amenities" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "daily_itineraries" DROP COLUMN "itineraryId",
DROP COLUMN "travel_distances",
DROP COLUMN "travel_durations",
ADD COLUMN     "trip_id" INTEGER NOT NULL,
ALTER COLUMN "food_cost" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "date",
DROP COLUMN "itineraryId",
ADD COLUMN     "date_spent" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "trip_id" INTEGER NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "expense_category" NOT NULL DEFAULT 'ACCOMMODATION',
ALTER COLUMN "note" SET NOT NULL,
ALTER COLUMN "note" SET DEFAULT '',
ALTER COLUMN "note" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "images" DROP COLUMN "destinationId",
DROP COLUMN "name",
DROP COLUMN "placeId",
DROP COLUMN "size";

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "adult_count",
DROP COLUMN "child_count",
DROP COLUMN "departingLocationId",
DROP COLUMN "destinationId",
DROP COLUMN "isAccommodationIncluded",
DROP COLUMN "isFoodIncluded",
DROP COLUMN "isTransportationIncluded",
DROP COLUMN "preferred_time",
DROP COLUMN "travelerId",
ADD COLUMN     "is_accommodation_included" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_food_included" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_transportation_included" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "starting_location" JSONB NOT NULL,
ADD COLUMN     "time_slots" JSONB NOT NULL,
ADD COLUMN     "traveler_count" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "travel_size" SET DEFAULT 'SOLO',
ALTER COLUMN "end_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_type",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "last_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "type" "user_type" NOT NULL DEFAULT 'TRAVELER',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "_AmenityToPlace";

-- DropTable
DROP TABLE "_CategoryToPlace";

-- DropTable
DROP TABLE "_DailyItineraryToPlace";

-- DropTable
DROP TABLE "_DiningAtmosphereToPlace";

-- DropTable
DROP TABLE "_DiningCuisineToPlace";

-- DropTable
DROP TABLE "_DiningOfferingToPlace";

-- DropTable
DROP TABLE "_DiningOptionToPlace";

-- DropTable
DROP TABLE "business_owners";

-- DropTable
DROP TABLE "departing_locations";

-- DropTable
DROP TABLE "destinations";

-- DropTable
DROP TABLE "dining_atmospheres";

-- DropTable
DROP TABLE "dining_cuisines";

-- DropTable
DROP TABLE "dining_offerings";

-- DropTable
DROP TABLE "dining_options";

-- DropTable
DROP TABLE "itineraries";

-- DropTable
DROP TABLE "opening_hours";

-- DropTable
DROP TABLE "places";

-- DropTable
DROP TABLE "travelers";

-- DropEnum
DROP TYPE "BusinessOwnerRole";

-- DropEnum
DROP TYPE "ExpenseCategory";

-- DropEnum
DROP TYPE "place_type";

-- CreateTable
CREATE TABLE "point_of_interests" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "address" VARCHAR(255) NOT NULL,
    "price" VARCHAR(255) NOT NULL,
    "contact_number" VARCHAR(255) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "visit_duration" DOUBLE PRECISION NOT NULL,
    "is_attraction" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "point_of_interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "poi_id" TEXT NOT NULL,
    "atmospheres" VARCHAR(255)[],

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accommodations" (
    "id" SERIAL NOT NULL,
    "poi_id" TEXT NOT NULL,

    CONSTRAINT "accommodations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operating_hours" (
    "id" SERIAL NOT NULL,
    "poi_id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "open_time" TIMESTAMP(3),
    "close_time" TIMESTAMP(3),

    CONSTRAINT "operating_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_itinerary_pois" (
    "id" SERIAL NOT NULL,
    "poi_id" TEXT NOT NULL,
    "daily_itinerary_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_itinerary_pois_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poi_images" (
    "id" SERIAL NOT NULL,
    "poi_id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,

    CONSTRAINT "poi_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stamps" (
    "id" SERIAL NOT NULL,
    "image_id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "date_collected" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stamps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccommodationToAmenity" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToPointOfInterest" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_StampToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_poi_id_key" ON "restaurants"("poi_id");

-- CreateIndex
CREATE UNIQUE INDEX "accommodations_poi_id_key" ON "accommodations"("poi_id");

-- CreateIndex
CREATE UNIQUE INDEX "poi_images_image_id_key" ON "poi_images"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "stamps_image_id_key" ON "stamps"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "_AccommodationToAmenity_AB_unique" ON "_AccommodationToAmenity"("A", "B");

-- CreateIndex
CREATE INDEX "_AccommodationToAmenity_B_index" ON "_AccommodationToAmenity"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPointOfInterest_AB_unique" ON "_CategoryToPointOfInterest"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPointOfInterest_B_index" ON "_CategoryToPointOfInterest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StampToUser_AB_unique" ON "_StampToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_StampToUser_B_index" ON "_StampToUser"("B");

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_of_interests" ADD CONSTRAINT "point_of_interests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "point_of_interests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "point_of_interests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operating_hours" ADD CONSTRAINT "operating_hours_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "point_of_interests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_itineraries" ADD CONSTRAINT "daily_itineraries_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_itinerary_pois" ADD CONSTRAINT "daily_itinerary_pois_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "point_of_interests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_itinerary_pois" ADD CONSTRAINT "daily_itinerary_pois_daily_itinerary_id_fkey" FOREIGN KEY ("daily_itinerary_id") REFERENCES "daily_itineraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_images" ADD CONSTRAINT "poi_images_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "point_of_interests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_images" ADD CONSTRAINT "poi_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stamps" ADD CONSTRAINT "stamps_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccommodationToAmenity" ADD CONSTRAINT "_AccommodationToAmenity_A_fkey" FOREIGN KEY ("A") REFERENCES "accommodations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccommodationToAmenity" ADD CONSTRAINT "_AccommodationToAmenity_B_fkey" FOREIGN KEY ("B") REFERENCES "amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPointOfInterest" ADD CONSTRAINT "_CategoryToPointOfInterest_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPointOfInterest" ADD CONSTRAINT "_CategoryToPointOfInterest_B_fkey" FOREIGN KEY ("B") REFERENCES "point_of_interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StampToUser" ADD CONSTRAINT "_StampToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "stamps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StampToUser" ADD CONSTRAINT "_StampToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
