import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Boxes, Compass, TrendingUp, ArrowRight } from "lucide-react";
import { Reveal, EASE } from "../../lib/motion";

const CAPS = [
  {
    n: "01",
    verb: "Capture",
    title: "Reality Capture",
    icon: Camera,
    blurb:
      "We digitise physical spaces with millimetre fidelity using Matterport 3D, LiDAR and drone capture — the foundation of every digital twin.",
    services: [
      "Matterport 3D",
      "360° Photography",
      "DSLR Panorama Photography",
      "LiDAR Scanning",
      "Aerial / Drone Capture",
      "Spatial Data Capture",
    ],
  },
  {
    n: "02",
    verb: "Create",
    title: "Digital Twin & 3D",
    icon: Boxes,
    blurb:
      "Raw scans become intelligent, explorable Digital Twins — with 3D Rendering and CGI for spaces that don't exist yet.",
    services: [
      "Digital Twins",
      "3D Modelling",
      "Scan-to-BIM",
      "3D Rendering",
      "CGI",
      "Virtual Staging",
    ],
  },
  {
    n: "03",
    verb: "Experience",
    title: "Immersive Experiences",
    icon: Compass,
    blurb:
      "We turn digital assets into interactive experiences people can walk through from anywhere.",
    services: [
      "360° Virtual Tours",
      "Interactive Floor Plans",
      "Virtual Showrooms",
      "AR / VR / XR",
      "Interactive Property Experiences",
      "Digital Presentations",
    ],
  },
  {
    n: "04",
    verb: "Convert",
    title: "Digital Marketing",
    icon: TrendingUp,
    blurb:
      "Experiences become campaigns that generate, qualify and convert real enquiries.",
    services: [
      "Property Microsites",
      "Interactive Websites",
      "SEO",
      "Digital Campaigns",
      "Lead Generation",
      "Analytics",
    ],
  },
];

export default function WhatWeDo() {
  const [active, setActive] = useState(0);
  const cap = CAPS[active];
  const Icon = cap.icon;

  return (
    <section
      id="what-we-do"
      data-testid="what-we-do-section"
      className="relative bg-[#f5f4f1] text-[#111] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-grad" />
            <span className="eyebrow text-black/50">What We Do</span>
          </div>
          <h2 className="font-display text-[10vw] md:text-[5rem] leading-[0.92] max-w-[12ch]">
            One space.{" "}
            <span className="text-gradient">Many possibilities.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-black/55 font-sans-vp leading-relaxed">
            VirtualProperty.my turns Malaysian properties and physical spaces
            into interactive digital experiences — from capture and Digital
            Twins to immersive tours and property marketing.
          </p>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Left: capability rows */}
          <div className="flex flex-col">
            {CAPS.map((c, i) => {
              const isActive = active === i;
              return (
                <button
                  key={c.n}
                  data-testid={`capability-${i}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group relative text-left border-t border-black/10 py-6 md:py-7"
                  aria-current={isActive}
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      className="font-mono-vp text-xs transition-colors duration-300"
                      style={{ color: isActive ? "#e27b29" : "rgba(0,0,0,0.35)" }}
                    >
                      {c.n}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="eyebrow text-black/40">{c.verb}</span>
                      </div>
                      <h3
                        className="font-display text-3xl md:text-5xl mt-1 transition-all duration-500"
                        style={{
                          color: isActive ? "#111" : "rgba(0,0,0,0.30)",
                          transform: isActive ? "translateX(8px)" : "none",
                        }}
                      >
                        {c.title}
                      </h3>
                    </div>
                    <ArrowRight
                      className="w-6 h-6 mt-1 transition-all duration-300"
                      style={{
                        color: isActive ? "#e27b29" : "rgba(0,0,0,0.2)",
                        opacity: isActive ? 1 : 0.4,
                        transform: isActive ? "translateX(0)" : "translateX(-8px)",
                      }}
                    />
                  </div>
                  {/* mobile inline services */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="lg:hidden overflow-hidden"
                      >
                        <p className="mt-4 text-sm text-black/60 pl-9">{c.blurb}</p>
                        <ul className="mt-3 pl-9 flex flex-wrap gap-2">
                          {c.services.map((s) => (
                            <li
                              key={s}
                              className="text-xs font-mono-vp bg-white border border-black/10 rounded-full px-3 py-1.5 text-black/70"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
            <span className="border-t border-black/10" />
          </div>

          {/* Right: sticky visual panel (desktop) */}
          <div className="hidden lg:block sticky top-28">
            <div className="relative aspect-[4/5] rounded-2xl bg-[#020203] overflow-hidden grain">
              <div className="absolute inset-0 spatial-grid opacity-30" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(90% 70% at 70% 20%, rgba(226,123,41,0.22), transparent 60%)",
                }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0 p-9 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-vp text-8xl font-medium text-white/10">
                      {cap.n}
                    </span>
                    <span className="w-14 h-14 rounded-full bg-grad flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-4xl text-white">{cap.title}</h3>
                    <p className="mt-3 text-sm text-white/60 max-w-sm leading-relaxed">
                      {cap.blurb}
                    </p>
                    <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {cap.services.map((s, si) => (
                        <motion.li
                          key={s}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + si * 0.05, duration: 0.4 }}
                          className="flex items-center gap-2 text-sm text-white/80"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#f4b14c]" />
                          {s}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
