import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Fen Bilimleri Blogu"
        description="Merak uyandıran fen bilimleri yazıları ve haberler yakında burada."
      />
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <EmptyPanelState
          title="Henüz blog yazısı yayınlanmadı"
          description="Blog içerikleri ilerleyen aşamada eklenecek."
        />
      </section>
    </>
  );
}
