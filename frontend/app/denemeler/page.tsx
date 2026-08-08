import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { apiFetch } from "@/lib/api";
import { Exam } from "@/types/questions";

export const metadata = { title: "Denemeler" };

const TYPE_LABELS: Record<string, string> = {
  TOPIC: "Konu Denemesi",
  UNIT: "Ünite Denemesi",
  GENERAL: "Genel Deneme",
  LGS: "LGS Tarzı Deneme",
};

export default async function ExamsPage() {
  let exams: Exam[] = [];
  try {
    const res = await apiFetch<Exam[]>("/denemeler");
    exams = res.data ?? [];
  } catch {
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
          <EmptyPanelState
            title="Henüz yayınlanmış deneme yok"
            description="Denemeler yönetim panelinden eklendikçe burada listelenecek."
          />
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
                    {TYPE_LABELS[exam.type]}
                  </span>
                  <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">
                    {exam.classLevel}. Sınıf · {exam.durationMin} dk
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{exam.title}</h3>
                {exam.description && (
                  <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">{exam.description}</p>
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
