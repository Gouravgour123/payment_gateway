-- CreateTable
CREATE TABLE "Bank_Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "ifsc" TEXT NOT NULL,

    CONSTRAINT "Bank_Account_pkey" PRIMARY KEY ("id")
);
