import { useEffect, useRef, useState } from "react";

/**
 * useCounter
 * Counts from 0 to `target` when the element enters the viewport.
 * Returns [ref, displayValue]
 */
export function useCounter(target, duration = 1200, suffix = "") {
  const ref      = useRef(null);
  const [val, setVal] = useState("0");
  const started  = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          /* Parse numeric part */
          const isFloat = String(target).includes(".");
          const num     = parseFloat(target);
          const start   = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            /* Ease out cubic */
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = num * eased;
            setVal(
              isFloat
                ? current.toFixed(2)
                : Math.round(current).toString()
            );
            if (progress < 1) requestAnimationFrame(tick);
            else setVal(String(target));
          };

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [ref, val + suffix];
}