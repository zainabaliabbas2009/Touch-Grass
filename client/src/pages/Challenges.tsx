/* ============================================================
   TOUCH GRASS — Challenges Page
   Design: Neon Arcade Retro-Future
   Micro challenges with completion tracking and XP system
   ============================================================ */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Star, Zap, Trophy, Flame, Droplets, Wind, Eye, Music, Pencil } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const CHALLENGE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663498189083/m8hLCZKFcCkyWd6pKKhzWU/challenge-card-bg-2kYLbmqVaARJGxzjR23fHL.webp";
const MASCOT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663498189083/m8hLCZKFcCkyWd6pKKhzWU/grass-mascot-cYjqRsA3svJG6JvHfx7TL2.webp";

const CHALLENGES = [
  {
    id: "water",
    icon: Droplets,
    emoji: "💧",
    title: "Hydrate or Diedrate",
    desc: "Drink a full glass of water RIGHT NOW. Your body is literally begging you.",
    xp: 50,
    duration: "30 sec",
    color: "#00F5FF",
    category: "body",
  },
  {
    id: "standup",
    icon: Zap,
    emoji: "🧍",
    title: "Stand Up Challenge",
    desc: "Stand up and stretch your arms above your head. Hold for 10 seconds. That's it.",
    xp: 75,
    duration: "1 min",
    color: "#A8FF3E",
    category: "body",
  },
  {
    id: "outside",
    icon: Wind,
    emoji: "🌿",
    title: "Touch Actual Grass",
    desc: "Go outside for 2 minutes. Just walk to the door and back. Fresh air exists.",
    xp: 150,
    duration: "2 min",
    color: "#A8FF3E",
    category: "outside",
  },
  {
    id: "eyes",
    icon: Eye,
    emoji: "👁️",
    title: "20-20-20 Rule",
    desc: "Look at something 20 feet away for 20 seconds. Your eyes are cooked fr.",
    xp: 60,
    duration: "20 sec",
    color: "#FFE600",
    category: "health",
  },
  {
    id: "breathe",
    icon: Wind,
    emoji: "🌬️",
    title: "Box Breathing",
    desc: "Breathe in 4 sec, hold 4 sec, out 4 sec, hold 4 sec. Do it 3 times.",
    xp: 80,
    duration: "1 min",
    color: "#00F5FF",
    category: "mental",
  },
  {
    id: "music",
    icon: Music,
    emoji: "🎵",
    title: "Vibe Check",
    desc: "Put on one song you actually like and just listen. No scrolling. Just vibes.",
    xp: 100,
    duration: "3 min",
    color: "#FF2D78",
    category: "mental",
  },
  {
    id: "journal",
    icon: Pencil,
    emoji: "📝",
    title: "Brain Dump",
    desc: "Write 3 things you're grateful for. Sounds cringe but it actually works.",
    xp: 120,
    duration: "2 min",
    color: "#FF2D78",
    category: "mental",
  },
  {
    id: "pushups",
    icon: Flame,
    emoji: "💪",
    title: "5 Push-ups",
    desc: "Just 5. On your knees is fine. No judgment. Get off the couch.",
    xp: 200,
    duration: "1 min",
    color: "#FF6B35",
    category: "body",
  },
];

const CATEGORIES = ["all", "body", "outside", "health", "mental"];

export default function Challenges() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [celebrating, setCelebrating] = useState<string | null>(null);
  const [totalXP, setTotalXP] = useState(0);

  const filtered = activeCategory === "all" ? CHALLENGES : CHALLENGES.filter((c) => c.category === activeCategory);

  const handleComplete = (challenge: typeof CHALLENGES[0]) => {
    if (completed.includes(challenge.id)) return;
    setCompleted((prev) => [...prev, challenge.id]);
    setTotalXP((prev) => prev + challenge.xp);
    setCelebrating(challenge.id);
    setTimeout(() => setCelebrating(null), 2000);
    toast(`+${challenge.xp} XP! ${challenge.emoji} "${challenge.title}" complete!`, {
      style: { background: "#12121A", border: "1px solid #A8FF3E40", color: "#fff" },
    });
  };

  const level = Math.floor(totalXP / 200) + 1;
  const levelProgress = ((totalXP % 200) / 200) * 100;

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
              Challenges
            </h1>
            <p className="text-sm mt-1" style={{ color: "#666" }}>Complete challenges, earn XP, become a legend.</p>
          </div>
          {/* XP display */}
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <Star size={14} style={{ color: "#FFE600" }} />
              <span className="font-display font-extrabold text-xl" style={{ fontFamily: "'Syne', sans-serif", color: "#FFE600" }}>
                {totalXP} XP
              </span>
            </div>
            <div className="text-xs" style={{ color: "#666" }}>Level {level}</div>
            <div className="w-24 h-1.5 rounded-full mt-1" style={{ background: "#1A1A26" }}>
              <div className="h-full rounded-full" style={{ width: `${levelProgress}%`, background: "#FFE600", boxShadow: "0 0 6px #FFE60080" }} />
            </div>
          </div>
        </div>

        {/* Streak banner */}
        <motion.div
          className="rounded-2xl p-4 mb-6 flex items-center gap-4 relative overflow-hidden"
          style={{ background: "#12121A", border: "1px solid #FF2D7830" }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="absolute inset-0 opacity-10">
            <img src={CHALLENGE_BG} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative flex items-center gap-3">
            <div className="text-4xl">🔥</div>
            <div>
              <div className="font-display font-extrabold text-lg" style={{ fontFamily: "'Syne', sans-serif", color: "#FF2D78" }}>
                3-Day Streak!
              </div>
              <div className="text-xs" style={{ color: "#666" }}>Keep it up or the mascot will judge you</div>
            </div>
          </div>
          <div className="relative ml-auto flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <div
                key={d}
                className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                style={{
                  background: d <= 3 ? "#FF2D7820" : "#1A1A26",
                  border: `1px solid ${d <= 3 ? "#FF2D7840" : "#333"}`,
                  color: d <= 3 ? "#FF2D78" : "#555",
                }}
              >
                {d <= 3 ? "✓" : "·"}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all"
              style={{
                background: activeCategory === cat ? "#A8FF3E" : "#12121A",
                color: activeCategory === cat ? "#0A0A0F" : "#666",
                border: `1px solid ${activeCategory === cat ? "#A8FF3E" : "#ffffff10"}`,
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Challenges grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((challenge, i) => {
              const isDone = completed.includes(challenge.id);
              const isCelebrating = celebrating === challenge.id;
              const Icon = challenge.icon;

              return (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    background: "#12121A",
                    border: `1px solid ${isDone ? `${challenge.color}40` : "#ffffff10"}`,
                    boxShadow: isDone ? `0 0 15px ${challenge.color}20` : "none",
                  }}
                >
                  {/* Celebration overlay */}
                  <AnimatePresence>
                    {isCelebrating && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl"
                        style={{ background: `${challenge.color}20`, backdropFilter: "blur(2px)" }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.3, 1] }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="text-center"
                        >
                          <div className="text-5xl mb-2">{challenge.emoji}</div>
                          <div className="font-display font-extrabold text-xl" style={{ fontFamily: "'Syne', sans-serif", color: challenge.color }}>
                            +{challenge.xp} XP!
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${challenge.color}15`, border: `1px solid ${challenge.color}30` }}>
                        <Icon size={18} style={{ color: challenge.color }} />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${challenge.color}15`, color: challenge.color }}>
                          +{challenge.xp} XP
                        </span>
                        <span className="text-xs" style={{ color: "#555" }}>{challenge.duration}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm mb-1.5" style={{ fontFamily: "'Syne', sans-serif", color: isDone ? "#666" : "#fff" }}>
                      {challenge.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "#555" }}>
                      {challenge.desc}
                    </p>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleComplete(challenge)}
                      disabled={isDone}
                      className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                      style={{
                        background: isDone ? "#1A1A26" : challenge.color,
                        color: isDone ? "#555" : "#0A0A0F",
                        fontFamily: "'Syne', sans-serif",
                        cursor: isDone ? "not-allowed" : "pointer",
                        boxShadow: isDone ? "none" : `0 0 10px ${challenge.color}40`,
                      }}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 size={14} /> Done!
                        </>
                      ) : (
                        "Do it now →"
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Completed summary */}
        {completed.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl p-6 text-center"
            style={{ background: "#12121A", border: "1px solid #A8FF3E30" }}
          >
            <img src={MASCOT_IMG} alt="" className="w-16 h-16 mx-auto mb-3 object-contain" />
            <div className="font-display font-extrabold text-2xl mb-1" style={{ fontFamily: "'Syne', sans-serif", color: "#A8FF3E" }}>
              {completed.length} challenge{completed.length !== 1 ? "s" : ""} done today!
            </div>
            <p style={{ color: "#666", fontSize: "0.875rem" }}>
              {completed.length >= 5 ? "ok you're actually built different 🔥" : completed.length >= 3 ? "lowkey killing it ngl 💪" : "good start. keep going bestie 🌿"}
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
