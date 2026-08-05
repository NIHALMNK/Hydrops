import React from 'react';
import { buildYouTubeEmbedUrl } from '@/lib/youtube';

interface Props {
  youtubeUrl?: string;
  hideVideo?: boolean;
}

export function EmbeddedVideoSection({ youtubeUrl, hideVideo = false }: Props) {
  if (!youtubeUrl || hideVideo) return null;

  const embedUrl = buildYouTubeEmbedUrl(youtubeUrl);
  if (!embedUrl) return null;

  return (
    <section className="my-16 p-8 md:p-12 rounded-3xl bg-neutral-900 text-white shadow-2xl border border-neutral-800">
      {/* Editorial Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-3 border border-amber-500/20">
          <span>🎬</span>
          <span>Watch Related Video</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">
          Visual Insight
        </h3>
        <p className="text-neutral-400 text-sm mt-1">
          This video expands on today&apos;s article with behind-the-scenes footage and demonstrations.
        </p>
      </div>

      {/* Responsive Aspect Ratio Video Container */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-inner bg-black border border-neutral-800">
        <iframe
          src={embedUrl}
          title="Related Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    </section>
  );
}
