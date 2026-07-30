"use client";
import { useRef, useState, useLayoutEffect } from "react";
import { ExternalLink, GitBranch, Clock, ArrowUpRight } from "lucide-react";
import { projects, siteConfig } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";

const accentLines = ["#3b82f6", "#a78bfa", "#22d3ee"];

function ProjectStackCard({
  project, index, headerRef,
}: {
  project: typeof projects[0];
  index: number;
  headerRef?: React.Ref<HTMLDivElement>;
}) {
  const visualRef = useRef<HTMLAnchorElement>(null);
  const isComingSoon = project.category === "Coming Soon";
  const color = accentLines[index % accentLines.length];

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = visualRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) scale(1.01)`;
  };
  const onLeave = () => {
    const el = visualRef.current; if (!el) return;
    el.style.transition = "transform 0.55s cubic-bezier(.25,.46,.45,.94)";
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 550);
  };

  return (
    <div style={{
      width: "100%",
      borderRadius: 28,
      overflow: "hidden",
      background: "linear-gradient(180deg, #0a0a12, #050508)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
    }}>
      {/* Header strip - the part that stays visible once "collapsed" */}
      <div
        ref={headerRef}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.1rem 1.6rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "#0a0a12",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
            fontSize: "1.7rem", color: "#fff", lineHeight: 1,
          }}>{project.id}</span>
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: "0.6rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}>{project.category}</div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: "0.95rem", color: "rgba(255,255,255,0.75)",
            }}>{project.name}</div>
          </div>
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          padding: "0.4rem 0.95rem", borderRadius: 100,
          border: `1px solid ${isComingSoon ? "rgba(255,255,255,0.15)" : color + "50"}`,
          fontFamily: "'Space Mono', monospace", fontSize: "0.62rem",
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: isComingSoon ? "rgba(255,255,255,0.4)" : color,
        }}>
          {isComingSoon ? <><Clock size={11} /> Coming Soon</> : <>● Live Project</>}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
        <a
          ref={visualRef}
  href={isComingSoon ? undefined : project.demoUrl}
  target={isComingSoon ? undefined : "_blank"}
  rel={isComingSoon ? undefined : "noopener noreferrer"}
  onMouseMove={onMove}
  onMouseLeave={onLeave}
  data-cursor-text={isComingSoon ? "Coming Soon" : "View Project"}
  style={{
    position: "relative", minHeight: "56vh", cursor: "none",
    display: "block", pointerEvents: isComingSoon ? "none" : "auto",
    background: isComingSoon ? "linear-gradient(160deg, #0a0a12, #06060a)" : undefined,
  }}
>
  <div style={{
    position: "absolute", inset: 0, opacity: 0.3, zIndex: 1,
    background: `radial-gradient(circle at 30% 30%, ${project.accentColor}, transparent 65%)`,
  }} />
  {isComingSoon ? (
    <div style={{
      position: "absolute", inset: 0, zIndex: 2,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid ${color}33`, background: `${color}0c`,
      }}>
        <Clock size={30} color={color} strokeWidth={1.5} />
      </div>
    </div>
  ) : (
    <Image src="/civicpulse.png" alt={project.name} fill style={{ objectFit: "cover" }} />
  )}
</a>

        <div style={{ padding: "2rem 2.1rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{
            fontSize: "0.86rem", lineHeight: 1.75,
            color: "rgba(255,255,255,0.5)", fontWeight: 300,
            marginBottom: "1.25rem",
          }}>
            {isComingSoon
              ? "I'm currently documenting this project. Check back soon for the full case study, screenshots, and links."
              : project.description}
          </p>

          {!isComingSoon && (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
    {project.tags.slice(0, 5).map((tag) => (
      <span key={tag} style={{
        padding: "0.22rem 0.7rem", borderRadius: 100,
        border: `1px solid ${color}22`, background: `${color}08`,
        fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
      }}>{tag}</span>
    ))}
  </div>
)}

          <div style={{ display: "flex", gap: "0.6rem" }}>
            {[
              { icon: ExternalLink, label: isComingSoon ? "Link Soon" : "Live Demo", href: project.demoUrl },
              { icon: GitBranch, label: isComingSoon ? "Repo Soon" : "GitHub", href: project.githubUrl },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={isComingSoon ? undefined : href}
                className="glass-card"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.5rem 1rem", borderRadius: 100,
                  fontSize: "0.75rem", color: isComingSoon ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  pointerEvents: isComingSoon ? "none" : "auto",
                  cursor: isComingSoon ? "not-allowed" : "none",
                }}
              ><Icon size={12} /> {label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const firstHeaderRef = useRef<HTMLDivElement>(null);
  const [headerH, setHeaderH] = useState(80);
  const [baseTop, setBaseTop] = useState(90);

  useLayoutEffect(() => {
    const measure = () => {
      if (firstHeaderRef.current) {
        setHeaderH(firstHeaderRef.current.getBoundingClientRect().height);
      }
      const nav = document.getElementById("main-header");
      if (nav) {
        setBaseTop(nav.getBoundingClientRect().height);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="projects" style={{ padding: "clamp(4rem, 7vw, 6rem) 0", position: "relative", zIndex: 10 }}>
      <div className="section-divider" />
      <div className="page-container" style={{ paddingTop: "6rem", marginBottom: "4rem" }}>
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
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
      }}>My Work</span>
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
      Projects &amp; builds.
    </h2>

    <p style={{
      color: "rgba(255,255,255,0.4)", fontWeight: 300, fontSize: "0.95rem",
      maxWidth: 480, lineHeight: 1.75, letterSpacing: "0.01em",
    }}>
      A collection of projects focused on full-stack development, AI-powered applications, and solving real-world problems.
    </p>
  </motion.div>
</div>

      <div className="page-container" style={{ position: "relative" }}>
        {projects.map((p, i) => (
          <div
            key={p.id}
            style={{
              position: "sticky",
              top: `${baseTop + i * headerH}px`,
              zIndex: i + 1,
              marginBottom: i === projects.length - 1 ? 0 : "-1px",
            }}
          >
            <ProjectStackCard
              project={p}
              index={i}
              headerRef={i === 0 ? firstHeaderRef : undefined}
            />
          </div>
        ))}
      </div>

      <div className="page-container" style={{ paddingTop: "5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            padding: "2.2rem 2.6rem",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            backdropFilter: "blur(10px)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#60a5fa",
                marginBottom: "0.5rem",
              }}
            >
              Beyond this list
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              Explore more projects on GitHub
            </div>
          </div>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.6rem",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "#fff",
              textDecoration: "none",
              cursor: "none",
              transition: "border-color 0.2s, background 0.2s, transform 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#60a5fa";
              el.style.background = "rgba(96,165,250,0.14)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.18)";
              el.style.background = "rgba(255,255,255,0.06)";
              el.style.transform = "translateY(0)";
            }}
          >
            <GitBranch size={15} /> GitHub Profile <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}