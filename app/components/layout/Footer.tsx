"use client";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const iconBtnStyle: React.CSSProperties = {
    width: 38, height: 38, borderRadius: "50%",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    color: "rgba(255,255,255,0.5)", cursor: "none", transition: "all 0.2s",
    fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
  };

  const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.color = "#fff"; el.style.borderColor = "#60a5fa66"; el.style.transform = "translateY(-2px)";
  };
  const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.color = "rgba(255,255,255,0.5)"; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.transform = "translateY(0)";
  };

  return (
    // Extra bottom padding (5.5rem vs the original 2.5rem) keeps this content
    // clear of the fixed-position "Chat with me" / "Enable gestures" widgets
    // that float over the bottom of the viewport when the page is scrolled
    // all the way down.
    <footer style={{
      position: "relative", zIndex: 10,
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "3rem 0 5.5rem",
    }}>
      <div className="page-container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "1.5rem",
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "0.72rem",
          letterSpacing: "0.05em", color: "rgba(255,255,255,0.25)",
        }}>
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &amp; a lot of coffee.
        </div>

        <button
          onClick={scrollTop}
          data-cursor-text="Top"
          className="glass-card"
          style={{ ...iconBtnStyle, border: "1px solid rgba(255,255,255,0.07)", background: "transparent" }}
          onMouseEnter={hoverIn} onMouseLeave={hoverOut}
        >
          <ArrowUp size={15} />
        </button>
      </div>
    </footer>
  );
}