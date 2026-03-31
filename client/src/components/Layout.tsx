/* ============================================================
   TOUCH GRASS — Layout Component
   Design: Neon Arcade Retro-Future
   Bottom nav for mobile-first, top nav for desktop
   ============================================================ */

import { Link, useLocation } from "wouter";
import { Home, BarChart3, Zap, Trophy } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dashboard", label: "Control", icon: Zap },
  { path: "/challenges", label: "Challenges", icon: Trophy },
  { path: "/stats", label: "Stats", icon: BarChart3 },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0F", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b" style={{ borderColor: "#A8FF3E30", background: "rgba(10,10,15,0.9)", backdropFilter: "blur(12px)" }}>
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663498189083/m8hLCZKFcCkyWd6pKKhzWU/grass-mascot-cYjqRsA3svJG6JvHfx7TL2.webp"
              alt="Grass mascot"
              className="w-8 h-8 object-contain"
            />
            <span className="font-display text-lg font-extrabold" style={{ fontFamily: "'Syne', sans-serif", color: "#A8FF3E", letterSpacing: "-0.02em" }}>
              touch<span style={{ color: "#FF2D78" }}>grass</span>
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 no-underline"
                  style={{
                    background: active ? "#A8FF3E15" : "transparent",
                    color: active ? "#A8FF3E" : "#888",
                    border: active ? "1px solid #A8FF3E40" : "1px solid transparent",
                    boxShadow: active ? "0 0 10px #A8FF3E20" : "none",
                  }}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#A8FF3E15", border: "1px solid #A8FF3E40", color: "#A8FF3E" }}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t" style={{ background: "rgba(10,10,15,0.95)", backdropFilter: "blur(16px)", borderColor: "#A8FF3E20" }}>
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location === path;
            return (
              <Link
                key={path}
                href={path}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 no-underline"
                style={{
                  color: active ? "#A8FF3E" : "#555",
                }}
              >
                <div className="relative">
                  <Icon size={20} />
                  {active && (
                    <span className="absolute -inset-1 rounded-full opacity-30" style={{ background: "#A8FF3E", filter: "blur(6px)" }} />
                  )}
                </div>
                <span className="text-xs font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
