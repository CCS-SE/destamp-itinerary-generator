/*
  Warnings:

  - You are about to drop the `_ItineraryDayToPlace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itinerary_days` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItineraryDayToPlace" DROP CONSTRAINT "_ItineraryDayToPlace_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItineraryDayToPlace" DROP CONSTRAINT "_ItineraryDayToPlace_B_fkey";

-- DropForeignKey
ALTER TABLE "itinerary_days" DROP CONSTRAINT "itinerary_days_itineraryId_fkey";

-- DropTable
DROP TABLE "_ItineraryDayToPlace";

-- DropTable
DROP TABLE "itinerary_days";

-- CreateTable
CREATE TABLE "daily_itineraries" (
    "id" SERIAL NOT NULL,
    "itineraryId" INTEGER,
    "accommodation_cost" DOUBLE PRECISION NOT NULL,
    "attraction_cost" DOUBLE PRECISION NOT NULL,
    "food_cost" DOUBLE PRECISION NOT NULL,
    "day_index" INTEGER NOT NULL,
    "transportation_cost" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DailyItineraryToPlace" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DailyItineraryToPlace_AB_unique" ON "_DailyItineraryToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_DailyItineraryToPlace_B_index" ON "_DailyItineraryToPlace"("B");

-- AddForeignKey
ALTER TABLE "daily_itineraries" ADD CONSTRAINT "daily_itineraries_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DailyItineraryToPlace" ADD CONSTRAINT "_DailyItineraryToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "daily_itineraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DailyItineraryToPlace" ADD CONSTRAINT "_DailyItineraryToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;
