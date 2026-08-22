"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuth, AuthUser } from "@/context/AuthContext";

export function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "TEACHER" | "PARENT">("STUDENT");
  const [classLevel, setClassLevel] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await apiFetch<{ accessToken: string; user: AuthUser }>("/auth/kayit", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role,
          ...(role === "STUDENT" ? { classLevel } : {}),
        }),
      });

      if (res.data) {
        login(res.data.user, res.data.accessToken);
        router.push(role === "STUDENT" ? "/ogrenci" : role === "PARENT" ? "/veli" : "/ogretmen");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt oluşturulamadı.");
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

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium" htmlFor="firstName">Ad</label>
          <input
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="lastName">Soyad</label>
          <input
            id="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="email">E-posta</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      <div>
        <label className="text-sm font-medium" htmlFor="password">Şifre</label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="En az 8 karakter, büyük/küçük harf ve rakam"
          className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      <div>
        <span className="text-sm font-medium">Rol</span>
        <div className="mt-1 grid grid-cols-3 gap-2">
          {(["STUDENT", "PARENT"] as const).map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setRole(r)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                role === r
                  ? "border-beaker bg-beaker/10 text-beaker-dark dark:text-beaker-light"
                  : "border-lab-paperLine dark:border-white/10"
              }`}
            >
              {r === "STUDENT" ? "Öğrenci" : r === "TEACHER" ? "Öğretmen" : "Veli"}
            </button>
          ))}
        </div>
      </div>

      {role === "STUDENT" && (
        <div>
          <label className="text-sm font-medium" htmlFor="classLevel">Sınıf</label>
          <select
            id="classLevel"
            value={classLevel}
            onChange={(e) => setClassLevel(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          >
            {[5, 6, 7, 8].map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}. Sınıf
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-beaker px-6 py-3 text-sm font-semibold text-white shadow-md shadow-beaker/30 transition hover:bg-beaker-dark disabled:opacity-60"
      >
        {isSubmitting ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
      </button>

      <p className="text-center text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Zaten hesabınız var mı?{" "}
        <Link href="/giris" className="font-semibold text-beaker hover:underline">
          Giriş yapın
        </Link>
      </p>
    </form>
  );
}
