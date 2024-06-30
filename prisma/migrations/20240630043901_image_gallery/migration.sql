/*
  Warnings:

  - Added the required column `userId` to the `ImageGallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageGallery" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ImageGallery" ADD CONSTRAINT "ImageGallery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
