import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { StaticExamRunner } from "@/components/exam/StaticExamRunner";
import { STATIC_EXAMS, getStaticExam } from "@/lib/staticExams";

export function generateStaticParams() {
  return STATIC_EXAMS.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const exam = getStaticExam(params.slug);
  return { title: exam ? exam.title : "Deneme", description: exam?.description };
}

export default function StaticExamPage({ params }: { params: { slug: string } }) {
  const exam = getStaticExam(params.slug);
  if (!exam) notFound();
  return (
    <>
      <PageHeader
        eyebrow={`${exam.classLevel}. Sınıf · Yeni Nesil Deneme`}
        title={exam.title}
        description={exam.description}
      />
      <StaticExamRunner exam={exam} />
    </>
  );
}
