import AnimationDirectory from "@/components/animations/AnimationDirectory";
import { ANIMATIONS_7 as items } from "@/content/animations";

export const metadata = { title: "7. Sınıf Animasyonları | Fen Bilimleri" };


export default function SeventhGradeAnimationsPage() {
  return <AnimationDirectory grade={7} items={items} />;
}
