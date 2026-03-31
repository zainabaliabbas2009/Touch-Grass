/* ============================================================
   TOUCH GRASS — Layout Component (v2)
   Design: Comfortable Dark — muted sage, dusty rose, soft slate
   No harsh neon. Soft glows. Easy on the eyes.
   ============================================================ */

import { Link, useLocation } from "wouter";
import { Home, BarChart3, Zap, Trophy } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dashboard", label: "Control", icon: Zap },
  { path: "/challenges", label: "Challenges", icon: Trophy },
  { path: "/stats", label: "Stats", icon: BarChart3 },
];

// Color tokens
const C = {
  bg:      "#0F1117",
  surf:    "#171B24",
  surf2:   "#1E2330",
  bdr:     "#2A3040",
  txt:     "#E2E8F0",
  muted:   "#7A8499",
  sage:    "#6EBF8B",
  rose:    "#E8748A",
  sky:     "#6BAED6",
  amber:   "#D4A96A",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          borderColor: C.bdr,
          background: `rgba(15,17,23,0.92)`,
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663498189083/m8hLCZKFcCkyWd6pKKhzWU/grass-mascot-cYjqRsA3svJG6JvHfx7TL2.webp"
              alt="Grass mascot"
              className="w-8 h-8 object-contain"
              style={{ filter: "saturate(0.7) brightness(0.9)" }}
            />
            <span
              className="text-lg font-extrabold"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}
            >
              <span style={{ color: C.sage }}>touch</span>
              <span style={{ color: C.rose }}>grass</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const active = location === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 no-underline"
                  style={{
                    background: active ? `rgba(110,191,139,0.1)` : "transparent",
                    color: active ? C.sage : C.muted,
                    border: `1px solid ${active ? "rgba(110,191,139,0.25)" : "transparent"}`,
                  }}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(110,191,139,0.1)",
                border: "1px solid rgba(110,191,139,0.2)",
                color: C.sage,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current soft-pulse" />
              Tracking ON
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
        style={{
          background: `rgba(15,17,23,0.96)`,
          backdropFilter: "blur(16px)",
          borderColor: C.bdr,
        }}
      >
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location === path;
            return (
              <Link
                key={path}
                href={path}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 no-underline"
                style={{ color: active ? C.sage : "#4A5568" }}
              >
                <div className="relative">
                  <Icon size={19} />
                  {active && (
                    <span
                      className="absolute -inset-1 rounded-full"
                      style={{ background: C.sage, opacity: 0.15, filter: "blur(4px)" }}
                    />
                  )}
                </div>
                <span className="text-xs font-semibold">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
