/*
  Warnings:

  - You are about to drop the `InterviewQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InterviewQuestion" DROP CONSTRAINT "InterviewQuestion_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_episodeId_fkey";

-- AlterTable
ALTER TABLE "Episode" ALTER COLUMN "content" DROP NOT NULL;

-- DropTable
DROP TABLE "InterviewQuestion";

-- DropTable
DROP TABLE "Question";

-- CreateTable
CREATE TABLE "QuestionTemplate" (
    "id" BIGSERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "userId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EpisodeAnswer" (
    "id" BIGSERIAL NOT NULL,
    "episodeId" BIGINT NOT NULL,
    "questionId" BIGINT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "EpisodeAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewQuestionTemplate" (
    "id" BIGSERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "category" TEXT,
    "userId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewQuestionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewAnswer" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "questionId" BIGINT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "InterviewAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionTemplate" ADD CONSTRAINT "QuestionTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EpisodeAnswer" ADD CONSTRAINT "EpisodeAnswer_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EpisodeAnswer" ADD CONSTRAINT "EpisodeAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestionTemplate" ADD CONSTRAINT "InterviewQuestionTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewAnswer" ADD CONSTRAINT "InterviewAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewAnswer" ADD CONSTRAINT "InterviewAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "InterviewQuestionTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
