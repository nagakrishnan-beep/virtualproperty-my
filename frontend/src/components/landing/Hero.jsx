import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { EASE } from "../../lib/motion";

const HEAD_LINES = ["TURN PROPERTY", "INTO AN", "EXPERIENCE."];

function MaskLine({ children, delay }) {
  return (
    <span className="mask-line">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ onExplore, onStart }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#020203] grain flex items-center"
    >
      {/* Layered spatial background */}
      <div className="absolute inset-0 z-0">
        {/* radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 78% 18%, rgba(226,123,41,0.20), transparent 55%), radial-gradient(90% 70% at 15% 85%, rgba(139,21,97,0.22), transparent 55%)",
          }}
        />
        {/* perspective grid floor */}
        <motion.div
          style={{ y: reduce ? 0 : gridY }}
          className="absolute left-0 right-0 bottom-[-10%] h-[70%]"
        >
          <div
            className="absolute inset-0 spatial-grid opacity-60"
            style={{
              transform: "perspective(700px) rotateX(68deg)",
              transformOrigin: "bottom center",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0) 85%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0) 85%)",
            }}
          />
        </motion.div>
        {/* point cloud dots */}
        <PointCloud reduce={reduce} />
        {/* scan line */}
        {!reduce && (
          <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none">
            <div
              className="absolute inset-x-0 h-24 animate-scan"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(244,177,76,0.10), transparent)",
              }}
            />
          </div>
        )}
        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 40%, transparent 40%, rgba(2,2,3,0.85) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}
        className="relative z-10 mx-auto max-w-[1400px] w-full px-5 md:px-10 pt-28 pb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-10 bg-grad" />
          <span className="eyebrow text-white/70">Powered by Novo Reperio</span>
        </motion.div>

        <h1 className="font-display text-[15vw] sm:text-[12vw] md:text-[8.4vw] lg:text-[7.6rem] text-white max-w-[16ch]">
          {HEAD_LINES.map((line, i) => (
            <MaskLine key={line} delay={0.45 + i * 0.14}>
              {i === 2 ? (
                <span className="text-gradient">{line}</span>
              ) : (
                line
              )}
            </MaskLine>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.05 }}
          className="mt-8 max-w-xl text-base md:text-lg text-white/65 leading-relaxed font-sans-vp"
        >
          Digital Twins, 360° Virtual Tours, Reality Capture and immersive
          digital experiences for property and the built environment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <button
            data-testid="hero-explore-btn"
            onClick={onExplore}
            className="group inline-flex items-center gap-2 rounded-full bg-white text-[#020203] px-7 py-4 text-sm font-semibold tracking-tight hover:bg-[#f4b14c] transition-colors duration-300"
          >
            Explore What We Do
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
          </button>
          <button
            data-testid="hero-start-btn"
            onClick={onStart}
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-7 py-4 text-sm font-semibold tracking-tight hover:border-white/70 hover:bg-white/5 transition-colors duration-300"
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono-vp text-[0.6rem] uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}

function PointCloud({ reduce }) {
  const pts = Array.from({ length: 34 });
  return (
    <div className="absolute inset-0 pointer-events-none">
      {pts.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 90;
        const size = 1 + (i % 3);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              backgroundColor:
                i % 3 === 0
                  ? "rgba(244,177,76,0.8)"
                  : i % 3 === 1
                    ? "rgba(226,123,41,0.7)"
                    : "rgba(255,255,255,0.55)",
            }}
            animate={
              reduce
                ? {}
                : { opacity: [0.15, 0.9, 0.15], scale: [1, 1.6, 1] }
            }
            transition={{
              duration: 3 + (i % 5),
              repeat: Infinity,
              delay: (i % 7) * 0.4,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
