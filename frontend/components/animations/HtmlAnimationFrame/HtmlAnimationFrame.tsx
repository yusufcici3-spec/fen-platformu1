"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HtmlAnimationFrame.module.css";

type Props = { src: string; title: string; minHeight?: number };

// public/ altındaki bağımsız bir HTML animasyonunu iframe ile gösterir;
// yüksekliği ve koyu/açık temayı sayfa ile eşitler.
export default function HtmlAnimationFrame({ src, title, minHeight = 700 }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight + 300);

  useEffect(() => {
    function sendTheme() {
      const dark = document.documentElement.classList.contains("dark");
      frameRef.current?.contentWindow?.postMessage({ type: "html-anim-theme", theme: dark ? "dark" : "light" }, "*");
    }
    function onMessage(event: MessageEvent) {
      if (event.source !== frameRef.current?.contentWindow) return;
      const data = event.data;
      if (data?.type === "html-anim-height" && typeof data.height === "number") {
        setHeight(Math.max(minHeight, Math.ceil(data.height)));
      } else if (data?.type === "html-anim-ready") {
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
  }, [minHeight]);

  return (
    <div className={styles.wrap}>
      <iframe ref={frameRef} className={styles.frame} src={src} title={title} style={{ height }} loading="lazy" />
    </div>
  );
}
