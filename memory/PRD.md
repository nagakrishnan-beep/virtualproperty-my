# PRD — VirtualProperty.my Landing Page

## Original Problem Statement
Premium, cinematic, conversion-focused ONE-PAGE marketing landing page for VirtualProperty.my — a Malaysian spatial technology / Digital Twin brand powered by Novo Reperio Sdn Bhd. Positioning: "Turn Property Into an Experience." Frontend-only (no backend, no DB, no auth). Primary conversion: qualified project enquiries via an interactive lead funnel + WhatsApp fallback.

## User Choices
- Theme: Hybrid — dominant dark cinematic hero/transformation + architectural light content sections.
- Colours: brand tricolor from logo (magenta #8B1561 → orange #E27B29 → gold #F4B14C) on near-black #020203, used restrained.
- WhatsApp: 60172029996. FORM_ENDPOINT unconfigured (WhatsApp fallback). Novo Reperio outbound URL removed/placeholder.
- Motion-first: framer-motion + lenis smooth scroll, masked hero reveal, scroll-driven transformation, editorial marquee.
- No invented stats/awards/testimonials/pricing/project details.

## Architecture
- CRA + React 19, framer-motion, lenis, react-fast-marquee, lucide-react, Tailwind + shadcn tokens.
- All config isolated in `frontend/src/config.js` (WhatsApp, form endpoint, Novo Reperio URL, socials, project links, analytics).
- Components in `frontend/src/components/landing/`: Logo, Navbar, Hero, Transformation, WhatWeDo, ExperienceWork, WhoWeHelp, ConversionFunnel, NovoReperio, FinalCTA, Footer, WhatsAppButton.
- SEO: title/meta/OG/Twitter/canonical + JSON-LD (WebSite/Organization+LocalBusiness/Service) in index.html; robots.txt + sitemap.xml.
- Fonts: Cabinet Grotesk (display) + Manrope + Azeret Mono (labels).

## Implemented (2026-07-29)
- Full one-page experience, all 10 sections + floating WhatsApp + sticky/compacting nav + mobile menu.
- Interactive: 4-capability showcase, 6 audience segments, scroll-driven 6-phase transformation, multi-step lead qualification funnel with client-side validation and contextual WhatsApp handoff.
- Reduced-motion support, keyboard focus states, semantic landmarks, lazy-loaded images.
- Testing agent: frontend 100% pass, no bugs; Lenis scroll confirmed working for real users.

## Backlog / Next
- P1: Wire FORM_ENDPOINT (WordPress/Formspree/CRM) + surface error state on non-OK responses.
- P1: Replace placeholder project imagery with real Novo Reperio project media + real experience URLs (PROJECT_LINKS).
- P2: Add og-image.jpg asset; add analytics (ANALYTICS_ID); optional privacy/terms pages.

## SEO/AEO/GEO Iteration (2026-01)
- Head: Malaysia-focused title + meta description, canonical https://virtualproperty.my/, OG/Twitter (locale en_MY, image spec 1200x630), html lang=en-MY, robots max-image-preview:large, logo preload.
- JSON-LD @graph: WebSite, WebPage, Organization+ProfessionalService (areaServed Malaysia, knowsAbout, parent Novo Reperio Sdn Bhd), Service w/ OfferCatalog (4 capabilities), FAQPage (8 Q&A matching visible content).
- New visible KnowledgeFAQ section (AEO/GEO) — 8 concise factual answers, accordion.
- Accessibility: WhoWeHelp rows converted to keyboard <button>s (aria-expanded/controls), nav aria-label, decorative icons aria-hidden.
- Analytics-readiness: src/lib/analytics.js no-op track() -> dataLayer; ANALYTICS + SERVICE_PAGES placeholders in config; events wired (page_view, cta_click, service_selection, project_type_selected, funnel_start/step, form_start/submit, whatsapp_click).
- Perf: optimised nav logo (vp-icon-64.png ~8KB) + preload; images lazy below fold; font-display swap.
- robots.txt allows Googlebot/Bingbot/OAI-SearchBot/GPTBot/PerplexityBot; sitemap.xml single canonical URL.
- Verified by testing_agent iteration_3: 100% frontend pass, no regressions.
