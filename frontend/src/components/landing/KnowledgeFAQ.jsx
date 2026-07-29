import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, EASE } from "../../lib/motion";

const FAQS = [
  {
    q: "What is a Digital Twin for property?",
    a: "A property Digital Twin is an accurate, interactive 3D replica of a real space. It lets buyers, tenants and teams explore a property online — walking through rooms, checking dimensions and understanding layout — from any device, anywhere.",
  },
  {
    q: "What is a 360° virtual tour?",
    a: "A 360° virtual tour connects panoramic images into a navigable walkthrough. Viewers look in every direction and move between spaces, experiencing a property remotely before visiting in person.",
  },
  {
    q: "What is Matterport?",
    a: "Matterport is a 3D capture platform that scans a physical space and turns it into a photorealistic, measurable Digital Twin, widely used for property, hospitality and commercial virtual tours.",
  },
  {
    q: "How can a Digital Twin help property developers?",
    a: "A Digital Twin lets developers market and sell units 24/7, including unbuilt phases via CGI. Buyers self-qualify online, out-of-state and overseas buyers commit without flying in, and the asset keeps selling after the sales gallery closes.",
  },
  {
    q: "What is the difference between a 360° virtual tour and a Digital Twin?",
    a: "A 360° virtual tour is a visual walkthrough made of panoramas. A Digital Twin is a full spatial 3D model — measurable, dimensionally accurate and interactive — that can power tours, floor plans and data on top of it.",
  },
  {
    q: "How can virtual tours help sell or market property?",
    a: "Virtual tours attract more qualified enquiries, let audiences experience a space remotely, shorten decision time and reduce wasted site visits — making listings more engaging and easier to share.",
  },
  {
    q: "Who provides Digital Twin and 360° virtual tour services in Malaysia?",
    a: "VirtualProperty.my provides Digital Twins, 360° virtual tours, Matterport 3D, Reality Capture, 3D visualisation and property marketing technology across Malaysia. It is powered by Novo Reperio Sdn Bhd.",
  },
  {
    q: "What industries can use Digital Twin technology?",
    a: "Property developers, real estate, hospitality, event venues, tourism and commercial spaces all use Digital Twins and virtual tours to showcase, market and operate physical spaces.",
  },
];

export default function KnowledgeFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="knowledge"
      data-testid="faq-section"
      aria-labelledby="faq-heading"
      className="relative bg-[#f5f4f1] text-[#111] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-grad" />
            <span className="eyebrow text-black/50">Spatial Technology, Explained</span>
          </div>
          <h2
            id="faq-heading"
            className="font-display text-[9vw] md:text-[3.6rem] leading-[0.95] max-w-[18ch]"
          >
            Digital Twins &amp; virtual tours,{" "}
            <span className="text-gradient">answered.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base text-black/60 font-sans-vp leading-relaxed">
            Common questions about Digital Twins, 360° virtual tours, Matterport
            and Reality Capture for property in Malaysia.
          </p>
        </Reveal>

        <div className="mt-12">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-t border-black/10 last:border-b">
                <h3>
                  <button
                    data-testid={`faq-question-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  >
                    <span className="font-display text-xl md:text-2xl leading-snug transition-colors duration-300 group-hover:text-[#8b1561]">
                      {f.q}
                    </span>
                    <span
                      className="shrink-0 w-8 h-8 rounded-full border border-black/15 flex items-center justify-center transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      data-testid={`faq-answer-${i}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-12 max-w-3xl text-base text-black/65 font-sans-vp leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
