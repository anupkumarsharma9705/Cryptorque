/**
 * PairedStack.jsx
 * ─────────────────────────────────────────────────────────────────
 * Fix 2: Shared background for paired sections.
 *
 * Instead of two separate <StackSection> components each with their
 * own sticky background (causing the image to "reset" between sections),
 * <PairedStack> wraps TWO sections inside ONE background container.
 *
 * Structure:
 *   <PairedStack bgGroup="group2" zIndex={2}>
 *     <StackSection id="about"  zIndex={0}>...</StackSection>
 *     <StackSection id="skills" zIndex={1}>...</StackSection>
 *   </PairedStack>
 *
 * HOW IT WORKS:
 *   The outer div has a single sticky background that spans BOTH
 *   sections. The inner sections stack ON TOP of each other with
 *   their own increasing z-index, but the background behind them
 *   is ONE image that never resets.
 *
 *   The background div uses `position: sticky; top: 0; height: 100vh`
 *   on a grid overlap (same cell as content) — it pins while both
 *   sections scroll past it.
 * ─────────────────────────────────────────────────────────────────
 */
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { BG_IMAGES } from "../../constants/assets.config";

/* ════════════════════════════════════════════════════════════════
   PAIRED STACK CONTAINER
   zIndex: the base z-index this pair sits at in the global stack.
   bgGroup: "group2" | "group3" | "group4"
════════════════════════════════════════════════════════════════ */
export function PairedStack({ children, zIndex, bgGroup }) {
  const { isDark } = useTheme();
  const imageUrl   = isDark
    ? BG_IMAGES.dark[bgGroup]
    : BG_IMAGES.light[bgGroup];

  return (
    <div style={{
      position:  "relative",
      zIndex,
      boxShadow: "0 -16px 80px rgba(0,0,0,0.8)",
    }}>
      {/*
        Grid overlap:
        – Background (row 1, col 1): sticky, 100vh, pins behind both sections
        – Content   (row 1, col 1): relative, flows at natural height (200vh+)
      */}
      <div style={{ display: "grid", gridTemplate: "1fr / 1fr" }}>

        {/* ── Single sticky background for BOTH sections ── */}
        <SharedBackground
          imageUrl={imageUrl}
          isDark={isDark}
        />

        {/* ── Both section contents stack on top ── */}
        <div style={{
          gridArea:  "1/1/2/2",
          position:  "relative",
          zIndex:    1,
        }}>
          {children}
        </div>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   INNER SECTION (use inside PairedStack instead of StackSection)
   These still need increasing z-index so each section slides
   over the one before it within the pair.
════════════════════════════════════════════════════════════════ */
export function PairedSection({ id, zIndex, children }) {
  return (
    <div
      id={id}
      style={{
        position:  "relative",
        zIndex,
        /* Subtle card-edge between the two paired sections */
        boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
      }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SHARED BACKGROUND
   Sticky, pins to viewport top, spans the full height of the pair.
════════════════════════════════════════════════════════════════ */
function SharedBackground({ imageUrl, isDark }) {
  return (
    <div style={{
      gridArea:      "1/1/2/2",
      position:      "sticky",
      top:           0,
      height:        "100vh",
      alignSelf:     "start",
      zIndex:        0,
      overflow:      "hidden",
      pointerEvents: "none",
    }}>
      {imageUrl ? (
        /* ── Image background ── */
        <>
          <div style={{
            position:           "absolute",
            inset:              "-5%",
            backgroundImage:    `url(${imageUrl})`,
            backgroundSize:     "cover",
            backgroundPosition: "center",
            backgroundRepeat:   "no-repeat",
            filter:             isDark
              ? "brightness(0.35) saturate(0.65)"
              : "brightness(0.75) saturate(0.7)",
          }} />
          {/* Gradient overlays for text readability */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 45%, var(--bg-primary) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: isDark
              ? "linear-gradient(to right, rgba(7,7,15,0.5) 0%, transparent 40%, transparent 60%, rgba(7,7,15,0.5) 100%)"
              : "linear-gradient(to right, rgba(245,245,247,0.4) 0%, transparent 40%, transparent 60%, rgba(245,245,247,0.4) 100%)",
          }} />
          <GridOverlay />
        </>
      ) : (
        /* ── Fallback CSS gradient (no image configured yet) ── */
        <FallbackGradient group="default" isDark={isDark} />
      )}
    </div>
  );
}

function GridOverlay() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `
        linear-gradient(var(--grid-color) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
      `,
      backgroundSize: "48px 48px",
    }} />
  );
}

function FallbackGradient({ isDark }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: isDark
        ? `radial-gradient(ellipse 70% 60% at 30% 40%, rgba(25,50,100,0.15) 0%, transparent 60%),
           radial-gradient(ellipse 50% 70% at 80% 70%, rgba(60,10,20,0.12) 0%, transparent 60%),
           var(--bg-primary)`
        : `radial-gradient(ellipse 70% 60% at 30% 40%, rgba(200,215,240,0.4) 0%, transparent 60%),
           radial-gradient(ellipse 50% 70% at 80% 70%, rgba(240,210,210,0.3) 0%, transparent 60%),
           var(--bg-primary)`,
    }}>
      <GridOverlay />
    </div>
  );
}