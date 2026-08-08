import { Router } from "express";
import authRoutes from "./auth.routes";
import classRoutes from "./class.routes";
import topicRoutes from "./topic.routes";
import questionRoutes from "./question.routes";
import examRoutes from "./exam.routes";
import gameRoutes from "./game.routes";
import userRoutes from "./user.routes";
import announcementRoutes from "./announcement.routes";
import homeRoutes from "./home.routes";
import uploadRoutes from "./upload.routes";

// ---- Aşama 2: MEB müfredatı ve konu yönetim sistemi rotaları ----
import unitRoutes from "./unit.routes";
import learningOutcomeRoutes from "./learningOutcome.routes";
import topicContentRoutes from "./topicContent.routes";
import mediaRoutes from "./media.routes";
import experimentRoutes from "./experiment.routes";
import glossaryRoutes from "./glossary.routes";
import searchRoutes from "./search.routes";
import progressRoutes from "./progress.routes";

// ---- Aşama 3: soru bankası ve deneme sınavı sistemi rotaları ----
import examAttemptRoutes from "./examAttempt.routes";
import tagRoutes from "./tag.routes";
import categoryRoutes from "./category.routes";
import statsRoutes from "./stats.routes";
import suggestionRoutes from "./suggestion.routes";

// ---- Aşama 4: oyunlar, sanal laboratuvar, görevler, liderlik tablosu ----
import achievementRoutes from "./achievement.routes";
import simulationRoutes from "./simulation.routes";
import labExperimentRoutes from "./labExperiment.routes";
import dailyChallengeRoutes from "./dailyChallenge.routes";
import weeklyChallengeRoutes from "./weeklyChallenge.routes";
import leaderboardRoutes from "./leaderboard.routes";

// ---- Aşama 5: yapay zekâ destekli kişiselleştirilmiş öğrenme ----
import analysisRoutes from "./analysis.routes";
import studyPlanRoutes from "./studyPlan.routes";
import notificationRoutes from "./notification.routes";
import assignmentRoutes from "./assignment.routes";
import teacherNoteRoutes from "./teacherNote.routes";
import parentRoutes from "./parent.routes";
import assistantRoutes from "./assistant.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/siniflar", classRoutes);
router.use("/konular", topicRoutes);
router.use("/sorular", questionRoutes);
router.use("/denemeler", examRoutes);
router.use("/oyunlar", gameRoutes);
router.use("/kullanicilar", userRoutes);
router.use("/duyurular", announcementRoutes);
router.use("/anasayfa", homeRoutes);
router.use("/yukleme", uploadRoutes);

// ---- Aşama 2 ----
router.use("/uniteler", unitRoutes);
router.use("/kazanimlar", learningOutcomeRoutes);
router.use("/konu-icerikleri", topicContentRoutes);
router.use("/medya", mediaRoutes);
router.use("/deneyler", experimentRoutes);
router.use("/kavramlar", glossaryRoutes);
router.use("/arama", searchRoutes);
router.use("/ilerleme", progressRoutes);

// ---- Aşama 3 ----
router.use("/deneme-oturumlari", examAttemptRoutes);
router.use("/etiketler", tagRoutes);
router.use("/soru-kategorileri", categoryRoutes);
router.use("/istatistikler", statsRoutes);
router.use("/oneriler", suggestionRoutes);

// ---- Aşama 4 ----
router.use("/basarimlar", achievementRoutes);
router.use("/simulasyonlar", simulationRoutes);
router.use("/deney-laboratuvari", labExperimentRoutes);
router.use("/gorevler", dailyChallengeRoutes);
router.use("/haftalik-etkinlikler", weeklyChallengeRoutes);
router.use("/liderlik", leaderboardRoutes);

// ---- Aşama 5 ----
router.use("/analiz", analysisRoutes);
router.use("/calisma-plani", studyPlanRoutes);
router.use("/bildirimler", notificationRoutes);
router.use("/odevler", assignmentRoutes);
router.use("/ogretmen-notlari", teacherNoteRoutes);
router.use("/veli", parentRoutes);
router.use("/asistan", assistantRoutes);

export default router;
