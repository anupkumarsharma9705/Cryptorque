/**
 * DirectionalNav.jsx
 * ─────────────────────────────────────────────────────────────────
 * Fix 1: Directional navigation underline + wipe transition.
 *
 * useDirectionalNav(orderedIds)
 *   – tracks previousIndex and currentIndex
 *   – exposes `direction`: "forward" | "backward"
 *   – exposes `navTo(id)` which fires the diagonal wipe in the
 *     correct direction based on index comparison
 *
 * <NavUnderline>
 *   – A sliding indicator bar that moves left OR right
 *     depending on direction. Uses a CSS transform transition
 *     so it physically travels across the nav.
 *
 * HOW TO USE IN Layout.jsx:
 *   const { activeId, direction, navTo, prevIndex, activeIndex }
 *     = useDirectionalNav(NAV_IDS);
 *
 *   Then on each nav button:
 *     onClick={() => navTo(id)}
 *     className={activeId === id ? "active" : ""}
 *
 *   Render the underline:
 *     <NavUnderline
 *       ids={NAV_IDS}
 *       activeIndex={activeIndex}
 *       direction={direction}
 *       containerRef={navLinksRef}
 *     />
 * ─────────────────────────────────────────────────────────────────
 */
import React, { useState, useCallback, useRef, useEffect } from "react";
import { WIPE_DURATION_MS, WIPE_EASING } from "../../assets.config";

/* ════════════════════════════════════════════════════════════════
   HOOK
════════════════════════════════════════════════════════════════ */
export function useDirectionalNav(orderedIds = []) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex,   setPrevIndex]   = useState(0);
  const [direction,   setDirection]   = useState("forward"); // "forward" | "backward"

  /* For scroll-based active detection (IntersectionObserver) */
  const setActiveById = useCallback((id) => {
    const newIdx = orderedIds.indexOf(id);
    if (newIdx === -1 || newIdx === activeIndex) return;
    setDirection(newIdx > activeIndex ? "forward" : "backward");
    setPrevIndex(activeIndex);
    setActiveIndex(newIdx);
  }, [orderedIds, activeIndex]);

  /* For click-based navigation */
  const goTo = useCallback((id, onMidpoint) => {
    const newIdx = orderedIds.indexOf(id);
    if (newIdx === -1) return;

    const dir = newIdx > activeIndex ? "forward" : "backward";
    setDirection(dir);
    setPrevIndex(activeIndex);
    setActiveIndex(newIdx);

    /* Fire the midpoint callback (scroll) after half the wipe duration */
    if (onMidpoint) {
      setTimeout(onMidpoint, WIPE_DURATION_MS * 0.48);
    }
  }, [orderedIds, activeIndex]);

  const activeId = orderedIds[activeIndex] || orderedIds[0];

  return {
    activeIndex,
    prevIndex,
    direction,
    activeId,
    goTo,
    setActiveById,
  };
}

/* ════════════════════════════════════════════════════════════════
   SLIDING UNDERLINE COMPONENT
   Measures each button's position and slides the indicator pill
   left or right depending on direction.
════════════════════════════════════════════════════════════════ */
export function NavUnderline({ ids, activeIndex, direction, containerRef }) {
  const [style, setStyle] = useState({ left: 0, width: 0 });
  const prevStyleRef = useRef({ left: 0, width: 0 });
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const buttons = container.querySelectorAll("[data-nav-btn]");
    const target  = buttons[activeIndex];
    if (!target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect    = target.getBoundingClientRect();

    const newLeft  = targetRect.left  - containerRect.left;
    const newWidth = targetRect.width;

    /* Trigger animation */
    setAnimating(true);
    setStyle({ left: newLeft, width: newWidth });
    prevStyleRef.current = { left: newLeft, width: newWidth };

    const t = setTimeout(() => setAnimating(false), 400);
    return () => clearTimeout(t);
  }, [activeIndex, containerRef]);

  return (
    <div
      aria-hidden
      style={{
        position:   "absolute",
        bottom:     0,
        left:       `${style.left}px`,
        width:      `${style.width}px`,
        height:     "2px",
        background: "var(--accent-red)",
        /* Directional easing: forward = ease-out-right, backward = ease-out-left */
        transition: `left 360ms ${direction === "forward"
          ? "cubic-bezier(0.4, 0, 0.2, 1)"
          : "cubic-bezier(0.8, 0, 0.6, 1)"
        }, width 200ms ease`,
        transformOrigin: direction === "forward" ? "left center" : "right center",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

/* ════════════════════════════════════════════════════════════════
   DIRECTIONAL WIPE OVERLAY
   Same diagonal wipe as before, but direction is driven by
   index comparison so it always goes the correct way.
════════════════════════════════════════════════════════════════ */
export function useDirectionalWipe(orderedIds = []) {
  const [overlay, setOverlay] = useState({ active: false, dir: "forward", phase: "idle" });
  const currentIdxRef = useRef(0);
  const timersRef     = useRef([]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const schedule = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  };

  const navTo = useCallback((targetId, onScrollFired) => {
    const newIdx = orderedIds.indexOf(targetId);
    const oldIdx = currentIdxRef.current;
    if (newIdx === oldIdx) return;

    /* ── DIRECTION: index comparison ── */
    const dir = newIdx > oldIdx ? "forward" : "backward";
    currentIdxRef.current = newIdx;

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    /* Phase 1 — wipe IN covers the screen */
    setOverlay({ active: true, dir, phase: "entering" });

    /* Phase 2 — scroll at midpoint (hidden under wipe) */
    schedule(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "instant", block: "start" });
      if (onScrollFired) onScrollFired();
    }, WIPE_DURATION_MS * 0.48);

    /* Phase 3 — wipe OUT in opposite direction */
    schedule(() => {
      setOverlay({
        active: true,
        dir:    dir === "forward" ? "backward" : "forward",
        phase:  "exiting",
      });
    }, WIPE_DURATION_MS * 0.58);

    /* Phase 4 — done */
    schedule(() => {
      setOverlay({ active: false, dir: "forward", phase: "idle" });
    }, WIPE_DURATION_MS * 1.2);

  }, [orderedIds]);

  function WipeOverlay() {
    if (!overlay.active) return null;
    const cls = overlay.dir === "forward" ? "dw-wipe-forward" : "dw-wipe-backward";
    return (
      <div
        key={`${overlay.phase}-${overlay.dir}`}
        className={cls}
        style={{
          position:              "fixed",
          inset:                 0,
          zIndex:                9000,
          background:            "var(--bg-primary)",
          animationDuration:     `${WIPE_DURATION_MS * 0.52}ms`,
          animationTimingFunction: WIPE_EASING,
          animationFillMode:     "both",
          pointerEvents:         overlay.phase === "entering" ? "all" : "none",
        }}
      />
    );
  }

  return { navTo, WipeOverlay };
}