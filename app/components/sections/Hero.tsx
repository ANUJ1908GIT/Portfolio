"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { roles, siteConfig } from "@/lib/data";

export function Hero() {
  const rolesRef = useRef<HTMLDivElement>(null);
  const currentRole = useRef(0);

  useEffect(() => {
    const roleEls = rolesRef.current?.querySelectorAll<HTMLElement>(".role-item");
    if (!roleEls || roleEls.length === 0) return;
    roleEls.forEach((el, i) => {
      if (i > 0) {
        el.style.position = "absolute";
        el.style.top = "0"; el.style.left = "0";
        el.style.opacity = "0"; el.style.visibility = "hidden";
      }
    });
    const interval = setInterval(() => {
      const prev = currentRole.current;
      const next = (prev + 1) % roleEls.length;
      currentRole.current = next;
      const prevEl = roleEls[prev], nextEl = roleEls[next];
      prevEl.style.transition = "opacity 0.35s ease, transform 0.35s ease";
      prevEl.style.opacity = "0"; prevEl.style.transform = "translateY(-24px)";
      setTimeout(() => { prevEl.style.visibility = "hidden"; prevEl.style.position = "absolute"; }, 350);
      nextEl.style.visibility = "visible"; nextEl.style.position = "relative";
      nextEl.style.transform = "translateY(24px)"; nextEl.style.opacity = "0";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        nextEl.style.transition = "opacity 0.45s ease, transform 0.45s cubic-bezier(.25,.46,.45,.94)";
        nextEl.style.opacity = "1"; nextEl.style.transform = "translateY(0)";
      }));
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: "100svh",
      display: "flex",
      alignItems: "center",
      padding: "0 6vw",
      position: "relative",
      overflow: "hidden",
      zIndex: 2,
    }}>
      <div style={{
        width: "100%",
        maxWidth: 820,
        margin: "0 auto",
        paddingTop: 100,
        paddingBottom: 60,
      }}>
        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.55rem",
          padding: "0.38rem 1rem", borderRadius: 100,
          background: "rgba(59,130,246,0.07)",
          border: "1px solid rgba(59,130,246,0.18)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.68rem", letterSpacing: "0.14em",
          textTransform: "uppercase", color: "#60a5fa",
          marginBottom: "2rem",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#60a5fa",
            boxShadow: "0 0 8px #60a5fa",
            display: "inline-block",
            animation: "scrollPulse 2s ease infinite",
          }} />
          Open to Opportunities · IET Lucknow &apos;28
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          lineHeight: 0.90,
          letterSpacing: "-0.045em",
          marginBottom: "1.8rem",
          fontSize: "clamp(3.2rem, 8vw, 8rem)",
        }}>
          <span style={{ display: "block", color: "#fff" }}>ANUJ</span>
          <span style={{
            display: "block",
            background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #22d3ee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>AGRAWAL</span>
        </h1>

        {/* Role ticker */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.65rem",
          marginBottom: "2rem",
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
          fontSize: "clamp(0.95rem, 2vw, 1.5rem)",
          height: "2rem", overflow: "hidden",
        }}>
          <span style={{ color: "rgba(255,255,255,0.22)", whiteSpace: "nowrap", flexShrink: 0 }}>
            I&apos;m a
          </span>
          <span style={{
            width: 1, height: "1.1em",
            background: "rgba(59,130,246,0.5)",
            display: "inline-block", flexShrink: 0,
          }} />
          <div ref={rolesRef} style={{ position: "relative", overflow: "hidden", flex: 1 }}>
            {roles.map((role, i) => (
              <span key={role} className="role-item" style={{
                display: "block", color: "#fff", whiteSpace: "nowrap",
                position: i === 0 ? "relative" : "absolute",
                top: 0, left: 0,
                visibility: i === 0 ? "visible" : "hidden",
                opacity: i === 0 ? 1 : 0,
              }}>{role}</span>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <p style={{
          color: "rgba(255,255,255,0.35)", fontWeight: 300,
          lineHeight: 1.8, marginBottom: "2.5rem",
          maxWidth: 460,
          fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
          borderLeft: "2px solid rgba(59,130,246,0.3)",
          paddingLeft: "1rem",
        }}>
          {siteConfig.tagline}
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: "0.75rem", flexWrap: "wrap",
        }}>
          <Button href="#projects" variant="primary">
            View My Work <ArrowRight size={14} />
          </Button>
          <Button href={`mailto:${siteConfig.email}`} variant="secondary">
            <Mail size={14} /> Contact
          </Button>
          <Button href="/ANUJ_RESUME.pdf" variant="secondary">
            <Download size={14} /> Resume
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.6rem",
        color: "rgba(255,255,255,0.15)",
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.58rem",
        letterSpacing: "0.2em",
      }}>
        <div style={{
          width: 1, height: 48,
          background: "linear-gradient(to bottom, rgba(59,130,246,0.4), transparent)",
          animation: "scrollPulse 2.5s ease infinite",
        }} />
        <span style={{ textTransform: "uppercase" }}>Scroll</span>
      </div>

      {/* Fade-in from CoverPage above - softens the section boundary */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 1,
          height: "300px",
          background: "linear-gradient(to bottom, #000000, transparent)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}