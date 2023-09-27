-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "travelerId" INTEGER;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "travelers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
