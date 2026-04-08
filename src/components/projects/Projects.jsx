import React, { useState } from "react";

const projects = [
  {
    id: "sftg",
    index: "01",
    title: "SFTG – Secure File Transfer Gateway",
    type: "Independent Project",
    status: "COMPLETED",
    statusColor: "var(--accent-amber)",
    year: "2024–25",
    problem:
      "Designing a secure backend service that enables authenticated users to upload, manage, and share files via time-limited public links — without exposing direct database or storage paths.",
    architecture:
      "Three-layer Spring Boot architecture: Controller → Service → Repository. Stateless JWT-based auth filters every request before it reaches business logic. File metadata stored in MySQL; binary files handled separately to prevent direct path traversal.",
    implementation: [
      "Implemented JWT token generation and validation using Spring Security filter chain",
      "Designed RESTful endpoints for file upload, retrieval, and public-link generation",
      "Built controlled access mechanism — public links expire and can be revoked",
      "Applied structured exception handling with global @ControllerAdvice and typed error responses",
      "Containerized the application with Docker for environment parity and CI/CD readiness",
    ],
    challenges: [
      "Secure token validation without exposing file paths in URL structure",
      "Designing the public-link model to be stateless yet revocable",
      "Handling concurrent upload requests with proper service-layer locking",
    ],
    tech: ["Java", "Spring Boot", "Spring Security", "JWT", "MySQL", "JPA", "Docker", "REST APIs"],
    github: "",
    note: "Backend-only project — frontend integration via React is supplementary",
  },
  {
    id: "emotionecho",
    index: "02",
    title: "EmotionEcho – Facial Emotion Recognition",
    type: "Academic Project",
    status: "COMPLETED",
    statusColor: "var(--accent-green)",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "28px",
          cursor: "pointer",
          gap: "20px",
        }}
        onClick={onToggle}
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
      </div>

      {/* Expanded case study */}
      {expanded && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "0 28px 28px" }}>

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
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              borderLeft: "2px solid var(--accent-blue)",
              paddingLeft: "16px",
            }}>
              {project.architecture}
            </p>
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
                <div key={i} style={{ display: "flex", gap: "12px" }}>
                  <span style={{ color: "var(--accent-green)", flexShrink: 0 }}>+</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              color: "var(--accent-amber)",
              marginBottom: "10px",
            }}>
              ENGINEERING_CHALLENGES
            </div>
            {project.challenges.map((c, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "10px",
                marginBottom: "8px",
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
                  {c}
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
  const [expanded, setExpanded] = useState("sftg");

  return (
    <section id="projects" style={{
      padding: "100px 24px",
      maxWidth: "1200px",
      margin: "0 auto",
    }}>

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
          Each project documented as an engineering case study — problem, architecture, and implementation decisions.
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