/*
  Warnings:

  - You are about to drop the column `addres` on the `departing_locations` table. All the data in the column will be lost.
  - Added the required column `address` to the `departing_locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "departing_locations" DROP COLUMN "addres",
ADD COLUMN     "address" TEXT NOT NULL;
