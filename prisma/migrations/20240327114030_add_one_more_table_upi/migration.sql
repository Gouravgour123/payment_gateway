-- CreateTable
CREATE TABLE "UPI" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "upiID" TEXT NOT NULL,

    CONSTRAINT "UPI_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UPI_upiID_key" ON "UPI"("upiID");
