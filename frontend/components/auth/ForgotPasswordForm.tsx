"use client";

import { useState, FormEvent } from "react";
import { apiFetch } from "@/lib/api";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      const res = await apiFetch<null>("/auth/sifremi-unuttum", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setMessage(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "İstek gönderilemedi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-reaction/40 bg-reaction/10 px-4 py-3 text-sm text-reaction-dark">
          {error}
        </div>
      )}
      {message && (
        <div className="rounded-lg border border-leaf/40 bg-leaf/10 px-4 py-3 text-sm text-leaf">
          {message}
        </div>
      )}

      <div>
        <label className="text-sm font-medium" htmlFor="email">
          E-posta adresiniz
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@eposta.com"
          className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-beaker px-6 py-3 text-sm font-semibold text-white shadow-md shadow-beaker/30 transition hover:bg-beaker-dark disabled:opacity-60"
      >
        {isSubmitting ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
      </button>
    </form>
  );
}
