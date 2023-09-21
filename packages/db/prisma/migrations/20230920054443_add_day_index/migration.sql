/*
  Warnings:

  - Added the required column `day_index` to the `itinerary_days` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "itinerary_days" ADD COLUMN     "day_index" INTEGER NOT NULL;
