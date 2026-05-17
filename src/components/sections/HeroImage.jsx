import React, { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";

/**
 * HeroImage — editable hero image panel.
 * Click the image (or the "Change Image" button) to upload a replacement.
 * All styling, aspect ratio, and shadow are preserved on every swap.
 */
export default function HeroImage({ visible }) {
  const [src, setSrc] = useState(null);
  const [focalX, setFocalX] = useState(50);
  const [focalY, setFocalY] = useState(35);
  const [uploading, setUploading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setSrc(file_url);
    setUploading(false);
  };

  return (
    <div
      className={`relative flex-1 transition-all duration-1000 delay-300 hidden md:flex items-center justify-end ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}
      style={{ minHeight: "520px" }}
    >
      {/* Main image container */}
      <div
        className="relative w-full"
        style={{ maxWidth: "560px", aspectRatio: "4/5" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="w-full h-full rounded-[28px] overflow-hidden cursor-pointer"
          style={{
            boxShadow: "0 32px 80px rgba(196,149,106,0.18), 0 8px 24px rgba(44,44,44,0.08)",
            border: "1px solid #C4956A14",
            background: "#F0EBE1",
          }}
          onClick={() => inputRef.current?.click()}
        >
          {src ? (
            <img
              src={src}
              alt="Hero — home childcare environment"
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ objectPosition: `${focalX}% ${focalY}%`, transform: hovered ? "scale(1.02)" : "scale(1)" }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ backgroundColor: "#F0EBE1" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#C4956A18", border: "1px dashed #C4956A55" }}>
                <span style={{ color: "#C4956A", fontSize: "1.2rem" }}>+</span>
              </div>
              <p className="font-micro text-center px-8" style={{ color: "#C4956A", fontSize: "0.65rem", opacity: 0.7 }}>
                Click to upload your hero image
              </p>
              <p className="font-body text-center px-8" style={{ color: "#9a8f84", fontSize: "0.75rem", lineHeight: "1.6", maxWidth: "200px" }}>
                Motherhood lifestyle, home childcare, or community imagery
              </p>
            </div>
          )}

          {/* Hover overlay */}
          {src && hovered && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all"
              style={{ background: "rgba(44,44,44,0.38)", backdropFilter: "blur(2px)", borderRadius: "28px" }}
            >
              <p className="font-micro text-white" style={{ fontSize: "0.7rem" }}>Replace Image</p>
            </div>
          )}

          {/* Uploading state */}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(250,247,242,0.85)", borderRadius: "28px" }}>
              <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.7rem" }}>Uploading…</p>
            </div>
          )}
        </div>

        {/* Focal point controls — only shown when image is loaded */}
        {src && (
          <div
            className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 flex items-center gap-3 transition-all duration-300"
            style={{
              background: "rgba(250,247,242,0.92)",
              backdropFilter: "blur(8px)",
              border: "1px solid #C4956A18",
              boxShadow: "0 4px 20px rgba(44,44,44,0.08)",
              opacity: hovered ? 1 : 0,
              pointerEvents: hovered ? "auto" : "none",
            }}
          >
            <span className="font-micro" style={{ color: "#9a8f84", fontSize: "0.6rem", whiteSpace: "nowrap" }}>Focal X</span>
            <input
              type="range" min="0" max="100" value={focalX}
              onChange={(e) => setFocalX(Number(e.target.value))}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 accent-clay h-1"
            />
            <span className="font-micro" style={{ color: "#9a8f84", fontSize: "0.6rem", whiteSpace: "nowrap" }}>Focal Y</span>
            <input
              type="range" min="0" max="100" value={focalY}
              onChange={(e) => setFocalY(Number(e.target.value))}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 accent-clay h-1"
            />
          </div>
        )}

        {/* Soft floating accent shape behind image */}
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

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
    </div>
  );
}