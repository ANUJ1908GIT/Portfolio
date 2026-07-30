"use client";
import { useGesture } from "@/hooks/useGesture";

export function GestureDebugOverlay() {
  const { gesture, isEnabled } = useGesture();
  if (!isEnabled) return null;
  return (
    <div style={{
      position: "fixed", bottom: 150, left: 16, zIndex: 9997,
      padding: "8px 14px", borderRadius: 8,
      background: "rgba(0,0,0,0.7)", color: "#4ade80",
      fontFamily: "monospace", fontSize: "0.85rem",
    }}>
      gesture: {gesture}
    </div>
  );
}