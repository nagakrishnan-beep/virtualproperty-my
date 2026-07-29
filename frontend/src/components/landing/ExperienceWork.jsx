import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, EASE } from "../../lib/motion";
import { PROJECT_LINKS } from "../../config";
import { track } from "../../lib/analytics";

const PROJECTS = [
  {
    key: "property",
    category: "Property",
    project: "Royal Lexis",
    desc: "Step inside Royal Lexis — a residential 360° virtual tour you can explore room by room, before a single site visit.",
    caps: ["Digital Twin", "360° Virtual Tour", "Interactive Floor Plan"],
    img: "https://images.pexels.com/photos/33685861/pexels-photo-33685861.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    key: "hospitality",
    category: "Hospitality",
    project: "Lexis",
    desc: "Experience Lexis hospitality spaces and rooms the way guests will — an immersive walkthrough before they book.",
    caps: ["360° Virtual Tour", "Aerial 360°", "3D / CGI"],
    img: "https://images.pexels.com/photos/27695825/pexels-photo-27695825.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    key: "venues",
    category: "Venues",
    project: "KLCC Convention Centre",
    desc: "Walk the KLCC Convention Centre through an interactive venue tour, so event planners understand the space remotely.",
    caps: ["Interactive Tour", "Digital Twin", "Aerial 360°"],
    img: "https://images.pexels.com/photos/33685860/pexels-photo-33685860.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    key: "developments",
    category: "Developments",
    project: "Peel Lane",
    desc: "Tour the Peel Lane development in immersive 360°, bringing the project to life for buyers from anywhere.",
    caps: ["360° Virtual Tour", "3D / CGI", "Aerial 360°"],
    img: "https://images.unsplash.com/photo-1644088379091-d574269d422f?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ExperienceWork({ onStart }) {
  return (
    <section
      id="experiences"
      data-testid="experiences-section"
      className="relative bg-[#020203] text-white py-24 md:py-36 grain overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-grad" />
            <span className="eyebrow text-white/50">Experience Our Work</span>
          </div>
          <h2 className="font-display text-[10vw] md:text-[5rem] leading-[0.92] max-w-[16ch]">
            Don't just look at it.{" "}
            <span className="text-gradient">Experience it.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.key} p={p} index={i} onStart={onStart} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, index, onStart }) {
  const url = PROJECT_LINKS[p.key];
  const big = index === 0 || index === 3;

  const handle = (e) => {
    track("cta_click", { cta: "explore_experience", category: p.key });
    if (!url) {
      // placeholder — no real project URL configured yet
      e.preventDefault();
      onStart();
    }
  };

  return (
    <motion.article
      data-testid={`project-${p.key}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 2) * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
        big ? "md:aspect-[16/11]" : "md:aspect-[16/12]"
      } aspect-[4/3]`}
    >
      <img
        src={p.img}
        alt={`${p.project} — ${p.category.toLowerCase()} 360° virtual tour by VirtualProperty.my`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform ease-out group-hover:scale-105"
        style={{ transitionDuration: "900ms", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(2,2,3,0.92) 8%, rgba(2,2,3,0.25) 55%, rgba(2,2,3,0.35) 100%)",
        }}
      />

      <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between">
          <span className="eyebrow text-white/70">{p.category}</span>
          <span className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4 opacity-90">
            {p.caps.map((c) => (
              <span
                key={c}
                className="text-[0.65rem] font-mono-vp uppercase tracking-wider bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-1"
              >
                {c}
              </span>
            ))}
          </div>
          <h3 className="font-display text-3xl md:text-4xl">{p.project}</h3>
          <p className="mt-2 text-sm text-white/60 max-w-md leading-relaxed">
            {p.desc}
          </p>
          <a
            data-testid={`project-cta-${p.key}`}
            href={url || "#experiences"}
            onClick={handle}
            target={url ? "_blank" : undefined}
            rel={url ? "noopener noreferrer" : undefined}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f4b14c] hover:gap-3 transition-all duration-300"
          >
            Explore Experience
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
