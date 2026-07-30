"use client";
import { skills } from "@/lib/data";
import { SkillsSphere } from "./SkillsSphere";
import { motion } from "framer-motion";

const skillCategories = [
  { label: "Programming", color: "#60a5fa", bg: "rgba(59,130,246,0.06)", items: ["Python", "C", "C++"] },
  { label: "Design", color: "#a78bfa", bg: "rgba(167,139,250,0.06)", items: ["Graphics Designing", "Visual Design", "Canva / Adobe Tools"] },
  { label: "Web & Tech", color: "#22d3ee", bg: "rgba(34,211,238,0.06)", items: ["Web Development", "React", "TypeScript", "Next.js"] },
  { label: "Soft Skills", color: "#f472b6", bg: "rgba(244,114,182,0.06)", items: ["Content Writing", "Communication", "Problem Solving", "Research", "Leadership"] },
];

// Give every chip in the "All chips" strip the accent color of the category
// it belongs to, so it stays visually tied to the cards above instead of
// looking like a flat, disconnected list. Falls back to a neutral blue for
// any skill not present in skillCategories.
const skillColorMap: Record<string, string> = {};
skillCategories.forEach((cat) => {
  cat.items.forEach((item) => {
    skillColorMap[item] = cat.color;
  });
});
const fallbackColor = "#60a5fa";

export function Skills() {
  return (
    <section id="skills" style={{ padding: "clamp(4rem, 7vw, 6rem) 0", position: "relative", zIndex: 10 }}>

      <div className="page-container">
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
  style={{ marginBottom: "4rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
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
    }}>Capabilities</span>
    <motion.span
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 100, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      style={{ height: 1, background: "linear-gradient(90deg, #60a5fa, transparent)" }}
    />
  </div>

  {/* Main heading - large, bold, editorial */}
  <h2 style={{
    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
    fontSize: "clamp(3.5rem, 9vw, 7rem)", letterSpacing: "-0.05em",
    lineHeight: 0.95, marginBottom: "1.25rem", color: "#fff",
  }}>
    Tools I think in.
  </h2>

  <p style={{
    color: "rgba(255,255,255,0.4)", fontWeight: 300, fontSize: "0.95rem",
    maxWidth: 440, lineHeight: 1.75, letterSpacing: "0.01em",
  }}>
    Skills built through academics, competitions &amp; real-world work.
  </p>
</motion.div>
        
        <div
  className="grid grid-cols-1 md:grid-cols-2"
  style={{
    gap: "clamp(2rem,5vw,6rem)", alignItems: "start",
    marginBottom: "5rem",
  }}
>

          <SkillsSphere />

          {/* Category cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }} data-stagger>
            {skillCategories.map(cat => (
              <div key={cat.label} className="glass-card rounded-2xl" style={{
                padding: "1.5rem 1.75rem",
                background: cat.bg,
                borderColor: `${cat.color}20`,
                transition: "transform 0.25s, border-color 0.25s", cursor: "none",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateX(6px)";
                  (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}44`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}20`;
                }}
              >
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  marginBottom: "0.85rem",
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: cat.color, boxShadow: `0 0 8px ${cat.color}`,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Space Mono', monospace", fontSize: "0.6rem",
                    letterSpacing: "0.18em", textTransform: "uppercase", color: cat.color,
                  }}>{cat.label}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                  {cat.items.map(skill => (
                    <span key={skill} style={{
                      padding: "0.22rem 0.7rem", borderRadius: 100,
                      border: `1px solid ${cat.color}25`,
                      fontSize: "0.75rem", color: "rgba(255,255,255,0.5)",
                      background: `${cat.color}08`,
                    }}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All chips — colored by category to stay visually tied to the cards above,
            with clearly readable contrast instead of a flat, washed-out list */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", justifyContent: "center" }}>
          {skills.map((skill, i) => {
            const color = skillColorMap[skill] ?? fallbackColor;
            return (
              <span key={skill} style={{
                padding: "0.42rem 1.1rem", borderRadius: 100,
                background: `${color}0f`,
                border: `1px solid ${color}35`,
                fontSize: "0.78rem", fontWeight: 500, color: "rgba(255,255,255,0.72)",
                cursor: "none", transition: "all 0.2s",
                animationDelay: `${i * 0.03}s`,
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${color}22`;
                  el.style.borderColor = color;
                  el.style.color = "#fff";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = `0 6px 18px ${color}25`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${color}0f`;
                  el.style.borderColor = `${color}35`;
                  el.style.color = "rgba(255,255,255,0.72)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >{skill}</span>
            );
          })}
        </div>
      </div>
    </section>
  );
}