import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Scan, Boxes, Compass, Megaphone, Building2, Target } from "lucide-react";
import { EASE } from "../../lib/motion";

const PHASES = [
  { n: "01", label: "Physical Space", icon: Building2, tint: "#f5f4f1" },
  { n: "02", label: "Capture", icon: Scan, tint: "#f4b14c" },
  { n: "03", label: "Digital Twin", icon: Boxes, tint: "#e27b29" },
  { n: "04", label: "Immersive Experience", icon: Compass, tint: "#f4b14c" },
  { n: "05", label: "Marketing", icon: Megaphone, tint: "#e27b29" },
  { n: "06", label: "Conversion", icon: Target, tint: "#8b1561" },
];

export default function Transformation() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(PHASES.length - 1, Math.floor(v * PHASES.length));
    setActive(idx);
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="transformation"
      ref={ref}
      data-testid="transformation-section"
      className="relative bg-[#020203]"
      style={{ height: `${PHASES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden grain flex flex-col">
        {/* header */}
        <div className="relative z-10 mx-auto max-w-[1400px] w-full px-5 md:px-10 pt-24 md:pt-28">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-grad" />
            <span className="eyebrow text-white/60">The Transformation</span>
          </div>
          <h2 className="font-display text-white text-[9vw] md:text-[4.4rem] leading-[0.95] max-w-[14ch]">
            From physical space{" "}
            <span className="text-gradient">to digital experience.</span>
          </h2>
        </div>

        {/* stage */}
        <div className="relative z-10 flex-1 mx-auto max-w-[1400px] w-full px-5 md:px-10 grid md:grid-cols-[1fr_1.1fr] items-center gap-8">
          {/* left: phase list */}
          <div className="hidden md:flex flex-col gap-1">
            {PHASES.map((p, i) => (
              <button
                key={p.n}
                data-testid={`transform-phase-${i}`}
                className="group flex items-center gap-5 py-3 text-left"
                aria-current={active === i}
              >
                <span
                  className="font-mono-vp text-xs transition-colors duration-500"
                  style={{ color: active === i ? p.tint : "rgba(255,255,255,0.3)" }}
                >
                  {p.n}
                </span>
                <span
                  className="font-display text-2xl lg:text-3xl transition-all duration-500"
                  style={{
                    color: active === i ? "#fff" : "rgba(255,255,255,0.28)",
                    transform: active === i ? "translateX(6px)" : "none",
                  }}
                >
                  {p.label}
                </span>
                <motion.span
                  className="h-px bg-grad hidden lg:block"
                  animate={{ width: active === i ? 60 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </button>
            ))}
          </div>

          {/* right: morphing visual */}
          <div className="relative aspect-square max-w-[520px] w-full mx-auto">
            <TransformVisual active={active} reduce={reduce} />
          </div>
        </div>

        {/* mobile phase indicator */}
        <div className="md:hidden relative z-10 px-5 pb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono-vp text-xs" style={{ color: PHASES[active].tint }}>
              {PHASES[active].n}
            </span>
            <span className="font-display text-2xl text-white">{PHASES[active].label}</span>
          </div>
        </div>

        {/* copy + progress rail */}
        <div className="relative z-10 mx-auto max-w-[1400px] w-full px-5 md:px-10 pb-10">
          <p className="max-w-lg text-sm md:text-base text-white/55 font-sans-vp leading-relaxed">
            We capture, digitise and transform physical spaces into interactive
            experiences that can be explored, shared, marketed and experienced
            from anywhere.
          </p>
          <div className="mt-6 h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-grad origin-left"
              style={{ scaleX: railScale }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TransformVisual({ active, reduce }) {
  return (
    <div className="absolute inset-0">
      {/* base frame */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-[#08080a] overflow-hidden">
        {/* Phase 0: physical space photo-like block */}
        <Layer show={active === 0}>
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, #2a2a2e, #0c0c0e 70%)",
              }}
            />
            <div className="absolute inset-x-8 bottom-0 top-16 border border-white/15 rounded-t-lg" />
            <div className="absolute inset-x-16 bottom-0 top-28 border-x border-white/10" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-24 h-24 border border-white/15" />
          </div>
        </Layer>

        {/* Phase 1: capture / scanning */}
        <Layer show={active === 1}>
          <div className="absolute inset-0 spatial-grid opacity-40" />
          {!reduce && (
            <motion.div
              className="absolute inset-x-0 h-16"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(244,177,76,0.5), transparent)",
              }}
              animate={{ top: ["0%", "88%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <CornerBrackets color="#f4b14c" />
        </Layer>

        {/* Phase 2: digital twin point cloud */}
        <Layer show={active === 2}>
          <div className="absolute inset-0">
            {Array.from({ length: 60 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${(i * 29) % 100}%`,
                  top: `${(i * 47) % 100}%`,
                  width: 2,
                  height: 2,
                  backgroundColor:
                    i % 2 ? "rgba(226,123,41,0.9)" : "rgba(245,244,241,0.7)",
                }}
              />
            ))}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="30,72 50,28 70,72" fill="none" stroke="#e27b29" strokeWidth="0.5" />
              <polygon points="30,72 70,72 62,80 22,80" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4" />
            </svg>
          </div>
        </Layer>

        {/* Phase 3: immersive 360 */}
        <Layer show={active === 3}>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-48 h-48 rounded-full border-2 border-[#f4b14c]/40"
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(244,177,76,0.25), transparent 60%)",
              }}
            />
            <div className="absolute w-28 h-28 rounded-full border border-white/20" />
            <span className="absolute font-mono-vp text-[0.6rem] tracking-[0.3em] text-white/70">
              360°
            </span>
          </div>
        </Layer>

        {/* Phase 4: marketing microsite */}
        <Layer show={active === 4}>
          <div className="absolute inset-6 rounded-lg border border-white/15 bg-[#0c0c0e] p-4">
            <div className="h-2 w-16 rounded bg-grad mb-3" />
            <div className="h-24 rounded bg-white/5 mb-3" />
            <div className="h-2 w-full rounded bg-white/10 mb-2" />
            <div className="h-2 w-2/3 rounded bg-white/10 mb-4" />
            <div className="h-7 w-28 rounded-full bg-grad" />
          </div>
        </Layer>

        {/* Phase 5: conversion */}
        <Layer show={active === 5}>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={false}
              animate={active === 5 ? { scale: [0.6, 1] } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#8b1561,#e27b29)" }}
            >
              <Target className="w-14 h-14 text-white" />
            </motion.div>
            <div className="absolute bottom-8 font-mono-vp text-[0.6rem] tracking-[0.25em] text-white/60">
              QUALIFIED ENQUIRY
            </div>
          </div>
        </Layer>
      </div>
    </div>
  );
}

function Layer({ show, children }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 1.04 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ pointerEvents: "none" }}
    >
      {children}
    </motion.div>
  );
}

function CornerBrackets({ color }) {
  const c = { borderColor: color };
  return (
    <>
      <span className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2" style={c} />
      <span className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2" style={c} />
      <span className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2" style={c} />
      <span className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2" style={c} />
    </>
  );
}
