export type SpaceTechnologyId =
  | "iss"
  | "voyager"
  | "webb"
  | "rocket"
  | "shuttle"
  | "observatory";

export type TechnologyZone = "near" | "deep";
export type TechnologyIcon =
  | "station"
  | "probe"
  | "telescope"
  | "rocket"
  | "shuttle"
  | "observatory";

export type SpaceTechnology = {
  id: SpaceTechnologyId;
  name: string;
  shortName: string;
  category: string;
  zone: TechnologyZone;
  icon: TechnologyIcon;
  summary: string;
  facts: [string, string, string, string, string];
  image?: string;
  imageAlt?: string;
  sourceLabel: string;
  sourceUrl: string;
  orbitRadius: number;
  orbitSeconds: number;
  orbitDelay: number;
  stationary?: boolean;
};

export const spaceTechnologies: SpaceTechnology[] = [
  {
    id: "iss",
    name: "Uluslararası Uzay İstasyonu",
    shortName: "Uzay istasyonu",
    category: "İnsanlı araştırma",
    zone: "near",
    icon: "station",
    summary:
      "ISS, astronotların uzayda yaşayıp çalıştığı ve Dünya’yı gözlemlediği büyük bir yörünge laboratuvarıdır.",
    facts: [
      "Dünya’nın yaklaşık 400 km üzerindeki yörüngede hareket eder.",
      "Saniyede yaklaşık 7,7 km hızla ilerler; Dünya çevresindeki bir turu yaklaşık 90 dakika sürer.",
      "Astronotlar burada yaşar, çalışır ve bilimsel deneyler yapar.",
      "Mikro yerçekimi; insan vücudu, bitkiler, malzemeler ve teknoloji üzerine deneylere imkân verir.",
      "Birçok ülkenin ortak çalışmasıyla işletilen uluslararası bir araştırma merkezidir.",
    ],
    image: "/space-tech/iss.webp",
    imageAlt: "Dünya'nın ufku üzerinde süzülen Uluslararası Uzay İstasyonu",
    sourceLabel: "NASA · Uluslararası Uzay İstasyonu",
    sourceUrl: "https://www.nasa.gov/international-space-station/",
    orbitRadius: 33,
    orbitSeconds: 28,
    orbitDelay: 0,
  },
  {
    id: "voyager",
    name: "Voyager Uzay Sondaları",
    shortName: "Uzay sondası",
    category: "Robotik keşif",
    zone: "deep",
    icon: "probe",
    summary:
      "Voyager 1 ve Voyager 2, uzaktaki gök cisimlerini yakından incelemek ve ölçüm göndermek üzere tasarlanmış insansız keşif araçlarıdır.",
    facts: [
      "İkiz uzay sondaları 1977’de fırlatıldı.",
      "Jüpiter ve Satürn başta olmak üzere dış gezegenleri yakından incelediler.",
      "Voyager 1, 2012’de; Voyager 2 ise 2018’de Güneş’in heliosfer sınırını geçti.",
      "Dünya ile radyo sinyalleri üzerinden haberleşirler; çok uzak oldukları için sinyalin ulaşması saatler alabilir.",
      "Her iki araçta da Dünya’daki yaşamı ve kültürleri anlatan Altın Plak bulunur.",
    ],
    image: "/space-tech/voyager.webp",
    imageAlt: "Geniş antenli Voyager uzay sondasının uzaydaki görünümü",
    sourceLabel: "NASA · Voyager görevi",
    sourceUrl: "https://science.nasa.gov/mission/voyager/",
    orbitRadius: 42,
    orbitSeconds: 38,
    orbitDelay: 13,
  },
  {
    id: "webb",
    name: "James Webb Uzay Teleskobu",
    shortName: "Uzay teleskobu",
    category: "Uzay gözlemi",
    zone: "deep",
    icon: "telescope",
    summary:
      "Webb, atmosferimizin dışından kızılötesi ışığı gözleyerek yıldızların, gezegenlerin ve galaksilerin oluşumunu araştırır.",
    facts: [
      "25 Aralık 2021’de fırlatıldı ve Dünya’dan yaklaşık 1,5 milyon km uzaktaki L2 bölgesine yerleşti.",
      "Hubble gibi Dünya çevresinde değil, Güneş çevresindeki yörüngede görev yapar.",
      "Kızılötesi ışığı algılayarak çok uzak ve eski gök cisimlerini inceleyebilir.",
      "Beş katmanlı güneş kalkanı, teleskobu Güneş’in ve Dünya’nın ısısından korur.",
      "Rokete sığabilmesi için katlanarak fırlatıldı; uzayda aynası ve güneş kalkanı açıldı.",
    ],
    image: "/space-tech/webb.webp",
    imageAlt: "Altın aynalı James Webb Uzay Teleskobu'nun uzaydaki çizimi",
    sourceLabel: "NASA · James Webb Uzay Teleskobu",
    sourceUrl: "https://science.nasa.gov/mission/webb/",
    orbitRadius: 47,
    orbitSeconds: 44,
    orbitDelay: 25,
  },
  {
    id: "rocket",
    name: "Uzay Roketi · Saturn V",
    shortName: "Uzay roketi",
    category: "Fırlatma aracı",
    zone: "near",
    icon: "rocket",
    summary:
      "Roketler uyduları, astronotları ve araştırma araçlarını Dünya’dan uzaya taşır. Saturn V, Apollo Ay görevlerinde kullanılmıştır.",
    facts: [
      "Roket, gazı geriye doğru püskürterek ileri yönlü itki kazanır; çalışmak için havaya ihtiyaç duymaz.",
      "Fırlatma araçları uyduları ve uzay araçlarını yörüngeye taşır.",
      "Saturn V, Apollo programının Ay görevleri için geliştirilmiş çok aşamalı bir roketti.",
      "Yakıtı biten kademeler ayrılır; böylece kalan roket daha hafif şekilde yoluna devam eder.",
      "Saturn V’in ilk kademesinde beş büyük F-1 motoru bulunuyordu.",
    ],
    sourceLabel: "NASA · Saturn fırlatma araçları",
    sourceUrl:
      "https://www.nasa.gov/wp-content/uploads/static/history/alsj/02_Saturn_Launch_Vehicles_pp8-14.pdf",
    orbitRadius: 27,
    orbitSeconds: 21,
    orbitDelay: 7,
  },
  {
    id: "shuttle",
    name: "Uzay Mekiği",
    shortName: "Uzay mekiği",
    category: "İnsanlı uzay aracı",
    zone: "near",
    icon: "shuttle",
    summary:
      "Uzay mekiği roket gibi fırlatılır, yörüngede görev yapar ve Dünya’ya dönerken kanatlı bir planör gibi piste inerdi.",
    facts: [
      "NASA’nın uzay mekiği, yeniden kullanılmak üzere tasarlanmış ilk insanlı uzay araçlarından biriydi.",
      "Fırlatılırken roket itişi kullanır; yörüngede bir uzay aracı gibi hareket eder.",
      "Dünya’ya dönüşünde motorla uçak gibi değil, süzülerek piste iner.",
      "Uydular taşıdı; Hubble Uzay Teleskobu’nu yörüngeye ulaştırdı ve bakım görevleri yaptı.",
      "NASA Uzay Mekiği programı 1981–2011 yılları arasında uçuşlar gerçekleştirdi.",
    ],
    sourceLabel: "NASA · Uzay Mekiği",
    sourceUrl: "https://www.nasa.gov/reference/the-space-shuttle/",
    orbitRadius: 37,
    orbitSeconds: 32,
    orbitDelay: 19,
  },
  {
    id: "observatory",
    name: "Yeryüzü Gözlemevi",
    shortName: "Gözlemevi",
    category: "Yeryüzü gözlemi",
    zone: "near",
    icon: "observatory",
    summary:
      "Gözlemevleri, teleskoplarla gökyüzünü inceleyen araştırma merkezleridir. Türkiye’deki örneklerden biri TÜBİTAK Ulusal Gözlemevi’dir.",
    facts: [
      "Uzay teleskobundan farklı olarak Dünya yüzeyinde kurulur.",
      "Teleskop aynaları veya mercekleri gök cisimlerinden gelen ışığı toplar.",
      "Işık kirliliğinin az, gökyüzünün açık olduğu yüksek yerler gözlem için avantaj sağlar.",
      "Gökbilimciler yıldızları, gezegenleri, bulutsuları ve galaksileri inceleyebilir.",
      "TÜBİTAK Ulusal Gözlemevi, Antalya’daki Bakırlıtepe yerleşkesinde araştırma ve gözlem çalışmaları yürütür.",
    ],
    sourceLabel: "TÜBİTAK · Ulusal Gözlemevi",
    sourceUrl: "https://tubitak.gov.tr/en/node/14587",
    orbitRadius: 0,
    orbitSeconds: 1,
    orbitDelay: 0,
    stationary: true,
  },
];
