-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "updated_by" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "updated_by" INTEGER;
