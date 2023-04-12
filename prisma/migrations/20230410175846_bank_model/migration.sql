-- CreateTable
CREATE TABLE "Banks" (
    "id" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Banks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Banks" ADD CONSTRAINT "Banks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
