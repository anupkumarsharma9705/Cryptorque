import { useEffect, useRef } from "react";

export function useScrollReveal(variant = "fadeUp", delay = 0, threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cls = {
      fadeUp: "sr-hidden-fadeUp",
      fadeIn: "sr-hidden-fadeIn",
      slideLeft: "sr-hidden-slideLeft",
      slideRight: "sr-hidden-slideRight",
      scaleUp: "sr-hidden-scaleUp",
    }[variant] || "sr-hidden-fadeUp";

    el.classList.add(cls);
    el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove(cls);
          el.classList.add("sr-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [variant, delay, threshold]);

  return ref;
}