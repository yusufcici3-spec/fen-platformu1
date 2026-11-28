import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { StaticExamRunner } from "@/components/exam/StaticExamRunner";
import { KONU_TARAMA_EXAMS } from "@/lib/staticExams";

const find = (slug: string) => KONU_TARAMA_EXAMS.find((e) => e.slug === slug);

export function generateStaticParams() {
  return KONU_TARAMA_EXAMS.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const exam = find(params.slug);
  return { title: exam ? exam.title : "Konu Tarama Testi", description: exam?.description };
}

export default function KonuTaramaTestPage({ params }: { params: { slug: string } }) {
  const exam = find(params.slug);
  if (!exam) notFound();
  return (
    <>
      <PageHeader
        eyebrow={`${exam.classLevel}. Sınıf · Konu Tarama Testi`}
        title={exam.title}
        description={exam.description}
      />
      <StaticExamRunner exam={exam} />
    </>
  );
}
