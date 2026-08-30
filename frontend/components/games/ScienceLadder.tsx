"use client";

// Özgün oyun dili: bilim laboratuvarı atmosferi, lacivert zemin, turkuaz etkileşim ve altın ödül vurgusu.
// Bu bileşen mevcut oyunun çerçevesini kullanır; başka bir yarışmanın adı, logosu veya ayırt edici metinleri kullanılmaz.

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { decodeStoredHtml } from "@/lib/renderHtml";
import { checkGameAnswer } from "./checkGameAnswer";
import { GameResultScreen } from "./GameResultScreen";
import { GameShell } from "./GameShell";
import { Question } from "@/types/questions";

const TOTAL_QUESTIONS = 12;
const SECONDS_PER_QUESTION = 30;
const PRIZE_LADDER = [0, 100, 250, 500, 1_000, 2_000, 4_000, 8_000, 16_000, 32_000, 64_000, 100_000];
const SAFE_STEPS = new Set([3, 7]);

const OPTION_STYLES = [
  "border-cyan-300/30 hover:border-cyan-200 hover:bg-cyan-300/10",
  "border-amber-300/30 hover:border-amber-200 hover:bg-amber-300/10",
  "border-emerald-300/30 hover:border-emerald-200 hover:bg-emerald-300/10",
  "border-fuchsia-300/30 hover:border-fuchsia-200 hover:bg-fuchsia-300/10",
];

export function ScienceLadder({
  gameId,
  topicId,
  classLevel,
}: {
  gameId: string;
  topicId?: string | null;
  classLevel?: number | null;
}) {
  const { accessToken } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<{ isCorrect: boolean; explanation: string | null } | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);
  const [usedFocus, setUsedFocus] = useState(false);
  const [hiddenOptionIds, setHiddenOptionIds] = useState<string[]>([]);
  const [hintText, setHintText] = useState<string | null>(null);

  const loadQuestion = useCallback(async (excluded: string[]) => {
    setIsLoading(true);
    setSelectedId(null);
    setAnswerResult(null);
    setSecondsLeft(SECONDS_PER_QUESTION);
    setHiddenOptionIds([]);
    setHintText(null);
    try {
      const params = new URLSearchParams();
      if (topicId) params.set("topicId", topicId);
      else if (classLevel) params.set("classLevel", String(classLevel));
      if (excluded.length) params.set("excludeIds", excluded.join(","));
      const result = await apiFetch<Question>(`/sorular/rastgele?${params.toString()}`);
      setQuestion(result.data ?? null);
    } catch {
      setQuestion(null);
    } finally {
      setIsLoading(false);
    }
  }, [topicId, classLevel]);

  useEffect(() => {
    void loadQuestion([]);
  }, [loadQuestion]);

  useEffect(() => {
    if (isFinished || isLoading || answerResult) return;
    if (secondsLeft <= 0) {
      setWrongCount((count) => count + 1);
      setIsFinished(true);
      return;
    }
    const timer = window.setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft, isFinished, isLoading, answerResult]);

  async function selectAnswer(optionId: string) {
    if (!question || answerResult || isBusy || hiddenOptionIds.includes(optionId)) return;
    setSelectedId(optionId);
    setIsBusy(true);
    try {
      const result = await checkGameAnswer(question.id, accessToken, { selectedOptionId: optionId });
      const isCorrect = result.isCorrect;
      setAnswerResult({ isCorrect, explanation: result.explanation });
      if (isCorrect) {
        setCorrectCount((count) => count + 1);
        setScore(PRIZE_LADDER[questionIndex]);
      } else {
        setWrongCount((count) => count + 1);
      }
    } catch {
      setAnswerResult({ isCorrect: false, explanation: "Cevap kontrol edilemedi. Lütfen tekrar dene." });
      setWrongCount((count) => count + 1);
    } finally {
      setIsBusy(false);
    }
  }

  function nextQuestion() {
    if (!question) return;
    if (!answerResult?.isCorrect || questionIndex + 1 >= TOTAL_QUESTIONS) {
      setIsFinished(true);
      return;
    }
    const nextIndex = questionIndex + 1;
    const nextAskedIds = [...askedIds, question.id];
    setQuestionIndex(nextIndex);
    setAskedIds(nextAskedIds);
    void loadQuestion(nextAskedIds);
  }

  function restart() {
    setQuestionIndex(0);
    setAskedIds([]);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setIsFinished(false);
    setUsedHint(false);
    setUsedAudience(false);
    setUsedFocus(false);
    void loadQuestion([]);
  }

  function useHint() {
    if (usedHint || !question || answerResult) return;
    setUsedHint(true);
    setHintText("Sorudaki anahtar kavramları ve neden-sonuç ilişkisini dikkatle karşılaştır. Tanımdan çok, verilen örneğin hangi bilimsel sürece uyduğuna odaklan.");
  }

  function useAudience() {
    if (usedAudience || !question || answerResult) return;
    setUsedAudience(true);
    const options = question.choiceOptions.slice().sort((a, b) => a.order - b.order);
    const strongest = options[Math.floor(Math.random() * options.length)]?.id;
    setHintText(strongest ? `Sınıf oylamasında en güçlü tahmin şu seçenekte toplandı: ${options.findIndex((option) => option.id === strongest) + 1}. seçenek. Bu yalnızca bir tahmindir.` : "Sınıf oylaması kullanılamadı.");
  }

  function useFocus() {
    if (usedFocus || !question || answerResult) return;
    setUsedFocus(true);
    const options = question.choiceOptions.slice().sort((a, b) => a.order - b.order);
    const hidden = options[Math.floor(Math.random() * options.length)]?.id;
    if (hidden) setHiddenOptionIds([hidden]);
    setHintText("Odak Merceği bir seçeneği geçici olarak devre dışı bıraktı. Kalan seçenekleri kanıtlarla değerlendir.");
  }

  if (isFinished) {
    return (
      <GameShell title="Bilim Basamakları" score={score}>
        <GameResultScreen gameId={gameId} score={score} correctCount={correctCount} wrongCount={wrongCount} onPlayAgain={restart} />
      </GameShell>
    );
  }

  return (
    <GameShell title="Bilim Basamakları" score={score} secondsLeft={answerResult ? undefined : secondsLeft}>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-300/20 bg-slate-950/50 p-4 text-white shadow-lg shadow-cyan-950/20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">Bilim rotası</p>
            <p className="mt-1 text-sm text-slate-200">Soru {questionIndex + 1} / {TOTAL_QUESTIONS}</p>
          </div>
          <div className="flex items-end gap-1" aria-label="Ödül basamakları">
            {PRIZE_LADDER.slice().reverse().slice(0, 6).map((prize, reverseIndex) => {
              const index = PRIZE_LADDER.length - 1 - reverseIndex;
              const active = index === questionIndex;
              return <span key={prize} className={`rounded-md px-2 py-1 font-mono text-xs ${active ? "bg-amber-300 font-bold text-slate-950" : "bg-white/10 text-slate-300"}`}>{prize.toLocaleString("tr-TR")} P</span>;
            })}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_180px]">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/65 p-5 text-white shadow-2xl shadow-slate-950/30 sm:p-7">
            {isLoading || !question ? (
              <p className="text-sm text-slate-300">Bilim sorusu hazırlanıyor...</p>
            ) : (
              <>
                <div className="rounded-2xl border border-cyan-200/15 bg-cyan-100/[0.04] p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">Araştırma kartı</p>
                  <div className="prose prose-invert max-w-none text-base leading-7" dangerouslySetInnerHTML={{ __html: decodeStoredHtml(question.body) }} />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {question.choiceOptions.slice().sort((a, b) => a.order - b.order).map((option, index) => {
                    const hidden = hiddenOptionIds.includes(option.id);
                    const selected = selectedId === option.id;
                    const correct = answerResult?.isCorrect && selected;
                    const wrong = answerResult && selected && !answerResult.isCorrect;
                    return (
                      <button key={option.id} type="button" onClick={() => void selectAnswer(option.id)} disabled={hidden || Boolean(answerResult) || isBusy} className={`min-h-16 rounded-2xl border p-4 text-left text-sm transition ${OPTION_STYLES[index % OPTION_STYLES.length]} ${selected ? "bg-white/10 ring-2 ring-cyan-200/60" : "bg-white/[0.03]"} ${correct ? "border-emerald-300 bg-emerald-300/15" : ""} ${wrong ? "border-rose-300 bg-rose-300/15" : ""} ${hidden ? "cursor-not-allowed opacity-20" : ""}`}>
                        <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 font-mono text-xs font-bold text-amber-200">{String.fromCharCode(65 + index)}</span>
                        <span>{option.text}</span>
                      </button>
                    );
                  })}
                </div>
                {hintText && <p className="mt-4 rounded-xl border border-amber-200/20 bg-amber-200/10 p-3 text-sm leading-6 text-amber-50">{hintText}</p>}
                {answerResult && <div className={`mt-4 rounded-xl p-4 text-sm ${answerResult.isCorrect ? "bg-emerald-300/10 text-emerald-100" : "bg-rose-300/10 text-rose-100"}`}><strong>{answerResult.isCorrect ? "Doğru cevap." : "Bu cevap doğru değil."}</strong>{answerResult.explanation && <span> {answerResult.explanation.replace(/<[^>]*>/g, "")}</span>}</div>}
                {answerResult && <button type="button" onClick={nextQuestion} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-300 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110">{answerResult.isCorrect && questionIndex + 1 < TOTAL_QUESTIONS ? "Bir sonraki basamağa geç" : "Sonucu gör"}</button>}
              </>
            )}
          </div>

          <aside className="rounded-[1.75rem] border border-amber-200/15 bg-slate-950/50 p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">Bilim araçları</p>
            <div className="mt-4 space-y-2">
              <button type="button" onClick={useHint} disabled={usedHint || Boolean(answerResult)} className="w-full rounded-xl border border-white/10 px-3 py-3 text-left text-xs transition hover:border-cyan-200/50 disabled:opacity-40"><strong className="block text-cyan-100">Kavram İpucu</strong><span className="text-slate-400">Anahtar kavramları hatırlatır.</span></button>
              <button type="button" onClick={useAudience} disabled={usedAudience || Boolean(answerResult)} className="w-full rounded-xl border border-white/10 px-3 py-3 text-left text-xs transition hover:border-amber-200/50 disabled:opacity-40"><strong className="block text-amber-100">Sınıf Oyu</strong><span className="text-slate-400">Bir tahmin dağılımı sunar.</span></button>
              <button type="button" onClick={useFocus} disabled={usedFocus || Boolean(answerResult)} className="w-full rounded-xl border border-white/10 px-3 py-3 text-left text-xs transition hover:border-emerald-200/50 disabled:opacity-40"><strong className="block text-emerald-100">Odak Merceği</strong><span className="text-slate-400">Bir seçeneği eler.</span></button>
            </div>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">Güvenli basamaklar: {Array.from(SAFE_STEPS).map((step) => `${step + 1}. soru`).join(" ve ")}.</p>
          </aside>
        </div>
      </div>
    </GameShell>
  );
}
