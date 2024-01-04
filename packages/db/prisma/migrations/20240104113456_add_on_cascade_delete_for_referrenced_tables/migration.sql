/*
  Warnings:

  - You are about to drop the column `business_operator_id` on the `point_of_interests` table. All the data in the column will be lost.
  - You are about to drop the `business_operators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `business_permits` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `point_of_interests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accommodations" DROP CONSTRAINT "accommodations_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "business_operators" DROP CONSTRAINT "business_operators_user_id_fkey";

-- DropForeignKey
ALTER TABLE "business_permits" DROP CONSTRAINT "business_permits_business_operator_id_fkey";

-- DropForeignKey
ALTER TABLE "business_permits" DROP CONSTRAINT "business_permits_image_id_fkey";

-- DropForeignKey
ALTER TABLE "business_permits" DROP CONSTRAINT "business_permits_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "daily_itineraries" DROP CONSTRAINT "daily_itineraries_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "daily_itinerary_pois" DROP CONSTRAINT "daily_itinerary_pois_daily_itinerary_id_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "operating_hours" DROP CONSTRAINT "operating_hours_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_images" DROP CONSTRAINT "poi_images_image_id_fkey";

-- DropForeignKey
ALTER TABLE "poi_images" DROP CONSTRAINT "poi_images_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "point_of_interests" DROP CONSTRAINT "point_of_interests_business_operator_id_fkey";

-- DropForeignKey
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_poi_id_fkey";

-- DropForeignKey
ALTER TABLE "stamps" DROP CONSTRAINT "stamps_image_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_traveler_id_fkey";

-- DropForeignKey
ALTER TABLE "travelers" DROP CONSTRAINT "travelers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "trip_preferences" DROP CONSTRAINT "trip_preferences_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_traveler_id_fkey";

-- AlterTable
ALTER TABLE "point_of_interests" DROP COLUMN "business_operator_id",
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_business_operator" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "business_operators";

-- DropTable
DROP TABLE "business_permits";

-- CreateTable
CREATE TABLE "business_permit_images" (
    "id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "poi_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_permit_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_permit_images_image_id_key" ON "business_permit_images"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_permit_images_poi_id_key" ON "business_permit_images"("poi_id");

-- AddForeignKey
ALTER TABLE "travelers" ADD CONSTRAINT "travelers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "travelers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "travelers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_of_interests" ADD CONSTRAINT "point_of_interests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trip_preferences" ADD CONSTRAINT "trip_preferences_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "point_of_interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "point_of_interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operating_hours" ADD CONSTRAINT "operating_hours_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "point_of_interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_itineraries" ADD CONSTRAINT "daily_itineraries_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_itinerary_pois" ADD CONSTRAINT "daily_itinerary_pois_daily_itinerary_id_fkey" FOREIGN KEY ("daily_itinerary_id") REFERENCES "daily_itineraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_images" ADD CONSTRAINT "poi_images_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "point_of_interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poi_images" ADD CONSTRAINT "poi_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_permit_images" ADD CONSTRAINT "business_permit_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_permit_images" ADD CONSTRAINT "business_permit_images_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "point_of_interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stamps" ADD CONSTRAINT "stamps_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
