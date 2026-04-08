import React from "react";

const profile = {
  name: "Anup Kumar Sharma",
  role: "Backend Developer",
  location: "Hyderabad, Telangana",
  email: "AnupKS9705@outlook.com",
  github: "github.com/anupkumarsharma9705",
  linkedin: "linkedin.com/in/aks9705",
  status: "Available for Opportunities",
};

const specs = [
  {
    label: "PRIMARY RUNTIME",
    value: "Java · Spring Boot",
    tag: "ACTIVE",
    tagColor: "var(--accent-green)",
  },
  {
    label: "API PROTOCOL",
    value: "RESTful · HTTP/HTTPS · JSON",
    tag: "STABLE",
    tagColor: "var(--accent-blue)",
  },
  {
    label: "DATABASE LAYER",
    value: "MySQL · JPA · Hibernate",
    tag: "CONNECTED",
    tagColor: "var(--accent-blue)",
  },
  {
    label: "SECURITY MODULE",
    value: "JWT · Auth Basics · NIST Awareness",
    tag: "ENABLED",
    tagColor: "var(--accent-amber)",
  },
  {
    label: "DEPLOYMENT",
    value: "Docker · Maven · Git/GitHub",
    tag: "CONFIGURED",
    tagColor: "var(--text-secondary)",
  },
];

const focus = [
  "Designing scalable REST APIs with proper request/response contracts",
  "Building backend systems with structured exception handling and security",
  "Database schema design with JPA entity relationships",
  "Writing maintainable, well-structured Java code following OOP principles",
  "Understanding system performance and secure architecture patterns",
];

export default function About() {
  return (
    <section id="about" style={{
      padding: "100px 24px",
      maxWidth: "1200px",
      margin: "0 auto",
    }}>

      {/* Section header */}
      <div style={{ marginBottom: "56px" }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          color: "var(--accent-red)",
          marginBottom: "12px",
        }}>
          // SECTION_02 · SYSTEM_PROFILE
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
        }}>
          About
        </h2>
        <div style={{ height: "1px", width: "60px", background: "var(--accent-red)", marginTop: "16px", opacity: 0.6 }} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: "48px",
        alignItems: "start",
      }} className="about-grid">

        {/* Left: identity card */}
        <div>
          {/* Profile block */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            padding: "28px",
            marginBottom: "16px",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}>
              DEVELOPER.profile
            </div>

            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "4px",
            }}>
              {profile.name}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--accent-red)",
              marginBottom: "20px",
            }}>
              {profile.role}
            </div>

            {[
              ["LOCATION", profile.location],
              ["EMAIL",    profile.email],
              ["GITHUB",   profile.github],
              ["LINKEDIN", profile.linkedin],
            ].map(([key, val]) => (
              <div key={key} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "10px 0",
                borderBottom: "1px solid var(--border)",
                gap: "16px",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  flexShrink: 0,
                }}>
                  {key}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--text-secondary)",
                  textAlign: "right",
                }}>
                  {val}
                </span>
              </div>
            ))}

            {/* Status */}
            <div style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              background: "rgba(34, 197, 94, 0.06)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "var(--accent-green)",
                flexShrink: 0,
                animation: "status-pulse 2s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--accent-green)",
              }}>
                {profile.status}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { label: "GitHub →", url: "https://github.com/anupkumarsharma9705" },
              { label: "LinkedIn →", url: "https://www.linkedin.com/in/aks9705" },
            ].map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  display: "block",
                  textAlign: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.05em",
                  padding: "10px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "border-color 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={e => { e.target.style.borderColor = "var(--accent-red)"; e.target.style.color = "var(--text-primary)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text-secondary)"; }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: system specs + focus areas */}
        <div>
          {/* System specs */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            padding: "28px",
            marginBottom: "16px",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              marginBottom: "20px",
            }}>
              SYSTEM.specifications
            </div>

            {specs.map((s, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: i < specs.length - 1 ? "1px solid var(--border)" : "none",
                gap: "12px",
              }}>
                <div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--text-primary)",
                  }}>
                    {s.value}
                  </div>
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.1em",
                  color: s.tagColor,
                  border: `1px solid ${s.tagColor}40`,
                  padding: "3px 8px",
                  flexShrink: 0,
                }}>
                  {s.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Focus areas */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            padding: "28px",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}>
              CORE_FOCUS.areas
            </div>

            {focus.map((f, i) => (
              <div key={i} style={{
                display: "flex",
                gap: "12px",
                marginBottom: "12px",
                alignItems: "flex-start",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--accent-red)",
                  flexShrink: 0,
                  marginTop: "2px",
                }}>
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}>
                  {f}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes status-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}