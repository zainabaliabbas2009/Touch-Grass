/* ============================================================
   TOUCH GRASS — Dashboard / Control Center (v2)
   Design: Comfortable Dark — muted sage, dusty rose, soft slate
   No harsh neon. Soft glows. Easy on the eyes.
   ============================================================ */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Play, Pause, Settings, ChevronRight, CheckCircle2, AlertTriangle } from "lucide-react";
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

const APPS = [
  { id: "tiktok",    name: "TikTok",     emoji: "🎵", color: C.rose,  risk: "high"   },
  { id: "instagram", name: "Instagram",  emoji: "📸", color: C.rose,  risk: "high"   },
  { id: "youtube",   name: "YouTube",    emoji: "▶️", color: C.amber, risk: "medium" },
  { id: "twitter",   name: "X / Twitter",emoji: "𝕏",  color: C.sky,   risk: "medium" },
  { id: "snapchat",  name: "Snapchat",   emoji: "👻", color: C.amber, risk: "medium" },
  { id: "reddit",    name: "Reddit",     emoji: "🤖", color: C.sage,  risk: "low"    },
];

const LOCK_DURATIONS = [5, 10, 15, 30];

export default function Dashboard() {
  const [trackedApps, setTrackedApps] = useState<string[]>(["tiktok", "instagram"]);
  const [timeLimit, setTimeLimit] = useState(30);
  const [lockDuration, setLockDuration] = useState(10);
  const [isTracking, setIsTracking] = useState(true);
  const [showLockModal, setShowLockModal] = useState(false);
  const [currentScrollTime] = useState(23);

  const toggleApp = (id: string) => {
    setTrackedApps((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleToggleTracking = () => {
    setIsTracking((v) => !v);
    toast(isTracking ? "Tracking paused. You're on your own now 😬" : "Tracking resumed. We got you 💪", {
      style: { background: C.surf, border: `1px solid ${C.bdr}`, color: C.txt },
    });
  };

  const handleLockNow = () => {
    setShowLockModal(true);
    setTimeout(() => setShowLockModal(false), 2800);
    toast(`Apps locked for ${lockDuration} minutes. Go touch some grass 🌿`, {
      style: { background: C.surf, border: `1px solid ${C.bdr}`, color: C.txt },
    });
  };

  const scrollPercent = Math.min((currentScrollTime / timeLimit) * 100, 100);
  const isWarning = scrollPercent >= 70;
  const isDanger  = scrollPercent >= 90;

  const barColor = isDanger ? C.rose : isWarning ? C.amber : C.sage;

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="font-display text-3xl font-extrabold"
              style={{ fontFamily: "'Syne', sans-serif", color: C.txt, letterSpacing: "-0.02em" }}
            >
              Control Center
            </h1>
            <p className="text-sm mt-1" style={{ color: C.muted }}>Set your limits. Own your time.</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleTracking}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm"
            style={{
              background: isTracking ? `rgba(110,191,139,0.1)` : `rgba(232,116,138,0.1)`,
              border: `1px solid ${isTracking ? "rgba(110,191,139,0.25)" : "rgba(232,116,138,0.25)"}`,
              color: isTracking ? C.sage : C.rose,
            }}
          >
            {isTracking ? <Play size={13} /> : <Pause size={13} />}
            {isTracking ? "Tracking" : "Paused"}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live status card */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: C.surf,
                border: `1px solid ${isDanger ? "rgba(232,116,138,0.3)" : isWarning ? "rgba(212,169,106,0.3)" : C.bdr}`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-bold mb-1" style={{ color: C.muted, letterSpacing: "0.08em" }}>
                    CURRENT SESSION
                  </div>
                  <div
                    className="font-display text-5xl font-extrabold"
                    style={{ fontFamily: "'Syne', sans-serif", color: barColor }}
                  >
                    {currentScrollTime}
                    <span className="text-xl ml-1" style={{ color: C.muted }}>min</span>
                  </div>
                  <div className="text-sm mt-1" style={{ color: C.muted }}>of {timeLimit} min limit</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {isDanger && (
                    <div
                      className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold soft-pulse"
                      style={{ background: `rgba(232,116,138,0.12)`, color: C.rose }}
                    >
                      <AlertTriangle size={10} /> LIMIT ALMOST HIT
                    </div>
                  )}
                  <img
                    src={MASCOT_IMG}
                    alt=""
                    className="w-14 h-14 object-contain"
                    style={{ filter: "saturate(0.7) brightness(0.85)" }}
                  />
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2.5 rounded-full overflow-hidden progress-track">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${scrollPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    background: isDanger
                      ? `linear-gradient(90deg, ${C.rose}, #c0566b)`
                      : isWarning
                      ? `linear-gradient(90deg, ${C.amber}, ${C.rose})`
                      : `linear-gradient(90deg, ${C.sage}, ${C.sky})`,
                    boxShadow: `0 0 8px ${barColor}40`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-xs" style={{ color: "#3A4455" }}>
                <span>0 min</span>
                <span>{timeLimit} min limit</span>
              </div>

              <div className="flex gap-3 mt-5">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLockNow}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm"
                  style={{
                    background: C.sage,
                    color: "#0F1117",
                    fontFamily: "'Syne', sans-serif",
                    boxShadow: `0 4px 14px rgba(110,191,139,0.2)`,
                  }}
                >
                  <Lock size={13} /> Lock Apps Now
                </motion.button>
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm"
                  style={{ background: C.surf2, color: C.muted, border: `1px solid ${C.bdr}` }}
                  onClick={() => {
                    toast("Session reset! Fresh start 🔄", { style: { background: C.surf, border: `1px solid ${C.bdr}`, color: C.txt } });
                  }}
                >
                  Reset Session
                </button>
              </div>
            </div>

            {/* App selection */}
            <div className="rounded-2xl p-6" style={{ background: C.surf, border: `1px solid ${C.bdr}` }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: C.txt }}>
                  Apps to Track
                </h2>
                <span className="text-xs" style={{ color: C.muted }}>{trackedApps.length} selected</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {APPS.map((app) => {
                  const selected = trackedApps.includes(app.id);
                  return (
                    <motion.button
                      key={app.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => toggleApp(app.id)}
                      className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                      style={{
                        background: selected ? `${app.color}0F` : C.surf2,
                        border: `1px solid ${selected ? `${app.color}30` : C.bdr}`,
                      }}
                    >
                      <span className="text-xl">{app.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate" style={{ color: selected ? C.txt : C.muted }}>
                          {app.name}
                        </div>
                        <div className="text-xs" style={{ color: selected ? app.color : "#3A4455" }}>
                          {app.risk} risk
                        </div>
                      </div>
                      {selected && <CheckCircle2 size={13} style={{ color: app.color, flexShrink: 0 }} />}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Time limit */}
            <div className="rounded-2xl p-6" style={{ background: C.surf, border: `1px solid ${C.bdr}` }}>
              <div className="flex items-center gap-2 mb-4">
                <Settings size={15} style={{ color: C.sage }} />
                <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: C.txt }}>
                  Daily Limit
                </h2>
              </div>
              <div className="text-center mb-4">
                <div
                  className="font-display text-4xl font-extrabold"
                  style={{ fontFamily: "'Syne', sans-serif", color: C.sage }}
                >
                  {timeLimit}
                  <span className="text-lg ml-1" style={{ color: C.muted }}>min</span>
                </div>
                <div className="text-xs mt-1" style={{ color: C.muted }}>per tracked app</div>
              </div>
              <input
                type="range"
                min={5}
                max={120}
                step={5}
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: C.sage }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#3A4455" }}>
                <span>5 min</span>
                <span>2 hrs</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[15, 30, 45, 60].map((v) => (
                  <button
                    key={v}
                    onClick={() => setTimeLimit(v)}
                    className="px-3 py-1 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: timeLimit === v ? C.sage : C.surf2,
                      color: timeLimit === v ? "#0F1117" : C.muted,
                      border: `1px solid ${timeLimit === v ? C.sage : C.bdr}`,
                    }}
                  >
                    {v}m
                  </button>
                ))}
              </div>
            </div>

            {/* Lock duration */}
            <div className="rounded-2xl p-6" style={{ background: C.surf, border: `1px solid ${C.bdr}` }}>
              <div className="flex items-center gap-2 mb-4">
                <Lock size={15} style={{ color: C.rose }} />
                <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: C.txt }}>
                  Lock Duration
                </h2>
              </div>
              <p className="text-xs mb-4" style={{ color: C.muted }}>How long to lock apps when you hit your limit</p>
              <div className="grid grid-cols-2 gap-2">
                {LOCK_DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setLockDuration(d)}
                    className="py-3 rounded-xl font-bold text-sm transition-all"
                    style={{
                      background: lockDuration === d ? `rgba(232,116,138,0.12)` : C.surf2,
                      border: `1px solid ${lockDuration === d ? "rgba(232,116,138,0.28)" : C.bdr}`,
                      color: lockDuration === d ? C.rose : C.muted,
                    }}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl p-6" style={{ background: C.surf, border: `1px solid ${C.bdr}` }}>
              <h2 className="font-bold text-base mb-4" style={{ fontFamily: "'Syne', sans-serif", color: C.txt }}>
                Quick Actions
              </h2>
              <div className="space-y-2">
                {[
                  { label: "View Today's Stats",    icon: "📊" },
                  { label: "Do a Challenge",         icon: "🏆" },
                  { label: "Emergency Lock (now)",   icon: "🔒", action: handleLockNow },
                ].map(({ label, icon, action }) => (
                  <motion.button
                    key={label}
                    whileTap={{ scale: 0.97 }}
                    onClick={action}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium"
                    style={{ background: C.surf2, color: C.muted, border: `1px solid ${C.bdr}` }}
                  >
                    <span className="flex items-center gap-2">
                      <span>{icon}</span>
                      {label}
                    </span>
                    <ChevronRight size={13} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lock modal */}
      <AnimatePresence>
        {showLockModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="text-center p-8"
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, -8, 8, 0] }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                🔒
              </motion.div>
              <h2
                className="font-display text-3xl font-extrabold mb-2"
                style={{ fontFamily: "'Syne', sans-serif", color: C.sage }}
              >
                Apps Locked!
              </h2>
              <p style={{ color: C.muted }}>Go touch some grass for {lockDuration} minutes 🌿</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
