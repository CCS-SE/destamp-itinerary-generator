-- CreateTable
CREATE TABLE "trip_preferences" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "accommodation_type" VARCHAR(255) NOT NULL,
    "amenities" VARCHAR(255)[],
    "activities" JSONB NOT NULL,
    "dining_styles" VARCHAR(255)[],
    "cuisines" VARCHAR(255)[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trip_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trip_preferences_trip_id_key" ON "trip_preferences"("trip_id");

-- AddForeignKey
ALTER TABLE "trip_preferences" ADD CONSTRAINT "trip_preferences_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
