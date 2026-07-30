"use client";
import { useState } from "react";
import { useGesture } from "@/hooks/useGesture";

const GESTURE_INFO = [
  { emoji: "✌️", label: "Victory", action: "Opens the AI Assistant" },
  { emoji: "👍", label: "Thumbs Up", action: "Jumps to Contact section" },
];

export function GestureToggleButton() {
  const { isEnabled, isLoading, error, enableGestureControl, disableGestureControl } = useGesture();
  const [showInfoBox, setShowInfoBox] = useState(false);

  const handleClick = () => {
    if (isEnabled) {
      disableGestureControl();
    } else {
      setShowInfoBox(true); // show guide first, camera opens only after OK
    }
  };

  const handleConfirm = () => {
    setShowInfoBox(false);
    enableGestureControl(); // NOW the camera actually opens
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        style={{
          position: "fixed", bottom: 16, right: 16, zIndex: 9997,
          padding: "10px 16px", borderRadius: 100,
          background: isEnabled ? "rgba(74,222,128,0.15)" : "rgba(0,0,0,0.5)",
          border: `1px solid ${isEnabled ? "#4ade80" : "rgba(255,255,255,0.15)"}`,
          color: isEnabled ? "#4ade80" : "#fff",
          fontFamily: "'Space Mono', monospace", fontSize: "0.7rem",
          backdropFilter: "blur(10px)", cursor: "pointer",
        }}
      >
        {isLoading ? "Starting camera…" : isEnabled ? "🖐️ Gestures ON" : "🖐️ Enable gestures"}
        {error && <div style={{ color: "#f87171", fontSize: "0.6rem", marginTop: 4 }}>{error}</div>}
      </button>

      {/* ── Info box — shown BEFORE camera opens ── */}
      {showInfoBox && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setShowInfoBox(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 300,
              padding: "1.4rem",
              borderRadius: 18,
              background: "rgba(15,15,20,0.95)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(16px)",
              fontFamily: "'Space Mono', monospace",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                color: "#4ade80",
                marginBottom: "0.9rem",
              }}
            >
              🖐️ GESTURE CONTROLS
            </div>

            {GESTURE_INFO.map((g) => (
              <div
                key={g.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.7rem",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: "0.65rem",
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>{g.emoji}</span>
                <span>
                  <strong style={{ color: "#fff" }}>{g.label}</strong> — {g.action}
                </span>
              </div>
            ))}

            <div
              style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.4)",
                marginTop: "1rem",
                marginBottom: "1.3rem",
                lineHeight: 1.6,
              }}
            >
              This will turn on your camera to detect hand gestures. Nothing is recorded or sent anywhere.
            </div>

            <div style={{ display: "flex", gap: "0.6rem" }}>
              <button
                onClick={() => setShowInfoBox(false)}
                style={{
                  flex: 1,
                  padding: "0.55rem",
                  borderRadius: 10,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.72rem",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  flex: 1,
                  padding: "0.55rem",
                  borderRadius: 10,
                  background: "#4ade80",
                  border: "1px solid #4ade80",
                  color: "#0a0a0a",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                OK, Enable
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}