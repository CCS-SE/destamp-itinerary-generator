/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `travelers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "travelers" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "travelers_userId_key" ON "travelers"("userId");

-- AddForeignKey
ALTER TABLE "travelers" ADD CONSTRAINT "travelers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
