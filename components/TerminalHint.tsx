"use client";
import { useEffect, useState } from "react";

// Discoverability layer for the secret terminal easter egg.
// 1. A styled console.log message for anyone who opens devtools.
// 2. A tiny, low-opacity blinking cursor in the corner for everyone else —
//    subtle enough to stay "secret", but there for the curious to hover.
export function TerminalHint() {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    console.log(
      "%cA hidden feature is available on this page.",
      "color:#60a5fa; font-family: monospace; font-size: 14px; font-weight: bold;"
    );
    console.log(
      "%cPress ~ to access it.",
      "color:#a78bfa; font-family: monospace; font-size: 12px;"
    );
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        top: 90,
        left: 16,
        zIndex: 9996,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontFamily: "'Space Mono', monospace",
        cursor: "default",
      }}
    >
      {hovered && (
        <span
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.45)",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "0.3rem 0.6rem",
            backdropFilter: "blur(6px)",
            whiteSpace: "nowrap",
            animation: "th-fade-in 0.2s ease",
          }}
        >
          Hidden feature — press <strong style={{ color: "#60a5fa" }}>~</strong>
        </span>
      )}
      <span
        style={{
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.18)",
          animation: "th-blink 1.1s steps(1) infinite",
          userSelect: "none",
        }}
      >
        _
      </span>

      <style jsx global>{`
        @keyframes th-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes th-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}