/**
 * DiagonalWipe.jsx
 * ─────────────────────────────────────────────────────────────────
 * Single-panel diagonal clip-path wipe.
 * No logo flash. No double-slide. One clean angled reveal.
 *
 * Geometry (10° slant):
 *   tan(10°) ≈ 0.176 → we overshoot by 18% so the blade fully exits.
 *
 *   Forward  (L→R): closed-left polygon expands to cover full width
 *   Backward (R→L): closed-right polygon expands to cover full width
 *
 * Easing / duration come from assets.config.js — change ONCE there.
 * ─────────────────────────────────────────────────────────────────
 */
import { useState, useCallback, useRef, useEffect } from "react";
import { WIPE_EASING, WIPE_DURATION_MS } from "../../constants/assets.config";

/* ════════════════════════════════════════════════════════════════
   NAV WIPE HOOK
   Provides { navTo(id), WipeOverlay }
   WipeOverlay must be rendered once inside Layout.
════════════════════════════════════════════════════════════════ */
export function useNavWipe(orderedIds = []) {
  const [wipe,    setWipe]    = useState({ active: false, dir: "forward", phase: "idle" });
  const prevIdxRef            = useRef(0);
  const timersRef             = useRef([]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const schedule = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  };

  const navTo = useCallback((targetId) => {
    const newIdx  = orderedIds.indexOf(targetId);
    const oldIdx  = prevIdxRef.current;
    if (newIdx === oldIdx) return;

    const dir = newIdx > oldIdx ? "forward" : "backward";
    prevIdxRef.current = newIdx;

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    /* Phase 1 — wipe panel slides IN, covering the screen */
    setWipe({ active: true, dir, phase: "entering" });

    /* Phase 2 — at midpoint, fire the actual scroll (hidden under wipe) */
    schedule(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, WIPE_DURATION_MS * 0.48);

    /* Phase 3 — wipe panel slides OUT in OPPOSITE direction */
    schedule(() => {
      setWipe({ active: true, dir: dir === "forward" ? "backward" : "forward", phase: "exiting" });
    }, WIPE_DURATION_MS * 0.55);

    /* Phase 4 — done, unmount */
    schedule(() => {
      setWipe({ active: false, dir: "forward", phase: "idle" });
    }, WIPE_DURATION_MS * 1.15);

  }, [orderedIds]);

  function WipeOverlay() {
    if (!wipe.active) return null;

    /* The CSS animation class drives the clip-path */
    const cls = wipe.dir === "forward" ? "dw-wipe-forward" : "dw-wipe-backward";

    return (
      <>
        <WipeStyles />
        <div
          key={`${wipe.phase}-${wipe.dir}`}   /* key change re-triggers keyframe */
          className={cls}
          style={{
            position:              "fixed",
            inset:                 0,
            zIndex:                9000,
            background:            "var(--bg-primary)",
            animationDuration:     `${WIPE_DURATION_MS * 0.52}ms`,
            animationTimingFunction: WIPE_EASING,
            animationFillMode:     "both",
            pointerEvents:         wipe.phase === "entering" ? "all" : "none",
          }}
        />
      </>
    );
  }

  return { navTo, WipeOverlay };
}

/* ════════════════════════════════════════════════════════════════
   PANEL WIPE HOOK  (for Skills category switching)
   Returns { activeIndex, direction, goTo }
   Wrap content in <PanelWipe key={activeIndex} direction={direction}>
════════════════════════════════════════════════════════════════ */
export function usePanelWipe(totalItems) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction,   setDirection]   = useState("forward");
  const prevRef = useRef(0);

  const goTo = useCallback((newIndex) => {
    if (newIndex === prevRef.current) return;
    setDirection(newIndex > prevRef.current ? "forward" : "backward");
    prevRef.current = newIndex;
    setActiveIndex(newIndex);
  }, []);

  return { activeIndex, direction, goTo };
}

/* ════════════════════════════════════════════════════════════════
   PANEL WIPE WRAPPER  (for Skills panel content)
   Change `key` externally to retrigger.
════════════════════════════════════════════════════════════════ */
export function PanelWipe({ children, direction = "forward", style = {}, className = "" }) {
  const cls = direction === "forward" ? "dw-wipe-forward" : "dw-wipe-backward";

  return (
    <>
      <WipeStyles />
      <div
        className={`${cls} ${className}`}
        style={{
          animationDuration:       `${WIPE_DURATION_MS}ms`,
          animationTimingFunction: WIPE_EASING,
          animationFillMode:       "both",
          ...style,
        }}
      >
        {children}
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   KEYFRAME INJECTION  (idempotent — runs once)
════════════════════════════════════════════════════════════════ */
let _injected = false;
function WipeStyles() {
  if (typeof document === "undefined") return null;
  if (!_injected) {
    _injected = true;
    const s = document.createElement("style");
    s.setAttribute("data-dw", "");
    s.textContent = `
      @keyframes dw-forward {
        from { clip-path: polygon(0% 0%,  0%    0%,   -18% 100%, 0%   100%); }
        to   { clip-path: polygon(0% 0%,  118%  0%,   100% 100%, 0%   100%); }
      }
      @keyframes dw-backward {
        from { clip-path: polygon(100% 0%, 100% 0%,  118% 100%, 100% 100%); }
        to   { clip-path: polygon(100% 0%, -18% 0%,  0%   100%, 100% 100%); }
      }
      .dw-wipe-forward  { animation-name: dw-forward;  animation-fill-mode: both; }
      .dw-wipe-backward { animation-name: dw-backward; animation-fill-mode: both; }
    `;
    document.head.appendChild(s);
  }
  return null;
}