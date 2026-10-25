// public/yazililar/<sınıf>/ klasörlerini tarar ve content/yazililar.generated.json dosyasını üretir.
// - Klasördeki .pdf dosyaları  -> PDF olarak listelenir
// - Klasördeki .jpg/.jpeg/.png/.webp/.gif dosyaları -> resim olarak listelenir
// - Klasör içindeki alt klasörler -> çok sayfalı resim seti (sayfalar ad sırasına göre)
// Dosya adı, başlık olarak kullanılır (alt çizgi boşluğa çevrilir). Her build'de otomatik çalışır.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = path.join(root, "public", "yazililar");
const out = path.join(root, "content", "yazililar.generated.json");
const GRADES = ["5", "6", "7", "8"];
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const collator = new Intl.Collator("tr", { numeric: true, sensitivity: "base" });

const clean = (t) => t.replace(/_/g, " ").replace(/\s+/g, " ").trim();
const titleOf = (name) => clean(name.replace(/\.[^.]+$/, "")); // dosya adı: uzantı atılır
const folderTitle = (name) => clean(name); // klasör adı olduğu gibi kalır
const urlOf = (...parts) => "/yazililar/" + parts.map(encodeURIComponent).join("/");

const result = {};
for (const g of GRADES) {
  const dir = path.join(base, g);
  const items = [];
  if (fs.existsSync(dir)) {
    const entries = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => !e.name.startsWith("."));
    entries.sort((a, b) => collator.compare(a.name, b.name));
    for (const e of entries) {
      const ext = path.extname(e.name).toLowerCase();
      if (e.isFile() && ext === ".pdf") {
        items.push({ id: `${g}/${e.name}`, title: titleOf(e.name), kind: "pdf", url: urlOf(g, e.name) });
      } else if (e.isFile() && IMAGE_EXT.has(ext)) {
        items.push({ id: `${g}/${e.name}`, title: titleOf(e.name), kind: "image", url: urlOf(g, e.name) });
      } else if (e.isDirectory()) {
        const pages = fs
          .readdirSync(path.join(dir, e.name), { withFileTypes: true })
          .filter((f) => f.isFile() && IMAGE_EXT.has(path.extname(f.name).toLowerCase()) && !f.name.startsWith("."))
          .sort((a, b) => collator.compare(a.name, b.name))
          .map((f) => urlOf(g, e.name, f.name));
        if (pages.length > 0) items.push({ id: `${g}/${e.name}/`, title: folderTitle(e.name), kind: "set", url: pages[0], pages });
      }
    }
  }
  result[g] = items;
}

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(result, null, 2) + "\n");
console.log("yazililar:", GRADES.map((g) => `${g}. sınıf ${result[g].length}`).join(", "));
