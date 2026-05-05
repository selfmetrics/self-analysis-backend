-- DropForeignKey
ALTER TABLE "EpisodeAnswer" DROP CONSTRAINT "EpisodeAnswer_questionId_fkey";

-- AddForeignKey
ALTER TABLE "EpisodeAnswer" ADD CONSTRAINT "EpisodeAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
