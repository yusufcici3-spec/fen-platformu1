import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Giriş Yap" };

export default function LoginPage() {
  return (
    <section className="grid-paper-bg flex min-h-[80vh] items-center justify-center px-4 py-14">
      <div className="w-full max-w-md rounded-card border border-lab-paperLine bg-white p-8 shadow-lg dark:border-white/10 dark:bg-lab-inkSoft">
        <div className="mb-6 text-center">
          <span className="text-3xl">🧪</span>
          <h1 className="mt-2 font-display text-2xl font-bold">Tekrar hoş geldin!</h1>
          <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
            Öğrenmeye kaldığın yerden devam et.
          </p>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
