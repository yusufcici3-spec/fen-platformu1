import AnimationDirectory from "@/components/animations/AnimationDirectory";
import { ANIMATIONS_6 as items } from "@/content/animations";

export const metadata = { title: "6. Sınıf Animasyonları | Fen Bilimleri" };


export default function SixthGradeAnimationsPage() {
  return <AnimationDirectory grade={6} items={items} />;
}
