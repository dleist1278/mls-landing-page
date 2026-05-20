import React from "react";

export default function SiteFooter() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const navLinks = [
  { label: "The Method", id: "method" },
  { label: "Program Pathways", id: "models" },
  { label: "Community", id: "ecosystem" },
  { label: "Meet Danielle", id: "founder" },
  { label: "Join the Waitlist", id: "intake" }];


  return (
    <footer style={{ backgroundColor: "#1E1E1E" }}>
      {/* Tonal gradient bridge */}
      <div className="w-full hidden" style={{ height: "48px", background: "linear-gradient(to bottom, #FAF7F2, #1E1E1E)" }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-7">

        {/* Single condensed row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-5 border-b" style={{ borderColor: "#C4956A18" }}>

          {/* Brand mark */}
          <div className="flex-none">
            <p className="font-micro mb-0.5" style={{ color: "#C4956A", fontSize: "0.68rem" }}>Mama Launch Studio™</p>
            <p className="font-display text-base leading-snug" style={{ color: "#FAF7F2" }}>
              Home-Based Childcare, <em style={{ color: "#C4956A" }}>Done with Intention.</em>
            </p>
          </div>

          {/* Nav links — horizontal on desktop, wrap on mobile */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map((item) =>
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-body text-xs transition-colors duration-150 hover:text-white"
              style={{ color: "#7A6E65", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                {item.label}
              </button>
            )}
          </nav>
        </div>

        {/* Bottom micro bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-1.5 pt-4">
          <p className="font-body text-xs" style={{ color: "#3A3028" }}>© 2026 Mama Launch Studio. All rights reserved.</p>
          <p className="font-body text-xs" style={{ color: "#3A3028" }}>Designed with intention. Built with love.</p>
        </div>

      </div>
    </footer>);

}