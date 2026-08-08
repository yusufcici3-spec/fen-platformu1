import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { apiFetch } from "@/lib/api";

export const metadata = { title: "Duyurular" };

interface Announcement {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  classLevel: number | null;
  createdAt: string;
}

export default async function AnnouncementsPage() {
  let announcements: Announcement[] = [];
  try {
    const res = await apiFetch<Announcement[]>("/duyurular");
    announcements = res.data ?? [];
  } catch {
    announcements = [];
  }

  return (
    <>
      <PageHeader eyebrow="Duyurular" title="Platform Duyuruları" description="Güncel duyuruları buradan takip edebilirsin." />
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        {announcements.length === 0 ? (
          <EmptyPanelState title="Henüz duyuru yok" description="Yeni duyurular eklendikçe burada listelenecek." />
        ) : (
          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft">
                <div className="flex items-center gap-2">
                  {a.isPinned && <span>📌</span>}
                  <h2 className="font-display text-lg font-semibold">{a.title}</h2>
                </div>
                <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">{a.content}</p>
                <p className="mt-2 text-xs text-lab-inkMuted dark:text-lab-paper/40">
                  {new Date(a.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
