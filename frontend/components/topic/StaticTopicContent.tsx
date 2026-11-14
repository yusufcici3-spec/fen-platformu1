"use client";
import Link from "next/link";
import { useState } from "react";
import { StaticQuiz } from "@/components/topic/StaticQuiz";

export function StaticTopicContent({ level, unitSlug, unitTitle, topic }: { level:number; unitSlug:string; unitTitle:string; topic:any }) {
  const [showQuestions,setShowQuestions]=useState(false);
  return <>
    <div className="grid-paper-bg border-b border-lab-paperLine/70 dark:border-white/10"><div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-lab-inkMuted dark:text-lab-paper/50"><Link href={`/sinif/${level}`}>{level}. Sınıf</Link><span>/</span><Link href={`/sinif/${level}/${unitSlug}`}>{unitTitle}</Link><span>/</span><span>{topic.title}</span></nav>
      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{topic.title}</h1><p className="mt-3 max-w-2xl text-lab-inkMuted dark:text-lab-paper/70">{topic.summary}</p>
    </div></div>
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      {topic.sections.map((section:any,i:number)=><article key={i} className="rounded-2xl border border-lab-paperLine bg-white p-5 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft sm:p-7"><h2 className="mb-4 text-xl font-bold">{section.title}</h2><div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{__html:section.bodyHtml}} /></article>)}
      <article className="rounded-2xl border border-beaker/20 bg-beaker/5 p-5 sm:p-7"><h2 className="text-xl font-bold">🧪 {topic.activity.title}</h2><p className="mt-3"><strong>Gerekli malzemeler:</strong> {topic.activity.materials}</p><p className="mt-2"><strong>Uygulama:</strong> {topic.activity.steps}</p><p className="mt-2 text-sm"><strong>Güvenlik:</strong> {topic.activity.safetyNotes}</p></article>
      {topic.outcome?.details?.length>0&&<article className="rounded-2xl border border-lab-paperLine p-5"><h2 className="font-bold">Bu konuda öğreneceklerin</h2><ul className="mt-3 list-disc space-y-2 pl-5">{topic.outcome.details.map((d:string,i:number)=><li key={i}>{d}</li>)}</ul></article>}
      {level===6&&["isigin-yansimasi-ve-renkler","maddenin-ayirt-edici-ozellikleri","elektrigin-iletimi-ve-direnc","surdurulebilir-yasam-ve-etkilesim"].includes(unitSlug)?<Link href={`/sinif/6/${unitSlug}/soru-coz`} className="fixed top-24 right-4 z-40 rounded-full bg-beaker px-5 py-3 text-sm font-bold text-white shadow-xl transition hover:scale-105 sm:top-28 sm:right-8">📝 30 Soru Çöz</Link>:<button type="button" onClick={()=>setShowQuestions(true)} className="fixed top-24 right-4 z-40 rounded-full bg-beaker px-5 py-3 text-sm font-bold text-white shadow-xl transition hover:scale-105 sm:top-28 sm:right-8">📝 Soru Çöz</button>}
      {showQuestions&&<div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={topic.title+" soru çöz"}><div className="mx-auto my-4 max-w-3xl rounded-2xl bg-white p-4 shadow-2xl dark:bg-lab-inkSoft sm:my-8 sm:p-7"><div className="mb-5 flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-beaker-dark">Konuya özel alıştırma</p><h2 className="text-xl font-bold">{topic.title} - Soru Çöz</h2></div><button type="button" onClick={()=>setShowQuestions(false)} aria-label="Soruları kapat" className="rounded-full border px-3 py-2 text-sm">✕ Kapat</button></div><StaticQuiz questions={topic.quiz}/></div></div>}
      <Link href={`/sinif/${level}/${unitSlug}`} className="inline-flex rounded-full border border-beaker px-5 py-3 text-sm font-semibold text-beaker-dark">← {unitTitle} konularına dön</Link>
    </section>
  </>;
}
