import TopicPage from "@/app/sinif/[level]/[unitSlug]/[topicSlug]/page";

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: { topicSlug: string } }) {
  return <TopicPage params={{ level: "8", unitSlug: "elektrik-yukleri-ve-elektrik-enerjisi", topicSlug: decodeURIComponent(params.topicSlug) }} />;
}
