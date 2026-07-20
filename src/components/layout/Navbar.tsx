"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "HOME", href: "#" },
  { label: "ABOUT US", href: "#" },
  { label: "OUR PRODUCT", href: "#" },
  { label: "CONTACT US", href: "#" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: -20,
      opacity: 0,
      scale: 0.97,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  useEffect(() => {
    const handleScroll = () => {
      // Find the element at the center of the navbar
      const elements = document.elementsFromPoint(window.innerWidth / 2, 56);
      let foundLight = false;

      for (const el of elements) {
        // Skip navbar itself and its children
        if (el.tagName === 'NAV' || el.tagName === 'HEADER' || el.closest('header') || el.closest('nav')) continue;
        
        const bgColor = window.getComputedStyle(el).backgroundColor;
        const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          const a = match[4] ? parseFloat(match[4]) : 1;
          
          if (a > 0.1) {
            // Calculate relative luminance
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            if (luminance > 0.6) {
               foundLight = true;
            }
            break;
          }
        }
      }
      setIsLight(foundLight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check after a slight delay to ensure render
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed top-4 left-1/2 z-50 w-[calc(100%-48px)] max-w-[1120px] -translate-x-1/2"
    >
      <header 
        className={`relative flex h-[64px] w-full items-center justify-between rounded-full border px-8 shadow-lg backdrop-blur-[24px] transition-all duration-500 ease-out ${
          isLight 
            ? "bg-black/[0.04] border-black/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_30px_rgba(0,0,0,0.03)]" 
            : "bg-white/[0.08] border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_30px_rgba(0,0,0,0.1)]"
        }`}
      >
        {/* LOGO */}
        <Link href="/" className="relative flex h-[58px] w-[172px] md:h-[60px] md:w-[188px] shrink-0 items-center">
          <Image 
            src="/images/brand/logo.png" 
            alt="Hydrops Logo" 
            fill
            sizes="(max-width: 768px) 172px, 188px"
            className="object-contain transition-all duration-500"
            style={{ 
              filter: isLight ? 'invert(1) hue-rotate(180deg) brightness(0.8)' : 'none' 
            }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden absolute left-1/2 -translate-x-1/2 md:flex items-center gap-12 lg:gap-14">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="group relative text-[15px] font-semibold tracking-wide transition-all duration-250 hover:-translate-y-[1px] text-[#388e4a] hover:text-black"
            >
              {item.label}
              <span 
                className={`absolute -bottom-1.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full opacity-0 transition-all duration-[250ms] ease-out group-hover:w-full group-hover:opacity-100 ${
                  isLight ? "bg-[#388e4a]" : "bg-[#388e4a] shadow-[0_0_8px_rgba(56,142,74,0.4)]"
                }`} 
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-full border backdrop-blur-md transition-colors text-[#388e4a] ${
            isLight ? "border-black/10 bg-black/5 hover:bg-black/10" : "border-white/10 bg-white/5 hover:bg-white/10"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Panel */}
      <div 
        className={`absolute left-0 top-[80px] w-full overflow-hidden rounded-[24px] border shadow-2xl backdrop-blur-[32px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        } ${
          isLight ? "bg-white/80 border-black/10 shadow-[0_16px_40px_rgba(0,0,0,0.05)]" : "bg-black/40 border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
        }`}
      >
        <div className="flex flex-col gap-6 p-8 items-center justify-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xl font-medium tracking-wide transition-colors active:scale-[0.98] text-[#388e4a] hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
