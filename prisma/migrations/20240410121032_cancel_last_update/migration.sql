/*
  Warnings:

  - You are about to drop the column `created_by` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "created_by",
DROP COLUMN "updated_by";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_by",
DROP COLUMN "updated_by";
