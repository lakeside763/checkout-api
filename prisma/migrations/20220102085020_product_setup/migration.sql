-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "productCode" TEXT NOT NULL,
    "averageRating" REAL NOT NULL,
    "totalReviews" INTEGER NOT NULL,
    "product" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "productId" TEXT,
    FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_productsToreviews" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "reviews" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_productsToreviews_AB_unique" ON "_productsToreviews"("A", "B");

-- CreateIndex
CREATE INDEX "_productsToreviews_B_index" ON "_productsToreviews"("B");
