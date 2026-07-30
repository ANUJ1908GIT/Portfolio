"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

// ─── Boot line definitions ────────────────────────────────────────────────────
interface BootLine {
  text: string;
  color: string;
  charSpeed: number; // ms per character
  pause: number;     // ms to wait before this line starts
  canGlitch?: boolean;
}

const LINES: BootLine[] = [
  { text: "> Initializing kernel...",         color: "#60a5fa", charSpeed: 26, pause: 0,   canGlitch: true  },
  { text: "> Mounting filesystem...",          color: "#60a5fa", charSpeed: 22, pause: 110                  },
  { text: "> Loading portfolio modules...",   color: "#22d3ee", charSpeed: 20, pause: 90,  canGlitch: true  },
  { text: "> Compiling components...",        color: "#a78bfa", charSpeed: 18, pause: 70                   },
  { text: "> Establishing connection...",     color: "#60a5fa", charSpeed: 22, pause: 130, canGlitch: true  },
  { text: "> Injecting styles...",            color: "#22d3ee", charSpeed: 24, pause: 80                   },
  { text: "> All systems operational.",       color: "#60a5fa", charSpeed: 28, pause: 180                  },
];

// Number of horizontal strips used for the exit wipe
const STRIP_COUNT = 22;

// ─── Per-line typing hook ─────────────────────────────────────────────────────
function useTypedLine(text: string, active: boolean, onDone: () => void): string {
  const [typed, setTyped] = useState("");
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active) return;
    doneRef.current = false;
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        if (!doneRef.current) { doneRef.current = true; onDone(); }
      }
    }, LINES.find(l => l.text === text)?.charSpeed ?? 24);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return typed;
}

// ─── Single rendered line ─────────────────────────────────────────────────────
function TermLine({
  line, active, visible, glitching, onDone,
}: {
  line: BootLine;
  active: boolean;
  visible: boolean;
  glitching: boolean;
  onDone: () => void;
}) {
  const typed = useTypedLine(line.text, active, onDone);
  if (!visible) return null;

  return (
    <div style={{
      display:       "flex",
      alignItems:    "baseline",
      gap:           0,
      marginBottom:  7,
      lineHeight:    1.55,
      position:      "relative",
    }}>
      <span style={{
        color:        line.color,
        fontSize:     14,
        fontFamily:   "'JetBrains Mono', 'Space Mono', 'Courier New', monospace",
        letterSpacing:"0.03em",
        textShadow:   glitching
          ? "-2px 0 0 rgba(255,0,0,0.85), 2px 0 0 rgba(0,255,255,0.85)"
          : "none",
        filter:       glitching ? "brightness(1.4)" : "none",
        transition:   "text-shadow 0.05s, filter 0.05s",
      }}>
        {typed}
      </span>
      {active && (
        <span style={{
          display:      "inline-block",
          width:        8,
          height:       14,
          background:   "#60a5fa",
          marginLeft:   2,
          verticalAlign:"middle",
          boxShadow:    "0 0 6px rgba(96,165,250,0.9)",
          animation:    "termBlink 0.85s step-end infinite",
          flexShrink:   0,
        }} />
      )}
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ progress }: { progress: number }) {
  const filled  = Math.round((progress / 100) * 28);
  const empty   = 28 - filled;
  const display = Math.round(progress);
  return (
    <div style={{
      marginTop:     14,
      fontFamily:    "'JetBrains Mono', 'Space Mono', 'Courier New', monospace",
      fontSize:      13,
      letterSpacing: "0.02em",
      color:         "#60a5fa",
      textShadow:    "0 0 8px rgba(96,165,250,0.6)",
      userSelect:    "none",
    }}>
      {"["}
      <span style={{ color: "#60a5fa" }}>{"█".repeat(filled)}</span>
      <span style={{ color: "rgba(96,165,250,0.25)" }}>{"░".repeat(empty)}</span>
      {`] ${String(display).padStart(3, " ")}%`}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [activeLine, setActiveLine]   = useState(0);
  const [doneLines,  setDoneLines]    = useState<Set<number>>(new Set());
  const [glitching,  setGlitching]    = useState<number | null>(null);
  const [progress,   setProgress]     = useState(0);

  const rootRef    = useRef<HTMLDivElement>(null);
  const stripsRef  = useRef<HTMLDivElement>(null);
  const flashRef   = useRef<HTMLDivElement>(null);
  const calledDone = useRef(false);

  // Animate progress bar as lines complete
  useEffect(() => {
    const target = (doneLines.size / LINES.length) * 100;
    let raf: number;
    const step = () => {
      setProgress(p => {
        const next = p + (target - p) * 0.12;
        if (Math.abs(next - target) < 0.5) return target;
        raf = requestAnimationFrame(step);
        return next;
      });
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [doneLines.size]);

  // Occasional random glitch on glitch-eligible lines
  const triggerGlitch = useCallback((idx: number) => {
    if (!LINES[idx].canGlitch) return;
    if (Math.random() > 0.45) return; // only ~55% of the time
    setGlitching(idx);
    setTimeout(() => setGlitching(null), 80 + Math.random() * 120);
    // Sometimes double-flash
    if (Math.random() > 0.5) {
      setTimeout(() => {
        setGlitching(idx);
        setTimeout(() => setGlitching(null), 60);
      }, 250 + Math.random() * 200);
    }
  }, []);

  // Exit: glitch flicker → horizontal strip wipe → black → onComplete
  const runExit = useCallback(() => {
    if (calledDone.current) return;
    calledDone.current = true;

    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    // 1) Brief content flicker
    tl.to(rootRef.current, {
      opacity: 0.6, duration: 0.04, yoyo: true, repeat: 3, ease: "none",
    }, "+=0.25");

    // 2) Strips wipe in - scanline-style, alternating left/right
    const strips = stripsRef.current
      ? Array.from(stripsRef.current.children) as HTMLElement[]
      : [];
    tl.set(strips, { scaleX: 0, opacity: 1 });
    strips.forEach((strip, i) => {
      const fromRight = i % 2 === 0;
      tl.to(strip, {
        scaleX:         1,
        transformOrigin: fromRight ? "right center" : "left center",
        duration:       0.06,
        ease:           "power2.in",
      }, `wipe+=${i * 0.022}`);
    });

    // 3) Flash blue then snap to black
    tl.to(flashRef.current, {
      opacity: 1, duration: 0.07, ease: "none",
    }, "wipe+=0.35");
    tl.to(flashRef.current, {
      background: "#000", duration: 0.001,
    });
    tl.to(rootRef.current, { opacity: 1, duration: 0.001 });
  }, [onComplete]);

  // Skip on click or keypress
  useEffect(() => {
    const skip = () => runExit();
    window.addEventListener("click", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [runExit]);

  // Advance to next line after current finishes
  const handleLineDone = useCallback((idx: number) => {
    setDoneLines(prev => new Set(prev).add(idx));
    triggerGlitch(idx);

    if (idx < LINES.length - 1) {
      setTimeout(() => setActiveLine(idx + 1), LINES[idx + 1].pause);
    } else {
      runExit();
    }
  }, [triggerGlitch, runExit]);

  const progressPct = (doneLines.size / LINES.length) * 100;
  void progressPct;

  return (
    <div
      ref={rootRef}
      style={{
        position:   "fixed",
        inset:      0,
        zIndex:     9999,
        background: "#000",
        overflow:   "hidden",
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* CRT scanlines */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
        pointerEvents: "none",
        zIndex:     2,
      }} />

      {/* Ambient blue/purple screen glow - echoes the site's aurora background */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(96,165,250,0.05) 0%, rgba(167,139,250,0.025) 45%, transparent 70%)",
        pointerEvents: "none",
        zIndex:     1,
      }} />

      {/* Screen vignette */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)",
        pointerEvents: "none",
        zIndex:     3,
      }} />

      {/* Terminal content */}
      <div style={{
        position:  "relative",
        zIndex:    10,
        width:     "min(640px, 88vw)",
        padding:   "0 0 0 0",
      }}>
        {/* Header */}
        <div style={{
          marginBottom:  28,
          fontFamily:    "'JetBrains Mono', 'Space Mono', 'Courier New', monospace",
          fontSize:      11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "rgba(96,165,250,0.45)",
          borderBottom:  "1px solid rgba(96,165,250,0.14)",
          paddingBottom: 12,
          display:       "flex",
          justifyContent:"space-between",
          alignItems:    "center",
        }}>
          <span>ANUJ.OS  v2.0.1</span>
          <span style={{ color: "rgba(96,165,250,0.25)", fontSize: 10 }}>
            {new Date().getFullYear()}-07-12 / BOOT
          </span>
        </div>

        {/* Lines */}
        <div>
          {LINES.map((line, i) => (
            <TermLine
              key={i}
              line={line}
              active={activeLine === i && !doneLines.has(i)}
              visible={i <= activeLine}
              glitching={glitching === i}
              onDone={() => handleLineDone(i)}
            />
          ))}
        </div>

        {/* Progress bar */}
        <ProgressBar progress={progress} />
      </div>

      {/* Skip hint */}
      <div style={{
        position: "absolute", bottom: 20, right: 24, zIndex: 10,
        fontFamily: "'JetBrains Mono', 'Space Mono', 'Courier New', monospace",
        fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
        color: "rgba(96,165,250,0.35)", pointerEvents: "none",
      }}>
        click or press any key to skip
      </div>

      {/* Wipe strips - rendered but invisible until exit */}
      <div
        ref={stripsRef}
        style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}
        aria-hidden
      >
        {Array.from({ length: STRIP_COUNT }).map((_, i) => (
          <div
            key={i}
            style={{
              position:  "absolute",
              left:      0,
              right:     0,
              top:       `${(i / STRIP_COUNT) * 100}%`,
              height:    `${100 / STRIP_COUNT + 0.1}%`,
              background:"linear-gradient(135deg, #3b82f6, #7c3aed)",
              opacity:   0,
              transformOrigin: i % 2 === 0 ? "right center" : "left center",
            }}
          />
        ))}
      </div>

      {/* Full-screen flash layer for the final wipe-to-black */}
      <div
        ref={flashRef}
        style={{
          position:   "absolute",
          inset:      0,
          background: "radial-gradient(circle at center, rgba(124,58,237,0.4) 0%, rgba(59,130,246,0.22) 60%, rgba(59,130,246,0.1) 100%)",
          opacity:    0,
          zIndex:     30,
          pointerEvents: "none",
        }}
        aria-hidden
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        @keyframes termBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
      `}</style>
    </div>
  );
}