// MEB 8. sınıf F.8.6.1–F.8.6.4 kazanımlarına göre özgün soru bankası.
export type FoodQuestion = { scenario: string; options: string[]; answer: number; explanation: string; visual: string; outcome: string; };
export const foodQuestions: FoodQuestion[] = [
  {
    "scenario": "Bir çayır ekosisteminde otlarla beslenen çekirgeleri kurbağalar, kurbağaları yılanlar yer. Bu zincirde üretici hangisidir?",
    "options": [
      "Çekirge",
      "Ot",
      "Kurbağa",
      "Yılan"
    ],
    "answer": 1,
    "explanation": "Ot, fotosentezle kendi besinini ürettiği için üreticidir.",
    "visual": "chain",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir gölette alg → su piresi → küçük balık → turna balığı ilişkisi gözleniyor. Okların yönü neyi gösterir?",
    "options": [
      "Canlının kaçtığı yönü",
      "Enerji aktarım yönünü",
      "Suyun akış yönünü",
      "Canlıların büyüklüğünü"
    ],
    "answer": 1,
    "explanation": "Besin zincirindeki ok, besinden onu tüketen canlıya doğru enerji aktarımını gösterir.",
    "visual": "pond",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir tarlada pestisit kullanımı sonrası çekirge sayısı azalmıştır. Bu değişimin kurbağa popülasyonuna olası ilk etkisi nedir?",
    "options": [
      "Besin azaldığı için azalabilir",
      "Besin arttığı için artar",
      "Üreticiye dönüşür",
      "Hiçbir etkisi olmaz"
    ],
    "answer": 0,
    "explanation": "Çekirge kurbağanın besinidir; avın azalması kurbağaların besin bulmasını zorlaştırabilir.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir besin zincirinde ot → tavşan → tilki sıralaması vardır. Tavşanın rolü nedir?",
    "options": [
      "Üretici",
      "Birincil tüketici",
      "İkincil tüketici",
      "Ayrıştırıcı"
    ],
    "answer": 1,
    "explanation": "Tavşan üretici olan otu tükettiği için birincil tüketicidir.",
    "visual": "chain",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Ormanda mantarlar, ölü yaprak ve canlı kalıntılarını parçalar. Bu canlıların ekosistemdeki temel görevi nedir?",
    "options": [
      "Güneş ışığını soğurmak",
      "Enerjiyi üretmek",
      "Maddeleri doğaya geri kazandırmak",
      "Besin zincirini durdurmak"
    ],
    "answer": 2,
    "explanation": "Ayrıştırıcılar organik kalıntıları parçalayarak maddelerin döngüye katılmasını sağlar.",
    "visual": "cycle",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir öğrenci besin zincirini kartlarla kuruyor: buğday, fare, baykuş. Doğru sıralama hangisidir?",
    "options": [
      "Baykuş → fare → buğday",
      "Fare → buğday → baykuş",
      "Buğday → fare → baykuş",
      "Fare → baykuş → buğday"
    ],
    "answer": 2,
    "explanation": "Enerji üretici buğdaydan fareye, ardından baykuşa aktarılır.",
    "visual": "chain",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir gölde su bitkileri azalırsa onlarla beslenen otçul balıkların sayısı nasıl etkilenebilir?",
    "options": [
      "Artabilir",
      "Azalabilir",
      "Üretici olur",
      "Ayrıştırıcı olur"
    ],
    "answer": 1,
    "explanation": "Besin kaynağı azalan otçul balıkların sayısı zamanla azalabilir.",
    "visual": "pond",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Besin piramidinde tabandan tepeye doğru çıkıldıkça genellikle aktarılan enerji nasıl değişir?",
    "options": [
      "Artar",
      "Azalır",
      "Sabit kalır",
      "Önce sıfırlanır"
    ],
    "answer": 1,
    "explanation": "Enerjinin bir bölümü yaşamsal faaliyetlerde kullanılır ve ısı olarak çevreye verilir; üst basamaklara daha az enerji aktarılır.",
    "visual": "pyramid",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir ekosistemde üreticilerde 20 000 kJ enerji depolanmıştır. Yaklaşık yüzde 10 aktarım kuralına göre birincil tüketicilere kaç kJ aktarılır?",
    "options": [
      "200 kJ",
      "2 000 kJ",
      "10 000 kJ",
      "18 000 kJ"
    ],
    "answer": 1,
    "explanation": "20 000 kJ'nin yaklaşık %10'u 2 000 kJ'dir.",
    "visual": "pyramid",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Önceki sorudaki ekosistemde ikincil tüketicilere yaklaşık kaç kJ aktarılır?",
    "options": [
      "200 kJ",
      "2 000 kJ",
      "4 000 kJ",
      "20 000 kJ"
    ],
    "answer": 0,
    "explanation": "Birincil tüketicilerdeki 2 000 kJ'nin yaklaşık %10'u 200 kJ'dir.",
    "visual": "pyramid",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir besin piramidinde üreticiler 5 000 birim enerjiye sahipse üçüncül tüketicilere yaklaşık ne kadar enerji ulaşır?",
    "options": [
      "500",
      "50",
      "5",
      "0,5"
    ],
    "answer": 2,
    "explanation": "Üreticiden birincil tüketiciye 500, ikincile 50, üçüncüle 5 birim enerji aktarılır.",
    "visual": "pyramid",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Aynı ekosistemde kartal sayısı hızla artarsa yılan popülasyonu için hangi durum beklenebilir? (Zincir: ot → fare → yılan → kartal)",
    "options": [
      "Yılanlar üzerindeki av baskısı artar",
      "Yılanlar üretici olur",
      "Fareler fotosentez yapar",
      "Otlar tüketici olur"
    ],
    "answer": 0,
    "explanation": "Kartal yılanla beslendiğinden kartal sayısının artması yılanlar üzerindeki av baskısını artırabilir.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir bölgede yılanlar aşırı avlanarak azalmıştır. Fare sayısında artış görülmesi hangi ilişkiyle açıklanır?",
    "options": [
      "Yılanların fareleri avlamasının azalması",
      "Otların ayrıştırıcı olması",
      "Farelerin üretici olması",
      "Güneş enerjisinin yok olması"
    ],
    "answer": 0,
    "explanation": "Avcı sayısı azalınca av olan fareler üzerindeki baskı düşebilir.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Besin ağında bir canlı birden fazla canlıyla beslenebilir. Bu durum besin ağını besin zincirinden nasıl ayırır?",
    "options": [
      "Tek bir yol içermesi",
      "Birçok beslenme ilişkisinin birleşmesi",
      "Enerji aktarılmaması",
      "Üretici bulunmaması"
    ],
    "answer": 1,
    "explanation": "Besin ağı, aynı ekosistemdeki birden çok besin zincirinin kesişmesiyle oluşur.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir tarla ekosisteminde buğday hem fare hem çekirge tarafından tüketiliyor; fareyi yılan, çekirgeyi kurbağa yiyor. Buğdayın ortak rolü nedir?",
    "options": [
      "Ayrıştırıcı",
      "Üretici",
      "İkincil tüketici",
      "Son tüketici"
    ],
    "answer": 1,
    "explanation": "Buğday fotosentez yapar ve birden fazla tüketiciye besin sağlar.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir gölde alg miktarı artınca zooplankton sayısı da artıyor. Bu gözlem hangi ilişkiyi destekler?",
    "options": [
      "Üretici artışı birincil tüketiciyi destekleyebilir",
      "Tüketici üreticiye dönüşür",
      "Enerji yukarıdan aşağıya akar",
      "Ayrıştırıcılar yok olur"
    ],
    "answer": 0,
    "explanation": "Algler zooplankton için besin oluşturur; üretici artışı tüketiciye kaynak sağlayabilir.",
    "visual": "pond",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir araştırmacı, aynı büyüklükteki iki alandan birinde böcek ilacı kullanıldığını belirliyor. İlaç kullanılan alanda kuş sayısı azalmış. Olası neden hangisidir?",
    "options": [
      "Böceklerin azalması kuşların besinini azaltmıştır",
      "Kuşlar üretici olmuştur",
      "Toprakta enerji artmıştır",
      "Güneş ışığı besin zincirini kesmiştir"
    ],
    "answer": 0,
    "explanation": "Böceklerle beslenen kuşlar, besin kaynakları azaldığında olumsuz etkilenebilir.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir besin zincirindeki canlıların dokularında parçalanması zor bir kirletici birikiyor. En yüksek derişim hangi basamakta görülebilir?",
    "options": [
      "Üreticilerde",
      "Birincil tüketicilerde",
      "Üst düzey tüketicilerde",
      "Tüm basamaklarda kesin eşit"
    ],
    "answer": 2,
    "explanation": "Besin zincirinde biyolojik birikim nedeniyle kalıcı kirleticilerin derişimi üst basamaklarda artabilir.",
    "visual": "pyramid",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir göle gübre karışması alg patlamasına, ardından sudaki oksijenin azalmasına neden oluyor. Balık ölümlerinin temel nedeni nedir?",
    "options": [
      "Sudaki çözünmüş oksijenin azalması",
      "Işık miktarının artması",
      "Balıkların üretici olması",
      "Suyun besin içermemesi"
    ],
    "answer": 0,
    "explanation": "Aşırı alg artışı ve ayrışma süreçleri sudaki çözünmüş oksijeni azaltabilir.",
    "visual": "pond",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir öğrenci ayrıştırıcıların besin zincirinde yer almadığını söylüyor. En doğru değerlendirme hangisidir?",
    "options": [
      "Doğru; ayrıştırıcılar önemsizdir",
      "Yanlış; ayrıştırıcılar madde döngüsünde görevlidir",
      "Doğru; yalnızca üreticiler vardır",
      "Yanlış; ayrıştırıcılar güneş ışığı üretir"
    ],
    "answer": 1,
    "explanation": "Ayrıştırıcılar canlı kalıntılarını parçalayarak maddelerin ekosisteme geri dönmesini sağlar.",
    "visual": "cycle",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir ormanda yangın sonrası bitki örtüsü azalmıştır. İlk olarak hangi grup doğrudan besin kaynağı kaybı yaşayabilir?",
    "options": [
      "Otçullar",
      "Ayrıştırıcılar mutlaka yok olur",
      "Güneş",
      "Kayaçlar"
    ],
    "answer": 0,
    "explanation": "Üreticiler azaldığında bitkilerle beslenen otçulların besin kaynağı azalır.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir çayırda ot → çekirge → kurbağa → yılan zincirinde kurbağalar hastalık nedeniyle azalmıştır. Çekirge sayısında kısa vadede ne beklenebilir?",
    "options": [
      "Azalma",
      "Artış",
      "Üreticiye dönüşme",
      "Kesinlikle değişmeme"
    ],
    "answer": 1,
    "explanation": "Kurbağaların avladığı çekirgeler üzerindeki baskı azalabilir; bu nedenle çekirgeler artabilir.",
    "visual": "chain",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir bilim insanı, besin piramidinin her basamağında canlı sayısını ölçüyor. Piramidin tabanında genellikle hangi grup bulunur?",
    "options": [
      "Üreticiler",
      "Son tüketiciler",
      "Etçiller",
      "Ayrıştırıcılar"
    ],
    "answer": 0,
    "explanation": "Karasal ekosistemlerde enerji piramidinin tabanında üreticiler bulunur.",
    "visual": "pyramid",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir ekosistemde üretici biyokütlesi 800 kg, otçul biyokütlesi 80 kg, etçil biyokütlesi 8 kg ölçülüyor. Bu veriler hangi durumu destekler?",
    "options": [
      "Biyokütlenin basamaklar boyunca azalmasını",
      "Enerjinin sürekli artmasını",
      "Üreticilerin tüketici olmasını",
      "Ayrıştırıcıların enerji üretmesini"
    ],
    "answer": 0,
    "explanation": "Veriler, bu örnekte üst trofik basamaklara çıkıldıkça biyokütlenin azaldığını gösterir.",
    "visual": "pyramid",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir öğrenci besin zincirindeki okları tüketiciden besine doğru çiziyor. Hatası nasıl düzeltilmelidir?",
    "options": [
      "Oklar besinden tüketiciye çizilmeli",
      "Oklar her zaman çift yönlü olmalı",
      "Üretici zincirin sonuna yazılmalı",
      "Ayrıştırıcı çıkarılmalı"
    ],
    "answer": 0,
    "explanation": "Oklar enerjinin kaynaktan tüketiciye aktarım yönünü gösterir.",
    "visual": "chain",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Güneş ışığı alan bir akvaryumda su bitkileri fotosentez yapıyor. Bu bitkiler besin zincirinde neden önemlidir?",
    "options": [
      "Işık enerjisini kimyasal enerjiye dönüştürür",
      "Tüm balıkları avlar",
      "Oksijeni yok eder",
      "Ayrıştırıcıdır"
    ],
    "answer": 0,
    "explanation": "Üreticiler fotosentezle ışık enerjisini besinlerde depolanan kimyasal enerjiye dönüştürür.",
    "visual": "pond",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir çiftçi zararlı böcekleri azaltmak için doğadaki uğur böceklerini koruyor. Bu yaklaşımın ekolojik yararı nedir?",
    "options": [
      "Doğal av-avcı dengesini desteklemesi",
      "Besin ağını ortadan kaldırması",
      "Üreticileri yok etmesi",
      "Enerji aktarımını durdurması"
    ],
    "answer": 0,
    "explanation": "Uğur böcekleri bazı zararlı böceklerle beslenerek biyolojik mücadeleye katkı sağlar.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir gölette kurbağaların azalması, böceklerin artmasına ve su bitkilerinin zarar görmesine yol açıyor. Bu örnek neyi gösterir?",
    "options": [
      "Canlılar arasındaki ilişkilerin birbirini etkilediğini",
      "Her canlının bağımsız yaşadığını",
      "Besin ağında enerji olmadığını",
      "Üreticilerin tüketici olduğunu"
    ],
    "answer": 0,
    "explanation": "Besin ağındaki bir popülasyon değişikliği diğer popülasyonları da etkileyebilir.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir bölgede tilkiler azalınca tavşanlar artıyor, bitki örtüsü zayıflıyor. Bu zincirleme etki nasıl adlandırılır?",
    "options": [
      "Ekolojik denge üzerindeki dolaylı etki",
      "Fotosentez",
      "Mayoz",
      "Fiziksel ayrışma"
    ],
    "answer": 0,
    "explanation": "Avcıdaki değişim av popülasyonunu, avdaki artış da üreticileri etkileyebilir.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir ekosistemde enerji akışının tek yönlü olmasının temel nedeni nedir?",
    "options": [
      "Enerjinin her aktarımda bir kısmının ısı olarak çevreye yayılması",
      "Maddenin yok olması",
      "Üreticilerin enerji kullanmaması",
      "Tüketicilerin güneş olması"
    ],
    "answer": 0,
    "explanation": "Enerji canlılar arasında aktarılırken bir bölümü ısı olarak çevreye yayılır ve aynı şekilde geri dönmez.",
    "visual": "pyramid",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir besin zincirinde enerji miktarı üreticiden son tüketiciye doğru azalır. Buna rağmen madde için hangi ifade doğrudur?",
    "options": [
      "Maddeler döngü yaparak yeniden kullanılabilir",
      "Maddeler her basamakta yok olur",
      "Madde yalnızca güneşten gelir",
      "Madde enerjiyle aynı şekilde tek yönlü akar"
    ],
    "answer": 0,
    "explanation": "Enerji akışı tek yönlüdür; maddeler ise ayrıştırıcılar ve çevre aracılığıyla döngüye katılır.",
    "visual": "cycle",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir araştırma alanında üretici bitkilerin yaprakları işaretlenmiş karbon içeriyor. Bu karbonun tavşan ve tilkiye geçmesi neyi gösterir?",
    "options": [
      "Maddenin beslenme yoluyla canlılar arasında aktarılmasını",
      "Enerjinin yok olmasını",
      "Tilkinin fotosentez yapmasını",
      "Karbonun canlılarda bulunmamasını"
    ],
    "answer": 0,
    "explanation": "Besinlerle alınan karbon, besin zinciri boyunca farklı canlıların yapısına katılabilir.",
    "visual": "cycle",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir öğrenci enerji piramidinde üst basamakta daha fazla enerji bulunması gerektiğini savunuyor. Hangi kanıt bu görüşü çürütür?",
    "options": [
      "Her basamakta enerjinin bir kısmının ısı olarak kaybolması",
      "Üreticilerin fotosentez yapması",
      "Güneş'in enerji kaynağı olması",
      "Otçulların bitki yemesi"
    ],
    "answer": 0,
    "explanation": "Enerji aktarımı verimli değildir; üst basamaklara daha az enerji ulaşır.",
    "visual": "pyramid",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir üretici topluluğunda fotosentez hızı artarsa, diğer koşullar aynıyken ekosisteme giren enerji için ne söylenebilir?",
    "options": [
      "Artabilir",
      "Kesinlikle sıfırlanır",
      "Azalır",
      "Değişmez ve aktarılmaz"
    ],
    "answer": 0,
    "explanation": "Fotosentez, güneş enerjisinin kimyasal enerji olarak besinlerde depolanmasını sağlar.",
    "visual": "cycle",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir gölde su samurları deniz kestanelerini, deniz kestaneleri yosunları tüketiyor. Su samurları azalınca yosunların azalması bekleniyorsa aradaki olası değişim hangisidir?",
    "options": [
      "Deniz kestanelerinin artması",
      "Yosunların üretici olmaktan çıkması",
      "Güneş ışığının yok olması",
      "Su samurlarının fotosentez yapması"
    ],
    "answer": 0,
    "explanation": "Avcı su samuru azalırsa deniz kestaneleri artabilir ve yosunlar üzerindeki tüketim baskısı yükselir.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir çiftçi tarladaki tüm yılanları yok etmeyi planlıyor. Farelerin ürünlere zarar verdiği biliniyor. Bilimsel açıdan en uygun uyarı hangisidir?",
    "options": [
      "Yılanların azalması fareleri artırarak ürün kaybını büyütebilir",
      "Yılanlar üretici olduğu için ürün verir",
      "Fareler hemen yok olur",
      "Besin ağı etkilenmez"
    ],
    "answer": 0,
    "explanation": "Yılanlar fareleri avlayabilir; avcıyı yok etmek av popülasyonunu artırabilir.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir akvaryumda üretici su bitkileri, salyangozlar ve balıklar bulunuyor. Bitkilerin ışık alamadığı uzun süreli durumda ilk hangi süreç aksar?",
    "options": [
      "Fotosentez",
      "Avlanma",
      "Ayrıştırma her koşulda",
      "Solunum tüm canlılarda"
    ],
    "answer": 0,
    "explanation": "Işık olmadığında fotosentez hızı düşer; üreticilerin besin üretimi azalır.",
    "visual": "pond",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir bilim insanı iki besin zincirini karşılaştırıyor: A) ot→çekirge→kurbağa, B) alg→su piresi→balık. Her ikisinde de ortak olan enerji kaynağı hangisidir?",
    "options": [
      "Güneş",
      "Toprak minerali",
      "Ay ışığı",
      "Ayrıştırıcılar"
    ],
    "answer": 0,
    "explanation": "Bu örneklerde üreticiler fotosentez yaptığı için temel enerji kaynağı Güneş'tir.",
    "visual": "chain",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir ormanda mantarların azalması uzun vadede hangi süreci olumsuz etkiler?",
    "options": [
      "Ölü organik maddelerin parçalanmasını",
      "Güneş'in doğmasını",
      "Üreticilerin ışık almasını doğrudan",
      "Avcıların avlanma hızını kesin"
    ],
    "answer": 0,
    "explanation": "Mantarlar ayrıştırıcıdır; azalması organik kalıntıların parçalanmasını yavaşlatabilir.",
    "visual": "cycle",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir öğrenci, besin piramidinde üst basamaklarda daha az canlı bulunmasının nedenini araştırıyor. Hangi açıklama en uygundur?",
    "options": [
      "Üst basamaklara daha az enerji aktarılması",
      "Üst basamakta Güneş olmaması",
      "Üreticilerin hiç enerji kullanmaması",
      "Tüketicilerin su içmemesi"
    ],
    "answer": 0,
    "explanation": "Enerji sınırlı olduğu için üst trofik basamaklarda daha az biyokütle ve çoğu zaman daha az canlı desteklenebilir.",
    "visual": "pyramid",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir çayırda üreticiler 10 000 kJ, birincil tüketiciler 1 000 kJ enerjiye sahiptir. Yaklaşık aktarım verimi yüzde kaçtır?",
    "options": [
      "1",
      "10",
      "50",
      "90"
    ],
    "answer": 1,
    "explanation": "1 000 / 10 000 × 100 = %10 aktarım verimidir.",
    "visual": "pyramid",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir araştırmacı aynı ekosistemde çekirge, kurbağa ve yılan sayısını yıllarca izliyor. Çekirge artışından sonra kurbağaların, ardından yılanların arttığını gözlüyor. Bu sıra neyle açıklanır?",
    "options": [
      "Besin miktarındaki artışın tüketicilere basamaklı yansıması",
      "Canlıların aynı anda üretici olması",
      "Enerji akışının tersine dönmesi",
      "Ayrıştırıcıların yok olması"
    ],
    "answer": 0,
    "explanation": "Çekirge kurbağaya, kurbağa yılana besin sağlar; değişimler zincir boyunca yansıyabilir.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir bölgede istilacı otçul tür hızla çoğalıyor ve yerli bitkileri tüketiyor. Yerli otçul türlerin azalmasının olası nedeni nedir?",
    "options": [
      "Besin ve yaşam alanı için rekabetin artması",
      "Güneş enerjisinin bitmesi",
      "Ayrıştırıcıların üretici olması",
      "Besin ağının genişlemesi zorunluluğu"
    ],
    "answer": 0,
    "explanation": "İstilacı türler kaynaklar için rekabet ederek yerli türleri olumsuz etkileyebilir.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir göl ekosisteminde balıkçılık nedeniyle büyük yırtıcı balıklar azalmıştır. Küçük balıkların artması planktonları nasıl etkileyebilir?",
    "options": [
      "Küçük balıklar planktonla besleniyorsa plankton azalabilir",
      "Planktonlar kesinlikle artar",
      "Planktonlar yırtıcı olur",
      "Enerji akışı durur"
    ],
    "answer": 0,
    "explanation": "Küçük balıkların besini plankton ise sayılarındaki artış plankton tüketimini artırabilir.",
    "visual": "pond",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir besin ağında hem tohum hem böcek yiyen kuş türü vardır. Bu kuşun beslenme biçimi besin ağını nasıl etkiler?",
    "options": [
      "Birden fazla besin bağlantısı kurar",
      "Besin zincirini tek çizgiye indirir",
      "Üreticiye dönüşür",
      "Ayrıştırıcı olur"
    ],
    "answer": 0,
    "explanation": "Birden fazla besin kaynağı kullanması, kuşun besin ağında birden çok bağlantı kurmasını sağlar.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir öğrenci enerji piramidini çizerken ayrıştırıcıları yalnızca en üst basamağa yerleştiriyor. Hangi düzeltme yapılmalıdır?",
    "options": [
      "Ayrıştırıcılar tüm basamaklardaki kalıntıları parçalayabilir",
      "Ayrıştırıcılar yalnızca son tüketiciyi yer",
      "Ayrıştırıcılar enerji piramidinin tabanıdır ve üreticidir",
      "Ayrıştırıcılar ekosistemde bulunmaz"
    ],
    "answer": 0,
    "explanation": "Ayrıştırıcılar bütün trofik basamaklardan gelen ölü organizma ve atıkları parçalayabilir.",
    "visual": "cycle",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir orman ekosisteminde üreticilerde depolanan enerjinin bir bölümü tavşana, daha küçük bölümü tilkiye geçiyor. Tilkinin enerji elde etmesi hangi olayla gerçekleşir?",
    "options": [
      "Tavşanı tüketmesi ve besinlerdeki kimyasal enerjiyi kullanması",
      "Güneş ışığını doğrudan soğurması",
      "Topraktan mineral alması",
      "Fotosentez yapması"
    ],
    "answer": 0,
    "explanation": "Tüketiciler enerjiyi besinlerini tüketerek alır; kendi besinlerini fotosentezle üretmez.",
    "visual": "chain",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir bilimsel posterde 'enerji geri dönüşümlüdür' yazıyor. Posterdeki ifade nasıl düzeltilmelidir?",
    "options": [
      "Enerji ekosistemde tek yönlü akar; madde döngü yapar",
      "Enerji ve madde aynı biçimde döngü yapar",
      "Enerji yoktan var olur",
      "Madde tek yönlü akar, enerji döner"
    ],
    "answer": 0,
    "explanation": "Ekosistemde enerji akışı tek yönlüdür; madde ise döngülerle yeniden kullanılır.",
    "visual": "cycle",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir merada üretici otların üzerine yoğun otlatma baskısı uygulanıyor. Toprak erozyonunun artması hangi dolaylı etkiyle açıklanabilir?",
    "options": [
      "Bitki örtüsünün azalması toprağı korumasız bırakır",
      "Otlar ayrıştırıcıdır",
      "Enerji piramidi tersine döner",
      "Otçullar toprağı üretir"
    ],
    "answer": 0,
    "explanation": "Bitki örtüsü toprağı tutar; aşırı otlatma örtüyü azaltarak erozyon riskini artırabilir.",
    "visual": "web",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir gölün besin ağında alg → zooplankton → küçük balık → balıkçıl kuş zinciri bulunuyor. Balıkçıl kuşların sayısı azalırsa küçük balıklar için ne olabilir?",
    "options": [
      "Üzerlerindeki av baskısı azalabilir",
      "Besinleri hemen yok olur",
      "Üreticiye dönüşürler",
      "Fotosentez yaparlar"
    ],
    "answer": 0,
    "explanation": "Balıkçıl kuşların azalması küçük balıklar üzerindeki av baskısını azaltabilir.",
    "visual": "pond",
    "outcome": "F.8.6.1.1"
  },
  {
    "scenario": "Bir bitki ışık altında karbondioksit ve su kullanarak besin oluşturuyor. Bu olay hangisidir?",
    "options": [
      "Solunum",
      "Fotosentez",
      "Boşaltım",
      "Sindirim"
    ],
    "answer": 1,
    "explanation": "Fotosentezde ışık enerjisi kullanılarak karbondioksit ve sudan besin üretilir.",
    "visual": "photo",
    "outcome": "F.8.6.2.1"
  },
  {
    "scenario": "Bir su bitkisi ışıkta kabarcık çıkarıyor. Kabarcıklardaki gazın oksijen olduğu biliniyor. Bu gözlem hangi olayı kanıtlar?",
    "options": [
      "Fotosentez",
      "Yalnız solunum",
      "Buharlaşma",
      "Yoğunlaşma"
    ],
    "answer": 0,
    "explanation": "Fotosentez sırasında oksijen açığa çıkar.",
    "visual": "photo",
    "outcome": "F.8.6.2.1"
  },
  {
    "scenario": "Güneş ışığı alamayan bitkinin besin üretimi azalıyor. Bu durum hangi faktörün önemini gösterir?",
    "options": [
      "Işık",
      "Toprak rengi",
      "Ses",
      "Rüzgâr yönü"
    ],
    "answer": 0,
    "explanation": "Işık fotosentez için gerekli enerji kaynağıdır.",
    "visual": "photo",
    "outcome": "F.8.6.2.2"
  },
  {
    "scenario": "Serada karbondioksit miktarı uygun aralığa kadar artırıldığında fotosentez hızlanıyor. Bunun nedeni nedir?",
    "options": [
      "CO₂ fotosentezde kullanılır",
      "CO₂ oksijendir",
      "CO₂ ışık üretir",
      "CO₂ suyu yok eder"
    ],
    "answer": 0,
    "explanation": "Karbondioksit fotosentezin ham maddelerinden biridir.",
    "visual": "photo",
    "outcome": "F.8.6.2.2"
  },
  {
    "scenario": "Aynı tür bitkilerden biri az su alıyor. Diğer koşullar eşitse fotosentez hızı nasıl etkilenebilir?",
    "options": [
      "Azalabilir",
      "Daima artar",
      "Değişmez",
      "Solunum durur"
    ],
    "answer": 0,
    "explanation": "Su fotosentezde kullanılır; yetersizliği süreci sınırlar.",
    "visual": "photo",
    "outcome": "F.8.6.2.2"
  },
  {
    "scenario": "Bir deneyde yalnız ışık şiddeti değiştirilerek fotosentez hızı ölçülüyor. Araştırmacı neyi test etmektedir?",
    "options": [
      "Işık şiddetinin etkisini",
      "Toprak türünün etkisini",
      "Saksı şeklinin etkisini",
      "Sesin etkisini"
    ],
    "answer": 0,
    "explanation": "Deneyde bağımsız değişken ışık şiddetidir.",
    "visual": "photo",
    "outcome": "F.8.6.2.2"
  },
  {
    "scenario": "Kırmızı, mavi ve yeşil ışıkta yetiştirilen bitkiler karşılaştırılıyor. Hangi değişken incelenir?",
    "options": [
      "Işığın rengi",
      "Su miktarı",
      "Bitki yaşı",
      "Toprak türü"
    ],
    "answer": 0,
    "explanation": "Işık rengi fotosentez hızını etkileyebilir.",
    "visual": "photo",
    "outcome": "F.8.6.2.2"
  },
  {
    "scenario": "Bitki uygun sıcaklığa yaklaştırıldığında fotosentez hızı artıyor. Bu gözlem hangi faktörle ilgilidir?",
    "options": [
      "Sıcaklık",
      "Ses",
      "Basınç",
      "Rüzgâr yönü"
    ],
    "answer": 0,
    "explanation": "Fotosentez hızı sıcaklıktan etkilenir.",
    "visual": "photo",
    "outcome": "F.8.6.2.2"
  },
  {
    "scenario": "Çok yüksek sıcaklıkta bitkinin fotosentez hızı düşüyor. En uygun yorum hangisidir?",
    "options": [
      "Aşırı sıcaklık süreci olumsuz etkileyebilir",
      "Sıcaklık etkisizdir",
      "Fotosentez yalnız donmada olur",
      "Bitki ışık üretir"
    ],
    "answer": 0,
    "explanation": "Fotosentez için uygun sıcaklık aralığı gerekir.",
    "visual": "photo",
    "outcome": "F.8.6.2.2"
  },
  {
    "scenario": "Bir bitki gece karanlıkta tutuluyor. Hangi olay devam eder?",
    "options": [
      "Solunum",
      "Fotosentez",
      "Oksijen üretimi",
      "Işık soğurma"
    ],
    "answer": 0,
    "explanation": "Karanlıkta fotosentez gerçekleşmez ancak solunum sürer.",
    "visual": "photo",
    "outcome": "F.8.6.2.3"
  },
  {
    "scenario": "Bir öğrenci bitkilerin yalnız gündüz solunum yaptığını söylüyor. Hangi bilgi doğrudur?",
    "options": [
      "Bitkiler gece ve gündüz solunum yapar",
      "Bitkiler solunum yapmaz",
      "Solunum yalnız hayvanlarda olur",
      "Bitkiler yalnız gece solunum yapar"
    ],
    "answer": 0,
    "explanation": "Bitkiler sürekli enerji ihtiyacı nedeniyle gece ve gündüz solunum yapar.",
    "visual": "photo",
    "outcome": "F.8.6.2.3"
  },
  {
    "scenario": "Işık alan bir bitkide gündüz hangi iki olay birlikte gerçekleşebilir?",
    "options": [
      "Fotosentez ve solunum",
      "Yalnız fotosentez",
      "Yalnız solunum",
      "Hiçbiri"
    ],
    "answer": 0,
    "explanation": "Bitkiler fotosentez yaparken solunumu da sürdürür.",
    "visual": "photo",
    "outcome": "F.8.6.2.3"
  },
  {
    "scenario": "Hücrelerde enerji aktarımında görevli molekül hangisidir?",
    "options": [
      "ATP",
      "DNA",
      "Klorofil",
      "Nişasta"
    ],
    "answer": 0,
    "explanation": "ATP hücrede enerji aktarımında görev alır.",
    "visual": "photo",
    "outcome": "F.8.6.2.3"
  },
  {
    "scenario": "Oksijenin yetersiz olduğu koşullarda bazı hücreler enerji elde etmeye devam eder. Bu hangi süreçtir?",
    "options": [
      "Oksijensiz solunum",
      "Fotosentez",
      "Yalnız oksijenli solunum",
      "Terleme"
    ],
    "answer": 0,
    "explanation": "Bazı hücreler oksijen olmadan da enerji elde edebilir.",
    "visual": "photo",
    "outcome": "F.8.6.2.3"
  },
  {
    "scenario": "Hamur mayalanırken maya hücrelerinin oluşturduğu gaz hamuru kabartır. Bu olay hangisiyle ilişkilidir?",
    "options": [
      "Oksijensiz solunum/fermantasyon",
      "Fotosentez",
      "Buharlaşma",
      "Yoğunlaşma"
    ],
    "answer": 0,
    "explanation": "Maya oksijensiz koşullarda fermantasyonla karbondioksit oluşturabilir.",
    "visual": "photo",
    "outcome": "F.8.6.2.3"
  },
  {
    "scenario": "Oksijenli ve oksijensiz solunumun ortak özelliği nedir?",
    "options": [
      "Besinlerden enerji elde edilmesi",
      "İkisinde de oksijen kullanılması",
      "İkisinin de fotosentez olması",
      "Yalnız bitkilerde görülmesi"
    ],
    "answer": 0,
    "explanation": "Her iki süreçte de besinlerdeki enerji hücresel faaliyetlerde kullanılabilir hâle gelir.",
    "visual": "photo",
    "outcome": "F.8.6.2.3"
  },
  {
    "scenario": "Fotosentez yapan canlılar besin zincirinde hangi gruptadır?",
    "options": [
      "Üretici",
      "Birincil tüketici",
      "İkincil tüketici",
      "Ayrıştırıcı"
    ],
    "answer": 0,
    "explanation": "Fotosentez yapan canlılar kendi besinini üretir.",
    "visual": "photo",
    "outcome": "F.8.6.2.1"
  },
  {
    "scenario": "Bir deneyde yalnız ışık şiddeti değiştirilirken su ve sıcaklık sabit tutuluyor. Neden?",
    "options": [
      "Sonuçtaki farkın nedenini belirlemek için",
      "Tüm değişkenleri karıştırmak için",
      "Fotosentezi durdurmak için",
      "Sonucu önceden belirlemek için"
    ],
    "answer": 0,
    "explanation": "Kontrollü deneyde diğer değişkenler sabit tutularak bir faktörün etkisi incelenir.",
    "visual": "photo",
    "outcome": "F.8.6.2.2"
  },
  {
    "scenario": "Fotosentez sırasında açığa çıkan oksijen hangi canlılar için önemlidir?",
    "options": [
      "Oksijenli solunum yapan canlılar",
      "Yalnız üreticiler",
      "Yalnız ayrıştırıcılar",
      "Hiçbir canlı"
    ],
    "answer": 0,
    "explanation": "Oksijenli solunum yapan canlılar oksijeni kullanır.",
    "visual": "photo",
    "outcome": "F.8.6.2.1"
  },
  {
    "scenario": "Bir bitki yaprağında klorofil bulunması fotosentez açısından neden önemlidir?",
    "options": [
      "Işık enerjisinin soğurulmasına yardımcı olur",
      "Topraktan su alır",
      "Karbondioksiti yok eder",
      "Solunumu durdurur"
    ],
    "answer": 0,
    "explanation": "Klorofil ışık enerjisinin soğurulmasında görevlidir.",
    "visual": "photo",
    "outcome": "F.8.6.2.1"
  },
  {
    "scenario": "Denizden yükselen su buharı soğuyup damlacıklara dönüşüyor. Bu olay nedir?",
    "options": [
      "Yoğunlaşma",
      "Buharlaşma",
      "Yağış",
      "Donma"
    ],
    "answer": 0,
    "explanation": "Su buharının sıvı damlacıklara dönüşmesi yoğunlaşmadır.",
    "visual": "water",
    "outcome": "F.8.6.3.1"
  },
  {
    "scenario": "Güneş'in ısıttığı göl yüzeyinden su buharı yükseliyor. Hangi aşama gerçekleşir?",
    "options": [
      "Buharlaşma",
      "Yoğunlaşma",
      "Yağış",
      "Süzülme"
    ],
    "answer": 0,
    "explanation": "Sıvı suyun gaz hâline geçmesi buharlaşmadır.",
    "visual": "water",
    "outcome": "F.8.6.3.1"
  },
  {
    "scenario": "Bulutlardaki su damlacıklarının yağmur olarak yeryüzüne dönmesi nedir?",
    "options": [
      "Yağış",
      "Yoğunlaşma",
      "Fotosentez",
      "Solunum"
    ],
    "answer": 0,
    "explanation": "Yağış, suyun atmosferden yeryüzüne dönmesini sağlar.",
    "visual": "water",
    "outcome": "F.8.6.3.1"
  },
  {
    "scenario": "Bitkilerin fotosentez sırasında atmosferden karbondioksit alması hangi döngüye katkı sağlar?",
    "options": [
      "Karbon döngüsü",
      "Azot döngüsü",
      "Su döngüsü",
      "Kayaç döngüsü"
    ],
    "answer": 0,
    "explanation": "Fotosentez, karbondioksitteki karbonun organik besinlere katılmasını sağlar.",
    "visual": "carbon",
    "outcome": "F.8.6.3.1"
  },
  {
    "scenario": "Canlıların solunumla karbondioksit vermesi hangi döngünün parçasıdır?",
    "options": [
      "Karbon döngüsü",
      "Su döngüsü",
      "Azot döngüsü",
      "Ozon döngüsü"
    ],
    "answer": 0,
    "explanation": "Solunumla karbondioksit atmosfere verilir.",
    "visual": "carbon",
    "outcome": "F.8.6.3.1"
  },
  {
    "scenario": "Fosil yakıtların yakılması atmosferde hangi gazı artırır?",
    "options": [
      "Karbondioksit",
      "Oksijen",
      "Helyum",
      "Neon"
    ],
    "answer": 0,
    "explanation": "Fosil yakıtların yanması karbondioksit salımını artırır.",
    "visual": "carbon",
    "outcome": "F.8.6.3.1"
  },
  {
    "scenario": "Atmosfer azotunu bitkilerin kullanabileceği bileşiklere dönüştüren bakteriler hangi döngüde görev alır?",
    "options": [
      "Azot döngüsü",
      "Su döngüsü",
      "Oksijen döngüsü",
      "Karbon döngüsü"
    ],
    "answer": 0,
    "explanation": "Azot bağlayıcı bakteriler azotun canlılarca kullanılabilir olmasını sağlar.",
    "visual": "nitrogen",
    "outcome": "F.8.6.3.1"
  },
  {
    "scenario": "Bitkiler azotu çoğunlukla nasıl alır?",
    "options": [
      "Topraktaki azotlu bileşikleri kökleriyle alarak",
      "Atmosfer azotunu doğrudan soluyarak",
      "Güneş ışığından üreterek",
      "Saf azot gazını depolayarak"
    ],
    "answer": 0,
    "explanation": "Bitkiler azotu genellikle topraktaki azotlu bileşiklerden alır.",
    "visual": "nitrogen",
    "outcome": "F.8.6.3.1"
  },
  {
    "scenario": "Ozon tabakasının temel görevi nedir?",
    "options": [
      "Zararlı morötesi ışınların önemli bölümünü soğurmak",
      "Dünya'nın tüm ısısını tutmak",
      "Yağmur oluşturmak",
      "Oksijeni yok etmek"
    ],
    "answer": 0,
    "explanation": "Ozon tabakası zararlı UV ışınlarının önemli bölümünü soğurur.",
    "visual": "climate",
    "outcome": "F.8.6.3.2"
  },
  {
    "scenario": "Sera gazlarının artması hangi sonuca katkı sağlar?",
    "options": [
      "Sera etkisinin güçlenmesine",
      "Yer çekiminin kaybolmasına",
      "Oksijenin bitmesine",
      "Dünya'nın ışık almamasına"
    ],
    "answer": 0,
    "explanation": "Sera gazları atmosferde ısının tutulmasına katkı sağlar.",
    "visual": "climate",
    "outcome": "F.8.6.3.3"
  },
  {
    "scenario": "Sera etkisi hangi olayla açıklanır?",
    "options": [
      "Atmosferdeki bazı gazların ısının bir bölümünü tutması",
      "Ozonun yağmura dönüşmesi",
      "Güneş ışığının tamamen kesilmesi",
      "Suyun donması"
    ],
    "answer": 0,
    "explanation": "Sera gazları yeryüzünden yayılan ısının bir bölümünü tutar.",
    "visual": "climate",
    "outcome": "F.8.6.3.3"
  },
  {
    "scenario": "Küresel iklim değişikliğinin olası sonucu hangisidir?",
    "options": [
      "Kuraklık ve aşırı hava olayları riskinin artması",
      "Yer çekiminin değişmesi",
      "Dünya'nın dönmesinin durması",
      "Mevsimlerin yok olması"
    ],
    "answer": 0,
    "explanation": "İklim değişikliği kuraklık ve aşırı hava olaylarının riskini artırabilir.",
    "visual": "climate",
    "outcome": "F.8.6.3.3"
  },
  {
    "scenario": "Ormanların yok edilmesi karbon döngüsünü nasıl etkiler?",
    "options": [
      "Karbon tutulumu azalır, CO₂ artabilir",
      "Fotosentez artar",
      "Atmosfer gazları yok olur",
      "Azot döngüsü durur"
    ],
    "answer": 0,
    "explanation": "Ormanlar karbon depolar; ormansızlaşma karbon tutulumunu azaltır.",
    "visual": "carbon",
    "outcome": "F.8.6.3.3"
  },
  {
    "scenario": "Toplu taşımanın yaygınlaşması iklim değişikliğiyle mücadeleye nasıl katkı sağlar?",
    "options": [
      "Araç kaynaklı sera gazı salımını azaltabilir",
      "Ozon tabakasını üretir",
      "Su döngüsünü durdurur",
      "Fotosentezi engeller"
    ],
    "answer": 0,
    "explanation": "Toplu taşıma kişi başına yakıt tüketimini ve salımları azaltabilir.",
    "visual": "climate",
    "outcome": "F.8.6.3.3"
  },
  {
    "scenario": "Ekolojik ayak izini azaltmak isteyen öğrenci ne yapmalıdır?",
    "options": [
      "Gereksiz elektrik tüketimini azaltmak",
      "Tek kullanımlık ürünleri artırmak",
      "Kullanılabilir eşyaları atmak",
      "Kısa mesafede özel araç kullanmak"
    ],
    "answer": 0,
    "explanation": "Enerji ve kaynak tüketimini azaltmak ekolojik ayak izini küçültür.",
    "visual": "climate",
    "outcome": "F.8.6.3.3"
  },
  {
    "scenario": "Kyoto Protokolü gibi anlaşmaların amaçlarından biri nedir?",
    "options": [
      "Sera gazı salımlarını azaltmak için iş birliği",
      "Okyanusları kurutmak",
      "Fotosentezi durdurmak",
      "Azot döngüsünü bitirmek"
    ],
    "answer": 0,
    "explanation": "Kyoto Protokolü sera gazı salımlarını azaltmaya yönelik uluslararası iş birliğini hedeflemiştir.",
    "visual": "climate",
    "outcome": "F.8.6.3.3"
  },
  {
    "scenario": "Okulda kullanılmayan sınıfların ışıklarını kapatmak hangi davranıştır?",
    "options": [
      "Enerji tasarrufu",
      "Atığı artırma",
      "Su kirliliği",
      "Kaynak israfı"
    ],
    "answer": 0,
    "explanation": "Gereksiz elektrik tüketimini azaltmak kaynakları korur.",
    "visual": "recycle",
    "outcome": "F.8.6.4.1"
  },
  {
    "scenario": "Alışverişte bez çanta kullanmak hangi katkıyı sağlar?",
    "options": [
      "Tek kullanımlık plastik atığı azaltır",
      "Atık miktarını artırır",
      "Su kaynaklarını tüketir",
      "Geri dönüşümü engeller"
    ],
    "answer": 0,
    "explanation": "Tekrar kullanılabilir çanta plastik poşet ihtiyacını azaltır.",
    "visual": "recycle",
    "outcome": "F.8.6.4.1"
  },
  {
    "scenario": "Kâğıt, cam, plastik ve metal atıkları ayrı kutularda toplamanın amacı nedir?",
    "options": [
      "Geri dönüşümü kolaylaştırmak",
      "Atıkları karıştırmak",
      "Atıkları doğaya bırakmak",
      "Enerjiyi yok etmek"
    ],
    "answer": 0,
    "explanation": "Kaynağında ayrıştırma uygun geri dönüşüm işlemlerini kolaylaştırır.",
    "visual": "recycle",
    "outcome": "F.8.6.4.3"
  },
  {
    "scenario": "Eski bir tişörtün temizlik bezine dönüştürülmesi hangi davranıştır?",
    "options": [
      "Yeniden kullanım",
      "Atık yakma",
      "Biyolojik birikim",
      "Hammadde çıkarma"
    ],
    "answer": 0,
    "explanation": "Bir ürünü başka amaçla tekrar kullanmak yeniden kullanımdır.",
    "visual": "recycle",
    "outcome": "F.8.6.4.1"
  },
  {
    "scenario": "Yağmur suyunu depolayıp bahçede kullanmak hangi kaynağın tasarrufuna örnektir?",
    "options": [
      "Su",
      "Petrol",
      "Kömür",
      "Doğal gaz"
    ],
    "answer": 0,
    "explanation": "Yağmur suyunu değerlendirmek şebeke suyu ihtiyacını azaltır.",
    "visual": "water",
    "outcome": "F.8.6.4.1"
  },
  {
    "scenario": "Atık piller neden evsel çöpten ayrı toplanmalıdır?",
    "options": [
      "Zararlı maddelerin çevreye yayılma riskini azaltmak için",
      "Piller organik besindir",
      "Piller su döngüsünü başlatır",
      "Piller geri dönüştürülemez"
    ],
    "answer": 0,
    "explanation": "Atık piller uygun toplama ve işleme sistemlerine gönderilmelidir.",
    "visual": "recycle",
    "outcome": "F.8.6.4.3"
  },
  {
    "scenario": "Geri dönüşümün ülke ekonomisine katkısı hangisidir?",
    "options": [
      "Yeni hammadde ihtiyacını azaltması",
      "Orman kesimini artırması",
      "Atık depolamayı artırması",
      "Üretimi durdurması"
    ],
    "answer": 0,
    "explanation": "Geri dönüşüm hammadde ihtiyacını azaltarak ekonomik katkı sağlayabilir.",
    "visual": "recycle",
    "outcome": "F.8.6.4.4"
  },
  {
    "scenario": "Metal atıkların yeniden eritilmesi hangi yararı sağlayabilir?",
    "options": [
      "Yeni maden çıkarma ihtiyacını azaltmak",
      "Madenleri yoktan var etmek",
      "Enerjiyi sıfırlamak",
      "Ayrıştırmayı engellemek"
    ],
    "answer": 0,
    "explanation": "Metal geri dönüşümü birincil hammadde çıkarma ihtiyacını azaltır.",
    "visual": "recycle",
    "outcome": "F.8.6.4.4"
  },
  {
    "scenario": "Bir okul su tasarrufu projesinin başarısını ölçmek için hangi veriler karşılaştırılmalıdır?",
    "options": [
      "Proje öncesi ve sonrası su tüketimi",
      "Duvar rengi",
      "Ayakkabı numaraları",
      "Kapı sayısı"
    ],
    "answer": 0,
    "explanation": "Öncesi-sonrası tüketim verileri projenin etkisini gösterir.",
    "visual": "water",
    "outcome": "F.8.6.4.2"
  },
  {
    "scenario": "Bir fabrika suyu arıtıp üretimde yeniden kullanıyor. Bu hangi ilkeyi destekler?",
    "options": [
      "Kaynakların verimli kullanımı",
      "Atık suyu doğaya bırakma",
      "Daha fazla temiz su tüketme",
      "Kaynak israfı"
    ],
    "answer": 0,
    "explanation": "Arıtılmış suyun yeniden kullanılması temiz su ihtiyacını azaltır.",
    "visual": "recycle",
    "outcome": "F.8.6.4.1"
  },
  {
    "scenario": "Okulda atık miktarını azaltmak için ödevlerin dijital teslim edilmesi hangi tüketimi azaltabilir?",
    "options": [
      "Kâğıt",
      "Güneş ışığı",
      "Oksijen",
      "Rüzgâr"
    ],
    "answer": 0,
    "explanation": "Dijital teslim uygun kullanıldığında kâğıt tüketimini azaltabilir.",
    "visual": "recycle",
    "outcome": "F.8.6.4.2"
  },
  {
    "scenario": "Bir belediye geri dönüşüm tesisi kuruyor. Ekonomik katkısı ne olabilir?",
    "options": [
      "Atıkları ekonomik değere dönüştürmek ve istihdam oluşturmak",
      "Üretimi durdurmak",
      "Kaynak tüketimini artırmak",
      "Ayrıştırmayı engellemek"
    ],
    "answer": 0,
    "explanation": "Geri dönüşüm sektörü hammadde kazanımı ve iş alanları sağlayabilir.",
    "visual": "recycle",
    "outcome": "F.8.6.4.4"
  },
  {
    "scenario": "Kaynakların tasarrufsuz kullanılması gelecekte hangi probleme yol açabilir?",
    "options": [
      "Su ve enerji kıtlığı",
      "Sınırsız kaynak oluşumu",
      "Atıkların kendiliğinden yok olması",
      "Ekosistemlerin etkilenmemesi"
    ],
    "answer": 0,
    "explanation": "Aşırı tüketim doğal kaynakların azalmasına yol açabilir.",
    "visual": "recycle",
    "outcome": "F.8.6.4.5"
  },
  {
    "scenario": "Sürdürülebilir kalkınma hangi düşünceyi vurgular?",
    "options": [
      "Bugünün ihtiyaçlarını gelecek nesillerin olanaklarını tehlikeye atmadan karşılamak",
      "Tüm kaynakları hemen tüketmek",
      "Üretimi tamamen durdurmak",
      "Atıkları doğaya bırakmak"
    ],
    "answer": 0,
    "explanation": "Sürdürülebilir kalkınma bugünün ihtiyaçları ile gelecek nesillerin kaynaklarını dengeler.",
    "visual": "recycle",
    "outcome": "F.8.6.4.1"
  }
];
