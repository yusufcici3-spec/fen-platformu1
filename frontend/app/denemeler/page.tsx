import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { apiFetch } from "@/lib/api";
import { Exam } from "@/types/questions";

export const metadata = { title: "Denemeler" };

const TYPE_LABELS: Record<string, string> = {
  TOPIC: "Konu Denemesi",
  UNIT: "Ünite Denemesi",
  GENERAL: "Genel Deneme",
  LGS: "LGS Tarzı Deneme",
};

function isExam(value: unknown): value is Exam {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Exam>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.type === "string" &&
    typeof item.classLevel === "number" &&
    typeof item.durationMin === "number"
  );
}

function getExamList(value: unknown): Exam[] {
  if (Array.isArray(value)) return value.filter(isExam);

  // Bazı backend sürümleri listeyi { items: [...] } veya { exams: [...] }
  // şeklinde döndürebilir. Bu iki biçimi de güvenle destekle.
  if (value && typeof value === "object") {
    const record = value as { items?: unknown; exams?: unknown };
    if (Array.isArray(record.items)) return record.items.filter(isExam);
    if (Array.isArray(record.exams)) return record.exams.filter(isExam);
  }

  return [];
}

function EmptyExamsState() {
  return (
    <div className="rounded-card border border-dashed border-lab-paperLine bg-white p-8 text-center dark:border-white/10 dark:bg-lab-inkSoft">
      <h2 className="font-display text-lg font-semibold">
        Henüz yayınlanmış deneme yok
      </h2>
      <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Denemeler yönetim panelinden eklendikçe burada listelenecek.
      </p>
    </div>
  );
}

export default async function ExamsPage() {
  let exams: Exam[] = [];

  try {
    const response = await apiFetch<unknown>("/denemeler");
    exams = getExamList(response?.data);
  } catch {
    // API geçici olarak ulaşılamıyorsa sayfa çökmek yerine güvenli boş durum gösterir.
    exams = [];
  }

  return (
    <>
      <PageHeader
        eyebrow="Denemeler"
        title="Deneme Sınavları"
        description="Konu, ünite, genel veya LGS tarzı denemelerle bilgini ölç."
      />

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        {exams.length === 0 ? (
          <EmptyExamsState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {exams.map((exam) => (
              <Link
                key={exam.id}
                href={`/denemeler/${exam.id}`}
                className="rounded-card border border-lab-paperLine bg-white p-5 transition hover:border-beaker hover:shadow-md dark:border-white/10 dark:bg-lab-inkSoft"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-beaker/10 px-2.5 py-1 text-xs font-semibold text-beaker-dark dark:text-beaker-light">
                    {TYPE_LABELS[exam.type] ?? "Deneme Sınavı"}
                  </span>
                  <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">
                    {exam.classLevel}. Sınıf · {exam.durationMin} dk
                  </span>
                </div>

                <h3 className="mt-2 font-display text-lg font-semibold">
                  {exam.title}
                </h3>

                {exam.description && (
                  <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">
                    {exam.description}
                  </p>
                )}

                <span className="mt-3 inline-block text-sm font-semibold text-beaker">
                  {exam._count?.examQuestions ?? 0} soru →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
