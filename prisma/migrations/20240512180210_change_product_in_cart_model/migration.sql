/*
  Warnings:

  - You are about to drop the column `description` on the `ProductInCart` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ProductInCart` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ProductInCart` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductInCart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductInCart" DROP COLUMN "description",
DROP COLUMN "price",
DROP COLUMN "title",
ADD COLUMN     "productId" INTEGER NOT NULL;
