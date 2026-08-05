'use client';

import React, { useState } from 'react';

interface Props {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return '';
  };

  const handleCopy = async () => {
    const shareUrl = getShareUrl();
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleTwitterShare = () => {
    const shareUrl = getShareUrl();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedInShare = () => {
    const shareUrl = getShareUrl();
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-center gap-3 py-6 my-10 border-y border-neutral-200/80">
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mr-2">
        Share Article
      </span>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 text-xs font-medium transition-colors"
      >
        <span>{copied ? '✓ Copied!' : '🔗 Copy Link'}</span>
      </button>

      {/* Twitter / X */}
      <button
        type="button"
        onClick={handleTwitterShare}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 text-xs font-medium transition-colors"
      >
        <span>𝕏 Share</span>
      </button>

      {/* LinkedIn */}
      <button
        type="button"
        onClick={handleLinkedInShare}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 text-xs font-medium transition-colors"
      >
        <span>in Share</span>
      </button>
    </div>
  );
}
