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
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`
        }
        style={{ minHeight: "520px" }}>
        
        <div className="relative w-full" style={{ maxWidth: "480px", aspectRatio: "4/5" }}>
          {/* Level 1 — Editorial backing layer */}
          <div
            className="absolute rounded-[28px]"
            style={{
              inset: 0,
              transform: "translate(-12px, 12px)",
              backgroundColor: "#E8D5C0",
              opacity: 0.45,
              zIndex: 0
            }} />
          
          {/* Level 2 — Image surface */}
          <div
            className="relative w-full h-full rounded-[28px] overflow-hidden"
            style={{
              boxShadow: "0 24px 64px rgba(196,149,106,0.35), 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)",
              border: "1px solid #C4956A14",
              zIndex: 1
            }}>
            
            <img src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/49c436ce0_Untitled_design__2_.jpg"

            alt={imageData.alt_text || "Hero editorial image"}
            className="w-full h-full object-cover"
            style={{ objectPosition: imageData.focal_position || "center 25%" }} />
            
          </div>
        </div>
      </div>

      {/* Mobile: hidden — desktop only */}
      <div
        className={`hidden w-full transition-all duration-1000 delay-400 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`
        }
        style={{ marginTop: "2rem" }}>
        
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            aspectRatio: "3/2",
            boxShadow: "0 24px 64px rgba(196,149,106,0.35), 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)",
            border: "1px solid #C4956A14"
          }}>
          
          <img
            src={imageData.image_url}
            alt={imageData.alt_text || "Hero editorial image"}
            className="w-full h-full object-cover"
            style={{ objectPosition: imageData.focal_position || "center 25%" }} />
          
        </div>
      </div>
    </>);

}