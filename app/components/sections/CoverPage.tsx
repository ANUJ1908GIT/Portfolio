"use client";
import Image from "next/image";
import { siteConfig } from "@/lib/data";

export function CoverPage() {
  return (
    <section
      id="cover"
      style={{
        position: "relative",
        minHeight: "92svh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 2,
      }}
    >
      {/* ── Full-bleed background photo ── */}
      <Image
  src="/cover-bg.png"
  alt=""
  fill
  priority
  style={{ objectFit: "cover", objectPosition: "center 8%", zIndex: 0 }}
/>

      {/* ── Color-grade overlay - pulls the photo into your site's blue/purple palette ── */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(135deg, rgba(10,10,20,0.55), rgba(30,15,50,0.35) 55%, rgba(10,10,20,0.6))",
          mixBlendMode: "multiply",
        }}
      />

      {/* ── Legibility gradient - darkens top and bottom for text contrast ── */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 12%, rgba(0,0,0,0.1) 32%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.75) 85%, #000000 100%)",
        }}
      />

      {/* ── Content ── */}
      <div style={{
        position: "relative", zIndex: 3,
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100svh",
        padding: "clamp(1.5rem, 4vw, 3rem) 6vw clamp(3rem, 7vw, 5rem)",
      }}>
        {/* ── Top bar ── */}
        <div style={{
          display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: "0.75rem",
            letterSpacing: "0.2em", color: "#a78bfa",
          }}>2026</div>
        </div>

        {/* ── Bottom row ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "1.5rem", alignItems: "end" }}
        >
          {/* Bottom-left */}
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: "0.62rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#22d3ee", marginBottom: "0.6rem",
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}>Creative</div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em",
              color: "#fff", marginBottom: "0.9rem", lineHeight: 1.1,
              textShadow: "0 4px 24px rgba(0,0,0,0.7)",
            }}>Full Stack<br />Developer.</h2>
            <p style={{
              fontSize: "0.9rem", lineHeight: 1.7,
              color: "rgba(255,255,255,0.75)", maxWidth: 340,
              marginBottom: "1.2rem",
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}>
              {siteConfig.tagline}
            </p>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontStyle: "italic",
              fontSize: "1.3rem", color: "#60a5fa", marginBottom: "0.2rem",
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}>{siteConfig.name}</div>
          </div>

          {/* Bottom-right */}
          <div className="flex flex-col items-start md:items-end">
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "rgba(255,255,255,0.85)",
              marginBottom: "1rem", lineHeight: 1.4,
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}>
              Design that inspires.<br />Code that performs.
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}>
              📍 {siteConfig.location} · Available Worldwide
            </div>
          </div>
        </div>
      </div>
      {/* Seamless handoff into the next section - fades any remaining edge into pure black */}
<div
  aria-hidden
  style={{
    position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
    height: "380px",
    background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.75) 60%, #000000 100%)",
    pointerEvents: "none",
  }}
/>
    </section>
  );
}