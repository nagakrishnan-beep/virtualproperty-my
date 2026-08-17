import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Megaphone,
  Eye,
  Boxes,
  Compass,
  Sparkles,
  Camera,
  Globe,
  Layers,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  MessageCircle,
} from "lucide-react";
import { EASE } from "../../lib/motion";
import { FORM_ENDPOINT, whatsappLink } from "../../config";
import { track } from "../../lib/analytics";

const GOALS = [
  { id: "sell", label: "Sell a Property", icon: Home },
  { id: "market", label: "Market a Development", icon: Megaphone },
  { id: "showcase", label: "Showcase a Space", icon: Eye },
  { id: "twin", label: "Create a Digital Twin", icon: Boxes },
  { id: "tour", label: "Create a Virtual Tour", icon: Compass },
  { id: "else", label: "Something Else", icon: Sparkles },
];

const DELIVERABLES = [
  { id: "tour", label: "360° Virtual Tour", icon: Camera },
  { id: "twin", label: "Digital Twin", icon: Boxes },
  { id: "cgi", label: "3D / CGI", icon: Layers },
  { id: "website", label: "Interactive Website", icon: Globe },
  { id: "complete", label: "Complete Digital Experience", icon: Sparkles },
  { id: "unsure", label: "Not Sure — Recommend Something", icon: HelpCircle },
];

const STEPS = ["Goal", "Deliverable", "Details", "Done"];

export default function ConversionFunnel({ registerScrollTarget }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(null);
  const [deliverable, setDeliverable] = useState(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    project: "",
    location: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    track("funnel_step", { step: step + 1, name: STEPS[step] });
    if (step === 2) track("form_start");
  }, [step]);

  const goalLabel = GOALS.find((g) => g.id === goal)?.label || "";
  const delivLabel = DELIVERABLES.find((d) => d.id === deliverable)?.label || "";

  const buildMessage = () =>
    `Hi VirtualProperty.my, I'd like to discuss a spatial technology project.\n\n` +
    `• Goal: ${goalLabel}\n` +
    `• Deliverable: ${delivLabel}\n` +
    (form.name ? `• Name: ${form.name}\n` : "") +
    (form.company ? `• Company: ${form.company}\n` : "") +
    (form.email ? `• Email: ${form.email}\n` : "") +
    (form.phone ? `• Phone: ${form.phone}\n` : "") +
    (form.project ? `• Project/Property: ${form.project}\n` : "") +
    (form.location ? `• Location: ${form.location}\n` : "") +
    (form.message ? `• Message: ${form.message}` : "");

  const pick = (setter, value) => {
    setter(value);
    setTimeout(() => setStep((s) => Math.min(s + 1, 2)), 260);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload = { goal: goalLabel, deliverable: delivLabel, ...form };
    try {
      if (FORM_ENDPOINT) {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
    } catch (_) {
      /* silent — WhatsApp fallback still available on the success screen */
    } finally {
      setSubmitting(false);
      track("form_submit", { goal: goalLabel, deliverable: delivLabel });
      setStep(3);
    }
  };

  return (
    <section
      id="start-guided"
      ref={registerScrollTarget}
      data-testid="funnel-section"
      className="relative bg-[#020203] text-white py-24 md:py-36 grain overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(139,21,97,0.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-grad" />
            <span className="eyebrow text-white/50">Start a Project</span>
            <span className="h-px w-10 bg-grad" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">
            {step < 3 ? (
              <>
                What are you trying{" "}
                <span className="text-gradient">to achieve?</span>
              </>
            ) : (
              <>
                Recommendation <span className="text-gradient">ready.</span>
              </>
            )}
          </h2>
        </div>

        {/* progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((label, i) => (
              <span
                key={label}
                className="font-mono-vp text-[0.62rem] uppercase tracking-[0.2em]"
                style={{ color: i <= step ? "#f4b14c" : "rgba(255,255,255,0.3)" }}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-grad"
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-10 min-h-[360px]">
          <AnimatePresence mode="wait">
            {/* STEP 0 — GOAL */}
            {step === 0 && (
              <StepWrap key="s0">
                <div className="grid sm:grid-cols-2 gap-3">
                  {GOALS.map((g) => (
                    <ChoiceCard
                      key={g.id}
                      testid={`goal-${g.id}`}
                      icon={g.icon}
                      label={g.label}
                      active={goal === g.id}
                      onClick={() => {
                        track("funnel_start");
                        track("service_selection", { goal: g.id });
                        pick(setGoal, g.id);
                      }}
                    />
                  ))}
                </div>
              </StepWrap>
            )}

            {/* STEP 1 — DELIVERABLE */}
            {step === 1 && (
              <StepWrap key="s1">
                <h3 className="font-display text-2xl md:text-3xl mb-6 text-center">
                  What would you like to create?
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {DELIVERABLES.map((d) => (
                    <ChoiceCard
                      key={d.id}
                      testid={`deliverable-${d.id}`}
                      icon={d.icon}
                      label={d.label}
                      active={deliverable === d.id}
                      onClick={() => {
                        track("project_type_selected", { deliverable: d.id });
                        pick(setDeliverable, d.id);
                      }}
                    />
                  ))}
                </div>
                <BackBtn onClick={() => setStep(0)} />
              </StepWrap>
            )}

            {/* STEP 2 — DETAILS */}
            {step === 2 && (
              <StepWrap key="s2">
                <h3 className="font-display text-2xl md:text-3xl mb-1 text-center">
                  Tell us about your project
                </h3>
                <p className="text-center text-sm text-white/50 mb-6">
                  {goalLabel} · {delivLabel}
                </p>
                <form onSubmit={submit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Name *"
                      name="name"
                      value={form.name}
                      error={errors.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      testid="field-name"
                    />
                    <Field
                      label="Company"
                      name="company"
                      value={form.company}
                      onChange={(v) => setForm({ ...form, company: v })}
                      testid="field-company"
                    />
                    <Field
                      label="Email *"
                      name="email"
                      type="email"
                      value={form.email}
                      error={errors.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      testid="field-email"
                    />
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                      testid="field-phone"
                    />
                    <Field
                      label="Project / Property"
                      name="project"
                      value={form.project}
                      onChange={(v) => setForm({ ...form, project: v })}
                      testid="field-project"
                    />
                    <Field
                      label="Location"
                      name="location"
                      value={form.location}
                      onChange={(v) => setForm({ ...form, location: v })}
                      testid="field-location"
                    />
                  </div>
                  <Field
                    label="Message"
                    name="message"
                    textarea
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                    testid="field-message"
                  />
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      data-testid="funnel-submit"
                      disabled={submitting}
                      className="group w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-grad text-white px-7 py-4 text-sm font-semibold disabled:opacity-60"
                    >
                      {submitting ? "Sending…" : "Get My Spatial Recommendation"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mx-auto flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </form>
              </StepWrap>
            )}

            {/* STEP 3 — SUCCESS */}
            {step === 3 && (
              <StepWrap key="s3">
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="mx-auto w-16 h-16 rounded-full bg-grad flex items-center justify-center mb-6"
                  >
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                  </motion.div>
                  <h3 className="font-display text-3xl mb-3">
                    Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}.
                  </h3>
                  <p className="text-white/60 max-w-md mx-auto leading-relaxed">
                    Your brief for a{" "}
                    <span className="text-[#f4b14c]">{delivLabel}</span> is
                    ready. To fast-track a spatial recommendation from our team,
                    send it straight to us on WhatsApp.
                  </p>
                  <a
                    data-testid="funnel-whatsapp"
                    href={whatsappLink(buildMessage())}
                    onClick={() => track("whatsapp_click", { location: "funnel" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <MessageCircle className="w-4 h-4" /> Send on WhatsApp
                  </a>
                  <div>
                    <button
                      onClick={() => {
                        setStep(0);
                        setGoal(null);
                        setDeliverable(null);
                      }}
                      className="mt-5 text-xs text-white/40 hover:text-white/70 transition-colors"
                    >
                      Start over
                    </button>
                  </div>
                </div>
              </StepWrap>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function StepWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ChoiceCard({ icon: Icon, label, active, onClick, testid }) {
  return (
    <button
      type="button"
      data-testid={testid}
      onClick={onClick}
      className="group flex items-center gap-4 rounded-xl border p-4 md:p-5 text-left transition-all duration-300"
      style={{
        borderColor: active ? "rgba(244,177,76,0.6)" : "rgba(255,255,255,0.12)",
        backgroundColor: active ? "rgba(244,177,76,0.08)" : "rgba(255,255,255,0.02)",
      }}
    >
      <span className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#e27b29]/50 transition-colors duration-300">
        <Icon className="w-5 h-5 text-[#f4b14c]" />
      </span>
      <span className="font-medium text-sm md:text-base">{label}</span>
      <ArrowRight className="w-4 h-4 ml-auto text-white/30 group-hover:text-[#f4b14c] group-hover:translate-x-1 transition-all duration-300" />
    </button>
  );
}

function Field({ label, name, value, onChange, error, type = "text", textarea, testid }) {
  const base =
    "w-full rounded-lg bg-white/5 border px-4 py-3 text-sm text-white placeholder-white/30 focus:bg-white/[0.07] transition-colors duration-200 outline-none";
  return (
    <div className={textarea ? "" : ""}>
      <label htmlFor={name} className="block text-xs text-white/50 mb-1.5 font-mono-vp uppercase tracking-wider">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          data-testid={testid}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
          style={{ borderColor: error ? "#e05252" : "rgba(255,255,255,0.12)" }}
        />
      ) : (
        <input
          id={name}
          data-testid={testid}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
          style={{ borderColor: error ? "#e05252" : "rgba(255,255,255,0.12)" }}
        />
      )}
      {error && (
        <p data-testid={`${testid}-error`} className="mt-1 text-xs text-[#ff8a8a]">
          {error}
        </p>
      )}
    </div>
  );
}

function BackBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto mt-6 flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" /> Back
    </button>
  );
}
