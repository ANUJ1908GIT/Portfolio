"use client";
import { useState } from "react";
import { Mail, Send, Phone } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  { href: siteConfig.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  { href: siteConfig.github, icon: FaGithub, label: "GitHub" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
  { href: `tel:${siteConfig.phone}`, icon: Phone, label: "Phone" },
];

// ← Paste your Formspree form ID here (from formspree.io, e.g. "xpwzgqkb")
const FORMSPREE_ID = "xeeyqljw";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const form = e.target as HTMLFormElement;
      const res = await fetch(`https://formspree.io/f/xeeyqljw`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 5000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-40 relative z-10 text-center">
      <div className="page-container">
        {/* Pre-label — flanked by symmetric accent lines, matches every other section heading */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem", marginBottom: "2rem" }}>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 100, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ height: 1, background: "linear-gradient(90deg, transparent, #a78bfa)" }}
          />
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.85rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#60a5fa",
            whiteSpace: "nowrap",
          }}>
            Get in touch
          </span>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 100, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ height: 1, background: "linear-gradient(90deg, #60a5fa, transparent)" }}
          />
        </div>

        {/* Headline */}
        <h2
          className="reveal-up font-bold leading-[0.95] mb-12"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.04em",
          }}
        >
          Let&apos;s create<br />
          <span className="gradient-text">something</span>
          <br />remarkable.
        </h2>

        <p
          className="reveal-up font-light mb-16"
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.35)",
            lineHeight: 1.8,
            maxWidth: 480,
            margin: "0 auto 4rem",
            textAlign: "center",
          }}
        >
          Have a project, collaboration, or just want to connect? I&apos;m always open
          to interesting conversations and opportunities.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: 540,
            margin: "0 auto 5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            textAlign: "left",
          }}
        >
          {[
            { ph: "Enter Your Name...", type: "text", name: "name" },
            { ph: "Enter Your Email...", type: "email", name: "email" },
          ].map(({ ph, type, name }) => (
            <input
              key={ph}
              type={type}
              name={name}
              placeholder={ph}
              required
              style={{
                width: "100%",
                padding: "1rem 1.4rem",
                borderRadius: 12,
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
                fontSize: "0.95rem",
                outline: "none",
                backdropFilter: "blur(10px)",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          ))}
          <textarea
            name="message"
            placeholder="Your message or project idea…"
            required
            rows={5}
            style={{
              width: "100%",
              padding: "1rem 1.4rem",
              borderRadius: 12,
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#fff",
              fontSize: "0.95rem",
              outline: "none",
              backdropFilter: "blur(10px)",
              resize: "none",
              fontFamily: "inherit",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          />
          <button
            type="submit"
            disabled={loading || sent}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: 100,
              background: sent
                ? "linear-gradient(135deg,#10b981,#059669)"
                : "linear-gradient(135deg,#3b82f6,#7c3aed)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.95rem",
              border: "none",
              cursor: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              boxShadow: "0 0 30px rgba(59,130,246,0.3)",
              transition: "transform 0.2s",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {sent ? "Message received ✓" : loading ? "Sending…" : error ? "Failed - try email directly" : (<>Send Message <Send size={15} /></>)}
          </button>
        </form>

        {/* ── Closing CTA panel ── */}
        <div
          className="glass-card rounded-2xl grid grid-cols-1 md:grid-cols-3"
          style={{
            maxWidth: 1040,
            margin: "0 auto 4rem",
            padding: "clamp(2.5rem, 5vw, 3.75rem)",
            gap: "2.5rem",
            textAlign: "left",
            borderColor: "rgba(59,130,246,0.2)",
            background: "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(124,58,237,0.05))",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Heading */}
          <div className="flex items-center">
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.03em",
              lineHeight: 1.15, color: "#fff",
            }}>
              Let&apos;s create<br />something amazing.
            </h3>
          </div>

          {/* Contact details */}
          <div className="flex flex-col justify-center" style={{ gap: "1.1rem" }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#60a5fa", marginBottom: "0.3rem",
            }}>Get in touch</div>
            <a href={`mailto:${siteConfig.email}`} style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
              fontSize: "1rem", color: "rgba(255,255,255,0.8)", textDecoration: "none",
            }}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone}`} style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
              fontSize: "1rem", color: "rgba(255,255,255,0.8)", textDecoration: "none",
            }}>{siteConfig.phone}</a>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
              fontSize: "1rem", color: "rgba(255,255,255,0.8)",
            }}>
              {siteConfig.location}
            </span>
          </div>

          {/* Connect */}
          <div className="flex flex-col justify-center">
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#a78bfa",
                marginBottom: "1.1rem",
              }}
            >
              Let&apos;s connect
            </div>

            <div style={{ display: "flex", gap: "0.6rem" }}>
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#60a5fa";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}