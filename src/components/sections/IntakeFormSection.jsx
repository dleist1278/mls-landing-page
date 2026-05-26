import React, { useRef, useEffect, useState } from "react";

export default function IntakeFormSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const formContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Load HubSpot embed script and create form
    if (!document.querySelector('script[src="//js.hsforms.net/forms/embed/v2.js"]')) {
      const script = document.createElement("script");
      script.charset = "utf-8";
      script.type = "text/javascript";
      script.src = "//js.hsforms.net/forms/embed/v2.js";
      script.onload = () => createHsForm();
      document.head.appendChild(script);
    } else if (window.hbspt) {
      createHsForm();
    }

    function createHsForm() {
      if (window.hbspt && formContainerRef.current) {
        formContainerRef.current.innerHTML = "";
        window.hbspt.forms.create({
          region: "na2",
          portalId: "246156561",
          formId: "aa96c22d-2a9d-495a-9951-158ab4b95899",
          target: "#hs-form-container",
        });
      }
    }
  }, []);

  return (
    <section
      id="intake"
      style={{
        backgroundColor: "#FAF7F2",
        overflow: "hidden",
        scrollMarginTop: "96px",
        borderTop: "1px solid rgba(196,149,106,0.08)",
      }}
    >
      {/* Mobile-only header */}
      <div className="md:hidden px-5 pt-10 pb-0">
        <p
          className="font-micro mb-3 flex items-center justify-center gap-3"
          style={{ color: "#C4956A", fontSize: "0.62rem", letterSpacing: "0.16em" }}
        >
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
          FOUNDING MEMBER WAITLIST
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
        </p>
        <h2
          className="font-display leading-snug mb-3 text-center"
          style={{
            color: "#2C2C2C",
            fontSize: "clamp(1.85rem, 5.5vw, 3.2rem)",
            lineHeight: "1.2",
            maxWidth: "16ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Come build this
          <br />
          <em style={{ color: "#4D5E49" }}>with us.</em>
        </h2>
        <p
          className="font-body leading-relaxed mb-3 text-center mx-auto"
          style={{ color: "#5C5148", fontSize: "0.875rem", lineHeight: "1.65", maxWidth: "32ch" }}
        >
          From idea to opening day —
          <br />
          with clarity, structure, and support.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 md:px-10 py-6 md:py-16">
        <div
          ref={ref}
          style={{
            transition: "opacity 0.6s ease, transform 0.6s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          {/* Intro card */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)",
              border: "1px solid rgba(196,149,106,0.12)",
              boxShadow: "0 8px 40px rgba(44,44,44,0.04), 0 2px 8px rgba(196,149,106,0.06)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            {/* Top accent bar */}
            <div
              className="h-1 w-full"
              style={{ background: "linear-gradient(90deg, #C4956A, #4D5E49, #C4956A)" }}
            />

            {/* Decorative corner flourish */}
            <div
              className="absolute bottom-8 left-5 opacity-[0.06] pointer-events-none select-none"
              style={{ fontSize: "3.5rem", lineHeight: 1, color: "#4D5E49" }}
            >
              ✦
            </div>

            <div className="px-6 md:px-10 py-8 md:py-10">
              {/* Desktop header */}
              <div className="hidden md:block text-center mb-8">
                <style>{`
                  @keyframes intakeFadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
                <p
                  className="font-micro mb-3 inline-flex items-center gap-3"
                  style={{
                    color: "#C4956A", fontSize: "0.72rem",
                    opacity: visible ? 1 : 0,
                    animation: visible ? "intakeFadeUp 0.55s ease forwards" : "none",
                  }}
                >
                  <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
                  FOUNDING MEMBER WAITLIST
                  <span className="inline-block w-8 h-px" style={{ backgroundColor: "#C4956A" }} />
                </p>
                <h2
                  className="font-display leading-tight mb-3 break-words"
                  style={{
                    color: "#2C2C2C",
                    fontSize: "clamp(2rem, 3.8vw, 3rem)",
                    overflowWrap: "break-word",
                    opacity: visible ? 1 : 0,
                    animation: visible ? "intakeFadeUp 0.65s ease 0.1s forwards" : "none",
                  }}
                >
                  Come build this{" "}
                  <em style={{ color: "#4D5E49" }}>with us.</em>
                </h2>
                <p
                  className="font-body mx-auto leading-relaxed"
                  style={{
                    color: "#5C5148", maxWidth: "440px", fontSize: "1.125rem",
                    opacity: visible ? 1 : 0,
                    animation: visible ? "intakeFadeUp 0.6s ease 0.2s forwards" : "none",
                  }}
                >
                  From idea to opening day — with clarity, structure, and support.
                </p>
                <p
                  className="font-body mx-auto mt-2"
                  style={{
                    color: "#7A6E65", maxWidth: "400px", fontSize: "1.05rem",
                    opacity: visible ? 1 : 0,
                    animation: visible ? "intakeFadeUp 0.6s ease 0.28s forwards" : "none",
                  }}
                >
                  You do not need to have everything figured out before starting.
                </p>
              </div>

              {/* HubSpot Embed Form */}
              <style>{`
                #hs-form-container .hs-form fieldset { max-width: 100% !important; }
                #hs-form-container .hs-form .hs-input {
                  background: rgba(255,255,255,0.7) !important;
                  border: 1px solid #E0D1BF !important;
                  border-radius: 10px !important;
                  padding: 10px 14px !important;
                  font-family: 'Inter', sans-serif !important;
                  font-size: 16px !important;
                  color: #2C2C2C !important;
                  width: 100% !important;
                  box-sizing: border-box !important;
                }
                #hs-form-container .hs-form .hs-button {
                  background: linear-gradient(135deg, #4D5E49, #3a4a37) !important;
                  color: #fff !important;
                  font-family: 'Inter', sans-serif !important;
                  font-size: 0.75rem !important;
                  letter-spacing: 0.1em !important;
                  text-transform: uppercase !important;
                  border: none !important;
                  border-radius: 14px !important;
                  padding: 14px 32px !important;
                  width: 100% !important;
                  cursor: pointer !important;
                  box-shadow: 0 6px 24px rgba(77,94,73,0.28) !important;
                }
                #hs-form-container .hs-form label {
                  font-family: 'Inter', sans-serif !important;
                  font-size: 0.65rem !important;
                  letter-spacing: 0.1em !important;
                  text-transform: uppercase !important;
                  color: #9a8f84 !important;
                }
                #hs-form-container .hs-error-msgs { color: #DC2626 !important; font-size: 0.8rem !important; }
                #hs-form-container .hs-form .field { margin-bottom: 20px !important; }
              `}</style>
              <div id="hs-form-container" ref={formContainerRef} />
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}