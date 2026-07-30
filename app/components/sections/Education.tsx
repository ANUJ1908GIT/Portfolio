"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { education } from "@/lib/data";

const palette = ["#60a5fa", "#a78bfa", "#22d3ee"];

// ─── Count-up number, triggers once when scrolled into view ──────────────────
function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display.toFixed(decimals)}{suffix}</span>;
}

// ─── Circular progress ring ────────────────────────────────────────────────
function ProgressRing({ percent, color, size = 92, label }: { percent: number; color: string; size?: number; label?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const r = (size - 10) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg ref={ref} width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={6} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: circumference * (1 - percent / 100) } : {}}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: size > 80 ? "1.05rem" : "0.85rem", color: "#fff", letterSpacing: "-0.02em",
        }}>
          <CountUp value={percent} decimals={percent % 1 !== 0 ? 2 : 0} suffix="%" />
        </span>
        {label && (
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "0.5rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", marginTop: 2,
          }}>{label}</span>
        )}
      </div>
    </div>
  );
}

// ─── Left side: stylized ascending growth trajectory ──────────────────────
const chartNodes = [
  { label: "10th", score: "98.60%", x: 12, y: 82 },
  { label: "12th", score: "93.60%", x: 50, y: 55 },
  { label: "B.Tech", score: "8.59 CGPA", x: 88, y: 18 },
];

function GrowthVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-100px" });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const pathD = `M ${chartNodes[0].x} ${chartNodes[0].y} Q ${(chartNodes[0].x + chartNodes[1].x) / 2} ${chartNodes[0].y}, ${chartNodes[1].x} ${chartNodes[1].y} T ${chartNodes[2].x} ${chartNodes[2].y}`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const floatingLabels = [
    { text: "Consistency", top: "10%", left: "6%", delay: 0 },
    { text: "Growth", top: "36%", left: "40%", delay: 0.6 },
    { text: "Performance", top: "70%", left: "8%", delay: 1.2 },
    { text: "Excellence", top: "6%", right: "8%", delay: 1.8 },
  ];

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      style={{
        position: "relative", width: "100%", height: "clamp(420px, 52vw, 560px)",
        borderRadius: 24, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.05), transparent 55%), #06060c",
}} 
    >
      {/* Mouse-follow glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", transition: "background 0.3s ease",
        background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(96,165,250,0.08), transparent 45%)`,
      }} />

      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.5,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "34px 34px",
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
      }} />

      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="edu-particle" style={{
          left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`,
          animationDelay: `${-i * 1.3}s`, animationDuration: `${9 + (i % 5)}s`,
        }} />
      ))}

      {/* Floating labels */}
      {floatingLabels.map((l) => (
        <motion.div
          key={l.text}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 + l.delay }}
          style={{
            position: "absolute", top: l.top, left: l.left, right: l.right,
            fontFamily: "'Space Mono', monospace", fontSize: "0.6rem",
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)", pointerEvents: "none",
          }}
        >{l.text}</motion.div>
      ))}

      {/* SVG growth line ONLY - nodes are separate HTML divs below, for perfect circles */}
      <svg ref={svgRef} viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="growthLine" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="55%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <motion.path
  d={pathD}
  fill="none" stroke="url(#growthLine)" strokeWidth={0.6}
  strokeLinecap="round" vectorEffect="non-scaling-stroke"
  initial={{ opacity: 0 }}
  animate={inView ? { opacity: 1 } : {}}
  transition={{ duration: 1, ease: "easeOut" }}
  style={{ filter: "drop-shadow(0 0 3px rgba(96,165,250,0.5))" }}
/>
      </svg>

      {/* Nodes as HTML circles - guaranteed round regardless of container aspect ratio */}
      {chartNodes.map((n, i) => {
        const isRight = n.x > 65;
        const isLeft = n.x < 35;
        return (
          <div key={n.label} style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.5 }}
              style={{
                width: 11, height: 11, borderRadius: "50%",
                background: palette[i],
                boxShadow: `0 0 12px 2px ${palette[i]}aa`,
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.5 }}
              style={{
                position: "absolute",
                left: isRight ? "auto" : isLeft ? 0 : "50%",
                right: isRight ? 0 : "auto",
                transform: isLeft ? "none" : isRight ? "none" : "translateX(-50%)",
                top: n.y > 55 ? 18 : "auto",
                bottom: n.y > 55 ? "auto" : 18,
                textAlign: isRight ? "right" : isLeft ? "left" : "center",
                whiteSpace: "nowrap", pointerEvents: "none",
              }}
            >
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: "0.82rem", color: "#fff",
              }}>{n.score}</div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: "0.55rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: palette[i], marginTop: 2,
              }}>{n.label}</div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Right side: floating glass panels ─────────────────────────────────────
function EducationPanel({ item, index }: { item: typeof education[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const color = palette[index % palette.length];
  const isCurrent = index === 0;
  const highScore = index === education.length - 1; // "10th" - near-perfect

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, borderColor: `${color}55` }}
      className="glass-card rounded-2xl"
      style={{
        padding: "1.75rem 2rem",
        position: "relative",
        overflow: "hidden",
        borderColor: isCurrent ? `${color}30` : "rgba(255,255,255,0.07)",
        background: isCurrent
          ? `linear-gradient(135deg, ${color}0a, transparent 60%)`
          : undefined,
        transition: "border-color 0.3s",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${color}, transparent)`, opacity: 0.55,
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
        {/* Left: text info */}
        <div style={{ flex: "1 1 220px", minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: "0.6rem",
              letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
            }}>{item.year}</span>
            {isCurrent && (
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: "0.55rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color, padding: "0.18rem 0.6rem", borderRadius: 100,
                border: `1px solid ${color}33`, background: `${color}0c`,
                display: "inline-flex", alignItems: "center", gap: 4,
              }}><Sparkles size={9} /> Current Program</span>
            )}
          </div>

          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: "1.15rem", letterSpacing: "-0.02em", color: "#fff",
            marginBottom: "0.35rem", lineHeight: 1.3,
          }}>{item.title}</h3>

          <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>{item.org}</div>

          {highScore && (
            <span style={{
              display: "inline-block", marginTop: "0.75rem",
              fontFamily: "'Space Mono', monospace", fontSize: "0.55rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color, padding: "0.2rem 0.6rem", borderRadius: 100,
              border: `1px solid ${color}33`, background: `${color}0c`,
            }}>Near-Perfect · Top Performer</span>
          )}
        </div>

        {/* Right: score visualization */}
        {isCurrent ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", minWidth: 110 }}>
              {item.grades.map((g) => (
                <div key={g.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", fontFamily: "'Space Mono', monospace" }}>{g.label}</span>
                    <span style={{ fontSize: "0.68rem", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{g.value}</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(parseFloat(g.value) / 10) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.3 }}
                      style={{ height: "100%", background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: 2 }}
                    />
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <ArrowUpRight size={12} color="#4ade80" />
                <span style={{ fontSize: "0.62rem", color: "#4ade80", fontFamily: "'Space Mono', monospace" }}>Trending up</span>
              </div>
            </div>
            <ProgressRing percent={parseFloat(item.grades[item.grades.length - 1].value) * 10} color={color} label="CGPA×10" size={84} />
          </div>
        ) : (
          <ProgressRing percent={parseFloat(item.grades[0].value)} color={color} label={item.grades[0].label} size={highScore ? 96 : 84} />
        )}
      </div>
    </motion.div>
  );
}

export function Education() {
  return (
    <section id="education" style={{ padding: "clamp(4rem, 7vw, 6rem) 0", position: "relative", zIndex: 10 }}>
      <div className="section-divider" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="page-container" style={{ width: "100%" }}>
        <motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
  style={{ marginBottom: "3.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
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
  }}>Academic Journey</span>
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
    Education.
  </h2>

  <p style={{
    color: "rgba(255,255,255,0.4)", fontWeight: 300, fontSize: "0.95rem",
    maxWidth: 440, lineHeight: 1.75, letterSpacing: "0.01em",
  }}>
    A consistent trajectory of growth from school to engineering.
  </p>
</motion.div>
        <div className="grid grid-cols-1 md:grid-cols-5" style={{ gap: "2rem", alignItems: "center" }}>
          <div className="md:col-span-2">
            <GrowthVisual />
          </div>
          <div className="md:col-span-3" style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {education.map((item, i) => (
              <EducationPanel key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .edu-particle {
          position: absolute;
          width: 2px; height: 2px; border-radius: 50%;
          background: rgba(150,180,255,0.5);
          animation-name: eduFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes eduFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-18px) translateX(6px); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}