"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Deliberately sparse — the nav is a quiet frame, not a feature
const NAV_LINKS = [
  { label: "Story",   href: "#philosophy-section" },
  { label: "Product", href: "#product-showcase-section" },
  { label: "Contact", href: "#cta-section" },
];

// Detect luminance of the background behind the nav
function useSectionContext() {
  const [isDark, setIsDark] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? y / maxScroll : 0);

      // Sample the pixel at nav height to determine context
      const probeX = window.innerWidth / 2;
      const probeY = 32;
      const els = document.elementsFromPoint(probeX, probeY);
      for (const el of els) {
        if (el.hasAttribute("data-navbar")) continue;
        if (el.closest("[data-navbar]")) continue;
        const bg = window.getComputedStyle(el).backgroundColor;
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (m) {
          const lum = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
          setIsDark(lum < 0.5);
          break;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(update, 200);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { isDark, scrollProgress };
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayLinksRef = useRef<HTMLDivElement>(null);
  const { isDark, scrollProgress } = useSectionContext();

  // ── Entrance: nav items drift in from top after 300ms
  useGSAP(() => {
    const logo = navRef.current?.querySelector("[data-logo]");
    const links = navRef.current?.querySelectorAll("[data-navlink]");
    const menuBtn = navRef.current?.querySelector("[data-menubtn]");

    gsap.set([logo, links, menuBtn], { opacity: 0, y: -12 });
    gsap.to([logo, ...(links ?? []), menuBtn].filter(Boolean), {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.07,
      delay: 0.5,
    });
  }, { scope: navRef });

  // ── Full-screen overlay open / close
  const openMenu = useCallback(() => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";

    const ol = overlayRef.current;
    const links = overlayLinksRef.current?.querySelectorAll("[data-overlay-link]");

    gsap.set(ol, { display: "flex" });
    gsap.fromTo(ol, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
    if (links) {
      gsap.fromTo(links,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.15 }
      );
    }
  }, []);

  const closeMenu = useCallback(() => {
    const ol = overlayRef.current;
    gsap.to(ol, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setMenuOpen(false);
        document.body.style.overflow = "";
      },
    });
  }, []);

  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && menuOpen) closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  // ── Context-driven colour tokens
  const logoFilter   = isDark ? "brightness(0) invert(1)" : "none";
  const linkColor    = isDark ? "rgba(255,255,255,0.70)" : "rgba(30,30,30,0.65)";
  const linkHover    = isDark ? "#FFFFFF" : "#1E1E1E";
  const toggleColor  = isDark ? "rgba(255,255,255,0.60)" : "rgba(30,30,30,0.55)";

  return (
    <>
      {/* ── Scroll progress thread — Hydrops signature: warm gold, paper-thin ── */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[60] h-px origin-left pointer-events-none"
        style={{
          width: "100%",
          transform: `scaleX(${scrollProgress})`,
          background: "linear-gradient(90deg, rgba(200,169,106,0.8), rgba(200,169,106,0.4))",
          transition: "transform 0.05s linear",
        }}
      />

      {/* ── Navigation bar ── */}
      <nav
        ref={navRef}
        data-navbar
        aria-label="Primary navigation"
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/*
          Layout philosophy:
          Logo anchored to the far left — unequivocal identity
          Center — empty, breathing — never compete with the Hero
          Right — sparse text links + a single menu trigger on mobile
          No background. No pill. No border. Text floats in space.
        */}
        <div className="flex items-center justify-between px-7 md:px-12 lg:px-16 pt-7 md:pt-8">

          {/* LOGO — wordmark, not decorative */}
          <Link
            href="/"
            data-logo
            className="relative shrink-0 block"
            style={{ width: 136, height: 44 }}
            aria-label="Hydrops – Home"
          >
            <Image
              src="/images/brand/logo.png"
              alt="Hydrops"
              fill
              sizes="136px"
              className="object-contain"
              style={{
                filter: logoFilter,
                transition: "filter 0.6s ease",
              }}
              priority
            />
          </Link>

          {/* DESKTOP links — right-anchored, minimal, no underline by default */}
          <div className="hidden md:flex items-center gap-10 lg:gap-14">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-navlink
                className="relative group text-[12px] font-normal tracking-[0.18em] uppercase select-none"
                style={{
                  color: linkColor,
                  transition: "color 0.5s ease",
                }}
                onMouseEnter={e => gsap.to(e.currentTarget, { color: linkHover, duration: 0.3 })}
                onMouseLeave={e => gsap.to(e.currentTarget, { color: linkColor, duration: 0.5 })}
              >
                {item.label}
                {/* Gold thread — appears on hover, disappears on leave */}
                <span
                  aria-hidden
                  className="absolute -bottom-[5px] left-0 h-px w-0 group-hover:w-full"
                  style={{
                    background: "rgba(200,169,106,0.65)",
                    transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </Link>
            ))}

            {/* Inquiry — not a button. Just a small, clean text-link with a dot */}
            <a
              href="#cta-section"
              data-navlink
              className="flex items-center gap-2 text-[12px] font-normal tracking-[0.18em] uppercase"
              style={{ color: "rgba(200,169,106,0.85)", transition: "color 0.4s ease" }}
              onMouseEnter={e => gsap.to(e.currentTarget, { color: "rgba(200,169,106,1)", duration: 0.3 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { color: "rgba(200,169,106,0.85)", duration: 0.5 })}
            >
              {/* Minimal dot — brand mark */}
              <span
                aria-hidden
                className="inline-block w-[5px] h-[5px] rounded-full"
                style={{ background: "rgba(200,169,106,0.8)" }}
              />
              Enquire
            </a>
          </div>

          {/* MOBILE menu trigger — a minimal two-line mark */}
          <button
            data-menubtn
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={openMenu}
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 items-end group"
          >
            <span
              className="block h-px w-6 group-hover:w-7 transition-all duration-300"
              style={{ background: toggleColor }}
            />
            <span
              className="block h-px w-4 group-hover:w-7 transition-all duration-300"
              style={{ background: toggleColor }}
            />
          </button>
        </div>
      </nav>

      {/* ── Full-screen menu overlay ── */}
      {/*
        Not a dropdown. Not a drawer.
        The entire screen becomes the menu — editorial, immersive.
        The visitor feels they are entering a different room.
      */}
      <div
        ref={overlayRef}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation"
        className="fixed inset-0 z-[55] hidden flex-col"
        style={{ backgroundColor: "#0E0E0E" }}
      >
        {/* Gold top thread */}
        <div
          aria-hidden
          className="w-full h-px shrink-0"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(200,169,106,0.6) 40%, rgba(200,169,106,0.8) 60%, transparent 100%)" }}
        />

        {/* Close trigger — top right */}
        <div className="flex justify-between items-start px-7 md:px-14 pt-7 md:pt-8 shrink-0">
          {/* Ghost logo — warm white, ultra-light */}
          <span
            className="text-[11px] font-light tracking-[0.4em] uppercase select-none"
            style={{ color: "rgba(255,255,255,0.30)" }}
          >
            Hydrops
          </span>
          <button
            onClick={closeMenu}
            aria-label="Close navigation"
            className="flex flex-col justify-center gap-[5px] w-9 h-9 items-end group"
          >
            {/* × as two lines rotated */}
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.50)", transform: "rotate(45deg) translateY(3.5px)" }}
            />
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.50)", transform: "rotate(-45deg) translateY(-3.5px)" }}
            />
          </button>
        </div>

        {/* Navigation items — editorial large type */}
        <div
          ref={overlayLinksRef}
          className="flex-1 flex flex-col justify-center px-8 md:px-16"
        >
          {NAV_LINKS.concat({ label: "Enquire", href: "#cta-section" }).map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              data-overlay-link
              onClick={closeMenu}
              className="group flex items-baseline justify-between py-6 md:py-8 border-b border-white/[0.06] cursor-pointer"
            >
              {/* Large editorial link */}
              <span
                className="font-light tracking-tight text-white/80 group-hover:text-white transition-colors duration-400"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1 }}
              >
                {item.label}
              </span>
              {/* Index — right side, small gold */}
              <span
                className="text-[11px] tracking-[0.3em] uppercase self-center"
                style={{ color: "rgba(200,169,106,0.5)" }}
              >
                0{i + 1}
              </span>
            </Link>
          ))}
        </div>

        {/* Footer of overlay */}
        <div
          className="px-8 md:px-16 pb-10 flex items-center justify-between"
        >
          <p
            className="text-[11px] tracking-[0.25em] uppercase"
            style={{ color: "rgba(255,255,255,0.20)" }}
          >
            Pure Coconut Oil · India
          </p>
          <p
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(200,169,106,0.35)" }}
          >
            © 2026 Hydrops
          </p>
        </div>
      </div>
    </>
  );
}
