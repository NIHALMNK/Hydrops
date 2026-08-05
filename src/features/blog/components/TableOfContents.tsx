'use client';

import React, { useEffect, useState } from 'react';
import type { TocItem } from '@/features/blog/types';

interface Props {
  items: TocItem[];
}

export function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Strip user-content- prefix if present for clean matching
            const rawId = entry.target.id.replace(/^user-content-/, '');
            setActiveId(rawId);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -40% 0px', threshold: 0.2 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id) || document.getElementById(`user-content-${item.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav className="sticky top-28 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto pr-4 scrollbar-none" aria-label="Table of Contents">
      <div className="flex items-center gap-2 pb-3 border-b border-neutral-200/80">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-900">
          Contents
        </h4>
      </div>

      <ul className="space-y-2 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id) || document.getElementById(`user-content-${item.id}`);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveId(item.id);
                  }
                }}
                className={`block py-1 border-l-2 pl-3 transition-all duration-300 leading-snug ${
                  isActive
                    ? 'border-amber-500 text-amber-700 font-semibold pl-4 bg-amber-500/5 rounded-r'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
