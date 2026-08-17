import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle, Tag } from "lucide-react";
import { Reveal, EASE } from "../../lib/motion";
import { whatsappLink } from "../../config";
import { track } from "../../lib/analytics";

// Site / project categories — mirrored from the "Who We Help" section
// so both areas use the same taxonomy.
const SITE_TYPES = [
  "Property Developers",
  "Real Estate",
  "Hospitality",
  "Event Venues",
  "Commercial",
];

export default function QuickQuote() {
  const [siteType, setSiteType] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!siteType) e.siteType = "Please select a project type.";
    if (!name.trim()) e.name = "Please enter your name.";
    if (!phone.trim()) e.phone = "Please enter a contact number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () =>
    `Hi VirtualProperty.my, I'm interested in a project.\n` +
    `• Type: ${siteType}\n` +
    `• Name: ${name}\n` +
    `• Contact: ${phone}` +
    (description.trim() ? `\n• Details: ${description.trim()}` : "");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Fire GA4 lead conversion event
    track("generate_lead", {
      site_type: siteType,
      form_location: "quick_quote",
    });

    // Open WhatsApp with pre-filled message
    const url = whatsappLink(buildMessage());
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section
      id="start"
      data-testid="quick-quote-section"
      className="relative bg-[#020203] text-white py-24 md:py-32 grain overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(226,123,41,0.14), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-10 bg-grad" />
              <span className="eyebrow text-white/50">Start a Project</span>
              <span className="h-px w-10 bg-grad" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">
              Get a quote in{" "}
              <span className="text-gradient">under a minute.</span>
            </h2>
          </div>
        </Reveal>

        {/* Pricing anchor — single confirmed line */}
        <Reveal delay={0.1}>
          <div
            data-testid="pricing-anchor"
            className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 md:px-6 py-4 md:py-5 flex items-center gap-4"
          >
            <span className="w-10 h-10 rounded-lg bg-grad flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5 text-white" />
            </span>
            <div className="min-w-0">
              <p className="font-mono-vp text-[0.62rem] uppercase tracking-[0.2em] text-white/50 mb-1">
                Starting from
              </p>
              <p className="font-display text-base md:text-lg leading-snug">
                Property Show Unit Virtual Tour —{" "}
                <span className="text-[#f4b14c]">from RM3,599</span>{" "}
                <span className="text-white/60 font-sans-vp text-sm">
                  (incl. 1-year cloud hosting)
                </span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Quote form */}
        <Reveal delay={0.2}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-10">
            {!sent ? (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor="qq-site-type"
                    className="block text-xs text-white/50 mb-1.5 font-mono-vp uppercase tracking-wider"
                  >
                    Project Type *
                  </label>
                  <select
                    id="qq-site-type"
                    data-testid="qq-site-type"
                    value={siteType}
                    onChange={(e) => setSiteType(e.target.value)}
                    className="w-full rounded-lg bg-white/5 border px-4 py-3 text-sm text-white outline-none focus:bg-white/[0.07] transition-colors duration-200"
                    style={{
                      borderColor: errors.siteType
                        ? "#e05252"
                        : "rgba(255,255,255,0.12)",
                    }}
                  >
                    <option value="" className="bg-[#0a0a0c]">
                      Select a project type…
                    </option>
                    {SITE_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-[#0a0a0c]">
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.siteType && (
                    <p
                      data-testid="qq-site-type-error"
                      className="mt-1 text-xs text-[#ff8a8a]"
                    >
                      {errors.siteType}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="qq-name"
                      className="block text-xs text-white/50 mb-1.5 font-mono-vp uppercase tracking-wider"
                    >
                      Name *
                    </label>
                    <input
                      id="qq-name"
                      data-testid="qq-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:bg-white/[0.07] transition-colors duration-200"
                      style={{
                        borderColor: errors.name
                          ? "#e05252"
                          : "rgba(255,255,255,0.12)",
                      }}
                    />
                    {errors.name && (
                      <p
                        data-testid="qq-name-error"
                        className="mt-1 text-xs text-[#ff8a8a]"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="qq-phone"
                      className="block text-xs text-white/50 mb-1.5 font-mono-vp uppercase tracking-wider"
                    >
                      Contact Number *
                    </label>
                    <input
                      id="qq-phone"
                      data-testid="qq-phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg bg-white/5 border px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:bg-white/[0.07] transition-colors duration-200"
                      style={{
                        borderColor: errors.phone
                          ? "#e05252"
                          : "rgba(255,255,255,0.12)",
                      }}
                    />
                    {errors.phone && (
                      <p
                        data-testid="qq-phone-error"
                        className="mt-1 text-xs text-[#ff8a8a]"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="qq-description"
                    className="block text-xs text-white/50 mb-1.5 font-mono-vp uppercase tracking-wider"
                  >
                    Brief Description (optional)
                  </label>
                  <textarea
                    id="qq-description"
                    data-testid="qq-description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A quick sentence or two about your space or project…"
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:bg-white/[0.07] transition-colors duration-200"
                  />
                </div>

                <button
                  type="submit"
                  data-testid="qq-submit"
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-grad text-white px-7 py-4 text-sm font-semibold"
                >
                  Send via WhatsApp
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <p className="text-center text-xs text-white/40">
                  We'll open WhatsApp with your details pre-filled — one tap to
                  send.
                </p>
              </form>
            ) : (
              <div className="text-center py-6" data-testid="qq-success">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                  className="mx-auto w-14 h-14 rounded-full bg-grad flex items-center justify-center mb-5"
                >
                  <Check className="w-7 h-7 text-white" strokeWidth={3} />
                </motion.div>
                <h3 className="font-display text-2xl md:text-3xl mb-2">
                  Thanks{name ? `, ${name.split(" ")[0]}` : ""}.
                </h3>
                <p className="text-white/60 max-w-md mx-auto leading-relaxed text-sm md:text-base">
                  WhatsApp should have opened with your enquiry ready to send.
                  If it didn't, tap the button below.
                </p>
                <a
                  data-testid="qq-whatsapp-fallback"
                  href={whatsappLink(buildMessage())}
                  onClick={() =>
                    track("whatsapp_click", { location: "quick_quote_fallback" })
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="w-4 h-4" /> Open WhatsApp
                </a>
                <div>
                  <button
                    onClick={() => {
                      setSent(false);
                      setSiteType("");
                      setName("");
                      setPhone("");
                      setDescription("");
                      setErrors({});
                    }}
                    className="mt-5 text-xs text-white/40 hover:text-white/70 transition-colors"
                  >
                    Send another
                  </button>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 text-center text-xs text-white/40">
            Prefer a guided brief?{" "}
            <a
              href="#start-guided"
              data-testid="qq-guided-link"
              className="text-white/70 hover:text-white underline underline-offset-4 transition-colors"
            >
              Use our step-by-step funnel
            </a>{" "}
            below.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
