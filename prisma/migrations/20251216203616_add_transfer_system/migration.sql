/*
  Warnings:

  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/

-- Ajouter la colonne balance avec une valeur par défaut
ALTER TABLE "User" ADD COLUMN "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- Ajouter les nouvelles colonnes avec des valeurs temporaires pour les données existantes
ALTER TABLE "Transaction" ADD COLUMN "senderId" INTEGER;
ALTER TABLE "Transaction" ADD COLUMN "receiverId" INTEGER;

-- Migrer les données existantes (userId -> senderId, receiverId=1 par défaut)
UPDATE "Transaction" SET "senderId" = "userId", "receiverId" = 1 WHERE "userId" IS NOT NULL;

-- Rendre les colonnes NOT NULL
ALTER TABLE "Transaction" ALTER COLUMN "senderId" SET NOT NULL;
ALTER TABLE "Transaction" ALTER COLUMN "receiverId" SET NOT NULL;

-- Supprimer l'ancienne contrainte
ALTER TABLE "Transaction" DROP CONSTRAINT IF EXISTS "Transaction_userId_fkey";

-- Supprimer l'ancienne colonne
ALTER TABLE "Transaction" DROP COLUMN "userId";

-- Ajouter les nouvelles contraintes de clé étrangère
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
