"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WeightLatitudeSimulator.module.css";

export default function WeightLatitudeSimulator() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1500);

  useEffect(() => {
    function sendTheme() {
      const dark = document.documentElement.classList.contains("dark");
      frameRef.current?.contentWindow?.postMessage(
        { type: "agirlik-enlem-theme", theme: dark ? "dark" : "light" },
        "*"
      );
    }

    function onMessage(event: MessageEvent) {
      if (event.source !== frameRef.current?.contentWindow) return;
      const data = event.data;
      if (data?.type === "agirlik-enlem-height" && typeof data.height === "number") {
        setHeight(Math.max(700, Math.ceil(data.height)));
      } else if (data?.type === "agirlik-enlem-ready") {
        sendTheme();
      }
    }

    window.addEventListener("message", onMessage);
    const observer = new MutationObserver(sendTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      window.removeEventListener("message", onMessage);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <iframe
        ref={frameRef}
        className={styles.frame}
        src="/animasyonlar/agirlik-enlem.html"
        title="Ağırlık ve enlem etkileşimli animasyonu"
        style={{ height }}
        loading="lazy"
      />
    </div>
  );
}
