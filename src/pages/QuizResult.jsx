import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { PATHWAY_LABELS } from "@/lib/quizConfig";
import { PATHWAY_BLUEPRINT_CONTENT } from "@/lib/pathwayContent";
import "@/styles/quizResult.css";

// ─── InsightDrawer ─────────────────────────────────────────────────────────
function InsightDrawer({ title, subtitle, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`insight-drawer${open ? " open" : ""}`}>
      <button
        type="button"
        className="drawer-trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <div className="drawer-trigger-left">
          <span>{title}</span>
          {subtitle && <span className="drawer-trigger-subtitle">{subtitle}</span>}
        </div>
        <span className="drawer-icon" aria-hidden="true">+</span>
      </button>
      {open && (
        <div className="qb-drawer-body">
          <div className="qb-drawer-inner">{children}</div>
        </div>
      )}
    </div>
  );
}

// ─── QuizResult ───────────────────────────────────────────────────────────
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
  const [meterFill, setMeterFill] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const t = setTimeout(() => setMeterFill(88), 300);
    return () => clearTimeout(t);
  }, []);

  const primaryKey   = result.primary;
  const primaryLabel = PATHWAY_LABELS[primaryKey] || "Your Best-Fit Pathway";
  const content      = PATHWAY_BLUEPRINT_CONTENT[primaryKey];
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
        supportNeeded:     Array.isArray(answers.q_support_needed)
          ? answers.q_support_needed.join(", ")
          : (answers.q_support_needed || ""),
        localParentNeed:   Array.isArray(answers.q_local_parent_need)
          ? answers.q_local_parent_need.join(", ")
          : (answers.q_local_parent_need || ""),
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

  // ── Fallback ──────────────────────────────────────────────────────────
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
              <h1 className="qb-serif qb-fallback-title">Your quiz result isn't here yet.</h1>
              <p className="qb-sans qb-fallback-sub">
                Take the free Childcare Fit Quiz to discover which Mama Launch pathway fits your season of life, your home, your schedule, and the kind of village you want to build.
              </p>
              <button className="qb-btn-primary" onClick={() => navigate("/quiz")}>
                TAKE THE FREE QUIZ
              </button>
            </div>
          </div>
        </div>
        <ResultFooter />
      </div>
    );
  }

  // ── Full Result Page ──────────────────────────────────────────────────
  return (
    <div className="qb-root">
      <nav className="qb-nav">
        <span className="qb-logo">Mama Launch Studio</span>
        <button className="qb-back-btn qb-sans" onClick={() => navigate("/quiz")}>
          ← Retake Quiz
        </button>
      </nav>

      <main className="qb-blueprint-flow">

        {/* 1 — HERO RESULT CARD */}
        <div className="qb-hero-card qb-reveal">
          <div className="qb-hero-accent-rail" />
          <div className="qb-hero-body">
            <span className="qb-eyebrow">YOUR PERSONALIZED BLUEPRINT</span>
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

        {/* 2 — PATHWAY FIT MATCH INDICATOR */}
        <div className="qb-fit-meter-card qb-reveal qb-reveal-d1">
          <div className="qb-fit-meter-header qb-sans">
            <span>PATHWAY FIT</span>
            <span className="qb-fit-meter-label">Strong Match</span>
          </div>
          <div className="qb-fit-meter-bar">
            <div className="qb-fit-meter-fill" style={{ width: `${meterFill}%` }} />
          </div>
          <p className="qb-fit-meter-insight qb-sans">
            Your answers point strongly toward this path. Your preferences around schedule, care style, and how you want to build your business align well with this model.
          </p>
        </div>

        {/* 3 — TOP ACTION ROW */}
        <div className="qb-download-banner qb-reveal qb-reveal-d2">
          <p className="qb-download-banner-text qb-sans">
            Save a clean, branded copy of your personal blueprint result as a PDF.
          </p>
          <button className="qb-btn-outline" onClick={handleDownload}>
            DOWNLOAD MY RESULT
          </button>
        </div>

        {/* 4 — PATHWAY SNAPSHOT CARDS */}
        <section className="qb-reveal qb-reveal-d3">
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

        {/* 5 — WHAT THIS PATHWAY ACTUALLY MEANS */}
        <section className="qb-reveal">
          <h3 className="qb-section-title qb-sans">WHAT THIS PATHWAY ACTUALLY MEANS</h3>
          <div className="qb-teach-card">
            <div className="qb-teach-def-block qb-sans">
              <strong>Definition: </strong>{content.definition}
            </div>

            <div className="qb-teach-block">
              <h4 className="qb-teach-subhead qb-sans">In real life, this looks like:</h4>
              <div className="qb-list">
                {content.inRealLife.map((item, i) => (
                  <div className="qb-list-item qb-sans" key={i}>
                    <span className="qb-check-clay">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="qb-teach-not-block">
              <h4 className="qb-teach-subhead qb-teach-subhead-red qb-sans">This is not:</h4>
              <div className="qb-list">
                {content.thisIsNot.map((item, i) => (
                  <div className="qb-list-item qb-sans" key={i}>
                    <span className="qb-check-muted">✦</span>
                    <span style={{ color: "#7A6E65" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="qb-teach-block">
              <h4 className="qb-teach-subhead qb-sans">This is best when:</h4>
              <div className="qb-list">
                {content.bestWhen.map((item, i) => (
                  <div className="qb-list-item qb-sans" key={i}>
                    <span className="qb-check-sage">✦</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6 — INTERACTIVE INSIGHT DRAWERS */}
        <section className="qb-reveal">
          <h3 className="qb-section-title qb-sans">EXPLORE YOUR PATHWAY DEEPER</h3>
          <div className="qb-drawer-group">

            <InsightDrawer
              title="Why you got this result"
              subtitle="Based on your quiz preferences"
              defaultOpen={true}
            >
              <div className="qb-list">
                {content.whyFits.map((item, i) => (
                  <div className="qb-list-item qb-sans" key={i}>
                    <span className="qb-check-clay">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </InsightDrawer>

            <InsightDrawer
              title="What a day could look like"
              subtitle="A sample daily routine for this pathway"
            >
              <div className="qb-list">
                {content.whatADayLooksLike.map((item, i) => (
                  <div className="qb-list-item qb-sans" key={i} style={{ borderBottom: "1px solid rgba(196,149,106,0.06)", paddingBottom: "8px" }}>
                    <span className="qb-check-sage">✦</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </InsightDrawer>

            <InsightDrawer
              title="What families value about this pathway"
              subtitle="Why local families seek this kind of care"
            >
              <div className="qb-list">
                {content.whatFamiliesValue.map((item, i) => (
                  <div className="qb-list-item qb-sans" key={i}>
                    <span className="qb-check-clay">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </InsightDrawer>

            <InsightDrawer
              title="Could this really work for me?"
              subtitle="Common concerns, honestly answered"
            >
              <p className="qb-sans" style={{ fontSize: "14px", color: "#5C5148", lineHeight: "1.75", marginBottom: "18px" }}>
                {content.couldThisWork}
              </p>
              <div className="qb-list" style={{ gap: "16px" }}>
                {content.commonFears.map((item, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span className="qb-sans" style={{ fontWeight: 600, fontSize: "13.5px", color: "#2C2C2C" }}>
                      — {item.title}
                    </span>
                    <span className="qb-sans" style={{ fontSize: "13px", color: "#7A6E65", paddingLeft: "12px", lineHeight: "1.65" }}>
                      {item.body}
                    </span>
                  </div>
                ))}
              </div>
            </InsightDrawer>

            <InsightDrawer
              title="Your first 3 setup steps"
              subtitle="Simple milestones to start building clarity"
            >
              <div className="qb-roadmap-list">
                {content.firstSteps.map((step, i) => (
                  <div className="qb-roadmap-step qb-sans" key={i}>
                    <span className="qb-roadmap-num">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </InsightDrawer>

          </div>
        </section>

        {/* 7 — WHAT YOU'LL NEED FIRST */}
        <section className="qb-reveal">
          <h3 className="qb-section-title qb-sans">WHAT YOU'LL NEED FIRST</h3>
          <div className="qb-checklist-grid">
            {[
              "Clear program model",
              "Schedule and capacity",
              "Pricing structure",
              "Parent policies",
              "Licensing pathway",
              "Insurance protection",
              "Simple marketing plan",
              "Enrollment process",
            ].map((item, i) => (
              <div className="qb-checklist-card" key={i}>
                <span className="qb-checklist-mark">✓</span>
                <span className="qb-checklist-label qb-sans">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 8 — WHAT THIS CAN BECOME */}
        <div className="qb-card qb-card-sage qb-reveal">
          <span className="qb-card-eyebrow qb-card-eyebrow-sage qb-sans">WHAT THIS CAN BECOME</span>
          <h3 className="qb-serif qb-card-heading">A foundation for meaningful growth</h3>
          <p className="qb-sans" style={{ fontSize: "14px", color: "#5C5148", marginBottom: "16px", lineHeight: "1.7" }}>
            With the right foundation, this pathway can grow into a calm, relationship-centered childcare business that supports your family and genuinely serves your community.
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

        {/* 9 — YOUR PHASE 1 FOCUS */}
        <div className="qb-card qb-card-sage-deep qb-reveal">
          <span className="qb-card-eyebrow qb-card-eyebrow-sage qb-sans">YOUR PHASE 1 FOCUS</span>
          <h3 className="qb-serif qb-card-heading">Start with clarity before you build anything else</h3>
          <div className="qb-roadmap-list">
            {content.phase1.map((step, i) => (
              <div className="qb-roadmap-step qb-sans" key={i}>
                <span className="qb-roadmap-num">{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <p className="qb-sans" style={{ fontSize: "12px", fontStyle: "italic", color: "#4D5E49", textAlign: "center", marginTop: "20px", paddingTop: "14px", borderTop: "1px dashed rgba(77,94,73,0.18)" }}>
            "Mama Launch helps you build the foundation first so your childcare business feels intentional, protected, and sustainable."
          </p>
        </div>

        {/* 10 — BEFORE YOU OPEN YOUR DOORS */}
        <div className="qb-card qb-card-trust qb-reveal">
          <span className="qb-card-eyebrow qb-sans">BEFORE YOU OPEN YOUR DOORS</span>
          <h3 className="qb-serif qb-card-heading">Your protected foundation</h3>
          <p className="qb-sans" style={{ fontSize: "14px", color: "#5C5148", lineHeight: "1.7" }}>
            Every childcare pathway needs a clear foundation before families enroll. Licensing requirements vary by location — before opening your doors, confirm your specific licensing pathway, home and business insurance needs, parent policies, emergency procedures, and local regulations.
          </p>
          <div className="qb-trust-grid">
            {["Licensing pathway", "Insurance coverage", "Parent policies", "Emergency procedures"].map((item) => (
              <div className="qb-trust-chip qb-sans" key={item}>
                <span style={{ color: "#C4956A", fontWeight: "bold" }}>✓</span> {item}
              </div>
            ))}
          </div>
          <p className="qb-sans" style={{ fontSize: "12px", color: "#7A6E65", marginTop: "14px", textAlign: "center" }}>
            Mama Launch helps you organize these pieces inside the <strong>Licensing + Business Protection Setup Path</strong>.
          </p>
        </div>

        {/* 11 — MAMA LAUNCH HELPS YOU BUILD */}
        <section className="qb-reveal">
          <h3 className="qb-section-title qb-sans">MAMA LAUNCH HELPS YOU BUILD THE FOUNDATION</h3>
          <div className="qb-helps-grid">
            <div className="qb-helps-card">
              <span className="qb-helps-num">01</span>
              <h4 className="qb-helps-title">Licensing + Insurance Organization</h4>
              <p className="qb-helps-desc">Understand what licensing and insurance steps apply in your location before you open.</p>
            </div>
            <div className="qb-helps-card">
              <span className="qb-helps-num">02</span>
              <h4 className="qb-helps-title">Policies + Parent Communication</h4>
              <p className="qb-helps-desc">Create clear parent expectations, enrollment agreements, and simple house rules.</p>
            </div>
            <div className="qb-helps-card">
              <span className="qb-helps-num">03</span>
              <h4 className="qb-helps-title">Pricing + Income Planning</h4>
              <p className="qb-helps-desc">Know what to charge and how to structure your tuition or fees for this pathway.</p>
            </div>
            <div className="qb-helps-card">
              <span className="qb-helps-num">04</span>
              <h4 className="qb-helps-title">Space + Daily Rhythm</h4>
              <p className="qb-helps-desc">Design a calm, organized setup and daily flow that works with real family life.</p>
            </div>
          </div>
        </section>

        {/* 12 — FINAL CTA */}
        <div className="qb-cta-box qb-reveal">
          {saved ? (
            <div className="qb-success">
              <div className="qb-success-icon">✓</div>
              <h2 className="qb-serif qb-success-title">Your result is saved!</h2>
              <p className="qb-sans qb-success-body">
                You are on the Mama Launch waitlist.
                {displayEmail && (
                  <><br />Check <strong>{displayEmail}</strong> for your saved pathway and what comes next.</>
                )}
              </p>
            </div>
          ) : (
            <>
              <h2 className="qb-serif qb-cta-title">Ready to build this with support?</h2>
              <p className="qb-sans qb-cta-desc">
                Inside Mama Launch, you'll get the roadmap, setup guidance, licensing and insurance organization, parent policies, pricing support, and simple systems to turn this pathway into a real, intentional business.
              </p>
              {displayEmail && (
                <p className="qb-sans qb-cta-email">
                  We'll send a copy of your result to <strong>{displayEmail}</strong>.
                </p>
              )}
              {error && <p className="qb-error">{error}</p>}
              <button className="qb-btn-primary" onClick={handleSaveResult} disabled={submitting}>
                {submitting ? "Saving…" : "SAVE RESULT + JOIN WAITLIST"}
              </button>
            </>
          )}
          <button className="qb-btn-outline" onClick={handleDownload}>
            DOWNLOAD MY RESULT
          </button>
        </div>

        {/* Print-only branded CTA — hidden on screen */}
        <div className="qb-print-cta">
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", marginBottom: "8px" }}>
            Mama Launch Studio
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#5C5148" }}>
            Ready to build your {primaryLabel} pathway with step-by-step support?<br />
            Visit <strong>mamaLaunchStudio.com</strong> to join the waitlist.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#A0958C", marginTop: "10px" }}>
            This result is for educational purposes only. Licensing requirements and income potential vary by location, experience, and individual circumstances. Mama Launch does not provide legal or licensing advice.
          </p>
        </div>

      </main>

      <ResultFooter />
    </div>
  );
}

function ResultFooter() {
  return (
    <footer className="qb-footer">
      <p className="qb-footer-logo">Mama Launch Studio</p>
      <p className="qb-footer-text qb-sans">
        Mama Launch Studio provides educational content and frameworks for mothers exploring home-based childcare programs. This is not legal, licensing, or financial advice. Licensing requirements, income potential, and regulations vary by state, county, and individual situation. Please consult your local childcare licensing agency and a qualified professional for guidance specific to your circumstances.
      </p>
    </footer>
  );
}