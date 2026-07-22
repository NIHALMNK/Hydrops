"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MAIN_NAVIGATION } from "@/constants/navigation";
import type { NavItem } from "@/types/navigation";

// ─────────────────────────────────────────────
// Derived lists from the single data source
// ─────────────────────────────────────────────
const NAV_LINKS: NavItem[] = MAIN_NAVIGATION.filter((item) => !item.isCta);
const CTA_ITEM: NavItem | undefined = MAIN_NAVIGATION.find((item) => item.isCta);

// ─────────────────────────────────────────────
// Hook: continuously reads the visual context
// beneath the nav to drive colour adaptation.
// We probe TWO points:
//   1. Center of page (for nav link text)
//   2. Logo position (far left) — may differ
// ─────────────────────────────────────────────
function useNavContext() {
  // Default false: the page starts on the light-cream hero area (#F5F2EC).
  // The probe updates this within ~100 ms; starting false prevents the
  // white-on-cream flash that occurred with the previous true default.
  const [isDark, setIsDark] = useState(false);     // background context for links/CTA
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;

      setScrollProgress(maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0);
      setScrolled(y > 60);

      // ── Probe center for link text colour adaptation ──────────────
      // elementsFromPoint returns elements front-to-back.  We walk the
      // stack looking for the first opaque/painted surface.
      //
      // Crucially, when a <canvas> is in the stack we sample its ACTUAL
      // rendered pixels via getImageData rather than its CSS background.
      // This is necessary because the hero section has bg-[#050505] but
      // the canvas paints bright warm frames on top — without pixel
      // sampling the probe would always report "dark" and links would
      // be white on a cream canvas frame.
      const probeX = window.innerWidth / 2;
      const probeY = 36;
      const centerEls = document.elementsFromPoint(probeX, probeY);
      let detected = false;
      for (const el of centerEls) {
        if (el.closest("[data-navbar]")) continue;

        // ── Canvas: sample the actual rendered pixel ──────────────────
        if (el instanceof HTMLCanvasElement && el.width > 0 && el.height > 0) {
          try {
            const rect = el.getBoundingClientRect();
            const cx = Math.round((probeX - rect.left) * (el.width  / rect.width));
            const cy = Math.round((probeY - rect.top)  * (el.height / rect.height));
            const ctx2d = el.getContext('2d');
            const px = ctx2d?.getImageData(cx, cy, 1, 1).data;
            if (px && px[3] > 20) { // only trust opaque-enough pixels
              const lum = (0.299 * px[0] + 0.587 * px[1] + 0.114 * px[2]) / 255;
              setIsDark(lum < 0.5);
              detected = true;
              break;
            }
          } catch {
            // getImageData blocked (cross-origin taint) — fall through
          }
        }

        // ── CSS background: skip near-transparent elements ────────────
        // (e.g. wrapper divs with rgba(0,0,0,0) — they'd report lum=0
        //  even though the visual surface behind them is light)
        const bg = window.getComputedStyle(el).backgroundColor;
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
        if (m) {
          const alpha = m[4] !== undefined ? parseFloat(m[4]) : 1;
          if (alpha < 0.06) continue; // near-transparent — keep walking
          const lum = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255;
          setIsDark(lum < 0.5);
          detected = true;
          break;
        }
      }
      // If nothing opaque was found, leave isDark unchanged
      void detected;

      // Logo probe kept for future use; frosted pad is now always-on (see below).

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

  return { isDark, scrollProgress, scrolled };
}

// ─────────────────────────────────────────────
// Helper: is the given href the current route?
// Exact match for "/" to avoid false positives.
// ─────────────────────────────────────────────
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef    = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayLinksRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { isDark, scrollProgress, scrolled } = useNavContext();

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

  // Close overlay on route change (e.g. back-button or programmatic navigation)
  useEffect(() => {
    if (menuOpen) closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ── Design tokens — CSS transitions handle the interpolation ──
  // Links — boosted to 0.88 on dark (was 0.72) so text is legible on
  // the darkest cinematic frames.  On light backgrounds a hairline
  // text-shadow provides contrast without altering the letterforms.
  const linkCol    = isDark ? "rgba(255,255,255,0.88)" : "rgba(20,20,20,0.72)";
  const linkHov    = isDark ? "#FFFFFF" : "#111111";
  const linkActive = isDark ? "rgba(255,255,255,1)"    : "rgba(10,10,10,1)";
  // Subtle text-shadow used only on light backgrounds to sharpen dark
  // letters against mid-luminance canvas frames during the brief probe
  // window.  On dark backgrounds no shadow is needed.
  const linkShadow = isDark
    ? "none"
    : "0 0px 8px rgba(245,242,236,0.9)";
  // CTA ("Enquire")
  const ctaCol    = isDark ? "rgba(200,169,106,0.92)" : "rgb(32,92,59)";
  const ctaHov    = isDark ? "rgba(200,169,106,1)"    : "rgb(15,70,40)";
  const dotCol    = isDark ? "rgba(200,169,106,0.85)" : "rgb(32,92,59)";
  // Menu trigger lines
  const lineCol   = isDark ? "rgba(255,255,255,0.65)" : "rgba(20,20,20,0.55)";

  // ── Logo frosted pill — always-on ─────────
  // A permanent, minimal frosted-glass surface sits behind the logo at all
  // times.  It is deliberately faint so it disappears on dark hero frames
  // All overlay items: regular links + CTA (if defined)
  const overlayItems: NavItem[] = CTA_ITEM
    ? [...NAV_LINKS, CTA_ITEM]
    : NAV_LINKS;

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
            className="relative shrink-0 block"
            style={{
              width: 140,
              height: 46,
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
          <div className="hidden md:flex items-center gap-10 lg:gap-14" role="list">
            {NAV_LINKS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  data-navlink
                  role="listitem"
                  aria-current={active ? "page" : undefined}
                  className="relative group text-[12px] font-normal tracking-[0.18em] uppercase select-none"
                  style={{
                    color: active ? linkActive : linkCol,
                    // Text-shadow lifts legibility on mid-luminance/light hero
                    // frames without changing letterform or adding visual weight.
                    textShadow: linkShadow,
                    transition: "color 0.55s ease, text-shadow 0.55s ease",
                  }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { color: linkHov, duration: 0.25 })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { color: active ? linkActive : linkCol, duration: 0.55 })}
                >
                  {item.name}
                  {/* Gold thread — always visible on active, hover-only otherwise */}
                  <span
                    aria-hidden
                    className="absolute -bottom-[5px] left-0 h-px"
                    style={{
                      width: active ? "100%" : "0",
                      background: "rgba(200,169,106,0.65)",
                      transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                  {/* Hover-only underline for non-active links */}
                  {!active && (
                    <span
                      aria-hidden
                      className="absolute -bottom-[5px] left-0 h-px w-0 group-hover:w-full"
                      style={{
                        background: "rgba(200,169,106,0.65)",
                        transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Enquire CTA ────────────────────────────────────────── */}
            {CTA_ITEM && (
              <Link
                href={CTA_ITEM.href}
                data-navlink
                aria-label="Enquire about Hydrops"
                className="flex items-center gap-[7px] text-[12px] font-normal tracking-[0.18em] uppercase select-none"
                style={{
                  color: ctaCol,
                  transition: "color 0.55s ease",
                }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { color: ctaHov, duration: 0.25 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { color: ctaCol, duration: 0.55 })}
              >
                <span
                  aria-hidden
                  className="inline-block w-[4px] h-[4px] rounded-full shrink-0"
                  style={{
                    background: dotCol,
                    transition: "background 0.55s ease",
                  }}
                />
                {CTA_ITEM.name}
              </Link>
            )}
          </div>

          {/* ── Mobile trigger ─────────────────────────────────────── */}
          <button
            data-menubtn
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
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
        id="mobile-nav-overlay"
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
        <nav
          ref={overlayLinksRef}
          aria-label="Mobile navigation"
          className="flex-1 flex flex-col justify-center px-8 md:px-16"
        >
          {overlayItems.map((item, i) => {
            const active = isActive(pathname, item.href) && !item.isCta;
            return (
              <Link
                key={item.name}
                href={item.href}
                data-overlay-link
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
                className="group flex items-baseline justify-between py-5 md:py-7 border-b border-white/[0.05]"
              >
                <span
                  className="font-light tracking-tight group-hover:text-white"
                  style={{
                    fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                    lineHeight: 1,
                    color: item.isCta
                      ? "rgba(200,169,106,0.88)"
                      : active
                        ? "rgba(255,255,255,1)"
                        : "rgba(255,255,255,0.75)",
                    transition: "color 0.35s ease",
                  }}
                >
                  {item.name}
                </span>
                <span
                  className="text-[10px] tracking-[0.35em] uppercase self-center tabular-nums"
                  style={{ color: "rgba(200,169,106,0.45)" }}
                >
                  0{i + 1}
                </span>
              </Link>
            );
          })}
        </nav>

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
