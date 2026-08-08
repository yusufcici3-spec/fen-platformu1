import { TopicPdf } from "@/types/curriculum";

export function PdfList({ pdfs }: { pdfs: TopicPdf[] }) {
  if (pdfs.length === 0) return null;

  return (
    <div>
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <span>📄</span> PDF Konu Özeti
      </h2>
      <div className="mt-3 space-y-2">
        {pdfs.map((pdf) => (
          <a
            key={pdf.id}
            href={pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-card border border-lab-paperLine bg-white p-4 text-sm font-medium transition hover:border-beaker dark:border-white/10 dark:bg-lab-inkSoft"
          >
            <span className="text-xl">📄</span>
            {pdf.title}
            <span className="ml-auto text-xs text-beaker">İndir →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
