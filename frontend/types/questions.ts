// ============================================================================
// AŞAMA 3: Soru bankası ve deneme sınavı sistemi ile ilgili paylaşılan tipler
// ============================================================================

export type QuestionType =
  | "MULTIPLE_CHOICE"
  | "TRUE_FALSE"
  | "FILL_BLANK"
  | "MATCHING"
  | "OPEN_ENDED"
  | "DRAG_DROP"
  | "INTERACTIVE";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface QuestionOption {
  id: string;
  text: string;
  imageUrl: string | null;
  matchText: string | null;
  isCorrect?: boolean; // öğrenciye gönderilen veride bulunmaz
  order: number;
}

export interface QuestionImage {
  id: string;
  url: string;
  caption: string | null;
  order: number;
}

export interface QuestionSolution {
  id: string;
  explanationHtml: string;
  videoUrl: string | null;
}

export interface QuestionTag {
  id: string;
  name: string;
  slug: string;
}

export interface QuestionCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface QuestionTopicRef {
  id: string;
  title: string;
  slug: string;
  unit?: { id: string; title: string; slug: string; class?: { level: number; slug: string } };
}

export interface Question {
  id: string;
  type: QuestionType;
  body: string;
  correctAnswer?: string; // öğrenciye gönderilen veride bulunmaz
  explanation?: string | null;
  difficulty: Difficulty;
  points: number;
  estimatedTimeSec: number | null;
  isScenario: boolean;
  isNextGen: boolean;
  isActive: boolean;
  topicId: string;
  topic?: QuestionTopicRef;
  category?: QuestionCategory | null;
  tags: QuestionTag[];
  images: QuestionImage[];
  choiceOptions: QuestionOption[];
  solution?: QuestionSolution | null;
  createdAt?: string;
}

export interface PracticeAnswerResult {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string | null;
  solution: QuestionSolution | null;
}

export type ExamType = "TOPIC" | "UNIT" | "GENERAL" | "LGS";

export interface Exam {
  id: string;
  title: string;
  description: string | null;
  type: ExamType;
  classLevel: number;
  durationMin: number;
  isPublished: boolean;
  topicId: string | null;
  unitId: string | null;
  topic?: { title: string; slug: string } | null;
  unit?: { title: string; slug: string } | null;
  _count?: { examQuestions: number; results?: number };
}

export interface ExamQuestion {
  id: string;
  order: number;
  question: Question;
}

export interface ExamDetail extends Exam {
  examQuestions: ExamQuestion[];
}

export interface StudentAnswer {
  id: string;
  resultId: string;
  questionId: string;
  selectedOptionId: string | null;
  answerText: string | null;
  isCorrect: boolean | null;
  answeredAt: string;
}

export interface StudentExamResult {
  id: string;
  userId: string;
  examId: string;
  startedAt: string;
  finishedAt: string | null;
  correctCount: number;
  wrongCount: number;
  blankCount: number;
  totalScore: number;
  successPercent: number;
  exam?: { title: string; type: ExamType; classLevel: number };
  answers?: StudentAnswer[];
}

export interface MyStats {
  totalAnswered: number;
  correctCount: number;
  wrongCount: number;
  blankCount: number;
  successPercent: number;
  favoriteCount: number;
  wrongQuestionCount: number;
  dailyChart: { date: string; count: number }[];
  weeklyChart: { week: string; count: number }[];
  bestTopics: { topicId: string; title: string; successRate: number; total: number }[];
  weakestTopics: { topicId: string; title: string; successRate: number; total: number }[];
}

export interface Suggestions {
  weakTopics: { id: string; title: string; slug: string; unitId: string }[];
  recommendedDifficulty: Difficulty;
  suggestedQuestions: Question[];
  dailyGoal: { target: number; completed: number; remaining: number };
}
