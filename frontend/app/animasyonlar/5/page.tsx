import AnimationDirectory from "@/components/animations/AnimationDirectory";
import { ANIMATIONS_5 as items } from "@/content/animations";

export const metadata = { title: "5. Sınıf Animasyonları | Fen Bilimleri" };


export default function FifthGradeAnimationsPage() {
  return <AnimationDirectory grade={5} items={items} />;
}
