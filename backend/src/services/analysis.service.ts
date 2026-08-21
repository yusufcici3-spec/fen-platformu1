import { prisma } from "../config/db";

type AnalysisAnswer = {
  isCorrect: boolean | null;
  answeredAt: Date;
  question: {
    topic: {
      id: string;
      title: string;
    };
    learningOutcome: {
      id: string;
      description: string;
    } | null;
  };
};

type StudyLog = {
  source: string;
  minutes: number;
};

type ExamResult = {
  successPercent: number;
  finishedAt: Date | null;
  exam: {
    title: string;
    type: string;
  };
};

type GameScore = {
  score: number;
  game: {
    title: string;
    type: string;
  };
};

export async function buildAnalysisReport(userId: string) {
  const [
    rawAnswers,
    rawExamResults,
    rawGameScores,
    completedTopics,
    rawStudyLog
