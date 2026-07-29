import Marquee from "react-fast-marquee";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../../lib/motion";
import { NOVO_REPERIO_URL } from "../../config";

const CAPABILITIES = [
  "Reality Capture",
  "Digital Twins",
  "Matterport",
  "LiDAR",
  "360° Photography",
  "Drone / Aerial Capture",
  "3D / CGI",
  "AR / VR / XR",
  "Digital Marketing",
];

export default function NovoReperio() {
  return (
    <section
      id="about"
      data-testid="novo-reperio-section"
      className="relative bg-[#f5f4f1] text-[#111] py-24 md:py-32 overflow-hidden"
    >
      {/* slow editorial marquee */}
      <div className="border-y border-black/10 py-5 mb-16">
        <Marquee speed={40} gradient={false} pauseOnHover>
          {Array.from({ length: 3 }).map((_, r) => (
            <span key={r} className="flex items-center">
              <span className="font-display text-4xl md:text-6xl text-black/[0.12] mx-6">
                POWERED BY REALITY CAPTURE EXPERTS
              </span>
              <span className="w-3 h-3 rounded-full bg-grad mx-6" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-grad" />
            <span className="eyebrow text-black/50">The Team Behind It</span>
          </div>
          <h2 className="font-display text-[8vw] md:text-[3.6rem] leading-[0.95] max-w-[16ch]">
            Powered by{" "}
            <span className="text-gradient">spatial technology experts.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base md:text-lg text-black/60 font-sans-vp leading-relaxed">
            VirtualProperty.my leverages cutting-edge Malaysian spatial
            technology, from Digital Twins and Reality Capture to 3D
            visualization, to revolutionize how properties are showcased and
            marketed online.
          </p>
          {NOVO_REPERIO_URL && (
            <a
              data-testid="novo-reperio-cta"
              href={NOVO_REPERIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#111] border-b-2 border-[#e27b29] pb-1 hover:gap-3 transition-all duration-300"
            >
              Explore Novo Reperio <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-black/10 rounded-2xl overflow-hidden border border-black/10">
            {CAPABILITIES.map((c) => (
              <div
                key={c}
                className="bg-[#f5f4f1] hover:bg-white transition-colors duration-300 aspect-square flex items-center justify-center p-4 text-center"
              >
                <span className="font-display text-lg md:text-xl leading-tight text-black/80">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
