-- AlterTable
ALTER TABLE "merchant" ALTER COLUMN "web_url" DROP NOT NULL,
ALTER COLUMN "redirectedurl" DROP NOT NULL,
ALTER COLUMN "webhooksurl" DROP NOT NULL;
