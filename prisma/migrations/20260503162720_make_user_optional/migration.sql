-- DropForeignKey
ALTER TABLE "InterviewQuestion" DROP CONSTRAINT "InterviewQuestion_userId_fkey";

-- AlterTable
ALTER TABLE "InterviewQuestion" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "InterviewQuestion" ADD CONSTRAINT "InterviewQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
