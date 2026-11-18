"use client";

import { useEffect, useState } from "react";

export interface LightboxImage {
  id: string;
  src: string;
  alt: string;
  caption: string | null;
}

export function ImageLightboxGrid({ images }: { images: LightboxImage[] }) {
  const [open, setOpen] = useState<LightboxImage | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setOpen(img)}
            className="group overflow-hidden rounded-2xl border border-lab-paperLine text-left dark:border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} loading="lazy" className="aspect-video w-full bg-lab-paperLine/40 object-cover transition group-hover:scale-105" />
            {img.caption && <p className="p-2 text-xs text-lab-inkMuted dark:text-lab-paper/60">{img.caption}</p>}
          </button>
        ))}
      </div>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Kapat"
            onClick={() => setOpen(null)}
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white"
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={open.src} alt={open.alt} className="max-h-full max-w-full rounded-lg bg-white object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
