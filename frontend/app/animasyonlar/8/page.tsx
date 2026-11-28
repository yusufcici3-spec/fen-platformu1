import AnimationDirectory from "@/components/animations/AnimationDirectory";
import { ANIMATIONS_8 as items } from "@/content/animations";

export const metadata = { title: "8. Sınıf Animasyonları | Fen Bilimleri" };


export default function EighthGradeAnimationsPage() {
  return <AnimationDirectory grade={8} items={items} />;
}
