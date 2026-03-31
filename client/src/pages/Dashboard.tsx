/* ============================================================
   TOUCH GRASS — Dashboard / Control Center
   Design: Neon Arcade Retro-Future
   App tracking setup, time limits, live status
   ============================================================ */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Lock, Play, Pause, Settings, ChevronRight, CheckCircle2, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const MASCOT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663498189083/m8hLCZKFcCkyWd6pKKhzWU/grass-mascot-cYjqRsA3svJG6JvHfx7TL2.webp";

const APPS = [
  { id: "tiktok", name: "TikTok", emoji: "🎵", color: "#FF2D78", risk: "high" },
  { id: "instagram", name: "Instagram", emoji: "📸", color: "#FF2D78", risk: "high" },
  { id: "youtube", name: "YouTube", emoji: "▶️", color: "#FF2D78", risk: "medium" },
  { id: "twitter", name: "X / Twitter", emoji: "𝕏", color: "#00F5FF", risk: "medium" },
  { id: "snapchat", name: "Snapchat", emoji: "👻", color: "#FFE600", risk: "medium" },
  { id: "reddit", name: "Reddit", emoji: "🤖", color: "#FF6B35", risk: "low" },
];

const LOCK_DURATIONS = [5, 10, 15, 30];

export default function Dashboard() {
  const [trackedApps, setTrackedApps] = useState<string[]>(["tiktok", "instagram"]);
  const [timeLimit, setTimeLimit] = useState(30);
  const [lockDuration, setLockDuration] = useState(10);
  const [isTracking, setIsTracking] = useState(true);
  const [showLockModal, setShowLockModal] = useState(false);
  const [currentScrollTime, setCurrentScrollTime] = useState(23);

  const toggleApp = (id: string) => {
    setTrackedApps((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleToggleTracking = () => {
    setIsTracking((v) => !v);
    toast(isTracking ? "Tracking paused. You're on your own now 😬" : "Tracking resumed. We got you 💪", {
      style: { background: "#12121A", border: "1px solid #A8FF3E40", color: "#fff" },
    });
  };

  const handleLockNow = () => {
    setShowLockModal(true);
    setTimeout(() => setShowLockModal(false), 3000);
    toast(`Apps locked for ${lockDuration} minutes. Go touch some grass 🌿`, {
      style: { background: "#12121A", border: "1px solid #A8FF3E40", color: "#fff" },
    });
  };

  const scrollPercent = Math.min((currentScrollTime / timeLimit) * 100, 100);
  const isWarning = scrollPercent >= 70;
  const isDanger = scrollPercent >= 90;

  return (
    <Layout>
      <div className="container py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
              Control Center
            </h1>
            <p className="text-sm mt-1" style={{ color: "#666" }}>Set your limits. Own your time.</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleTracking}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm"
              style={{
                background: isTracking ? "#A8FF3E15" : "#FF2D7815",
                border: `1px solid ${isTracking ? "#A8FF3E40" : "#FF2D7840"}`,
                color: isTracking ? "#A8FF3E" : "#FF2D78",
              }}
            >
              {isTracking ? <Play size={14} /> : <Pause size={14} />}
              {isTracking ? "Tracking" : "Paused"}
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live status card */}
            <motion.div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "#12121A", border: `1px solid ${isDanger ? "#FF2D7840" : isWarning ? "#FFE60040" : "#A8FF3E30"}` }}
              animate={isDanger ? { borderColor: ["#FF2D7840", "#FF2D78", "#FF2D7840"] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-bold mb-1" style={{ color: "#666", letterSpacing: "0.1em" }}>CURRENT SESSION</div>
                  <div className="font-display text-5xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif", color: isDanger ? "#FF2D78" : isWarning ? "#FFE600" : "#A8FF3E" }}>
                    {currentScrollTime}
                    <span className="text-xl ml-1" style={{ color: "#555" }}>min</span>
                  </div>
                  <div className="text-sm mt-1" style={{ color: "#666" }}>of {timeLimit} min limit</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {isDanger && (
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
                      style={{ background: "#FF2D7820", color: "#FF2D78" }}
                    >
                      <AlertTriangle size={10} /> LIMIT ALMOST HIT
                    </motion.div>
                  )}
                  <img src={MASCOT_IMG} alt="" className="w-16 h-16 object-contain" style={{ filter: isDanger ? "drop-shadow(0 0 10px #FF2D78)" : "drop-shadow(0 0 10px #A8FF3E)" }} />
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "#1A1A26" }}>
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${scrollPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    background: isDanger
                      ? "linear-gradient(90deg, #FF2D78, #FF6B35)"
                      : isWarning
                      ? "linear-gradient(90deg, #FFE600, #FF6B35)"
                      : "linear-gradient(90deg, #A8FF3E, #00F5FF)",
                    boxShadow: `0 0 10px ${isDanger ? "#FF2D7880" : isWarning ? "#FFE60080" : "#A8FF3E80"}`,
                  }}
                />
              </div>

              <div className="flex justify-between mt-2 text-xs" style={{ color: "#555" }}>
                <span>0 min</span>
                <span>{timeLimit} min limit</span>
              </div>

              <div className="flex gap-3 mt-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLockNow}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm"
                  style={{ background: "#A8FF3E", color: "#0A0A0F", fontFamily: "'Syne', sans-serif" }}
                >
                  <Lock size={14} /> Lock Apps Now
                </motion.button>
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm"
                  style={{ background: "#1A1A26", color: "#666", border: "1px solid #333" }}
                  onClick={() => {
                    setCurrentScrollTime(0);
                    toast("Session reset! Fresh start 🔄", { style: { background: "#12121A", border: "1px solid #A8FF3E40", color: "#fff" } });
                  }}
                >
                  Reset Session
                </button>
              </div>
            </motion.div>

            {/* App selection */}
            <div className="rounded-2xl p-6" style={{ background: "#12121A", border: "1px solid #ffffff10" }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                  Apps to Track
                </h2>
                <span className="text-xs" style={{ color: "#666" }}>{trackedApps.length} selected</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {APPS.map((app) => {
                  const selected = trackedApps.includes(app.id);
                  return (
                    <motion.button
                      key={app.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleApp(app.id)}
                      className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                      style={{
                        background: selected ? `${app.color}15` : "#1A1A26",
                        border: `1px solid ${selected ? `${app.color}40` : "#ffffff10"}`,
                        boxShadow: selected ? `0 0 10px ${app.color}20` : "none",
                      }}
                    >
                      <span className="text-xl">{app.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate" style={{ color: selected ? "#fff" : "#888" }}>{app.name}</div>
                        <div className="text-xs" style={{ color: selected ? app.color : "#555" }}>
                          {app.risk} risk
                        </div>
                      </div>
                      {selected && <CheckCircle2 size={14} style={{ color: app.color, flexShrink: 0 }} />}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column — settings */}
          <div className="space-y-6">
            {/* Time limit */}
            <div className="rounded-2xl p-6" style={{ background: "#12121A", border: "1px solid #ffffff10" }}>
              <div className="flex items-center gap-2 mb-4">
                <Settings size={16} style={{ color: "#A8FF3E" }} />
                <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                  Daily Limit
                </h2>
              </div>
              <div className="text-center mb-4">
                <div className="font-display text-4xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif", color: "#A8FF3E" }}>
                  {timeLimit}
                  <span className="text-lg ml-1" style={{ color: "#555" }}>min</span>
                </div>
                <div className="text-xs mt-1" style={{ color: "#666" }}>per tracked app</div>
              </div>
              <input
                type="range"
                min={5}
                max={120}
                step={5}
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "#A8FF3E" }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#555" }}>
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
                      background: timeLimit === v ? "#A8FF3E" : "#1A1A26",
                      color: timeLimit === v ? "#0A0A0F" : "#666",
                      border: `1px solid ${timeLimit === v ? "#A8FF3E" : "#333"}`,
                    }}
                  >
                    {v}m
                  </button>
                ))}
              </div>
            </div>

            {/* Lock duration */}
            <div className="rounded-2xl p-6" style={{ background: "#12121A", border: "1px solid #ffffff10" }}>
              <div className="flex items-center gap-2 mb-4">
                <Lock size={16} style={{ color: "#FF2D78" }} />
                <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                  Lock Duration
                </h2>
              </div>
              <p className="text-xs mb-4" style={{ color: "#666" }}>How long to lock apps when you hit your limit</p>
              <div className="grid grid-cols-2 gap-2">
                {LOCK_DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setLockDuration(d)}
                    className="py-3 rounded-xl font-bold text-sm transition-all"
                    style={{
                      background: lockDuration === d ? "#FF2D7820" : "#1A1A26",
                      border: `1px solid ${lockDuration === d ? "#FF2D7840" : "#333"}`,
                      color: lockDuration === d ? "#FF2D78" : "#666",
                      boxShadow: lockDuration === d ? "0 0 10px #FF2D7820" : "none",
                    }}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl p-6" style={{ background: "#12121A", border: "1px solid #ffffff10" }}>
              <h2 className="font-bold text-base mb-4" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                Quick Actions
              </h2>
              <div className="space-y-2">
                {[
                  { label: "View Today's Stats", icon: "📊", href: "/stats" },
                  { label: "Do a Challenge", icon: "🏆", href: "/challenges" },
                  { label: "Emergency Lock (now)", icon: "🔒", action: handleLockNow },
                ].map(({ label, icon, href, action }) => (
                  <motion.button
                    key={label}
                    whileTap={{ scale: 0.97 }}
                    onClick={action}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium"
                    style={{ background: "#1A1A26", color: "#888", border: "1px solid #ffffff08" }}
                  >
                    <span className="flex items-center gap-2">
                      <span>{icon}</span>
                      {label}
                    </span>
                    <ChevronRight size={14} />
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
            style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-center p-8"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-7xl mb-4"
              >
                🔒
              </motion.div>
              <h2 className="font-display text-3xl font-extrabold mb-2" style={{ fontFamily: "'Syne', sans-serif", color: "#A8FF3E" }}>
                Apps Locked!
              </h2>
              <p style={{ color: "#888" }}>Go touch some grass for {lockDuration} minutes 🌿</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
