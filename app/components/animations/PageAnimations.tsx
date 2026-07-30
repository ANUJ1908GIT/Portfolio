"use client";
import { useEffect } from "react";

export function PageAnimations() {
  useEffect(() => {
    let backupTimer: ReturnType<typeof setTimeout>;
    let onWindowLoad: () => void;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // ── Generic reveal-up - real 3D drop-in ─────────────────────────────
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          y: 0,
          z: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          transformPerspective: 1000,
        });
      });

      // ── Stagger children ────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((parent) => {
        const children = gsap.utils.toArray<HTMLElement>(
          parent.children as unknown as HTMLElement[],
        );
        gsap.from(children, {
          scrollTrigger: { trigger: parent, start: "top 85%" },
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "expo.out",
        });
      });

      // ── Experience timeline line draw ───────────────────────────────────
      const expLine = document.getElementById("exp-line");
      if (expLine) {
        gsap.to(expLine, {
          scrollTrigger: {
            trigger: "#experience",
            start: "top 70%",
            end: "bottom 20%",
            scrub: 1,
          },
          scaleY: 1,
        });
      }

      // ── Hero parallax ────────────────────────────────────────────────────
      const heroInner = document.querySelector(".hero-inner");
      if (heroInner) {
        gsap.to(heroInner, {
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 120,
          opacity: 0,
        });
      }

      // ── Section heading slide-in with slight rotation ────────────────────
      gsap.utils.toArray<HTMLElement>(".section-label").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          x: -22,
          rotateY: -35,
          transformPerspective: 500,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // ── Project cards - scroll-linked 3D depth parallax ─────────────────
      gsap.utils.toArray<HTMLElement>(".project-card-visual").forEach((el) => {
        gsap.fromTo(
          el,
          { rotateX: 3, y: 30, opacity: 0 },
          {
            scrollTrigger: { trigger: el, start: "top 90%", end: "top 40%", scrub: 1.2 },
            rotateX: 0,
            y: 0,
            opacity: 1,
            ease: "none",
          },
        );
      });

      // ── Skills section - rolling stagger ────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".skill-tag").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          scale: 0.8,
          opacity: 0,
          duration: 0.45,
          delay: i * 0.022,
          ease: "back.out(1.4)",
        });
      });

      // ── Achievements - fan-in stagger ───────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".achievement-card").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          y: 28,
          opacity: 0,
          rotateY: 6,
          transformPerspective: 800,
          duration: 0.6,
          delay: i * 0.07,
          ease: "expo.out",
        });
      });

      // ── Scroll progress header ───────────────────────────────────────────
      const header = document.getElementById("main-header");
      ScrollTrigger.create({
        start: "top -60",
        onUpdate: (self) => {
          if (header) {
            if (self.scroll() > 60) {
              header.classList.add("scrolled");
            } else {
              header.classList.remove("scrolled");
            }
          }
        },
      });

      // ── Subtle section background parallax ──────────────────────────────
      (["#about","#skills","#experience","#projects","#achievements","#contact"] as const)
        .forEach((id) => {
          const el = document.querySelector(id);
          if (!el) return;
          gsap.fromTo(
            el,
            { backgroundPositionY: "0%" },
            {
              backgroundPositionY: "4%",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
              ease: "none",
            },
          );
        });

      ScrollTrigger.refresh();

      onWindowLoad = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") {
        onWindowLoad();
      } else {
        window.addEventListener("load", onWindowLoad);
      }

      backupTimer = setTimeout(() => ScrollTrigger.refresh(), 2000);
    };

    const timer = setTimeout(init, 200);

    return () => {
      clearTimeout(timer);
      if (onWindowLoad) window.removeEventListener("load", onWindowLoad);
      if (backupTimer) clearTimeout(backupTimer);
    };
  }, []);

  return null;
}