import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/client";
import { Link } from "react-router-dom";

// 7-item nav per benchmark brief — Shop/Work With Me/Contact in footer
const NAV = [
  { to: "/",             label: "Home"       },
  { to: "/start-here",   label: "Start Here" },
  { to: "/membership",   label: "Membership" },
  { to: "/resources",    label: "Resources"  },
  { to: "/community",    label: "Community"  },
  { to: "/about",        label: "About"      },
];

function FadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s` }}>
      {children}
    </div>
  );
}


// ── Founding Member Form ────────────────────────────────────────────────────
const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming"
];
const PATHWAYS = [
  "Home Daycare & Nursery",
  "Caregiver & Nanny",
  "Kids Classes & Open Play",
  "Homeschool Pod",
];

function FoundingMemberForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", state: "", pathway: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.state || !form.pathway) {
      setError("Please fill out all fields.");
      return;
    }
    setLoading(true);
    try {
      const result = await base44.functions.invoke("hubspotLeadCapture", form);
      if (result?.success) { setSuccess(true); }
      else { setError(result?.error || "Something went wrong. Please try again."); }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally { setLoading(false); }
  };

  const inputBg = "bg-[#f5f0ea]";
  const labelClass = "block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8a7a6e] mb-2";
  const inputClass = `w-full ${inputBg} border-0 rounded-xl px-5 py-5 text-[#3a2e28] text-sm placeholder-[#b5a99f] focus:outline-none focus:ring-2 focus:ring-[#c49a7a]/30 transition-all`;

  if (success) {
    return (
      <div className="bg-[#e8ddd2] rounded-3xl p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-[#3a5a3a] flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-[#2c2420] mb-3">You're in.</h3>
        <p className="text-[#7a6258] text-sm leading-relaxed max-w-sm mx-auto">
          Welcome to Mama Launch Studio. Watch your inbox — your next step is on its way.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#e8ddd2] rounded-3xl p-7 md:p-9">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>First Name</label>
            <input type="text" placeholder="First name" value={form.firstName} onChange={set("firstName")} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input type="text" placeholder="Last name" value={form.lastName} onChange={set("lastName")} className={inputClass} required />
          </div>
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Your State</label>
          <div className="relative">
            <select value={form.state} onChange={set("state")} className={`${inputClass} appearance-none cursor-pointer pr-10`} required>
              <option value="">Select your state</option>
              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#c49a7a] text-base leading-none">↓</span>
          </div>
        </div>
        <div>
          <label className={labelClass}>Which Program Path Interests You Most?</label>
          <div className="relative">
            <select value={form.pathway} onChange={set("pathway")} className={`${inputClass} appearance-none cursor-pointer pr-10`} required>
              <option value="">Select your path</option>
              {PATHWAYS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#c49a7a] text-base leading-none">↓</span>
          </div>
        </div>
        {error && <p className="text-red-600 text-xs text-center">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-[#3a5a3a] hover:bg-[#2e4a2e] text-white font-semibold text-xs tracking-[0.22em] uppercase py-6 rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2">
          {loading ? "Submitting..." : "Become a Founding Member"}
        </button>
        <p className="text-center text-[#a09088] text-xs pt-1">No spam, ever. Just your next step forward.</p>
      </form>
    </div>
  );
}
// ── End Founding Member Form ────────────────────────────────────────────────

export default function Home() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f3ee] font-sans">

      {/* NAV */}
      <nav className="bg-[#f7f3ee]/95 backdrop-blur-sm sticky top-0 z-50 border-b border-[#e5d8cc]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-serif font-bold text-xl text-[#2b221e] tracking-tight">Mama Launch Studio</Link>
          <div className="hidden md:flex items-center gap-7 text-sm text-[#5f5148]">
            {NAV.map(l => (
              <Link key={l.to} to={l.to} className="hover:text-[#2b221e] transition-colors tracking-wide">{l.label}</Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/member-dashboard" className="text-sm text-[#5f5148] hover:text-[#2b221e] transition-colors tracking-wide">Member Login</Link>
            <button onClick={() => document.getElementById('founding-form')?.scrollIntoView({behavior:'smooth'})} className="bg-[#2b221e] text-white px-5 py-2.5 rounded-full text-sm hover:bg-[#3d3028] transition-colors tracking-wide">Join</button>
          </div>
          <button className="md:hidden text-[#2b221e]" onClick={() => setMobileNav(v => !v)}>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        {mobileNav && (
          <div className="md:hidden bg-white border-t border-[#e5d8cc] px-6 py-4 space-y-3">
            {NAV.map(l => <Link key={l.to} to={l.to} className="block text-sm text-[#5f5148] hover:text-[#2b221e] py-1" onClick={() => setMobileNav(false)}>{l.label}</Link>)}
            <div className="pt-2 border-t border-[#efe6dc] flex gap-3">
              <Link to="/member-dashboard" className="flex-1 text-center border border-[#2b221e] text-[#2b221e] py-2.5 rounded-full text-sm font-medium" onClick={() => setMobileNav(false)}>Member Login</Link>
              <button onClick={() => { setMobileNav(false); setTimeout(() => document.getElementById('founding-form')?.scrollIntoView({behavior:'smooth'}), 100); }} className="flex-1 text-center bg-[#2b221e] text-white py-2.5 rounded-full text-sm font-medium">Join</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO — exact copy from benchmark brief */}
      <section className="relative overflow-hidden">
        <div className="relative h-[96vh] min-h-[640px]">
          <img src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1600&q=80&auto=format&fit=crop"
            alt="Mother and child at home" className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b221e]/85 via-[#2b221e]/45 to-transparent" />
          <div className="relative h-full flex items-end pb-20 md:items-center md:pb-0">
            <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
              <div className="max-w-xl" style={{ animation: "fadeUp 1.1s ease forwards" }}>
                {/* Eyebrow — exact from brief */}
                <p className="text-[#d6b29a] text-xs tracking-[0.28em] uppercase mb-6 font-medium">Motherhood-centered launch paths</p>
                {/* Headline — exact from brief */}
                <h1 className="text-5xl md:text-6xl lg:text-[68px] font-serif font-bold text-white leading-[1.05] mb-6">
                  Build a child-centered program around motherhood.
                </h1>
                {/* Subhead — exact from brief */}
                <p className="text-[#e8d5c8] text-lg leading-relaxed mb-10 font-light max-w-lg">
                  Choose your path — home daycare, caregiver, kids classes or open play, or homeschool pod — and follow one clear six-phase system with workbooks, templates, community, and ongoing support.
                </p>
                <div className="flex flex-wrap gap-4">
                  {/* CTAs — exact from brief */}
                  <button onClick={() => document.getElementById('founding-form')?.scrollIntoView({behavior:'smooth'})} className="bg-white text-[#2b221e] px-8 py-[14px] rounded-full text-sm font-semibold hover:bg-[#fdf6f0] transition-all tracking-wide">Reserve My Spot</button>
                  <button onClick={() => document.getElementById('founding-form')?.scrollIntoView({behavior:'smooth'})} className="border border-white/40 text-white px-8 py-[14px] rounded-full text-sm hover:bg-white/10 transition-all tracking-wide">Find My Path</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF STRIP — benchmark-recommended: show what's included at a glance */}
      <div className="bg-[#2b221e] text-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-6 text-center">
          {[
            "4 pathways",
            "6 phases",
            "20+ templates & workbooks",
            "Mama Launch AI — always on",
            "Live office hours monthly",
            "Community of providers",
          ].map((item, i) => (
            <span key={i} className="text-[#d6b29a] text-xs tracking-[0.15em] uppercase font-medium flex items-center gap-3">
              {i > 0 && <span className="text-white/20">·</span>}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* WHAT THIS IS — "what this is" block per brief */}
      <section className="py-24 md:py-32 bg-[#f7f3ee]">
        <FadeIn className="max-w-2xl mx-auto px-8 text-center">
          <p className="text-[#b98769] text-xs tracking-[0.22em] uppercase mb-8 font-medium">A different kind of platform</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2b221e] leading-[1.15] mb-8">
            Motherhood and meaningful work were never meant to be in conflict.
          </h2>
          <p className="text-[#5f5148] text-lg leading-[1.85] mb-10 max-w-xl mx-auto">
            We help women build professional, relationship-centered home-based children's programs — because it is one of the most natural, aligned ways a mother can create income, community, and purpose around the life she is already living.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/start-here" className="bg-[#2b221e] text-white px-10 py-[14px] rounded-full text-sm tracking-wide hover:bg-[#3d3028] transition-all">Find My Path</Link>
            <button onClick={() => document.getElementById('founding-form')?.scrollIntoView({behavior:'smooth'})} className="border border-[#2b221e] text-[#2b221e] px-10 py-[14px] rounded-full text-sm tracking-wide hover:bg-[#2b221e] hover:text-white transition-all">Reserve My Spot</button>
          </div>
        </FadeIn>
      </section>

      {/* PATHWAYS — exact copy from benchmark brief */}
      <section className="py-20 bg-white border-y border-[#e5d8cc]">
        <div className="max-w-5xl mx-auto px-8">
          <FadeIn className="text-center mb-12">
            <p className="text-[#b98769] text-xs tracking-[0.22em] uppercase mb-4 font-medium">Four pathways. One method.</p>
            <h2 className="font-serif font-bold text-4xl md:text-[42px] text-[#2b221e] leading-tight">Which program are you building?</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Home Daycare & Nursery", desc: "Create a calm, trusted home-based care program where your children grow alongside others and your work fits your family life.", color: "#b98769", img: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=600&q=80&auto=format&fit=crop" },
              { label: "Caregiver & Nanny", desc: "Build relationship-centered work that keeps your rhythm intact while you support another family with confidence and professionalism.", color: "#7aaa9b", img: "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?w=600&q=80&auto=format&fit=crop" },
              { label: "Kids Classes & Open Play", desc: "Turn your creativity into classes, sessions, or drop-in experiences that families return to every week.", color: "#c47a7a", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80&auto=format&fit=crop" },
              { label: "Homeschool Pods", desc: "Lead a small learning community with warmth, structure, and social connection in a more intimate environment.", color: "#9b8ea8", img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80&auto=format&fit=crop" },
            ].map((pw, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Link to="/start-here" className="group block rounded-2xl overflow-hidden border border-[#e5d8cc] hover:shadow-lg transition-all hover:border-[#b98769]/40">
                  <div className="h-44 overflow-hidden">
                    <img src={pw.img} alt={pw.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 bg-white">
                    <div className="w-6 h-0.5 rounded-full mb-3" style={{ backgroundColor: pw.color }} />
                    <p className="font-serif font-bold text-[#2b221e] text-sm mb-2">{pw.label}</p>
                    <p className="text-[#8a776b] text-xs leading-relaxed">{pw.desc}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center mt-10">
            <Link to="/start-here" className="inline-block border border-[#2b221e] text-[#2b221e] px-10 py-[14px] rounded-full text-sm tracking-wide hover:bg-[#2b221e] hover:text-white transition-all">Find My Path →</Link>
          </FadeIn>
        </div>
      </section>

      {/* SIX PHASES — brief requires same 6 phases visible on public pages */}
      <section id="founding-form" className="py-24 bg-[#f7f3ee]">
        <div className="max-w-5xl mx-auto px-8">
          <FadeIn className="text-center mb-14">
            <p className="text-[#b98769] text-xs tracking-[0.22em] uppercase mb-4 font-medium">The Launch Path Method™</p>
            <h2 className="font-serif font-bold text-4xl text-[#2b221e] leading-tight mb-4">One clear system. Six phases. Every pathway.</h2>
            <p className="text-[#5f5148] text-base leading-relaxed max-w-xl mx-auto">Every program — regardless of type — follows the same six-phase method, customized to your path. You always know exactly where you are and what comes next.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { n: "01", name: "Vision & Lifestyle Alignment", desc: "Clarity on your program model, lifestyle fit, and income goals before you build anything." },
              { n: "02", name: "Licensing, Legal & Setup", desc: "Navigate licensing, paperwork, and legal business structure — organized and manageable." },
              { n: "03", name: "Environment, Design & Child Development", desc: "Create a space that communicates trust and supports children emotionally and developmentally." },
              { n: "04", name: "Systems, Routines & Program Structure", desc: "Build the daily rhythms, curriculum, and operational systems that make your program sustainable." },
              { n: "05", name: "Branding, Marketing & Enrollment", desc: "Find your families through community connection, warm marketing, and ethical visibility." },
              { n: "06", name: "Launch, Community & Sustainable Growth", desc: "Open your doors with confidence and build a connected program that lasts." },
            ].map((phase, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white border border-[#e5d8cc] rounded-2xl p-6 hover:border-[#b98769]/40 transition-all">
                  <p className="font-serif font-bold text-4xl text-[#b98769] opacity-30 mb-4">{phase.n}</p>
                  <p className="font-serif font-bold text-[#2b221e] text-base mb-2">{phase.name}</p>
                  <p className="text-[#8a776b] text-xs leading-relaxed">{phase.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT — philosophy image */}
      <section className="bg-[#efe6dc] border-y border-[#e5d8cc]">
        <div className="grid md:grid-cols-2">
          <div className="h-72 md:h-auto overflow-hidden">
            <img src="https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?w=900&q=80&auto=format&fit=crop"
              alt="Child playing at home" className="w-full h-full object-cover" />
          </div>
          <FadeIn className="flex flex-col justify-center px-12 py-16 md:py-24">
            <p className="text-[#b98769] text-xs tracking-[0.22em] uppercase mb-6 font-medium">The philosophy</p>
            <blockquote className="font-serif text-3xl md:text-4xl font-bold text-[#2b221e] leading-[1.2] mb-6">
              "Strong systems create emotional capacity."
            </blockquote>
            <p className="text-[#5f5148] text-base leading-relaxed mb-8">
              Structure exists so providers can focus on what actually matters — relationships, nurturing, community, and emotional safety. Not operational chaos.
            </p>
            <Link to="/about" className="text-[#b98769] text-sm tracking-wide hover:text-[#2b221e] transition-colors font-medium">Read Danielle's story →</Link>
          </FadeIn>
        </div>
      </section>

      {/* "EVERYTHING INCLUDED" bundle — per benchmark brief */}
      <section className="py-24 bg-[#2b221e] text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <FadeIn>
            <p className="text-[#b98769] text-xs tracking-[0.25em] uppercase mb-6 font-medium">One membership. Everything included.</p>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white leading-tight mb-8">
              Not scattered resources.<br />One complete system.
            </h2>
            <p className="text-[#c4b4ac] text-lg leading-relaxed max-w-xl mx-auto mb-12">
              The Launch Path Membership bundles everything a home-based program founder needs — in one place, from day one.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {[
              { label: "6-Phase Guided Workbooks", sub: "Build your program in real time" },
              { label: "20+ Templates", sub: "Contracts, handbooks, schedules & more" },
              { label: "Mama Launch AI", sub: "Phase-aware guidance, always available" },
              { label: "Monthly Template Drops", sub: "Fresh tools every month" },
              { label: "Live Office Hours", sub: "Monthly Q&A with Danielle" },
              { label: "Provider Community", sub: "Your cohort, at your exact phase" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="bg-white/8 border border-white/10 rounded-2xl p-5 text-left hover:border-[#b98769]/40 transition-all">
                  <p className="font-serif font-bold text-white text-sm mb-1">{item.label}</p>
                  <p className="text-[#8a776b] text-xs leading-relaxed" style={{ color: "#c4b4ac" }}>{item.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => document.getElementById('founding-form')?.scrollIntoView({behavior:'smooth'})} className="bg-[#b98769] text-white px-10 py-[14px] rounded-full text-sm tracking-wide hover:bg-[#a07558] transition-colors font-medium">Reserve My Spot</button>
              <button onClick={() => document.getElementById('founding-form')?.scrollIntoView({behavior:'smooth'})} className="border border-white/30 text-white px-10 py-[14px] rounded-full text-sm tracking-wide hover:bg-white/10 transition-colors">Get Early Access</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* RETENTION — "why stay" section per brief */}
      <section className="py-24 bg-[#f7f3ee]">
        <div className="max-w-5xl mx-auto px-8">
          <FadeIn className="text-center mb-14">
            <p className="text-[#b98769] text-xs tracking-[0.22em] uppercase mb-4 font-medium">Long after launch</p>
            {/* Exact copy from brief */}
            <h2 className="font-serif font-bold text-4xl text-[#2b221e] leading-tight mb-4">Stay for the systems that help you run and grow it.</h2>
            <p className="text-[#5f5148] text-lg leading-relaxed max-w-xl mx-auto">
              After launch, your membership becomes your operating system: monthly template drops, seasonal planning, parent communication support, office hours, AI help, accountability, and practical tools for enrollment, operations, and sustainable growth.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Monthly template drops", desc: "New contracts, schedules, and communication tools every month." },
              { label: "Seasonal curriculum packs", desc: "Quarterly activity and planning bundles for all four pathways." },
              { label: "Office hours with Danielle", desc: "Live monthly Q&A — bring your real questions." },
              { label: "Ask Mama Launch AI", desc: "Phase-aware guidance available every time you sit down to work." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white border border-[#e5d8cc] rounded-2xl p-6 hover:border-[#b98769]/40 transition-all">
                  <div className="w-1 h-8 rounded-full bg-[#b98769] mb-4" />
                  <p className="font-serif font-bold text-[#2b221e] text-sm mb-2">{item.label}</p>
                  <p className="text-[#8a776b] text-xs leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* VILLAGE — full bleed */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[480px] flex items-center">
          <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1600&q=80&auto=format&fit=crop"
            alt="Children playing together" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-[#2b221e]/80" />
          <FadeIn className="relative max-w-3xl mx-auto px-8 py-24 text-center w-full">
            <p className="text-[#b98769] text-xs tracking-[0.22em] uppercase mb-6 font-medium">The village philosophy</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-8">This is a village supporting a village.</h2>
            <p className="text-[#c4b4ac] text-lg leading-[1.8] max-w-xl mx-auto mb-10">
              The programs you build become gathering places. Children grow alongside the same peers. Families find each other. You become a trusted, known presence in your neighborhood.
            </p>
            <Link to="/start-here" className="inline-block bg-[#b98769] text-white px-10 py-[14px] rounded-full text-sm tracking-wide hover:bg-[#a07558] transition-colors">Find My Path</Link>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-6 bg-[#efe6dc] border-y border-[#e5d8cc]">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#e5d8cc]">
            {[
              { quote: "I stopped waiting for the perfect moment and started building. The structure gave me permission to begin.", name: "Sarah M.", role: "Home Daycare Owner" },
              { quote: "What I needed wasn't more research — it was a community that understood what I was trying to create.", name: "Jessica R.", role: "Homeschool Pod Founder" },
              { quote: "The workbooks are the thing. I built my entire philosophy statement and launch plan in one sitting.", name: "Amanda K.", role: "Kids Program Founder" },
            ].map((t, i) => (
              <div key={i} className="px-8 py-10">
                <p className="font-serif italic text-[#2b221e] text-base leading-relaxed mb-5">"{t.quote}"</p>
                <p className="text-[#2b221e] text-sm font-semibold">{t.name}</p>
                <p className="text-[#8a776b] text-xs mt-0.5">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDING MEMBER FORM */}
      <section className="py-24 bg-[#f7f3ee]">
        <div className="max-w-2xl mx-auto px-8">
          <FadeIn className="text-center mb-10">
            <p className="text-[#b98769] text-xs tracking-[0.22em] uppercase mb-4 font-medium">Founding Member Access</p>
            <h2 className="font-serif font-bold text-4xl text-[#2b221e] mb-4">Reserve your spot.</h2>
            <p className="text-[#5f5148] text-base leading-relaxed max-w-md mx-auto">
              Tell us which path you're building — and we'll send you exactly what you need to begin.
            </p>
          </FadeIn>
          <FoundingMemberForm />
        </div>
      </section>

      {/* FOOTER{/* FOOTER — Shop, Work With Me, Contact live here per brief */}
      <footer className="bg-[#2b221e] text-[#c4b4ac] py-16">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <p className="font-serif font-bold text-white text-lg mb-3">Mama Launch Studio</p>
              <p className="text-xs leading-relaxed text-[#8a776b]">Building meaningful home-based children's programs around motherhood — and community.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8a776b] font-medium mb-4">Platform</p>
              <div className="space-y-2">
                {[
                  { to: "/start-here", label: "Start Here" },
                  { to: "/membership", label: "Membership" },
                  { to: "/member-dashboard", label: "Member Login" },
                  { to: "/community", label: "Community" },
                ].map(l => <Link key={l.to} to={l.to} className="block text-sm hover:text-white transition-colors">{l.label}</Link>)}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8a776b] font-medium mb-4">Resources</p>
              <div className="space-y-2">
                {[
                  { to: "/resources", label: "Free Resources" },
                  { to: "/shop", label: "Template Shop" },
                  { to: "/about", label: "About Danielle" },
                ].map(l => <Link key={l.to} to={l.to} className="block text-sm hover:text-white transition-colors">{l.label}</Link>)}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#8a776b] font-medium mb-4">Support</p>
              <div className="space-y-2">
                {[
                  { to: "/work-with-me", label: "Work With Me" },
                  { to: "/contact", label: "Contact" },
                ].map(l => <Link key={l.to} to={l.to} className="block text-sm hover:text-white transition-colors">{l.label}</Link>)}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a776b]">
            <p>© 2026 Mama Launch Studio. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/membership#tiers" className="hover:text-white transition-colors">Join</Link>
              <Link to="/member-dashboard" className="hover:text-white transition-colors">Member Login</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky Join bar — per benchmark brief */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e5d8cc] px-4 py-3 flex gap-3">
        <Link to="/member-dashboard" className="flex-1 text-center border border-[#2b221e] text-[#2b221e] py-3 rounded-full text-sm font-medium">Member Login</Link>
        <button onClick={() => document.getElementById('founding-form')?.scrollIntoView({behavior:'smooth'})} className="flex-1 text-center bg-[#2b221e] text-white py-3 rounded-full text-sm font-semibold">Join</button>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}
