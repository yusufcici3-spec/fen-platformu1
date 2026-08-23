import { TopicContentBlock } from "@/types/curriculum";
import { decodeStoredHtml } from "@/lib/renderHtml";

const TYPE_META: Record<TopicContentBlock["type"], { label: string; icon: string; tone: string }> = {
  EXPLANATION: { label: "Konu Anlatımı", icon: "📖", tone: "border-beaker/30 bg-beaker/5" },
  IMPORTANT_INFO: { label: "Önemli Bilgiler", icon: "⭐", tone: "border-reaction/30 bg-reaction/5" },
  DAILY_LIFE: { label: "Günlük Yaşamdan Örnekler", icon: "🏠", tone: "border-leaf/30 bg-leaf/5" },
};

// NOT: bodyHtml yalnızca ADMIN/TEACHER rolündeki kullanıcıların yönetim
// panelindeki zengin metin editöründen oluşturulur (güvenilir içerik).
export function ContentBlock({ block }: { block: TopicContentBlock }) {
  const meta = TYPE_META[block.type];

  return (
    <div className={`rounded-card border p-6 ${meta.tone}`}>
      <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-lab-inkMuted dark:text-lab-paper/60">
        <span>{meta.icon}</span>
        {block.title || meta.label}
      </div>
      <div
        className="prose prose-sm mt-3 max-w-none text-lab-ink dark:prose-invert dark:text-lab-paper/90"
        dangerouslySetInnerHTML={{ __html: decodeStoredHtml(block.bodyHtml) }}
      />
    </div>
  );
}
