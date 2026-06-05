import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { PATHWAY_LABELS, PATHWAY_DESCRIPTIONS, HOME_BASED_PATHWAYS } from "@/lib/quizConfig";
import { PATHWAY_RICH_CONTENT } from "@/lib/pathwayContent";

const css = `
  .qr-root *, .qr-root *::before, .qr-root *::after { box-sizing: border-box; }
  .qr-root {
    font-family: 'Inter', system-ui, sans-serif;
    background: #faf7f2;
    color: #2c2c2c;
    line-height: 1.7;
    font-size: 16px;
    min-height: 100vh;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  /* NAV */
  .qr-nav {
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(196,149,106,0.18);
    background: #faf7f2;
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .qr-nav-logo {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 15px;
    letter-spacing: .06em;
    color: #2c2c2c;
  }
  .qr-nav-back {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #7a6e65;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 0;
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: .04em;
  }

  /* MAIN */
  .qr-main {
    max-width: 680px;
    margin: 0 auto;
    padding: 40px 20px calc(140px + env(safe-area-inset-bottom, 0px));
    width: 100%;
  }

  /* EYEBROW */
  .qr-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: #c4956a;
    font-weight: 500;
    margin-bottom: 12px;
  }

  /* HERO CARD */
  .qr-hero-card {
    background: linear-gradient(145deg, #f0ebe1 0%, #e8ddd0 100%);
    border: 1px solid rgba(196,149,106,0.22);
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 8px 40px rgba(44,44,44,0.07);
    margin-bottom: 20px;
    width: 100%;
  }
  .qr-hero-accent {
    height: 4px;
    background: linear-gradient(90deg, #c4956a, #4d5e49, #c4956a);
  }
  .qr-hero-body {
    padding: 32px 28px 36px;
  }
  .qr-hero-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(28px, 6vw, 44px);
    font-weight: 400;
    line-height: 1.15;
    color: #2c2c2c;
    margin-bottom: 16px;
  }
  .qr-hero-desc {
    font-size: 16px;
    color: #5c5148;
    line-height: 1.75;
    margin-bottom: 0;
  }

  /* SECTION CARDS */
  .qr-section {
    border-radius: 6px;
    padding: 26px 24px;
    margin-bottom: 16px;
    width: 100%;
    border: 1px solid transparent;
  }
  .qr-section-clay {
    background: rgba(196,149,106,0.07);
    border-color: rgba(196,149,106,0.2);
  }
  .qr-section-sage {
    background: rgba(77,94,73,0.05);
    border-color: rgba(77,94,73,0.16);
  }
  .qr-section-sage-deep {
    background: rgba(77,94,73,0.09);
    border-color: rgba(77,94,73,0.2);
  }
  .qr-section-warning {
    background: rgba(77,94,73,0.06);
    border-color: rgba(77,94,73,0.18);
    border-left: 4px solid #4d5e49;
  }
  .qr-section-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    letter-spacing: .16em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .qr-section-eyebrow-clay { color: #c4956a; }
  .qr-section-eyebrow-sage { color: #4d5e49; }
  .qr-section h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(18px, 3.5vw, 24px);
    font-weight: 400;
    color: #2c2c2c;
    line-height: 1.25;
    margin-bottom: 10px;
  }
  .qr-section p {
    font-size: 15px;
    color: #5c5148;
    line-height: 1.75;
    margin-bottom: 10px;
  }
  .qr-section p:last-child { margin-bottom: 0; }

  /* DIVIDER */
  .qr-divider {
    border: none;
    border-top: 1px solid rgba(196,149,106,0.18);
    margin: 8px 0 16px;
  }

  /* CTA CARD */
  .qr-cta-card {
    background: #fffdf9;
    border: 1px solid rgba(196,149,106,0.2);
    border-radius: 6px;
    padding: 32px 28px;
    margin-bottom: 16px;
    width: 100%;
    box-shadow: 0 4px 24px rgba(44,44,44,0.04);
  }
  .qr-cta-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(20px, 4vw, 28px);
    font-weight: 400;
    color: #2c2c2c;
    line-height: 1.2;
    margin-bottom: 12px;
  }
  .qr-cta-body {
    font-size: 15px;
    color: #7a6e65;
    line-height: 1.75;
    margin-bottom: 20px;
  }
  .qr-cta-email {
    font-size: 13px;
    color: #9a8f84;
    margin-top: 8px;
    line-height: 1.6;
  }

  /* BUTTON */
  .qr-btn {
    width: 100%;
    background: #4d5e49;
    color: white;
    border: none;
    padding: 17px 24px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    letter-spacing: .1em;
    text-transform: uppercase;
    font-weight: 500;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: background .2s;
    min-height: 56px;
    white-space: normal;
    line-height: 1.3;
    box-shadow: 0 6px 24px rgba(77,94,73,0.25);
    box-sizing: border-box;
  }
  .qr-btn:hover { background: #3d4e39; }
  .qr-btn:disabled { background: #8a9e86; cursor: not-allowed; }
  .qr-btn-outline {
    width: 100%;
    background: transparent;
    color: #4d5e49;
    border: 1px solid #4d5e49;
    padding: 15px 24px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    letter-spacing: .1em;
    text-transform: uppercase;
    font-weight: 500;
    border-radius: 3px;
    cursor: pointer;
    min-height: 48px;
    margin-top: 10px;
    transition: all .2s;
  }
  .qr-btn-outline:hover { background: rgba(77,94,73,0.06); }

  /* ERROR */
  .qr-error {
    font-size: 13px;
    color: #92400e;
    background: rgba(196,149,106,0.1);
    border: 1px solid rgba(196,149,106,0.25);
    border-radius: 4px;
    padding: 12px 16px;
    margin-bottom: 16px;
    line-height: 1.6;
  }

  /* SUCCESS */
  .qr-success {
    text-align: center;
    padding: 16px 0 8px;
  }
  .qr-success-icon {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(77,94,73,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin: 0 auto 18px;
  }
  .qr-success-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 22px;
    font-weight: 400;
    color: #2c2c2c;
    margin-bottom: 10px;
  }
  .qr-success-body {
    font-size: 14px;
    color: #5c5148;
    line-height: 1.75;
    max-width: 400px;
    margin: 0 auto;
  }

  /* FALLBACK */
  .qr-fallback-main {
    max-width: 600px;
    margin: 0 auto;
    padding: 60px 20px calc(140px + env(safe-area-inset-bottom, 0px));
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 64px);
  }
  .qr-fallback-card {
    background: linear-gradient(145deg, #f0ebe1 0%, #e8ddd0 100%);
    border: 1px solid rgba(196,149,106,0.22);
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 8px 40px rgba(44,44,44,0.06);
    text-align: center;
  }
  .qr-fallback-body {
    padding: 40px 28px 36px;
  }
  .qr-fallback-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(24px, 5vw, 36px);
    font-weight: 400;
    color: #2c2c2c;
    line-height: 1.2;
    margin-bottom: 16px;
  }
  .qr-fallback-sub {
    font-size: 15px;
    color: #5c5148;
    line-height: 1.75;
    max-width: 400px;
    margin: 0 auto 28px;
  }

  /* FOOTER */
  .qr-footer {
    background: #faf7f2;
    border-top: 1px solid rgba(196,149,106,0.14);
    padding: 28px 24px;
    text-align: center;
  }
  .qr-footer-brand {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 13px;
    color: #7a6e65;
    margin-bottom: 6px;
  }
  .qr-footer-note {
    font-size: 11px;
    color: #aaa;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.65;
  }

  @media (max-width: 480px) {
    .qr-main { padding-left: 14px; padding-right: 14px; }
    .qr-hero-body { padding: 24px 20px 28px; }
    .qr-section { padding: 20px 18px; }
    .qr-cta-card { padding: 24px 20px; }
    .qr-fallback-body { padding: 32px 20px 28px; }
  }
`;

export default function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const stateData = location.state || (() => {
    try {
      const s = sessionStorage.getItem("mls_quiz_result");
      return s ? JSON.parse(s) : null;
    } catch (_) { return null; }
  })();

  const { answers = {}, result = {}, leadForm = {}, savedContactId } = stateData || {};

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const primaryLabel = PATHWAY_LABELS[result.primary] || "Your Best-Fit Pathway";
  const description  = PATHWAY_DESCRIPTIONS[result.primary] || "";
  const isHomeBased  = HOME_BASED_PATHWAYS.includes(result.primary);
  const richContent  = PATHWAY_RICH_CONTENT[result.primary] || null;
  const displayEmail = leadForm.email || "";

  const handleSaveResult = async () => {
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        email:             displayEmail.trim().toLowerCase(),
        firstName:         leadForm.firstName?.trim(),
        lastName:          leadForm.lastName?.trim(),
        state:             leadForm.stateCode,
        source:            "childcare_fit_quiz",
        contactType:       "Quiz Lead",
        quizTaken:         true,
        quizCompletedDate: new Date().toISOString(),
        primaryPathway:    result.primary,
        secondaryPathways: result.secondary,
        pathway:           result.primary,
        biggestBlocker:    answers.q_biggest_blocker,
        supportNeeded:     Array.isArray(answers.q_support_needed) ? answers.q_support_needed.join(", ") : (answers.q_support_needed || ""),
        localParentNeed:   Array.isArray(answers.q_local_parent_need) ? answers.q_local_parent_need.join(", ") : (answers.q_local_parent_need || ""),
        readinessLevel:    answers.q_readiness_level,
        incomeGoal:        answers.q_income_goal,
        incomeStyle:       answers.q_income_style,
        launchTimeline:    answers.q_launch_timeline,
        providerIdentity:  answers.q_provider_identity,
        parentPresence:    answers.q_parent_presence,
        careLocation:      answers.q_care_location,
      };
      if (savedContactId) payload.contactId = savedContactId;

      const res = await base44.functions.invoke("hubspotLeadCapture", payload);
      setSubmitting(false);
      if (res.data?.success) {
        setSaved(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError("Something went wrong saving your result. Your quiz result is still here — please try again in a moment.");
      }
    } catch (err) {
      console.error("Quiz result save failed:", err);
      setSubmitting(false);
      setError("Something went wrong saving your result. Your quiz result is still here — please try again in a moment.");
    }
  };

  // ── FALLBACK ──
  if (!result.primary) {
    return (
      <>
        <style>{css}</style>
        <div className="qr-root">
          <Nav onBack={null} />
          <div className="qr-fallback-main">
            <div className="qr-fallback-card">
              <div className="qr-hero-accent" />
              <div className="qr-fallback-body">
                <p className="qr-eyebrow">Childcare Fit Quiz</p>
                <h1 className="qr-fallback-title">Your quiz result isn't available yet.</h1>
                <p className="qr-fallback-sub">
                  Take the free Childcare Fit Quiz to discover which Mama Launch pathway fits your season of life, your home, your schedule, and the kind of village you want to build.
                </p>
                <button className="qr-btn" onClick={() => navigate("/quiz")}>
                  Take the Free Quiz
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  // ── RESULT ──
  return (
    <>
      <style>{css}</style>
      <div className="qr-root">
        <Nav onBack={() => navigate("/quiz")} />
        <main className="qr-main">

          {/* 1. Hero — Result badge + pathway title + description */}
          <div className="qr-hero-card">
            <div className="qr-hero-accent" />
            <div className="qr-hero-body">
              <p className="qr-eyebrow">Your Childcare Fit Result</p>
              <h1 className="qr-hero-title">{primaryLabel}</h1>
              <p className="qr-hero-desc">{description}</p>
            </div>
          </div>

          {/* 2–4. Rich pathway content */}
          {richContent && (<>

            <div className="qr-section qr-section-clay">
              <p className="qr-section-eyebrow qr-section-eyebrow-clay">Why This Pathway Fits You</p>
              {richContent.why.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="qr-section qr-section-sage">
              <p className="qr-section-eyebrow qr-section-eyebrow-sage">What This Can Become</p>
              {richContent.become.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="qr-section qr-section-sage-deep">
              <p className="qr-section-eyebrow qr-section-eyebrow-sage">Your Phase 1 Focus</p>
              {richContent.phase1.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

          </>)}

          {/* 5. Before you open your doors — home-based only */}
          {isHomeBased && (
            <div className="qr-section qr-section-warning">
              <p className="qr-section-eyebrow qr-section-eyebrow-sage">Before You Open Your Doors</p>
              <p>
                Before accepting children into care, confirm your licensing pathway, home/business insurance needs, parent policies, emergency procedures, and local requirements. Mama Launch helps you organize this inside the <strong>Licensing + Business Protection</strong> setup path.
              </p>
            </div>
          )}

          <hr className="qr-divider" />

          {/* 6. CTA card */}
          <div className="qr-cta-card">
            {saved ? (
              <div className="qr-success">
                <div className="qr-success-icon">✓</div>
                <h2 className="qr-success-title">Your result is saved!</h2>
                <p className="qr-success-body">
                  You're on the Mama Launch waitlist.
                  {displayEmail && <><br />Check <strong>{displayEmail}</strong> for your saved pathway and next steps.</>}
                </p>
              </div>
            ) : (<>
              <h2 className="qr-cta-title">Ready to build this with support?</h2>
              <p className="qr-cta-body">
                Inside Mama Launch, you'll get the roadmap, setup guidance, licensing and insurance organization, parent policies, pricing support, and simple systems to turn this pathway into a real business.
              </p>
              {displayEmail && (
                <p className="qr-cta-email">
                  We'll send a copy of your result to <strong>{displayEmail}</strong>.
                </p>
              )}
              {error && <p className="qr-error" style={{ marginTop: 16 }}>{error}</p>}
              <div style={{ marginTop: 20 }}>
                <button
                  className="qr-btn"
                  onClick={handleSaveResult}
                  disabled={submitting}
                >
                  {submitting ? "Saving…" : "Save My Result + Join Waitlist"}
                </button>
              </div>
            </>)}
          </div>

        </main>
        <Footer />
      </div>
    </>
  );
}

function Nav({ onBack }) {
  return (
    <nav className="qr-nav">
      <span className="qr-nav-logo">Mama Launch Studio</span>
      {onBack && (
        <button className="qr-nav-back" onClick={onBack}>
          ← Retake Quiz
        </button>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="qr-footer">
      <p className="qr-footer-brand">Mama Launch Studio</p>
      <p className="qr-footer-note">
        Mama Launch Studio provides educational content and frameworks for moms exploring home-based childcare programs. This is not legal or licensing advice. Licensing requirements vary by state.
      </p>
    </footer>
  );
}