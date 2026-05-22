// src/pages/BlueprintPage.jsx
import React from "react";

export default function BlueprintPage() {
  const staticFileUrl =
    "https://base44.app/api/apps/6a0f3060b259082fa2acf652/files/mp/public/6a0f3060b259082fa2acf652/a63d2cfc6_blueprint_landing.html";

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#F0EBE1",
      }}
    >
      <iframe
        src={staticFileUrl}
        title="The Calm Home Childcare Blueprint"
        style={{
          width: "100%",
          height: "100vh",
          minHeight: "1000px",
          border: "none",
          display: "block",
        }}
        allowFullScreen
      />

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#F0EBE1",
          borderTop: "1px solid rgba(196,149,106,0.08)",
        }}
      >
        <p style={{ color: "#5C5148", fontSize: "0.9rem" }}>
          If the blueprint page does not load,{" "}
          <a
            href={staticFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4D5E49", textDecoration: "underline" }}
          >
            click here to open it
          </a>
          .
        </p>
      </div>
    </div>
  );
}