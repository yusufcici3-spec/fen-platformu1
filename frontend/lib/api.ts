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

/**
 * Backend API'sine istek atan merkezi fonksiyon.
 * Sunucu tarafında (Server Component) ve istemci tarafında da kullanılabilir.
 */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { token, headers, ...rest } = options;

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    credentials: "include",
    // Ana sayfa gibi içerikler için kısa süreli önbellek; ihtiyaca göre override edilebilir
    cache: options.cache ?? "no-store",
  });

  const json = (await res.json().catch(() => ({ success: false, message: "Sunucu yanıtı okunamadı." }))) as ApiResponse<T>;

  if (!res.ok) {
    throw new Error(json.message ?? "Bir hata oluştu.");
  }

  return json;
}
