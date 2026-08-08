"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { sfx } from "@/lib/sound";
import { Badge } from "@/types/games";
import { GameShell } from "./GameShell";

const HINTS: Record<string, string> = {
  "İlk Adım": "İlk sorunu doğru çöz.",
  "Fen Ustası": "5 konuyu tamamla veya bir oyunda 90+ puan al.",
  "Bilim Kâşifi": "15 konu tamamla veya 10 oyun oyna.",
  "Deney Uzmanı": "Sanal laboratuvarda 5 farklı deneyi tamamla.",
  "Soru Şampiyonu": "Toplamda 100 soru çöz.",
  "LGS Hazır": "3 LGS tarzı denemede %70 ve üzeri başarı göster.",
  "100 Günlük Seri": "100 gün boyunca kesintisiz platformda aktif ol.",
  "Haftanın Birincisi": "Haftalık etkinlikte sınıfının en yüksek puanını topla.",
}; 

/**
 * "Rozet Avı" — klasik bir mini oyundan çok, kazanılabilecek rozetleri
 * keşfetmeyi teşvik eden etkileşimli bir vitrin: kilitli rozetlere tıklayınca
 * nasıl kazanılacağı ipucu olarak açılır. Puanlama, açılan ipucu sayısına göre
 * semboliktir; gerçek ödül mekanizması diğer aktivitelerden (soru/oyun/deney)
 * gelir.
 */
export function BadgeHunt({ gameId }: { gameId: string }) {
  const { accessToken } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = accessToken ? "/basarimlar/durumum" : "/basarimlar";
    apiFetch<Badge[]>(url, { token: accessToken ?? undefined })
      .then((res) => setBadges(res.data ?? []))
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  function reveal(id: string) {
    if (revealedIds.has(id)) return;
    sfx.click();
    setRevealedIds((prev) => new Set(prev).add(id));
  }

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <GameShell title="Rozet Avı" score={earnedCount * 10}>
      <p className="mb-5 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Kazandığın rozetler renkli görünür. Kilitli bir rozete tıklayarak nasıl kazanılacağını keşfet!
        {accessToken ? ` Şu ana kadar ${earnedCount} / ${badges.length} rozet kazandın.` : " Rozet ilerlemeni görmek için giriş yap."}
      </p>

      {isLoading ? (
        <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {badges.map((badge) => {
            const isRevealed = revealedIds.has(badge.id) || badge.earned;
            return (
              <button
                key={badge.id}
                onClick={() => reveal(badge.id)}
                className={`flex flex-col items-center gap-2 rounded-card border p-4 text-center transition ${
                  badge.earned
                    ? "border-leaf bg-leaf/10"
                    : isRevealed
                    ? "border-beaker bg-beaker/5"
                    : "border-lab-paperLine bg-lab-paperLine/30 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                <span className={`text-4xl ${badge.earned ? "" : "grayscale"}`}>{badge.icon ?? "🏅"}</span>
                <span className="text-xs font-semibold">{badge.title}</span>
                {isRevealed ? (
                  <span className="text-[11px] text-lab-inkMuted dark:text-lab-paper/60">
                    {badge.earned ? "Kazanıldı! 🎉" : HINTS[badge.title] ?? badge.description}
                  </span>
                ) : (
                  <span className="text-[11px] text-lab-inkMuted dark:text-lab-paper/40">🔒 İpucu için tıkla</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </GameShell>
  );
}
