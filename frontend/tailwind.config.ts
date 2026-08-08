import type { Config } from "tailwindcss";

// Tasarım tokenları: "Laboratuvar Defteri" teması
// - lab.paper: açık modda zemin (yeşilimsi-beyaz, milimetrik kağıt hissi)
// - lab.ink: koyu modda zemin / açık modda metin (derin uzay lacivert)
// - beaker: ana vurgu (bek beheri camı tonunda camsı turkuaz)
// - reaction: ikincil vurgu / "Günün Sorusu" gibi öne çıkanlar için amber
// - leaf: başarı / ilerleme göstergeleri
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lab: {
          paper: "#F1F7F4",
          paperLine: "#DCEAE3",
          ink: "#0B1B33",
          inkSoft: "#12213A",
          inkMuted: "#3C4A63",
        },
        beaker: {
          DEFAULT: "#0EA5A0",
          light: "#5FD6D0",
          dark: "#087F7B",
        },
        reaction: {
          DEFAULT: "#F5A623",
          light: "#FFCB6B",
          dark: "#C17E0C",
        },
        leaf: {
          DEFAULT: "#3F9D63",
          light: "#7BD79A",
        },
        grade: {
          5: "#0EA5A0",
          6: "#3B82C4",
          7: "#8B5CF6",
          8: "#F5A623",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-paper":
          "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
