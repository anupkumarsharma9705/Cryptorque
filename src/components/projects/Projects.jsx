import React, { useState } from "react";

const KEY_TERMS = [
  "3-state idempotency",
  "Three-state idempotency",
  "async audit logging",
  "Async audit logging",
  "@Async",
  "Redis Sorted Set",
  "sliding window",
  "atomic SET NX EX",
  "SETNX EX",
  "risk scoring engine",
  "4-factor risk scoring",
  "filter chain",
  "attack detection",
  "rate limiting",
  "idempotency",
];

function boldKeyTerms(text) {
  if (typeof text !== "string") return text;

  /* Build one regex that matches any key term, longest-first so
     "Three-state idempotency" matches before plain "idempotency" */
  const sorted = [...KEY_TERMS].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${sorted.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");

  const parts = text.split(pattern);

  return parts.map((part, i) =>
    sorted.some(t => t.toLowerCase() === part.toLowerCase())
      ? <strong key={i} style={{ color: "var(--text-primary)", fontWeight: 600 }}>{part}</strong>
      : part
  );
}

const projects = [
  {
    id: "fintechgateway",
    index: "01",
    title: "Fintech Gateway — Intelligent API Security Middleware",
    type: "Independent Project",
    status: "COMPLETED",
    statusColor: "var(--accent-amber)",
    year: "2025",
    // In fintechgateway project object:
    problem:
      "Most APIs treat security as an afterthought — validation inside business logic, no rate limiting, no audit trail. I built a gateway layer that handles all of it before the backend ever sees the request.",

    architecture:
      "Spring Boot filter chain: SecurityHeadersFilter runs first on every response, then RequestLoggingFilter runs the full pipeline — risk scoring → decision → attack detection → idempotency check → proxy forward → async audit log. Redis for rate-limit state and idempotency; MySQL for the audit trail via @Async so DB writes never slow the request.",

    implementation: [
      "4-factor risk scoring engine (endpoint sensitivity, request rate via Redis, time-of-day, payload size) — score maps to ALLOW / THROTTLE / BLOCK with env-var-configurable thresholds",
      "Three-state idempotency on POST /payments (NOT_STARTED → IN_PROGRESS → PROCESSED) — prevents duplicate charges under client retries",
      "Attack detection for SQL injection, XSS, and path traversal at the filter layer — returns 400 before business logic runs",
      "IP trust tier system (HIGH / MEDIUM / LOW / BLACKLISTED) persisted in MySQL — reputation feeds back into risk score",
      "Async audit logging to console + rolling Logback file + MySQL — three sinks, zero request latency impact",
    ],

    challenges: [
      "Fixed-window rate limiting has a boundary exploit — attacker can double the allowed rate at the 1-minute rollover. Production fix is Redis Sorted Set for a true sliding window.",
      "Idempotency has a race condition between the isProcessed check and the IN_PROGRESS write. Production fix is Redis atomic SET NX EX.",
    ],
    tech: ["Java 21", "Spring Boot 4", "Spring Security", "Redis", "MySQL", "JPA", "Docker", "JUnit 5", "Mockito", "Swagger / OpenAPI"],
    github: "https://github.com/anupkumarsharma9705/FinGateway.git",
    note: null,
  },
  {
    id: "sftg",
    index: "02",
    title: "SFTG — Secure File Transfer Gateway",
    type: "Independent Project",
    status: "COMPLETED",
    statusColor: "var(--accent-green)",
    year: "2025",
    problem:
      "Most file sharing backends skip the hard parts — tokens stay valid after logout, files aren't scanned, no audit trail. I built one that doesn't cut corners, deployed full-stack on cloud infrastructure.",
    architecture:
      "Spring Boot on Render + React on Railway, both Docker containers. Files stored on Cloudinary — backend stays stateless. MySQL handles auth, audit logs, and share link state. Scheduled jobs clean up expired files every 5 minutes with explicit cascade-delete order across FK-constrained tables.",
    implementation: [
      "DB-backed token blacklist — logged-out tokens written to MySQL, checked on every request, purged hourly. Survives server restarts unlike in-memory approaches.",
      "MIME type detection via Apache Tika (reads actual file bytes, not extension) — makes extension-spoofing ineffective. Virus scanning via ClamAV locally and VirusTotal API in cloud.",
      "Expiring share links with download limits, QR code generation, and full download audit log — who downloaded, when, from which IP.",
    ],
    challenges: [
      "Blacklist lookup adds a SELECT on every authenticated request — mitigated with an index on the token column and scheduled cleanup to keep the table lean.",
      "Cascade delete must be explicit: download_logs → shared_links → files. JPA cascade would lose control over deletion sequence in an FK-constrained schema.",
    ],
    tech: ["Java 21", "Spring Boot", "Spring Security", "JWT", "Bucket4j", "Apache Tika", "MySQL", "Cloudinary", "Docker", "React", "Render / Railway"],
    github: "https://github.com/anupkumarsharma9705",
    liveDemo: "",
    note: "Full-stack deployed — live demo available on request",
  },
  {
    id: "emotionecho",
    index: "03",
    title: "EmotionEcho — Facial Emotion Recognition",
    type: "Academic Project",
    status: "COMPLETED",
    statusColor: "var(--accent-blue)",
    year: "2024",
    problem:
      "Building a real-time system that detects and classifies human facial emotions from live webcam input using computer vision, without relying on cloud inference.",
    architecture:
      "Python-based pipeline: OpenCV captures and pre-processes video frames → DeepFace runs local inference on each frame → results displayed as labeled overlays in real-time.",
    implementation: [
      "Integrated OpenCV for frame capture, grayscale conversion, and face detection",
      "Used DeepFace library for emotion classification with pre-trained models",
      "Optimized frame sampling rate to balance detection accuracy and system performance",
      "Built a display loop with emotion label overlays and confidence scores",
    ],
    challenges: [
      "Achieving acceptable inference speed on CPU without GPU acceleration",
      "Handling lighting variation causing false negatives in face detection",
    ],
    tech: ["Python", "OpenCV", "DeepFace", "NumPy", "AI / ML"],
    github: "https://github.com/anupkumarsharma9705/EmotionEcho.git",
    note: null,
  },
];

function CaseStudyCard({ project, expanded, onToggle }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      transition: "border-color 0.2s ease",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-accent)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      {/* Header row */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`${project.id}-panel`}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          textAlign: "left",
          padding: "28px",
          cursor: "pointer",
          gap: "20px",
          background: "none",
          border: "none",
          font: "inherit",
          color: "inherit",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "12px",
            flexWrap: "wrap",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--text-muted)",
            }}>
              {project.index}
            </span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: project.statusColor,
              border: `1px solid ${project.statusColor}40`,
              padding: "2px 8px",
            }}>
              {project.status}
            </span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
              padding: "2px 8px",
            }}>
              {project.type}
            </span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--text-muted)",
            }}>
              {project.year}
            </span>
          </div>

          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
            marginBottom: "12px",
          }}>
            {project.title}
          </h3>

          {/* Tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tech.map(t => (
              <span key={t} style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                padding: "3px 8px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-accent)",
                color: "var(--text-secondary)",
                letterSpacing: "0.03em",
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Expand icon */}
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          padding: "6px",
          flexShrink: 0,
          transition: "transform 0.2s ease",
          transform: expanded ? "rotate(90deg)" : "none",
        }}>
          ›
        </div>
      </button>

      {/* Expanded case study */}
      {expanded && (
        <div id={`${project.id}-panel`} style={{ borderTop: "1px solid var(--border)", padding: "0 28px 28px" }}>

          {/* Problem */}
          <div style={{ paddingTop: "24px", marginBottom: "24px" }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              color: "var(--accent-red)",
              marginBottom: "10px",
            }}>
              PROBLEM_STATEMENT
            </div>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              borderLeft: "2px solid var(--accent-red)",
              paddingLeft: "16px",
            }}>
              {project.problem}
            </p>
          </div>

          {/* Architecture */}
          {/* Architecture */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              color: "var(--accent-blue)",
              marginBottom: "10px",
            }}>
              ARCHITECTURE
            </div>
            {Array.isArray(project.architecture) ? (
              <div style={{ borderLeft: "2px solid var(--accent-blue)", paddingLeft: "16px" }}>
                {project.architecture.map((line, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                    <span style={{ color: "var(--accent-blue)", flexShrink: 0, fontSize: "0.85rem" }}>▸</span>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      {boldKeyTerms(line)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--text-secondary)",
                lineHeight: 1.7, borderLeft: "2px solid var(--accent-blue)", paddingLeft: "16px",
              }}>
                {project.architecture}
              </p>
            )}
          </div>

          {/* Implementation */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              color: "var(--accent-green)",
              marginBottom: "12px",
            }}>
              IMPLEMENTATION
            </div>
            <div style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              padding: "16px 20px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              lineHeight: 1.9,
            }}>
              {project.implementation.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "4px" }}>
                  <span style={{ color: "var(--accent-green)", flexShrink: 0 }}>+</span>
                  <span>{boldKeyTerms(item)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges / Production Gaps */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              color: "var(--accent-amber)",
              marginBottom: "10px",
            }}>
              {project.id === "fintechgateway" ? "PRODUCTION_GAPS · KNOWN_LIMITATIONS" : "ENGINEERING_CHALLENGES"}
            </div>
            {project.challenges.map((c, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--accent-amber)",
                  flexShrink: 0,
                }}>
                  !
                </span>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}>
                  {boldKeyTerms(c)}
                </p>
              </div>
            ))}
          </div>

          {/* Note / links */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            {project.note && (
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--text-muted)",
                fontStyle: "italic",
              }}>
                // {project.note}
              </p>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--accent-red)",
                  textDecoration: "none",
                  border: "1px solid var(--accent-red-dim)",
                  padding: "8px 16px",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={e => e.target.style.background = "rgba(224,36,68,0.1)"}
                onMouseLeave={e => e.target.style.background = "transparent"}
              >
                VIEW_SOURCE →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState("fintechgateway");

  return (
    <section id="projects" className="section-container">

      {/* Header */}
      <div style={{ marginBottom: "56px" }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          color: "var(--accent-red)",
          marginBottom: "12px",
        }}>
          // SECTION_04 · ENGINEERING_BUILDS
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
        }}>
          Projects
        </h2>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          marginTop: "12px",
          maxWidth: "520px",
        }}>
          Each project documented as an engineering case study — problem statement, architecture decisions, implementation details, and known production gaps.
        </p>
        <div style={{ height: "1px", width: "60px", background: "var(--accent-red)", marginTop: "16px", opacity: 0.6 }} />
      </div>

      {/* Case studies */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {projects.map(project => (
          <CaseStudyCard
            key={project.id}
            project={project}
            expanded={expanded === project.id}
            onToggle={() => setExpanded(expanded === project.id ? null : project.id)}
          />
        ))}
      </div>
    </section>
  );
}