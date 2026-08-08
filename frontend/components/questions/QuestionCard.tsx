"use client";

import { useState, useEffect } from "react";
import { Question } from "@/types/questions";

export interface QuestionAnswerValue {
  selectedOptionId?: string;
  answerText?: string;
}

/**
 * Tek bir soruyu, tipine uygun arayüzle (çoktan seçmeli, doğru/yanlış,
 * boşluk doldurma, eşleştirme, açık uçlu, sürükle-bırak, interaktif) render
 * eder. Seçim değiştikçe `onChange` ile üst bileşene bildirir; doğruluk
 * kontrolü hiçbir zaman istemci tarafında yapılmaz.
 */
export function QuestionCard({
  question,
  value,
  onChange,
  disabled,
  showCorrectness,
  isCorrect,
}: {
  question: Question;
  value: QuestionAnswerValue;
  onChange: (value: QuestionAnswerValue) => void;
  disabled?: boolean;
  showCorrectness?: boolean;
  isCorrect?: boolean | null;
}) {
  return (
    <div>
      {question.isScenario && (
        <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-reaction/10 px-3 py-1 text-xs font-semibold text-reaction-dark">
          📖 Senaryo Sorusu
        </span>
      )}
      {question.isNextGen && (
        <span className="mb-2 ml-2 inline-flex items-center gap-1 rounded-full bg-beaker/10 px-3 py-1 text-xs font-semibold text-beaker-dark dark:text-beaker-light">
          ✨ Yeni Nesil
        </span>
      )}

      <p className="whitespace-pre-line text-lab-ink dark:text-lab-paper">{question.body}</p>

      {question.images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {question.images.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.id}
              src={img.url.startsWith("http") ? img.url : `${(process.env.NEXT_PUBLIC_API_URL ?? "").replace("/api", "")}${img.url}`}
              alt={img.caption ?? "Soru görseli"}
              className="rounded-lg border border-lab-paperLine object-cover dark:border-white/10"
            />
          ))}
        </div>
      )}

      <div className="mt-5">
        {(question.type === "MULTIPLE_CHOICE" || question.type === "TRUE_FALSE") && (
          <ChoiceList
            question={question}
            selectedOptionId={value.selectedOptionId}
            onSelect={(id) => onChange({ selectedOptionId: id })}
            disabled={disabled}
            showCorrectness={showCorrectness}
          />
        )}

        {question.type === "FILL_BLANK" && (
          <TextAnswer
            placeholder="Cevabınızı yazın..."
            value={value.answerText ?? ""}
            onChange={(text) => onChange({ answerText: text })}
            disabled={disabled}
          />
        )}

        {question.type === "OPEN_ENDED" && (
          <TextAnswer
            placeholder="Açık uçlu cevabınızı buraya yazın..."
            value={value.answerText ?? ""}
            onChange={(text) => onChange({ answerText: text })}
            disabled={disabled}
            multiline
          />
        )}

        {(question.type === "MATCHING" || question.type === "DRAG_DROP") && (
          <MatchingList
            question={question}
            answerText={value.answerText}
            onChange={(text) => onChange({ answerText: text })}
            disabled={disabled}
          />
        )}

        {question.type === "INTERACTIVE" && (
          <TextAnswer
            placeholder="Bu interaktif soru için cevabınızı/gözleminizi yazın..."
            value={value.answerText ?? ""}
            onChange={(text) => onChange({ answerText: text })}
            disabled={disabled}
            multiline
          />
        )}
      </div>

      {showCorrectness && isCorrect !== null && isCorrect !== undefined && (
        <div
          className={`mt-4 rounded-lg px-4 py-3 text-sm font-semibold ${
            isCorrect ? "bg-leaf/10 text-leaf" : "bg-reaction/10 text-reaction-dark"
          }`}
        >
          {isCorrect ? "✓ Doğru cevap!" : "✕ Yanlış cevap."}
        </div>
      )}
    </div>
  );
}

function ChoiceList({
  question,
  selectedOptionId,
  onSelect,
  disabled,
  showCorrectness,
}: {
  question: Question;
  selectedOptionId?: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
  showCorrectness?: boolean;
}) {
  return (
    <div className="space-y-2">
      {question.choiceOptions.map((opt) => {
        const isSelected = selectedOptionId === opt.id;
        const revealCorrect = showCorrectness && opt.isCorrect === true;
        const revealWrongSelected = showCorrectness && isSelected && opt.isCorrect === false;

        return (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(opt.id)}
            className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition disabled:cursor-default ${
              revealCorrect
                ? "border-leaf bg-leaf/10"
                : revealWrongSelected
                ? "border-reaction bg-reaction/10"
                : isSelected
                ? "border-beaker bg-beaker/10"
                : "border-lab-paperLine hover:border-beaker/50 dark:border-white/10"
            }`}
          >
            <span
              className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border text-xs ${
                isSelected ? "border-beaker bg-beaker text-white" : "border-lab-paperLine dark:border-white/20"
              }`}
            >
              {isSelected && "✓"}
            </span>
            {opt.text}
          </button>
        );
      })}
    </div>
  );
}

function TextAnswer({
  value,
  onChange,
  placeholder,
  disabled,
  multiline,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  disabled?: boolean;
  multiline?: boolean;
}) {
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);

  const commonProps = {
    value: local,
    disabled,
    placeholder,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLocal(e.target.value);
      onChange(e.target.value);
    },
    className:
      "w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker disabled:opacity-70 dark:border-white/10",
  };

  return multiline ? <textarea rows={4} {...commonProps} /> : <input type="text" {...commonProps} />;
}

/**
 * Eşleştirme / sürükle-bırak soruları için basitleştirilmiş arayüz: her sol
 * öğe için bir açılır menüden doğru eşi seçilir. Seçimler `sol=sağ` biçiminde
 * birleştirilip `;` ile ayrılarak answerText olarak gönderilir.
 */
function MatchingList({
  question,
  answerText,
  onChange,
  disabled,
}: {
  question: Question;
  answerText?: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const pool = question.choiceOptions.map((o) => o.matchText).filter((t): t is string => !!t);
  const [selections, setSelections] = useState<Record<string, string>>({});

  function handleSelect(optionId: string, match: string) {
    const next = { ...selections, [optionId]: match };
    setSelections(next);
    const encoded = question.choiceOptions
      .map((o) => `${o.text}=${next[o.id] ?? ""}`)
      .filter((pair) => !pair.endsWith("="))
      .join(";");
    onChange(encoded);
  }

  return (
    <div className="space-y-2">
      {question.choiceOptions.map((opt) => (
        <div key={opt.id} className="flex items-center gap-3 rounded-lg border border-lab-paperLine px-4 py-3 dark:border-white/10">
          <span className="flex-1 text-sm font-medium">{opt.text}</span>
          <span className="text-lab-inkMuted">→</span>
          <select
            disabled={disabled}
            value={selections[opt.id] ?? ""}
            onChange={(e) => handleSelect(opt.id, e.target.value)}
            className="rounded-lg border border-lab-paperLine bg-transparent px-2 py-1.5 text-sm outline-none focus:border-beaker dark:border-white/10"
          >
            <option value="">Seçiniz...</option>
            {pool.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      ))}
      {!answerText && (
        <p className="text-xs text-lab-inkMuted dark:text-lab-paper/50">Her satır için bir eşleşme seçin.</p>
      )}
    </div>
  );
}
