// ============================================================================
// AŞAMA 5: Yapay zekâ destekli kişiselleştirilmiş öğrenme ve analiz tipleri
// ============================================================================

export interface ChartPoint {
  date?: string;
  week?: string;
  month?: string;
  count: number;
}

export interface TopicRate {
  topicId: string;
  title: string;
  successRate: number;
  total: number;
}

export interface OutcomeRate {
  learningOutcomeId: string;
  description: string;
  successRate: number;
  total: number;
}

export interface AnalysisReport {
  totalAnswered: number;
  correctCount: number;
  wrongCount: number;
  successPercent: number;
  completedTopicsCount: number;
  totalStudyMinutes: number;
  avgSecondsPerQuestion: number;
  developmentScore: number;
  dailyChart: ChartPoint[];
  weeklyChart: ChartPoint[];
  monthlyChart: ChartPoint[];
  strongestTopics: TopicRate[];
  weakestTopics: TopicRate[];
  outcomeRates: OutcomeRate[];
  examPerformance: {
    totalExams: number;
    averageSuccess: number;
    recentResults: { examTitle: string; examType: string; successPercent: number; finishedAt: string | null }[];
  };
  gamePerformance: {
    totalGamesPlayed: number;
    averageScore: number;
    bestGame: { score: number; game?: { title: string } } | null;
  };
  outcomesTrackedCount: number;
}

export type StudyPlanItemType = "TOPIC_REVIEW" | "QUESTION_PRACTICE" | "EXAM" | "EXPERIMENT" | "GAME";

export interface StudyPlanItem {
  id: string;
  date: string;
  type: StudyPlanItemType;
  title: string;
  description: string | null;
  estimatedMinutes: number;
  isCompleted: boolean;
  completedAt: string | null;
  order: number;
  topicId: string | null;
  topic?: { title: string; slug: string; unitId: string; unit?: { slug: string; class?: { level: number } } } | null;
}

export interface WeeklyGoal {
  id: string;
  weekStart: string;
  targetQuestions: number;
  targetTopics: number;
  targetMinutes: number;
  achievedQuestions: number;
  achievedTopics: number;
  achievedMinutes: number;
}

export type NotificationType =
  | "DAILY_REMINDER"
  | "INCOMPLETE_TASK"
  | "NEW_EXAM"
  | "NEW_TOPIC"
  | "BADGE_EARNED"
  | "WEEKLY_SUMMARY"
  | "TEACHER_NOTE"
  | "ASSIGNMENT"
  | "ANNOUNCEMENT";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedUrl: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string | null;
  classLevel: number;
  dueDate: string;
  createdAt: string;
  topic?: { title: string; slug: string } | null;
  teacher?: { firstName: string; lastName: string };
  isCompleted?: boolean;
  _count?: { submissions: number };
}

export interface TeacherNote {
  id: string;
  note: string;
  createdAt: string;
  teacher?: { firstName: string; lastName: string };
}

export interface ChildSummary {
  id: string;
  firstName: string;
  lastName: string;
  classLevel: number | null;
  points: number;
  currentStreak: number;
}

export interface AssistantChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}
