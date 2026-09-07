# VirtualProperty.my

Premium one-page marketing site for **VirtualProperty.my** — a Malaysian spatial-technology / proptech brand powered by **Novo Reperio Sdn Bhd**. Digital twins, 360° virtual tours, Matterport 3D scanning, LiDAR capture, 3D rendering and immersive experiences for property, developers, hospitality and commercial spaces.

**Live site:** https://virtualproperty.my

---

## Stack

- **React 19** (CRA) + **Tailwind CSS**
- **Framer Motion** for cinematic scroll animations
- **Lenis** for smooth scroll
- **Static HTML** for `/insights/` articles and legal pages
- **Apache `.htaccess`** for routing, security headers, 301/410 redirects, `ErrorDocument 404`
- **Google Analytics 4** (`G-2P77N0M1KX`) — loaded dynamically, no third-party tracking

No backend. No database. No CMS. Fully static — deploys to Hostinger shared hosting.

---

## Directory structure

```
/app
├── frontend/                    # React SPA source
│   ├── public/
│   │   ├── index.html           # SEO meta + JSON-LD + pre-rendered content for crawlers
│   │   ├── .htaccess            # Apache routing, security, 301s, ErrorDocument 404
│   │   ├── robots.txt           # AI-crawler-aware
│   │   ├── sitemap.xml
│   │   ├── 404.html             # Branded 404 (dark theme)
│   │   ├── insights/            # Static HTML insights hub + 3 SEO articles
│   │   ├── contact/, privacy-policy/, terms-conditions/    # Static legal pages
│   │   ├── virtual-site-visits/, property-agent-technology/,
│   │   └── property-sales-technology-trends/               # SEO landing pages
│   └── src/
│       ├── App.js               # Root — Lenis, GA4 init, scroll-depth tracking, splash removal
│       ├── config.js            # WhatsApp number, GA4 ID, tour links, socials
│       ├── lib/analytics.js     # track() + initGA4()
│       └── components/landing/  # Hero, Transformation, WhatWeDo, ExperienceWork,
│                                # WhoWeHelp, KnowledgeFAQ, QuickQuote, ConversionFunnel,
│                                # NovoReperio, FinalCTA, Footer, WhatsAppButton
└── memory/
    ├── PRD.md                   # Product requirements + implementation log
    └── test_credentials.md
```

---

## Local development

```bash
cd frontend
cp .env.example .env       # then edit REACT_APP_BACKEND_URL if needed
yarn install
yarn start                 # http://localhost:3000
```

Hot reload is enabled. Do not run `uvicorn` or any backend server — the site is fully static.

---

## Configuration

All externally-configurable values live in `frontend/src/config.js`:

| Constant | Purpose |
|---|---|
| `WHATSAPP_NUMBER` | International-format WhatsApp number (currently `60172029996`) |
| `WHATSAPP_DEFAULT_MESSAGE` | Pre-filled message for generic WhatsApp CTAs |
| `FORM_ENDPOINT` | Set to a Formspree/webhook URL to also POST leads server-side (currently empty — WhatsApp is the delivery channel) |
| `POWERED_BY_URL` | Novo Reperio outbound link shown in footer |
| `PROJECT_LINKS` | External virtual-tour URLs shown in ExperienceWork |
| `ANALYTICS.ga4Id` | GA4 measurement ID (`G-2P77N0M1KX`) |
| `SOCIAL` | Optional social links for footer (leave `""` to hide) |

---

## Build for production (Hostinger)

```bash
cd frontend
yarn build
cp public/.htaccess build/       # CRA doesn't copy dotfiles by default
cd build && zip -r ../../virtualproperty-hostinger.zip .
```

The resulting `virtualproperty-hostinger.zip` is what gets uploaded to Hostinger.

---

## Deploy to Hostinger

1. Log in to Hostinger → **Files** → **File Manager** → open `public_html/`
2. **Delete the previous contents** of `public_html/` (or move to a backup folder)
3. **Upload** `virtualproperty-hostinger.zip`
4. Right-click the zip → **Extract**
5. ⚠️ **Critical**: after extracting, check that `.htaccess` is present in `public_html/`. Hostinger's default extract sometimes **skips dotfiles**. If missing, either:
   - Re-extract with the "Include hidden files" option ticked, or
   - Hand-create `public_html/.htaccess` in File Manager and paste the contents of `frontend/public/.htaccess`
6. Delete the zip file from `public_html/` after extraction
7. Verify with `curl -I https://virtualproperty.my/some-missing-url` — should return `HTTP/1.1 404` (real 404, not a soft 200)

---

## What `.htaccess` does

- Forces HTTPS + non-www canonical (single 301 hop)
- 301 redirects for legacy WordPress URLs (`/service-list`, `/about-virtual-tour`, `/3d-rendering`, `/guides`, `/characteristics-of-good-property-agent-in-malaysia`, etc.)
- 410 Gone for all `/wp-*` paths (search-engine lockdown of the deprecated WordPress site)
- `ErrorDocument 404 /404.html` — genuine HTTP 404, not soft 200
- Security headers: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS
- 1-year cache on hashed JS/CSS/images, 0-second on HTML

---

## SEO / AEO / GEO

- Full JSON-LD in `frontend/public/index.html`: Organization, Service ItemList, FAQPage
- Pre-rendered HTML fallback inside `<div id="root">` so GPTBot / ClaudeBot / PerplexityBot / Bingbot can read content without executing JS
- `robots.txt` explicitly allows `PerplexityBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Google-Extended` (GPTBot and CCBot are unblocked — flip to `Disallow: /` per bot if you want to opt out of AI training)
- Insights articles at `/insights/` are direct-answer / AEO-optimised

---

## Analytics

GA4 loads dynamically via `initGA4()` in `App.js` — no static script tag, no third-party tracking.

Fired events:
- `page_view` — homepage load
- `whatsapp_click` — every WhatsApp CTA (with `location` param)
- `cta_click` — hero + final CTA
- `generate_lead` — QuickQuote form submit (with `site_type` param)
- `funnel_step`, `funnel_start`, `form_start`, `form_submit`, `service_selection`, `project_type_selected` — ConversionFunnel flow
- `scroll_depth` — 50% and 90% (one-shot each)

---

## License / credits

© 2026 VirtualProperty.my — powered by [Novo Reperio Sdn Bhd](https://novoreperio.com/) (Reality Capture Experts).
