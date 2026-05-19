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
      {/* Soft tonal transition buffer */}
      <div className="w-full" style={{ height: "32px", background: "linear-gradient(to bottom, #F0EBE1, #1E1E1E)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 md:pt-12 pb-7 md:pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 pb-12 mb-10 border-b" style={{ borderColor: "#C4956A28" }}>

          {/* Brand column */}
          <div className="md:col-span-1">
            <p className="font-micro mb-2" style={{ color: "#C4956A", fontSize: "0.68rem" }}>
              Mama Launch Studio™
            </p>
            <h3 className="font-display text-xl mb-3 leading-snug" style={{ color: "#FAF7F2" }}>
              Home-Based Childcare,<br />
              <em style={{ color: "#C4956A" }}>Done with Intention.</em>
            </h3>
            <p className="font-body text-sm leading-relaxed" style={{ color: "#7A6E65" }}>
              A guided implementation system for mothers building home childcare programs with structure, calm, and community support.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <p className="font-micro mb-3" style={{ color: "#C4956A", fontSize: "0.7rem" }}>
              Navigate
            </p>
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) =>
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-body text-sm text-left w-full transition-all duration-150 min-h-[36px] rounded-lg px-2 -mx-2 hover:text-white"
                style={{ color: "#7A6E65", background: "none", border: "none" }}>
                
                  {item.label}
                </button>
              )}
            </nav>
          </div>

          {/* CTA column */}
          <div>
            

            
            

            
            





            
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs" style={{ color: "#4A3F38" }}>
            © 2026 Mama Launch Studio. All rights reserved.
          </p>
          <p className="font-body text-xs" style={{ color: "#4A3F38" }}>
            Designed with intention. Built with love.
          </p>
        </div>
      </div>
    </footer>);

}