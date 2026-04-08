import React, { useState } from "react";

const certs = [
  {
    id: "fullstack",
    category: "DEVELOPMENT",
    categoryColor: "var(--accent-blue)",
    issuer: "Coursera",
    title: "Full Stack Java Development",
    year: "2024",
    description:
      "Gained strong foundation in Core Java, OOP, Collections, and backend application development. Formed the base for applying Spring Boot and building RESTful services.",
    topics: ["Core Java", "OOP", "Collections", "JDBC", "SQL Basics"],
    url: "https://drive.google.com/file/d/1ZD-lCniDEgbbp48ik3MgZNZ05AuB2yJU/view?usp=sharing",
  },
  {
    id: "frontend",
    category: "DEVELOPMENT",
    categoryColor: "var(--accent-blue)",
    issuer: "Coursera",
    title: "Introduction to Front-End Development",
    year: "2024",
    description:
      "Learned frontend fundamentals specifically to understand how React-based UIs integrate with Spring Boot REST APIs — enabling full API contract awareness.",
    topics: ["HTML", "CSS", "JavaScript", "React Basics", "REST Integration"],
    url: "https://drive.google.com/file/d/1FUMfknhpnLak-4HgapKsYs9KuLDVP25V/view?usp=sharing",
  },
  {
    id: "cybersec",
    category: "SECURITY",
    categoryColor: "var(--accent-amber)",
    issuer: "Cisco Networking Academy",
    title: "Introduction to Cybersecurity",
    year: "2024",
    description:
      "Understanding of common security threats, attack vectors, and best practices relevant to backend systems and public-facing APIs.",
    topics: ["Threat Landscape", "Network Security", "API Security Basics", "Best Practices"],
    url: "https://drive.google.com/file/d/1d7drQKIwh_prIMIRL03IkmD3OLOyoMyt/view?usp=sharing",
  },
  {
    id: "vuln",
    category: "SECURITY",
    categoryColor: "var(--accent-amber)",
    issuer: "IBM SkillsBuild",
    title: "Vulnerability Management",
    year: "2025",
    description:
      "Learned how vulnerabilities are identified, scored (CVSS), and mitigated in software systems — directly applicable to writing more secure backend code.",
    topics: ["CVSS Scoring", "Vulnerability Lifecycle", "Patch Management", "Risk Assessment"],
    url: "https://drive.google.com/file/d/1d7drQKIwh_prIMIRL03IkmD3OLOyoMyt/view?usp=sharing",
  },
  {
    id: "grc",
    category: "COMPLIANCE",
    categoryColor: "var(--accent-cyan)",
    issuer: "IBM SkillsBuild",
    title: "Governance, Risk, Compliance & Data Privacy",
    year: "2025",
    description:
      "Knowledge of GRC frameworks and data privacy principles applicable to secure backend system design and API data handling.",
    topics: ["GRC Frameworks", "GDPR Awareness", "Data Privacy", "Risk Management"],
    url: "https://drive.google.com/file/d/1d7drQKIwh_prIMIRL03IkmD3OLOyoMyt/view?usp=sharing",
  },
];

const filters = [
  { id: "all", label: "ALL" },
  { id: "DEVELOPMENT", label: "DEVELOPMENT" },
  { id: "SECURITY", label: "SECURITY" },
  { id: "COMPLIANCE", label: "COMPLIANCE" },
];

export default function Certifications() {
  const [filter, setFilter] = useState("all");

  const visible = filter === "all" ? certs : certs.filter(c => c.category === filter);

  return (
    <section id="certs" style={{
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
          // SECTION_06 · CERTIFICATIONS
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
        }}>
          Certifications
        </h2>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          marginTop: "12px",
        }}>
          Focused on Java development, backend engineering, and security fundamentals.
        </p>
        <div style={{ height: "1px", width: "60px", background: "var(--accent-red)", marginTop: "16px", opacity: 0.6 }} />
      </div>

      {/* Filter row */}
      <div style={{
        display: "flex",
        gap: "4px",
        marginBottom: "32px",
        flexWrap: "wrap",
      }}>
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              padding: "7px 16px",
              background: filter === f.id ? "var(--accent-red)" : "var(--bg-card)",
              color: filter === f.id ? "#fff" : "var(--text-muted)",
              border: filter === f.id ? "1px solid var(--accent-red)" : "1px solid var(--border)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "8px",
      }}>
        {visible.map(cert => (
          <div key={cert.id} style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            transition: "border-color 0.2s ease",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-accent)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            {/* Top row */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  color: cert.categoryColor,
                  border: `1px solid ${cert.categoryColor}40`,
                  padding: "2px 8px",
                  letterSpacing: "0.08em",
                }}>
                  {cert.category}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  color: "var(--text-muted)",
                }}>
                  {cert.year}
                </span>
              </div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-muted)",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                padding: "2px 8px",
              }}>
                {cert.issuer}
              </span>
            </div>

            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "10px",
              lineHeight: 1.4,
            }}>
              {cert.title}
            </h3>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "16px",
              flex: 1,
            }}>
              {cert.description}
            </p>

            {/* Topics */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "16px" }}>
              {cert.topics.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  padding: "2px 7px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-accent)",
                  color: "var(--text-muted)",
                }}>
                  {t}
                </span>
              ))}
            </div>

            {/* View link */}
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: cert.categoryColor,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "gap 0.15s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.gap = "10px"}
              onMouseLeave={e => e.currentTarget.style.gap = "6px"}
            >
              VIEW_CERTIFICATE →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}