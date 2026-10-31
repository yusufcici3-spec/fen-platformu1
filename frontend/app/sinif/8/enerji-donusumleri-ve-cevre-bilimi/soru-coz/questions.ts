// Özgün, senaryolu 8. sınıf Fen Bilimleri soru bankası: Besin zinciri ve enerji akışı.
export type FoodQuestion = { scenario: string; options: string[]; answer: number; explanation: string; visual: string; };
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
    "visual": "chain"
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
    "visual": "pond"
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
    "visual": "web"
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
    "visual": "chain"
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
    "visual": "cycle"
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
    "visual": "chain"
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
    "visual": "pond"
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
    "visual": "pyramid"
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
    "visual": "pyramid"
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
    "visual": "pyramid"
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
    "visual": "pyramid"
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
    "visual": "web"
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
    "visual": "web"
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
    "visual": "web"
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
    "visual": "web"
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
    "visual": "pond"
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
    "visual": "web"
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
    "visual": "pyramid"
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
    "visual": "pond"
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
    "visual": "cycle"
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
    "visual": "web"
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
    "visual": "chain"
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
    "visual": "pyramid"
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
    "visual": "pyramid"
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
    "visual": "chain"
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
    "visual": "pond"
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
    "visual": "web"
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
    "visual": "web"
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
    "visual": "web"
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
    "visual": "pyramid"
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
    "visual": "cycle"
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
    "visual": "cycle"
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
    "visual": "pyramid"
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
    "visual": "cycle"
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
    "visual": "web"
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
    "visual": "web"
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
    "visual": "pond"
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
    "visual": "chain"
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
    "visual": "cycle"
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
    "visual": "pyramid"
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
    "visual": "pyramid"
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
    "visual": "web"
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
    "visual": "web"
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
    "visual": "pond"
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
    "visual": "web"
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
    "visual": "cycle"
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
    "visual": "chain"
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
    "visual": "cycle"
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
    "visual": "web"
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
    "visual": "pond"
  },
  {
    "scenario": "Bir bilimsel ekip, bir ekosistemdeki tüm üreticilerin ortadan kalktığını varsayıyor. Uzun vadede en olası sonuç hangisidir?",
    "options": [
      "Besin ve enerji girişinin büyük ölçüde kesilmesi",
      "Tüketicilerin üretici olması",
      "Enerjinin sınırsız artması",
      "Ayrıştırıcıların fotosentez yapması"
    ],
    "answer": 0,
    "explanation": "Üreticiler çoğu ekosistemde enerji girişinin temel kapısıdır; yoklukları besin ağını çökertebilir.",
    "visual": "web"
  }
];
