"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import mevsimler from "@/content/konu-sorulari/8-sinif-mevsimler-ve-iklim.json";
import dna from "@/content/konu-sorulari/8-sinif-dna-ve-genetik-kod.json";
import basinc from "@/content/konu-sorulari/8-sinif-basinc.json";
import madde from "@/content/konu-sorulari/8-sinif-madde-ve-endustri.json";
import basit from "@/content/konu-sorulari/8-sinif-basit-makineler.json";

type Question = { id: number; outcome: string; image?: string; imageAlt?: string; scenario: string; question: string; options: string[]; answer: number; explanation: string };
type Bank = { unit: number; title: string; slug: string; questions: Question[] };
const banks: Record<string, Bank> = {
  "mevsimler-ve-iklim": mevsimler as Bank,
  "dna-ve-genetik-kod": dna as Bank,
  basinc: basinc as Bank,
  "madde-ve-endustri": madde as Bank,
  "basit-makineler": basit as Bank,
};

export default function Grade8UnitQuizPage({ params }: { params: { unitSlug: string } }) {
  const bank = banks[decodeURIComponent(params.unitSlug)];
  const total = bank?.questions.length ?? 0;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(total).fill(null));
  const [finished, setFinished] = useState(false);
  const current = bank?.questions[index];
  const selected = answers[index];
  const score = useMemo(() => answers.reduce<number>((sum, a, i) => sum + (a === bank?.questions[i]?.answer ? 1 : 0), 0), [answers, bank]);
  const answered = answers.filter((a) => a !== null).length;

  if (!bank) return <main className="mx-auto max-w-3xl p-8"><h1 className="text-2xl font-bold">Soru bankası bulunamadı</h1><Link className="mt-4 inline-block text-beaker" href="/sinif/8">8. sınıf ünitelerine dön</Link></main>;

  const choose = (choice: number) => { if (selected !== null) return; setAnswers((old) => old.map((v, i) => (i === index ? choice : v))); };
  const next = () => { if (index === total - 1) setFinished(true); else setIndex((v) => v + 1); };
  const restart = () => { setIndex(0); setAnswers(Array(total).fill(null)); setFinished(false); };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link href={`/sinif/8/${bank.slug}`} className="text-sm font-semibold text-beaker hover:underline">← Ünite içeriğine dön</Link>
      <header className="mt-5 rounded-3xl bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-800 p-6 text-white sm:p-8">
        <p className="text-sm font-bold tracking-wide text-sky-200">8. SINIF · {bank.unit}. ÜNİTE</p>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">{bank.title}</h1>
        <p className="mt-2 text-white/80">{total} görselli, senaryolu yeni nesil soru</p>
      </header>
      {finished ? (
        <section className="mt-6 rounded-2xl border border-beaker/30 bg-white p-7 text-center shadow-sm dark:bg-lab-inkSoft">
          <div className="text-5xl">🏆</div>
          <h2 className="mt-3 text-2xl font-bold">Test tamamlandı!</h2>
          <p className="mt-2 text-lg">{total} soruda <b>{score}</b> doğru yaptın.</p>
          <p className="mt-1 text-sm text-lab-inkMuted">Başarı oranı: %{Math.round((score / total) * 100)}</p>
          <button onClick={restart} className="mt-5 rounded-full bg-beaker px-6 py-3 font-bold text-white">Yeniden çöz</button>
        </section>
      ) : (
        <section className="mt-6 rounded-2xl border border-lab-paperLine bg-white p-5 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft sm:p-7">
          <div className="flex items-center justify-between gap-3 text-sm"><span className="font-bold text-beaker">Soru {index + 1} / {total}</span><span className="text-lab-inkMuted">Doğru: {score} · Çözülen: {answered}</span></div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-lab-paperLine dark:bg-white/10"><div className="h-full rounded-full bg-beaker transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} /></div>
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 p-5 dark:from-sky-950/40 dark:to-indigo-950/30">
            {current.image && <img src={current.image} alt={current.imageAlt || "Soru görseli"} className="mx-auto w-full max-w-2xl rounded-xl border border-lab-paperLine bg-white" />}
            <p className="mt-4 leading-7 text-lab-ink dark:text-lab-paper">{current.scenario}</p>
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-beaker">{current.outcome}</p>
          <h2 className="mt-2 text-lg font-bold leading-7">{current.question}</h2>
          <div className="mt-5 grid gap-3">
            {current.options.map((option, i) => {
              const correct = i === current.answer, chosen = selected === i;
              let cls = "border-lab-paperLine hover:border-beaker dark:border-white/10";
              if (selected !== null && correct) cls = "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100";
              else if (chosen && !correct) cls = "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-100";
              return (
                <button key={i} onClick={() => choose(i)} disabled={selected !== null} className={`rounded-xl border p-4 text-left text-sm font-medium transition ${cls}`}>
                  <span className="mr-3 inline-grid h-7 w-7 place-items-center rounded-full bg-black/5 font-bold dark:bg-white/10">{String.fromCharCode(65 + i)}</span>{option}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <div className="mt-5 rounded-xl bg-sky-50 p-4 text-sm leading-6 text-sky-950 dark:bg-sky-950/40 dark:text-sky-100">
              <b>{selected === current.answer ? "Doğru cevap!" : "Doğru cevap: " + String.fromCharCode(65 + current.answer)}</b>
              <p className="mt-1">{current.explanation}</p>
            </div>
          )}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button onClick={() => setIndex((v) => Math.max(0, v - 1))} disabled={index === 0} className="rounded-full border border-beaker px-5 py-3 text-sm font-bold text-beaker disabled:opacity-40">← Önceki</button>
            <button onClick={next} disabled={selected === null} className="rounded-full bg-beaker px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">{index === total - 1 ? "Testi bitir" : "Sonraki soru →"}</button>
          </div>
        </section>
      )}
    </main>
  );
}
