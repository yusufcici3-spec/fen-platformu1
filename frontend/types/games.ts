// ============================================================================
// AŞAMA 4: Oyunlar, sanal laboratuvar, görevler ve liderlik tablosu tipleri
// ============================================================================

export type GameType =
  | "QUIZ"
  | "MATCHING"
  | "MEMORY"
  | "WORD_SEARCH"
  | "HANGMAN"
  | "DRAG_DROP"
  | "TRUE_FALSE_MARATHON"
  | "WHEEL_OF_FORTUNE"
  | "SCIENCE_ADVENTURE"
  | "BADGE_HUNT";

export interface GameLevel {
  id: string;
  levelNumber: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  timeLimitSec: number | null;
  minScoreToUnlock: number;
  order: number;
}

export interface GlossaryTermRef {
  id: string;
  term: string;
  definition: string;
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  instructions: string | null;
  type: GameType;
  classLevel: number | null;
  thumbnail: string | null;
  hasSound: boolean;
  isPublished: boolean;
  config: Record<string, unknown> | null;
  topicId: string | null;
  topic?: { title: string; slug: string; glossaryTerms?: GlossaryTermRef[] } | null;
  levels: GameLevel[];
}

export interface GameScoreRecord {
  id: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  durationSec: number | null;
  playedAt: string;
  game?: { title: string; type: GameType; slug: string };
}

export interface Badge {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  earned?: boolean;
}

export interface Achievement {
  id: string;
  badge: Badge;
  game?: { title: string; slug: string } | null;
  earnedAt: string;
  source: string;
}

export interface Simulation {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  componentKey: string;
  thumbnail: string | null;
  classLevel: number | null;
  isPublished: boolean;
  order: number;
  _count?: { labExperiments: number };
}

export interface LabExperiment {
  id: string;
  slug: string;
  title: string;
  purpose: string;
  materials: string;
  steps: string;
  resultExplanation: string;
  safetyWarnings: string;
  classLevel: number;
  isPublished: boolean;
  order: number;
  simulationId: string | null;
  simulation?: Simulation | null;
  topicId: string | null;
  topic?: { title: string; slug: string } | null;
}

export interface LabExperimentAttempt {
  id: string;
  completedAt: string;
  notes: string | null;
  labExperiment: { title: string; slug: string; classLevel: number };
}

export type DailyChallengeType = "SOLVE_QUESTIONS" | "COMPLETE_TOPIC" | "DO_EXPERIMENT" | "FINISH_GAME";

export interface DailyChallenge {
  id: string;
  date: string;
  type: DailyChallengeType;
  targetCount: number;
  currentCount: number;
  rewardPoints: number;
  isCompleted: boolean;
  completedAt: string | null;
  label: string;
  icon: string;
}

export interface WeeklyChallenge {
  id: string;
  weekStart: string;
  weekEnd: string;
  classLevel: number;
  title: string;
  description: string | null;
  isFinalized: boolean;
  winnerUserId: string | null;
  winnerScore: number | null;
}

export interface LeaderboardEntryView {
  rank: number;
  user?: { id: string; firstName: string; lastName: string; classLevel: number | null; avatarUrl: string | null };
  name?: string;
  userId?: string;
  totalScore: number;
}
