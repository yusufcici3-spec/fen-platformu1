import { StaticUnitView } from "@/components/topic/StaticUnitView";
import { getStaticUnit } from "@/lib/maarifContent";

const LEVEL = 5;
const UNIT_SLUG = "canlilarin-yapisina-yolculuk";

export function generateMetadata() {
  const unit = getStaticUnit(LEVEL, UNIT_SLUG);
  return {
    title: `${LEVEL}. Sınıf · ${unit?.title ?? "Ünite"}`,
    description: unit?.description,
  };
}

export default function Page() {
  return <StaticUnitView level={LEVEL} unitSlug={UNIT_SLUG} />;
}
