/**
 * ThemeFlash.jsx
 * ─────────────────────────────────────────────────────────────────
 * A full-viewport overlay that fades in (covering the screen),
 * triggers the theme swap at peak opacity, then fades out.
 *
 * Dark → Light: fades to WHITE (#f5f5f7)
 * Light → Dark: fades to BLACK (#07070f)
 *
 * Exports:
 *   useThemeFlash()
 *     – returns { theme, toggleTheme }
 *     – handles overlay + CSS variable swap
 *
 *   ThemeFlashOverlay
 *     – render once in Layout, above all content
 * ─────────────────────────────────────────────────────────────────
 */
import React, { useState, useCallback, useEffect, createContext, useContext } from "react";

const FLASH_DURATION = 600; // ms — total effect length

/* ─── Context ──────────────────────────────────────────────────── */
const ThemeFlashCtx = createContext({ theme: "dark", toggleTheme: () => {} });

export function useThemeFlash() {
  return useContext(ThemeFlashCtx);
}

/* ─── Provider ─────────────────────────────────────────────────── */
export function ThemeFlashProvider({ children }) {
  const [theme,   setTheme]   = useState("dark");
  const [overlay, setOverlay] = useState({ active: false, color: "#07070f", opacity: 0 });

  /* Apply data-theme attribute whenever theme changes */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme  = theme === "dark" ? "light" : "dark";
    const flashColor = nextTheme === "dark" ? "#07070f" : "#f5f5f7";

    // Step 1: fade IN
    setOverlay({ active: true, color: flashColor, opacity: 0 });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlay(prev => ({ ...prev, opacity: 1 }));
      });
    });

    // Step 2: swap theme at peak (midpoint)
    setTimeout(() => {
      setTheme(nextTheme);
    }, FLASH_DURATION * 0.45);

    // Step 3: fade OUT
    setTimeout(() => {
      setOverlay(prev => ({ ...prev, opacity: 0 }));
    }, FLASH_DURATION * 0.52);

    // Step 4: remove overlay
    setTimeout(() => {
      setOverlay({ active: false, color: flashColor, opacity: 0 });
    }, FLASH_DURATION * 1.05);
  }, [theme]);

  return (
    <ThemeFlashCtx.Provider value={{ theme, toggleTheme }}>
      {children}
      <ThemeFlashOverlayInner overlay={overlay} />
    </ThemeFlashCtx.Provider>
  );
}

/* ─── Overlay (rendered by provider) ──────────────────────────── */
function ThemeFlashOverlayInner({ overlay }) {
  if (!overlay.active) return null;

  return (
    <div
      aria-hidden
      style={{
        position:   "fixed",
        inset:      0,
        zIndex:     9999,
        background: overlay.color,
        opacity:    overlay.opacity,
        transition: `opacity ${FLASH_DURATION * 0.48}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        pointerEvents: overlay.opacity > 0.5 ? "all" : "none",
      }}
    />
  );
}

/* ─── Button component ─────────────────────────────────────────── */
/**
 * <ThemeToggleButton />
 * Drop-in replacement for whatever theme button exists in Layout.
 * Styled to match the existing AKS terminal aesthetic.
 */
export function ThemeToggleButton({ className = "" }) {
  const { theme, toggleTheme } = useThemeFlash();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className={className}
      title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
      style={{
        display:        "flex",
        alignItems:     "center",
        gap:            "6px",
        fontFamily:     "var(--font-mono)",
        fontSize:       ".6rem",
        letterSpacing:  ".08em",
        padding:        "6px 12px",
        background:     "var(--bg-card)",
        border:         "1px solid var(--border-accent)",
        color:          "var(--text-secondary)",
        borderRadius:   "2px",
        cursor:         "none",
        whiteSpace:     "nowrap",
        transition:     "border-color .2s, color .2s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "var(--accent-red)";
        e.currentTarget.style.color       = "var(--text-primary)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border-accent)";
        e.currentTarget.style.color       = "var(--text-secondary)";
      }}
    >
      <span style={{ fontSize: ".82rem", lineHeight: 1, display: "inline-block" }}>
        {isLight ? "◑" : "○"}
      </span>
      <span className="theme-label">
        {isLight ? "DARK" : "LIGHT"}
      </span>
    </button>
  );
}