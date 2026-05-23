import { useState } from "react";

const BLUEPRINT_CAPTURE_URL =
  "https://api.base44.app/api/apps/6a0f3060b259082fa2acf652/functions/blueprintCapture";

const STRIPE_URL = "https://buy.stripe.com/8x28wH8tV1Ltb1MdaedEs02";

const PDF_URL =
  "https://base44.app/api/apps/6a0f3060b259082fa2acf652/files/mp/public/6a0f3060b259082fa2acf652/0a5c8dad5_calm_home_childcare_blueprint_v2.pdf";

const HERO_IMAGE =
  "https://media.base44.com/images/public/6a0f3060b259082fa2acf652/1c513cd21_generated_image.png";

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap');

  .bp-root *, .bp-root *::before, .bp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .bp-root {
    font-family: 'Inter', system-ui, sans-serif;
    background: #fffef9;
    color: #2d2d2a;
    line-height: 1.7;
    font-size: 16px;
  }

  /* NAV */
  .bp-nav {
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e4ddd4;
    background: #fffef9;
  }
  .bp-nav-logo {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 15px;
    letter-spacing: .08em;
    color: #6b6560;
    text-transform: uppercase;
  }

  /* HERO */
  .bp-hero {
    background: #faf7f2;
    padding: 80px 24px 64px;
    text-align: center;
  }
  .bp-eyebrow {
    font-size: 11px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: #7a9a7e;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .bp-hero h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(34px, 6vw, 56px);
    font-weight: 400;
    line-height: 1.15;
    max-width: 700px;
    margin: 0 auto 24px;
  }
  .bp-hero h1 em { font-style: italic; color: #7a9a7e; }
  .bp-hero-sub {
    font-size: 18px;
    color: #6b6560;
    max-width: 560px;
    margin: 0 auto 40px;
    font-weight: 300;
    line-height: 1.65;
  }
  .bp-btn-sage {
    display: inline-block;
    background: #7a9a7e;
    color: #fff;
    padding: 16px 40px;
    border-radius: 3px;
    font-size: 14px;
    letter-spacing: .08em;
    text-transform: uppercase;
    font-weight: 500;
    text-decoration: none;
    transition: background .2s;
    cursor: pointer;
  }
  .bp-btn-sage:hover { background: #6a8a6e; }
  .bp-hero-secondary {
    display: block;
    margin-top: 18px;
    font-size: 14px;
    color: #6b6560;
    line-height: 1.6;
  }
  .bp-hero-secondary a {
    color: #7a9a7e;
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 500;
  }
  .bp-hero-img {
    margin: 56px auto 0;
    max-width: 780px;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,.10);
  }
  .bp-hero-img img { width: 100%; display: block; }

  /* SECTIONS */
  .bp-section { padding: 80px 24px; }
  .bp-container { max-width: 720px; margin: 0 auto; }
  .bp-container-wide { max-width: 960px; margin: 0 auto; }
  .bp-section h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(26px, 4vw, 38px);
    font-weight: 400;
    line-height: 1.25;
    margin-bottom: 20px;
  }
  .bp-section h2 em { font-style: italic; }
  .bp-section p { margin-bottom: 16px; color: #6b6560; line-height: 1.75; }

  /* PROBLEM */
  .bp-problem { background: #2d2d2a; color: #f5f0e8; }
  .bp-problem .bp-eyebrow { color: #7a9a7e; }
  .bp-problem h2 { color: white; margin-bottom: 16px; }
  .bp-problem p { color: #c8c0b4; }
  .bp-problem-quote {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(20px, 3vw, 28px);
    font-style: italic;
    line-height: 1.55;
    color: white;
    border-left: 3px solid #7a9a7e;
    padding-left: 24px;
    margin: 32px 0;
  }

  /* INSIDE */
  .bp-inside { background: #f4f8f4; }
  .bp-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    margin-top: 40px;
  }
  .bp-card {
    background: white;
    padding: 28px 24px;
    border-radius: 4px;
    border: 1px solid #e4ddd4;
  }
  .bp-card-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 12px;
    color: #7a9a7e;
    font-style: italic;
    margin-bottom: 10px;
  }
  .bp-card h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 10px;
    color: #2d2d2a;
  }
  .bp-card p { font-size: 14px; line-height: 1.65; margin-bottom: 0; }

  /* PHASES */
  .bp-phases { background: white; }
  .bp-phase-list {
    margin-top: 32px;
    border: 1px solid #e4ddd4;
    border-radius: 4px;
    overflow: hidden;
  }
  .bp-phase-item {
    display: flex;
    gap: 20px;
    padding: 22px 24px;
    border-bottom: 1px solid #e4ddd4;
  }
  .bp-phase-item:last-child { border-bottom: none; }
  .bp-phase-item:nth-child(even) { background: #f4f8f4; }
  .bp-phase-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 13px;
    color: #7a9a7e;
    font-style: italic;
    min-width: 60px;
    padding-top: 2px;
  }
  .bp-phase-content h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 17px;
    font-weight: 400;
    color: #2d2d2a;
    margin-bottom: 6px;
  }
  .bp-phase-content p { font-size: 14px; color: #6b6560; line-height: 1.65; margin-bottom: 0; }

  /* FORM */
  .bp-form-section { background: #faf7f2; }
  .bp-form-wrap {
    background: white;
    border: 1px solid #e4ddd4;
    border-radius: 6px;
    padding: 48px 40px;
    max-width: 560px;
    margin: 0 auto;
    box-shadow: 0 4px 24px rgba(0,0,0,.05);
  }
  .bp-form-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 26px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 8px;
    color: #2d2d2a;
  }
  .bp-form-sub {
    text-align: center;
    font-size: 14px;
    color: #6b6560;
    margin-bottom: 32px;
    line-height: 1.6;
  }
  .bp-fg { margin-bottom: 18px; }
  .bp-fg label {
    display: block;
    font-size: 11px;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: #6b6560;
    margin-bottom: 7px;
    font-weight: 500;
  }
  .bp-fg input, .bp-fg select {
    width: 100%;
    padding: 13px 15px;
    border: 1px solid #e4ddd4;
    border-radius: 3px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 15px;
    color: #2d2d2a;
    background: white;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    transition: border-color .15s;
  }
  .bp-fg input:focus, .bp-fg select:focus { border-color: #7a9a7e; }
  .bp-btn-submit {
    width: 100%;
    background: #7a9a7e;
    color: white;
    border: none;
    padding: 16px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    letter-spacing: .08em;
    text-transform: uppercase;
    font-weight: 500;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 4px;
    transition: background .2s;
  }
  .bp-btn-submit:hover { background: #6a8a6e; }
  .bp-btn-submit:disabled { background: #b0c4b1; cursor: not-allowed; }
  .bp-form-microcopy {
    text-align: center;
    font-size: 12px;
    color: #6b6560;
    margin-top: 16px;
    line-height: 1.7;
  }
  .bp-form-err {
    color: #c0392b;
    font-size: 13px;
    margin-top: 10px;
    text-align: center;
  }

  /* SUCCESS STATE */
  .bp-success {
    text-align: center;
    padding: 32px 8px 8px;
  }
  .bp-success-icon { font-size: 32px; margin-bottom: 16px; }
  .bp-success-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 26px;
    font-weight: 400;
    margin-bottom: 14px;
    color: #2d2d2a;
  }
  .bp-success-body {
    font-size: 15px;
    color: #6b6560;
    line-height: 1.8;
    max-width: 440px;
    margin: 0 auto 10px;
  }
  .bp-success-body strong { color: #2d2d2a; }
  .bp-success-divider {
    border: none;
    border-top: 1px solid #e4ddd4;
    margin: 24px auto;
    max-width: 300px;
  }
  .bp-success-upsell-label {
    font-size: 11px;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: #7a9a7e;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .bp-success-upsell-head {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 20px;
    font-weight: 400;
    color: #2d2d2a;
    margin-bottom: 12px;
    line-height: 1.4;
  }
  .bp-success-upsell-copy {
    font-size: 14px;
    color: #6b6560;
    line-height: 1.75;
    max-width: 420px;
    margin: 0 auto 22px;
  }
  .bp-btn-dark {
    display: inline-block;
    background: #2d2d2a;
    color: white;
    padding: 15px 36px;
    border-radius: 3px;
    font-size: 13px;
    letter-spacing: .07em;
    text-transform: uppercase;
    font-weight: 500;
    text-decoration: none;
    transition: background .2s;
  }
  .bp-btn-dark:hover { background: #444; }
  .bp-price-note {
    font-size: 12px;
    color: #6b6560;
    margin-top: 10px;
  }
  .bp-price-note strong { color: #2d2d2a; }

  /* MEMBERSHIP SECTION */
  .bp-membership {
    background: #2d2d2a;
    color: white;
    text-align: center;
    padding: 80px 24px;
  }
  .bp-membership .bp-eyebrow { color: #7a9a7e; }
  .bp-membership h2 { color: white; }
  .bp-membership > div > p { color: #c8c0b4; max-width: 600px; margin: 0 auto 16px; }
  .bp-mfeatures {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 16px;
    margin: 36px 0;
    text-align: left;
  }
  .bp-mf {
    padding: 18px 20px;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 4px;
  }
  .bp-mf-title { font-size: 13px; font-weight: 500; color: #7a9a7e; margin-bottom: 5px; letter-spacing: .04em; }
  .bp-mf-body { font-size: 13px; color: #b0a898; line-height: 1.6; margin-bottom: 0; }
  .bp-big-price {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 48px;
    font-weight: 400;
    color: white;
    margin: 28px 0 4px;
    line-height: 1;
  }
  .bp-price-sub { font-size: 13px; color: #b0a898; margin-bottom: 6px; }
  .bp-price-crossed { font-size: 13px; color: #666; text-decoration: line-through; margin-bottom: 28px; }

  /* FOOTER */
  .bp-footer {
    background: #fffef9;
    border-top: 1px solid #e4ddd4;
    padding: 36px 24px;
    text-align: center;
  }
  .bp-footer-brand {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 14px;
    color: #6b6560;
    margin-bottom: 6px;
  }
  .bp-footer-note {
    font-size: 12px;
    color: #aaa;
    line-height: 1.65;
    max-width: 520px;
    margin: 0 auto 10px;
  }
  .bp-footer-link { font-size: 12px; color: #7a9a7e; text-decoration: none; }
  .bp-footer-link:hover { text-decoration: underline; }

  @media (max-width: 640px) {
    .bp-form-wrap { padding: 28px 20px; }
    .bp-hero { padding: 60px 20px 48px; }
    .bp-section { padding: 60px 20px; }
    .bp-membership { padding: 60px 20px; }
    .bp-phase-item { flex-direction: column; gap: 6px; }
    .bp-phase-num { min-width: auto; }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function BlueprintPage() {
  const [form, setForm] = useState({
    first_name: "",
    email: "",
    readiness_stage: "",
    program_interest: "home-daycare",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.first_name.trim() || !form.email.trim()) {
      setError("Please enter your first name and email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(BLUEPRINT_CAPTURE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name.trim(),
          email: form.email.trim(),
          readiness_stage: form.readiness_stage || "exploring",
          program_interest: form.program_interest,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Something went wrong.");

      setSubmitted(true);
    } catch (err) {
      setError([err.me](https://err.me)ssage || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="bp-root">

        {/* NAV */}
        <nav className="bp-nav">
          <span className="bp-nav-logo">Mama Launch Studio</span>
        </nav>

        {/* HERO */}
        <section className="bp-hero">
          <div className="bp-container">
            <p className="bp-eyebrow">Free Resource</p>
            <h1>The <em>Calm</em> Home<br />Childcare Blueprint</h1>
            <p className="bp-hero-sub">
              A more intentional approach to building an at-home nursery or home daycare around real family life.
            </p>
            <a href="#get-blueprint" className="bp-btn-sage">Download the Blueprint</a>
            <span className="bp-hero-secondary">
              Already ready for guided support?{" "}
              <a href={STRIPE_URL} target="_blank" rel="noreferrer">
                Join the Founding Membership &rarr;
              </a>
            </span>
          </div>
          <div className="bp-container">
            <div className="bp-hero-img">
              <img src={HERO_IMAGE} alt="Calm home childcare" loading="lazy" />
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="bp-section bp-problem">
          <div className="bp-container">
            <p className="bp-eyebrow">You are not alone</p>
            <h2>Building something meaningful during motherhood is not supposed to feel this hard.</h2>
            <div className="bp-problem-quote">
              &ldquo;I know I want this. I just don&rsquo;t know where to start &mdash; or how to make it work around my family.&rdquo;
            </div>
            <p>Most moms exploring home-based childcare are piecing it together from social media, licensing websites, and well-meaning advice from people who have never actually run one.</p>
            <p>There is no single clear path. No framework built around motherhood. No one saying: here is how to do this in a way that actually fits your life.</p>
            <p>The Blueprint is where that changes.</p>
          </div>
        </section>

        {/* INSIDE */}
        <section className="bp-section bp-inside">
          <div className="bp-container-wide">
            <div className="bp-container" style={{ padding: 0 }}>
              <p className="bp-eyebrow">What&rsquo;s inside</p>
              <h2>A clear starting point for building your <em>calm</em> home childcare.</h2>
              <p>The Calm Home Childcare Blueprint walks you through the five foundational areas of a sustainable at-home nursery or home daycare — before you spend a dollar or file a single form.</p>
            </div>
            <div className="bp-cards">
              {[
                { num: "01", title: "Your Environment", body: "What a calm, functional childcare space actually looks like — and how to create one inside a home that still feels like yours." },
                { num: "02", title: "Your Daily Rhythm", body: "A simple framework for structuring days that support children's development without burning you out." },
                { num: "03", title: "The Parent Experience", body: "How to communicate, set boundaries, and build trust with families from the very beginning." },
                { num: "04", title: "Your Operations", body: "The foundational systems every home childcare needs before opening day — simplified." },
                { num: "05", title: "Long-Term Sustainability", body: "How to build something you can actually maintain — as a business, a caregiver, and a mother." },
              ].map((c) => (
                <div className="bp-card" key={c.num}>
                  <p className="bp-card-num">{c.num}</p>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHASES */}
        <section className="bp-section bp-phases">
          <div className="bp-container">
            <p className="bp-eyebrow">The Mama Launch Method™</p>
            <h2>A five-phase framework built for <em>at-home</em> nursery and home daycare programs.</h2>
            <p>The Blueprint introduces The Mama Launch Method — the same framework inside Mama Launch Studio that guides members from idea to opening day.</p>
            <div className="bp-phase-list">
              {[
                { num: "Phase One", title: "Vision, Lifestyle & Program Alignment", body: "Get clear on the kind of program you want to build — and whether it genuinely fits your life, family, and home." },
                { num: "Phase Two", title: "Licensing, Home Setup & Safety", body: "Understand what licensing requires in your state and how to set up your space to meet those standards before you invest." },
                { num: "Phase Three", title: "Program Design, Policies & Operations", body: "Build the operational foundation — your daily structure, your policies, your forms, and your family onboarding process." },
                { num: "Phase Four", title: "Enrollment, Marketing & Family Trust", body: "Learn how to attract the right families, communicate your value, and fill your program without feeling salesy." },
                { num: "Phase Five", title: "Launch Readiness & Opening", body: "Prepare for your first day with confidence. Know exactly what to expect — and how to open calmly and sustainably." },
              ].map((p) => (
                <div className="bp-phase-item" key={p.num}>
                  <div className="bp-phase-num">{p.num}</div>
                  <div className="bp-phase-content">
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORM */}
        <section className="bp-section bp-form-section" id="get-blueprint">
          <div className="bp-form-wrap">
            {!submitted ? (
              <>
                <h2 className="bp-form-title">Get the Free Blueprint</h2>
                <p className="bp-form-sub">
                  Enter your name and email and we&rsquo;ll send it to you right away — along with a short 5-email series from Danielle to help you go deeper.
                </p>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="bp-fg">
                    <label htmlFor="bp-first-name">First Name</label>
                    <input
                      id="bp-first-name"
                      type="text"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      placeholder="Your first name"
                      autoComplete="given-name"
                      required
                    />
                  </div>
                  <div className="bp-fg">
                    <label htmlFor="bp-email">Email Address</label>
                    <input
                      id="bp-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@[email.com](https://email.com)"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="bp-fg">
                    <label htmlFor="bp-readiness">Where are you in your journey?</label>
                    <select
                      id="bp-readiness"
                      name="readiness_stage"
                      value={form.readiness_stage}
                      onChange={handleChange}
                    >
                      <option value="">Select one (optional)</option>
                      <option value="just-exploring">Just starting to explore</option>
                      <option value="researching">Actively researching</option>
                      <option value="planning">In the planning stage</option>
                      <option value="ready-to-start">Ready to start soon</option>
                    </select>
                  </div>
                  {/* Hidden: program_interest always = home-daycare */}
                  <button
                    type="submit"
                    className="bp-btn-submit"
                    disabled={submitting}
                  >
                    {submitting ? "Sending…" : "Send Me the Blueprint"}
                  </button>
                  {error && <p className="bp-form-err">{error}</p>}
                </form>
                <p className="bp-form-microcopy">
                  Free. No spam. You can unsubscribe at any time.
                </p>
              </>
            ) : (
              /* SUCCESS STATE */
              <div className="bp-success">
                <div className="bp-success-icon">🤍</div>
                <h2 className="bp-success-title">Your blueprint is on its way.</h2>
                <p className="bp-success-body">
                  Check your inbox — we&rsquo;ve sent it to the email you provided.
                </p>
                <p className="bp-success-body">
                  This is just the beginning.
                </p>
                <p className="bp-success-body">
                  Over the next few days, you&rsquo;ll receive a few notes from Danielle to help you go deeper and decide whether building a calm home daycare or at-home nursery is right for you.
                </p>
                <hr className="bp-success-divider" />
                <p className="bp-success-upsell-label">Already know you want guided support?</p>
                <h3 className="bp-success-upsell-head">
                  Join the Founding Membership and get access to The Mama Launch Method, templates, systems, and step-by-step support for building your home childcare program.
                </h3>
                <p className="bp-success-upsell-copy">
                  Founding Members lock in <strong>$23.50/month for life</strong>. Public pricing goes to $47/month when the founding window closes.
                </p>
                <a href={STRIPE_URL} target="_blank" rel="noreferrer" className="bp-btn-dark">
                  Join the Founding Membership
                </a>
                <p className="bp-price-note">
                  <strong>$23.50/mo for life.</strong> Cancel anytime.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* MEMBERSHIP */}
        <section className="bp-membership">
          <div className="bp-container">
            <p className="bp-eyebrow">Founding Membership</p>
            <h2>The guided next step after the blueprint.</h2>
            <p>Mama Launch Studio is a membership for moms who want to build an at-home nursery or home daycare with a real system behind it — not pieced together from blog posts and guesswork.</p>
            <p>Inside, you get The Mama Launch Method: a five-phase, step-by-step framework built for home-based programs.</p>
            <div className="bp-mfeatures">
              {[
                { title: "The Mama Launch Method™", body: "Five phases from vision to opening day — structured, sequenced, and built for home-based programs." },
                { title: "Templates & Systems", body: "Policies, enrollment forms, daily schedules, parent handbooks — ready to customize." },
                { title: "Step-by-Step Support", body: "Know exactly what to do and when. No guessing, no overwhelm." },
                { title: "Community", body: "Other moms building the same thing — at different stages, with real experience to share." },
              ].map((f) => (
                <div className="bp-mf" key={f.title}>
                  <p className="bp-mf-title">{f.title}</p>
                  <p className="bp-mf-body">{f.body}</p>
                </div>
              ))}
            </div>
            <div className="bp-big-price">$23.50</div>
            <p className="bp-price-sub">per month · locked for life as a Founding Member</p>
            <p className="bp-price-crossed">Public pricing: $47/month</p>
            <a href={STRIPE_URL} target="_blank" rel="noreferrer" className="bp-btn-sage">
              Join the Founding Membership
            </a>
            <p style={{ marginTop: 14, fontSize: 12, color: "#666" }}>
              Founding window closes July 8, 2026. Cancel anytime.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bp-footer">
          <p className="bp-footer-brand">Mama Launch Studio</p>
          <p className="bp-footer-note">
            Mama Launch Studio provides educational content and frameworks for moms exploring home-based childcare programs. This is not legal or licensing advice. Licensing requirements vary by state — please consult your local childcare licensing agency.
          </p>
          <a
            href="https://mamalaunchstudio.com"
            className="bp-footer-link"
            target="_blank"
            rel="noreferrer"
          >
            [mamalaunchstudio.com](https://mamalaunchstudio.com)
          </a>
        </footer>

      </div>
    </>
  );
}