"use client";
import { siteConfig } from "@/lib/data";
import {
  SiReact, SiNextdotjs, SiTypescript, SiPython, SiCplusplus,
} from "react-icons/si";
import IN from "country-flag-icons/react/3x2/IN";
import GB from "country-flag-icons/react/3x2/GB";
import FR from "country-flag-icons/react/3x2/FR";

function FigmaLogo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
    </svg>
  );
}

function CanvaLogo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="url(#canvaGrad)" />
      <path
        d="M12.5 6.8c-3 0-5.4 2.4-5.4 5.3 0 2.9 2.2 5 4.9 5 1.3 0 2.3-.5 2.9-1.1.1-.1.1-.2 0-.3l-.5-.6c-.1-.1-.2-.1-.3 0-.5.4-1.2.8-2 .8-1.8 0-3.1-1.5-3.1-3.6 0-2.1 1.4-3.7 3.2-3.7.9 0 1.5.3 1.9.6.1.1.2.1.3 0l.5-.6c.1-.1.1-.2 0-.3-.6-.6-1.6-1.1-2.9-1.1z"
        fill="#fff"
      />
      <defs>
        <linearGradient id="canvaGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C4CC" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MicrosoftLogo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

const tools = [
  { icon: SiReact, label: "React", color: "#61dafb" },
  { icon: SiNextdotjs, label: "Next.js", color: "#2d2d2d" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
  { icon: SiPython, label: "Python", color: "#3776ab" },
  { icon: SiCplusplus, label: "C++", color: "#00599c" },
  { icon: "figma" as const, label: "Figma", color: "#1e1e1e" },
  { icon: "canva" as const, label: "Canva", color: "#00c4cc" },
  { icon: "microsoft" as const, label: "MS Office", color: "#f25022" },
];

function ToolIcon({ icon: Icon, label, color }: { icon: React.ElementType | "figma" | "canva" | "microsoft"; label: string; color: string }) {
  const isFigma = Icon === "figma";
  const isCanva = Icon === "canva";
  const isMicrosoft = Icon === "microsoft";
  const isWhiteBadge = isFigma || isMicrosoft;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.55rem", cursor: "none" }}>
      <div
        style={{
          width: 56, height: 56, borderRadius: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isWhiteBadge ? "#ffffff" : `linear-gradient(150deg, ${color}, ${color}cc)`,
          boxShadow: isWhiteBadge
            ? "0 8px 24px -6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)"
            : `0 8px 24px -6px ${color}66, inset 0 1px 0 rgba(255,255,255,0.15)`,
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px) scale(1.05)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)"; }}
      >
        {isFigma ? (
          <FigmaLogo size={22} />
        ) : isCanva ? (
          <CanvaLogo size={26} />
        ) : isMicrosoft ? (
          <MicrosoftLogo size={22} />
        ) : typeof Icon !== "string" ? (
          <Icon size={26} color="#fff" />
        ) : null}
      </div>
      <span style={{
        fontFamily: "'Space Mono', monospace", fontSize: "0.6rem",
        letterSpacing: "0.04em", color: "rgba(255,255,255,0.4)",
      }}>{label}</span>
    </div>
  );
}

const languages = [
  { lang: "Hindi", FlagIcon: IN, level: "Native", pct: 100, color: "#60a5fa" },
  { lang: "English", FlagIcon: GB, level: "Proficient", pct: 82, color: "#a78bfa" },
  { lang: "French", FlagIcon: FR, level: "Basic", pct: 28, color: "#22d3ee" },
];

export function About() {
  return (
    <section id="about" style={{ padding: "clamp(4rem, 8vw, 7rem) 0 clamp(3rem, 6vw, 6rem)", position: "relative", zIndex: 10 }}>
  <div
    aria-hidden
    style={{
      position: "absolute", top: 0, left: 0, right: 0, zIndex: 1,
      height: "260px",
      background: "linear-gradient(to bottom, #000000, transparent)",
      pointerEvents: "none",
    }}
  />
      <div className="page-container" style={{ position: "relative", zIndex: 2 }}>
  <div className="section-label">About me</div>

        {/* Two-col layout */}
        <div
  className="grid grid-cols-1 lg:[grid-template-columns:1.1fr_0.9fr]"
  style={{
    gap: "clamp(3rem, 7vw, 7rem)",
    alignItems: "stretch",
  }}
>

          {/* ── LEFT ── */}
{/* ── LEFT ── */}
<div style={{ position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>
  {/* Decorative background glow - matches the aurora language used site-wide */}
  <div aria-hidden style={{
    position: "absolute", top: "-4rem", left: "-4rem",
    width: 320, height: 320, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59,130,246,0.09), transparent 70%)",
    filter: "blur(20px)", pointerEvents: "none", zIndex: 0,
  }} />

  {/* Eyebrow badge */}
  <div className="reveal-up" style={{
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "0.35rem 0.9rem", borderRadius: 100,
    border: "1px solid rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.06)",
    marginBottom: "1.5rem", position: "relative", zIndex: 1,
  }}>
    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60a5fa", boxShadow: "0 0 8px #60a5fa" }} />
    <span style={{
      fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
      letterSpacing: "0.14em", textTransform: "uppercase", color: "#60a5fa",
    }}>IET Lucknow · Class of &apos;28</span>
  </div>

  <h2 className="reveal-up" style={{
    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
    fontSize: "clamp(2rem, 4vw, 3.6rem)", letterSpacing: "-0.04em",
    lineHeight: 1.08, marginBottom: "2.25rem", position: "relative", zIndex: 1,
  }}>
    A student who<br />
    designs, codes &<br />
    <span className="gradient-text-blue">solves problems.</span>
  </h2>

  {/* Bio + chips, wrapped in a glass panel to match the right column's visual weight */}
  <div className="glass-card rounded-2xl reveal-up" style={{
  padding: "2rem", position: "relative", zIndex: 1, overflow: "hidden",
  flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
}}>
    <div aria-hidden style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 2,
      background: "linear-gradient(90deg, #60a5fa, #a78bfa, #22d3ee, transparent)", opacity: 0.55,
    }} />

    <p style={{
      color: "rgba(255,255,255,0.5)", lineHeight: 1.75,
fontWeight: 300, marginBottom: "1.05rem", fontSize: "0.92rem",
    }}>
      I&apos;m a <span style={{ color: "#fff", fontWeight: 500 }}>Computer Science student at IET Lucknow</span> with
      a strong academic foundation and a genuine passion for design, engineering, and solving real-world problems.
    </p>
    <p style={{
      color: "rgba(255,255,255,0.5)", lineHeight: 1.75,
fontWeight: 300, marginBottom: "1.05rem", fontSize: "0.92rem",
    }}>
      I spend a lot of my time sharpening my problem-solving skills through{" "}
      <span style={{ color: "#60a5fa" }}>Data Structures &amp; Algorithms </span> and competitive programming
      it&apos;s where I&apos;ve built the analytical thinking I bring to every project I work on.
    </p>
    <p style={{
      color: "rgba(255,255,255,0.5)", lineHeight: 1.75,
fontWeight: 300, marginBottom: "1.05rem", fontSize: "0.92rem",
    }}>
      My work sits at the intersection of{" "}
      <span style={{ color: "#a78bfa" }}>visual design</span> and{" "}
      <span style={{ color: "#22d3ee" }}>technology.</span> I care about building things that actually work,
      and work well.
    </p>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
      {[
        { label: "DSA & Problem Solving", color: "#60a5fa" },
        { label: "UI/UX Design", color: "#a78bfa" },
        { label: "Full-Stack Development", color: "#22d3ee" },
      ].map((chip) => (
        <span key={chip.label} style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          padding: "0.4rem 0.9rem", borderRadius: 100,
          border: `1px solid ${chip.color}30`, background: `${chip.color}0a`,
          fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
          letterSpacing: "0.04em", color: "rgba(255,255,255,0.65)",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: chip.color, boxShadow: `0 0 6px ${chip.color}` }} />
          {chip.label}
        </span>
      ))}
    </div>
  </div>
</div>

          {/* ── RIGHT ── */}
          <div style={{ paddingTop: "0.5rem" }}>
            {/* Tools grid */}
            <div className="glass-card rounded-2xl" style={{
              padding: "1.75rem",
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.25rem 0.5rem",
              marginBottom: "0.9rem",
              justifyItems: "center",
            }}>
              {tools.map((t) => (
                <ToolIcon key={t.label} icon={t.icon} label={t.label} color={t.color} />
              ))}
            </div>

            {/* Languages - with real SVG flag icons (no network/font dependency) */}
            <div className="glass-card rounded-2xl" style={{ padding: "1.75rem" }}>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: "0.6rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#60a5fa", marginBottom: "1.25rem",
              }}>Languages</div>
              {languages.map(l => (
                <div key={l.lang} style={{ marginBottom: "1rem" }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginBottom: "0.4rem",
                  }}>
                    <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <l.FlagIcon style={{ width: 18, height: 13, borderRadius: 2, flexShrink: 0 }} />
                      {l.lang}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", fontFamily: "'Space Mono',monospace" }}>{l.level}</span>
                  </div>
                  <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: l.pct + "%",
                      background: `linear-gradient(90deg, ${l.color}, ${l.color}88)`,
                      borderRadius: 2, transition: "width 1s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Quick facts - balances the right column's height against the left bio panel */}
<div className="glass-card rounded-2xl" style={{ padding: "1.75rem", marginTop: "0.9rem" }}>
  <div style={{
    fontFamily: "'Space Mono', monospace", fontSize: "0.6rem",
    letterSpacing: "0.2em", textTransform: "uppercase",
    color: "#22d3ee", marginBottom: "1.1rem",
  }}>Currently</div>
  {[
    { label: "Focused on", value: "DSA & System Design" },
    { label: "Open to", value: "Internships & Collabs" },
    { label: "Based in", value: siteConfig.location },
  ].map((f, i) => (
    <div key={f.label} style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0.7rem 0",
      borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
    }}>
      <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>{f.label}</span>
      <span style={{ fontSize: "0.82rem", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>{f.value}</span>
    </div>
  ))}
</div>
          </div>
        </div>
      </div>
    </section>
  );
}