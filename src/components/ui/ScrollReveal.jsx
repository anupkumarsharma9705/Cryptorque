import React, { useEffect, useRef, Children } from "react";

/**
 * ScrollReveal
 * Wraps children and animates them in when they enter the viewport.
 *
 * Props:
 *   variant  – "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleUp"
 *   delay    – base delay in ms (default 0)
 *   stagger  – ms between each child (default 80)  — only used when multiple children
 *   threshold– 0–1, how much of element must be visible (default 0.15)
 *   once     – only animate once (default true)
 *   className, style – passed to wrapper div
 */
export default function ScrollReveal({
  children,
  variant    = "fadeUp",
  delay      = 0,
  stagger    = 80,
  threshold  = 0.12,
  once       = true,
  className  = "",
  style      = {},
  tag        = "div",
}) {
  const containerRef = useRef(null);

  const HIDDEN = {
    fadeUp:     "sr-hidden-fadeUp",
    fadeIn:     "sr-hidden-fadeIn",
    slideLeft:  "sr-hidden-slideLeft",
    slideRight: "sr-hidden-slideRight",
    scaleUp:    "sr-hidden-scaleUp",
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.dataset.stagger === "true"
      ? Array.from(container.children)
      : [container];

    /* Set initial hidden state */
    targets.forEach((el, i) => {
      el.classList.add(HIDDEN[variant] || HIDDEN.fadeUp);
      el.style.transitionDelay = `${delay + i * stagger}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            /* Find which targets match */
            targets.forEach((t) => {
              t.classList.remove(HIDDEN[variant] || HIDDEN.fadeUp);
              t.classList.add("sr-visible");
            });
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            targets.forEach((t) => {
              t.classList.remove("sr-visible");
              t.classList.add(HIDDEN[variant] || HIDDEN.fadeUp);
            });
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [variant, delay, stagger, threshold, once]);

  const Tag = tag;
  const isMulti = Children.count(children) > 1;

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={style}
      data-stagger={isMulti ? "true" : "false"}
    >
      {children}
    </Tag>
  );
}

/**
 * useScrollReveal – lightweight hook for individual elements
 */
// export function useScrollReveal(variant = "fadeUp", delay = 0, threshold = 0.12) {
//   const ref = useRef(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const cls = {
//       fadeUp:     "sr-hidden-fadeUp",
//       fadeIn:     "sr-hidden-fadeIn",
//       slideLeft:  "sr-hidden-slideLeft",
//       slideRight: "sr-hidden-slideRight",
//       scaleUp:    "sr-hidden-scaleUp",
//     }[variant] || "sr-hidden-fadeUp";

//     el.classList.add(cls);
//     el.style.transitionDelay = `${delay}ms`;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           el.classList.remove(cls);
//           el.classList.add("sr-visible");
//           observer.unobserve(el);
//         }
//       },
//       { threshold, rootMargin: "0px 0px -60px 0px" }
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [variant, delay, threshold]);

//   return ref;
// }