/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `upi` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[account_number]` on the table `bank_account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `merchant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bank_name` to the `bank_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `bank_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `upi` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "status_for_bank_account" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "status_for_user_payment_request" AS ENUM ('sucess', 'pending');

-- AlterTable
ALTER TABLE "bank_account" ADD COLUMN     "bank_name" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "status" "status_for_bank_account" NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "merchant" ALTER COLUMN "status" SET DEFAULT 'active';

-- AlterTable
ALTER TABLE "upi" DROP COLUMN "phoneNumber",
ADD COLUMN     "phone_number" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "user_payment_request" (
    "id" TEXT NOT NULL,
    "merchant_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "request_amount" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utr" TEXT,
    "status" "status_for_user_payment_request" NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "upi_id" TEXT,
    "amount_recived" TEXT,

    CONSTRAINT "user_payment_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bank_account_account_number_key" ON "bank_account"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_email_key" ON "merchant"("email");
