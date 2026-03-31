/* ============================================================
   TOUCH GRASS — Mood Check Component
   Design: Comfortable Dark
   Quick 3-tap emoji mood selector for emotional check-ins
   ============================================================ */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile } from "lucide-react";
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

const MOODS = [
  { id: "stressed", emoji: "😰", label: "Stressed", color: C.rose,  description: "Feeling overwhelmed" },
  { id: "neutral",  emoji: "😐", label: "Neutral",  color: C.muted, description: "Just vibing" },
  { id: "good",     emoji: "😊", label: "Good",     color: C.sage,  description: "Feeling solid" },
];

interface MoodEntry {
  mood: string;
  timestamp: number;
}

export default function MoodCheck() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [todayMood, setTodayMood] = useState<MoodEntry | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Load mood from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("touch-grass-mood");
    if (stored) {
      const parsed = JSON.parse(stored);
      const today = new Date().toDateString();
      const storedDate = new Date(parsed.timestamp).toDateString();
      if (today === storedDate) {
        setTodayMood(parsed);
        setSelectedMood(parsed.mood);
      }
    }
  }, []);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    const entry: MoodEntry = {
      mood: moodId,
      timestamp: Date.now(),
    };
    setTodayMood(entry);
    localStorage.setItem("touch-grass-mood", JSON.stringify(entry));
    
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1200);

    const messages: Record<string, string> = {
      stressed: "hey, take a deep breath 🌬️ you got this",
      neutral:  "that's the vibe ✨ keep it steady",
      good:     "let's gooo 🔥 you're crushing it",
    };
    toast(messages[moodId], {
      style: { background: C.surf, border: `1px solid ${C.bdr}`, color: C.txt },
    });
  };

  const mood = MOODS.find((m) => m.id === selectedMood);

  return (
    <div className="rounded-2xl p-6" style={{ background: C.surf, border: `1px solid ${C.bdr}` }}>
      <div className="flex items-center gap-2 mb-4">
        <Smile size={15} style={{ color: C.amber }} />
        <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: C.txt }}>
          Daily Mood Check
        </h2>
      </div>
      <p className="text-xs mb-4" style={{ color: C.muted }}>
        How are you feeling right now? (helps us understand your vibe)
      </p>

      {/* Mood selector */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {MOODS.map((m) => {
          const isSelected = selectedMood === m.id;
          return (
            <motion.button
              key={m.id}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleMoodSelect(m.id)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all relative"
              style={{
                background: isSelected ? `${m.color}12` : C.surf2,
                border: `1.5px solid ${isSelected ? `${m.color}40` : C.bdr}`,
              }}
            >
              {/* Celebration ring */}
              <AnimatePresence>
                {showCelebration && isSelected && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-2xl border-2"
                    style={{ borderColor: m.color }}
                  />
                )}
              </AnimatePresence>

              <span className="text-3xl">{m.emoji}</span>
              <div className="text-center">
                <div className="text-xs font-bold" style={{ color: isSelected ? m.color : C.muted }}>
                  {m.label}
                </div>
                <div className="text-xs" style={{ color: "#3A4455" }}>
                  {m.description}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Mood insight */}
      <AnimatePresence>
        {mood && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl p-3 text-xs"
            style={{
              background: `${mood.color}08`,
              border: `1px solid ${mood.color}20`,
              color: mood.color,
            }}
          >
            <div className="font-bold mb-1">💡 Mood logged for today</div>
            <div style={{ color: C.muted }}>
              {mood.id === "stressed" && "Try taking a quick break or doing a challenge to reset your vibe."}
              {mood.id === "neutral" && "You're in a good headspace to focus. Keep the momentum going!"}
              {mood.id === "good" && "Amazing energy! This is the perfect time to crush those goals. 🚀"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak info */}
      <div className="mt-4 pt-4 border-t" style={{ borderColor: C.bdr }}>
        <div className="flex items-center justify-between">
          <div className="text-xs" style={{ color: C.muted }}>
            <span className="font-bold" style={{ color: C.txt }}>Mood Streak</span>
            <br />
            Check in daily for bonus vibes
          </div>
          <div className="text-2xl">🔥</div>
        </div>
      </div>
    </div>
  );
}
