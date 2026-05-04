-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_episodeId_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "episodeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
