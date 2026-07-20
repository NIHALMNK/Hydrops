"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_LINKS = [
  { label: "Story",   href: "#philosophy-section" },
  { label: "Product", href: "#product-showcase-section" },
  { label: "Contact", href: "#cta-section" },
];

// ─────────────────────────────────────────────
// Hook: continuously reads the visual context
// beneath the nav to drive colour adaptation.
// We probe TWO points:
//   1. Center of page (for nav link text)
//   2. Logo position (far left) — may differ
// ─────────────────────────────────────────────
function useNavContext() {
  const [isDark, setIsDark] = useState(true);      // background context for links/CTA
  const [logoNeedsSurface, setLogoNeedsSurface] = useState(false); // logo on dark bg → needs no surface
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;

      setScrollProgress(maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0);
      setScrolled(y > 60);

      // ── Probe center (for links)
      const centerEls = document.elementsFromPoint(window.innerWidth / 2, 36);
      for (const el of centerEls) {
        if (el.closest("[data-navbar]")) continue;
        const bg = window.getComputedStyle(el).backgroundColor;
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (m) {
          const lum = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
          setIsDark(lum < 0.5);
          break;
        }
      }

      // ── Probe logo zone (far left, ~80px from edge)
      const logoEls = document.elementsFromPoint(80, 36);
      for (const el of logoEls) {
        if (el.closest("[data-navbar]")) continue;
        const bg = window.getComputedStyle(el).backgroundColor;
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (m) {
          const lum = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
          // Logo needs a surface only when it sits over a LIGHT background
          // (light bg = logo with dark artwork becomes hard to see)
          // The logo is authentic — we never alter it.
          // Instead, we give it a barely-visible frosted landing pad.
          setLogoNeedsSurface(lum > 0.5);
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
    // Initial probe — wait for render
    const t1 = setTimeout(update, 100);
    const t2 = setTimeout(update, 600); // second probe after GSAP entrance settles
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return { isDark, logoNeedsSurface, scrollProgress, scrolled };
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef    = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayLinksRef = useRef<HTMLDivElement>(null);

  const { isDark, logoNeedsSurface, scrollProgress, scrolled } = useNavContext();

  // ── Entrance animation ─────────────────────
  useGSAP(() => {
    const logo    = navRef.current?.querySelector("[data-logo]");
    const links   = navRef.current?.querySelectorAll("[data-navlink]");
    const menuBtn = navRef.current?.querySelector("[data-menubtn]");
    const targets = [logo, ...(links ?? []), menuBtn].filter(Boolean);

    gsap.set(targets, { opacity: 0, y: -10 });
    gsap.to(targets, {
      opacity: 1, y: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.06,
      delay: 0.6,
    });
  }, { scope: navRef });

  // ── Overlay open / close ───────────────────
  const openMenu = useCallback(() => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
    const ol    = overlayRef.current;
    const links = overlayLinksRef.current?.querySelectorAll("[data-overlay-link]");
    gsap.set(ol, { display: "flex" });
    gsap.fromTo(ol, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
    if (links) {
      gsap.fromTo(links,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power3.out", delay: 0.12 }
      );
    }
  }, []);

  const closeMenu = useCallback(() => {
    const ol = overlayRef.current;
    gsap.to(ol, {
      opacity: 0, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        setMenuOpen(false);
        document.body.style.overflow = "";
        gsap.set(ol, { display: "none" });
      },
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && menuOpen) closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  // ── Design tokens — CSS transitions handle the interpolation ──
  // Links
  const linkCol   = isDark ? "rgba(255,255,255,0.72)" : "rgba(30,30,30,0.62)";
  const linkHov   = isDark ? "#FFFFFF" : "#1E1E1E";
  // CTA ("Enquire")
  const ctaCol    = isDark ? "rgba(200,169,106,0.88)" : "rgb(32,92,59)";
  const ctaHov    = isDark ? "rgba(200,169,106,1)"    : "rgb(15,70,40)";
  const dotCol    = isDark ? "rgba(200,169,106,0.80)" : "rgb(32,92,59)";
  // Menu trigger lines
  const lineCol   = isDark ? "rgba(255,255,255,0.58)" : "rgba(30,30,30,0.52)";

  // ── Logo landing pad ───────────────────────
  // Never alters the logo artwork.
  // When the logo sits over a LIGHT background it may need a transparent surface
  // for contrast. We add a barely-visible frosted micro-surface behind the logo container.
  // This is purely an environment adaptation — the logo image is unmodified.
  const logoPadBg = logoNeedsSurface
    ? "rgba(20,20,20,0.10)"   // very subtle dark wash on warm canvas
    : "transparent";
  const logoPadBlur = logoNeedsSurface ? "blur(8px)" : "none";

  return (
    <>
      {/* ── Scroll-progress thread — paper-thin, warm gold ─────────── */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[60] h-px origin-left pointer-events-none"
        style={{
          width: "100%",
          transform: `scaleX(${scrollProgress})`,
          background: "linear-gradient(90deg, rgba(200,169,106,0.9), rgba(200,169,106,0.35))",
          willChange: "transform",
        }}
      />

      {/* ── Navigation bar ──────────────────────────────────────────── */}
      <nav
        ref={navRef}
        data-navbar
        aria-label="Primary navigation"
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 pt-6 md:pt-8 pointer-events-auto">

          {/* ── LOGO ────────────────────────────────────────────────── */}
          {/*
            The official Hydrops logo is used exactly as supplied — no inversion,
            no recolouring, no CSS filter on the image element.
            When the logo sits over a light background, a barely-perceptible
            micro-surface behind the container provides contrast without
            altering the brand asset in any way.
          */}
          <Link
            href="/"
            data-logo
            aria-label="Hydrops — Home"
            className="relative shrink-0 block rounded-lg"
            style={{
              width: 140,
              height: 46,
              // Landing pad — environment adapts, logo does not
              backgroundColor: logoPadBg,
              backdropFilter: logoPadBlur,
              WebkitBackdropFilter: logoPadBlur,
              padding: logoNeedsSurface ? "4px 8px" : "0",
              transition: "background-color 0.7s ease, backdrop-filter 0.7s ease, padding 0.5s ease",
            }}
          >
            <Image
              src="/images/brand/logo.png"
              alt="Hydrops"
              fill
              sizes="140px"
              className="object-contain"
              priority
              // ── The logo image receives NO CSS filter, NO inversion,
              //    NO recolouring. It is always displayed as supplied. ──
            />
          </Link>

          {/* ── Desktop links ─────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-10 lg:gap-14">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-navlink
                className="relative group text-[12px] font-normal tracking-[0.18em] uppercase select-none"
                style={{
                  color: linkCol,
                  transition: "color 0.55s ease",
                }}
                onMouseEnter={e => gsap.to(e.currentTarget, { color: linkHov, duration: 0.25 })}
                onMouseLeave={e => gsap.to(e.currentTarget, { color: linkCol, duration: 0.55 })}
              >
                {item.label}
                {/* Gold thread appears on hover */}
                <span
                  aria-hidden
                  className="absolute -bottom-[5px] left-0 h-px w-0 group-hover:w-full"
                  style={{
                    background: "rgba(200,169,106,0.65)",
                    transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              </Link>
            ))}

            {/* Enquire — gold on dark, forest green on light ────────── */}
            <a
              href="#cta-section"
              data-navlink
              className="flex items-center gap-[7px] text-[12px] font-normal tracking-[0.18em] uppercase select-none"
              style={{
                color: ctaCol,
                transition: "color 0.55s ease",
              }}
              onMouseEnter={e => gsap.to(e.currentTarget, { color: ctaHov, duration: 0.25 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { color: ctaCol, duration: 0.55 })}
            >
              <span
                aria-hidden
                className="inline-block w-[4px] h-[4px] rounded-full shrink-0"
                style={{
                  background: dotCol,
                  transition: "background 0.55s ease",
                }}
              />
              Enquire
            </a>
          </div>

          {/* ── Mobile trigger ─────────────────────────────────────── */}
          <button
            data-menubtn
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            onClick={openMenu}
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 items-end group"
          >
            <span
              className="block h-px w-[22px] group-hover:w-7 transition-all duration-300"
              style={{ background: lineCol, transition: "background 0.55s ease, width 0.3s ease" }}
            />
            <span
              className="block h-px w-[14px] group-hover:w-7 transition-all duration-300"
              style={{ background: lineCol, transition: "background 0.55s ease, width 0.3s ease" }}
            />
          </button>
        </div>

        {/* ── Subtle horizon line — appears only after scrolling ────── */}
        {/*
          When scrolled into editorial sections, a barely-there warm line
          anchors the nav visually without a heavy backdrop.
          This line is the Hydrops signature — same gold, same weight,
          same restraint as the SectionRipple.
        */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: scrolled && !isDark
              ? "linear-gradient(90deg, transparent 0%, rgba(200,169,106,0.18) 20%, rgba(200,169,106,0.28) 50%, rgba(200,169,106,0.18) 80%, transparent 100%)"
              : "transparent",
            transition: "background 0.8s ease",
          }}
        />
      </nav>

      {/* ── Full-screen overlay ─────────────────────────────────────── */}
      <div
        ref={overlayRef}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
        className="fixed inset-0 z-[55] flex-col"
        style={{ backgroundColor: "#0D0D0D", display: "none" }}
      >
        {/* Gold thread at top */}
        <div
          aria-hidden
          className="w-full h-px shrink-0"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(200,169,106,0.55) 35%, rgba(200,169,106,0.75) 60%, transparent)",
          }}
        />

        {/* Overlay header */}
        <div className="flex justify-between items-center px-7 md:px-14 pt-7 md:pt-8 shrink-0">
          <span
            className="text-[11px] font-light tracking-[0.45em] uppercase select-none"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            Hydrops
          </span>
          <button
            onClick={closeMenu}
            aria-label="Close navigation"
            className="relative w-9 h-9 flex items-center justify-center"
          >
            <span
              aria-hidden
              className="absolute block h-px w-5"
              style={{
                background: "rgba(255,255,255,0.45)",
                transform: "rotate(45deg)",
              }}
            />
            <span
              aria-hidden
              className="absolute block h-px w-5"
              style={{
                background: "rgba(255,255,255,0.45)",
                transform: "rotate(-45deg)",
              }}
            />
          </button>
        </div>

        {/* Large editorial links */}
        <div
          ref={overlayLinksRef}
          className="flex-1 flex flex-col justify-center px-8 md:px-16"
        >
          {[...NAV_LINKS, { label: "Enquire", href: "#cta-section" }].map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              data-overlay-link
              onClick={closeMenu}
              className="group flex items-baseline justify-between py-5 md:py-7 border-b border-white/[0.05]"
            >
              <span
                className="font-light tracking-tight text-white/75 group-hover:text-white"
                style={{
                  fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                  lineHeight: 1,
                  transition: "color 0.35s ease",
                }}
              >
                {item.label}
              </span>
              <span
                className="text-[10px] tracking-[0.35em] uppercase self-center tabular-nums"
                style={{ color: "rgba(200,169,106,0.45)" }}
              >
                0{i + 1}
              </span>
            </Link>
          ))}
        </div>

        {/* Overlay footer */}
        <div className="px-8 md:px-16 pb-10 shrink-0 flex items-center justify-between">
          <p
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Pure Coconut Oil · India
          </p>
          <p
            className="text-[10px] tracking-[0.25em] uppercase"
            style={{ color: "rgba(200,169,106,0.30)" }}
          >
            © 2026 Hydrops
          </p>
        </div>
      </div>
    </>
  );
}
