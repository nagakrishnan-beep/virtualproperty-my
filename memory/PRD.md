# VirtualProperty.my — PRD (Static Hostinger Site)

## Original problem statement
Premium, one-page conversion-focused marketing website for VIRTUALPROPERTY.MY (Novo Reperio's spatial technology brand). Static React SPA (no backend). Cinematic hero, service listings, project showcase, qualification funnel, WhatsApp fallback, strong SEO/AEO/GEO, Hostinger deployment via `.htaccess`.

## Tech / architecture
- React + Tailwind + Framer Motion + Lenis smooth scroll
- No backend / DB / CMS / auth
- Static HTML `/insights/` hub + 3 SEO articles (server-rendered as static files under `public/insights/`)
- Legal pages, contact page, branded 404 (static HTML)
- Apache `.htaccess` (SPA routing, security headers, 301 legacy redirects, 410 WP blocks)
- GA4 loaded via `initGA4()` in `App.js` (ID: `G-2P77N0M1KX`)

## Key files
- `/app/frontend/src/config.js` — WhatsApp number, GA4 ID, project links
- `/app/frontend/src/App.js` — main composition + GA4 init + scroll-depth tracking
- `/app/frontend/src/lib/analytics.js` — `track()` + `initGA4()`
- `/app/frontend/src/components/landing/` — all landing sections
  - `QuickQuote.jsx` — pricing anchor + short lead-capture form (NEW, Phase 1)
  - `ConversionFunnel.jsx` — multi-step guided brief (`id="start-guided"`)
- `/app/frontend/public/index.html` — pre-rendered SEO meta + JSON-LD + fallback HTML
- `/app/frontend/public/robots.txt`, `sitemap.xml`, `.htaccess`
- `/app/virtualproperty-hostinger.zip` — final deployment artifact

## Implemented (this session + prior)
- Landing UI, hero, transformation, what-we-do, experiences, who-we-help, FAQ, funnel, footer
- GA4 (`G-2P77N0M1KX`) loaded via `initGA4`
- Real virtual tour links wired into ExperienceWork
- Favicon / manifest / OG image
- Custom 404, Privacy Policy, Terms & Conditions, Contact pages
- `.htaccess` — SPA routing, security headers, 301s, WP 410s
- Static Insights hub + 3 SEO articles migrated
- Pre-render fallback HTML in `public/index.html` for GPTBot/crawlers
- Extensive JSON-LD (Organization, Service) + AEO direct-answer article openers
- OG + Twitter card meta refresh (2026-01-15)
- robots.txt updated to explicitly allow live-answer AI crawlers (PerplexityBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Google-Extended). GPTBot & CCBot remain unblocked (flagged to user).
- sitemap.xml verified — 8 URLs
- Canonicals verified on all 8 pages
- **Phase 1 (2026-08-17)**: Pricing anchor + guided quote form + GA4 conversion tracking
  - New `QuickQuote` section with `id="start"` (all "Start a Project" CTAs land here)
  - Pricing line: "Property Show Unit Virtual Tour — from RM3,599 (incl. 1-year cloud hosting)"
  - Short form: dropdown (5 site types), name, phone, optional description
  - Submit fires `generate_lead` GA4 event (with `site_type` param) and opens WhatsApp with pre-filled message
  - `ConversionFunnel` moved to `id="start-guided"` (still accessible below as secondary option)
  - Scroll-depth tracking: fires `scroll_depth` at 50% and 90% (one-shot)
  - Existing `whatsapp_click` events remain: float button, final CTA, funnel success screen

## Prioritised backlog
### P1
- Wire form endpoint (Formspree / CRM webhook) via `FORM_ENDPOINT` in `config.js` — currently WhatsApp is the delivery channel
- Add phone/address/social links to Organization JSON-LD when user provides
### P2
- Publish 4th SEO Insights article on user-chosen keyword
- Consider blocking GPTBot + CCBot in robots.txt (currently allowed)

## Constraints / do-not-touch
- No backend, DB, CMS, auth
- Dark theme + existing design system unchanged
- Every source/public change → `yarn build` + re-zip `/app/virtualproperty-hostinger.zip`
