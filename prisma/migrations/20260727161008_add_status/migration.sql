-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DONE', 'IN_PROGRESS');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'IN_PROGRESS';
