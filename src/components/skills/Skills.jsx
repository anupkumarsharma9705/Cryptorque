import { usePanelWipe, PanelWipe } from "../ui/DiagonalWipe";
const categories = [
  {
    id: "backend",
    label: "Backend Development",
    priority: "PRIMARY",
    priorityColor: "var(--accent-red)",
    description: "Core specialization in Java server-side development",
    skills: [
      { name: "Java",               note: "Primary language — OOP, Collections, Exception Handling" },
      { name: "Spring Boot",        note: "REST APIs, MVC architecture, Dependency Injection"       },
      { name: "REST API Design",    note: "HTTP methods, status codes, JSON request/response"       },
      { name: "MVC Architecture",   note: "Separation of Controller, Service, Repository layers"    },
      { name: "Exception Handling", note: "Global exception handlers, custom error responses"       },
    ],
  },
  {
    id: "database",
    label: "Database & Persistence",
    priority: "ACTIVE",
    priorityColor: "var(--accent-blue)",
    description: "Relational data modelling and ORM",
    skills: [
      { name: "MySQL",                  note: "Schema design, queries, indexing fundamentals"     },
      { name: "SQL",                    note: "DDL/DML, joins, aggregations, subqueries"          },
      { name: "JPA / Hibernate",        note: "Entity mapping, relationships, JPQL"               },
      { name: "Entity Relationships",   note: "OneToMany, ManyToMany, lazy/eager loading"         },
    ],
  },
  {
    id: "security",
    label: "Security & Auth",
    priority: "AWARE",
    priorityColor: "var(--accent-amber)",
    description: "Foundational security knowledge applied to backend systems",
    skills: [
      { name: "JWT Authentication",   note: "Token generation, validation, claims handling"        },
      { name: "Authentication Basics",note: "Login flows, session vs token-based auth"             },
      { name: "Authorization",        note: "Role-based access control concepts"                   },
      { name: "NIST Framework",       note: "Awareness of cybersecurity compliance standards"      },
    ],
  },
  {
    id: "tools",
    label: "Tooling & Infrastructure",
    priority: "CONFIGURED",
    priorityColor: "var(--text-secondary)",
    description: "Development environment and build tooling",
    skills: [
      { name: "Git & GitHub",   note: "Version control, branching, pull requests"                },
      { name: "Maven",          note: "Dependency management, build lifecycle"                    },
      { name: "Docker",         note: "Containerization basics, image/container management"       },
      { name: "IntelliJ IDEA",  note: "Primary Java IDE"                                          },
      { name: "Postman",        note: "API testing and documentation"                             },
    ],
  },
  {
    id: "fundamentals",
    label: "Programming Fundamentals",
    priority: "SOLID",
    priorityColor: "var(--accent-green)",
    description: "Core CS concepts applied in backend development",
    skills: [
      { name: "OOP Principles",   note: "Encapsulation, Inheritance, Polymorphism, Abstraction" },
      { name: "Data Structures",  note: "Arrays, Lists, Maps — standard Java Collections usage"  },
      { name: "Algorithms",       note: "Sorting, searching, complexity awareness (basics)"       },
    ],
  },
];

export default function Skills() {
  /* ── Diagonal wipe state ── */
const { activeIndex, direction, goTo } = usePanelWipe(categories.length);  const current = categories[activeIndex];

  /* key changes on each category switch — forces DiagonalWipePanel remount */
  const panelKey = `${current.id}-${activeIndex}`;

  const handleTabClick = (idx) => {
    if (idx !== activeIndex) goTo(idx);
  };

  return (
    <section id="skills" style={{
      padding: "100px 24px", maxWidth: "1200px", margin: "0 auto",
    }}>

      {/* ─── Section header ─── */}
      <div style={{ marginBottom: "56px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: ".62rem", letterSpacing: ".2em", color: "var(--accent-red)", marginBottom: "12px" }}>
          // SECTION_03 · TECHNICAL_STACK
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-.02em" }}>
          Skills
        </h2>
        <div style={{ height: "1px", width: "60px", background: "var(--accent-red)", marginTop: "16px", opacity: .6 }} />
      </div>

      {/* ─── Two-column layout ─── */}
      <div style={{
        display: "grid", gridTemplateColumns: "260px 1fr", gap: "2px",
      }} className="skills-grid">

        {/* ── LEFT: Category tabs ── */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: ".56rem", letterSpacing: ".15em",
            color: "var(--text-muted)", padding: "14px 16px 10px",
            borderBottom: "1px solid var(--border)",
          }}>
            MODULES
          </div>

          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => handleTabClick(idx)}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                width: "100%", textAlign: "left",
                padding: "13px 16px",
                background: activeIndex === idx ? "var(--bg-secondary)" : "transparent",
                border: "none",
                borderLeft: activeIndex === idx
                  ? `2px solid ${cat.priorityColor}`
                  : "2px solid transparent",
                borderBottom: "1px solid var(--border)",
                cursor: "none",
                transition: "background .15s ease, border-color .15s ease",
              }}
            >
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: ".65rem",
                color: activeIndex === idx ? "var(--text-primary)" : "var(--text-secondary)",
              }}>
                {cat.label}
              </span>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: ".52rem", letterSpacing: ".08em",
                color: cat.priorityColor,
                background: `${cat.priorityColor}18`,
                border: `1px solid ${cat.priorityColor}40`,
                padding: "2px 6px", flexShrink: 0,
              }}>
                {cat.priority}
              </span>
            </button>
          ))}
        </div>

        {/* ── RIGHT: Content panel — wrapped in DiagonalWipePanel ── */}
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          overflow: "hidden",  /* needed so clip-path doesn't bleed */
          position: "relative",
        }}>
          <PanelWipe
            key={panelKey}           /* ← re-mount = re-trigger animation */
            direction={direction}
            style={{ padding: "28px", height: "100%" }}
          >
            {/* Category header */}
            <div style={{ marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700 }}>
                  {current.label}
                </h3>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: ".6rem",
                  color: current.priorityColor,
                  border: `1px solid ${current.priorityColor}40`,
                  padding: "4px 10px",
                }}>
                  {current.priority}
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: ".85rem", color: "var(--text-secondary)" }}>
                {current.description}
              </p>
            </div>

            {/* Skills list */}
            {current.skills.map((skill, i) => (
              <div key={i} style={{
                display: "flex", gap: "20px", alignItems: "flex-start",
                padding: "14px 0",
                borderBottom: i < current.skills.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{
                  width: "28px", height: "28px",
                  background: "var(--bg-secondary)",
                  border: `1px solid ${current.priorityColor}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)", fontSize: ".6rem", color: current.priorityColor,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: ".82rem", fontWeight: 600, marginBottom: "4px" }}>
                    {skill.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: ".78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    {skill.note}
                  </div>
                </div>
              </div>
            ))}
          </PanelWipe>
        </div>
      </div>

      <style>{`@media(max-width:768px){ .skills-grid{grid-template-columns:1fr!important} }`}</style>
    </section>
  );
}