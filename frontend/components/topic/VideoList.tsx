import { TopicVideo } from "@/types/curriculum";

function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.replace("/", "");
    } else if (parsed.searchParams.get("v")) {
      videoId = parsed.searchParams.get("v");
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export function VideoList({ videos }: { videos: TopicVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <div>
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <span>🎬</span> Videolar
      </h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {videos.map((video) => {
          const embedUrl = video.source === "YOUTUBE" ? getYoutubeEmbedUrl(video.url) : null;

          return (
            <div key={video.id} className="overflow-hidden rounded-card border border-lab-paperLine dark:border-white/10">
              <div className="aspect-video bg-black">
                {video.source === "YOUTUBE" && embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : video.source === "UPLOAD" ? (
                  <video controls className="h-full w-full">
                    <source src={video.url} />
                  </video>
                ) : (
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full w-full items-center justify-center text-sm text-white underline"
                  >
                    Videoyu aç
                  </a>
                )}
              </div>
              <p className="p-3 text-sm font-medium">{video.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
