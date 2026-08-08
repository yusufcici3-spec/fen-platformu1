# API Referansı

Taban URL: `http://localhost:5000/api`

Tüm yanıtlar şu formattadır:
```json
{ "success": true, "message": "...", "data": {} }
```

## Kimlik Doğrulama (`/auth`)
| Yöntem | Yol | Açıklama | Yetki |
|---|---|---|---|
| POST | `/auth/kayit` | Yeni kullanıcı kaydı | Herkes |
| POST | `/auth/giris` | Giriş yapar, JWT döner | Herkes |
| POST | `/auth/cikis` | Oturumu kapatır | Herkes |
| POST | `/auth/sifremi-unuttum` | Şifre sıfırlama e-postası tetikler | Herkes |
| POST | `/auth/sifre-sifirla` | Token ile şifreyi günceller | Herkes |
| GET | `/auth/ben` | Giriş yapmış kullanıcı bilgisi | Giriş yapmış |

## Sınıflar (`/siniflar`)
| GET | `/siniflar` | Tüm sınıfları listeler |
| GET | `/siniflar/:slug` | Sınıf detayı (üniteler + konular) |

## Konular (`/konular`)
| GET | `/konular` | Yayınlanmış konuları listeler (`?classLevel=5`) |
| GET | `/konular/:slug` | Konu detayı |
| POST | `/konular` | Yeni konu (ADMIN, TEACHER) |
| PUT | `/konular/:id` | Konu güncelle (ADMIN, TEACHER) |
| DELETE | `/konular/:id` | Konu sil (ADMIN) |

## Sorular (`/sorular`) — ADMIN, TEACHER
| GET | `/sorular` | Sayfalanmış liste (`?page=1&pageSize=20`) |
| GET | `/sorular/:id` | Soru detayı |
| POST | `/sorular` | Yeni soru |
| PUT | `/sorular/:id` | Soru güncelle |
| DELETE | `/sorular/:id` | Soru sil (ADMIN) |

## Denemeler (`/denemeler`)
| GET | `/denemeler` | Yayınlanmış denemeler (`?classLevel=7`) |
| GET | `/denemeler/:id` | Deneme + sorular |
| POST/PUT/DELETE | ADMIN, TEACHER |

## Oyunlar (`/oyunlar`)
| GET | `/oyunlar` | Yayınlanmış oyunlar (`?classLevel=6`) |
| GET | `/oyunlar/:id` | Oyun detayı |
| POST/PUT/DELETE | ADMIN, TEACHER |

## Kullanıcılar (`/kullanicilar`) — yalnızca ADMIN
| GET | `/kullanicilar` | Sayfalanmış kullanıcı listesi |
| PATCH | `/kullanicilar/:id/durum` | Aktif/pasif durumunu değiştirir |

## Duyurular (`/duyurular`)
| GET | `/duyurular` | Tüm duyurular |
| POST/PUT/DELETE | ADMIN |

## Ana Sayfa (`/anasayfa`)
| GET | `/anasayfa/istatistikler` | Kullanıcı/konu/soru/oyun sayıları |
| GET | `/anasayfa/son-eklenenler` | Son eklenen 6 konu |

## Dosya Yükleme (`/yukleme`)
| POST | `/yukleme/avatar` | Profil fotoğrafı (form-data: `avatar`) |
| POST | `/yukleme/konu-gorseli` | Konu kapak görseli (ADMIN, TEACHER) |

---

## Aşama 2: MEB Müfredatı ve Konu Yönetim Sistemi

### Üniteler (`/uniteler`)
| GET | `/uniteler?classId=...` | Bir sınıfa ait üniteleri listeler |
| GET | `/uniteler/:id` | Ünite detayı (konularıyla birlikte) |
| POST | `/uniteler` | Yeni ünite (ADMIN, TEACHER) |
| PUT | `/uniteler/:id` | Ünite güncelle (ADMIN, TEACHER) |
| DELETE | `/uniteler/:id` | Ünite sil (ADMIN) |
| POST | `/uniteler/siralama/kaydet` | Ünite sırasını topluca günceller — body: `{ orderedIds: string[] }` |

### Konular (`/konular`) — genişletildi
| GET | `/konular?classLevel=5&unitId=...` | Yayınlanmış konuları listeler |
| GET | `/konular/:slug?unitSlug=...` | Konu detayı — kazanım, içerik, medya, deney, kavram, önceki/sonraki konu dahil |
| GET | `/konular/yonetim/:id` | (ADMIN, TEACHER) Taslak dahil konu detayı, ID ile |
| POST | `/konular` | Yeni konu (ADMIN, TEACHER) |
| PUT | `/konular/:id` | Konu güncelle (ADMIN, TEACHER) |
| DELETE | `/konular/:id` | Konu sil (ADMIN) |
| POST | `/konular/siralama/kaydet` | Konu sırasını topluca günceller |

### Kazanımlar (`/kazanimlar`)
| GET | `/kazanimlar?topicId=...` | Kazanımları listeler |
| POST/PUT/DELETE | ADMIN, TEACHER |

### Konu İçerik Blokları (`/konu-icerikleri`)
Zengin metin editöründen gelen içerik blokları (`EXPLANATION` / `IMPORTANT_INFO` / `DAILY_LIFE`).
| GET | `/konu-icerikleri?topicId=...` | İçerik bloklarını listeler |
| POST/PUT/DELETE | ADMIN, TEACHER |

### Medya (`/medya`) — ADMIN, TEACHER
| POST | `/medya/gorseller/dosya-yukle` | Görsel dosyası yükler, `{ url }` döner |
| POST | `/medya/gorseller` | Yüklenen/harici görseli konuya kaydeder |
| DELETE | `/medya/gorseller/:id` | Görsel siler |
| POST | `/medya/videolar/dosya-yukle` | Video dosyası yükler |
| POST | `/medya/videolar` | YouTube veya yüklenen videoyu konuya kaydeder |
| DELETE | `/medya/videolar/:id` | Video siler |
| POST | `/medya/pdfler/dosya-yukle` | PDF dosyası yükler |
| POST | `/medya/pdfler` | PDF'i konuya kaydeder |
| DELETE | `/medya/pdfler/:id` | PDF siler |

### Deneyler (`/deneyler`)
| GET | `/deneyler?topicId=...` | Deneyleri listeler |
| POST/PUT/DELETE | ADMIN, TEACHER |

### Kavramlar (`/kavramlar`)
| GET | `/kavramlar?topicId=...` | Kavramları listeler |
| POST/PUT/DELETE | ADMIN, TEACHER |

### Arama (`/arama`)
| GET | `/arama?q=gezegen&classLevel=5` | Konu, ünite ve kazanımlarda anahtar kelime arar |

### İlerleme (`/ilerleme`) — giriş yapmış kullanıcı
| GET | `/ilerleme` | Kendi ilerleme kayıtlarını listeler |
| POST | `/ilerleme` | Bir konudaki ilerlemeyi günceller — body: `{ topicId, completion, score? }` |


---

Kimlik doğrulama gerektiren uç noktalarda `Authorization: Bearer <accessToken>` başlığı
gönderilmelidir.

---

## Aşama 3: Akıllı Soru Bankası ve Deneme Sınavı Sistemi

### Sorular (`/sorular`) — genişletildi
| GET | `/sorular?classLevel=&unitId=&topicId=&learningOutcomeId=&difficulty=&type=&tag=&category=&q=&page=&pageSize=` | Filtrelenmiş soru listesi (öğrenciye cevap gizlenir) |
| GET | `/sorular/rastgele?topicId=\|unitId=\|classLevel=&difficulty=&excludeIds=` | Rastgele soru getirir |
| GET | `/sorular/favorilerim` | (giriş) Favori sorular |
| GET | `/sorular/yanlislarim` | (giriş) Çözülmemiş yanlış sorular |
| GET | `/sorular/:id` | Soru detayı |
| POST | `/sorular/:id/pratik-cevap` | Deneme dışı serbest pratik cevabı değerlendirir |
| POST | `/sorular/:id/favori` | (giriş) Favori ekle/çıkar (toggle) |
| POST | `/sorular` | (ADMIN, TEACHER) Yeni soru + şıklar |
| PUT | `/sorular/:id` | (ADMIN, TEACHER) Soru güncelle |
| DELETE | `/sorular/:id` | (ADMIN) Soru sil |
| POST | `/sorular/toplu-yukle` | (ADMIN, TEACHER) Excel/CSV ile toplu soru içe aktarma (form-data: `file`) |

### Denemeler (`/denemeler`) — genişletildi
| GET | `/denemeler?classLevel=&type=` | Yayınlanmış denemeler |
| GET | `/denemeler/yonetim` | (ADMIN, TEACHER) Taslak dahil tüm denemeler |
| GET | `/denemeler/:id` | Deneme detayı (soruları ile) |
| POST | `/denemeler` | (ADMIN, TEACHER) Yeni deneme (type: TOPIC/UNIT/GENERAL/LGS) |
| PUT | `/denemeler/:id` | Deneme güncelle |
| DELETE | `/denemeler/:id` | (ADMIN) Deneme sil |

### Deneme Oturumları (`/deneme-oturumlari`) — giriş yapmış kullanıcı
| GET | `/deneme-oturumlari/gecmisim` | Kendi deneme geçmişi |
| POST | `/deneme-oturumlari/baslat` | Deneme başlatır — body: `{ examId }` |
| POST | `/deneme-oturumlari/cevapla` | Tek soruya cevap gönderir (otomatik değerlendirilir) |
| POST | `/deneme-oturumlari/:resultId/bitir` | Denemeyi bitirir, puanlar hesaplanır |
| GET | `/deneme-oturumlari/:resultId` | Sonuç detayı |

### Etiketler / Kategoriler
| GET/POST/DELETE | `/etiketler` | Soru etiketleri |
| GET/POST/DELETE | `/soru-kategorileri` | Soru kategorileri |

### İstatistikler (`/istatistikler`)
| GET | `/istatistikler/benim` | (giriş) Toplam/doğru/yanlış, günlük & haftalık grafik, en iyi/zayıf konular |

### Akıllı Öneriler (`/oneriler`)
| GET | `/oneriler` | (giriş) Eksik konular, önerilen zorluk, önerilen sorular, günlük hedef |

---

## Aşama 4: Eğitsel Oyunlar, Sanal Laboratuvar ve Etkileşimli Öğrenme

### Oyunlar (`/oyunlar`) — genişletildi
| GET | `/oyunlar?classLevel=&type=&topicId=` | Yayınlanmış oyunları listeler |
| GET | `/oyunlar/yonetim` | (ADMIN, TEACHER) Taslak dahil tüm oyunlar |
| GET | `/oyunlar/slug/:slug` | Oyunu slug ile getirir (oynatma sayfası için) |
| GET | `/oyunlar/:id` | Oyun detayı |
| GET | `/oyunlar/skorlarim` | (giriş) Kendi oyun skor geçmişi |
| POST | `/oyunlar` | (ADMIN, TEACHER) Yeni oyun |
| PUT | `/oyunlar/:id` | Oyun güncelle |
| DELETE | `/oyunlar/:id` | (ADMIN) Oyun sil |
| POST | `/oyunlar/:id/skor` | (giriş) Skor kaydet — puan/seri/günlük görev/rozet tetikler |
| POST | `/oyunlar/:gameId/seviyeler` | (ADMIN, TEACHER) Oyuna seviye ekle |

### Rozetler (`/basarimlar`)
| GET | `/basarimlar` | Rozet kataloğu |
| GET | `/basarimlar/benim` | (giriş) Kazanılan rozetler |
| GET | `/basarimlar/durumum` | (giriş) Kataloğu kazanılma durumuyla birlikte döner |
| POST | `/basarimlar` | (ADMIN, TEACHER) Yeni rozet tanımla |
| DELETE | `/basarimlar/:id` | (ADMIN) Rozet sil |

### Sanal Laboratuvar
| GET | `/simulasyonlar?classLevel=&topicId=` | Simülasyonları listeler |
| GET | `/simulasyonlar/:slug` | Simülasyon detayı |
| POST/PUT/DELETE | `/simulasyonlar` | (ADMIN, TEACHER/ADMIN) Simülasyon yönetimi |
| GET | `/deney-laboratuvari?classLevel=&simulationId=` | Sanal deneyleri listeler |
| GET | `/deney-laboratuvari/gecmisim` | (giriş) Tamamlanan deney geçmişi |
| GET | `/deney-laboratuvari/:slug` | Deney detayı (amaç/malzeme/adım/sonuç/güvenlik) |
| POST/PUT/DELETE | `/deney-laboratuvari` | (ADMIN, TEACHER/ADMIN) Deney yönetimi |
| POST | `/deney-laboratuvari/:id/tamamla` | (giriş) Deneyi tamamlandı işaretler — puan/seri/görev/rozet tetikler |

### Günlük Görevler (`/gorevler`)
| GET | `/gorevler/bugun` | (giriş) Bugünkü 4 görevi getirir (yoksa otomatik oluşturur) |

### Haftalık Etkinlikler (`/haftalik-etkinlikler`)
| GET | `/haftalik-etkinlikler/guncel?classLevel=` | (giriş) Bu haftanın etkinliği + canlı liderlik tablosu |
| POST | `/haftalik-etkinlikler/:challengeId/sonuclandir` | (ADMIN) Haftayı sonlandırır, "Haftanın Birincisi" rozetini verir |

### Liderlik Tablosu (`/liderlik`)
| GET | `/liderlik?scope=ALL_TIME\|WEEKLY&classLevel=` | Genel (User.points) veya haftalık (GameScore toplamı) sıralama |

---

## Aşama 5: Yapay Zekâ Destekli Kişiselleştirilmiş Öğrenme ve Gelişmiş Analiz

### Analiz Raporu (`/analiz`)
| GET | `/analiz/benim` | (giriş) Kendi ayrıntılı analiz raporu (günlük/haftalık/aylık grafik, güçlü/zayıf konular, kazanım oranları, deneme/oyun performansı, gelişim puanı) |
| GET | `/analiz/ogrenci/:studentId` | (ADMIN, TEACHER) Belirli bir öğrencinin analiz raporu |
| GET | `/analiz/sinif/:classLevel` | (ADMIN, TEACHER) Sınıf bazlı toplu analiz + en zorlanılan kazanımlar |

### Akıllı Çalışma Planı (`/calisma-plani`) — giriş yapmış kullanıcı
| GET | `/calisma-plani/gunluk` | Bugünkü planı getirir (yoksa performansa göre otomatik oluşturur) |
| POST | `/calisma-plani/gunluk/:itemId/tamamla` | Plan öğesini tamamlandı işaretler |
| GET | `/calisma-plani/haftalik` | Haftalık hedefi (gerçekleşen değerlerle) getirir |

### Bildirimler (`/bildirimler`) — giriş yapmış kullanıcı
| GET | `/bildirimler` | Bildirimleri ve okunmamış sayısını listeler |
| POST | `/bildirimler/:id/okundu` | Bir bildirimi okundu yapar |
| POST | `/bildirimler/tumunu-okundu-yap` | Tüm bildirimleri okundu yapar |

### Ödevler (`/odevler`)
| GET | `/odevler/benim` | (ADMIN, TEACHER) Oluşturduğu ödevler |
| GET | `/odevler/sinifim` | (giriş) Kendi sınıfına atanmış ödevler |
| GET | `/odevler/:id/teslimler` | (ADMIN, TEACHER) Ödev teslim durumları |
| POST | `/odevler` | (ADMIN, TEACHER) Yeni ödev — sınıfa otomatik bildirim gönderir |
| POST | `/odevler/:id/tamamla` | (giriş) Ödevi tamamlandı işaretler |

### Öğretmen Notları (`/ogretmen-notlari`) — ADMIN, TEACHER
| POST | `/ogretmen-notlari` | Öğrenci hakkında not ekler — veliye bildirim gönderir |
| GET | `/ogretmen-notlari/ogrenci/:studentId` | Bir öğrenciye ait notları listeler |

### Veli Paneli (`/veli`) — PARENT rolü
| GET | `/veli/cocuklarim` | Bağlı çocukları listeler |
| POST | `/veli/cocuk-bagla` | E-posta ile bir öğrenci hesabını bağlar |
| GET | `/veli/cocuk/:childId/rapor` | Çocuğun analiz raporu + deneme sonuçları + öğretmen notları |

### Yapay Zekâ Destekli Yardımcı (`/asistan`) — giriş yapmış kullanıcı
| GET | `/asistan/gecmis` | Sohbet geçmişini getirir |
| POST | `/asistan/sor` | Asistana mesaj gönderir — `ANTHROPIC_API_KEY` tanımlıysa gerçek LLM, değilse kural tabanlı yedek yanıt döner |

### Kullanıcılar — genişletildi
| GET | `/kullanicilar/ogrenciler?classLevel=` | (ADMIN, TEACHER) Bir sınıftaki öğrencileri listeler |

### Duyurular — genişletildi
`POST /duyurular` artık `classLevel` (yalnızca o sınıfa) veya `targetUserId` (tek öğrenciye)
alanlarını destekler; ikisi de boşsa herkese gösterilir. Oluşturma anında ilgili
kullanıcılara otomatik bildirim gönderilir. Yetki ADMIN + TEACHER olarak genişletildi.

### Liderlik Tablosu — performans notu
`GET /liderlik?scope=ALL_TIME` sonucu artık 30 saniyeliğine bellek-içi önbelleğe alınır
(`utils/cache.ts`).
