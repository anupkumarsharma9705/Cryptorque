/**
 * ThemeContext.jsx
 * ─────────────────────────────────────────────────────────────────
 * Fixes the "navbar theme lag" issue by managing ALL theme state
 * in a single React Context at the very top of the component tree.
 *
 * Every component that needs theme info calls useTheme() — they all
 * read from the same object, so there is zero possible lag.
 *
 * The overlay sequence:
 *   1. Overlay fades IN  (0 → 1 opacity)
 *   2. At peak opacity → data-theme attribute swaps → CSS vars flip
 *   3. Overlay fades OUT (1 → 0 opacity)
 *   4. Overlay unmounts
 *
 * The theme swap at step 2 is imperceptible because the screen is
 * fully covered. This is the same technique Koenigsegg uses.
 * ─────────────────────────────────────────────────────────────────
 */
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";

/* ─── Timing ────────────────────────────────────────────────────── */
const FADE_IN_MS  = 260;  // overlay fades in
const HOLD_MS     = 40;   // brief hold at full opacity (swap happens here)
const FADE_OUT_MS = 260;  // overlay fades out
const TOTAL_MS    = FADE_IN_MS + HOLD_MS + FADE_OUT_MS + 40;

/* ─── Context ───────────────────────────────────────────────────── */
const ThemeCtx = createContext({
  isDark: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeCtx);

/* ─── Provider ──────────────────────────────────────────────────── */
export function ThemeProvider({ children }) {
  const [isDark,   setIsDark]   = useState(true);
  const [overlay,  setOverlay]  = useState({ visible: false, opacity: 0, color: "#07070f" });
  const timerRefs = useRef([]);

  /* Apply data-theme to <html> — this is what CSS vars key off of */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  /* Clear all timers on unmount */
  useEffect(() => () => timerRefs.current.forEach(clearTimeout), []);

  const schedule = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timerRefs.current.push(id);
    return id;
  };

  const toggleTheme = useCallback(() => {
    /* What color does this flash TO? */
    const nextIsDark = !isDark;  // we're toggling TO this
    const flashColor = nextIsDark ? "#07070f" : "#f5f5f7";

    /* Clear any in-flight timers */
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];

    /* ── Step 1: mount overlay at opacity 0, then trigger fade-in ── */
    setOverlay({ visible: true, opacity: 0, color: flashColor });

    schedule(() => {
      setOverlay(o => ({ ...o, opacity: 1 }));

      /* ── Step 2: swap theme at peak (after fade-in completes) ── */
      schedule(() => {
        setIsDark(nextIsDark);   // ← THE ACTUAL SWAP

        /* ── Step 3: fade out ── */
        schedule(() => {
          setOverlay(o => ({ ...o, opacity: 0 }));

          /* ── Step 4: unmount overlay ── */
          schedule(() => {
            setOverlay({ visible: false, opacity: 0, color: flashColor });
          }, FADE_OUT_MS + 20);

        }, HOLD_MS);
      }, FADE_IN_MS);
    }, 16); // one rAF tick so opacity:0 actually renders before transition starts

  }, [isDark]);

  return (
    <ThemeCtx.Provider value={{ isDark, toggleTheme }}>
      {children}

      {/* ─── Full-screen flash overlay ─── */}
      {overlay.visible && (
        <div
          aria-hidden
          style={{
            position:      "fixed",
            inset:         0,
            zIndex:        99999,
            background:    overlay.color,
            opacity:       overlay.opacity,
            pointerEvents: overlay.opacity > 0.1 ? "all" : "none",
            transition:    `opacity ${overlay.opacity === 1 ? FADE_IN_MS : FADE_OUT_MS}ms ease`,
          }}
        />
      )}
    </ThemeCtx.Provider>
  );
}

/* ─── Drop-in Theme Toggle Button ──────────────────────────────── */
export function ThemeToggleButton({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={className}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
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
        transition:     "border-color .15s, color .15s",
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
      <span style={{ fontSize: ".82rem", lineHeight: 1 }}>
        {isDark ? "○" : "◑"}
      </span>
      <span className="theme-label">
        {isDark ? "LIGHT" : "DARK"}
      </span>
    </button>
  );
}