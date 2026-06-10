-- CreateTable
CREATE TABLE "Ride" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "pickupLabel" TEXT NOT NULL,
    "pickupLng" REAL NOT NULL,
    "pickupLat" REAL NOT NULL,
    "dropoffLabel" TEXT NOT NULL,
    "dropoffLng" REAL NOT NULL,
    "dropoffLat" REAL NOT NULL,
    "optionName" TEXT NOT NULL,
    "paymentName" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "duration" REAL NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Ride_userId_createdAt_idx" ON "Ride"("userId", "createdAt");
