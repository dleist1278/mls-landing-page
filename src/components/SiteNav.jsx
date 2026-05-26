import React, { useState, useEffect } from "react";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="md:fixed md:top-0 md:left-0 md:right-0 md:z-50 transition-all duration-500 relative"
      style={{
        backgroundColor: scrolled ? "rgba(250,247,242,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(196,149,106,0.18)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(44,44,44,0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-3 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <div
          className="cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="font-display text-xl text-charcoal tracking-tight">
            Mama Launch Studio
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "The Method", id: "method" },
            { label: "Programs", id: "models" },
            { label: "Community", id: "ecosystem" },
            { label: "Meet Danielle", id: "founder" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-micro text-charcoal hover:text-sage transition-colors duration-200 focus-sage min-h-[44px] flex items-center"
              style={{ fontSize: "0.72rem", letterSpacing: "0.08em" }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("intake")}
            className="font-micro text-white px-6 py-3 rounded-full transition-all duration-200 hover:opacity-90 focus-sage min-h-[44px]"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.72rem", letterSpacing: "0.08em", boxShadow: "0 4px 16px rgba(77,94,73,0.2)" }}
          >
            Join the Founding Member Waitlist
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] min-w-[44px] items-center justify-center focus-sage"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-8 pt-5 overflow-hidden"
          style={{ backgroundColor: "#FAF7F2", borderBottom: "1px solid #C4956A55", maxWidth: "100vw" }}
        >
          {/* 2-column grid of nav links */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-5">
            {[
              { label: "The Method", id: "method" },
              { label: "Program Pathways", id: "models" },
              { label: "Community", id: "ecosystem" },
              { label: "Meet Danielle", id: "founder" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-micro text-charcoal hover:text-sage transition-colors text-left focus-sage flex items-center"
                style={{ fontSize: "0.78rem", minHeight: "52px", letterSpacing: "0.06em" }}
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Divider */}
          <div className="w-full h-px mb-5" style={{ backgroundColor: "#C4956A33" }} />
          {/* CTA */}
          <button
            onClick={() => scrollTo("intake")}
            className="font-micro text-white px-6 py-4 rounded-full min-h-[52px] focus-sage w-full text-center"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.78rem" }}
          >
            Join the Founding Member Waitlist
          </button>
        </div>
      )}
    </nav>
  );
}