/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,seat]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_sessionId_seat_key" ON "Booking"("sessionId", "seat");
