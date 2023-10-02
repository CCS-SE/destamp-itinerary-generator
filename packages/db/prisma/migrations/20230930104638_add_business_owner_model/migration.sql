-- CreateEnum
CREATE TYPE "BusinessOwnerRole" AS ENUM ('OWNER', 'MANAGER');

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "businessOwnerId" INTEGER;

-- CreateTable
CREATE TABLE "business_owners" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" "BusinessOwnerRole" NOT NULL,

    CONSTRAINT "business_owners_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_businessOwnerId_fkey" FOREIGN KEY ("businessOwnerId") REFERENCES "business_owners"("id") ON DELETE SET NULL ON UPDATE CASCADE;
