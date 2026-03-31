/* ============================================================
   TOUCH GRASS — Stats Page (v2)
   Design: Comfortable Dark — muted sage, dusty rose, soft slate
   No harsh neon. Soft glows. Easy on the eyes.
   ============================================================ */

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts";
import { TrendingDown, Clock, Zap, Trophy, Calendar } from "lucide-react";
import Layout from "@/components/Layout";

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

const WEEKLY_DATA = [
  { day: "Mon", scrollTime: 95, saved: 45 },
  { day: "Tue", scrollTime: 72, saved: 58 },
  { day: "Wed", scrollTime: 88, saved: 42 },
  { day: "Thu", scrollTime: 45, saved: 85 },
  { day: "Fri", scrollTime: 120, saved: 20 },
  { day: "Sat", scrollTime: 60, saved: 70 },
  { day: "Sun", scrollTime: 35, saved: 95 },
];

const APP_DATA = [
  { name: "TikTok",    time: 87, color: C.rose  },
  { name: "Instagram", time: 54, color: C.amber },
  { name: "YouTube",   time: 42, color: C.amber },
  { name: "Twitter",   time: 28, color: C.sky   },
  { name: "Reddit",    time: 15, color: C.sage  },
];

const TREND_DATA = [
  { week: "W1", avg: 180 },
  { week: "W2", avg: 155 },
  { week: "W3", avg: 130 },
  { week: "W4", avg: 95  },
  { week: "W5", avg: 72  },
  { week: "W6", avg: 58  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl px-3 py-2 text-xs"
        style={{ background: C.surf2, border: `1px solid ${C.bdr}`, color: C.txt }}
      >
        <div className="font-bold mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ color: p.color }}>
            {p.name}: {p.value} min
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Stats() {
  const totalSaved = WEEKLY_DATA.reduce((a, b) => a + b.saved, 0);
  const totalInterruptions = 47;
  const avgScrollTime = Math.round(WEEKLY_DATA.reduce((a, b) => a + b.scrollTime, 0) / WEEKLY_DATA.length);
  const bestDay = WEEKLY_DATA.reduce((a, b) => (a.saved > b.saved ? a : b));

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="font-display text-3xl font-extrabold"
            style={{ fontFamily: "'Syne', sans-serif", color: C.txt, letterSpacing: "-0.02em" }}
          >
            Your Stats
          </h1>
          <p className="text-sm mt-1" style={{ color: C.muted }}>
            The numbers don't lie. You've been doing better.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Time Saved",       value: `${totalSaved}m`,    sub: "this week",     icon: Clock,       color: C.sage  },
            { label: "Interruptions",    value: totalInterruptions,  sub: "scroll stops",  icon: Zap,         color: C.rose  },
            { label: "Avg Daily Scroll", value: `${avgScrollTime}m`, sub: "down 47% 🔥",   icon: TrendingDown, color: C.sky  },
            { label: "Best Day",         value: bestDay.day,         sub: `${bestDay.saved}m saved`, icon: Trophy, color: C.amber },
          ].map(({ label, value, sub, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-4"
              style={{ background: C.surf, border: `1px solid ${C.bdr}` }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
                <Icon size={15} style={{ color }} />
              </div>
              <div
                className="font-display text-2xl font-extrabold mb-0.5"
                style={{ fontFamily: "'Syne', sans-serif", color }}
              >
                {value}
              </div>
              <div className="text-xs" style={{ color: C.muted }}>{label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#3A4455" }}>{sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly chart */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6"
            style={{ background: C.surf, border: `1px solid ${C.bdr}` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: C.txt }}>
                This Week
              </h2>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1" style={{ color: C.rose }}>
                  <span className="w-2 h-2 rounded-full bg-current" /> Scroll time
                </span>
                <span className="flex items-center gap-1" style={{ color: C.sage }}>
                  <span className="w-2 h-2 rounded-full bg-current" /> Saved
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={WEEKLY_DATA} barGap={4}>
                <XAxis dataKey="day" tick={{ fill: "#4A5568", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="scrollTime" name="Scroll time" fill={C.rose} radius={[4, 4, 0, 0]} opacity={0.75} />
                <Bar dataKey="saved"      name="Saved"       fill={C.sage} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* App breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-6"
            style={{ background: C.surf, border: `1px solid ${C.bdr}` }}
          >
            <h2 className="font-bold text-base mb-4" style={{ fontFamily: "'Syne', sans-serif", color: C.txt }}>
              App Breakdown
            </h2>
            <div className="space-y-4">
              {APP_DATA.map((app) => {
                const maxTime = Math.max(...APP_DATA.map((a) => a.time));
                const pct = (app.time / maxTime) * 100;
                return (
                  <div key={app.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span style={{ color: C.muted }}>{app.name}</span>
                      <span className="font-bold" style={{ color: app.color }}>{app.time}m</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: C.surf2 }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: app.color, boxShadow: `0 0 5px ${app.color}40` }}
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
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-6 mb-6"
          style={{ background: C.surf, border: `1px solid ${C.bdr}` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: C.txt }}>
                6-Week Trend
              </h2>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>
                Average daily screen time — going down 📉
              </p>
            </div>
            <div
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: `rgba(110,191,139,0.1)`, border: `1px solid rgba(110,191,139,0.22)`, color: C.sage }}
            >
              <TrendingDown size={11} /> -68% since start
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={TREND_DATA}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={C.sage} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={C.sage} stopOpacity={0}   />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={{ fill: "#4A5568", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="avg"
                name="Avg scroll"
                stroke={C.sage}
                strokeWidth={2}
                fill="url(#trendGrad)"
                dot={{ fill: C.sage, r: 4, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-6"
          style={{ background: C.surf, border: `1px solid ${C.bdr}` }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={15} style={{ color: C.rose }} />
            <h2 className="font-bold text-base" style={{ fontFamily: "'Syne', sans-serif", color: C.txt }}>
              Interruption Heatmap
            </h2>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }, (_, i) => {
              const intensity = Math.floor(Math.random() * 5);
              const alphas = ["0A", "1A", "35", "60", "99"];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.012 }}
                  className="aspect-square rounded-md"
                  style={{ background: intensity === 0 ? C.surf2 : `${C.rose}${alphas[intensity]}` }}
                  title={`${intensity * 3} interruptions`}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: "#3A4455" }}>
            <span>Less</span>
            {["0A", "1A", "35", "60", "99"].map((a, i) => (
              <div key={i} className="w-3 h-3 rounded-sm" style={{ background: i === 0 ? C.surf2 : `${C.rose}${a}` }} />
            ))}
            <span>More</span>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
