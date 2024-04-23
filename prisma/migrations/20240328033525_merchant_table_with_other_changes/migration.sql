/*
  Warnings:

  - You are about to drop the `Bank_Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UPI` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('active', 'inactive');

-- DropTable
DROP TABLE "Bank_Account";

-- DropTable
DROP TABLE "UPI";

-- CreateTable
CREATE TABLE "upi" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "upi_id" TEXT NOT NULL,

    CONSTRAINT "upi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "ifsc" TEXT NOT NULL,

    CONSTRAINT "bank_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "web_url" TEXT NOT NULL,
    "platform_name" TEXT NOT NULL,
    "redirectedurl" TEXT NOT NULL,
    "webhooksurl" TEXT NOT NULL,
    "secrate_key" TEXT NOT NULL,
    "secrate_IV" TEXT NOT NULL,
    "status" "status" NOT NULL,

    CONSTRAINT "merchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "upi_upi_id_key" ON "upi"("upi_id");
