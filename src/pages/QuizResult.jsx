import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { PATHWAY_LABELS, HOME_BASED_PATHWAYS } from "@/lib/quizConfig";
import { PATHWAY_BLUEPRINT_CONTENT } from "@/lib/pathwayContent";
import "@/styles/quizResult.css";

export default function QuizResult() {
  const location  = useLocation();
  const navigate  = useNavigate();

  const stateData = location.state || (() => {
    try { const s = sessionStorage.getItem("mls_quiz_result"); return s ? JSON.parse(s) : null; }
    catch (_) { return null; }
  })();

  const { answers = {}, result = {}, leadForm = {}, savedContactId } = stateData || {};

  const [submitting, setSubmitting] = useState(false);
  const [error,      setError     ] = useState("");
  const [saved,      setSaved     ] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const primaryKey   = result.primary;
  const primaryLabel = PATHWAY_LABELS[primaryKey] || "Your Best-Fit Pathway";
  const content      = PATHWAY_BLUEPRINT_CONTENT[primaryKey];
  const isHomeBased  = HOME_BASED_PATHWAYS.includes(primaryKey);
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
        primaryPathway:    primaryKey,
        secondaryPathways: result.secondary,
        pathway:           primaryKey,
        biggestBlocker:    answers.q_biggest_blocker,
        supportNeeded:     Array.isArray(answers.q_support_needed)   ? answers.q_support_needed.join(", ")   : (answers.q_support_needed   || ""),
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
        setError("We couldn't save your waitlist spot. Your results are safe — please try again.");
      }
    } catch (err) {
      console.error("Save failed:", err);
      setSubmitting(false);
      setError("We couldn't save your waitlist spot. Your results are safe — please try again.");
    }
  };

  const handleDownload = () => window.print();

  // ── Branded Fallback ────────────────────────────────────────────────────
  if (!primaryKey || !content) {
    return (
      <div className="qb-root">
        <nav className="qb-nav">
          <span className="qb-logo">Mama Launch Studio</span>
        </nav>
        <div className="qb-fallback-page">
          <div className="qb-fallback-card">
            <div className="qb-hero-accent-rail" />
            <div className="qb-fallback-body">
              <span className="qb-eyebrow">Childcare Fit Quiz</span>
              <h1 className="qb-serif qb-fallback-title">Your quiz result isn't available yet.</h1>
              <p className="qb-sans qb-fallback-sub">
                Take the free Childcare Fit Quiz to discover which Mama Launch pathway fits your season of life, your home, your schedule, and the kind of village you want to build.
              </p>
              <button className="qb-btn-primary" onClick={() => navigate("/quiz")}>
                TAKE THE FREE QUIZ
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Mini-Blueprint Result Page ──────────────────────────────────────────
  return (
    <div className="qb-root">
      <nav className="qb-nav">
        <span className="qb-logo">Mama Launch Studio</span>
        <button className="qb-back-btn qb-sans" onClick={() => navigate("/quiz")}>
          ← Retake Quiz
        </button>
      </nav>

      <main className="qb-blueprint-flow">

        {/* 1 ── HERO RESULT CARD */}
        <div className="qb-hero-card">
          <div className="qb-hero-accent-rail" />
          <div className="qb-hero-body">
            <span className="qb-eyebrow">YOUR CHILDCARE FIT RESULT</span>
            <p className="qb-hero-title-sub qb-sans">Your best-fit starting path is:</p>
            <h1 className="qb-serif qb-hero-name">{primaryLabel}</h1>
            <p className="qb-sans qb-hero-desc">{content.shortDescription}</p>
            <div className="qb-tags-row">
              {content.tags.map((tag, i) => (
                <span key={i} className="qb-tag qb-sans">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* DOWNLOAD BANNER — top */}
        <div className="qb-download-banner">
          <p className="qb-download-banner-text qb-sans">
            Save a formatted copy of your blueprint result as a PDF.
          </p>
          <button className="qb-btn-outline" onClick={handleDownload}>
            DOWNLOAD MY RESULT
          </button>
        </div>

        {/* 2 ── PATHWAY SNAPSHOT */}
        <section>
          <h3 className="qb-section-title qb-sans">YOUR PATHWAY SNAPSHOT</h3>
          <div className="qb-snapshot-grid">
            <div className="qb-snapshot-card">
              <span className="qb-snapshot-label qb-sans">Best For</span>
              <p className="qb-snapshot-body qb-sans">{content.snapshot.bestFor}</p>
            </div>
            <div className="qb-snapshot-card">
              <span className="qb-snapshot-label qb-sans">Income Style</span>
              <p className="qb-snapshot-body qb-sans">{content.snapshot.incomeStyle}</p>
            </div>
            <div className="qb-snapshot-card">
              <span className="qb-snapshot-label qb-sans">Program Rhythm</span>
              <p className="qb-snapshot-body qb-sans">{content.snapshot.programRhythm}</p>
            </div>
            <div className="qb-snapshot-card">
              <span className="qb-snapshot-label qb-sans">Main Setup Focus</span>
              <p className="qb-snapshot-body qb-sans">{content.snapshot.setupFocus}</p>
            </div>
          </div>
        </section>

        {/* 3 ── WHY THIS PATHWAY FITS YOU */}
        <div className="qb-card qb-card-clay">
          <span className="qb-card-eyebrow qb-sans">WHY THIS PATHWAY FITS YOU</span>
          <h3 className="qb-serif qb-card-heading">Designed for your life &amp; goals</h3>
          <div className="qb-list">
            {content.whyFits.map((item, i) => (
              <div className="qb-list-item qb-sans" key={i}>
                <span className="qb-check-clay">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 ── WHAT THIS CAN BECOME */}
        <div className="qb-card qb-card-sage">
          <span className="qb-card-eyebrow qb-card-eyebrow-sage qb-sans">WHAT THIS CAN BECOME</span>
          <h3 className="qb-serif qb-card-heading">A foundation for beautiful growth</h3>
          <p className="qb-sans" style={{ fontSize: "14px", color: "#5C5148", marginBottom: "16px" }}>
            With the right foundation, this pathway can grow into a calm, relationship-centered childcare business that supports your family and serves your community.
          </p>
          <div className="qb-list">
            {content.outcomes.map((item, i) => (
              <div className="qb-list-item qb-sans" key={i}>
                <span className="qb-check-sage">✦</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5 ── YOUR PHASE 1 FOCUS */}
        <div className="qb-card qb-card-sage-deep">
          <span className="qb-card-eyebrow qb-card-eyebrow-sage qb-sans">YOUR PHASE 1 FOCUS</span>
          <h3 className="qb-serif qb-card-heading">Start with clarity before you build everything else</h3>
          <div className="qb-roadmap-list">
            {content.phase1.map((step, i) => (
              <div className="qb-roadmap-step qb-sans" key={i}>
                <span className="qb-roadmap-num">{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <p className="qb-sans" style={{ fontSize: "12px", fontStyle: "italic", color: "#4D5E49", textAlign: "center", marginTop: "20px", paddingTop: "14px", borderTop: "1px dashed rgba(77,94,73,0.2)" }}>
            "Mama Launch helps you build the foundation first so your childcare business feels intentional, protected, and sustainable."
          </p>
        </div>

        {/* 6 ── BEFORE YOU OPEN YOUR DOORS */}
        <div className="qb-card qb-card-trust">
          <span className="qb-card-eyebrow qb-sans">BEFORE YOU OPEN YOUR DOORS</span>
          <h3 className="qb-serif qb-card-heading">Your protected foundation</h3>
          <p className="qb-sans" style={{ fontSize: "14px", color: "#5C5148" }}>
            Every childcare pathway needs a clear foundation before families enroll. Before you open your doors, confirm your licensing pathway, home/business insurance needs, parent policies, emergency procedures, and local requirements.
          </p>
          <div className="qb-trust-grid">
            {["Licensing pathway", "Insurance coverage", "Parent policies", "Emergency procedures"].map((item) => (
              <div className="qb-trust-chip qb-sans" key={item}>
                <span style={{ color: "#C4956A" }}>✓</span> {item}
              </div>
            ))}
          </div>
          <p className="qb-sans" style={{ fontSize: "12px", color: "#7A6E65", marginTop: "14px", textAlign: "center" }}>
            Mama Launch helps you organize these pieces inside the <strong>Licensing + Business Protection Setup Path</strong>.
          </p>
        </div>

        {/* 7 ── SAVE + JOIN WAITLIST CTA */}
        <div className="qb-cta-box">
          {saved ? (
            <div className="qb-success">
              <div className="qb-success-icon">✓</div>
              <h2 className="qb-serif qb-success-title">Your result is saved!</h2>
              <p className="qb-sans qb-success-body">
                You're on the Mama Launch waitlist.
                {displayEmail && <><br />Check <strong>{displayEmail}</strong> for your saved pathway and next steps.</>}
              </p>
            </div>
          ) : (<>
            <h2 className="qb-serif qb-cta-title">Ready to build this with support?</h2>
            <p className="qb-sans qb-cta-desc">
              Inside Mama Launch, you'll get the roadmap, setup guidance, licensing and insurance organization, parent policies, pricing support, and simple systems to turn this pathway into a real business.
            </p>
            {displayEmail && (
              <p className="qb-sans qb-cta-email">
                We'll send a copy of your result to <strong>{displayEmail}</strong>.
              </p>
            )}
            {error && <p className="qb-sans qb-error">{error}</p>}
            <button className="qb-btn-primary" onClick={handleSaveResult} disabled={submitting}>
              {submitting ? "Saving…" : "SAVE RESULT + JOIN WAITLIST"}
            </button>
          </>)}

          <button className="qb-btn-outline" onClick={handleDownload}>
            DOWNLOAD MY RESULT
          </button>
        </div>

        {/* Print-only branded footer CTA (hidden on screen) */}
        <div className="qb-print-cta">
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", marginBottom: "8px" }}>Mama Launch Studio</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5C5148" }}>
            Ready to build your {primaryLabel} pathway with step-by-step support?<br />
            Visit <strong>mamaLaunchStudio.com</strong> to join the waitlist.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="qb-footer">
      <p className="qb-footer-logo">Mama Launch Studio</p>
      <p className="qb-footer-text qb-sans">
        Mama Launch Studio provides educational content and frameworks for mothers exploring home-based childcare programs. This is not legal or licensing advice. Licensing requirements vary by state — please consult your local childcare licensing agency.
      </p>
    </footer>
  );
}