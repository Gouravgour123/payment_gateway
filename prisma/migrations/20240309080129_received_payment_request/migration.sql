-- CreateTable
CREATE TABLE "received_payment_info" (
    "id" SERIAL NOT NULL,
    "utr" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "received_payment_info_pkey" PRIMARY KEY ("id")
);
