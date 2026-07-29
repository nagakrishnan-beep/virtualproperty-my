import { Logo } from "./Logo";
import { SOCIAL, NOVO_REPERIO_URL } from "../../config";

export default function Footer({ scrollTo }) {
  const socials = Object.entries(SOCIAL).filter(([, v]) => v);
  return (
    <footer
      data-testid="footer"
      className="relative bg-[#020203] text-white border-t border-white/10 py-16"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            <Logo />
            <p className="mt-5 font-display text-2xl max-w-xs leading-tight">
              Turn Property Into{" "}
              <span className="text-gradient">an Experience.</span>
            </p>
            <p className="mt-4 text-sm text-white/45 max-w-xs">
              Crafted by Reality Capture Experts.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="eyebrow text-white/40 mb-4">Explore</p>
            <ul className="space-y-3">
              {[
                { l: "What We Do", id: "what-we-do" },
                { l: "Experiences", id: "experiences" },
                { l: "Who We Help", id: "who-we-help" },
                { l: "About", id: "about" },
                { l: "Start a Project", id: "start" },
              ].map((i) => (
                <li key={i.id}>
                  <button
                    data-testid={`footer-link-${i.id}`}
                    onClick={() => scrollTo(i.id)}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {i.l}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-white/40 mb-4">Legal</p>
            <ul className="space-y-3">
              <li>
                <a href="#" data-testid="footer-privacy" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" data-testid="footer-terms" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                  Terms
                </a>
              </li>
              {NOVO_REPERIO_URL && (
                <li>
                  <a
                    href={NOVO_REPERIO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Novo Reperio
                  </a>
                </li>
              )}
            </ul>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-4">
                {socials.map(([k, v]) => (
                  <a
                    key={k}
                    href={v}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors"
                  >
                    {k}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
          <span>© 2026 VirtualProperty.my. All rights reserved.</span>
          <span className="font-mono-vp">Powered by Reality Capture Experts</span>
        </div>
      </div>
    </footer>
  );
}
