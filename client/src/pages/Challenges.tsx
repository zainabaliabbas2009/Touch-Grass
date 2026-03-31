/* ============================================================
   TOUCH GRASS — Challenges Page (v2)
   Design: Comfortable Dark — muted sage, dusty rose, soft slate
   No harsh neon. Soft glows. Easy on the eyes.
   ============================================================ */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Star, Zap, Trophy, Flame, Droplets, Wind, Eye, Music, Pencil } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

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

const MASCOT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663498189083/m8hLCZKFcCkyWd6pKKhzWU/grass-mascot-cYjqRsA3svJG6JvHfx7TL2.webp";

const CHALLENGES = [
  { id: "water",   icon: Droplets, emoji: "💧", title: "Hydrate or Diedrate",  desc: "Drink a full glass of water RIGHT NOW. Your body is literally begging you.",          xp: 50,  duration: "30 sec", color: C.sky,   category: "body"    },
  { id: "standup", icon: Zap,      emoji: "🧍", title: "Stand Up Challenge",   desc: "Stand up and stretch your arms above your head. Hold for 10 seconds. That's it.",    xp: 75,  duration: "1 min",  color: C.sage,  category: "body"    },
  { id: "outside", icon: Wind,     emoji: "🌿", title: "Touch Actual Grass",   desc: "Go outside for 2 minutes. Just walk to the door and back. Fresh air exists.",         xp: 150, duration: "2 min",  color: C.sage,  category: "outside" },
  { id: "eyes",    icon: Eye,      emoji: "👁️", title: "20-20-20 Rule",        desc: "Look at something 20 feet away for 20 seconds. Your eyes are cooked fr.",             xp: 60,  duration: "20 sec", color: C.amber, category: "health"  },
  { id: "breathe", icon: Wind,     emoji: "🌬️", title: "Box Breathing",        desc: "Breathe in 4 sec, hold 4 sec, out 4 sec, hold 4 sec. Do it 3 times.",                xp: 80,  duration: "1 min",  color: C.sky,   category: "mental"  },
  { id: "music",   icon: Music,    emoji: "🎵", title: "Vibe Check",           desc: "Put on one song you actually like and just listen. No scrolling. Just vibes.",        xp: 100, duration: "3 min",  color: C.rose,  category: "mental"  },
  { id: "journal", icon: Pencil,   emoji: "📝", title: "Brain Dump",           desc: "Write 3 things you're grateful for. Sounds cringe but it actually works.",            xp: 120, duration: "2 min",  color: C.rose,  category: "mental"  },
  { id: "pushups", icon: Flame,    emoji: "💪", title: "5 Push-ups",           desc: "Just 5. On your knees is fine. No judgment. Get off the couch.",                      xp: 200, duration: "1 min",  color: C.amber, category: "body"    },
];

const CATEGORIES = ["all", "body", "outside", "health", "mental"];

export default function Challenges() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [celebrating, setCelebrating] = useState<string | null>(null);
  const [totalXP, setTotalXP] = useState(0);

  const filtered = activeCategory === "all"
    ? CHALLENGES
    : CHALLENGES.filter((c) => c.category === activeCategory);

  const handleComplete = (challenge: typeof CHALLENGES[0]) => {
    if (completed.includes(challenge.id)) return;
    setCompleted((prev) => [...prev, challenge.id]);
    setTotalXP((prev) => prev + challenge.xp);
    setCelebrating(challenge.id);
    setTimeout(() => setCelebrating(null), 1800);
    toast(`+${challenge.xp} XP! ${challenge.emoji} "${challenge.title}" complete!`, {
      style: { background: C.surf, border: `1px solid ${C.bdr}`, color: C.txt },
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
            <h1
              className="font-display text-3xl font-extrabold"
              style={{ fontFamily: "'Syne', sans-serif", color: C.txt, letterSpacing: "-0.02em" }}
            >
              Challenges
            </h1>
            <p className="text-sm mt-1" style={{ color: C.muted }}>
              Complete challenges, earn XP, become a legend.
            </p>
          </div>
          {/* XP display */}
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <Star size={13} style={{ color: C.amber }} />
              <span
                className="font-display font-extrabold text-xl"
                style={{ fontFamily: "'Syne', sans-serif", color: C.amber }}
              >
                {totalXP} XP
              </span>
            </div>
            <div className="text-xs" style={{ color: C.muted }}>Level {level}</div>
            <div className="w-24 h-1.5 rounded-full mt-1" style={{ background: C.surf2 }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%`, background: C.amber, boxShadow: `0 0 5px rgba(212,169,106,0.3)` }}
              />
            </div>
          </div>
        </div>

        {/* Streak banner */}
        <div
          className="rounded-2xl p-4 mb-6 flex items-center gap-4"
          style={{ background: C.surf, border: `1px solid rgba(232,116,138,0.2)` }}
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔥</div>
            <div>
              <div
                className="font-display font-extrabold text-lg"
                style={{ fontFamily: "'Syne', sans-serif", color: C.rose }}
              >
                3-Day Streak!
              </div>
              <div className="text-xs" style={{ color: C.muted }}>Keep it up or the mascot will judge you</div>
            </div>
          </div>
          <div className="ml-auto flex gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <div
                key={d}
                className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: d <= 3 ? `rgba(232,116,138,0.15)` : C.surf2,
                  border: `1px solid ${d <= 3 ? "rgba(232,116,138,0.3)" : C.bdr}`,
                  color: d <= 3 ? C.rose : "#3A4455",
                }}
              >
                {d <= 3 ? "✓" : "·"}
              </div>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all"
              style={{
                background: activeCategory === cat ? C.sage : C.surf,
                color: activeCategory === cat ? "#0F1117" : C.muted,
                border: `1px solid ${activeCategory === cat ? C.sage : C.bdr}`,
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
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    background: C.surf,
                    border: `1px solid ${isDone ? `${challenge.color}30` : C.bdr}`,
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
                        style={{ background: `${challenge.color}18`, backdropFilter: "blur(2px)" }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ type: "spring", stiffness: 280 }}
                          className="text-center"
                        >
                          <div className="text-5xl mb-2">{challenge.emoji}</div>
                          <div
                            className="font-display font-extrabold text-xl"
                            style={{ fontFamily: "'Syne', sans-serif", color: challenge.color }}
                          >
                            +{challenge.xp} XP!
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${challenge.color}12`, border: `1px solid ${challenge.color}25` }}
                      >
                        <Icon size={17} style={{ color: challenge.color }} />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${challenge.color}12`, color: challenge.color }}
                        >
                          +{challenge.xp} XP
                        </span>
                        <span className="text-xs" style={{ color: "#3A4455" }}>{challenge.duration}</span>
                      </div>
                    </div>

                    <h3
                      className="font-bold text-sm mb-1.5"
                      style={{ fontFamily: "'Syne', sans-serif", color: isDone ? C.muted : C.txt }}
                    >
                      {challenge.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "#4A5568" }}>
                      {challenge.desc}
                    </p>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleComplete(challenge)}
                      disabled={isDone}
                      className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                      style={{
                        background: isDone ? C.surf2 : challenge.color,
                        color: isDone ? "#3A4455" : "#0F1117",
                        fontFamily: "'Syne', sans-serif",
                        cursor: isDone ? "not-allowed" : "pointer",
                        boxShadow: isDone ? "none" : `0 4px 12px ${challenge.color}28`,
                      }}
                    >
                      {isDone ? (
                        <><CheckCircle2 size={13} /> Done!</>
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl p-6 text-center"
            style={{ background: C.surf, border: `1px solid rgba(110,191,139,0.2)` }}
          >
            <img
              src={MASCOT_IMG}
              alt=""
              className="w-14 h-14 mx-auto mb-3 object-contain"
              style={{ filter: "saturate(0.7)" }}
            />
            <div
              className="font-display font-extrabold text-2xl mb-1"
              style={{ fontFamily: "'Syne', sans-serif", color: C.sage }}
            >
              {completed.length} challenge{completed.length !== 1 ? "s" : ""} done today!
            </div>
            <p style={{ color: C.muted, fontSize: "0.875rem" }}>
              {completed.length >= 5
                ? "ok you're actually built different 🔥"
                : completed.length >= 3
                ? "lowkey killing it ngl 💪"
                : "good start. keep going bestie 🌿"}
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
