/* ============================================================
   TOUCH GRASS — Home / Landing Page (v2)
   Design: Comfortable Dark — muted sage, dusty rose, soft slate
   No harsh neon. Soft glows. Easy on the eyes.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, BarChart3, Shield, Smartphone, Clock, ArrowRight, Star } from "lucide-react";
import Layout from "@/components/Layout";

// Color tokens
const C = {
  bg:    "#0F1117",
  surf:  "#171B24",
  surf2: "#1E2330",
  bdr:   "#2A3040",
  txt:   "#E2E8F0",
  muted: "#7A8499",
  sage:  "#6EBF8B",
  rose:  "#E8748A",
  sky:   "#6BAED6",
  amber: "#D4A96A",
};

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663498189083/m8hLCZKFcCkyWd6pKKhzWU/hero-phone-glow-LJcb4BaitgVgiYQMdGSbJm.webp";
const MASCOT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663498189083/m8hLCZKFcCkyWd6pKKhzWU/grass-mascot-cYjqRsA3svJG6JvHfx7TL2.webp";

const INTERRUPT_MESSAGES = [
  "bro you've been scrolling for 47 minutes 💀",
  "your fyp is not that deep, go outside",
  "skill issue: touching grass (0/1)",
  "your future self is cringing rn ngl",
  "the algorithm is NOT your friend bestie",
  "certified doomscroll moment detected 🚨",
];

const FEATURES = [
  { icon: Clock,      title: "Doomscroll Detector",  desc: "Catches you scrolling TikTok for 47 minutes straight. We see you.",                     color: C.sage  },
  { icon: Zap,        title: "Interrupt System",      desc: "Hits you with a reality check. Funny, not preachy. You'll actually read it.",            color: C.rose  },
  { icon: Shield,     title: "Soft App Lock",         desc: "Locks your apps for 5–15 mins. Not forever. Just enough to breathe.",                   color: C.sky   },
  { icon: Trophy,     title: "Micro Challenges",      desc: "Drink water. Stand up. Go outside for 2 mins. Tiny wins, big difference.",               color: C.amber },
  { icon: BarChart3,  title: "Daily Stats",           desc: "See how much time you actually saved. The numbers are kinda scary tbh.",                 color: C.sage  },
  { icon: Smartphone, title: "Track Any App",         desc: "TikTok, Instagram, YouTube, Twitter. If you scroll it, we track it.",                   color: C.rose  },
];

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
}

export default function Home() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [showInterrupt, setShowInterrupt] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((i) => (i + 1) % INTERRUPT_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
        {/* Background image — heavily dimmed */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" style={{ opacity: 0.18 }} />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, rgba(15,17,23,0.5) 0%, rgba(15,17,23,0.75) 55%, ${C.bg} 100%)` }}
          />
        </div>

        {/* Very faint grid */}
        <div className="absolute inset-0 soft-grid" />

        <div className="relative container flex flex-col items-start justify-center pt-16 pb-24 min-h-[90vh]">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6"
              style={{ background: `rgba(232,116,138,0.12)`, border: `1px solid rgba(232,116,138,0.25)`, color: C.rose }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current soft-pulse" />
              MVP DROP — FREE FOREVER
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none mb-4"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}
            >
              <span style={{ color: C.txt }}>stop</span>
              <br />
              <span style={{ color: C.sage }}>doomscrolling.</span>
              <br />
              <span style={{ color: C.txt }}>touch </span>
              <span style={{ color: C.rose }}>grass.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-8"
              style={{ color: C.muted, maxWidth: "480px", lineHeight: 1.65 }}
            >
              The app that catches you scrolling and actually makes you stop. No guilt trips. Just vibes, challenges, and a sassy grass mascot.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base"
                  style={{
                    background: C.sage,
                    color: "#0F1117",
                    fontFamily: "'Syne', sans-serif",
                    boxShadow: `0 4px 20px rgba(110,191,139,0.25)`,
                  }}
                >
                  Get Started <ArrowRight size={17} />
                </motion.button>
              </Link>
              <button
                onClick={() => setShowInterrupt(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all"
                style={{
                  background: "transparent",
                  color: C.txt,
                  border: `1px solid ${C.bdr}`,
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                See it in action
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { value: 47,    suffix: "min", label: "avg saved/day" },
                { value: 12300, suffix: "+",   label: "scrolls stopped" },
                { value: 94,    suffix: "%",   label: "said it helped" },
              ].map(({ value, suffix, label }) => (
                <div key={label}>
                  <div
                    className="font-display text-3xl font-extrabold"
                    style={{ fontFamily: "'Syne', sans-serif", color: C.sage }}
                  >
                    <AnimatedCounter target={value} />
                    {suffix}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: C.muted }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mascot — desaturated slightly */}
          <motion.div
            className="absolute right-8 bottom-16 hidden lg:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={MASCOT_IMG}
              alt="Grass mascot"
              className="w-36 h-36 object-contain"
              style={{ filter: "saturate(0.75) brightness(0.85) drop-shadow(0 4px 16px rgba(110,191,139,0.2))" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div
        className="overflow-hidden py-3 border-y"
        style={{ borderColor: C.bdr, background: `rgba(110,191,139,0.04)` }}
      >
        <div className="flex gap-0 whitespace-nowrap" style={{ animation: "ticker 24s linear infinite" }}>
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="flex gap-12 text-xs font-bold pr-12"
              style={{ color: `rgba(110,191,139,0.45)`, fontFamily: "'Syne', sans-serif", letterSpacing: "0.1em" }}
            >
              {["TOUCH GRASS", "STOP SCROLLING", "SKILL ISSUE DETECTED", "GO OUTSIDE", "DRINK WATER", "TOUCH GRASS", "STOP SCROLLING", "SKILL ISSUE DETECTED", "GO OUTSIDE", "DRINK WATER"].map((t, j) => (
                <span key={j}>{t} ✦</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Interrupt preview ── */}
      <section className="container py-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
              style={{ background: `rgba(232,116,138,0.1)`, border: `1px solid rgba(232,116,138,0.22)`, color: C.rose }}
            >
              <Zap size={11} /> INTERRUPT SYSTEM
            </div>
            <h2
              className="font-display text-4xl font-extrabold mb-4"
              style={{ fontFamily: "'Syne', sans-serif", color: C.txt, letterSpacing: "-0.02em" }}
            >
              We interrupt your scroll<br />
              <span style={{ color: C.rose }}>with facts.</span>
            </h2>
            <p style={{ color: C.muted, lineHeight: 1.7, maxWidth: "420px" }}>
              After you hit your limit, we pop up with a message that's actually funny. Not a boring notification. A real vibe check.
            </p>
          </div>

          {/* Phone mockup */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-68" style={{ width: "272px" }}>
              <div
                className="rounded-3xl overflow-hidden p-1"
                style={{
                  background: C.surf,
                  border: `1px solid ${C.bdr}`,
                  boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(110,191,139,0.08)`,
                }}
              >
                <div className="rounded-2xl overflow-hidden" style={{ background: C.bg, minHeight: "460px" }}>
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-4 py-2 text-xs" style={{ color: "#3A4455" }}>
                    <span>9:41</span>
                    <span>●●●</span>
                  </div>

                  {/* Fake feed */}
                  <div className="px-3 space-y-2" style={{ opacity: 0.3 }}>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-xl p-3" style={{ background: C.surf }}>
                        <div className="flex gap-2 items-center mb-2">
                          <div className="w-7 h-7 rounded-full" style={{ background: C.surf2 }} />
                          <div className="w-20 h-2 rounded" style={{ background: C.surf2 }} />
                        </div>
                        <div className="w-full h-20 rounded-lg" style={{ background: C.surf2 }} />
                      </div>
                    ))}
                  </div>

                  {/* Interrupt overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center px-4"
                    style={{ background: "rgba(15,17,23,0.82)", backdropFilter: "blur(4px)" }}
                  >
                    <div
                      className="w-full rounded-2xl p-5 text-center"
                      style={{
                        background: C.surf,
                        border: `1px solid rgba(232,116,138,0.25)`,
                        boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
                      }}
                    >
                      <img src={MASCOT_IMG} alt="" className="w-14 h-14 mx-auto mb-3 object-contain" style={{ filter: "saturate(0.7)" }} />
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={msgIdx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.3 }}
                          className="font-bold text-sm mb-4"
                          style={{ color: C.txt, fontFamily: "'Syne', sans-serif" }}
                        >
                          {INTERRUPT_MESSAGES[msgIdx]}
                        </motion.p>
                      </AnimatePresence>
                      <div className="flex gap-2">
                        <button
                          className="flex-1 py-2 rounded-xl text-xs font-bold"
                          style={{ background: C.sage, color: "#0F1117" }}
                        >
                          Take a Break ✓
                        </button>
                        <button
                          className="flex-1 py-2 rounded-xl text-xs font-bold"
                          style={{ background: C.surf2, color: C.muted, border: `1px solid ${C.bdr}` }}
                        >
                          5 more mins...
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle ambient glow */}
              <div
                className="absolute -inset-6 rounded-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle, rgba(232,116,138,0.08), transparent)`, filter: "blur(20px)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="container pb-20">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{ background: `rgba(110,191,139,0.1)`, border: `1px solid rgba(110,191,139,0.2)`, color: C.sage }}
          >
            <Star size={11} /> FEATURES
          </div>
          <h2
            className="font-display text-4xl font-extrabold"
            style={{ fontFamily: "'Syne', sans-serif", color: C.txt, letterSpacing: "-0.02em" }}
          >
            everything you need to<br />
            <span style={{ color: C.sage }}>actually touch grass</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl p-5"
              style={{
                background: C.surf,
                border: `1px solid ${C.bdr}`,
                transition: "box-shadow 0.2s",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${color}14`, border: `1px solid ${color}28` }}
              >
                <Icon size={19} style={{ color }} />
              </div>
              <h3 className="font-bold text-base mb-1.5" style={{ fontFamily: "'Syne', sans-serif", color: C.txt }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container pb-24">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.98 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{ background: C.surf, border: `1px solid ${C.bdr}` }}
        >
          <div className="absolute inset-0 soft-grid" />
          <div className="relative">
            <img
              src={MASCOT_IMG}
              alt=""
              className="w-20 h-20 mx-auto mb-4 object-contain float-anim"
              style={{ filter: "saturate(0.75) brightness(0.85)" }}
            />
            <h2
              className="font-display text-4xl font-extrabold mb-3"
              style={{ fontFamily: "'Syne', sans-serif", color: C.txt, letterSpacing: "-0.02em" }}
            >
              ready to actually<br />
              <span style={{ color: C.sage }}>touch grass?</span>
            </h2>
            <p className="text-base mb-8" style={{ color: C.muted }}>
              Set your limits, pick your apps, and let us do the rest. It's free. It's funny. It works.
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg"
                style={{
                  background: C.sage,
                  color: "#0F1117",
                  fontFamily: "'Syne', sans-serif",
                  boxShadow: `0 4px 24px rgba(110,191,139,0.22)`,
                }}
              >
                Start Tracking <ArrowRight size={19} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Interrupt demo modal ── */}
      <AnimatePresence>
        {showInterrupt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowInterrupt(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="w-full max-w-sm rounded-3xl p-6 relative"
              style={{
                background: C.surf,
                border: `1px solid rgba(232,116,138,0.22)`,
                boxShadow: `0 24px 60px rgba(0,0,0,0.5)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative text-center">
                <motion.img
                  src={MASCOT_IMG}
                  alt=""
                  className="w-20 h-20 mx-auto mb-4 object-contain"
                  style={{ filter: "saturate(0.75)" }}
                  animate={{ rotate: [-4, 4, -4] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                />
                <div
                  className="text-xs font-bold mb-2 px-3 py-1 rounded-full inline-block"
                  style={{ background: `rgba(232,116,138,0.12)`, color: C.rose }}
                >
                  🚨 DOOMSCROLL DETECTED
                </div>
                <p
                  className="font-display text-xl font-extrabold my-4"
                  style={{ fontFamily: "'Syne', sans-serif", color: C.txt }}
                >
                  You've been scrolling for<br />
                  <span style={{ color: C.rose, fontSize: "2.25rem" }}>47 minutes</span>
                </p>
                <p className="text-sm mb-6" style={{ color: C.muted }}>
                  bro that's like 3 episodes of a show. go touch some grass ngl 💀
                </p>
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 rounded-2xl font-bold text-sm"
                    style={{
                      background: C.sage,
                      color: "#0F1117",
                      fontFamily: "'Syne', sans-serif",
                      boxShadow: `0 4px 16px rgba(110,191,139,0.2)`,
                    }}
                    onClick={() => setShowInterrupt(false)}
                  >
                    ok fine 🌿 take a break
                  </motion.button>
                </div>
                <button
                  className="mt-3 text-xs w-full py-2"
                  style={{ color: "#3A4455" }}
                  onClick={() => setShowInterrupt(false)}
                >
                  5 more mins... (last time i swear)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
