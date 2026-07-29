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
