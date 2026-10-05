export type StellarStageId =
  | "nebula"
  | "protostar"
  | "mainSequence"
  | "redGiant"
  | "planetaryNebula"
  | "whiteDwarf"
  | "redSupergiant"
  | "supernova"
  | "neutronStar"
  | "blackHole";

export type StarPath = "sunLike" | "massive";
export type StellarVisual = "photo" | "protostar" | "supergiant" | "blackHole";

export type StellarStage = {
  id: StellarStageId;
  title: string;
  shortTitle: string;
  phase: string;
  timeScale: string;
  summary: string;
  facts: [string, string, string];
  visual: StellarVisual;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageCredit?: string;
  sourceUrl: string;
  sourceName: string;
};

const NASA_STAR_LIFECYCLE = "https://science.nasa.gov/mission/webb/star-lifecycle/";
const NASA_STAR_TYPES = "https://science.nasa.gov/universe/stars/types/";
const NASA_EDUCATORS = "https://imagine.gsfc.nasa.gov/educators/lessons/xray_spectra/background-lifecycles.html";

export const SHARED_STAGES: StellarStageId[] = ["nebula", "protostar", "mainSequence"];
export const SUN_LIKE_STAGES: StellarStageId[] = ["redGiant", "planetaryNebula", "whiteDwarf"];
export const MASSIVE_STAGES: StellarStageId[] = ["redSupergiant", "supernova"];
export const MASSIVE_OUTCOMES: StellarStageId[] = ["neutronStar", "blackHole"];

export const STELLAR_STAGES: Record<StellarStageId, StellarStage> = {
  nebula: {
    id: "nebula",
    title: "Yıldız oluşum bulutsusu",
    shortTitle: "Bulutsu",
    phase: "YILDIZIN DOĞUM YERİ",
    timeScale: "Başlangıç",
    summary: "Yıldızlar, gaz ve tozdan oluşan dev bulutların kütle çekimiyle sıkışmasıyla doğar.",
    facts: [
      "Bulutsudaki madde, kütle çekimiyle bir araya gelmeye başlar.",
      "Yıldızın toplayabildiği madde, başlangıç kütlesini ve ileride izleyeceği yolu belirler.",
      "Görsel, NASA Webb'in yıldızların oluştuğu Carina Bulutsusu bölgesini gösterir.",
    ],
    visual: "photo",
    image: "/star-life/star-forming-nebula.webp",
    imageAlt: "Carina Bulutsusu'ndaki yıldız oluşum bölgesi, NASA Webb görüntüsü",
    imageCaption: "Carina Bulutsusu · yıldız oluşum bölgesi",
    imageCredit: "NASA / ESA / CSA / STScI",
    sourceUrl: NASA_STAR_LIFECYCLE,
    sourceName: "NASA · Yıldızların yaşam döngüsü",
  },
  protostar: {
    id: "protostar",
    title: "Önyıldız",
    shortTitle: "Önyıldız",
    phase: "ÇÖKME VE ISINMA",
    timeScale: "Yıldız oluşum aşaması",
    summary: "Bulutun merkezinde madde yoğunlaşır; kütle çekimiyle büzülen merkez gittikçe ısınır.",
    facts: [
      "Bu oluşum aşamasındaki genç gök cismine önyıldız denir.",
      "Önyıldız çevresinde gaz ve tozdan oluşan bir disk bulunabilir.",
      "Çekirdekte kararlı hidrojen füzyonu başlayınca yıldız ana kola geçer.",
    ],
    visual: "protostar",
    sourceUrl: NASA_EDUCATORS,
    sourceName: "NASA Goddard · Yıldızların yaşam döngüsü",
  },
  mainSequence: {
    id: "mainSequence",
    title: "Ana kol yıldızı",
    shortTitle: "Ana kol",
    phase: "YILDIZIN KARARLI DÖNEMİ",
    timeScale: "Yıldız ömrünün büyük bölümü",
    summary: "Yıldız, çekirdeğinde hidrojen atomlarını helyuma dönüştürür ve ışık/ısı yayar.",
    facts: [
      "Füzyonun oluşturduğu dışa doğru basınç, kütle çekiminin içe doğru etkisiyle dengelenir.",
      "Güneşimiz şu anda ana kol evresindedir.",
      "Yıldızın rengi, parlaklığı ve bu evrenin süresi kütlesiyle ilişkilidir.",
    ],
    visual: "photo",
    image: "/star-life/sun-main-sequence.webp",
    imageAlt: "Güneş'in NASA tarafından görüntülenmiş yüzeyi; ana kol yıldızı örneği",
    imageCaption: "Güneş · ana kol yıldızı",
    imageCredit: "NASA / SDO",
    sourceUrl: NASA_STAR_TYPES,
    sourceName: "NASA · Yıldız türleri",
  },
  redGiant: {
    id: "redGiant",
    title: "Kırmızı dev",
    shortTitle: "Kırmızı dev",
    phase: "GÜNEŞ BENZERİ YILDIZIN YAŞLI DÖNEMİ",
    timeScale: "Güneş için yaklaşık 5 milyar yıl sonra",
    summary: "Çekirdekteki hidrojen azaldığında, Güneş benzeri yıldızın dış katmanları genişler ve yüzeyi soğuyarak kırmızı görünür.",
    facts: [
      "Yıldızın dış katmanları genişlediği için çapı çok büyür.",
      "Güneş'in yaklaşık 5 milyar yıl sonra kırmızı deve dönüşmesi bekleniyor.",
      "Bu yolun sonunda yıldız süpernova değil, gezegenimsi bulutsu ve beyaz cüce oluşturur.",
    ],
    visual: "photo",
    image: "/star-life/red-giant.webp",
    imageAlt: "NASA sanatçı çiziminde kırmızı dev yıldız",
    imageCaption: "Kırmızı dev · NASA sanatçı çizimi",
    imageCredit: "NASA Goddard Space Flight Center / Chris Smith (KBRwyle)",
    sourceUrl: NASA_STAR_TYPES,
    sourceName: "NASA · Yıldız türleri",
  },
  planetaryNebula: {
    id: "planetaryNebula",
    title: "Gezegenimsi bulutsu",
    shortTitle: "Gezegenimsi bulutsu",
    phase: "DIŞ KATMANLAR UZAYA YAYILIR",
    timeScale: "Geçiş aşaması",
    summary: "Yaşlanan yıldız, dış gaz katmanlarını uzaya bırakır. Bu parlayan gaz bulutuna gezegenimsi bulutsu denir.",
    facts: [
      "Adındaki 'gezegenimsi' sözcüğü yanıltıcıdır; bu bulutsular gezegenlerden oluşmaz.",
      "Bulut, yıldızın uzaya savurduğu gaz ve tozdan meydana gelir.",
      "Merkezde yıldızın sıcak çekirdeği kalır ve zamanla beyaz cüceye dönüşür.",
    ],
    visual: "photo",
    image: "/star-life/planetary-nebula.webp",
    imageAlt: "NASA Webb tarafından görüntülenen Güney Halka gezegenimsi bulutsusu",
    imageCaption: "Güney Halka Bulutsusu · gezegenimsi bulutsu",
    imageCredit: "NASA / ESA / CSA / STScI",
    sourceUrl: NASA_STAR_TYPES,
    sourceName: "NASA · Yıldız türleri",
  },
  whiteDwarf: {
    id: "whiteDwarf",
    title: "Beyaz cüce",
    shortTitle: "Beyaz cüce",
    phase: "GERİDE KALAN YOĞUN ÇEKİRDEK",
    timeScale: "Milyarlarca yıl boyunca soğur",
    summary: "Dış katmanlarını kaybeden yıldızın geriye kalan sıcak ve yoğun çekirdeği beyaz cücedir.",
    facts: [
      "Bir beyaz cüce yaklaşık Dünya büyüklüğünde olabilir; buna rağmen çok yoğundur.",
      "Artık merkezinde ana kol yıldızındaki gibi yeni enerji üreten hidrojen füzyonu sürmez.",
      "Zaman içinde yavaşça soğur; Güneş'in de çok uzak gelecekte bu kalıntıya dönüşmesi bekleniyor.",
    ],
    visual: "photo",
    image: "/star-life/white-dwarf.webp",
    imageAlt: "NASA sanatçı kavramında beyaz cüce yıldız",
    imageCaption: "Beyaz cüce · NASA sanatçı kavramı",
    imageCredit: "NASA",
    sourceUrl: NASA_STAR_TYPES,
    sourceName: "NASA · Yıldız türleri",
  },
  redSupergiant: {
    id: "redSupergiant",
    title: "Kırmızı süperdev",
    shortTitle: "Kırmızı süperdev",
    phase: "BÜYÜK KÜTLELİ YILDIZIN SON DÖNEMİ",
    timeScale: "Güneş benzeri yıldıza göre çok daha kısa",
    summary: "Büyük kütleli yıldız, yakıtı azaldıkça çok geniş bir kırmızı süperdev aşamasına ilerler.",
    facts: [
      "Başlangıçta daha fazla kütle toplayan yıldızlar daha sıcak ve parlak olabilir.",
      "Yıldızın iç bölgelerinde daha ağır elementlerin oluşumu sürer.",
      "Çekirdekte demir birikmesiyle enerji üretimi, kütle çekimine karşı koymakta yetersiz kalır.",
    ],
    visual: "supergiant",
    sourceUrl: NASA_STAR_LIFECYCLE,
    sourceName: "NASA Webb · Yıldızların yaşam döngüsü",
  },
  supernova: {
    id: "supernova",
    title: "Süpernova",
    shortTitle: "Süpernova",
    phase: "ÇEKİRDEK ÇÖKÜŞÜ VE PATLAMA",
    timeScale: "Çok kısa bir kozmik olay",
    summary: "Çekirdeği çöken büyük kütleli yıldız, dış katmanlarını güçlü bir patlamayla uzaya saçar.",
    facts: [
      "Süpernova, yıldızın çevresine madde ve çeşitli elementleri yayar.",
      "Bu fotoğraf patlamanın anını değil, Cassiopeia A adlı süpernova kalıntısını gösterir.",
      "Patlama sonrasında kalan çekirdeğin kütlesi, nötron yıldızı veya kara delik oluşumunda rol oynar.",
    ],
    visual: "photo",
    image: "/star-life/supernova-remnant.webp",
    imageAlt: "Cassiopeia A süpernova kalıntısının NASA Webb görüntüsü",
    imageCaption: "Cassiopeia A · süpernova kalıntısı",
    imageCredit: "NASA / ESA / CSA / STScI / T. Temim",
    sourceUrl: NASA_STAR_LIFECYCLE,
    sourceName: "NASA Webb · Yıldızların yaşam döngüsü",
  },
  neutronStar: {
    id: "neutronStar",
    title: "Nötron yıldızı",
    shortTitle: "Nötron yıldızı",
    phase: "OLASI SONUÇ · DAHA KÜÇÜK KALAN ÇEKİRDEK",
    timeScale: "Süpernova sonrası kalıntı",
    summary: "Süpernova sonrasında geriye kalan çekirdek yeterince küçükse, aşırı yoğun bir nötron yıldızı oluşabilir.",
    facts: [
      "Nötron yıldızları çok küçük bir hacimde çok büyük miktarda madde barındırır.",
      "Bazıları çok hızlı döner ve düzenli enerji ışınları gönderir; bu tür kaynaklara pulsar denir.",
      "Görsel, NASA Chandra'nın gözlediği Vela pulsarını ve çevresini gösterir.",
    ],
    visual: "photo",
    image: "/star-life/neutron-star.webp",
    imageAlt: "Vela pulsarı ve çevresindeki uzay; NASA Chandra gözlemi",
    imageCaption: "Vela pulsarı · nötron yıldızı örneği",
    imageCredit: "NASA / CXC / University of Toronto / M. Durant ve ekibi",
    sourceUrl: NASA_STAR_TYPES,
    sourceName: "NASA · Yıldız türleri",
  },
  blackHole: {
    id: "blackHole",
    title: "Kara delik",
    shortTitle: "Kara delik",
    phase: "OLASI SONUÇ · DAHA BÜYÜK KALAN ÇEKİRDEK",
    timeScale: "Süpernova sonrası olası kalıntı",
    summary: "Kalan çekirdek çok büyükse, kütle çekimi onu kara deliğe dönüştürebilir.",
    facts: [
      "Olay ufkunun içinden ışık bile kaçamaz.",
      "Her büyük kütleli yıldız kara delik olmaz; sonuç, patlama sonrasında kalan çekirdeğe bağlıdır.",
      "Buradaki ışık halkası temsili bir görselleştirmedir; kara delikler ışık yaymaz.",
    ],
    visual: "blackHole",
    sourceUrl: NASA_STAR_LIFECYCLE,
    sourceName: "NASA Webb · Yıldızların yaşam döngüsü",
  },
};
