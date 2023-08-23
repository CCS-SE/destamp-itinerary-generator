-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('TRAVELER', 'BUSINESS_OPERATOR');

-- CreateEnum
CREATE TYPE "travel_size" AS ENUM ('SOLO', 'COUPLE', 'GROUP', 'FAMILY');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_type" "user_type" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travelers" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "contact_number" TEXT,

    CONSTRAINT "travelers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" SERIAL NOT NULL,
    "destinationId" INTEGER,
    "title" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "travel_size" "travel_size" NOT NULL,
    "adult_count" INTEGER,
    "child_count" INTEGER,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "travelerId" INTEGER,
    "destinatiodId" INTEGER,
    "name" TEXT,
    "url" TEXT NOT NULL,
    "size" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "images_travelerId_key" ON "images"("travelerId");

-- CreateIndex
CREATE UNIQUE INDEX "images_destinatiodId_key" ON "images"("destinatiodId");

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "travelers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_destinatiodId_fkey" FOREIGN KEY ("destinatiodId") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
