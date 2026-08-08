import Image from "next/image";
import { TopicImage } from "@/types/curriculum";

export function ImageGallery({ images }: { images: TopicImage[] }) {
  if (images.length === 0) return null;

  return (
    <div>
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <span>🖼️</span> Görseller
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img) => (
          <figure key={img.id} className="overflow-hidden rounded-card border border-lab-paperLine dark:border-white/10">
            <div className="relative aspect-video bg-lab-paperLine/40 dark:bg-white/5">
              <Image
                src={img.url.startsWith("http") ? img.url : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${img.url}`}
                alt={img.caption ?? "Konu görseli"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            {img.caption && (
              <figcaption className="p-2 text-xs text-lab-inkMuted dark:text-lab-paper/60">{img.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
