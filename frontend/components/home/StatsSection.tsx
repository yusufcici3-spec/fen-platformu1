import { apiFetch } from "@/lib/api";

interface Stats {
  userCount: number;
  topicCount: number;
  questionCount: number;
  gameCount: number;
}

const LABELS: { key: keyof Stats; label: string; icon: string }[] = [
  { key: "userCount", label: "Kayıtlı Kullanıcı", icon: "👥" },
  { key: "topicCount", label: "Yayınlanan Konu", icon: "📘" },
  { key: "questionCount", label: "Soru Bankasında", icon: "❓" },
  { key: "gameCount", label: "Eğitsel Oyun", icon: "🎮" },
];

export async function StatsSection() {
  let stats: Stats = { userCount: 0, topicCount: 0, questionCount: 0, gameCount: 0 };

  try {
    const res = await apiFetch<Stats>("/anasayfa/istatistikler");
    if (res.data) stats = res.data;
  } catch {
    // Backend henüz ayakta değilse sıfır değerlerle devam et
  }

  return (
    <section className="border-y border-lab-paperLine/70 bg-lab-inkSoft py-16 text-lab-paper dark:border-white/10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {LABELS.map((item) => (
          <div key={item.key} className="text-center">
            <div className="text-3xl">{item.icon}</div>
            <div className="mt-2 font-mono text-3xl font-bold text-beaker-light">
              {stats[item.key].toLocaleString("tr-TR")}
            </div>
            <div className="mt-1 text-sm text-lab-paper/60">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
