import { Hero } from "@/components/home/Hero";
import { DailyQuestion } from "@/components/home/DailyQuestion";
import { DailyFact } from "@/components/home/DailyFact";
import { ClassesSection } from "@/components/home/ClassesSection";
import { RecentAdditions } from "@/components/home/RecentAdditions";
import { PopularTopics } from "@/components/home/PopularTopics";
import { StatsSection } from "@/components/home/StatsSection";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
        <DailyQuestion />
        <DailyFact />
      </section>

      <ClassesSection />
      <RecentAdditions />
      <PopularTopics />
      <StatsSection />
    </>
  );
}
