/* ============================================================
   TOUCH GRASS — Home / Landing Page
   Design: Neon Arcade Retro-Future
   Hero section with big stat, CTA, feature highlights
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, BarChart3, Shield, Smartphone, Clock, ArrowRight, Star } from "lucide-react";
import Layout from "@/components/Layout";

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
  {
    icon: Clock,
    title: "Doomscroll Detector",
    desc: "Catches you scrolling TikTok for 47 minutes straight. We see you.",
    color: "#A8FF3E",
  },
  {
    icon: Zap,
    title: "Interrupt System",
    desc: "Hits you with a reality check. Funny, not preachy. You'll actually read it.",
    color: "#FF2D78",
  },
  {
    icon: Shield,
    title: "Soft App Lock",
    desc: "Locks your apps for 5-15 mins. Not forever. Just enough to breathe.",
    color: "#00F5FF",
  },
  {
    icon: Trophy,
    title: "Micro Challenges",
    desc: "Drink water. Stand up. Go outside for 2 mins. Tiny wins, big difference.",
    color: "#FFE600",
  },
  {
    icon: BarChart3,
    title: "Daily Stats",
    desc: "See how much time you actually saved. The numbers are kinda scary tbh.",
    color: "#A8FF3E",
  },
  {
    icon: Smartphone,
    title: "Track Any App",
    desc: "TikTok, Instagram, YouTube, Twitter. If you scroll it, we track it.",
    color: "#FF2D78",
  },
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
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0.4) 0%, rgba(10,10,15,0.7) 50%, #0A0A0F 100%)" }} />
        </div>

        {/* Neon grid overlay */}
        <div className="absolute inset-0 neon-grid opacity-30" />

        <div className="relative container flex flex-col items-start justify-center pt-16 pb-24 min-h-[90vh]">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6"
              style={{ background: "#FF2D7820", border: "1px solid #FF2D7850", color: "#FF2D78" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              MVP DROP — FREE FOREVER
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none mb-4"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}
            >
              <span style={{ color: "#fff" }}>stop</span>
              <br />
              <span style={{ color: "#A8FF3E", textShadow: "0 0 30px #A8FF3E60" }}>doomscrolling.</span>
              <br />
              <span style={{ color: "#fff" }}>touch </span>
              <span style={{ color: "#FF2D78", textShadow: "0 0 30px #FF2D7860" }}>grass.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-8"
              style={{ color: "#888", maxWidth: "480px", lineHeight: 1.6 }}
            >
              The app that catches you scrolling and actually makes you stop. No guilt trips. Just vibes, challenges, and a sassy grass mascot.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all"
                  style={{
                    background: "#A8FF3E",
                    color: "#0A0A0F",
                    fontFamily: "'Syne', sans-serif",
                    boxShadow: "0 0 20px #A8FF3E60, 0 4px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  Get Started <ArrowRight size={18} />
                </motion.button>
              </Link>
              <button
                onClick={() => setShowInterrupt(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all"
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid #ffffff30",
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
                { value: 47, suffix: "min", label: "avg saved/day" },
                { value: 12300, suffix: "+", label: "scrolls stopped" },
                { value: 94, suffix: "%", label: "said it helped" },
              ].map(({ value, suffix, label }) => (
                <div key={label}>
                  <div className="font-display text-3xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif", color: "#A8FF3E" }}>
                    <AnimatedCounter target={value} />
                    {suffix}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#666" }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mascot floating */}
          <motion.div
            className="absolute right-8 bottom-16 hidden lg:block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={MASCOT_IMG} alt="Grass mascot" className="w-40 h-40 object-contain" style={{ filter: "drop-shadow(0 0 20px #A8FF3E60)" }} />
          </motion.div>
        </div>
      </section>

      {/* Scrolling ticker */}
      <div className="overflow-hidden py-3 border-y" style={{ borderColor: "#A8FF3E20", background: "#A8FF3E08" }}>
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "ticker 20s linear infinite" }}>
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex gap-12 text-xs font-bold" style={{ color: "#A8FF3E80", fontFamily: "'Syne', sans-serif", letterSpacing: "0.1em" }}>
              {["TOUCH GRASS", "STOP SCROLLING", "SKILL ISSUE DETECTED", "GO OUTSIDE", "DRINK WATER", "TOUCH GRASS"].map((t, j) => (
                <span key={j}>{t} ✦</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Live interrupt preview */}
      <section className="container py-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "#FF2D7815", border: "1px solid #FF2D7840", color: "#FF2D78" }}>
              <Zap size={12} /> INTERRUPT SYSTEM
            </div>
            <h2 className="font-display text-4xl font-extrabold mb-4" style={{ fontFamily: "'Syne', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
              We interrupt your scroll<br />
              <span style={{ color: "#FF2D78" }}>with facts.</span>
            </h2>
            <p style={{ color: "#666", lineHeight: 1.7, maxWidth: "420px" }}>
              After you hit your limit, we pop up with a message that's actually funny. Not a boring notification. A real vibe check.
            </p>
          </div>

          {/* Phone mockup with live messages */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72">
              {/* Phone frame */}
              <div className="rounded-3xl overflow-hidden border-2 p-1" style={{ borderColor: "#A8FF3E40", background: "#12121A", boxShadow: "0 0 40px #A8FF3E20" }}>
                <div className="rounded-2xl overflow-hidden" style={{ background: "#0A0A0F", minHeight: "480px" }}>
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-4 py-2 text-xs" style={{ color: "#555" }}>
                    <span>9:41</span>
                    <span>●●●</span>
                  </div>

                  {/* Fake social feed */}
                  <div className="px-3 space-y-2 opacity-40">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-xl p-3" style={{ background: "#1A1A26" }}>
                        <div className="flex gap-2 items-center mb-2">
                          <div className="w-7 h-7 rounded-full" style={{ background: "#2A2A3A" }} />
                          <div className="w-20 h-2 rounded" style={{ background: "#2A2A3A" }} />
                        </div>
                        <div className="w-full h-24 rounded-lg" style={{ background: "#1E1E2E" }} />
                      </div>
                    ))}
                  </div>

                  {/* Interrupt overlay */}
                  <div className="absolute inset-0 flex items-center justify-center px-4" style={{ background: "rgba(10,10,15,0.85)", backdropFilter: "blur(4px)" }}>
                    <div className="w-full rounded-2xl p-5 text-center" style={{ background: "#12121A", border: "1px solid #FF2D7840", boxShadow: "0 0 30px #FF2D7820" }}>
                      <img src={MASCOT_IMG} alt="" className="w-16 h-16 mx-auto mb-3 object-contain" />
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={msgIdx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="font-bold text-sm mb-4"
                          style={{ color: "#fff", fontFamily: "'Syne', sans-serif" }}
                        >
                          {INTERRUPT_MESSAGES[msgIdx]}
                        </motion.p>
                      </AnimatePresence>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: "#A8FF3E", color: "#0A0A0F" }}>
                          Take a Break ✓
                        </button>
                        <button className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: "#1A1A26", color: "#666", border: "1px solid #333" }}>
                          5 more mins...
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl pointer-events-none" style={{ background: "radial-gradient(circle, #FF2D78, transparent)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="container pb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "#A8FF3E15", border: "1px solid #A8FF3E40", color: "#A8FF3E" }}>
            <Star size={12} /> FEATURES
          </div>
          <h2 className="font-display text-4xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
            everything you need to<br />
            <span style={{ color: "#A8FF3E" }}>actually touch grass</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="rounded-2xl p-5 cursor-default"
              style={{
                background: "#12121A",
                border: `1px solid ${color}25`,
                boxShadow: `0 0 20px ${color}10`,
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon size={20} style={{ color }} />
              </div>
              <h3 className="font-bold text-base mb-1.5" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="container pb-24">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.97 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{ background: "#12121A", border: "1px solid #A8FF3E30" }}
        >
          <div className="absolute inset-0 neon-grid opacity-20" />
          <div className="relative">
            <img src={MASCOT_IMG} alt="" className="w-20 h-20 mx-auto mb-4 object-contain float-anim" />
            <h2 className="font-display text-4xl font-extrabold mb-3" style={{ fontFamily: "'Syne', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
              ready to actually<br />
              <span style={{ color: "#A8FF3E" }}>touch grass?</span>
            </h2>
            <p className="text-base mb-8" style={{ color: "#666" }}>
              Set your limits, pick your apps, and let us do the rest. It's free. It's funny. It works.
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg"
                style={{
                  background: "#A8FF3E",
                  color: "#0A0A0F",
                  fontFamily: "'Syne', sans-serif",
                  boxShadow: "0 0 30px #A8FF3E50",
                }}
              >
                Start Tracking <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Interrupt demo modal */}
      <AnimatePresence>
        {showInterrupt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowInterrupt(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-sm rounded-3xl p-6 relative"
              style={{ background: "#12121A", border: "1px solid #FF2D7840", boxShadow: "0 0 60px #FF2D7830" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663498189083/m8hLCZKFcCkyWd6pKKhzWU/interrupt-modal-bg-QNnJJiotzpo8S74x5gcswq.webp"
                  alt=""
                  className="w-full h-full object-cover opacity-10"
                />
              </div>
              <div className="relative text-center">
                <motion.img
                  src={MASCOT_IMG}
                  alt=""
                  className="w-24 h-24 mx-auto mb-4 object-contain"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                />
                <div className="text-xs font-bold mb-2 px-3 py-1 rounded-full inline-block" style={{ background: "#FF2D7820", color: "#FF2D78" }}>
                  🚨 DOOMSCROLL DETECTED
                </div>
                <p className="font-display text-xl font-extrabold my-4" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                  You've been scrolling for<br />
                  <span style={{ color: "#FF2D78", fontSize: "2.5rem" }}>47 minutes</span>
                </p>
                <p className="text-sm mb-6" style={{ color: "#888" }}>
                  bro that's like 3 episodes of a show. go touch some grass ngl 💀
                </p>
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 rounded-2xl font-bold text-sm"
                    style={{ background: "#A8FF3E", color: "#0A0A0F", fontFamily: "'Syne', sans-serif", boxShadow: "0 0 15px #A8FF3E40" }}
                    onClick={() => setShowInterrupt(false)}
                  >
                    ok fine 🌿 take a break
                  </motion.button>
                </div>
                <button
                  className="mt-3 text-xs w-full py-2"
                  style={{ color: "#444" }}
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
