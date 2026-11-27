import { apiFetch } from "@/lib/api";

type Item = { question: string; options: string[]; selected: number; answer: number };

/**
 * Giriş yapmış öğrencinin hazır test cevaplarını sunucuya gönderir.
 * Giriş yoksa veya istek başarısız olursa test akışı etkilenmez.
 */
export function recordAnswers(quizTitle: string, items: Item[]) {
  try {
    const session = JSON.parse(window.localStorage.getItem("fen-platformu-oturum") ?? "null");
    if (session?.user?.role !== "STUDENT" || !session.accessToken || items.length === 0) return;
    void apiFetch("/analiz/test-sonucu", {
      method: "POST",
      token: session.accessToken,
      body: JSON.stringify({
        quizTitle,
        answers: items.map((i) => ({
          question: i.question,
          selected: i.options[i.selected] ?? "",
          correct: i.options[i.answer] ?? "",
          isCorrect: i.selected === i.answer,
        })),
      }),
    }).catch(() => {});
  } catch {
    /* tarayıcı depolaması kapalı olabilir */
  }
}
