/*
  Warnings:

  - You are about to drop the column `isValidTicket` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `seat` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `ticket` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `ageLimit` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `movieName` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ticketCode]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionId,seatId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seatId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketCode` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basePrice` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hallId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SeatCategory" AS ENUM ('STANDARD', 'VIP');

-- CreateEnum
CREATE TYPE "AgeRating" AS ENUM ('G', 'PG', 'PG13', 'R', 'NC17');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('SCHEDULED', 'CANCELLED', 'FINISHED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'CASHIER';

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_movieId_fkey";

-- DropIndex
DROP INDEX "Booking_sessionId_seat_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "isValidTicket",
DROP COLUMN "seat",
DROP COLUMN "ticket",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "seatId" INTEGER NOT NULL,
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "ticketCode" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "ageLimit",
DROP COLUMN "movieName",
ADD COLUMN     "ageRating" "AgeRating" NOT NULL DEFAULT 'PG13',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "date",
DROP COLUMN "isActive",
ADD COLUMN     "basePrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "hallId" INTEGER NOT NULL,
ADD COLUMN     "startTime" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT 'SCHEDULED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Hall" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Hall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "row" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "hallId" INTEGER NOT NULL,
    "seatCategory" "SeatCategory" NOT NULL DEFAULT 'STANDARD',

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hall_name_key" ON "Hall"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_row_number_hallId_key" ON "Seat"("row", "number", "hallId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_ticketCode_key" ON "Booking"("ticketCode");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_sessionId_seatId_key" ON "Booking"("sessionId", "seatId");

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "Hall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "Hall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
