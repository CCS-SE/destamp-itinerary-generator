/*
  Warnings:

  - You are about to drop the `business_permit_images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `business_permit_image` to the `point_of_interests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "business_permit_images" DROP CONSTRAINT "business_permit_images_image_id_fkey";

-- DropForeignKey
ALTER TABLE "business_permit_images" DROP CONSTRAINT "business_permit_images_poi_id_fkey";

-- AlterTable
ALTER TABLE "point_of_interests" ADD COLUMN     "business_permit_image" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "business_permit_images";
