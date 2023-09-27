/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `amenities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `dining_atmospheres` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `dining_cuisines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `dining_offerings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `dining_options` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `is_claimed` to the `places` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "places" ADD COLUMN     "is_claimed" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "amenities_name_key" ON "amenities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dining_atmospheres_name_key" ON "dining_atmospheres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dining_cuisines_name_key" ON "dining_cuisines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dining_offerings_name_key" ON "dining_offerings"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dining_options_name_key" ON "dining_options"("name");
