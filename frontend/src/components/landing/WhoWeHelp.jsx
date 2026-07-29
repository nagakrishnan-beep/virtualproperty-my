import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Home, Hotel, CalendarRange, Palmtree, Store } from "lucide-react";
import { Reveal, EASE } from "../../lib/motion";

const SEGMENTS = [
  {
    label: "Property Developers",
    icon: Building,
    value: "Launch developments with immersive experiences that let buyers explore before they visit.",
  },
  {
    label: "Real Estate",
    icon: Home,
    value: "Show properties remotely, qualify interest and create richer buyer experiences.",
  },
  {
    label: "Hospitality",
    icon: Hotel,
    value: "Let guests experience rooms, facilities and destinations before booking.",
  },
  {
    label: "Event Venues",
    icon: CalendarRange,
    value: "Help planners understand the space before they schedule a site visit.",
  },
  {
    label: "Tourism",
    icon: Palmtree,
    value: "Turn destinations into immersive digital experiences.",
  },
  {
    label: "Commercial Spaces",
    icon: Store,
    value: "Digitise physical environments for marketing, leasing and operational visibility.",
  },
];

export default function WhoWeHelp() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="who-we-help"
      data-testid="who-we-help-section"
      className="relative bg-[#08080a] text-white py-24 md:py-36 grain"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-grad" />
            <span className="eyebrow text-white/50">Who We Help</span>
          </div>
          <h2 className="font-display text-[10vw] md:text-[5rem] leading-[0.92] max-w-[15ch]">
            Built for people who need{" "}
            <span className="text-gradient">space to sell itself.</span>
          </h2>
        </Reveal>

        <div className="mt-16">
          {SEGMENTS.map((s, i) => {
            const isActive = active === i;
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                data-testid={`segment-${i}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group border-t border-white/10 cursor-default"
                style={{ opacity: isActive ? 1 : 0.4, transition: "opacity 0.4s ease" }}
              >
                <div className="flex items-center gap-5 md:gap-8 py-6 md:py-8">
                  <span
                    className="font-mono-vp text-xs w-8 shrink-0"
                    style={{ color: isActive ? "#f4b14c" : "rgba(255,255,255,0.4)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className="w-6 h-6 shrink-0 transition-colors duration-300"
                    style={{ color: isActive ? "#e27b29" : "rgba(255,255,255,0.5)" }}
                  />
                  <h3
                    className="font-display text-2xl md:text-4xl lg:text-5xl transition-transform duration-500"
                    style={{ transform: isActive ? "translateX(8px)" : "none" }}
                  >
                    {s.label}
                  </h3>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pl-[52px] md:pl-[76px] max-w-2xl text-base md:text-lg text-white/70 font-sans-vp leading-relaxed">
                        {s.value}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <span className="block border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
