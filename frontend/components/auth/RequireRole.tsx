"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";

/**
 * Belirtilen rollerden birine sahip olmayan (veya giriş yapmamış)
 * kullanıcıları giriş sayfasına yönlendirir.
 */
export function RequireRole({ roles, children }: { roles: UserRole[]; children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || !roles.includes(user.role))) {
      router.replace("/giris");
    }
  }, [isLoading, user, roles, router]);

  if (isLoading || !user || !roles.includes(user.role)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Yükleniyor...</p>
      </div>
    );
  }

  return <>{children}</>;
}
