import React from "react";

/**
 * HeroImage — pure display component for the hero editorial image.
 * Props: imageData (SiteContent record), visible (bool), mobile (bool)
 * NO upload behavior. NO file inputs. NO click handlers.
 * Image source is always from SiteContent entity — editable via Base44 admin only.
 */
export default function HeroImage({ imageData, visible }) {
  if (!imageData?.image_url) return null;

  return (
    <>
      {/* Desktop: right-side portrait frame */}
      <div
        className={`relative flex-1 transition-all duration-1000 delay-300 hidden md:flex items-center justify-end ${
          visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
        style={{ minHeight: "520px" }}
      >
        <div className="relative w-full" style={{ maxWidth: "520px", aspectRatio: "4/5" }}>
          <div
            className="w-full h-full rounded-[28px] overflow-hidden"
            style={{
              boxShadow: "0 32px 80px rgba(196,149,106,0.18), 0 8px 24px rgba(44,44,44,0.08)",
              border: "1px solid #C4956A14",
            }}
          >
            <img
              src={imageData.image_url}
              alt={imageData.alt_text || "Hero editorial image"}
              className="w-full h-full object-cover"
              style={{ objectPosition: imageData.focal_position || "center 25%" }}
            />
          </div>
          <div
            className="absolute -bottom-6 -left-6 -z-10 rounded-[32px]"
            style={{
              width: "70%",
              height: "70%",
              background: "linear-gradient(135deg, #F0EBE1 0%, #E8D5C0 100%)",
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      {/* Mobile: hidden — desktop only */}
      <div
        className={`hidden w-full transition-all duration-1000 delay-400 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ marginTop: "2rem" }}
      >
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            aspectRatio: "3/2",
            boxShadow: "0 16px 48px rgba(196,149,106,0.15)",
            border: "1px solid #C4956A14",
          }}
        >
          <img
            src={imageData.image_url}
            alt={imageData.alt_text || "Hero editorial image"}
            className="w-full h-full object-cover"
            style={{ objectPosition: imageData.focal_position || "center 25%" }}
          />
        </div>
      </div>
    </>
  );
}