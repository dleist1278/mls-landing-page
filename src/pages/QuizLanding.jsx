/**
 * QuizLanding — Public landing page at /quiz/start.
 * Entry point to the Childcare Fit Quiz. No auth required.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export default function QuizLanding() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#3D2C1E] font-body flex flex-col">

      {/* Nav */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-[#EDE6DE]/60 px-5 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#2D4A3E] uppercase">Mama Launch Studio</span>
        <Link to="/login" className="text-xs text-[#7A6558] hover:text-[#2D4A3E] transition font-medium">Sign In</Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        <div className="w-full max-w-lg space-y-8 text-center">

          {/* Eyebrow */}
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-[#EBF2EE] border border-[#C8DDD4]/60 px-4 py-2 rounded-full mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C4895A]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#2D4A3E] uppercase">Free · No Account Needed</span>
          </motion.div>

          {/* Headline */}
          <motion.div {...fadeUp(0.1)} className="space-y-4">
            <h1
              className="font-display text-[#1E3329] font-light mx-auto"
              style={{
                fontSize: 'clamp(28px, 7vw, 48px)',
                lineHeight: 1.1,
              }}
            >
              Find the childcare model that fits{' '}
              <em className="italic text-[#C4895A]">your real life.</em>
            </h1>
            <p className="text-sm sm:text-base text-[#7A6558] font-light leading-relaxed max-w-md mx-auto">
              Answer 20 questions about your season, space, schedule, and goals. We'll show you your best-fit childcare business model — free.
            </p>
          </motion.div>

          {/* CTA Card */}
          <motion.div {...fadeUp(0.22)} className="bg-white rounded-3xl border border-[#E8DDD0]/80 shadow-[0_4px_24px_rgba(61,44,30,0.09)] p-7 sm:p-10 space-y-6 text-left">

            {/* What you'll get */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-[#C4895A] uppercase tracking-wider block">What you'll discover</span>
              {[
                'Your best-fit home childcare model',
                'Why it matches your season and schedule',
                'Income potential and startup overview',
                'Your first recommended next steps',
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-sm text-[#3D2C1E]">
                  <div className="w-4 h-4 rounded-full bg-[#2D4A3E] flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                  <span className="font-light leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Time estimate */}
            <div className="flex items-center gap-2 text-[11px] text-[#9A8878]">
              <Clock className="w-3.5 h-3.5 text-[#C4895A]" />
              <span>Takes about 5–7 minutes · Your answers stay private</span>
            </div>

            <Link
              to="/quiz"
              className="flex items-center justify-center gap-2 w-full bg-[#2D4A3E] hover:bg-[#1E3329] text-white px-8 py-4 rounded-2xl text-sm font-bold tracking-[0.15em] uppercase transition-all shadow-md"
            >
              Start the Free Quiz <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#9A8878]">
              <Lock className="w-3 h-3" />
              <span>No account required · Results shown instantly</span>
            </div>
          </motion.div>

          {/* Footer tagline */}
          <motion.p {...fadeUp(0.34)} className="text-[10px] text-[#B8A899] tracking-[0.2em] uppercase font-semibold">
            Mama Launch Studio™ · Home-Based Childcare,{' '}
            <em className="italic font-normal">Done with Intention.</em>
          </motion.p>
        </div>
      </main>
    </div>
  );
}