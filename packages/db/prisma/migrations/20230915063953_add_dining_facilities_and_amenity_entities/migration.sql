-- CreateTable
CREATE TABLE "dining_atmospheres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "placeId" TEXT,

    CONSTRAINT "dining_atmospheres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dining_offerings" (
    "id" SERIAL NOT NULL,
    "placeId" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "dining_offerings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dining_options" (
    "id" SERIAL NOT NULL,
    "placeId" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "dining_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dining_cuisines" (
    "id" SERIAL NOT NULL,
    "placeId" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "dining_cuisines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amenities" (
    "id" SERIAL NOT NULL,
    "placeId" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "amenities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dining_atmospheres" ADD CONSTRAINT "dining_atmospheres_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dining_offerings" ADD CONSTRAINT "dining_offerings_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dining_options" ADD CONSTRAINT "dining_options_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dining_cuisines" ADD CONSTRAINT "dining_cuisines_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amenities" ADD CONSTRAINT "amenities_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;
