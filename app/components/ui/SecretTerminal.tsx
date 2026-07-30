"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { siteConfig, skills, projects } from "@/lib/data";

interface Line { type: "input" | "output" | "hint"; text: string; }

const HELP_TEXT = [
  "Available commands:",
  "  whoami         - who am I",
  "  skills         - list my skills",
  "  projects       - list my projects",
  "  contact        - get in touch",
  "  resume         - download my resume",
  "  sudo hire anuj - try it",
  "  clear          - clear the screen",
  "  exit           - close this terminal",
].join("\n");

function runCommand(raw: string): { output: string; action?: "clear" | "exit" | "scroll-contact" | "resume" } {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "") return { output: "" };
  if (cmd === "help") return { output: HELP_TEXT };
  if (cmd === "whoami") {
    return { output: `${siteConfig.name} - ${siteConfig.role}\n${siteConfig.tagline}` };
  }
  if (cmd === "skills" || cmd === "skills --list") {
    return { output: skills.join(", ") };
  }
  if (cmd === "projects" || cmd === "ls projects" || cmd === "ls projects/") {
    return { output: projects.map((p) => `${p.id}  ${p.name}  [${p.category}]`).join("\n") };
  }
  if (cmd === "contact") {
    return { output: `Email: ${siteConfig.email}\nGitHub: ${siteConfig.github}\nLinkedIn: ${siteConfig.linkedin}` };
  }
  if (cmd === "resume") {
    return { output: "Opening resume...", action: "resume" };
  }
  if (cmd === "sudo hire anuj") {
    return { output: "Permission granted.\nRedirecting to contact section...", action: "scroll-contact" };
  }
  if (cmd === "clear") return { output: "", action: "clear" };
  if (cmd === "exit") return { output: "Goodbye.", action: "exit" };

  return { output: `command not found: ${raw}\nType 'help' for available commands.` };
}

export function SecretTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: `${siteConfig.name.toUpperCase()}.OS - hidden terminal` },
    { type: "hint", text: "→ type 'help' to see what you can do" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping = ["INPUT", "TEXTAREA"].includes(target.tagName) || target.isContentEditable;
      if (e.key === "`" && !isTyping) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const submit = useCallback(() => {
    const raw = input;
    setInput("");
    const { output, action } = runCommand(raw);

    if (action === "clear") {
      setLines([]);
      return;
    }
    setLines((prev) => [
      ...prev,
      { type: "input", text: raw },
      ...(output ? [{ type: "output" as const, text: output }] : []),
    ]);

    if (action === "exit") setTimeout(() => setOpen(false), 400);
    if (action === "resume") window.open("/ANUJ_RESUME.pdf", "_blank");
    if (action === "scroll-contact") {
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      }, 600);
    }
  }, [input]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: "rgba(0,0,0,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem",
      }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(640px, 100%)", maxHeight: "70vh",
          background: "#000",
          border: "1px solid rgba(0,255,65,0.3)",
          borderRadius: 8,
          boxShadow: "0 0 60px rgba(0,255,65,0.15)",
          display: "flex", flexDirection: "column",
          fontFamily: "'JetBrains Mono', 'Space Mono', monospace",
          overflow: "hidden",
        }}
      >
        <div style={{
          padding: "8px 14px", borderBottom: "1px solid rgba(0,255,65,0.2)",
          fontSize: 11, color: "rgba(0,255,65,0.5)", letterSpacing: "0.05em",
          display: "flex", justifyContent: "space-between",
        }}>
          <span>{siteConfig.name.toUpperCase()}.OS TERMINAL</span>
          <span style={{ opacity: 0.6 }}>esc to close</span>
        </div>
        <div ref={scrollRef} style={{
          flex: 1, overflowY: "auto", padding: "12px 14px",
          fontSize: 13, lineHeight: 1.6, color: "#00ff41",
          whiteSpace: "pre-wrap",
        }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              marginBottom: 6,
              color: l.type === "hint" ? "#ffd76a" : undefined,
              fontStyle: l.type === "hint" ? "italic" : undefined,
            }}>
              {l.type === "input" ? <span><span style={{ opacity: 0.5 }}>{"> "}</span>{l.text}</span> : l.text}
            </div>
          ))}
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 14px", borderTop: "1px solid rgba(0,255,65,0.15)",
        }}>
          <span style={{ color: "#00ff41", fontSize: 13 }}>{">"}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            placeholder="type 'help' to see what I can do..."
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "#00ff41", fontFamily: "inherit", fontSize: 13,
            }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}