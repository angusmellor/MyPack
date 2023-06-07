/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `CategoryName` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ItemName` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "cost" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CategoryName_category_key" ON "CategoryName"("category");

-- CreateIndex
CREATE UNIQUE INDEX "ItemName_name_key" ON "ItemName"("name");
