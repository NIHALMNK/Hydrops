'use client';

import React, { useState, useEffect } from 'react';

interface SectionNavItem {
  id: string;
  label: string;
}

const SECTION_ITEMS: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'story', label: 'Story' },
  { id: 'specifications', label: 'Specs' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'uses', label: 'Uses' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'manufacturing', label: 'Craft' },
  { id: 'certifications', label: 'Purity' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'faq', label: 'FAQ' },
];

export function ProductSectionNav() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);

      const sections = SECTION_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!isScrolled) return null;

  return (
    <nav className="fixed top-20 left-0 right-0 z-40 px-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-neutral-900/90 backdrop-blur-md border border-neutral-800/90 rounded-full px-4 py-2 shadow-2xl pointer-events-auto flex items-center justify-between overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 px-3 hidden sm:inline-block border-r border-neutral-800 mr-2 shrink-0">
          Hydrops Oil
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {SECTION_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wide transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
