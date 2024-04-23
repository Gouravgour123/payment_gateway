/*
  Warnings:

  - Changed the type of `status` on the `merchant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `status` to the `upi` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "status_for_merchant" AS ENUM ('active', 'inactive');

-- AlterTable
ALTER TABLE "merchant" DROP COLUMN "status",
ADD COLUMN     "status" "status_for_merchant" NOT NULL;

-- AlterTable
ALTER TABLE "upi" ADD COLUMN     "status" "status" NOT NULL;
