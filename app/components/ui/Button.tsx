"use client";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "primary",
  href,
  children,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - r.left - r.width / 2;
    const dy = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(.25,.46,.45,.94)";
    el.style.transform = "translate(0,0)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 400);
  };

  const base = cn(
    "inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide cursor-none transition-all duration-200",
    variant === "primary"
      ? "bg-gradient-to-br from-blue-500 to-purple-700 text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(59,130,246,0.5)]"
      : "border border-white/10 bg-white/5 backdrop-blur-sm text-white hover:border-white/25 hover:bg-white/10 hover:-translate-y-0.5",
    className
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={base}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={base}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
