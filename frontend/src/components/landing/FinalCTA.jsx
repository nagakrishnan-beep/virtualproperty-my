import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Reveal, EASE } from "../../lib/motion";
import { whatsappLink } from "../../config";
import { track } from "../../lib/analytics";

export default function FinalCTA({ onStart }) {
  return (
    <section
      data-testid="final-cta-section"
      className="relative bg-[#020203] text-white py-28 md:py-44 grain overflow-hidden"
    >
      <div className="absolute inset-0 spatial-grid opacity-[0.15]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 90% at 50% 120%, rgba(226,123,41,0.30), transparent 60%), radial-gradient(60% 80% at 50% -20%, rgba(139,21,97,0.25), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="font-display text-[14vw] md:text-[9rem] leading-[0.9]"
        >
          Your space
          <br />
          <span className="text-gradient">has more to show.</span>
        </motion.h2>

        <Reveal delay={0.15}>
          <p className="mt-8 text-lg md:text-xl text-white/60 font-sans-vp">
            Let's turn it into an experience.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              data-testid="final-start-btn"
              onClick={() => {
                track("cta_click", { cta: "final_start" });
                onStart();
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-white text-[#020203] px-9 py-5 text-base font-semibold tracking-tight hover:bg-[#f4b14c] transition-colors duration-300"
            >
              Start Your Project
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
            <a
              data-testid="final-whatsapp-btn"
              href={whatsappLink()}
              onClick={() => track("whatsapp_click", { location: "final_cta" })}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-9 py-5 text-base font-semibold tracking-tight hover:border-white/60 hover:bg-white/5 transition-colors duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
