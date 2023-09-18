-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('ACCOMMODATION', 'FOOD', 'TRANSPORTATION', 'SIGHTSEEING', 'SHOPPING', 'ACTIVITY', 'OTHER');

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "itineraryDayId" INTEGER;

-- CreateTable
CREATE TABLE "itineraries" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "total_cost" DOUBLE PRECISION NOT NULL,
    "total_duration" DOUBLE PRECISION NOT NULL,
    "tripId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_days" (
    "id" SERIAL NOT NULL,
    "itineraryId" INTEGER,
    "accommodation_cost" DOUBLE PRECISION NOT NULL,
    "attraction_cost" DOUBLE PRECISION NOT NULL,
    "food_cost" DOUBLE PRECISION NOT NULL,
    "transportation_cost" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itinerary_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" SERIAL NOT NULL,
    "itineraryId" INTEGER,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" "ExpenseCategory" NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "itineraries_tripId_key" ON "itineraries"("tripId");

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_itineraryDayId_fkey" FOREIGN KEY ("itineraryDayId") REFERENCES "itinerary_days"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_days" ADD CONSTRAINT "itinerary_days_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
