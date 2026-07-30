"use client";
import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, gx: 0, gy: 0 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      const dot = dotRef.current;
      if (dot) {
        dot.style.left = e.clientX + "px";
        dot.style.top = e.clientY + "px";
      }
      const lab = labelRef.current;
      if (lab) {
        lab.style.left = e.clientX + "px";
        lab.style.top = e.clientY + "px";
      }
    };

    document.addEventListener("mousemove", onMove);

    const tick = () => {
      pos.current.gx += (pos.current.x - pos.current.gx) * 0.08;
      pos.current.gy += (pos.current.y - pos.current.gy) * 0.08;
      const glow = glowRef.current;
      if (glow) {
        glow.style.left = pos.current.gx + "px";
        glow.style.top = pos.current.gy + "px";
      }
      requestAnimationFrame(tick);
    };
    tick();

    const interactives = "a, button, .magnetic, .counter-card, .ach-card, .skill-chip, [data-cursor], [data-cursor-text]";

    const addHover = (e: Event) => {
      document.body.classList.add("cursor-hover");
      const target = e.currentTarget as HTMLElement;
      const text = target.getAttribute("data-cursor-text");
      if (text) setLabel(text);
    };
    const removeHover = () => {
      document.body.classList.remove("cursor-hover");
      setLabel(null);
    };

    const attach = () => {
      document.querySelectorAll(interactives).forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    };
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        id="cursor"
        style={{
          position: "fixed",
          width: 12,
          height: 12,
          background: "#fff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.1s ease, background 0.2s ease, opacity 0.2s ease",
          mixBlendMode: "difference",
          opacity: label ? 0 : 1,
        }}
      />
      <div
        ref={labelRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          padding: "0.4rem 0.9rem",
          borderRadius: 100,
          background: "rgba(255,255,255,0.95)",
          color: "#000",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.62rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          opacity: label ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        {label}
      </div>
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          width: 400,
          height: 400,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9990,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />
    </>
  );
}