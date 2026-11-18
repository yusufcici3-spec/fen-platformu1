import { apiFetch } from "@/lib/api";
import { ImageLightboxGrid } from "./ImageLightboxGrid";
import { decodeStoredHtml } from "@/lib/renderHtml";
import { TopicDetail, TopicSummary } from "@/types/curriculum";

function imgUrl(url: string) {
  return url.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? ""}${url}`;
}

/** Ünitedeki konulara yüklenmiş görselleri tek bir yerde toplar. */
export async function UnitTopicImages({ unitSlug, topics }: { unitSlug: string; topics: TopicSummary[] }) {
  const groups = await Promise.all(
    topics.map(async (t) => {
      let imgs: { id: string; url: string; caption: string | null }[] = [];
      try {
        const res = await apiFetch<TopicDetail>(`/konular/${t.slug}?unitSlug=${encodeURIComponent(unitSlug)}`);
        const d = res.data;
        const seen = new Set<string>();
        const add = (url: string | null | undefined, caption: string | null) => {
          if (!url || seen.has(url)) return;
          seen.add(url);
          imgs.push({ id: `${t.id}-${imgs.length}`, url, caption });
        };
        const scan = (html: string | null | undefined) => {
          if (!html) return;
          const re = /<img\b[^>]*?\bsrc=["']([^"']+)["'][^>]*>/gi;
          let m: RegExpExecArray | null;
          const text = decodeStoredHtml(html);
          while ((m = re.exec(text))) {
            const alt = /\balt=["']([^"']*)["']/i.exec(m[0]);
            add(m[1].replace(/&amp;/g, "&"), alt?.[1] || null);
          }
        };
        (d?.contents ?? []).forEach((b) => scan(b.bodyHtml));
        scan(d?.content);
        (d?.images ?? []).forEach((i) => add(imgUrl(i.url), i.caption));
      } catch {
        imgs = [];
      }
      return { topic: t, imgs };
    })
  );
  const withImgs = groups.filter((g) => g.imgs.length > 0);

  return (
    <section id="konu-icerigi-resimleri" className="mt-10 rounded-3xl border border-lab-paperLine bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-7">
      <h2 className="font-display text-2xl font-bold">🖼️ Konu içeriği resimleri</h2>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/70">Bu üniteye eklenen konu görselleri. Büyütmek için resme dokun.</p>
      {withImgs.length === 0 ? (
        <p className="mt-4 rounded-2xl bg-beaker/5 p-4 text-sm">Henüz bu konuya görsel eklenmemiş. Görseller yönetim panelinden eklendikçe burada listelenir.</p>
      ) : (
        withImgs.map(({ topic, imgs }) => (
          <div key={topic.id} className="mt-5">
            <h3 className="font-semibold">{topic.title}</h3>
            <ImageLightboxGrid images={imgs.map((i) => ({ id: i.id, src: i.url, alt: i.caption ?? topic.title, caption: i.caption }))} />
          </div>
        ))
      )}
    </section>
  );
}
