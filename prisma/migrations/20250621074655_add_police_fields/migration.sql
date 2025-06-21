/*
  Warnings:

  - You are about to drop the column `category` on the `LearningResource` table. All the data in the column will be lost.
  - You are about to drop the column `timeToRead` on the `LearningResource` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `LearningResource` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `LearningResource` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `responses` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the `Mood` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `LearningResource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questions` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'POLICE_OFFICER');

-- DropForeignKey
ALTER TABLE "Mood" DROP CONSTRAINT "Mood_userId_fkey";

-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_userId_fkey";

-- AlterTable
ALTER TABLE "LearningProgress" ALTER COLUMN "progress" SET DEFAULT 0,
ALTER COLUMN "progress" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "LearningResource" DROP COLUMN "category",
DROP COLUMN "timeToRead",
DROP COLUMN "updatedAt",
DROP COLUMN "videoUrl",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "title",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "responses",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "questions" JSONB NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "designation" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Mood";

-- CreateTable
CREATE TABLE "MoodEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoodEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyAnswer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurveyAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),

    CONSTRAINT "ChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MoodEntry" ADD CONSTRAINT "MoodEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyAnswer" ADD CONSTRAINT "SurveyAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatSession" ADD CONSTRAINT "ChatSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningProgress" ADD CONSTRAINT "LearningProgress_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "LearningResource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
