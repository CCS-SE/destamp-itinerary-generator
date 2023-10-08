/*
  Warnings:

  - Added the required column `travel_distances` to the `daily_itineraries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travel_durations` to the `daily_itineraries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "daily_itineraries" ADD COLUMN     "travel_distances" JSONB NOT NULL,
ADD COLUMN     "travel_durations" JSONB NOT NULL;
