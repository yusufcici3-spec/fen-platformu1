import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { apiFetch } from "@/lib/api";
import { LabExperiment } from "@/types/games";

export const metadata = { title: "Sanal Laboratuvar" };

export default async function LabPage() {
  let experiments: LabExperiment[] = [];
  try {
    const res = await apiFetch<LabExperiment[]>("/deney-laboratuvari");
    experiments = res.data ?? [];
  } catch {
    experiments = [];
  }

  const grouped = [5, 6, 7, 8].map((level) => ({
    level,
    items: experiments.filter((e) => e.classLevel === level),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Sanal Laboratuvar"
        title="Güvenle Deney Yap"
        description="Etkileşimli simülasyonlarla, gerçek malzemelere ihtiyaç duymadan fen deneyleri yap."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {experiments.length === 0 ? (
          <EmptyPanelState
            title="Henüz deney eklenmedi"
            description="Deneyler yönetim panelinden eklendikçe burada listelenecek."
          />
        ) : (
          <div className="space-y-10">
            {grouped
              .filter((g) => g.items.length > 0)
              .map((group) => (
                <div key={group.level}>
                  <h2 className="font-display text-lg font-semibold">{group.level}. Sınıf Deneyleri</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((exp) => (
                      <Link
                        key={exp.id}
                        href={`/laboratuvar/${exp.slug}`}
                        className="rounded-card border border-lab-paperLine bg-white p-5 transition hover:-translate-y-1 hover:border-beaker hover:shadow-md dark:border-white/10 dark:bg-lab-inkSoft"
                      >
                        <span className="text-2xl">🧪</span>
                        <h3 className="mt-2 font-display text-base font-semibold">{exp.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">{exp.purpose}</p>
                        <span className="mt-3 inline-block text-sm font-semibold text-beaker">Deneyi Başlat →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </>
  );
}
