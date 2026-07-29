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
import KnowledgeFAQ from "@/components/landing/KnowledgeFAQ";
import NovoReperio from "@/components/landing/NovoReperio";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { track } from "@/lib/analytics";

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    track("page_view", { page: "home" });
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
