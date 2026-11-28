import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { KONU_TARAMA_EXAMS } from "@/lib/staticExams";

export const metadata = { title: "Konu Tarama Testleri" };

const KONU_TARAMA_TOPICS = Array.from(new Set(KONU_TARAMA_EXAMS.map((e) => e.topic ?? "Diğer")));

export default function KonuTaramaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Konu Tarama"
        title="Konu Tarama Testleri"
        description="Konu konu hazırlanmış, görselli ve yorum gerektiren kısa testler. Giriş yapmadan çözebilirsin."
      />
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          {KONU_TARAMA_TOPICS.map((topic) => (
            <div key={topic} className="mt-6">
              <h3 className="font-display text-lg font-semibold text-beaker-dark dark:text-beaker-light">{topic}</h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {KONU_TARAMA_EXAMS.filter((e) => (e.topic ?? "Diğer") === topic).map((exam) => (
                  <Link
                    key={exam.id}
                    href={`/konu-tarama/${exam.slug}`}
                    className="rounded-card border border-leaf/40 bg-leaf/5 p-5 transition hover:border-leaf hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-leaf px-2.5 py-1 text-xs font-semibold text-white">Konu Tarama</span>
                      <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">
                        {exam.classLevel}. Sınıf · {exam.durationMin} dk
                      </span>
                    </div>
                    <h4 className="mt-2 font-display text-lg font-semibold">{exam.title}</h4>
                    <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">{exam.description}</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-leaf">{exam.questions.length} soru →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </section>
    </>
  );
}
