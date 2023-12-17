/*
  Warnings:

  - You are about to drop the column `user_id` on the `business_permits` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `point_of_interests` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `trip_count` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_StampToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[traveler_id]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `business_operator_id` to the `business_permits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traveler_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traveler_id` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_StampToUser" DROP CONSTRAINT "_StampToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_StampToUser" DROP CONSTRAINT "_StampToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "business_permits" DROP CONSTRAINT "business_permits_user_id_fkey";

-- DropForeignKey
ALTER TABLE "point_of_interests" DROP CONSTRAINT "point_of_interests_user_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_user_id_fkey";

-- DropIndex
DROP INDEX "subscriptions_user_id_key";

-- AlterTable
ALTER TABLE "business_permits" DROP COLUMN "user_id",
ADD COLUMN     "business_operator_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "point_of_interests" DROP COLUMN "user_id",
ADD COLUMN     "business_operator_id" TEXT;

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "user_id",
ADD COLUMN     "traveler_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "user_id",
ADD COLUMN     "traveler_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "trip_count",
DROP COLUMN "type";

-- DropTable
DROP TABLE "_StampToUser";

-- DropEnum
DROP TYPE "user_type";

-- CreateTable
CREATE TABLE "travelers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "trip_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travelers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_operators" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_operators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StampToTraveler" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "travelers_user_id_key" ON "travelers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_operators_user_id_key" ON "business_operators"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_StampToTraveler_AB_unique" ON "_StampToTraveler"("A", "B");

-- CreateIndex
CREATE INDEX "_StampToTraveler_B_index" ON "_StampToTraveler"("B");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_traveler_id_key" ON "subscriptions"("traveler_id");

-- AddForeignKey
ALTER TABLE "travelers" ADD CONSTRAINT "travelers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_operators" ADD CONSTRAINT "business_operators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "travelers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "travelers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_of_interests" ADD CONSTRAINT "point_of_interests_business_operator_id_fkey" FOREIGN KEY ("business_operator_id") REFERENCES "business_operators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_permits" ADD CONSTRAINT "business_permits_business_operator_id_fkey" FOREIGN KEY ("business_operator_id") REFERENCES "business_operators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StampToTraveler" ADD CONSTRAINT "_StampToTraveler_A_fkey" FOREIGN KEY ("A") REFERENCES "stamps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StampToTraveler" ADD CONSTRAINT "_StampToTraveler_B_fkey" FOREIGN KEY ("B") REFERENCES "travelers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
