/*
  Warnings:

  - Added the required column `agent_code` to the `merchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "merchant" ADD COLUMN     "agent_code" TEXT NOT NULL;
