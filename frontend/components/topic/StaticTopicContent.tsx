"use client";
import Link from "next/link";
import { useState } from "react";

export function StaticTopicContent({ level, unitSlug, unitTitle, topic }: { level:number; unitSlug:string; unitTitle:string; topic:any }) {
  const [answers,setAnswers]=useState<Record<number,number>>({});
  const [checked,setChecked]=useState(false);
  const score=topic.quiz.filter((q:any,i:number)=>answers[i]===q.answer).length;
  return <>
    <div className="grid-paper-bg border-b border-lab-paperLine/70 dark:border-white/10"><div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-lab-inkMuted dark:text-lab-paper/50"><Link href={`/sinif/${level}`}>{level}. Sınıf</Link><span>/</span><Link href={`/sinif/${level}/${unitSlug}`}>{unitTitle}</Link><span>/</span><span>{topic.title}</span></nav>
      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{topic.title}</h1><p className="mt-3 max-w-2xl text-lab-inkMuted dark:text-lab-paper/70">{topic.summary}</p>
    </div></div>
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      {topic.sections.map((section:any,i:number)=><article key={i} className="rounded-2xl border border-lab-paperLine bg-white p-5 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft sm:p-7"><h2 className="mb-4 text-xl font-bold">{section.title}</h2><div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{__html:section.bodyHtml}} /></article>)}
      <article className="rounded-2xl border border-beaker/20 bg-beaker/5 p-5 sm:p-7"><h2 className="text-xl font-bold">🧪 {topic.activity.title}</h2><p className="mt-3"><strong>Gerekli malzemeler:</strong> {topic.activity.materials}</p><p className="mt-2"><strong>Uygulama:</strong> {topic.activity.steps}</p><p className="mt-2 text-sm"><strong>Güvenlik:</strong> {topic.activity.safetyNotes}</p></article>
      {topic.outcome?.details?.length>0&&<article className="rounded-2xl border border-lab-paperLine p-5"><h2 className="font-bold">Bu konuda öğreneceklerin</h2><ul className="mt-3 list-disc space-y-2 pl-5">{topic.outcome.details.map((d:string,i:number)=><li key={i}>{d}</li>)}</ul></article>}
      <article className="rounded-2xl border border-lab-paperLine p-5 dark:border-white/10"><h2 className="text-xl font-bold">📝 Mini test</h2><p className="mt-1 text-sm text-lab-inkMuted">Soruları cevapla ve sonucunu kontrol et.</p>
      {topic.quiz.map((q:any,i:number)=><div key={i} className="my-5 rounded-xl bg-lab-paperLine/20 p-4"><p className="font-semibold">{i+1}. {q.body}</p><div className="mt-3 space-y-2">{q.options.map((o:string,j:number)=><label key={j} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${checked&&j===q.answer?"border-green-500 bg-green-50":checked&&answers[i]===j?"border-red-400 bg-red-50":"border-lab-paperLine bg-white dark:bg-lab-inkSoft"}`}><input type="radio" name={`q${i}`} checked={answers[i]===j} onChange={()=>{setAnswers(old=>({...old,[i]:j}));setChecked(false)}}/>{o}</label>)}</div>{checked&&<p className="mt-3 text-sm text-beaker-dark">{q.explanation}</p>}</div>)}
      <button onClick={()=>setChecked(true)} className="rounded-full bg-beaker px-5 py-3 text-sm font-bold text-white">Cevaplarımı kontrol et</button>{checked&&<p className="mt-4 font-bold">Sonuç: {score}/{topic.quiz.length}</p>}</article>
      <Link href={`/sinif/${level}/${unitSlug}`} className="inline-flex rounded-full border border-beaker px-5 py-3 text-sm font-semibold text-beaker-dark">← {unitTitle} konularına dön</Link>
    </section>
  </>;
}
