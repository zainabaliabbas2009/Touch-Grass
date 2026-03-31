/* ============================================================
   TOUCH GRASS — Stats Page
   Design: Neon Arcade Retro-Future
   Daily screen time stats, interruptions, time saved
   ============================================================ */

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingDown, Clock, Zap, Trophy, Calendar } from "lucide-react";
import Layout from "@/components/Layout";

const STATS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663498189083/m8hLCZKFcCkyWd6pKKhzWU/stats-bg-2CpTPagCmfFz8pe4suUUUK.webp";

const WEEKLY_DATA = [
  { day: "Mon", scrollTime: 95, saved: 45, interruptions: 8 },
  { day: "Tue", scrollTime: 72, saved: 58, interruptions: 6 },
  { day: "Wed", scrollTime: 88, saved: 42, interruptions: 9 },
  { day: "Thu", scrollTime: 45, saved: 85, interruptions: 4 },
  { day: "Fri", scrollTime: 120, saved: 20, interruptions: 12 },
  { day: "Sat", scrollTime: 60, saved: 70, interruptions: 5 },
  { day: "Sun", scrollTime: 35, saved: 95, interruptions: 3 },
];

const APP_DATA = [
  { name: "TikTok", time: 87, color: "#FF2D78" },
  { name: "Instagram", time: 54, color: "#FF6B35" },
  { name: "YouTube", time: 42, color: "#FFE600" },
  { name: "Twitter", time: 28, color: "#00F5FF" },
  { name: "Reddit", time: 15, color: "#A8FF3E" },
];

const TREND_DATA = [
  { week: "W1", avg: 180 },
  { week: "W2", avg: 155 },
  { week: "W3", avg: 130 },
  { week: "W4", avg: 95 },
  { week: "W5", avg: 72 },
  { week: "W6", avg: 58 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl px-3 py-2 text-xs" style={{ background: "#1A1A26", border: "1px solid #A8FF3E30", color: "#fff" }}>
        <div className="font-bold mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value} min</div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Stats() {
  const totalSaved = WEEKLY_DATA.reduce((a, b) => a + b.saved, 0);
  const totalInterruptions = WEEKLY_DATA.reduce((a, b) => a + b.interruptions, 0);
  const avgScrollTime = Math.round(WEEKLY_DATA.reduce((a, b) => a + b.scrollTime, 0) / WEEKLY_DATA.length);
  const bestDay = WEEKLY_DATA.reduce((a, b) => (a.saved > b.saved ? a : b));

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-extrabold" style={{ fontFamily: "'Syne', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
            Your Stats
          </h1>
          <p className="text-sm mt-1" style={{ color: "#666" }}>The numbers don't lie. You've been doing better.</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Time Saved", value: `${totalSaved}m`, sub: "this week", icon: Clock, color: "#A8FF3E" },
            { label: "Interruptions", value: totalInterruptions, sub: "scroll stops", icon: Zap, color: "#FF2D78" },
            { label: "Avg Daily Scroll", value: `${avgScrollTime}m`, sub: "down 47% 🔥", icon: TrendingDown, color: "#00F5FF" },
            { label: "Best Day", value: bestDay.day, sub: `${bestDay.saved}m saved`, icon: Trophy, color: "#FFE600" },
          ].map(({ label, value, sub, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{ background: "#12121A", border: `1px solid ${color}25` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={16} style={{ color }} />
                </div>
              </div>
              <div className="font-display text-2xl font-extrabold mb-0.5" style={{ fontFamily: "'Syne', sans-serif", color }}>
                {value}
              </div>
              <div className="text-xs" style={{ color: "#666" }}>{label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#555" }}>{sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly scroll time vs saved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: "#12121A", border: "1px solid #ffffff10" }}
          >
            <div className="absolute inset-0 opacity-5">
              <img src={STATS_BG} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                  This Week
                </h2>
                <div className="flex gap-3 text-xs">
                  <span className="flex items-center gap-1" style={{ color: "#FF2D78" }}>
                    <span className="w-2 h-2 rounded-full bg-current" /> Scroll time
                  </span>
                  <span className="flex items-center gap-1" style={{ color: "#A8FF3E" }}>
                    <span className="w-2 h-2 rounded-full bg-current" /> Saved
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={WEEKLY_DATA} barGap={4}>
                  <XAxis dataKey="day" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="scrollTime" name="Scroll time" fill="#FF2D78" radius={[4, 4, 0, 0]} opacity={0.8} />
                  <Bar dataKey="saved" name="Saved" fill="#A8FF3E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* App breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-6"
            style={{ background: "#12121A", border: "1px solid #ffffff10" }}
          >
            <h2 className="font-bold text-base mb-4" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
              App Breakdown
            </h2>
            <div className="space-y-3">
              {APP_DATA.map((app) => {
                const maxTime = Math.max(...APP_DATA.map((a) => a.time));
                const pct = (app.time / maxTime) * 100;
                return (
                  <div key={app.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: "#888" }}>{app.name}</span>
                      <span className="font-bold" style={{ color: app.color }}>{app.time}m</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1A1A26" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: app.color, boxShadow: `0 0 6px ${app.color}60` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* 6-week trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-6 mb-6"
          style={{ background: "#12121A", border: "1px solid #A8FF3E20" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                6-Week Trend
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "#666" }}>Average daily screen time — going down 📉</p>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "#A8FF3E15", border: "1px solid #A8FF3E30", color: "#A8FF3E" }}>
              <TrendingDown size={12} /> -68% since start
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={TREND_DATA}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A8FF3E" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#A8FF3E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="avg" name="Avg scroll" stroke="#A8FF3E" strokeWidth={2} fill="url(#trendGrad)" dot={{ fill: "#A8FF3E", r: 4, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Interruptions calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-6"
          style={{ background: "#12121A", border: "1px solid #ffffff10" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} style={{ color: "#FF2D78" }} />
            <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: "#fff" }}>
              Interruption Heatmap
            </h2>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }, (_, i) => {
              const intensity = Math.floor(Math.random() * 5);
              const colors = ["#1A1A26", "#FF2D7820", "#FF2D7840", "#FF2D7870", "#FF2D78"];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.01 }}
                  className="aspect-square rounded-md"
                  style={{ background: colors[intensity] }}
                  title={`${intensity * 3} interruptions`}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: "#555" }}>
            <span>Less</span>
            {["#1A1A26", "#FF2D7820", "#FF2D7840", "#FF2D7870", "#FF2D78"].map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
            ))}
            <span>More</span>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
