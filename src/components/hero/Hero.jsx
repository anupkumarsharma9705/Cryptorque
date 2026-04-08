import React, { useEffect, useRef, useState } from "react";

const LINES = [
  "> initializing system...",
  "> loading profile: anup_kumar_sharma",
  "> role: backend_developer",
  "> stack: java · spring_boot · rest_api · mysql",
  "> status: ready_to_deploy ✓",
];

function Terminal() {
  const [done,     setDone]     = useState([]);
  const [current,  setCurrent]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (current >= LINES.length) { setFinished(true); return; }
    if (charIdx < LINES[current].length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 20);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDone(d => [...d, LINES[current]]);
      setCurrent(c => c + 1);
      setCharIdx(0);
    }, 100);
    return () => clearTimeout(t);
  }, [current, charIdx]);

  return (
    <div style={{ fontFamily:"var(--font-mono)", fontSize:".72rem", lineHeight:1.9, color:"var(--text-secondary)" }}>
      {done.map((line, i) => (
        <div key={i} style={{ color: i === done.length - 1 && finished ? "var(--accent-green)" : "var(--text-secondary)" }}>
          {line}
        </div>
      ))}
      {!finished && (
        <div>
          {LINES[current]?.slice(0, charIdx)}
          <span style={{
            display:"inline-block", width:"7px", height:"13px",
            background:"var(--accent-red)", verticalAlign:"text-bottom",
            animation:"blink 1s step-end infinite",
          }} />
        </div>
      )}
    </div>
  );
}

function KineticWord({ text, color, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => {
      el.style.opacity    = "1";
      el.style.transform  = "translateY(0) skewY(0)";
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span ref={ref} style={{
      display:"inline-block", opacity:0,
      transform:"translateY(80px) skewY(5deg)",
      transition:"opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)",
      color: color || "var(--text-primary)",
      willChange:"transform,opacity",
    }}>
      {text}
    </span>
  );
}

const SPEED_LINES = [
  { top:"22%", duration:"3.2s", delay:"0s",   width:"35%" },
  { top:"38%", duration:"2.6s", delay:"0.8s", width:"22%" },
  { top:"54%", duration:"4.1s", delay:"0.3s", width:"28%" },
  { top:"68%", duration:"3.5s", delay:"1.4s", width:"18%" },
];

const metrics = [
  { label:"BACKEND_PROJECTS", value:"02",   color:"var(--accent-red)"   },
  { label:"TECHNOLOGIES",     value:"20+",  color:"var(--accent-blue)"  },
  { label:"FOCUS_SCORE",      value:"100%", color:"var(--accent-green)" },
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrollY(window.scrollY); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const contentParallax = scrollY * 0.22;
  const bgParallax      = scrollY * 0.10;

  return (
    <section id="home" style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      justifyContent:"center", padding:"80px 24px 60px",
      maxWidth:"1200px", margin:"0 auto", overflow:"visible", position:"relative",
    }}>

      {/* Speed lines */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        {SPEED_LINES.map((l, i) => (
          <div key={i} style={{
            position:"absolute", top:l.top, left:0, width:l.width, height:"1px",
            background:"linear-gradient(90deg, transparent, var(--accent-red), transparent)",
            animation:`speedLine ${l.duration} linear infinite`,
            animationDelay:l.delay,
          }} />
        ))}
      </div>

      {/* Ghost background word — parallax */}
      <div style={{
        position:"absolute", right:"-5%", top:"50%",
        transform:`translateY(calc(-50% + ${bgParallax}px))`,
        fontFamily:"var(--font-display)", fontSize:"clamp(8rem,18vw,18rem)",
        fontWeight:800, color:"transparent",
        WebkitTextStroke:"1px rgba(224,36,68,0.20)",
        letterSpacing:"-.05em", userSelect:"none",
        pointerEvents:"none", lineHeight:1, whiteSpace:"nowrap",
      }}>
        JAVA
      </div>

      {/* Status bar */}
      <div style={{
        display:"flex", alignItems:"center", gap:"8px",
        fontFamily:"var(--font-mono)", fontSize:".6rem",
        letterSpacing:"0.15em", color:"var(--text-muted)",
        marginBottom:"48px",
        opacity:  loaded ? 1 : 0,
        transform:loaded ? "none" : "translateY(10px)",
        transition:"all 0.6s ease 0.1s",
      }}>
        <span className="glow-pulse" style={{
          width:"6px", height:"6px", borderRadius:"50%",
          background:"var(--accent-green)", flexShrink:0,
        }} />
        SYSTEM ONLINE · HYDERABAD, IN · 2025
      </div>

      {/* Hero grid */}
      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:"64px", alignItems:"center",
        transform:`translateY(${contentParallax * -1}px)`,
        willChange:"transform",
      }} className="hero-grid">

        {/* ── LEFT ── */}
        <div>
          <div style={{
            fontFamily:"var(--font-mono)", fontSize:".6rem",
            letterSpacing:".2em", color:"var(--accent-red)", marginBottom:"16px",
            opacity:loaded?1:0, transition:"opacity 0.5s ease 0.2s",
          }}>
            ANUP_KUMAR_SHARMA.java
          </div>

          <h1 style={{
            fontFamily:"var(--font-display)",
            fontSize:"clamp(2.8rem,5.5vw,5rem)",
            fontWeight:800, lineHeight:.95,
            letterSpacing:"-.03em", marginBottom:"24px",
          }}>
            <div style={{ overflow:"hidden" }}>
              <KineticWord text="BACKEND" delay={300} />
            </div>
            <div style={{ overflow:"hidden" }}>
              <KineticWord text="DEVELOPER" color="var(--accent-red)" delay={450} />
            </div>
          </h1>

          <p style={{
            fontSize:".95rem", lineHeight:1.7, color:"var(--text-secondary)",
            maxWidth:"420px", marginBottom:"36px",
            opacity:loaded?1:0, transform:loaded?"none":"translateY(16px)",
            transition:"all 0.7s ease 0.7s",
          }}>
            Building scalable and secure server-side systems with{" "}
            <strong style={{ color:"var(--text-primary)", fontWeight:500 }}>Java</strong> and{" "}
            <strong style={{ color:"var(--text-primary)", fontWeight:500 }}>Spring Boot</strong>.
            Focused on clean architecture, REST API design, and production-ready code.
          </p>

          <div style={{
            display:"flex", gap:"12px", flexWrap:"wrap",
            opacity:loaded?1:0, transform:loaded?"none":"translateY(16px)",
            transition:"all 0.7s ease 0.9s",
          }}>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" })}
              style={{
                fontFamily:"var(--font-mono)", fontSize:".68rem", letterSpacing:".1em",
                padding:"11px 24px", background:"var(--accent-red)", color:"#fff",
                border:"none", borderRadius:"2px", cursor:"pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="var(--accent-red-dim)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="var(--accent-red)"; e.currentTarget.style.transform="none"; }}
            >
              VIEW_PROJECTS →
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}
              style={{
                fontFamily:"var(--font-mono)", fontSize:".68rem", letterSpacing:".1em",
                padding:"11px 24px", background:"transparent", color:"var(--text-secondary)",
                border:"1px solid var(--border-accent)", borderRadius:"2px", cursor:"pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="var(--accent-red)"; e.currentTarget.style.color="var(--text-primary)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border-accent)"; e.currentTarget.style.color="var(--text-secondary)"; e.currentTarget.style.transform="none"; }}
            >
              GET_IN_TOUCH
            </button>
          </div>
        </div>

        {/* ── RIGHT: Terminal ── */}
        <div style={{
          opacity:loaded?1:0, transform:loaded?"none":"translateX(32px)",
          transition:"all 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s",
        }}>
          <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:"4px", overflow:"hidden" }}>
            <div style={{
              display:"flex", alignItems:"center", gap:"6px",
              padding:"10px 16px", borderBottom:"1px solid var(--border)",
              background:"var(--bg-secondary)",
            }}>
              {["#e02444","#f59e0b","#22c55e"].map(c => (
                <span key={c} style={{ width:"10px",height:"10px",borderRadius:"50%",background:c }} />
              ))}
              <span style={{ fontFamily:"var(--font-mono)",fontSize:".58rem",color:"var(--text-muted)",marginLeft:"8px" }}>
                bash — developer_profile
              </span>
            </div>
            <div style={{ padding:"20px 20px 24px", minHeight:"120px" }}>
              <Terminal />
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"8px", marginTop:"12px" }}>
            {metrics.map(m => (
              <div key={m.label}
                style={{ background:"var(--bg-card)", border:"1px solid var(--border)", padding:"16px", textAlign:"center", cursor:"default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="var(--border-accent)"; e.currentTarget.style.transform="translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.transform="none"; }}
              >
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"1.3rem", fontWeight:700, color:m.color, letterSpacing:"-.02em", lineHeight:1, marginBottom:"6px" }}>
                  {m.value}
                </div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:".5rem", color:"var(--text-muted)", letterSpacing:".12em" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        marginTop:"64px", display:"flex", alignItems:"center", gap:"12px",
        opacity:loaded?0.35:0, transition:"opacity 0.6s ease 1.8s",
      }}>
        <div style={{ height:"1px", width:"40px", background:"var(--border-accent)" }} />
        <span style={{ fontFamily:"var(--font-mono)", fontSize:".58rem", letterSpacing:".15em", color:"var(--text-muted)" }}>
          SCROLL_TO_EXPLORE
        </span>
      </div>

      <style>{`
        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes speedLine   { 0%{transform:translateX(-100%);opacity:0} 20%{opacity:1} 100%{transform:translateX(100vw);opacity:0} }
        @keyframes glowPulse   { 0%,100%{box-shadow:0 0 4px var(--accent-green)} 50%{box-shadow:0 0 12px var(--accent-green),0 0 24px rgba(34,197,94,0.3)} }
        .glow-pulse{ animation:glowPulse 2.5s ease-in-out infinite }
        @media(max-width:768px){ .hero-grid{grid-template-columns:1fr!important;gap:32px!important} }
      `}</style>
    </section>
  );
}