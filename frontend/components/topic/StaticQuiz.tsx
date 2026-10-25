"use client";

import { useState } from "react";
import type { StaticQuizQuestion } from "@/lib/maarifContent";

export function StaticQuiz({ questions }: { questions: StaticQuizQuestion[] }) {
  const [selected, setSelected] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState(false);

  const answered = selected.every((s) => s !== null);
  const score = selected.reduce<number>((n, s, i) => (s === questions[i].answer ? n + 1 : n), 0);

  function choose(qi: number, oi: number) {
    if (checked) return;
    setSelected((prev) => prev.map((s, i) => (i === qi ? oi : s)));
  }

  function reset() {
    setSelected(questions.map(() => null));
    setChecked(false);
  }

  return (
    <section
      aria-labelledby="quick-quiz-title"
      className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft"
    >
      <h2 id="quick-quiz-title" className="flex items-center gap-2 font-display text-lg font-semibold">
        <span>✅</span> Kendini Değerlendir
      </h2>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/70">
        Her soru için bir şık seç, sonra “Kontrol et” düğmesine bas.
      </p>

      <ol className="mt-4 space-y-5">
        {questions.map((q, qi) => (
          <li key={qi}>
            <p className="font-semibold">
              {qi + 1}. {q.body}
            </p>
            <div className="mt-2 grid gap-2" role="radiogroup" aria-label={`Soru ${qi + 1}`}>
              {q.options.map((opt, oi) => {
                const isSel = selected[qi] === oi;
                const isRight = checked && oi === q.answer;
                const isWrong = checked && isSel && oi !== q.answer;
                return (
                  <button
                    key={oi}
                    type="button"
                    role="radio"
                    aria-checked={isSel}
                    onClick={() => choose(qi, oi)}
                    className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                      isRight
                        ? "border-leaf bg-leaf/10 text-lab-ink dark:text-lab-paper"
                        : isWrong
                        ? "border-reaction bg-reaction/10 text-lab-ink dark:text-lab-paper"
                        : isSel
                        ? "border-beaker bg-beaker/10"
                        : "border-lab-paperLine hover:border-beaker dark:border-white/15"
                    }`}
                  >
                    <span className="mr-2 font-mono text-xs">{String.fromCharCode(65 + oi)})</span>
                    {opt}
                    {isRight && <span className="ml-2" aria-label="doğru">✓</span>}
                    {isWrong && <span className="ml-2" aria-label="yanlış">✗</span>}
                  </button>
                );
              })}
            </div>
            {checked && (
              <p className="mt-2 rounded-lg bg-lab-paperLine/40 px-3 py-2 text-sm text-lab-inkMuted dark:bg-white/5 dark:text-lab-paper/75">
                <strong>Açıklama:</strong> {q.explanation}
              </p>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!checked ? (
          <button
            type="button"
            disabled={!answered}
            onClick={() => setChecked(true)}
            className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-50"
          >
            Kontrol et
          </button>
        ) : (
          <>
            <p className="font-semibold" aria-live="polite">
              Sonuç: {questions.length} sorudan {score} doğru{" "}
              {score === questions.length ? "🎉" : score >= questions.length - 1 ? "👏" : "💪"}
            </p>
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-beaker px-5 py-2.5 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
            >
              Tekrar dene
            </button>
          </>
        )}
      </div>
    </section>
  );
}
