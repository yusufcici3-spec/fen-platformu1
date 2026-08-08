# 🧪 FenLab — Ortaokul Fen Bilimleri Eğitim Platformu

Ortaokul (5-8. sınıf) öğrencileri için konu anlatımları, soru bankası, deneme sınavları ve
eğitsel oyunlar sunmak üzere tasarlanmış, modüler ve ölçeklenebilir bir web platformunun
**temel altyapısı**.

Bu ilk aşamada sağlam bir mimari kuruldu: kimlik doğrulama, rol bazlı yetkilendirme, veritabanı
şeması, güvenlik katmanları ve tüm sayfa iskeletleri hazır. Konu içerikleri, soru bankası ve
eğitsel oyunların gerçek içerikleri ilerleyen aşamalarda eklenecek.

---

## 🧱 Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Frontend | Next.js 14 (App Router) · React · TypeScript · Tailwind CSS |
| Backend | Node.js · Express.js · TypeScript |
| Veritabanı | PostgreSQL + Prisma ORM |
| Kimlik Doğrulama | JWT (access/refresh) + bcrypt |
| Güvenlik | Helmet, CORS, express-rate-limit, xss-clean, hpp, Zod doğrulama |

## 📁 Klasör Yapısı

```
fen-platform/
├── frontend/          # Next.js uygulaması
│   ├── app/            # Sayfalar (App Router)
│   ├── components/     # UI bileşenleri (layout, home, auth, admin, ui)
│   ├── context/         # Tema ve kimlik doğrulama context'leri
│   └── lib/             # API istemcisi
├── backend/           # Express API
│   └── src/
│       ├── config/       # env, db, upload yapılandırması
│       ├── controllers/  # İstek işleyicileri
│       ├── middleware/   # auth, role, error, rate limit, validate
│       ├── routes/       # API rotaları
│       ├── services/     # İş mantığı (auth vb.)
│       ├── utils/        # jwt, password, apiResponse
│       └── validators/   # Zod şemaları
├── database/          # Prisma şeması + seed
├── public/             # Statik dosyalar (opsiyonel, frontend/public kullanılıyor)
├── uploads/            # Kullanıcı yüklemeleri (avatar, konu görselleri)
└── docs/               # API.md — uç nokta referansı
```

## 👤 Kullanıcı Rolleri

- **Öğrenci (STUDENT):** Konuları görüntüler, soru çözer, ilerlemesini takip eder.
- **Öğretmen (TEACHER):** Konu ve soru oluşturur/düzenler, ödev verir, öğrenci gelişimini izler.
- **Yönetici (ADMIN):** Tüm platformu yönetir (kullanıcılar, konular, sorular, oyunlar,
  denemeler, duyurular).
- **Veli (PARENT):** Bağlı olduğu öğrencinin gelişimini, çalışma sürelerini, deneme
  sonuçlarını ve öğretmen notlarını görüntüler (Aşama 5).

Yetkilendirme, backend'de `requireAuth` + `requireRole(...)` middleware ikilisiyle; frontend'de
`RequireRole` bileşeniyle sağlanır.

---

## 🚀 Kurulum

### Ön Koşullar
- Node.js 18+
- PostgreSQL 14+ (yerel kurulum veya Docker)

### 1. Veritabanını hazırlayın
PostgreSQL'de boş bir veritabanı oluşturun, örn: `fen_platformu`.

### 2. Backend kurulumu
```bash
cd backend
npm install
cp .env.example .env
# .env dosyasındaki DATABASE_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET değerlerini düzenleyin

npm run db:generate    # Prisma Client üretir
npm run db:migrate     # Veritabanı tablolarını oluşturur
npm run db:seed        # Örnek verileri ekler (admin/öğretmen/öğrenci hesapları)

npm run dev            # http://localhost:5000
```

### 3. Frontend kurulumu
```bash
cd frontend
npm install
cp .env.local.example .env.local
# NEXT_PUBLIC_API_URL değerini kontrol edin (varsayılan: http://localhost:5000/api)

npm run dev             # http://localhost:3000
```

### 4. Örnek hesaplarla giriş yapın
Seed işlemi sonrası aşağıdaki hesaplar kullanılabilir (şifre: `Sifre123!`):

| Rol | E-posta |
|---|---|
| Yönetici | admin@fenplatformu.com |
| Öğretmen | ogretmen@fenplatformu.com |
| Öğrenci | ogrenci@fenplatformu.com |
| Veli | veli@fenplatformu.com |

> Veli hesabı, seed verisinde örnek öğrenci hesabına (`ogrenci@fenplatformu.com`) önceden
> bağlanmış durumdadır — `/veli` panelinde doğrudan görünür.

> ⚠️ Bu hesaplar yalnızca geliştirme/test amaçlıdır. Üretime almadan önce mutlaka silin veya
> şifrelerini değiştirin.

---

## 🗺️ Sayfa Haritası

| Yol | Açıklama |
|---|---|
| `/` | Ana sayfa (Hero, Günün Sorusu, Günün Bilgisi, Sınıflar, Son Eklenenler, Popüler Konular, İstatistikler) |
| `/hakkimizda` | Hakkımızda |
| `/iletisim` | İletişim formu |
| `/giris`, `/kayit`, `/sifremi-unuttum` | Kimlik doğrulama sayfaları |
| `/sinif/5` … `/sinif/8` | Sınıf ünite kartları |
| `/sinif/:level/:unitSlug` | Ünite içindeki konu listesi (ilerleme çubuğu ile) |
| `/sinif/:level/:unitSlug/:topicSlug` | Tam konu sayfası (anlatım, kazanım, kavram, deney, medya) |
| `/arama` | Konu / ünite / kazanım / anahtar kelime araması |
| `/pratik?topicId=\|unitId=\|classLevel=` | Serbest soru çözme (pratik) modu |
| `/denemeler` | Deneme sınavları listesi |
| `/denemeler/:examId` | Deneme detayı ve başlatma |
| `/denemeler/:examId/coz/:resultId` | Süreli deneme çözüm ekranı |
| `/denemeler/:examId/sonuc/:resultId` | Deneme sonuç ekranı (kazanım/eksik konu analizi) |
| `/oyunlar` | 10 eğitsel oyunun listesi |
| `/oyunlar/:slug` | Oyunu oyna (tipine göre uygun bileşen render edilir) |
| `/laboratuvar` | Sanal laboratuvar — 14 deney, sınıfa göre gruplu |
| `/laboratuvar/:slug` | Deney detayı + etkileşimli simülasyon + tamamlama |
| `/liderlik-tablosu` | Genel ve haftalık liderlik tablosu |
| `/blog` | Blog (içerik bekliyor) |
| `/ogrenci` | Öğrenci paneli (istatistik özeti + akıllı öneriler) |
| `/ogrenci/favorilerim`, `/ogrenci/yanlislarim`, `/ogrenci/istatistiklerim`, `/ogrenci/laboratuvar-gecmisim` | Favori/yanlış soru listeleri, istatistikler, deney geçmişi |
| `/ogrenci/analiz` | Yapay zekâ destekli gelişim analizi (gelişim puanı, trendler, kazanım oranları) |
| `/ogrenci/takvim` | Günlük çalışma planı, haftalık hedefler, yaklaşan sınavlar |
| `/ogrenci/odevlerim` | Atanan ödevler |
| `/veli`, `/veli/cocuk/:childId` | Veli paneli — çocuk bağlama ve gelişim raporu (PARENT rolü) |
| `/duyurular` | Genel duyuru listesi |
| `/ogretmen` | Öğretmen paneli (+ Konu/Soru/Deneme yönetimine bağlantılar) |
| `/yonetici`, `/.../oyunlar`, `/.../laboratuvar`, `/.../rozetler`, `/.../kullanicilar`, `/.../duyurular` | Yönetici paneli ve alt ekranları |
| `/yonetici/ogrenciler`, `/yonetici/ogrenciler/:studentId` | Öğrenci gelişim raporları + not ekleme — ADMIN ve TEACHER |
| `/yonetici/sinif-analizi` | Sınıf bazlı analiz (ortalama, en zorlanılan kazanımlar) — ADMIN ve TEACHER |
| `/yonetici/odevler` | Ödev oluşturma ve takip — ADMIN ve TEACHER |
| `/yonetici/konular`, `/yonetici/konular/:topicId` | Konu yönetim sistemi — ADMIN ve TEACHER erişebilir |
| `/yonetici/sorular` | Soru bankası yönetimi (filtre, CRUD, Excel/CSV içe aktarma) — ADMIN ve TEACHER erişebilir |
| `/yonetici/denemeler` | Deneme sınavı yönetimi (oluştur, soru seç, yayınla) — ADMIN ve TEACHER erişebilir |

## 🗄️ Veritabanı Tabloları

`Users`, `Roles`, `Classes` (Grades), `Units`, `Topics`, `LearningOutcomes`, `TopicContents`,
`TopicImages`, `TopicVideos`, `TopicPDFs`, `Experiments`, `GlossaryTerms`,
`QuestionCategories`, `QuestionTags`, `Questions`, `QuestionImages`, `QuestionOptions`,
`QuestionSolutions`, `FavoriteQuestions`, `WrongQuestions`, `Exams`, `ExamQuestions`,
`StudentExamResults`, `StudentAnswers`, `Games`, `GameLevels`, `GameScores`,
`GameAchievements`, `Simulations`, `LabExperiments`, `LabExperimentAttempts`,
`DailyChallenges`, `WeeklyChallenges`, `LeaderboardEntries`, `Badges`, `Progress`,
`Announcements`, `ParentChild`, `StudyPlanItems`, `WeeklyGoals`, `StudyTimeLogs`,
`Notifications`, `Assignments`, `AssignmentSubmissions`, `TeacherNotes`,
`AssistantMessages` — tam alan tanımları için `database/schema.prisma` dosyasına bakın.

## 🔐 Güvenlik Önlemleri

- Şifreler **bcrypt** (12 salt round) ile hashlenir.
- Kimlik doğrulama **JWT** (kısa ömürlü access + refresh token) ile yapılır.
- **Zod** ile tüm giriş verileri sunucu tarafında doğrulanır.
- **Prisma ORM** parametrize sorgular kullandığı için SQL enjeksiyonuna karşı doğal koruma sağlar.
- **xss-clean** ve **hpp** ile XSS / parametre kirletme saldırılarına karşı önlem alınır.
- **Helmet** ile güvenli HTTP başlıkları ayarlanır.
- **express-rate-limit** ile genel ve auth uç noktalarına özel istek sınırlaması uygulanır
  (brute-force koruması).
- Oturumlar `httpOnly`, `sameSite=lax` cookie + Bearer token ikilisiyle yönetilir; state
  değiştiren istekler her zaman kimlik doğrulama gerektirir (CSRF yüzeyini daraltır).
- Hatalar merkezi bir `errorHandler` ile yönetilir; üretimde stack trace istemciye sızdırılmaz.

## 📚 Aşama 2: MEB Fen Bilimleri Müfredatı ve Konu Yönetim Sistemi

İkinci aşamada platforma tam kapsamlı, dinamik bir konu yönetim sistemi eklendi.

**Yeni veritabanı tabloları:** `LearningOutcome` (Kazanım), `TopicContent` (zengin metin
içerik blokları), `TopicImage`, `TopicVideo`, `TopicPDF`, `Experiment` (Deney),
`GlossaryTerm` (Kavram). Bunlar mevcut `Topic` modeline ilişkilendirildi; `Class` modeli
şartnamedeki "Grades" tablosunun karşılığı olarak korundu (bkz. şema içi not).

**Yönetim paneli (`/yonetici/konular`, öğretmenler için de erişilebilir):**
- Sınıf sekmeleri (5-8), ünite ekleme/düzenleme/silme, ünite ve konu sıralama (yukarı/aşağı)
- Konu ekleme/silme, her konu için ayrı düzenleme sayfası (`/yonetici/konular/:id`)
- Konu düzenleme sayfasında sekmeler: **Genel**, **İçerik** (Quill zengin metin editörü ile
  Konu Anlatımı / Önemli Bilgiler / Günlük Yaşam Örnekleri blokları), **Kazanımlar**,
  **Kavramlar**, **Deneyler**, **Medya** (görsel/video/PDF yükleme + YouTube video ekleme),
  **Önizleme** (öğrencinin göreceği hâliyle canlı önizleme)

**Öğrenci tarafı:**
- `/sinif/:level` → ünite kartları → `/sinif/:level/:unitSlug` → konu listesi (ilerleme
  çubuğu ve tamamlanan konu işaretleriyle) → `/sinif/:level/:unitSlug/:topicSlug` → tam konu
  sayfası (anlatım, önemli bilgiler, kazanımlar, kavramlar, günlük yaşam örnekleri, deneyler,
  görseller, videolar, PDF özeti, önceki/sonraki konu gezinmesi, "Konuyu Tamamladım" butonu)
- `/arama` → konuya, üniteye, kazanıma ve anahtar kelimeye göre arama

**Müfredat verisi:** `database/seed.ts` içindeki `seedCurriculum()` fonksiyonu; 5, 6, 7 ve
8. sınıflar için MEB müfredatına uygun 2'şer örnek ünite, üniteler başına 2 konu ve her
konu için kazanım, içerik bloğu, kavram, deney ve örnek video kaydı oluşturur. Yönetim
panelinden yeni ünite/konu eklenerek genişletilebilir.

---

## 🧠 Aşama 3: Akıllı Soru Bankası ve Deneme Sınavı Sistemi

Üçüncü aşamada platforma profesyonel bir soru bankası ve deneme sınavı sistemi eklendi.

**Yeni veritabanı tabloları:** `QuestionCategory`, `QuestionTag`, `QuestionImage`,
`QuestionOption`, `QuestionSolution`, `FavoriteQuestion`, `WrongQuestion`,
`StudentExamResult`, `StudentAnswer`. `Question` ve `Exam` modelleri genişletildi
(kazanım/kategori/etiket bağlantıları, `ExamType` enum'u — TOPIC/UNIT/GENERAL/LGS).

**Desteklenen soru tipleri:** Çoktan seçmeli, Doğru/Yanlış, Boşluk doldurma, Eşleştirme,
Açık uçlu, Sürükle-bırak, İnteraktif — hepsi `QuestionType` enum'unda tanımlı ve
`QuestionCard` bileşeninde render edilir. Görselli sorular `QuestionImage` ilişkisiyle,
senaryolu ve yeni nesil sorular `isScenario` / `isNextGen` bayraklarıyla desteklenir.

**Güvenlik notu:** Doğru cevap bilgisi (`correctAnswer`, `QuestionOption.isCorrect`,
`QuestionSolution`) öğrenci rolündeki kullanıcılara API seviyesinde asla gönderilmez
(`utils/questionSecurity.ts`); doğruluk kontrolü her zaman sunucuda yapılır.

**Öğretmen/Yönetici (`/yonetici/sorular`, `/yonetici/denemeler`):**
- Soru ekle/düzenle/sil, sınıf/tip/zorluk/anahtar kelimeye göre filtrele
- Excel/CSV ile toplu soru içe aktarma (`xlsx` paketiyle ayrıştırılır)
- Deneme oluştur (konu/ünite/genel/LGS tipi), soru bankasından soru seç, yayınla/taslağa al

**Öğrenci tarafı:**
- Konu ve ünite sayfalarından "Soru Çöz" ile serbest pratik modu (`/pratik`)
- `/ogrenci/favorilerim` ve `/ogrenci/yanlislarim` — kaydedilen/yanlış yapılan soruları tekrar çözme
- `/ogrenci/istatistiklerim` — toplam/doğru/yanlış/boş, başarı yüzdesi, günlük & haftalık grafik
  (recharts), en başarılı ve en çok zorlanılan konular
- `/denemeler` → deneme başlat → süreli çözüm ekranı (otomatik kaydetme) → sonuç ekranı
  (doğru/yanlış/boş sayısı, başarı yüzdesi, eksik konu raporu)
- Öğrenci panelinde kural tabanlı "akıllı öneriler": eksik konular, önerilen zorluk
  seviyesi, günlük soru hedefi (`/oneriler`)

**Örnek veri:** `seed.ts` içindeki `seedQuestionBank()`; her yayınlanmış konu için
kazanım/kavram tabanlı 2 soru (çoktan seçmeli + doğru-yanlış), 3 soru kategorisi, 8
etiket ve 4 örnek deneme (konu/ünite/genel/LGS tipi, her biri ilgili sorularla) oluşturur.

**Bilinen sınırlama:** Eşleştirme/sürükle-bırak soruları için basitleştirilmiş bir
seçim arayüzü kullanılır; bu tiplerin otomatik puanlaması, MEB standardı bir eşleştirme
formatı tanımlandığında daha da hassaslaştırılabilir (şu an serbest metin karşılaştırması
kullanılır — çoktan seçmeli/doğru-yanlış/boşluk doldurma tipleri tam otomatik puanlanır).

---

## 🎮 Aşama 4: Eğitsel Oyunlar, Sanal Laboratuvar ve Etkileşimli Öğrenme

Dördüncü aşamada platforma 10 tam çalışır eğitsel oyun, sanal laboratuvar (5 özel
etkileşimli simülasyon + 9 genel etkileşimli aktivite ile toplam 14 deney), günlük görev
sistemi, haftalık etkinlikler ve liderlik tablosu eklendi.

**Yeni veritabanı tabloları:** `GameLevel`, `GameScore`, `GameAchievement`, `Simulation`,
`LabExperiment`, `LabExperimentAttempt`, `DailyChallenge`, `WeeklyChallenge`,
`LeaderboardEntry`. `Game` modeli 10 oyun tipini kapsayan yeni bir `GameType` enum'uyla
genişletildi; `User` modeline `points`, `currentStreak`, `longestStreak`,
`lastActiveDate` alanları eklendi.

**10 Eğitsel Oyun** (`components/games/`, hepsi ses efektli — Web Audio API ile, dosya
gerektirmez — ve mobil uyumlu): Fen Bilgisi Yarışması (Quiz), Kavram Eşleştirme, Hafıza
Kartları, Kelime Avı (gerçek harf ızgarası üretici algoritmasıyla), Adam Asmaca,
Sürükle-Bırak Etkinlikleri, Doğru-Yanlış Maratonu (seri çarpanlı), Çarkıfelek (SVG
animasyonlu), Bilim Macerası (bölüm bölüm ilerleyen harita), Rozet Avı (etkileşimli
rozet keşif vitrini). Oyun bittiğinde skor `POST /oyunlar/:id/skor` ile kaydedilir; bu
tek çağrı puan ekler, günlük "1 oyun bitir" görevini ilerletir, aktif gün serisini
günceller ve ilgili rozet eşiklerini kontrol eder.

**Sanal Laboratuvar** (`components/labs/`, `/laboratuvar`): 5 deney için özel,
gerçekten etkileşimli simülasyon (Basit Elektrik Devresi — anahtar/pil bağlama; Asit-Baz
— turnusol testi; Maddenin Hâl Değişimleri — sıcaklık kaydırıcılı parçacık animasyonu;
Yoğunluk Deneyi — nesne bırakma/batma-yüzme; Güneş Sistemi — tıklanabilir yörünge
animasyonu). Kalan 9 deney (Isı Alışverişi, Basınç, Kuvvet ve Hareket, Işığın Kırılması,
Aynalar, DNA Modeli, Hücre Modeli, Fotosentez, Solunum) `GenericLabActivity` içinde her
biri için özel tasarlanmış, gerçek kontrollerle (kaydırıcı, tıklanabilir sıcak nokta,
buton) çalışan hafif etkileşimli bileşenler kullanır — hiçbiri statik metin değildir.
Her deney sayfası amaç/malzeme/adım/sonuç/güvenlik uyarısı alanlarını da gösterir.

**Günlük Görev Sistemi:** Bir kullanıcı ilk eriştiğinde o güne özel 4 görev
(`getOrCreateTodayChallenges`) otomatik oluşturulur: 10 soru çöz, 1 konu tamamla, 1 deney
yap, 1 oyun bitir. İlgili aksiyonlar gerçekleştiğinde (`utils/gamification.ts` üzerinden
soru cevaplama, konu tamamlama, oyun bitirme, deney tamamlama noktalarına bağlanmıştır)
ilerleme otomatik güncellenir; tamamlanınca puan verilir.

**Haftalık Etkinlikler ve Liderlik Tablosu:** Her sınıf seviyesi için haftalık bir
`WeeklyChallenge` otomatik oluşturulur; `GameScore` toplamına göre canlı sıralama
hesaplanır. Yönetici haftayı sonlandırdığında (`POST .../sonuclandir`) en yüksek puanlı
öğrenciye "Haftanın Birincisi" rozeti verilir. `/liderlik-tablosu` sayfası genel
(toplam puan) ve haftalık sıralamaları gösterir.

**Rozet Kataloğu (8 rozet, `seed.ts`):** İlk Adım, Fen Ustası, Bilim Kâşifi, Deney
Uzmanı, Soru Şampiyonu, LGS Hazır, 100 Günlük Seri, Haftanın Birincisi — kural tabanlı
eşiklerle otomatik verilir (`checkAndAwardMilestoneBadges`).

**Öğrenci paneli:** Günlük görevler ve rozet vitrini widget'ları ana sayfada; ayrı
`/ogrenci/laboratuvar-gecmisim` (tamamlanan deneyler) ve `/liderlik-tablosu` sayfaları.

**Yönetim paneli:** `/yonetici/oyunlar`, `/yonetici/laboratuvar`, `/yonetici/rozetler` —
öğretmen panelinden de erişilebilir.

**Bilinen sınırlıklar** (dürüstçe belgelenmiştir): `GameLevel` (seviye) verisi API'de
mevcut ve seed ile dolduruluyor, ancak oyun arayüzlerinde henüz seviye seçimi UI'ı yok
(oyunlar sabit içsel zorluk/süre ile çalışır). Haftalık etkinlik için ayrı bir sayfa
yerine `/liderlik-tablosu`'ndaki "Bu Hafta" sekmesi aynı canlı veriyi gösterir. Gerçek bir
dağıtımda `WeeklyChallenge` sonlandırması bir cron/zamanlanmış görevle otomatikleştirilir;
şu an yönetici tarafından manuel tetiklenir.

---

## 🤖 Aşama 5: Yapay Zekâ Destekli Kişiselleştirilmiş Öğrenme ve Gelişmiş Analiz

Beşinci aşamada platforma her öğrencinin seviyesini analiz eden, eksiklerini belirleyen,
kişiselleştirilmiş çalışma planı oluşturan ve gelişimini takip eden bir sistem eklendi.
Ayrıca **Veli** adında yeni bir kullanıcı rolü tanıtıldı.

**Yeni veritabanı tabloları:** `ParentChild`, `StudyPlanItem`, `WeeklyGoal`, `StudyTimeLog`,
`Notification`, `Assignment`, `AssignmentSubmission`, `TeacherNote`, `AssistantMessage`.
`User` modeline `points`/`currentStreak` zaten Aşama 4'te eklenmişti; bu aşamada bunlar
analiz motorunun girdisi olarak kullanılıyor. `RoleName` enum'una `PARENT` eklendi.

**Yapay Zekâ Analiz Motoru** (`services/analysis.service.ts`): Çözülen sorular, doğru/yanlış
oranı, çalışma süresi (`StudyTimeLog`), tamamlanan konular, deneme sonuçları ve oyun
performansını tek bir raporda birleştirir: günlük/haftalık/aylık grafikler, en güçlü/zayıf
konular, kazanım bazlı başarı oranları, ortalama soru çözme süresi, deneme ve oyun
performans özetleri ve ağırlıklı bir **"Genel Gelişim Puanı"** (0-100). Bu, açık ve
denetlenebilir **kural tabanlı** bir motordur (gerçek bir ML modeli değildir) — mimarisi
ileride bir istatistik/ML modeliyle değiştirilebilecek şekilde modülerdir.

**Akıllı Çalışma Planı** (`services/studyPlan.service.ts`): Öğrenci ilk girişinde günlük
plan otomatik oluşturulur (zayıf konu tekrarı, soru pratiği — yanlışlar önceliklendirilir,
deney, oyun); süre önerisi öğrencinin genel başarı oranına göre ayarlanır (düşük başarı →
daha kısa/sık bloklar). Haftalık hedefler, son 4 haftanın ortalamasının %10 üzerine
otomatik belirlenir ve gerçekleşen değerlerle karşılaştırılır.

**Gelişmiş Analiz Paneli** (`/ogrenci/analiz`): Dairesel gelişim puanı göstergesi, üç
zaman ölçeğinde trend grafiği (recharts), güçlü/zayıf konular, kazanım bazlı başarı
çubukları, deneme ve oyun performans kartları.

**Takvim ve Planlama** (`/ogrenci/takvim`): Günlük plan (tamamla butonlu), haftalık hedef
çubukları, yaklaşan sınavlar listesi, çalışma serisi göstergesi.

**Bildirim Sistemi**: Uygulama içi (`Notification` tablosu) bildirimler; rozet kazanma,
yeni konu/deneme yayını, yeni ödev, öğretmen notu ve duyuru anlarında otomatik tetiklenir
(`utils/notification.ts`). Header'daki 🔔 ikonu okunmamış sayısını gösterir, 60 saniyede
bir günceller.

**Yapay Zekâ Destekli Yardımcı** (`services/aiProvider.ts`, sağ altta yüzen sohbet
widget'ı): `ANTHROPIC_API_KEY` ortam değişkeni tanımlıysa gerçek bir Claude modeli
çağrılır; tanımlı değilse **kural tabanlı bir yedek moda** otomatik geçilir — böylece
özellik harici bir API anahtarı olmadan da eksiksiz çalışır. Her iki modda da sistem
kuralı aynıdır: asistan sorunun cevabını doğrudan vermez, Sokratik ipuçlarıyla öğrenciyi
yönlendirir.

**Öğretmen Paneli:** `/yonetici/ogrenciler` (sınıf bazlı öğrenci listesi → tekil gelişim
raporu + not ekleme), `/yonetici/sinif-analizi` (sınıf ortalaması + en çok zorlanılan
kazanımlar), `/yonetici/odevler` (ödev oluşturma — sınıfa otomatik bildirim gönderir),
`/yonetici/duyurular` artık sınıfa veya herkese hedeflenebilir.

**Veli Paneli** (`/veli`, yeni PARENT rolü): Öğrenci hesabını e-posta ile bağlama, bağlı
çocukların listesi, her çocuk için ayrıntılı gelişim raporu + çalışma süresi + son deneme
sonuçları + öğretmen notları.

**Performans:** `utils/cache.ts` ile basit bellek-içi önbellekleme (liderlik tablosu ve
sınıf analizi gibi ağır sorgular için); ileride Redis'e geçişi kolaylaştıracak
get/set/invalidate arayüzü. Loglama zaten `morgan` ile (Aşama 1) mevcuttu.

---

## 🧩 Sonraki Aşamalar (bu sürümde kapsam dışı)

- Kullanıcı yönetim ekranının API'ye tam bağlanması (liste/aktiflik zaten çalışıyor;
  rol değiştirme gibi ek işlemler eklenebilir)
- Açık uçlu soruların öğretmen tarafından manuel değerlendirilmesi arayüzü (şu an
  `isCorrect: null` olarak kaydediliyor, puanlamaya dahil edilmiyor)
- Eşleştirme/sürükle-bırak sorularının tam otomatik (yapılandırılmış) puanlanması
- Oyun seviye (`GameLevel`) seçimi için öğrenci arayüzü (API/seed hazır, UI'da henüz yok)
- Haftalık etkinlik sonlandırmasının zamanlanmış görev (cron) ile otomatikleştirilmesi
  (şu an yönetici tarafından manuel tetikleniyor)
- Bildirimlerin e-posta/push kanallarına genişletilmesi (şu an yalnızca uygulama içi;
  şifre sıfırlama bağlantısı da benzer şekilde yalnızca sunucu loglarına yazılıyor)
- AI analiz/öneri motorlarının gerçek bir istatistik/ML modeliyle değiştirilmesi (şu an
  açık, denetlenebilir kural tabanlı motorlar — bkz. Aşama 3 ve 5 notları)
- Refresh token rotasyonu ve oturum yönetiminin genişletilmesi
- Zengin metin editöründen gelen HTML içeriğin sunucu tarafında sanitize edilmesi (şu an
  yalnızca ADMIN/TEACHER rolündeki güvenilir kullanıcılar içerik oluşturabildiği için
  DOMPurify vb. bir kütüphane entegrasyonu bir sonraki güvenlik sertleştirme adımına bırakıldı)
- Önbellekleme katmanının (şu an bellek-içi) Redis gibi paylaşılan bir önbelleğe taşınması
  (çok sunuculu/yatay ölçeklenen dağıtımlar için — `utils/cache.ts` bu geçişi kolaylaştıracak
  şekilde tasarlandı)
- Otomatik veritabanı yedekleme ve APM (performans izleme) altyapısı — bunlar uygulama
  kodundan çok dağıtım/altyapı katmanına ait olduğu için README'de dağıtım notu olarak
  bırakıldı: üretimde `pg_dump` ile zamanlanmış yedekleme ve bir APM aracı (ör. Sentry,
  Datadog) entegrasyonu önerilir

---

Sorularınız için `docs/API.md` dosyasındaki uç nokta referansına göz atabilirsiniz.
