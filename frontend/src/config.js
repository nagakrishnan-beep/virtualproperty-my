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

// Placeholder outbound links for showcased experiences (non-functional
// until real Novo Reperio / VirtualProperty project URLs are supplied).
export const PROJECT_LINKS = {
  property: "",
  hospitality: "",
  venues: "",
  developments: "",
};

// Analytics measurement ID (e.g. "G-XXXXXXXXXX"). Leave "" to disable.
export const ANALYTICS_ID = "";

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
export function whatsappLink(message) {
  const text = encodeURIComponent(message || WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
