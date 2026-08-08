"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuth, AuthUser } from "@/context/AuthContext";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await apiFetch<{ accessToken: string; user: AuthUser }>("/auth/giris", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res.data) {
        login(res.data.user, res.data.accessToken);
        const target =
          res.data.user.role === "ADMIN"
            ? "/yonetici"
            : res.data.user.role === "TEACHER"
            ? "/ogretmen"
            : res.data.user.role === "PARENT"
            ? "/veli"
            : "/ogrenci";
        router.push(target);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş yapılamadı.");
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

      <div>
        <label className="text-sm font-medium" htmlFor="email">
          E-posta
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

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium" htmlFor="password">
            Şifre
          </label>
          <Link href="/sifremi-unuttum" className="text-xs font-medium text-beaker hover:underline">
            Şifremi unuttum
          </Link>
        </div>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-beaker px-6 py-3 text-sm font-semibold text-white shadow-md shadow-beaker/30 transition hover:bg-beaker-dark disabled:opacity-60"
      >
        {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>

      <p className="text-center text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Hesabınız yok mu?{" "}
        <Link href="/kayit" className="font-semibold text-beaker hover:underline">
          Kayıt olun
        </Link>
      </p>
    </form>
  );
}
