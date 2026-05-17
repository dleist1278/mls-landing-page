import React from "react";

export default function SiteFooter() {
  return (
    <footer
      className="py-16 px-6 md:px-12"
      style={{ backgroundColor: "#2C2C2C", color: "#FAF7F2" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="border-b pb-12 mb-10" style={{ borderColor: "#C4956A55" }}>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-display text-2xl mb-4" style={{ color: "#FAF7F2" }}>
                Mama Launch Studio
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#A09285" }}>
                Building intentional legacies, one living room at a time. The home-based childcare implementation system for the visionary mother.
              </p>
            </div>
            <div>
              <p className="font-micro mb-6" style={{ color: "#C4956A", fontSize: "0.75rem" }}>
                Navigate
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "The Method", id: "method" },
                  { label: "Programs", id: "models" },
                  { label: "Community", id: "ecosystem" },
                  { label: "Meet Danielle", id: "founder" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="font-body text-sm cursor-pointer hover:text-clay transition-colors text-left min-h-[36px]"
                    style={{ color: "#A09285", background: "none", border: "none", padding: 0 }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-micro mb-6" style={{ color: "#C4956A", fontSize: "0.75rem" }}>
                Begin Here
              </p>
              <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "#A09285" }}>
                Ready to launch your home childcare program? Start with our free intake assessment.
              </p>
              <button
                onClick={() => document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" })}
                className="font-micro text-white px-6 py-3 rounded-full transition-opacity hover:opacity-90 min-h-[44px]"
                style={{ backgroundColor: "#4D5E49", fontSize: "0.8rem" }}
              >
                Start Your Launch Path
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs" style={{ color: "#6B5E56" }}>
            © 2026 Mama Launch Studio. All rights reserved.
          </p>
          <p className="font-body text-xs" style={{ color: "#6B5E56" }}>
            Designed with intention. Built with love.
          </p>
        </div>
      </div>
    </footer>
  );
}