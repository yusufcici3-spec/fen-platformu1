"use client";

import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { PracticeSession } from "@/components/questions/PracticeSession";

export default function PracticePage() {
  const params = useSearchParams();
  const topicId = params.get("topicId") ?? undefined;
  const unitId = params.get("unitId") ?? undefined;
  const classLevel = params.get("classLevel") ? Number(params.get("classLevel")) : undefined;
  const title = params.get("title") ?? "Soru Çöz";

  return (
    <>
      <PageHeader eyebrow="Pratik Modu" title={title} description="Soruları tek tek çöz, anında geri bildirim al." />
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <PracticeSession scope={{ topicId, unitId, classLevel, title }} />
      </section>
    </>
  );
}
