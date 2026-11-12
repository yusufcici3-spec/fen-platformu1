import UnitQuestionPage from "@/components/questions/UnitQuestionPage";

export default function Page({ params }: { params: { unitSlug: string } }) {
  return <UnitQuestionPage unitSlug={params.unitSlug} />;
}
