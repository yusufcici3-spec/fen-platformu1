import { Hero } from "@/components/home/Hero";
import { DailyQuestion } from "@/components/home/DailyQuestion";
import { DailyFact } from "@/components/home/DailyFact";
import { DailyInspiration } from "@/components/home/DailyInspiration";
import { ClassesSection } from "@/components/home/ClassesSection";
import AnimationsSection from "@/components/home/AnimationsSection";
import { YazililarSection } from "@/components/home/YazililarSection";
import { RecentAdditions } from "@/components/home/RecentAdditions";
import { PopularTopics } from "@/components/home/PopularTopics";
import { StatsSection } from "@/components/home/StatsSection";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="gunun-icerikleri" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <DailyQuestion />
          <DailyFact />
        </div>
        <div className="mt-5">
          <DailyInspiration />
        </div>
      </section>

      <ClassesSection />
      <AnimationsSection />
      <YazililarSection />
      <RecentAdditions />
      <PopularTopics />
      <StatsSection />
    </>
  );
}
