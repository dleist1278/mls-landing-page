import React, { useRef, useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const STORAGE_KEY = "mama_launch_hero_image";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=1200&q=85";

/**
 * HeroImage — editor-controlled hero image panel.
 * Image persists via localStorage. Visitors see the saved image (or a polished fallback).
 * Hover to reveal the "Replace Image" overlay — upload is admin/editor only.
 */
export default function HeroImage({ visible }) {
  const [src, setSrc] = useState(() => localStorage.getItem(STORAGE_KEY) || DEFAULT_IMAGE);
  const [uploading, setUploading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setSrc(file_url);
    localStorage.setItem(STORAGE_KEY, file_url);
    setUploading(false);
  };

  return (
    <div
      className={`relative flex-1 transition-all duration-1000 delay-300 hidden md:flex items-center justify-end ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}
      style={{ minHeight: "520px" }}
    >
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
          }}
          onClick={() => inputRef.current?.click()}
        >
          <img
            src={src}
            alt="Hero — home childcare environment"
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ objectPosition: "center 35%", transform: hovered ? "scale(1.02)" : "scale(1)" }}
          />

          {/* Hover overlay — editor replaces image here */}
          {hovered && !uploading && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all"
              style={{ background: "rgba(44,44,44,0.38)", backdropFilter: "blur(2px)", borderRadius: "28px" }}
            >
              <p className="font-micro text-white" style={{ fontSize: "0.7rem" }}>Replace Image</p>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(250,247,242,0.85)", borderRadius: "28px" }}>
              <p className="font-micro" style={{ color: "#C4956A", fontSize: "0.7rem" }}>Uploading…</p>
            </div>
          )}
        </div>

        {/* Soft floating accent shape */}
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