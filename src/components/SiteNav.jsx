import React, { useState, useEffect, useRef } from "react";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        const prev = lastScrollY.current;
        setScrolled(current > 40);
        if (current < 80) {
          setNavVisible(true);
        } else if (current > prev + 6) {
          setNavVisible(false);
        } else if (prev > current + 6) {
          setNavVisible(true);
        }
        lastScrollY.current = current;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
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
        backgroundColor: scrolled ? "rgba(250,247,242,0.98)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(196,149,106,0.18)" : "none",
        boxShadow: scrolled ? "0 1px 12px rgba(44,44,44,0.06)" : "none",
        transform: `translateY(${navVisible ? "0" : "-100%"})`,
        transition: "transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-14 py-3 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <div
          className="cursor-pointer transition-opacity duration-300"
          style={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? "none" : "auto" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="font-display text-charcoal tracking-tight" style={{ fontSize: "1.25rem" }}>
            Mama Launch Studio
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-9">
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
              style={{ fontSize: "0.85rem", letterSpacing: "0.07em" }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/quiz"
            className="font-micro text-white rounded-full transition-all duration-200 hover:opacity-90 focus-sage flex items-center"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.82rem", letterSpacing: "0.07em", padding: "14px 28px", boxShadow: "0 4px 16px rgba(77,94,73,0.22)", minHeight: "48px", textDecoration: "none" }}
          >
            Take the Free Quiz
          </a>
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
          <a
            href="/quiz"
            className="font-micro text-white px-6 py-4 rounded-full min-h-[52px] focus-sage w-full text-center flex items-center justify-center"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.78rem", textDecoration: "none" }}
          >
            Take the Free Quiz
          </a>
        </div>
      )}
    </nav>
  );
}