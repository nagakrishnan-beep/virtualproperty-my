import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { EASE } from "../../lib/motion";

const LINKS = [
  { label: "What We Do", id: "what-we-do" },
  { label: "Experiences", id: "experiences" },
  { label: "Who We Help", id: "who-we-help" },
  { label: "About", id: "about" },
];

export default function Navbar({ onStart, scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <motion.header
      data-testid="main-nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`transition-[background-color,backdrop-filter,border-color,padding] duration-500 ${
          scrolled
            ? "bg-[#020203]/80 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <nav aria-label="Primary" className="mx-auto max-w-[1400px] px-5 md:px-10 flex items-center justify-between">
          <button
            data-testid="nav-logo"
            onClick={() => go("hero")}
            aria-label="VirtualProperty.my home"
          >
            <Logo />
          </button>

          <div className="hidden md:flex items-center gap-9">
            {LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-link-${l.id}`}
                onClick={() => go(l.id)}
                className="font-mono-vp text-[0.72rem] uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors duration-300"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              data-testid="nav-start-project"
              onClick={onStart}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-[#020203] px-5 py-2.5 text-[0.78rem] font-semibold tracking-tight hover:bg-[#f4b14c] transition-colors duration-300 group"
            >
              Start a Project
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
            <button
              data-testid="nav-menu-toggle"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden text-white p-1"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="md:hidden bg-[#020203]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  data-testid={`mobile-link-${l.id}`}
                  onClick={() => go(l.id)}
                  className="text-left font-display text-2xl text-white/90"
                >
                  {l.label}
                </button>
              ))}
              <button
                data-testid="mobile-start-project"
                onClick={() => {
                  setOpen(false);
                  onStart();
                }}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-grad text-white px-5 py-3.5 text-sm font-semibold"
              >
                Start a Project <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
