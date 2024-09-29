-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "stringField" TEXT NOT NULL,
    "numericField" INTEGER NOT NULL,
    "switchField" BOOLEAN NOT NULL,
    "checkboxField" BOOLEAN NOT NULL,
    "selectField" TEXT NOT NULL,
    "dateField" TIMESTAMP(3) NOT NULL,
    "imageUrlField" TEXT,


    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);
