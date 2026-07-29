/**
 * Lightweight analytics / conversion-tracking layer.
 * ------------------------------------------------------------------
 * No tracking scripts are loaded until real IDs are set in config.js
 * (ANALYTICS). Until then, track() safely pushes to window.dataLayer
 * (a no-op if no tag manager is present) so events are ready the
 * moment GA4 / GTM / Meta Pixel / Google Ads are connected.
 *
 * Standard events used across the site:
 *   page_view · cta_click · service_selection · funnel_start ·
 *   funnel_step · form_start · form_submit · whatsapp_click ·
 *   project_type_selected
 */
export function track(event, params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", event, params);
    }
  } catch (_) {
    /* analytics must never break the UI */
  }
}

/**
 * Loads Google Analytics 4 (gtag.js) once, if a measurement ID is set.
 * Safe to call multiple times — it guards against double-injection.
 */
export function initGA4(measurementId) {
  if (typeof window === "undefined" || !measurementId) return;
  if (window.__ga4Loaded) return;
  window.__ga4Loaded = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

