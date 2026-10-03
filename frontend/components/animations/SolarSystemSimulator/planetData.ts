export type PlanetId =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

export interface PlanetSource {
  label: string;
  url: string;
}

export interface Planet {
  id: PlanetId;
  name: string;
  englishName: string;
  diameterKm: number;
  meanSunDistanceAu: number;
  orbitalPeriodDays: number;
  /** Signed: a negative value means retrograde rotation. */
  rotationPeriodHours: number;
  knownMoons: number;
  moonCountAsOf: string;
  planetType: string;
  atmosphere: string;
  textureUrl: string;
  phase: number;
  facts: string[];
  sources: PlanetSource[];
}

export const ASTRONOMICAL_UNIT_MILLION_KM = 149.6;

export const PLANETS: Planet[] = [
  {
    id: "mercury",
    name: "Merkür",
    englishName: "Mercury",
    diameterKm: 4879,
    meanSunDistanceAu: 0.38709893,
    orbitalPeriodDays: 87.969,
    rotationPeriodHours: 1407.6,
    knownMoons: 0,
    moonCountAsOf: "NASA/NSSDCA tablosu, 18 Mart 2025",
    planetType: "Kayalık (karasal) gezegen",
    atmosphere:
      "Yüzeye bağlı, çok seyrek bir ekzosferi vardır; oksijen, sodyum, hidrojen, helyum ve potasyum içerir.",
    textureUrl: "/mercury.jpg",
    phase: 0.32,
    facts: [
      "Merkür, Güneş çevresindeki turunu yaklaşık 88 Dünya gününde tamamlar; gezegenler arasında yılı en kısadır.",
      "Yıldızıl dönüşü yaklaşık 1.407,6 saattir; bu, Güneş’e göre ölçülen yaklaşık 4.222,6 saatlik gündüz-gece döngüsüyle aynı değildir.",
      "Merkür, Güneş çevresinde iki tur atarken kendi ekseninde üç kez döner.",
      "Güneş alan yüzeyi yaklaşık 430 °C’ye ulaşabilir; gece sıcaklığı yaklaşık −180 °C’ye düşebilir.",
      "Kutuplardaki bazı derin kraterlerin sürekli karanlık bölgelerinde su buzu bulunabilir.",
    ],
    sources: [
      { label: "NASA/NSSDCA — Gezegen bilgi tablosu", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/" },
      { label: "NASA Science — Merkür bilgileri", url: "https://science.nasa.gov/mercury/facts/" },
    ],
  },
  {
    id: "venus",
    name: "Venüs",
    englishName: "Venus",
    diameterKm: 12104,
    meanSunDistanceAu: 0.723,
    orbitalPeriodDays: 224.7,
    rotationPeriodHours: -5832.5,
    knownMoons: 0,
    moonCountAsOf: "NASA/NSSDCA tablosu, 18 Mart 2025",
    planetType: "Kayalık (karasal ) gezegen",
    atmosphere:
      "Çoğunlukla karbondioksitten oluşan çok yoğun bir atmosferi vardır; bulutlarında sülfürik asit damlacıkları bulunur.",
    textureUrl: "/venus_atmosphere.jpg",
    phase: 1.77,
    facts: [
      "Venüs, Güneş Sistemi’nin yüzeyi en sıcak gezegenidir; güçlü sera etkisi ısıyı hapseder.",
      "Venüs kendi ekseni çevresinde geriye doğru döner; Güneş batıdan doğar.",
      "Bir Venüs yılı yaklaşık 224,7 Dünya günü; bir yıldızıl dönüşü yaklaşık 243 Dünya günüdür.",
      "Venüs’te bir Güneş doğuşundan ötekine yaklaşık 117 Dünya günü geçer.",
      "Kalın bulutları yüzeyi görünür ışıkta örter; uzay araçları yüzeyi radar ile haritalamıştır.",
    ],
    sources: [
      { label: "NASA/NSSDCA — Gezegen bilgi tablosu", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/" },
      { label: "NASA Science — Venüs bilgileri", url: "https://science.nasa.gov/venus/venus-facts/" },
    ],
  },
  {
    id: "earth",
    name: "Dünya",
    englishName: "Earth",
    diameterKm: 12756,
    meanSunDistanceAu: 1.00000011,
    orbitalPeriodDays: 365.256,
    rotationPeriodHours: 23.9345,
    knownMoons: 1,
    moonCountAsOf: "NASA/NSSDCA Dünya bilgi sayfası, 15 Kasım 2024",
    planetType: "Kayalık (karasal ) gezegen",
    atmosphere:
      "Kuru havanın yaklaşık %78’i azot, %21’i oksijendir; geri kalanı çoğunlukla argon ve az miktarda diğer gazlardır.",
    textureUrl: "/earth_daymap.jpg",
    phase: 2.83,
    facts: [
      "Güneş ışığının Dünya’ya ulaşması yaklaşık 8 dakika sürer.",
      "Dünya yüzeyinin yaklaşık %71’i okyanuslarla kaplıdır.",
      "Dönme ekseninin eğikliği, yıl boyunca Güneş ışığının gelişini değiştirerek mevsimlere katkı verir.",
      "Ay, Dünya’dan ortalama yaklaşık 384.400 km uzaktadır.",
      "Ay’ın, genç Dünya’ya büyük bir gök cisminin çarpmasıyla oluştuğu düşünülür.",
    ],
    sources: [
      { label: "NASA/NSSDCA — Dünya bilgi sayfası", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html" },
      { label: "NASA Science — Dünya bilgileri", url: "https://science.nasa.gov/earth/facts/" },
    ],
  },
  {
    id: "mars",
    name: "Mars",
    englishName: "Mars",
    diameterKm: 6792,
    meanSunDistanceAu: 1.52366231,
    orbitalPeriodDays: 686.98,
    rotationPeriodHours: 24.6229,
    knownMoons: 2,
    moonCountAsOf: "NASA Science Mars Moons sayfası, 5 Kasım 2024",
    planetType: "Kayalık (karasal ) gezegen",
    atmosphere:
      "Çok ince atmosferi çoğunlukla karbondioksitten oluşur; azot ve argon da bulunur.",
    textureUrl: "/mars.jpg",
    phase: 3.62,
    facts: [
      "Mars’ın kızıl görünmesinin nedeni, yüzeyindeki demir minerallerinin paslanmasıdır.",
      "Mars’ta bir Güneş günü yaklaşık 24,6 saat sürer ve ‘sol’ adı verilir.",
      "Güneş Sistemi’nin en büyük volkanı Olympus Mons Mars’tadır.",
      "Valles Marineris kanyon sistemi yaklaşık 3.870 kilometre uzunluğundadır.",
      "Mars’ın eksen eğikliği yaklaşık 25° olduğu için belirgin mevsimleri vardır.",
    ],
    sources: [
      { label: "NASA/NSSDCA — Mars bilgi sayfası", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html" },
      { label: "NASA Science — Mars bilgileri", url: "https://science.nasa.gov/mars/facts/" },
      { label: "NASA Science — Mars’ın uyduları", url: "https://science.nasa.gov/mars/moons/" },
    ],
  },
  {
    id: "jupiter",
    name: "Jüpiter",
    englishName: "Jupiter",
    diameterKm: 142984,
    meanSunDistanceAu: 5.20336301,
    orbitalPeriodDays: 4332.589,
    rotationPeriodHours: 9.925,
    knownMoons: 115,
    moonCountAsOf: "NASA Science, 21 Eylül 2026 itibarıyla 115 resmi olarak tanınan uydu bildiriyor",
    planetType: "Gaz devi",
    atmosphere:
      "Çoğunlukla hidrojen ve helyumdan oluşur; bulut bantları ve büyük fırtınalar görülür.",
    textureUrl: "/jupiter.jpg",
    phase: 4.24,
    facts: [
      "Büyük Kırmızı Leke, yüzyıllardır gözlenen dev bir fırtınadır ve Dünya’dan daha geniştir.",
      "Io, Europa, Ganymede ve Callisto adlı dört büyük uydusu 1610’da Galileo tarafından gözlendi.",
      "Ganymede, Güneş Sistemi’nin en büyük uydusudur; Merkür’den bile büyüktür.",
      "Jüpiter kendi ekseni çevresinde yaklaşık 9,9 saatte döner; bu hızlı dönüş gezegeni ekvatordan şişkinleştirir.",
      "Jüpiter’in katı bir yüzeyi yoktur; derinlere indikçe gazları yüksek basınç altında yoğunlaşır.",
    ],
    sources: [
      { label: "NASA/NSSDCA — Jüpiter bilgi sayfası", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/jupiterfact.html" },
      { label: "NASA Science — Jüpiter bilgileri", url: "https://science.nasa.gov/jupiter/jupiter-facts/" },
      { label: "NASA Science — Jüpiter’in uyduları", url: "https://science.nasa.gov/jupiter/moons/" },
    ],
  },
  {
    id: "saturn",
    name: "Satürn",
    englishName: "Saturn",
    diameterKm: 120536,
    meanSunDistanceAu: 9.53707032,
    orbitalPeriodDays: 10755.699,
    rotationPeriodHours: 10.656,
    knownMoons: 293,
    moonCountAsOf: "NASA Science, Ağustos 2026 itibarıyla 293 doğrulanmış uydu bildiriyor",
    planetType: "Gaz devi",
    atmosphere:
      "Hacimce çoğunlukla hidrojen ve helyumdan oluşur; bulut bantları, jet akımları ve fırtınalar içerir.",
    textureUrl: "/saturn.jpg",
    phase: 5.02,
    facts: [
      "Satürn’ün katı bir yüzeyi yoktur; derinlere indikçe gaz ve sıvı katmanları sürer.",
      "Ortalama yoğunluğu sudan düşüktür; ancak bu, gezegenin suya konabileceği anlamına gelmez.",
      "Halkaları çoğunlukla buz ve kaya parçalarından oluşur.",
      "Kuzey kutbunda yaklaşık 30.000 km genişliğinde altıgen biçimli bir jet akımı vardır.",
      "Titan, Merkür’den büyüktür; Enceladus’un buz kabuğunun altında küresel bir okyanus bulunur.",
    ],
    sources: [
      { label: "NASA/NSSDCA — Satürn bilgi sayfası", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/saturnfact.html" },
      { label: "NASA Science — Satürn bilgileri", url: "https://science.nasa.gov/saturn/facts/" },
      { label: "NASA Science — Satürn’ün uyduları", url: "https://science.nasa.gov/saturn/moons/" },
    ],
  },
  {
    id: "uranus",
    name: "Uranüs",
    englishName: "Uranus",
    diameterKm: 51118,
    meanSunDistanceAu: 19.19126393,
    orbitalPeriodDays: 30685.4,
    rotationPeriodHours: -17.24,
    knownMoons: 29,
    moonCountAsOf: "NASA Science, Ağustos 2026 itibarıyla 29 resmi olarak tanınan uydu bildiriyor",
    planetType: "Buz devi",
    atmosphere:
      "Çoğunlukla hidrojen ve helyum içerir; metan, gezegene mavi-yeşil görünüş verir.",
    textureUrl: "/uranus.jpg",
    phase: 5.81,
    facts: [
      "Uranüs, 1781’de William Herschel tarafından teleskopla keşfedildi; teleskopla bulunan ilk gezegendir.",
      "Dönme ekseni yörünge düzlemine yaklaşık 98° eğiktir; bu yüzden adeta yan yatmış halde döner.",
      "Güneş çevresindeki bir turu yaklaşık 84 Dünya yılı sürer; kutup bölgelerindeki mevsimler onlarca yıl sürebilir.",
      "Atmosferindeki metan kırmızı ışığı soğurur; bu nedenle gezegen mavi-yeşil görünür.",
      "Uranüs’ün katı bir yüzeyi yoktur; iç kısmında su, amonyak ve metan gibi yoğun maddeler bulunur.",
    ],
    sources: [
      { label: "NASA/NSSDCA — Uranüs bilgi sayfası", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/uranusfact.html" },
      { label: "NASA Science — Uranüs bilgileri", url: "https://science.nasa.gov/uranus/facts/" },
      { label: "NASA Science — Uranüs’ün uyduları", url: "https://science.nasa.gov/uranus/moons/" },
    ],
  },
  {
    id: "neptune",
    name: "Neptün",
    englishName: "Neptune",
    diameterKm: 49528,
    meanSunDistanceAu: 30.06896348,
    orbitalPeriodDays: 60189.018,
    rotationPeriodHours: 16.11,
    knownMoons: 16,
    moonCountAsOf: "NASA Science Neptün’ün 16 resmi olarak tanınan uydusunu bildiriyor",
    planetType: "Buz devi",
    atmosphere:
      "Atmosferi çoğunlukla hidrojen ve helyumdan, az miktarda metandan oluşur; derinlere indikçe yoğun akışkan katmanlara geçer.",
    textureUrl: "/neptune.jpg",
    phase: 0.76,
    facts: [
      "Neptün, gökyüzü gözlemlerinden önce matematiksel tahminlerle yeri bulunan ilk gezegendir.",
      "Neptün’ün bir yılı yaklaşık 60.189 Dünya günü sürer; mevsimlerinin her biri 40 yıldan uzun olabilir.",
      "Neptün’de saatte 2.000 kilometreyi aşabilen çok hızlı rüzgârlar eser.",
      "Büyük uydusu Triton gezegenin dönüş yönünün tersine dolanır; Neptün tarafından yakalanmış olabilir.",
      "NASA’nın Voyager 2 aracı 1989’da Neptün’ün yakınından geçti; gezegeni yakından inceleyen tek uzay aracıdır.",
    ],
    sources: [
      { label: "NASA/NSSDCA — Neptün bilgi sayfası", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/neptunefact.html" },
      { label: "NASA Science — Neptün bilgileri", url: "https://science.nasa.gov/neptune/neptune-facts/" },
      { label: "NASA Science — Neptün’ün uyduları", url: "https://science.nasa.gov/neptune/moons/" },
    ],
  },
];

export const MAX_SIMULATION_DAYS = Math.max(
  ...PLANETS.map((planet ) => planet.orbitalPeriodDays),
);
