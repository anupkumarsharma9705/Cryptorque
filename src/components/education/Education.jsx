import React from "react";

const education = [
  {
    index: "01",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering",
    institution: "St. Peter's Engineering College",
    location: "Hyderabad, Telangana",
    period: "2021 – 2025",
    grade: "CGPA: 7.73 / 10",
    highlights: [
      "Specialization in Software Development — primary focus on Java and backend systems",
      "Final Year Project: Secure File Transfer Gateway (SFTG) — secure backend system built with Java and Spring Boot, implementing JWT authentication, encrypted file handling, and controlled public link access",
      "Consistently maintained academic performance while independently building multiple backend projects",
    ],
    accentColor: "var(--accent-red)",
  },
  {
    index: "02",
    degree: "Higher Secondary Education (Class XII)",
    field: "Science Stream — Physics, Chemistry, Mathematics",
    institution: "Sri Chaitanya Junior College",
    location: "Hyderabad, Telangana",
    period: "2019 – 2021",
    grade: "Percentage: 93.4%",
    highlights: [
      "Strong foundation in Mathematics and Physics — foundational reasoning skills applied in algorithm and system design",
    ],
    accentColor: "var(--accent-blue)",
  },
  {
    index: "03",
    degree: "Secondary Education (Class X)",
    field: null,
    institution: "Navodaya High School",
    location: "Hyderabad, Telangana",
    period: "2018 – 2019",
    grade: "Percentage: 88%",
    highlights: [
      "Strong performance in Mathematics",
      "Active participation in sports and extracurricular activities",
    ],
    accentColor: "var(--text-secondary)",
  },
];

const summary = [
  { value: "2025",   label: "GRADUATION_YEAR" },
  { value: "93.4%",  label: "CLASS_XII_SCORE" },
  { value: "7.73",   label: "B_TECH_CGPA" },
];

export default function Education() {
  return (
    <section id="education" style={{
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
          // SECTION_05 · ACADEMIC_BACKGROUND
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
        }}>
          Education
        </h2>
        <div style={{ height: "1px", width: "60px", background: "var(--accent-red)", marginTop: "16px", opacity: 0.6 }} />
      </div>

      {/* Summary row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "8px",
        marginBottom: "40px",
      }}>
        {summary.map(s => (
          <div key={s.label} style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            padding: "20px",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "var(--accent-red)",
              letterSpacing: "-0.02em",
              marginBottom: "6px",
            }}>
              {s.value}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {education.map((edu, i) => (
          <div key={i} style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: "200px 1fr",
          }} className="edu-item">

            {/* Left: period + grade */}
            <div style={{
              borderRight: "1px solid var(--border)",
              padding: "24px",
              background: "var(--bg-secondary)",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: edu.accentColor,
                marginBottom: "8px",
              }}>
                {edu.index}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--text-primary)",
                marginBottom: "16px",
                lineHeight: 1.6,
              }}>
                {edu.period}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: edu.accentColor,
                border: `1px solid ${edu.accentColor}40`,
                padding: "4px 8px",
                display: "inline-block",
              }}>
                {edu.grade}
              </div>
            </div>

            {/* Right: details */}
            <div style={{ padding: "24px" }}>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "4px",
              }}>
                {edu.degree}
              </h3>
              {edu.field && (
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: edu.accentColor,
                  marginBottom: "4px",
                }}>
                  {edu.field}
                </div>
              )}
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                marginBottom: "16px",
              }}>
                {edu.institution} · {edu.location}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {edu.highlights.map((h, j) => (
                  <div key={j} style={{ display: "flex", gap: "10px" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: edu.accentColor,
                      flexShrink: 0,
                      marginTop: "2px",
                    }}>
                      ›
                    </span>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.82rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}>
                      {h}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .edu-item { grid-template-columns: 1fr !important; }
          .edu-item > div:first-child { border-right: none !important; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </section>
  );
}