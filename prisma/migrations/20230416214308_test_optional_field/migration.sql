/*
  Warnings:

  - Made the column `middle_name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "middle_name" SET NOT NULL;
