"use client";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Awards" },
  { href: "#contact", label: "Contact" },
];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close mobile menu automatically if window is resized past the breakpoint
  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  return (
    <header
      id="main-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1.4rem 6vw",
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
        }}
      >
        {/* Logo */}
        <a
          href="#cover"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#fff",
            textDecoration: "none",
            cursor: "none",
          }}
        >
          A<span style={{ color: "#60a5fa" }}>.</span>
        </a>

        {/* Nav — sits right after logo, desktop only */}
        {!isMobile && (
          <nav>
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2.2rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {navLinks.map((link) => (
                <li key={link.href} style={{ lineHeight: 1 }}>
                  <a
                    href={link.href}
                    style={{
                      display: "inline-block",
                      lineHeight: 1,
                      fontSize: "0.72rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      cursor: "none",
                      position: "relative",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Spacer — pushes whatever comes next to the far right */}
        <div style={{ flex: 1 }} />

        {/* Resume (desktop) or Hamburger (mobile) */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {!isMobile && (
            <a
              href="/ANUJ_RESUME.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.55rem 1.3rem",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                fontSize: "0.72rem",
                lineHeight: 1,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#fff",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                cursor: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#60a5fa";
                el.style.background = "rgba(96,165,250,0.14)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.16)";
                el.style.background = "rgba(255,255,255,0.05)";
                el.style.transform = "translateY(0)";
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 19h16" strokeLinecap="round" />
              </svg>
              Resume
            </a>
          )}

          {isMobile && (
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10,
                width: 42,
                height: 42,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                zIndex: 110,
              }}
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {isMobile && open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(5,5,10,0.97)",
            backdropFilter: "blur(20px)",
            zIndex: 105,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.6rem",
                fontWeight: 600,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="/ANUJ_RESUME.pdf"
            download
            onClick={() => setOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1rem",
              padding: "0.7rem 1.8rem",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.06)",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 19h16" strokeLinecap="round" />
            </svg>
            Resume
          </a>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{
              padding: "0.7rem 1.8rem",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "linear-gradient(135deg,#3b82f6,#7c3aed)",
              fontSize: "0.9rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Let&apos;s talk →
          </a>
        </div>
      )}
    </header>
  );
}