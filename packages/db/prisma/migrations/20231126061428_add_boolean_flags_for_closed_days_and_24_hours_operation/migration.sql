-- AlterTable
ALTER TABLE "operating_hours" ADD COLUMN     "is_24_hours" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_closed" BOOLEAN NOT NULL DEFAULT false;
