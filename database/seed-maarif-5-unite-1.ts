/**
 * 5. sınıf 1. ünite (Türkiye Yüzyılı Maarif Modeli): "Gökyüzündeki Komşularımız ve Biz"
 * ünitesini, konularını, kazanımlarını, anlatım bloklarını, kavramlarını, etkinliklerini ve
 * sorularını veritabanına ekler. Tekrar çalıştırmak güvenlidir (var olanı çoğaltmaz).
 *
 * İçerik kaynağı: frontend/content/maarif/5-unite-1.json (sitedeki statik sayfalarla aynı dosya).
 * Çalıştırmak için: cd backend && npm run db:seed:maarif5
 */
import fs from "fs";
import path from "path";
import { PrismaClient, QuestionType, Difficulty, RoleName } from "../backend/src/generated/prisma";

const prisma = new PrismaClient();

type Quiz = { body: string; options: string[]; answer: number; explanation: string; difficulty: "EASY" | "MEDIUM" | "HARD" };
type Topic = {
  slug: string;
  title: string;
  summary: string;
  outcome: { code: string; description: string };
  sections: { type: "EXPLANATION" | "IMPORTANT_INFO" | "DAILY_LIFE"; title: string; bodyHtml: string }[];
  glossary: { term: string; definition: string }[];
  activity: { title: string; materials: string; steps: string; safetyNotes: string };
  quiz: Quiz[];
};
type Unit = { classLevel: number; code: string; title: string; slug: string; description: string; topics: Topic[] };

async function main() {
  const file = path.join(__dirname, "../frontend/content/maarif/5-unite-1.json");
  const unit: Unit = JSON.parse(fs.readFileSync(file, "utf8"));

  const classItem = await prisma.class.upsert({
    where: { level: unit.classLevel },
    update: {},
    create: { level: unit.classLevel, name: `${unit.classLevel}. Sınıf`, slug: `${unit.classLevel}-sinif` },
  });

  // İçeriğin yazarı: ilk yönetici ya da öğretmen hesabı (yoksa boş bırakılır).
  const author = await prisma.user.findFirst({
    where: { role: { name: { in: [RoleName.ADMIN, RoleName.TEACHER] } } },
    orderBy: { createdAt: "asc" },
  });
  const authorId = author?.id ?? null;

  const unitCount = await prisma.unit.count({ where: { classId: classItem.id } });
  const dbUnit = await prisma.unit.upsert({
    where: { classId_slug: { classId: classItem.id, slug: unit.slug } },
    update: { code: unit.code, title: unit.title, description: unit.description },
    create: {
      classId: classItem.id,
      code: unit.code,
      title: unit.title,
      slug: unit.slug,
      description: unit.description,
      order: unitCount,
    },
  });

  for (let ti = 0; ti < unit.topics.length; ti++) {
    const t = unit.topics[ti];
    const topic = await prisma.topic.upsert({
      where: { unitId_slug: { unitId: dbUnit.id, slug: t.slug } },
      update: { title: t.title, summary: t.summary, isPublished: true },
      create: { unitId: dbUnit.id, title: t.title, slug: t.slug, summary: t.summary, order: ti, isPublished: true, authorId },
    });

    // Kazanım
    let outcome = await prisma.learningOutcome.findFirst({ where: { topicId: topic.id, code: t.outcome.code } });
    if (!outcome) {
      outcome = await prisma.learningOutcome.create({
        data: { topicId: topic.id, code: t.outcome.code, description: t.outcome.description, order: 0 },
      });
    }

    // Anlatım blokları (yalnızca konuda hiç blok yoksa; panelden yapılan düzenlemeler ezilmez)
    const hasContent = await prisma.topicContent.findFirst({ where: { topicId: topic.id } });
    if (!hasContent) {
      for (let i = 0; i < t.sections.length; i++) {
        const s = t.sections[i];
        await prisma.topicContent.create({
          data: { topicId: topic.id, type: s.type, title: s.title, bodyHtml: s.bodyHtml, order: i },
        });
      }
    }

    // Kavramlar
    for (let i = 0; i < t.glossary.length; i++) {
      const g = t.glossary[i];
      const exists = await prisma.glossaryTerm.findFirst({ where: { topicId: topic.id, term: g.term } });
      if (!exists) {
        await prisma.glossaryTerm.create({ data: { topicId: topic.id, term: g.term, definition: g.definition, order: i } });
      }
    }

    // Etkinlik
    const hasActivity = await prisma.experiment.findFirst({ where: { topicId: topic.id, title: t.activity.title } });
    if (!hasActivity) {
      await prisma.experiment.create({
        data: {
          topicId: topic.id,
          title: t.activity.title,
          materials: t.activity.materials,
          steps: t.activity.steps,
          safetyNotes: t.activity.safetyNotes,
          order: 0,
        },
      });
    }

    // Sorular
    for (const q of t.quiz) {
      const exists = await prisma.question.findFirst({ where: { topicId: topic.id, body: q.body } });
      if (exists) continue;
      const correctText = q.options[q.answer];
      await prisma.question.create({
        data: {
          type: QuestionType.MULTIPLE_CHOICE,
          body: q.body,
          correctAnswer: correctText,
          explanation: q.explanation,
          difficulty: Difficulty[q.difficulty],
          points: 10,
          estimatedTimeSec: 60,
          topicId: topic.id,
          learningOutcomeId: outcome.id,
          authorId,
          choiceOptions: {
            create: q.options.map((text, i) => ({ text, isCorrect: i === q.answer, order: i })),
          },
          solution: { create: { explanationHtml: `<p>${q.explanation}</p>` } },
        },
      });
    }

    console.log(`✔ ${t.title}`);
  }
  console.log("✅ 5. sınıf 1. ünite (Maarif Modeli) eklendi.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
