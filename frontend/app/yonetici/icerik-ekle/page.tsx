"use client";

import { useState } from "react";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function IcerikEklePage() {
  const { accessToken } = useAuth();

  const [classLevel, setClassLevel] = useState<number>(5);
  const [unitTitle, setUnitTitle] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("A");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const payload = {
      classLevel,
      unitTitle,
      topicTitle,
      questionText,
      options: { A: optionA, B: optionB, C: optionC, D: optionD },
      correctAnswer,
    };

    try {
      const res = await apiFetch("/sorular/ekle", {
        method: "POST",
        body: JSON.stringify(payload),
        token: accessToken,
      });

      if (res.error) {
        setMessage({ type: "error", text: "Ekleme başarısız: " + res.error });
      } else {
        setMessage({ type: "success", text: "İçerik/Soru başarıyla eklendi!" });
        setQuestionText("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setOptionD("");
      }
    } catch {
      setMessage({ type: "error", text: "Bir hata oluştu. Lütfen tekrar deneyin." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CurriculumShell title="Yeni İçerik & Soru Ekle">
      <Card className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sınıf Seçimi */}
          <div>
            <label className="block text-sm font-medium mb-2">Sınıf Düzeyi</label>
            <div className="flex gap-3">
              {[5, 6, 7, 8].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setClassLevel(lvl)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    classLevel === lvl
                      ? "bg-beaker text-white shadow-md"
                      : "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {lvl}. Sınıf
                </button>
              ))}
            </div>
          </div>

          {/* Ünite & Konu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ünite Adı</label>
              <input
                type="text"
                required
                placeholder="Örn: Güneş Sistemi ve Tutulmalar"
                value={unitTitle}
                onChange={(e) => setUnitTitle(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-beaker"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Konu Adı</label>
              <input
                type="text"
                required
                placeholder="Örn: Güneş ve Ay Tutulmaları"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-beaker"
              />
            </div>
          </div>

          {/* Soru Metni */}
          <div>
            <label className="block text-sm font-medium mb-1">Soru Metni / Kazanım Detayı</label>
            <textarea
              required
              rows={3}
              placeholder="Soruyu veya kazanım açıklamasını buraya yazın..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-beaker"
            />
          </div>

          {/* Şıklar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">A Şıkkı</label>
              <input
                type="text"
                required
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">B Şıkkı</label>
              <input
                type="text"
                required
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">C Şıkkı</label>
              <input
                type="text"
                required
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">D Şıkkı</label>
              <input
                type="text"
                required
                value={optionD}
                onChange={(e) => setOptionD(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
              />
            </div>
          </div>

          {/* Doğru Cevap */}
          <div>
            <label className="block text-sm font-medium mb-1">Doğru Cevap</label>
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-beaker"
            >
              <option value="A" className="dark:bg-gray-900">A Şıkkı</option>
              <option value="B" className="dark:bg-gray-900">B Şıkkı</option>
              <option value="C" className="dark:bg-gray-900">C Şıkkı</option>
              <option value="D" className="dark:bg-gray-900">D Şıkkı</option>
            </select>
          </div>

          {/* Bildirim Mesajı */}
          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Kaydet Butonu */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-beaker text-white font-semibold rounded-lg shadow hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Kaydediliyor..." : "Sınıf İçeriğine Ekle"}
          </button>
        </form>
      </Card>
    </CurriculumShell>
  );
}
