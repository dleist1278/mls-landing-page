import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function QuizJoin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { primaryLabel, firstName } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      <SiteNav />
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-16 text-center">
        <div
          className="w-full max-w-lg rounded-3xl p-8 md:p-12"
          style={{
            background: "linear-gradient(145deg, #F0EBE1 0%, #E8DDD0 100%)",
            border: "1px solid rgba(196,149,106,0.18)",
            boxShadow: "0 12px 48px rgba(44,44,44,0.07)",
          }}
        >
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4D5E4918" }}>
              <CheckCircle2 className="w-7 h-7" style={{ color: "#4D5E49" }} />
            </div>
          </div>

          <p className="font-micro mb-3" style={{ color: "#C4956A", fontSize: "0.62rem", letterSpacing: "0.18em" }}>
            YOU'RE ON THE LIST
          </p>

          <h1 className="font-display mb-4" style={{ color: "#2C2C2C", fontSize: "clamp(1.6rem, 5vw, 2.4rem)", lineHeight: "1.2" }}>
            {firstName ? `You're in, ${firstName}!` : "You're in!"}
          </h1>

          {primaryLabel && (
            <div
              className="inline-block rounded-full px-5 py-2 mb-5"
              style={{ backgroundColor: "#4D5E4910", border: "1px solid #4D5E4925" }}
            >
              <span className="font-micro" style={{ color: "#4D5E49", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                Your fit: {primaryLabel}
              </span>
            </div>
          )}

          <p className="font-body leading-relaxed mb-8" style={{ color: "#5C5148", fontSize: "1rem", lineHeight: "1.7", maxWidth: "38ch", margin: "0 auto 2rem" }}>
            Your Childcare Fit result has been saved. We'll send you app launch updates, early access details, and resources matched to your pathway as Mama Launch Studio gets closer to opening.
          </p>

          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(196,149,106,0.3), transparent)", marginBottom: "24px" }} />

          <p className="font-body mb-5" style={{ color: "#7A6E65", fontSize: "0.9rem" }}>
            In the meantime, explore what Mama Launch Studio is building.
          </p>

          <button
            onClick={() => navigate("/")}
            className="font-micro text-white px-7 py-3.5 rounded-full"
            style={{ backgroundColor: "#4D5E49", fontSize: "0.72rem", letterSpacing: "0.1em", boxShadow: "0 6px 24px rgba(77,94,73,0.24)" }}
          >
            Back to Mama Launch Studio
          </button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}