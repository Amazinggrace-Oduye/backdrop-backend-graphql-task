/*
  Warnings:

  - You are about to drop the column `userId` on the `Bank` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bank" DROP CONSTRAINT "Bank_userId_fkey";

-- AlterTable
ALTER TABLE "Bank" DROP COLUMN "userId";
