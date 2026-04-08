/**
 * Layout.jsx
 * ─────────────────────────────────────────────────────────────────
 * The Navbar reads isDark from ThemeContext — the SAME source as every
 * other component. There is no prop threading and no possible lag.
 *
 * Navigation uses useNavWipe() for the directional diagonal wipe.
 * Theme toggle uses ThemeToggleButton from ThemeContext.
 * ─────────────────────────────────────────────────────────────────
 */
import React, { useState, useEffect } from "react";
import { useTheme, ThemeToggleButton } from "./context/ThemeContext";
import { useNavWipe } from "./components/ui/DiagonalWipe";
import CustomCursor from "./components/ui/CustomCursor";

/* Ordered nav items — ORDER MATTERS for directional wipe logic */
export const NAV_IDS    = ["home", "about", "skills", "projects", "education", "certs", "contact"];
export const NAV_LABELS = ["SYS_INIT", "PROFILE", "STACK", "BUILDS", "BACKGROUND", "CERTS", "CONNECT"];

const TICKER = [
  "JAVA","·","SPRING BOOT","·","REST APIS","·","MYSQL","·",
  "JPA","·","DOCKER","·","JWT AUTH","·","MVC ARCHITECTURE","·",
  "BACKEND DEVELOPER","·","OPEN TO OPPORTUNITIES","·",
];

export default function Layout({ children }) {
  const { isDark }                        = useTheme();           // ← same source as everything
  const { navTo, WipeOverlay }            = useNavWipe(NAV_IDS);  // ← diagonal wipe
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /* Scroll-based nav background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section detector */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const handleNav = (id) => {
    navTo(id);
    setMobileOpen(false);
  };

  /* Nav background — reads isDark directly from context */
  const navBg = scrolled
    ? isDark
      ? "rgba(7,7,15,0.95)"
      : "rgba(245,245,247,0.95)"
    : "transparent";

  return (
    <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh" }}>

      {/* ── Custom cursor ── */}
      <CustomCursor />

      {/* ── Diagonal wipe overlay (lives here, covers everything) ── */}
      <WipeOverlay />

      {/* ══════════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════════ */}
      <nav style={{
        position:      "fixed",
        top:           0,
        left:          0,
        right:         0,
        zIndex:        200,
        borderBottom:  scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background:    navBg,
        backdropFilter:scrolled ? "blur(14px)" : "none",
        transition:    "background .3s ease, border-color .3s ease",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "52px" }}>

            {/* Logo */}
            <button
              onClick={() => handleNav("home")}
              style={{
                fontFamily: "var(--font-mono)", fontSize: ".8rem", fontWeight: 600,
                color: "var(--accent-red)", letterSpacing: ".1em",
                background: "none", border: "none", cursor: "none",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "var(--accent-red)",
                boxShadow: "0 0 8px var(--accent-red)",
                display: "inline-block",
              }} />
              AKS.DEV
            </button>

            {/* Desktop links */}
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }} className="nav-desktop">
              {NAV_IDS.map((id, idx) => (
                <button
                  key={id}
                  onClick={() => handleNav(id)}
                  style={{
                    fontFamily:  "var(--font-mono)",
                    fontSize:    ".6rem",
                    letterSpacing: ".1em",
                    padding:     "6px 12px",
                    background:  "none",
                    border:      "none",
                    cursor:      "none",
                    color:       activeSection === id ? "var(--text-primary)" : "var(--text-muted)",
                    borderBottom:activeSection === id
                      ? "1px solid var(--accent-red)"
                      : "1px solid transparent",
                    transition:  "color .2s ease",
                  }}
                  onMouseEnter={e => { if (activeSection !== id) e.currentTarget.style.color = "var(--text-secondary)"; }}
                  onMouseLeave={e => { if (activeSection !== id) e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  {NAV_LABELS[idx]}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* ThemeToggleButton reads from context — can't lag */}
              <ThemeToggleButton />

              <button
                onClick={() => setMobileOpen(o => !o)}
                className="nav-mobile-btn"
                style={{
                  display: "none", background: "none",
                  border: "1px solid var(--border)", color: "var(--text-secondary)",
                  padding: "6px 10px", cursor: "none",
                  fontFamily: "var(--font-mono)", fontSize: ".65rem",
                }}
              >
                {mobileOpen ? "CLOSE" : "MENU"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div style={{
            borderTop: "1px solid var(--border)",
            background: isDark ? "rgba(7,7,15,0.98)" : "rgba(245,245,247,0.98)",
            padding: "16px 24px",
          }}>
            {NAV_IDS.map((id, idx) => (
              <button key={id} onClick={() => handleNav(id)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "10px 0",
                fontFamily: "var(--font-mono)", fontSize: ".72rem", letterSpacing: ".1em",
                color: activeSection === id ? "var(--text-primary)" : "var(--text-secondary)",
                background: "none", border: "none",
                borderBottom: "1px solid var(--border)", cursor: "none",
              }}>
                <span style={{ color: "var(--accent-red)", marginRight: "12px" }}>›</span>
                {NAV_LABELS[idx]}
              </button>
            ))}
            <div style={{ paddingTop: "12px" }}>
              <ThemeToggleButton />
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════════ */}
      <main style={{ paddingTop: "52px" }}>{children}</main>

      {/* ══════════════════════════════════════════════════════════
          MARQUEE TICKER
      ══════════════════════════════════════════════════════════ */}
      <div style={{
        borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
        padding: "12px 0", overflow: "hidden", background: "var(--bg-secondary)",
      }}>
        <div style={{ display: "flex", width: "max-content", animation: "marquee 30s linear infinite" }}>
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      ".6rem",
              letterSpacing: ".15em",
              padding:       "0 16px",
              whiteSpace:    "nowrap",
              color:         item === "·" ? "var(--accent-red)" : "var(--text-muted)",
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: ".68rem", color: "var(--text-muted)", letterSpacing: ".08em", marginBottom: "12px" }}>
            ANUP_KUMAR_SHARMA / BACKEND_DEVELOPER / HYDERABAD
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: ".62rem", color: "var(--text-muted)" }}>
            © 2025 · Built with React + Vite · Precision engineered
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @media(max-width:768px){
          .nav-desktop    { display:none!important; }
          .nav-mobile-btn { display:block!important; }
          .theme-label    { display:none!important; }
        }
      `}</style>
    </div>
  );
}