/**
 * StackLayout.jsx
 * ─────────────────────────────────────────────────────────────────
 * Vertical card-stack reveal on scroll.
 *
 * Each section physically covers the previous one because of:
 *   1. Increasing z-index per section (1→7)
 *   2. CSS Grid overlap trick — background (sticky) + content share
 *      the same grid cell
 *   3. box-shadow: 0 -16px 80px rgba(0,0,0,0.8) creates a card edge
 *
 * Background groups are theme-sensitive via useTheme():
 *   Hero    → YouTube iframe  (dark/light video ID from assets.config)
 *   About + Skills            → Image Group 2
 *   Projects + Education      → Image Group 3
 *   Certs + Contact           → Image Group 4
 * ─────────────────────────────────────────────────────────────────
 */
import { useTheme } from "../../context/ThemeContext";
import { getSectionBg} from "../../constants/assets.config";

/* ════════════════════════════════════════════════════════════════
   STACK SECTION
════════════════════════════════════════════════════════════════ */
export function StackSection({ id, zIndex, children }) {
  const { isDark } = useTheme();
  const bg = getSectionBg(id, isDark);

  return (
    <div
      id={id}
      style={{
        position:  "relative",
        zIndex,
        boxShadow: "0 -16px 80px rgba(0,0,0,0.8)",
      }}
    >
      {/*
        CSS Grid overlap:
        ┌─────────────────┐
        │ bg (sticky)     │ grid-area 1/1/2/2 — z-index 0
        │ content (flow)  │ grid-area 1/1/2/2 — z-index 1
        └─────────────────┘
        Both occupy the same cell. Background pins via sticky.
        Content flows at natural height above it.
      */}
      <div style={{ display: "grid", gridTemplate: "1fr / 1fr", minHeight: "100vh" }}>

        {/* ── Background layer ── */}
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
          <SectionBackground bg={bg} />
        </div>

        {/* ── Content layer ── */}
        <div style={{
          gridArea: "1/1/2/2",
          position: "relative",
          zIndex:   1,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   BACKGROUND RENDERER
════════════════════════════════════════════════════════════════ */
function SectionBackground({ bg }) {
  if (!bg || !bg.url) return <FallbackBg />;
  if (bg.type === "video")  return <VideoBg url={bg.url} />;
  if (bg.type === "image")  return <ImageBg url={bg.url} />;
  return <FallbackBg />;
}

/* ── YouTube iframe background ── */
function VideoBg({ url }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "var(--bg-primary)" }}>
      {/* Iframe — letterbox fill trick */}
      <iframe
        src={url}
        title="hero-video-bg"
        allow="autoplay; encrypted-media"
        style={{
          position:      "absolute",
          top:           "50%",
          left:          "50%",
          /* Fill 16:9 video regardless of viewport aspect ratio */
          width:         "max(100%, 177.78vh)",
          height:        "max(100%, 56.25vw)",
          transform:     "translate(-50%, -50%)",
          border:        "none",
          pointerEvents: "none",
        }}
      />

      {/* Readability overlays */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(7,7,15,0.62)" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(7,7,15,0.55) 100%)",
      }} />

      {/* Fine grid overlay */}
      <GridOverlay />

      {/* Speed lines */}
      <SpeedLines />
    </div>
  );
}

/* ── Static image background ── */
function ImageBg({ url }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{
        position:           "absolute",
        inset:              "-5%",    /* slight overscan for subtle parallax */
        backgroundImage:    `url(${url})`,
        backgroundSize:     "cover",
        backgroundPosition: "center",
        backgroundRepeat:   "no-repeat",
        filter:             "brightness(0.38) saturate(0.7)",
      }} />

      {/* Gradient overlays */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, transparent 40%, var(--bg-primary) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(7,7,15,0.4) 0%, transparent 40%, transparent 60%, rgba(7,7,15,0.4) 100%)",
      }} />

      <GridOverlay />
    </div>
  );
}

/* ── Fallback (no asset configured) ── */
function FallbackBg() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: `
        radial-gradient(ellipse 80% 60% at 70% 40%, rgba(140,10,30,0.12) 0%, transparent 65%),
        radial-gradient(ellipse 60% 80% at 10% 80%, rgba(30,10,60,0.10) 0%, transparent 70%),
        var(--bg-primary)
      `,
    }}>
      <GridOverlay />
    </div>
  );
}

/* ── Shared subcomponents ── */
function GridOverlay() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `
        linear-gradient(rgba(74,158,255,0.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(74,158,255,0.022) 1px, transparent 1px)
      `,
      backgroundSize: "48px 48px",
    }} />
  );
}

const SPEED_LINE_DATA = [
  { top: "24%", dur: "3.4s", delay: "0.0s", w: "32%" },
  { top: "41%", dur: "2.7s", delay: "0.9s", w: "20%" },
  { top: "60%", dur: "4.2s", delay: "0.4s", w: "26%" },
];

function SpeedLines() {
  return (
    <>
      {SPEED_LINE_DATA.map((l, i) => (
        <div key={i} style={{
          position:      "absolute",
          top:           l.top,
          left:          0,
          width:         l.w,
          height:        "1px",
          background:    "linear-gradient(90deg, transparent, var(--accent-red), transparent)",
          animation:     `sl-move ${l.dur} linear infinite`,
          animationDelay: l.delay,
          opacity:       0,
        }} />
      ))}
      <style>{`
        @keyframes sl-move {
          0%   { transform: translateX(-100%); opacity: 0;   }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(110vw); opacity: 0; }
        }
      `}</style>
    </>
  );
}