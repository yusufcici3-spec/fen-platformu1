/**
 * Basit, bağımlılıksız bellek-içi önbellek. Sık istenen ama sık değişmeyen
 * ağır sorguları (liderlik tablosu, analiz raporu gibi) kısa süreliğine
 * önbelleğe alarak veritabanı yükünü azaltır.
 *
 * NOT: Tek process içi bir Map kullanır; yatay ölçeklenen (birden fazla
 * sunucu instance'ı) bir dağıtımda bunun yerine Redis gibi paylaşılan bir
 * önbellek kullanılmalıdır. API tasarımı (get/set/invalidate) bu geçişi
 * kolaylaştıracak şekildedir.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();

/** Anahtara karşılık gelen değeri döner; süresi dolmuşsa/yoksa null. */
export function cacheGet<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value as T;
}

/** Değeri belirtilen saniye kadar önbelleğe alır. */
export function cacheSet<T>(key: string, value: T, ttlSeconds: number): void {
  store.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}

/** Önbellekte yoksa `compute` ile hesaplayıp saklayan, varsa doğrudan dönen yardımcı. */
export async function cacheOrCompute<T>(key: string, ttlSeconds: number, compute: () => Promise<T>): Promise<T> {
  const cached = cacheGet<T>(key);
  if (cached !== null) return cached;
  const value = await compute();
  cacheSet(key, value, ttlSeconds);
  return value;
}

/** Bir anahtarı (veya prefix ile başlayan tüm anahtarları) önbellekten temizler. */
export function cacheInvalidate(prefixOrKey: string): void {
  for (const key of store.keys()) {
    if (key === prefixOrKey || key.startsWith(prefixOrKey)) store.delete(key);
  }
}
