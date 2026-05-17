import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

/**
 * HeroImage — displays the editor-managed hero image.
 * Image URL is stored in the SiteContent entity (key: "hero_image")
 * and can be updated at any time through the Base44 admin/editor
 * with zero code changes required.
 */
export default function HeroImage({ visible }) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    base44.entities.SiteContent.filter({ key: "hero_image" }).then((results) => {
      if (results?.length > 0) setImageData(results[0]);
    });
  }, []);

  if (!imageData?.image_url) return null;

  return (
    <div
      className={`relative flex-1 transition-all duration-1000 delay-300 hidden md:flex items-center justify-end ${
      visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`
      }
      style={{ minHeight: "520px" }}>
      
      <div
        className="relative w-full"
        style={{ maxWidth: "560px", aspectRatio: "4/5" }}>
        
        <div
          className="w-full h-full rounded-[28px] overflow-hidden"
          style={{
            boxShadow: "0 32px 80px rgba(196,149,106,0.18), 0 8px 24px rgba(44,44,44,0.08)",
            border: "1px solid #C4956A14"
          }}>
          
          <img src="https://media.base44.com/images/public/6a090e6659c9e6ef2267ee4b/072c1bc91_Untitled_design__2_.jpg"

          alt={imageData.alt_text || "Hero — home childcare environment"}
          className="w-full h-full object-cover"
          style={{ objectPosition: imageData.focal_position || "center 35%" }} />
          
        </div>

        {/* Soft floating accent shape */}
        <div
          className="absolute -bottom-6 -left-6 -z-10 rounded-[32px]"
          style={{
            width: "70%",
            height: "70%",
            background: "linear-gradient(135deg, #F0EBE1 0%, #E8D5C0 100%)",
            opacity: 0.6
          }} />
        
      </div>
    </div>);

}