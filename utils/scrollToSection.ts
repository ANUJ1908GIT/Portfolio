export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = (window as typeof window & {
    __lenis?: { scrollTo: (target: HTMLElement, opts?: { duration?: number }) => void };
  }).__lenis;

  if (lenis) {
    lenis.scrollTo(el, { duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}