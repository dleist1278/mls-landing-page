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
        backgroundColor: scrolled ? "rgba(250,247,242,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #C4956A33" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-3 md:py-7 flex items-center justify-between">
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
        <div className="hidden md:flex items-center gap-10">
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
              style={{ fontSize: "0.8rem" }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("intake")}
            className="font-micro text-white px-6 py-3 rounded-full transition-all duration-200 hover:opacity-90 focus-sage min-h-[44px]"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.8rem" }}
          >
            Start Your Launch Path
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
          className="md:hidden px-6 pb-10 pt-5 flex flex-col gap-5"
          style={{ backgroundColor: "#FAF7F2", borderBottom: "1px solid #C4956A55" }}
        >
          {[
            { label: "The Method", id: "method" },
            { label: "Programs", id: "models" },
            { label: "Community", id: "ecosystem" },
            { label: "Meet Danielle", id: "founder" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-micro text-charcoal hover:text-sage transition-colors text-left min-h-[48px] flex items-center focus-sage"
              style={{ fontSize: "0.9rem" }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("intake")}
            className="font-micro text-white px-6 py-4 rounded-full min-h-[52px] focus-sage w-full text-center mt-1"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.85rem" }}
          >
            Start Your Launch Path
          </button>
        </div>
      )}
    </nav>
  );
}