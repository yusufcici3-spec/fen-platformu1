import Link from "next/link";

const COLUMNS = [
  {
    title: "Sınıflar",
    links: [
      { href: "/sinif/5", label: "5. Sınıf" },
      { href: "/sinif/6", label: "6. Sınıf" },
      { href: "/sinif/7", label: "7. Sınıf" },
      { href: "/sinif/8", label: "8. Sınıf" },
    ],
  },
  {
    title: "Platform",
    links: [
      { href: "/denemeler", label: "Denemeler" },
      { href: "/oyunlar", label: "Oyunlar" },
      { href: "/blog", label: "Blog" },
      { href: "/hakkimizda", label: "Hakkımızda" },
    ],
  },
  {
    title: "Destek",
    links: [
      { href: "/iletisim", label: "İletişim" },
      { href: "/giris", label: "Giriş Yap" },
      { href: "/kayit", label: "Kayıt Ol" },
      { href: "/sifremi-unuttum", label: "Şifremi Unuttum" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-lab-paperLine/70 bg-lab-paper dark:border-white/10 dark:bg-lab-ink">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-beaker text-white">🧪</span>
              FenLab
            </div>
            <p className="mt-3 max-w-xs text-sm text-lab-inkMuted dark:text-lab-paper/60">
              Ortaokul öğrencileri için hazırlanmış, meraklı zihinler için tasarlanmış fen bilimleri
              öğrenme platformu.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-lab-inkMuted dark:text-lab-paper/50">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-lab-inkMuted transition hover:text-beaker dark:text-lab-paper/70"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-lab-paperLine/70 pt-6 text-xs text-lab-inkMuted dark:border-white/10 dark:text-lab-paper/50 sm:flex-row">
          <p>© {new Date().getFullYear()} FenLab. Tüm hakları saklıdır.</p>
          <p>Meraklı zihinler için, sabırla inşa edildi. 🔬</p>
        </div>
      </div>
    </footer>
  );
}
