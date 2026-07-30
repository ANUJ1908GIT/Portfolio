"use client";
import { useState, useEffect } from "react";
import { ChatPanel } from "@/app/components/sections/HeroWorkspace/ChatPanel";

export function FloatingChat() {
  const [open, setOpen] = useState(false);

  // Bridge for gesture control (victory sign) - see GestureProvider in page.tsx.
  useEffect(() => {
    const onGestureToggle = () => setOpen((v) => !v);
    window.addEventListener("gesture:toggle-chat", onGestureToggle);
    return () => window.removeEventListener("gesture:toggle-chat", onGestureToggle);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", bottom: 20, left: 20, zIndex: 9990,
          display: "flex", alignItems: "center", gap: 8,
          padding: "12px 18px", borderRadius: 100,
          background: open ? "rgba(167,139,250,0.18)" : "rgba(10,10,18,0.85)",
          border: `1px solid ${open ? "rgba(167,139,250,0.45)" : "rgba(255,255,255,0.12)"}`,
          backdropFilter: "blur(14px)",
          fontFamily: "'Space Mono', monospace", fontSize: "0.68rem",
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: open ? "#a78bfa" : "rgba(255,255,255,0.7)",
          cursor: "pointer", transition: "all 0.25s ease",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <span style={{ fontSize: "1rem", lineHeight: 1 }}>💬</span>
        Chat with me
      </button>

      <ChatPanel
        isOpen={open}
        onClose={() => setOpen(false)}
        onThinking={() => {}}
      />
    </>
  );
}