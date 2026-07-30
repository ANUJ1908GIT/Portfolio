"use client";
import { useRef, useState } from "react";
import { Trophy, Zap, Star, Palette, Droplet, Users } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { achievements } from "@/lib/data";

const palette = ["#60a5fa", "#a78bfa", "#22d3ee", "#f472b6", "#34d399", "#fb923c"];

// Maps each achievement's emoji to a matching lucide icon - used as a
// fallback if the logo image fails to load, and also as the base language
// for icon rendering.
const iconMap: Record<string, React.ElementType> = {
  "🏆": Trophy,
  "⚡": Zap,
  "⭐": Star,
  "🎨": Palette,
  "🩸": Droplet,
  "🤝": Users,
};

// Maps each achievement's emoji to its logo image, placed in /public/logos/.
// Save your PNGs there with these exact filenames.
const logoMap: Record<string, string> = {
  "🏆": "/logos/nec.png",
  "⚡": "/logos/technex.png",
  "⭐": "/logos/codechef.png",
  "🎨": "/logos/ecell.png",
  "🩸": "/logos/bloodconnect.png",
  "🤝": "/logos/dsw.png",
};

function IconBadge({ emoji, color, size = 24, badgeSize = 52 }: { emoji: string; color: string; size?: number; badgeSize?: number }) {
  const Icon = iconMap[emoji] ?? Trophy;
  const logoSrc = logoMap[emoji];
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div style={{
      width: badgeSize, height: badgeSize, borderRadius: badgeSize > 60 ? 18 : 14,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: `${color}12`, border: `1px solid ${color}30`,
      flexShrink: 0, overflow: "hidden", position: "relative",
    }}>
      {logoSrc && !imgFailed ? (
        <div
          style={{
            width: badgeSize - 12,
            height: badgeSize - 12,
            borderRadius: badgeSize > 60 ? 14 : 10,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={logoSrc}
            alt=""
            width={(badgeSize - 12) * 0.7}
            height={(badgeSize - 12) * 0.7}
            style={{ objectFit: "contain" }}
            onError={() => setImgFailed(true)}
          />
        </div>
      ) : (
        <Icon size={size} color={color} strokeWidth={1.75} />
      )}
    </div>
  );
}

function AchievementCard({ a, color, index }: { a: typeof achievements[0]; color: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-5px)`;
    el.style.borderColor = `${color}44`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${color}14, transparent 60%)`;
      glowRef.current.style.opacity = "1";
    }
  };
  const onLeave = () => {
    const el = cardRef.current; if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(.25,.46,.45,.94), border-color 0.3s";
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)";
    el.style.borderColor = "rgba(255,255,255,0.07)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  };

  return (
    <div
      ref={cardRef}
      className="glass-card rounded-2xl"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        padding: "1.75rem", position: "relative", overflow: "hidden", cursor: "none",
        height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box",
      }}
    >
      {/* Mouse-follow glow, fades in on hover */}
      <div ref={glowRef} style={{
        position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.3s ease", pointerEvents: "none",
      }} />
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${color}, transparent)`, opacity: 0.5,
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <IconBadge emoji={a.icon} color={color} />
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: "0.7rem",
          color: "rgba(255,255,255,0.12)", fontWeight: 700,
        }}>{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: "0.58rem",
        letterSpacing: "0.18em", textTransform: "uppercase",
        color, marginTop: "1.1rem", marginBottom: "0.5rem", position: "relative", zIndex: 1,
      }}>{a.category}</div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
        fontSize: "1rem", lineHeight: 1.3, marginBottom: "0.55rem", position: "relative", zIndex: 1,
      }}>{a.name}</div>
      <div style={{ fontSize: "0.8rem", lineHeight: 1.65, color: "rgba(255,255,255,0.35)", position: "relative", zIndex: 1, flexGrow: 1 }}>
        {a.detail}
      </div>
    </div>
  );
}

export function Achievements() {
  return (
    <section id="achievements" style={{ padding: "clamp(4rem, 7vw, 6rem) 0", position: "relative", zIndex: 10 }}>
      <div className="page-container" style={{ paddingTop: "6rem" }}>
        <motion.div style={{
  textAlign: "center", display: "flex", flexDirection: "column",
  alignItems: "center", marginBottom: "4rem",
}}
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  {/* Eyebrow label flanked symmetrically by short accent lines */}
  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem" }}>
    <motion.span
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 100, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      style={{ height: 1, background: "linear-gradient(90deg, transparent, #a78bfa)" }}
    />
    <span style={{
      fontFamily: "'Space Mono', monospace", fontSize: "0.85rem",
      letterSpacing: "0.32em", textTransform: "uppercase", color: "#60a5fa",
      whiteSpace: "nowrap",
    }}>Recognition</span>
    <motion.span
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 100, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      style={{ height: 1, background: "linear-gradient(90deg, #60a5fa, transparent)" }}
    />
  </div>

  {/* Main heading — large, bold, editorial */}
  <h2 style={{
    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
    fontSize: "clamp(3.5rem, 9vw, 7rem)", letterSpacing: "-0.05em",
    lineHeight: 0.95, marginBottom: "2.5rem", color: "#fff",
  }}>
    Awards &amp; milestones.
  </h2>

  {/* Quick summary strip */}
  <div style={{ display: "flex", gap: "1.75rem", justifyContent: "center" }}>
    {[
      { value: achievements.length.toString(), label: "Recognitions" },
      { value: "2", label: "Competitions" },
      { value: "3", label: "Communities" },
    ].map((s) => (
      <div key={s.label} style={{ textAlign: "center" }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: "1.5rem", color: "#fff", letterSpacing: "-0.03em",
        }}>{s.value}</div>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "0.58rem",
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)", marginTop: 2,
        }}>{s.label}</div>
      </div>
    ))}
  </div>
</motion.div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} data-stagger>
          {Array.from({ length: Math.ceil(achievements.length / 3) }, (_, row) => {
            const rowItems = achievements.slice(row * 3, row * 3 + 3);
            return (
              <div
                key={row}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "stretch",
                  gap: "1rem",
                }}
              >
                {rowItems.map((a, j) => {
                  const i = row * 3 + j;
                  return (
                    <div key={a.name} style={{ flex: "1 1 300px", minWidth: 270 }}>
                      <AchievementCard a={a} color={palette[i % palette.length]} index={i} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}