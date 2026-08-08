"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { TopicImage, TopicVideo, TopicPdf, VideoSource } from "@/types/curriculum";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export function TopicMediaTab({
  topicId,
  images,
  videos,
  pdfs,
  onChanged,
}: {
  topicId: string;
  images: TopicImage[];
  videos: TopicVideo[];
  pdfs: TopicPdf[];
  onChanged: () => void;
}) {
  return (
    <div className="space-y-10">
      <ImageManager topicId={topicId} images={images} onChanged={onChanged} />
      <VideoManager topicId={topicId} videos={videos} onChanged={onChanged} />
      <PdfManager topicId={topicId} pdfs={pdfs} onChanged={onChanged} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// GÖRSELLER
// ---------------------------------------------------------------------------

function ImageManager({
  topicId,
  images,
  onChanged,
}: {
  topicId: string;
  images: TopicImage[];
  onChanged: () => void;
}) {
  const { accessToken } = useAuth();
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !accessToken) return;
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await fetch(`${API_URL}/medya/gorseller/dosya-yukle`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadJson.message ?? "Yükleme başarısız.");

      await apiFetch("/medya/gorseller", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ topicId, url: uploadJson.data.url, caption: caption || undefined }),
      });

      setCaption("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Görsel yüklenemedi.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!accessToken) return;
    await apiFetch(`/medya/gorseller/${id}`, { method: "DELETE", token: accessToken });
    onChanged();
  }

  return (
    <div>
      <h3 className="font-display text-lg font-semibold">🖼️ Görseller</h3>
      <div className="mt-3 space-y-3 rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft">
        <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" />
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Görsel açıklaması (opsiyonel)"
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        {error && <p className="text-sm text-reaction-dark">{error}</p>}
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
        >
          {isUploading ? "Yükleniyor..." : "+ Görsel Yükle"}
        </button>
      </div>

      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="relative overflow-hidden rounded-lg border border-lab-paperLine dark:border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${API_URL.replace("/api", "")}${img.url}`} alt={img.caption ?? ""} className="aspect-video w-full object-cover" />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute right-1 top-1 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// VİDEOLAR
// ---------------------------------------------------------------------------

function VideoManager({
  topicId,
  videos,
  onChanged,
}: {
  topicId: string;
  videos: TopicVideo[];
  onChanged: () => void;
}) {
  const { accessToken } = useAuth();
  const [videoTitle, setVideoTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [source, setSource] = useState<VideoSource>("YOUTUBE");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleAddYoutube() {
    if (!accessToken || !videoTitle.trim() || !youtubeUrl.trim()) return;
    setError(null);
    try {
      await apiFetch("/medya/videolar", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ topicId, title: videoTitle, source: "YOUTUBE", url: youtubeUrl }),
      });
      setVideoTitle("");
      setYoutubeUrl("");
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Video eklenemedi.");
    }
  }

  async function handleUploadFile() {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !accessToken || !videoTitle.trim()) return;
    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("video", file);

      const uploadRes = await fetch(`${API_URL}/medya/videolar/dosya-yukle`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadJson.message ?? "Yükleme başarısız.");

      await apiFetch("/medya/videolar", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ topicId, title: videoTitle, source: "UPLOAD", url: uploadJson.data.url }),
      });

      setVideoTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Video yüklenemedi.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!accessToken) return;
    await apiFetch(`/medya/videolar/${id}`, { method: "DELETE", token: accessToken });
    onChanged();
  }

  return (
    <div>
      <h3 className="font-display text-lg font-semibold">🎬 Videolar</h3>
      <div className="mt-3 space-y-3 rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft">
        <div className="flex gap-2">
          <button
            onClick={() => setSource("YOUTUBE")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${source === "YOUTUBE" ? "bg-beaker text-white" : "border border-lab-paperLine dark:border-white/10"}`}
          >
            YouTube
          </button>
          <button
            onClick={() => setSource("UPLOAD")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${source === "UPLOAD" ? "bg-beaker text-white" : "border border-lab-paperLine dark:border-white/10"}`}
          >
            Dosya Yükle
          </button>
        </div>

        <input
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          placeholder="Video başlığı"
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />

        {source === "YOUTUBE" ? (
          <>
            <input
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
            />
            <button onClick={handleAddYoutube} className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark">
              + YouTube Videosu Ekle
            </button>
          </>
        ) : (
          <>
            <input ref={fileInputRef} type="file" accept="video/mp4,video/webm,video/ogg" />
            <button
              onClick={handleUploadFile}
              disabled={isUploading}
              className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
            >
              {isUploading ? "Yükleniyor..." : "+ Video Dosyası Yükle"}
            </button>
          </>
        )}

        {error && <p className="text-sm text-reaction-dark">{error}</p>}
      </div>

      <ul className="mt-3 space-y-2">
        {videos.map((v) => (
          <li key={v.id} className="flex items-center justify-between rounded-lg border border-lab-paperLine px-3 py-2 text-sm dark:border-white/10">
            <span>
              {v.source === "YOUTUBE" ? "▶️" : "📹"} {v.title}
            </span>
            <button onClick={() => handleDelete(v.id)} className="text-xs font-semibold text-reaction-dark hover:underline">
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PDF'LER
// ---------------------------------------------------------------------------

function PdfManager({ topicId, pdfs, onChanged }: { topicId: string; pdfs: TopicPdf[]; onChanged: () => void }) {
  const { accessToken } = useAuth();
  const [pdfTitle, setPdfTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !accessToken || !pdfTitle.trim()) return;
    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const uploadRes = await fetch(`${API_URL}/medya/pdfler/dosya-yukle`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadJson.message ?? "Yükleme başarısız.");

      await apiFetch("/medya/pdfler", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ topicId, title: pdfTitle, url: uploadJson.data.url }),
      });

      setPdfTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "PDF yüklenemedi.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!accessToken) return;
    await apiFetch(`/medya/pdfler/${id}`, { method: "DELETE", token: accessToken });
    onChanged();
  }

  return (
    <div>
      <h3 className="font-display text-lg font-semibold">📄 PDF Konu Özeti</h3>
      <div className="mt-3 space-y-3 rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft">
        <input
          value={pdfTitle}
          onChange={(e) => setPdfTitle(e.target.value)}
          placeholder="PDF başlığı"
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        <input ref={fileInputRef} type="file" accept="application/pdf" />
        {error && <p className="text-sm text-reaction-dark">{error}</p>}
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
        >
          {isUploading ? "Yükleniyor..." : "+ PDF Yükle"}
        </button>
      </div>

      <ul className="mt-3 space-y-2">
        {pdfs.map((p) => (
          <li key={p.id} className="flex items-center justify-between rounded-lg border border-lab-paperLine px-3 py-2 text-sm dark:border-white/10">
            📄 {p.title}
            <button onClick={() => handleDelete(p.id)} className="text-xs font-semibold text-reaction-dark hover:underline">
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
