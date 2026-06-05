import React from "react";
import { useNavigate } from "react-router-dom";

export default function SiteFooter() {
  const navigate = useNavigate();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const navLinks = [
  { label: "Pathways", id: "pathways" },
  { label: "How It Works", id: null, href: "/#intake" },
  { label: "Meet Danielle", id: "founder" },
  { label: "Get App Updates", id: "intake" }];


  return (
    <footer style={{ backgroundColor: "#1E1E1E" }}>
      {/* Tonal gradient bridge */}
      <div className="w-full h-px" style={{ backgroundColor: "#C4956A", opacity: 0.22 }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">

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
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((item) =>
            <button
              key={item.label}
              onClick={() => item.id ? scrollTo(item.id) : undefined}
              className="font-micro transition-colors duration-150 hover:text-white"
              style={{ color: "#6A5E57", fontSize: "0.68rem", letterSpacing: "0.08em", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                {item.label}
              </button>
            )}
          <button
            onClick={() => navigate("/quiz")}
            className="font-micro transition-colors duration-150 hover:text-white"
            style={{ color: "#C4956A", fontSize: "0.68rem", letterSpacing: "0.08em", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
            Take the Free Quiz
          </button>
          </nav>
        </div>

        {/* Bottom micro bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-1.5 pt-5">
          <p className="font-micro" style={{ color: "#3A3028", fontSize: "0.62rem", letterSpacing: "0.06em" }}>© 2026 Mama Launch Studio. All rights reserved.</p>
          <p className="font-micro" style={{ color: "#3A3028", fontSize: "0.62rem", letterSpacing: "0.06em" }}>Designed with intention. Built with love.</p>
        </div>

      </div>
    </footer>);

}