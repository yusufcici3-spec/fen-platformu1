"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { StaticExam } from "@/lib/staticExams";

type Stored = { answers: Record<number, number>; startedAt: number | null; finished: boolean; currentIndex?: number };
const KEY = (slug: string) => `fenplatformu:deneme:${slug}`;
const LETTERS = ["A", "B", "C", "D", "E"];

function load(slug: string): Stored {
  try {
    const raw = localStorage.getItem(KEY(slug));
    if (raw) return JSON.parse(raw) as Stored;
  } catch {}
  return { answers: {}, startedAt: null, finished: false, currentIndex: 0 };
}
function save(slug: string, s: Stored) {
  try { localStorage.setItem(KEY(slug), JSON.stringify(s)); } catch {}
}

export function StaticExamRunner({ exam }: { exam: StaticExam }) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<Stored>({ answers: {}, startedAt: null, finished: false, currentIndex: 0 });
  const topRef = useRef<HTMLDivElement>(null);
  const currentIndex = Math.min(state.currentIndex ?? 0, exam.questions.length - 1);
  const question = exam.questions[currentIndex];
  const total = exam.questions.length;
  const answered = Object.keys(state.answers).length;
  const correct = exam.questions.reduce((sum, q) => sum + (state.answers[q.no] === q.answer ? 1 : 0), 0);
  const progress = ((currentIndex + 1) / total) * 100;

  useEffect(() => {
    const saved = load(exam.slug);
    setState({ ...saved, currentIndex: saved.currentIndex ?? 0 });
    setReady(true);
  }, [exam.slug]);

  function update(next: Stored) {
    setState(next);
    save(exam.slug, next);
  }
  function start() {
    update({ answers: {}, startedAt: Date.now(), finished: false, currentIndex: 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function pick(no: number, idx: number) {
    if (state.finished) return;
    update({ ...state, answers: { ...state.answers, [no]: idx } });
  }
  function goTo(index: number) {
    update({ ...state, currentIndex: Math.max(0, Math.min(index, total - 1)) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function finish() {
    update({ ...state, finished: true });
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }
  function reset() {
    update({ answers: {}, startedAt: null, finished: false, currentIndex: 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const result = useMemo(() => {
    let right = 0, wrong = 0, blank = 0;
    for (const q of exam.questions) {
      const a = state.answers[q.no];
      if (a === undefined) blank++;
      else if (a === q.answer) right++;
      else wrong++;
    }
    return { right, wrong, blank, net: right - wrong / 3 };
  }, [state.answers, exam.questions]);

  if (!ready) return <p className="p-10 text-center text-sm text-lab-inkMuted">Yükleniyor...</p>;

  if (!state.startedAt) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-lab-paperLine bg-white p-6 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft sm:p-8">
          <div className="rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 p-5 text-white">
            <p className="text-sm font-semibold text-white/80">{exam.classLevel}. Sınıf Fen Bilimleri</p>
            <h2 className="mt-2 text-2xl font-bold">{exam.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/85">{exam.description}</p>
            <div className="mt-5 flex items-center justify-between text-sm"><span>{total} soru</span><span>Yeni nesil · Görsel destekli</span></div>
          </div>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-lab-inkMuted dark:text-lab-paper/70">
            <li>Sorular tek tek açılır; senaryoyu, görseli ve seçenekleri dikkatlice incele.</li>
            <li>Bir seçeneği işaretledikten sonra sonraki soruya geçebilirsin.</li>
            <li>İlerlemen ve verdiğin cevaplar bu cihazda saklanır.</li>
          </ul>
          <button onClick={start} className="mt-6 w-full rounded-full bg-beaker px-6 py-3 font-bold text-white transition hover:bg-beaker-dark">🚀 Soruları Çözmeye Başla</button>
        </div>
      </section>
    );
  }

  if (state.finished) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div ref={topRef} className="rounded-3xl border border-beaker/30 bg-white p-6 shadow-sm dark:bg-lab-inkSoft sm:p-8">
          <p className="text-sm font-semibold text-beaker-dark">DENEME TAMAMLANDI</p>
          <h2 className="mt-2 text-2xl font-bold">Sonuçların</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[[result.right,"Doğru"],[result.wrong,"Yanlış"],[result.blank,"Boş"],[result.net.toFixed(2),"Net"]].map(([value,label]) => (
              <div key={String(label)} className="rounded-2xl bg-lab-paper/60 p-4 text-center dark:bg-white/5"><div className="text-2xl font-bold">{value}</div><div className="mt-1 text-xs text-lab-inkMuted dark:text-lab-paper/60">{label}</div></div>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {exam.questions.map((q) => {
              const a = state.answers[q.no];
              return <article key={q.no} className="rounded-xl border border-lab-paperLine p-4 dark:border-white/10">
                <p className="font-semibold">Soru {q.no} · {a === undefined ? "Boş" : a === q.answer ? "Doğru" : "Yanlış"} · Doğru cevap: {LETTERS[q.answer]}</p>
                <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/70">{q.explanation}</p>
              </article>;
            })}
          </div>
          <button onClick={reset} className="mt-6 w-full rounded-full border border-beaker px-6 py-3 font-semibold text-beaker-dark hover:bg-beaker/10">Yeniden Çöz</button>
        </div>
      </section>
    );
  }

  const selected = state.answers[question.no];
  return (
    <section className="mx-auto max-w-3xl px-4 py-7 sm:px-6">
      <div className="mb-6 rounded-b-3xl rounded-t-xl bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 p-5 text-white shadow-lg sm:p-7">
        <p className="text-sm leading-6 text-white/80">{exam.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3 text-base font-medium sm:text-lg">
          <span>Soru {currentIndex + 1} / {total}</span>
          <span>Doğru: {correct} / {total}</span>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/25">
          <div className="h-full rounded-full bg-amber-300 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <article className="rounded-3xl border border-lab-paperLine bg-white p-5 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-sky-100 px-3 py-1.5 text-sm font-bold text-sky-900 dark:bg-sky-950 dark:text-sky-200">{question.outcome}</span>
          <span className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Senaryoyu incele, görseli yorumla.</span>
        </div>
        <p className="mt-5 whitespace-pre-line text-base leading-8 sm:text-lg">{question.scenario}</p>
        {question.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={question.image} alt={question.imageAlt || "Soru görseli"} loading="lazy" decoding="async" className="mx-auto my-5 h-auto w-full max-w-xl rounded-2xl border border-sky-900/20" />
        ) : null}
        <h2 className="mt-5 text-lg font-bold leading-8 sm:text-xl">{question.stem}</h2>
        <div className="mt-5 space-y-3" role="radiogroup" aria-label={`Soru ${question.no} seçenekleri`}>
          {question.options.map((option, index) => {
            const chosen = selected === index;
            const isCorrect = index === question.answer;
            const style = selected === undefined
              ? chosen ? "border-beaker bg-beaker/10" : "border-lab-paperLine hover:border-beaker dark:border-white/10"
              : isCorrect ? "border-emerald-500 bg-emerald-500/10" : chosen ? "border-red-500 bg-red-500/10" : "border-lab-paperLine opacity-70 dark:border-white/10";
            return <button key={index} type="button" role="radio" aria-checked={chosen} onClick={() => pick(question.no, index)} disabled={selected !== undefined} className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-base leading-7 transition ${style}`}>
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-sm font-bold">{LETTERS[index]})</span>
              <span>{option}</span>
            </button>;
          })}
        </div>
        {selected !== undefined && <div className="mt-5 rounded-2xl bg-lab-paper/70 p-4 text-sm leading-6 dark:bg-white/5">
          <p className="font-bold">{selected === question.answer ? "✓ Doğru cevap!" : `Doğru cevap: ${LETTERS[question.answer]}`}</p>
          <p className="mt-1 text-lab-inkMuted dark:text-lab-paper/70">{question.explanation}</p>
        </div>}
        <div className="mt-7 flex items-center justify-between gap-3">
          <button type="button" onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0} className="rounded-full border border-lab-paperLine px-5 py-3 text-sm font-semibold disabled:opacity-40 dark:border-white/10">← Önceki</button>
          {currentIndex < total - 1
            ? <button type="button" onClick={() => goTo(currentIndex + 1)} disabled={selected === undefined} className="rounded-full bg-beaker px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Sonraki Soru →</button>
            : <button type="button" onClick={finish} disabled={selected === undefined} className="rounded-full bg-beaker px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Denemeyi Bitir</button>}
        </div>
        <p className="mt-4 text-center text-xs text-lab-inkMuted dark:text-lab-paper/50">Cevaplanan: {answered} / {total}</p>
      </article>
    </section>
  );
}
