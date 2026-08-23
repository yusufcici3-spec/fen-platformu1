// Style reminder: içerik alanları okunaklı, sade ve güvenli biçimde render edilir.
// Bu yardımcı, eski kayıtlarda xss-clean tarafından kaçışlanmış HTML'yi geriye çevirir.

export function decodeStoredHtml(value: string): string {
  if (!value.includes("&lt;") && !value.includes("&gt;")) return value;

  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}
