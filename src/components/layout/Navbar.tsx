"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Product", href: "#product-showcase" },
  { label: "Contact", href: "#cta-section" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true); // start dark (over Hero)
  const containerRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: -16,
      opacity: 0,
      duration: 1.0,
      ease: "power3.out",
      delay: 0.2,
    });
  }, { scope: containerRef });

  // Scroll detection — context awareness
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      // Detect background context at nav center
      const elements = document.elementsFromPoint(window.innerWidth / 2, 40);
      let dark = true;

      for (const el of elements) {
        if (el.closest('[data-navbar]')) continue;
        const bg = window.getComputedStyle(el).backgroundColor;
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          // Warm canvas (#F5F2EC) has luminance ~0.96
          dark = luminance < 0.55;
          break;
        }
      }
      setIsDark(dark);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 150);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = isDark ? "text-white/80" : "text-[#1E1E1E]/70";
  const textHover = isDark ? "hover:text-white" : "hover:text-[#1E1E1E]";
  const logoFilter = isDark ? "brightness(0) invert(1)" : "none";

  return (
    <div
      ref={containerRef}
      data-navbar
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-5 md:px-8"
    >
      {/* The pill */}
      <div
        className={`
          relative flex h-[56px] w-full max-w-[1100px] items-center justify-between
          rounded-full border px-5 md:px-7
          transition-all duration-700 ease-out
          ${scrolled
            ? isDark
              ? "bg-white/[0.06] border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-[28px]"
              : "bg-[#F5F2EC]/80 border-[#1E1E1E]/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-[28px]"
            : "bg-transparent border-transparent shadow-none backdrop-blur-[0px]"
          }
        `}
      >
        {/* LOGO */}
        <Link href="/" className="relative shrink-0 flex items-center" style={{ width: 140, height: 48 }}>
          <Image
            src="/images/brand/logo.png"
            alt="Hydrops"
            fill
            sizes="140px"
            className="object-contain transition-all duration-500"
            style={{ filter: logoFilter }}
            priority
          />
        </Link>

        {/* Desktop nav — centered absolutely */}
        <nav
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`
                group relative text-[13px] font-medium tracking-[0.12em] uppercase
                transition-all duration-300
                ${textColor} ${textHover}
              `}
            >
              {item.label}
              {/* Signature gold underline on hover */}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out"
                style={{ background: "rgba(200,169,106,0.7)" }}
              />
            </Link>
          ))}
        </nav>

        {/* CTA — desktop */}
        <a
          href="#cta-section"
          className={`
            hidden md:flex items-center gap-2 shrink-0
            text-[12px] font-medium tracking-[0.12em] uppercase
            px-5 py-2 rounded-full border transition-all duration-300
            ${isDark
              ? "border-white/20 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/[0.06]"
              : "border-[#205C3B]/30 text-[#205C3B] hover:border-[#205C3B]/60 hover:bg-[#205C3B]/[0.04]"
            }
          `}
        >
          Get in Touch
        </a>

        {/* Mobile toggle */}
        <button
          className={`
            md:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-full border
            transition-all duration-300
            ${isDark
              ? "border-white/15 text-white/70 hover:border-white/30 hover:bg-white/[0.06]"
              : "border-[#1E1E1E]/10 text-[#1E1E1E]/60 hover:bg-[#1E1E1E]/[0.04]"
            }
          `}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen
            ? <X size={16} strokeWidth={1.5} />
            : <Menu size={16} strokeWidth={1.5} />
          }
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`
          absolute top-[72px] left-5 right-5 overflow-hidden
          rounded-[20px] border
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top
          ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}
          ${isDark
            ? "bg-[#111]/80 border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-[32px]"
            : "bg-[#F5F2EC]/90 border-[#1E1E1E]/[0.07] shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-[32px]"
          }
        `}
        aria-hidden={!isOpen}
      >
        {/* Gold top line — signature ripple */}
        <div
          className="w-full h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(200,169,106,0.5), transparent)" }}
        />

        <div className="flex flex-col px-8 py-8 gap-1">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center justify-between py-4 border-b
                text-[15px] font-light tracking-wide
                transition-colors duration-200
                ${isDark
                  ? "border-white/[0.06] text-white/70 hover:text-white"
                  : "border-[#1E1E1E]/[0.06] text-[#1E1E1E]/60 hover:text-[#1E1E1E]"
                }
                ${i === navItems.length - 1 ? "border-b-0" : ""}
              `}
            >
              <span>{item.label}</span>
              <span
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ color: "rgba(200,169,106,0.6)" }}
              >
                0{i + 1}
              </span>
            </Link>
          ))}

          {/* Mobile CTA */}
          <a
            href="#cta-section"
            onClick={() => setIsOpen(false)}
            className="mt-6 w-full flex items-center justify-center py-3.5 rounded-full text-[13px] font-medium tracking-[0.15em] uppercase bg-[#205C3B] text-white hover:bg-[#1a4c30] transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
