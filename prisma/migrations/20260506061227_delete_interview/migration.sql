-- DropForeignKey
ALTER TABLE "InterviewAnswer" DROP CONSTRAINT "InterviewAnswer_questionId_fkey";

-- AddForeignKey
ALTER TABLE "InterviewAnswer" ADD CONSTRAINT "InterviewAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "InterviewQuestionTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
