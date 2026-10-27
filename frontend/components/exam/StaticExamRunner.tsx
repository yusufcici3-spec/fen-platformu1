"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { StaticExam } from "@/lib/staticExams";

type Stored = { answers: Record<number, number>; startedAt: number | null; finished: boolean };
const KEY = (slug: string) => `fenplatformu:deneme:${slug}`;
const LETTERS = ["A", "B", "C", "D", "E"];

function load(slug: string): Stored {
  try {
    const raw = localStorage.getItem(KEY(slug));
    if (raw) return JSON.parse(raw) as Stored;
  } catch {}
  return { answers: {}, startedAt: null, finished: false };
}
function save(slug: string, s: Stored) {
  try {
    localStorage.setItem(KEY(slug), JSON.stringify(s));
  } catch {}
}
function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function StaticExamRunner({ exam }: { exam: StaticExam }) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<Stored>({ answers: {}, startedAt: null, finished: false });
  const [now, setNow] = useState(Date.now());
  const topRef = useRef<HTMLDivElement>(null);
  const total = exam.durationMin * 60;

  useEffect(() => {
    setState(load(exam.slug));
    setReady(true);
  }, [exam.slug]);

  useEffect(() => {
    if (!state.startedAt || state.finished) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [state.startedAt, state.finished]);

  const remaining = state.startedAt ? Math.max(0, total - Math.floor((now - state.startedAt) / 1000)) : total;

  useEffect(() => {
    if (state.startedAt && !state.finished && remaining === 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, state.startedAt, state.finished]);

  function update(next: Stored) {
    setState(next);
    save(exam.slug, next);
  }
  function start() {
    update({ answers: {}, startedAt: Date.now(), finished: false });
    setNow(Date.now());
  }
  function pick(no: number, idx: number) {
    if (state.finished) return;
    const answers = { ...state.answers };
    if (answers[no] === idx) delete answers[no];
    else answers[no] = idx;
    update({ ...state, answers });
  }
  function finish() {
    update({ ...state, finished: true });
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }
  function reset() {
    update({ answers: {}, startedAt: null, finished: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const result = useMemo(() => {
    let correct = 0, wrong = 0, blank = 0;
    const perUnit: Record<string, { c: number; t: number }> = {};
    for (const q of exam.questions) {
      const a = state.answers[q.no];
      perUnit[q.unit] ??= { c: 0, t: 0 };
      perUnit[q.unit].t++;
      if (a === undefined) blank++;
      else if (a === q.answer) { correct++; perUnit[q.unit].c++; }
      else wrong++;
    }
    return { correct, wrong, blank, net: correct - wrong / 3, perUnit };
  }, [state.answers, exam.questions]);

  if (!ready) return <p className="p-10 text-center text-sm text-lab-inkMuted">Yükleniyor...</p>;

  const answered = Object.keys(state.answers).length;

  if (!state.startedAt) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div><dt className="text-lab-inkMuted dark:text-lab-paper/50">Soru sayısı</dt><dd className="font-semibold">{exam.questions.length}</dd></div>
            <div><dt className="text-lab-inkMuted dark:text-lab-paper/50">Süre</dt><dd className="font-semibold">{exam.durationMin} dakika</dd></div>
            <div className="col-span-2"><dt className="text-lab-inkMuted dark:text-lab-paper/50">Kapsam</dt><dd className="font-semibold">{exam.units.join(" · ")}</dd></div>
          </dl>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-lab-inkMuted dark:text-lab-paper/70">
            <li>Her sorunun uzun bir senaryosu ve bir şeması vardır; önce senaryoyu ve şemayı dikkatle incele.</li>
            <li>Her soruda 4 seçenek vardır ve yalnızca biri doğrudur.</li>
            <li>LGS’deki gibi 3 yanlış 1 doğruyu götürür. Emin değilsen boş bırakabilirsin.</li>
            <li>Süre “Başla” düğmesine basınca başlar. Süre bitince deneme otomatik tamamlanır.</li>
          </ul>
          <button onClick={start} className="mt-6 rounded-full bg-beaker px-6 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark">
            Denemeye Başla
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div ref={topRef} />
      {state.finished ? (
        <div className="rounded-card border border-beaker/40 bg-beaker/5 p-6">
          <h2 className="font-display text-xl font-bold">Sonuçların</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            <div className="rounded-xl bg-white p-3 dark:bg-lab-inkSoft"><div className="text-2xl font-bold text-leaf">{result.correct}</div><div className="text-xs">Doğru</div></div>
            <div className="rounded-xl bg-white p-3 dark:bg-lab-inkSoft"><div className="text-2xl font-bold text-red-600">{result.wrong}</div><div className="text-xs">Yanlış</div></div>
            <div className="rounded-xl bg-white p-3 dark:bg-lab-inkSoft"><div className="text-2xl font-bold">{result.blank}</div><div className="text-xs">Boş</div></div>
            <div className="rounded-xl bg-white p-3 dark:bg-lab-inkSoft"><div className="text-2xl font-bold text-beaker-dark">{result.net.toFixed(2)}</div><div className="text-xs">Net</div></div>
          </div>
          <ul className="mt-4 space-y-1 text-sm">
            {Object.entries(result.perUnit).map(([u, v]) => (
              <li key={u}><strong>{u}:</strong> {v.c} / {v.t} doğru</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-lab-inkMuted dark:text-lab-paper/60">Aşağıda her sorunun doğru cevabını ve çözümünü inceleyebilirsin.</p>
          <button onClick={reset} className="mt-4 rounded-full border border-beaker px-5 py-2 text-sm font-semibold text-beaker-dark hover:bg-beaker/10">Yeniden Çöz</button>
        </div>
      ) : (
        <div className="sticky top-16 z-20 flex items-center justify-between rounded-full border border-lab-paperLine bg-white/95 px-4 py-2 text-sm shadow-sm backdrop-blur dark:border-white/10 dark:bg-lab-inkSoft/95">
          <span className={`font-mono text-base font-bold ${remaining < 300 ? "text-red-600" : ""}`}>⏱ {fmt(remaining)}</span>
          <span>{answered} / {exam.questions.length} işaretlendi</span>
          <button onClick={() => { if (window.confirm("Denemeyi bitirmek istiyor musun?")) finish(); }} className="rounded-full bg-beaker px-4 py-1.5 font-semibold text-white hover:bg-beaker-dark">Bitir</button>
        </div>
      )}

      <div className="mt-6 space-y-8">
        {exam.questions.map((q) => {
          const a = state.answers[q.no];
          return (
            <article key={q.no} className="rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-beaker px-2.5 py-1 font-bold text-white">Soru {q.no}</span>
                <span className="rounded-full bg-beaker/10 px-2.5 py-1 font-semibold text-beaker-dark dark:text-beaker-light">{q.unit}</span>
                <span className="font-mono text-lab-inkMuted dark:text-lab-paper/50">{q.outcome}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed">{q.scenario}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={q.image} alt={q.imageAlt} loading="lazy" className="mx-auto my-4 h-auto w-full max-w-xl rounded-xl" />
              <p className="font-semibold">{q.stem}</p>
              <div className="mt-3 space-y-2" role="radiogroup" aria-label={`Soru ${q.no} seçenekleri`}>
                {q.options.map((opt, i) => {
                  const chosen = a === i;
                  let cls = "border-lab-paperLine hover:border-beaker dark:border-white/10";
                  if (state.finished) {
                    if (i === q.answer) cls = "border-leaf bg-leaf/10";
                    else if (chosen) cls = "border-red-500 bg-red-500/10";
                  } else if (chosen) cls = "border-beaker bg-beaker/10";
                  return (
                    <button
                      key={i}
                      role="radio"
                      aria-checked={chosen}
                      onClick={() => pick(q.no, i)}
                      disabled={state.finished}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition ${cls}`}
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">{LETTERS[i]}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {state.finished && (
                <div className="mt-4 rounded-xl bg-lab-paper/60 p-3 text-sm dark:bg-white/5">
                  <p className="font-semibold">
                    {a === undefined ? "Boş bıraktın." : a === q.answer ? "✅ Doğru!" : "❌ Yanlış."} Doğru cevap: {LETTERS[q.answer]}
                  </p>
                  <p className="mt-1 text-lab-inkMuted dark:text-lab-paper/70">{q.explanation}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {!state.finished && (
        <div className="mt-8 text-center">
          <button onClick={() => { if (window.confirm("Denemeyi bitirmek istiyor musun?")) finish(); }} className="rounded-full bg-beaker px-8 py-3 text-sm font-semibold text-white hover:bg-beaker-dark">Denemeyi Bitir</button>
        </div>
      )}
    </section>
  );
}
