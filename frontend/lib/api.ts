const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  details?: unknown;
}

interface RequestOptions extends RequestInit {
  token?: string | null;
}

const STORAGE_KEY = "fen-platformu-oturum";

async function renewAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const response = await fetch(`${API_URL}/auth/yenile`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const json = await response.json();
    const nextToken = json?.data?.accessToken;
    if (typeof nextToken !== "string") return null;

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const current = JSON.parse(raw);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, accessToken: nextToken }));
      } catch {
        // Oturum kaydı bozuksa yeni token'ı uygulama belleğinde kullanmaya devam et.
      }
    }
    window.dispatchEvent(new CustomEvent("fen-auth-token-refreshed", { detail: { accessToken: nextToken } }));
    return nextToken;
  } catch {
    return null;
  }
}

/**
 * Backend API istekleri. Access token süresi dolarsa HttpOnly refresh cookie
 * üzerinden sessizce yeniler ve başarısız isteği bir kez tekrarlar.
 */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { token, headers, ...rest } = options;

  const send = (activeToken?: string | null) =>
    fetch(`${API_URL}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
        ...headers,
      },
      credentials: "include",
      cache: options.cache ?? "no-store",
    });

  let res = await send(token);
  if (res.status === 401 && typeof window !== "undefined" && path !== "/auth/yenile" && path !== "/auth/giris" && path !== "/auth/kayit") {
    const renewed = await renewAccessToken();
    if (renewed) res = await send(renewed);
  }

  const json = (await res.json().catch(() => ({ success: false, message: "Sunucu yanıtı okunamadı." }))) as ApiResponse<T>;
  if (!res.ok) throw new Error(json.message ?? "Bir hata oluştu.");
  return json;
}
