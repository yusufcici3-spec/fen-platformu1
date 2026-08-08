"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { AssistantChatMessage } from "@/types/analysis";

/**
 * Platform genelinde erişilebilen, sağ altta sabit duran yapay zekâ
 * yardımcı widget'ı. Sorulara doğrudan cevap vermek yerine ipucu ve
 * açıklama sunar (bkz. backend `services/aiProvider.ts`).
 */
export function AIAssistantWidget() {
  const { user, accessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !accessToken || messages.length > 0) return;
    apiFetch<AssistantChatMessage[]>("/asistan/gecmis", { token: accessToken }).then((res) => {
      if (res.data && res.data.length > 0) setMessages(res.data);
      else
        setMessages([
          {
            role: "assistant",
            content: "Merhaba! Ben fen bilimleri çalışma arkadaşınım 🔬 Bir konuyu açıklayabilir, bir soruda ipucu verebilirim. Nasıl yardımcı olabilirim?",
          },
        ]);
    });
  }, [isOpen, accessToken, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || !accessToken || isSending) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsSending(true);

    try {
      const res = await apiFetch<{ reply: string }>("/asistan/sor", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ message: userMessage }),
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data?.reply ?? "Şu anda yanıt veremiyorum." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Bir hata oluştu, lütfen tekrar dene." }]);
    } finally {
      setIsSending(false);
    }
  }

  if (!user || user.role !== "STUDENT") return null;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {isOpen && (
        <div className="mb-3 flex h-96 w-80 flex-col rounded-card border border-lab-paperLine bg-white shadow-xl dark:border-white/10 dark:bg-lab-inkSoft">
          <div className="flex items-center justify-between rounded-t-card bg-beaker px-4 py-3 text-white">
            <span className="text-sm font-semibold">🤖 Fen Asistanı</span>
            <button onClick={() => setIsOpen(false)} aria-label="Kapat">
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-xs ${
                    m.role === "user" ? "bg-beaker text-white" : "bg-lab-paperLine/60 dark:bg-white/10"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isSending && <p className="text-xs text-lab-inkMuted">Yazıyor...</p>}
          </div>

          <div className="flex gap-2 border-t border-lab-paperLine/70 p-3 dark:border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Bir şey sor..."
              className="flex-1 rounded-full border border-lab-paperLine bg-transparent px-3 py-1.5 text-sm outline-none focus:border-beaker dark:border-white/10"
            />
            <button
              onClick={handleSend}
              disabled={isSending}
              className="rounded-full bg-beaker px-4 py-1.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
            >
              →
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="grid h-14 w-14 place-items-center rounded-full bg-beaker text-2xl text-white shadow-lg hover:bg-beaker-dark"
        aria-label="Fen Asistanını Aç"
      >
        {isOpen ? "✕" : "🤖"}
      </button>
    </div>
  );
}
