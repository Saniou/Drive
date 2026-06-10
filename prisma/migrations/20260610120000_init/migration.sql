-- CreateTable
CREATE TABLE "Ride" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "pickupLabel" TEXT NOT NULL,
    "pickupLng" DOUBLE PRECISION NOT NULL,
    "pickupLat" DOUBLE PRECISION NOT NULL,
    "dropoffLabel" TEXT NOT NULL,
    "dropoffLng" DOUBLE PRECISION NOT NULL,
    "dropoffLat" DOUBLE PRECISION NOT NULL,
    "optionName" TEXT NOT NULL,
    "paymentName" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Ride_userId_createdAt_idx" ON "Ride"("userId", "createdAt");
