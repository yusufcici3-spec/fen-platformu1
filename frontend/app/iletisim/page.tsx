import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "İletişim" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="İletişim"
        title="Bize ulaşın"
        description="Soru, öneri veya iş birliği talepleriniz için formu doldurabilirsiniz."
      />
      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Card>
          <h2 className="font-display text-lg font-semibold">İletişim Bilgileri</h2>
          <ul className="mt-4 space-y-3 text-sm text-lab-inkMuted dark:text-lab-paper/70">
            <li>📧 destek@fenplatformu.com</li>
            <li>📍 Türkiye</li>
            <li>🕐 Hafta içi 09:00 - 18:00</li>
          </ul>
        </Card>

        {/* NOT: Form gönderimi backend'e bağlanacak - şimdilik arayüz hazır */}
        <Card>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="ad">Ad Soyad</label>
              <input
                id="ad"
                name="ad"
                type="text"
                placeholder="Adınız Soyadınız"
                className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="eposta">E-posta</label>
              <input
                id="eposta"
                name="eposta"
                type="email"
                placeholder="ornek@eposta.com"
                className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="mesaj">Mesajınız</label>
              <textarea
                id="mesaj"
                name="mesaj"
                rows={4}
                placeholder="Mesajınızı yazın..."
                className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
              />
            </div>
            <button
              type="submit"
              disabled
              title="Bu form yakında aktif edilecek"
              className="w-full cursor-not-allowed rounded-full bg-beaker/50 px-6 py-3 text-sm font-semibold text-white"
            >
              Gönder (yakında aktif)
            </button>
          </form>
        </Card>
      </section>
    </>
  );
}
