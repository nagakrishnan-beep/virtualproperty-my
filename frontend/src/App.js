import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import "@/App.css";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Transformation from "@/components/landing/Transformation";
import WhatWeDo from "@/components/landing/WhatWeDo";
import ExperienceWork from "@/components/landing/ExperienceWork";
import WhoWeHelp from "@/components/landing/WhoWeHelp";
import ConversionFunnel from "@/components/landing/ConversionFunnel";
import QuickQuote from "@/components/landing/QuickQuote";
import KnowledgeFAQ from "@/components/landing/KnowledgeFAQ";
import NovoReperio from "@/components/landing/NovoReperio";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { track, initGA4 } from "@/lib/analytics";
import { ANALYTICS } from "@/config";

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Brand splash — two-gate exit: only hide when BOTH conditions are met
    //   (a) hydration has actually completed (this effect fired)
    //   (b) the minimum hold time (600ms) has elapsed
    // Guarantees the 400ms entrance animation always finishes before any exit.
    const splash = document.getElementById("vp-splash");
    if (splash) {
      const MIN_HOLD_MS = 600;
      const FADE_MS = 600;
      const startedAt = window.__vpSplashT0 || Date.now();
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(MIN_HOLD_MS - elapsed, 0);
      setTimeout(() => {
        splash.classList.add("vp-splash-hide");
        setTimeout(() => splash.remove(), FADE_MS);
      }, wait);
    }
    initGA4(ANALYTICS.ga4Id);
    track("page_view", { page: "home" });
  }, []);

  // Scroll-depth tracking — fires once at 50% and once at 90%.
  useEffect(() => {
    const fired = { 50: false, 90: false };
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled =
        (window.scrollY + window.innerHeight) /
        (doc.scrollHeight || 1);
      const pct = Math.round(scrolled * 100);
      if (!fired[50] && pct >= 50) {
        fired[50] = true;
        track("scroll_depth", { percent: 50 });
      }
      if (!fired[90] && pct >= 90) {
        fired[90] = true;
        track("scroll_depth", { percent: 90 });
      }
      if (fired[50] && fired[90]) {
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -10, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const startProject = useCallback(() => scrollTo("start"), [scrollTo]);

  return (
    <div className="App bg-[#020203] min-h-screen">
      <Navbar onStart={startProject} scrollTo={scrollTo} />

      <main>
        <Hero onExplore={() => scrollTo("what-we-do")} onStart={startProject} />
        <Transformation />
        <WhatWeDo />
        <ExperienceWork onStart={startProject} />
        <WhoWeHelp />
        <KnowledgeFAQ />
        <QuickQuote />
        <ConversionFunnel />
        <NovoReperio />
        <FinalCTA onStart={startProject} />
        <Footer scrollTo={scrollTo} />
      </main>

      <WhatsAppButton />
    </div>
  );
}

export default App;
