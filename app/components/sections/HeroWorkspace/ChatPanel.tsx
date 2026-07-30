"use client";

import { useEffect, useRef, useState, useCallback, KeyboardEvent } from "react";

interface Message { role: "user" | "assistant"; content: string; }

const WELCOME: Message = {
  role: "assistant",
  content: "Hey! I'm Anuj's AI assistant. Ask me anything about his background, skills, projects, or how to get in touch. I'll answer as if I were him 👋",
};

const PRESETS = [
  "What projects has he built?",
  "What are his key skills?",
  "How do I get in touch?",
  "What's he currently working on?",
];

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onThinking: (thinking: boolean) => void;
}

export function ChatPanel({ isOpen, onClose, onThinking }: ChatPanelProps) {
  const [messages,   setMessages]   = useState<Message[]>([WELCOME]);
  const [input,      setInput]      = useState("");
  const [loading,    setLoading]    = useState(false);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
  if (isOpen) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 350);
}, [isOpen]);

  const send = useCallback(async (presetText?: string) => {
    const text = (presetText ?? input).trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);
    onThinking(true);

    // Placeholder assistant message that we'll stream into
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Send the actual conversation (skip the static welcome for API calls after the first)
          messages: history.slice(1).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages(prev => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last.role === "assistant") {
            next[next.length - 1] = { ...last, content: last.content + chunk };
          }
          return next;
        });
      }
    }catch (err) {
  console.error("Chat error:", err);

  setMessages(prev => {
    const next = [...prev];

    next[next.length - 1] = {
      role: "assistant",
      content:
        "⚠️ Sorry, I couldn't reach the AI right now. Please try again in a moment.",
    };

    return next;
  });
}
finally {
  setLoading(false);
  onThinking(false);
}
  }, [input, loading, messages, onThinking]);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }, [send]);

  return (
    <div
      onPointerDown={e => e.stopPropagation()}
      onPointerMove={e => e.stopPropagation()}
      onPointerUp={e => e.stopPropagation()}
      style={{
  position:   "fixed",
  right:      16,
  top:        88,
  width:      "min(380px, calc(100% - 32px))",
maxHeight:  "min(560px, calc(100vh - 120px))",
  zIndex:     9995,
  borderRadius: 20,
  transform:  isOpen ? "translateX(0)" : "translateX(calc(110% + 16px))",
  transition: "transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)",
  display:    "flex",
  flexDirection: "column",
  background: "rgba(4,6,14,0.97)",
  border: "1px solid rgba(167,139,250,0.18)",
  backdropFilter: "blur(28px)",
  boxShadow:  "0 20px 60px rgba(0,0,0,0.6), inset 1px 0 0 rgba(255,255,255,0.03)",
}}
    >
      {/* Header */}
      <div style={{
        display:      "flex", alignItems: "center", justifyContent: "space-between",
        padding:      "14px 16px 12px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        flexShrink:   0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Avatar */}
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #4da3ff)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, flexShrink: 0,
            boxShadow: "0 0 10px rgba(124,58,237,0.4)",
          }}>
            AA
          </div>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.2,
            }}>
              Anuj Agrawal
            </div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 9,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#a78bfa", lineHeight: 1,
            }}>
              AI assistant
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8, width: 28, height: 28,
            color: "rgba(255,255,255,0.45)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, transition: "all 0.15s",
          }}
        >
          ✕
        </button>
      </div>

      {/* Message list */}
      <div
  ref={scrollRef}
  style={{
    flex: 1, overflowY: "auto", padding: "14px 12px 100px",
    display: "flex", flexDirection: "column", gap: 20,
    scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent",
  }}
>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "84%",
              padding: "9px 13px",
              borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: msg.role === "user"
                ? "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(124,58,237,0.35))"
                : "rgba(255,255,255,0.05)",
              border: msg.role === "user"
                ? "1px solid rgba(99,102,241,0.3)"
                : "1px solid rgba(255,255,255,0.07)",
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontSize: 13,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.88)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}>
              {msg.content || (msg.role === "assistant" && loading && i === messages.length - 1 ? (
                <TypingDots />
              ) : null)}
              {msg.role === "assistant" && loading && i === messages.length - 1 && msg.content && (
                <span style={{
                  display: "inline-block", width: 6, height: 13,
                  background: "#a78bfa", marginLeft: 2,
                  verticalAlign: "middle",
                  animation: "chatBlink 0.8s step-end infinite",
                }} />
              )}
            </div>
          </div>
        ))}

        {messages.length === 1 && !loading && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                style={{
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                  fontSize: 11.5,
                  padding: "6px 11px",
                  borderRadius: 100,
                  background: "rgba(167,139,250,0.08)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  color: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(167,139,250,0.16)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(167,139,250,0.08)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Standalone typing indicator if placeholder message has no content yet */}
        {loading && messages[messages.length - 1]?.role === "assistant" && messages[messages.length - 1]?.content === "" && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "9px 14px", borderRadius: "14px 14px 14px 4px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <TypingDots />
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "10px 10px 12px",
        flexShrink: 0,
      }}>
        <div style={{
          display: "flex", gap: 8, alignItems: "flex-end",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 12, padding: "8px 10px 8px 12px",
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask me anything…"
            rows={1}
            disabled={loading}
            style={{
              flex: 1, background: "none", border: "none", outline: "none", resize: "none",
              fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontSize: 13,
              color: "rgba(255,255,255,0.85)", lineHeight: 1.5,
              maxHeight: 96, overflowY: "auto",
              scrollbarWidth: "none",
            }}
            onInput={e => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = Math.min(el.scrollHeight, 96) + "px";
            }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              background: !input.trim() || loading
                ? "rgba(255,255,255,0.06)"
                : "linear-gradient(135deg, #7c3aed, #4da3ff)",
              border: "none", cursor: !input.trim() || loading ? "default" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
              boxShadow: !input.trim() || loading ? "none" : "0 0 12px rgba(124,58,237,0.4)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7L2 2l2.5 5L2 12l10-5z" fill={!input.trim() || loading ? "rgba(255,255,255,0.2)" : "#fff"} />
            </svg>
          </button>
        </div>
        <div style={{
          marginTop: 6, fontFamily: "'Space Mono', monospace", fontSize: 9,
          letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)",
          textAlign: "center",
        }}>
        </div>
      </div>

      <style>{`
        @keyframes chatBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes dotBounce {
          0%,80%,100%{transform:translateY(0);opacity:0.4}
          40%{transform:translateY(-5px);opacity:1}
        }
      `}</style>
    </div>
  );
}

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center", height: 14 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 5, height: 5, borderRadius: "50%", background: "#a78bfa",
          display: "inline-block",
          animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </span>
  );
}
