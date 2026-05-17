/**
 * Mama Launch Studio — Analytics Utility
 *
 * Wraps GA4 + Meta Pixel + Microsoft Clarity into simple, typed helpers.
 * Import and call from any component — all calls are no-ops until the
 * scripts are loaded, so there are no race conditions.
 *
 * SETUP:
 *  1. Replace the placeholder IDs below with your real IDs.
 *  2. GA4:       Google Analytics → Admin → Data Streams → Measurement ID (G-XXXXXXXXXX)
 *  3. Meta Pixel: Meta Events Manager → Pixel ID (numeric)
 *  4. Clarity:   Microsoft Clarity → Settings → Project ID (alphanumeric)
 */

export const GA4_ID      = "G-XXXXXXXXXX";   // ← replace
export const META_PIXEL  = "XXXXXXXXXXXXXXXXX"; // ← replace (numeric, or "" to skip)
export const CLARITY_ID  = "XXXXXXXXXX";      // ← replace (or "" to skip)

// ─── GA4 ──────────────────────────────────────────────────────────────────────

/** Fire a GA4 custom event */
export function gaEvent(eventName, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// ─── Meta Pixel ───────────────────────────────────────────────────────────────

/** Fire a Meta Pixel standard or custom event */
export function pixelEvent(eventName, params = {}) {
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, params);
  }
}

// ─── Unified event helpers ────────────────────────────────────────────────────

/** Waitlist form submitted successfully */
export function trackWaitlistSubmit(data = {}) {
  gaEvent("waitlist_submit", {
    event_category: "conversion",
    childcare_interest: data.interest || "",
    user_state: data.state || "",
  });
  pixelEvent("Lead", {
    content_name: "Founding Member Waitlist",
    content_category: data.interest || "",
  });
}

/** A primary CTA button was clicked */
export function trackCTAClick(label = "", location = "") {
  gaEvent("cta_click", {
    event_category: "engagement",
    cta_label: label,
    cta_location: location,
  });
  pixelEvent("ViewContent", { content_name: label });
}

/** User selected a pathway / childcare interest option */
export function trackPathwaySelect(interest = "") {
  gaEvent("pathway_select", {
    event_category: "engagement",
    pathway: interest,
  });
}

/** Scroll depth milestone (25 / 50 / 75 / 100) */
export function trackScrollDepth(percent) {
  gaEvent("scroll_depth", {
    event_category: "engagement",
    percent_scrolled: percent,
  });
}