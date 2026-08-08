"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { TopicDetail } from "@/types/curriculum";
import { TopicGeneralTab } from "@/components/admin/curriculum/TopicGeneralTab";
import { TopicContentTab } from "@/components/admin/curriculum/TopicContentTab";
import { TopicOutcomesTab } from "@/components/admin/curriculum/TopicOutcomesTab";
import { TopicGlossaryTab } from "@/components/admin/curriculum/TopicGlossaryTab";
import { TopicExperimentsTab } from "@/components/admin/curriculum/TopicExperimentsTab";
import { TopicMediaTab } from "@/components/admin/curriculum/TopicMediaTab";
import { TopicPreviewTab } from "@/components/admin/curriculum/TopicPreviewTab";

const TABS = [
  { key: "genel", label: "Genel" },
  { key: "icerik", label: "İçerik" },
  { key: "kazanimlar", label: "Kazanımlar" },
  { key: "kavramlar", label: "Kavramlar" },
  { key: "deneyler", label: "Deneyler" },
  { key: "medya", label: "Medya" },
  { key: "onizleme", label: "Önizleme" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function TopicEditorPage({ params }: { params: { topicId: string } }) {
  return (
    <CurriculumShell title="Konu Düzenle">
      <TopicEditorContent topicId={params.topicId} />
    </CurriculumShell>
  );
}

function TopicEditorContent({ topicId }: { topicId: string }) {
  const { accessToken } = useAuth();
  const [topic, setTopic] = useState<TopicDetail | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("genel");
  const [isLoading, setIsLoading] = useState(true);

  const loadTopic = useCallback(async () => {
    if (!accessToken) return;
    try {
      const res = await apiFetch<TopicDetail>(`/konular/yonetim/${topicId}`, { token: accessToken });
      setTopic(res.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, topicId]);

  useEffect(() => {
    loadTopic();
  }, [loadTopic]);

  if (isLoading) {
    return <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Yükleniyor...</p>;
  }

  if (!topic) {
    return <p className="text-sm text-reaction-dark">Konu bulunamadı.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <Link href="/yonetici/konular" className="text-sm font-semibold text-beaker hover:underline">
            ← Konu Listesine Dön
          </Link>
          <h2 className="mt-1 font-display text-xl font-bold">{topic.title}</h2>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            topic.isPublished ? "bg-leaf/10 text-leaf" : "bg-reaction/10 text-reaction-dark"
          }`}
        >
          {topic.isPublished ? "Yayında" : "Taslak"}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-1 border-b border-lab-paperLine/70 dark:border-white/10">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-t-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.key
                ? "border-b-2 border-beaker text-beaker-dark dark:text-beaker-light"
                : "text-lab-inkMuted hover:text-beaker dark:text-lab-paper/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "genel" && <TopicGeneralTab topic={topic} onSaved={loadTopic} />}
        {activeTab === "icerik" && (
          <TopicContentTab topicId={topic.id} contents={topic.contents} onChanged={loadTopic} />
        )}
        {activeTab === "kazanimlar" && (
          <TopicOutcomesTab topicId={topic.id} outcomes={topic.learningOutcomes} onChanged={loadTopic} />
        )}
        {activeTab === "kavramlar" && (
          <TopicGlossaryTab topicId={topic.id} terms={topic.glossaryTerms} onChanged={loadTopic} />
        )}
        {activeTab === "deneyler" && (
          <TopicExperimentsTab topicId={topic.id} experiments={topic.experiments} onChanged={loadTopic} />
        )}
        {activeTab === "medya" && (
          <TopicMediaTab
            topicId={topic.id}
            images={topic.images}
            videos={topic.videos}
            pdfs={topic.pdfs}
            onChanged={loadTopic}
          />
        )}
        {activeTab === "onizleme" && <TopicPreviewTab topic={topic} />}
      </div>
    </div>
  );
}
