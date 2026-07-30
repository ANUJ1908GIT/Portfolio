"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";

const palette = ["#60a5fa","#a78bfa","#22d3ee"];

function ExperienceItem({ item, index }: { item: typeof experience[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const color = palette[index % palette.length];

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x*4}deg) rotateX(${-y*4}deg) translateX(10px)`;
    el.style.borderColor = `${color}44`;
    el.style.boxShadow = "0 10px 40px rgba(0,0,0,0.25)";
  };
  const onLeave = () => {
    const el = cardRef.current; if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(.25,.46,.45,.94), border-color 0.3s, box-shadow 0.3s";
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateX(0)";
    el.style.borderColor = "rgba(255,255,255,0.07)";
    el.style.boxShadow = "none";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  };

  return (
    <div style={{ position: "relative", paddingBottom: "2.5rem" }}>
      {/* Dot */}
      <div style={{
        position: "absolute", left: "-3.7rem", top: "1.6rem",
        width: 12, height: 12, borderRadius: "50%",
        background: `linear-gradient(135deg, ${color}, #7c3aed)`,
        boxShadow: `0 0 16px ${color}88`,
      }}/>
      {/* Connector */}
      <div style={{
        position: "absolute", left: "-3.14rem", top: "1.98rem",
        width: "1.6rem", height: 1,
        background: `linear-gradient(90deg, ${color}66, transparent)`,
      }}/>

      <div
        ref={cardRef}
        className="glass-card rounded-2xl"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          padding: "2rem 2.25rem",
          cursor: "none", position: "relative", overflow: "hidden",
        }}
      >
        {/* Left border accent */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: `linear-gradient(to bottom, ${color}, transparent)`,
          borderRadius: "2px 0 0 2px",
        }}/>

        {/* Period badge */}
        <div style={{
          display: "inline-flex", alignItems: "center",
          padding: "0.22rem 0.75rem", borderRadius: 100,
          background: `${color}12`,
          border: `1px solid ${color}28`,
          fontFamily: "'Space Mono', monospace", fontSize: "0.58rem",
          letterSpacing: "0.14em", textTransform: "uppercase",
          color, marginBottom: "0.8rem",
        }}>{item.period}</div>

        <div style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: "1.15rem", marginBottom: "0.2rem",
        }}>{item.role}</div>
        <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.9rem" }}>
          {item.company}
        </div>
        <p style={{ fontSize: "0.86rem", lineHeight: 1.75, color: "rgba(255,255,255,0.38)", fontWeight: 300 }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" style={{ padding: "clamp(4rem, 7vw, 6rem) 0", position: "relative", zIndex: 10 }}>
      <div className="page-container" style={{ paddingTop: "6rem" }}>
        <motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
  style={{ marginBottom: "5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
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
    }}>Journey</span>
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
    lineHeight: 0.95, color: "#fff",
  }}>
    Where I&apos;ve<br />been &amp; what I do.
  </h2>
</motion.div>

        <div style={{ position: "relative", paddingLeft: "clamp(2.25rem, 9vw, 3.5rem)" }}>
          {/* Timeline spine */}
          <div id="exp-line" style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 1,
            background: "linear-gradient(to bottom, transparent, #3b82f6 15%, #a78bfa 85%, transparent)",
            transformOrigin: "top", transform: "scaleY(0)",
          }}/>
          {/* Traveling pulse light */}
          <div style={{
            position: "absolute", left: -2.5, width: 5, height: 5, borderRadius: "50%",
            background: "#fff", boxShadow: "0 0 12px 3px #7c3aed, 0 0 4px #fff",
            animation: "travelPulse 4.5s ease-in-out infinite",
          }}/>

          <div data-stagger>
            {experience.map((item, i) => (
              <ExperienceItem key={i} item={item} index={i} />
            ))}
          </div>

          <div className="glass-card rounded-2xl" style={{
            marginTop: "1.5rem", padding: "1.75rem 2rem",
            borderStyle: "dashed", borderColor: "rgba(255,255,255,0.1)",
          }}>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
              Passionate about building impactful digital experiences through web development, graphic design, and continuous learning. Currently strengthening my Data Structures & Algorithms (DSA) skills while developing full-stack projects, and actively seeking opportunities to apply my creativity, problem-solving, and dedication in real-world software development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}