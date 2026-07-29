/**
 * VIRTUALPROPERTY.MY — Central configuration
 * ------------------------------------------------------------------
 * All externally-configurable values live here so the site can be
 * connected to WordPress / a CRM / analytics later WITHOUT touching
 * component code. Edit the values below only.
 */

export const SITE = {
  name: "VirtualProperty.my",
  tagline: "Turn Property Into an Experience.",
  poweredBy: "Novo Reperio Sdn Bhd",
  canonical: "https://virtualproperty.my/",
};

// WhatsApp — primary conversion fallback (provided by client).
export const WHATSAPP_NUMBER = "60172029996"; // international format, no "+" or spaces
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi VirtualProperty.my, I would like to discuss a spatial technology project.";

/**
 * Lead form endpoint.
 * Leave as "" to use the WhatsApp fallback (current behaviour).
 * Later, drop in a Formspree / WordPress / webhook / CRM URL and the
 * funnel will POST the qualified enquiry there automatically.
 */
export const FORM_ENDPOINT = "";

// Novo Reperio external link — leave "" to hide the outbound CTA.
export const NOVO_REPERIO_URL = "";

// Social links — leave "" to hide.
export const SOCIAL = {
  instagram: "",
  linkedin: "",
  facebook: "",
  youtube: "",
};

// Live project experience links (open in a new tab from "Explore Experience").
export const PROJECT_LINKS = {
  property: "https://virtualproperty.my/360tour/royallexis/",
  hospitality: "https://lexis.novoreperio.com/",
  venues:
    "https://www.klccconventioncentre.com/organisers/plan-an-event/interactive-tour",
  developments: "https://novoreperio.com/360tour/peel-lane/",
};

// Analytics measurement IDs. Leave "" to keep tracking disabled.
// When real IDs are provided, add the corresponding loader script and
// events (see src/lib/analytics.js) will start flowing automatically.
export const ANALYTICS = {
  ga4Id: "G-2P77N0M1KX", // Google Analytics 4
  gtmId: "", // e.g. "GTM-XXXXXXX"
  metaPixelId: "", // e.g. "1234567890"
  googleAdsId: "", // e.g. "AW-XXXXXXXXX"
};

// Deprecated single ID kept for backwards compatibility.
export const ANALYTICS_ID = "";

// ------------------------------------------------------------------
// Future SEO landing pages (not built yet — architecture placeholder).
// When these are created as real pages, wire them into the nav/footer.
// ------------------------------------------------------------------
export const SERVICE_PAGES = [
  { slug: "/digital-twin-malaysia", label: "Digital Twin Malaysia" },
  { slug: "/360-virtual-tour-malaysia", label: "360° Virtual Tour Malaysia" },
  { slug: "/matterport-malaysia", label: "Matterport Malaysia" },
  { slug: "/lidar-scanning-malaysia", label: "LiDAR Scanning Malaysia" },
  { slug: "/3d-visualisation-malaysia", label: "3D Visualisation Malaysia" },
  { slug: "/aerial-360-malaysia", label: "Aerial 360° Malaysia" },
  { slug: "/property-marketing-malaysia", label: "Property Marketing Malaysia" },
];

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
export function whatsappLink(message) {
  const text = encodeURIComponent(message || WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
