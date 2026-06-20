import React from "react";

/**
 * HeroImage — pure display component for the hero editorial image.
 * Props: src (string), visible (bool)
 * Image source is a static file in /public — no API dependency.
 */
export default function HeroImage({ src, visible }) {
    if (!src) return null;

  return (
        <>
          {/* Desktop: right-side portrait frame */}
              <div
                        className={`relative flex-1 transition-all duration-1000 delay-300 hidden md:block`}
                        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(10px)" }}
                      >
                {/* Decorative shadow layers */}
                      <div className="absolute rounded-2xl" style={{ inset: 0, transform: "translate(14px, 14px)", backgroundColor: "#C4956A", opacity: 0.18, zIndex: 0 }} />
                      <div className="absolute rounded-2xl" style={{ inset: 0, transform: "translate(7px, 7px)", backgroundColor: "#4D5E49", opacity: 0.12, zIndex: 1 }} />
                      <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(196,149,106,0.35), 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)", zIndex: 2 }}>
                                <img
                                              src={src}
                                              alt="Danielle with her family — Mama Launch Studio founder"
                                              className="w-full object-cover"
                                              style={{ maxHeight: "520px", objectPosition: "center 20%" }}
                                            />
                      </div>div>
              </div>div>
        </>>
      );
}</>
