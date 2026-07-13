import { usePanelWipe, PanelWipe } from "../ui/DiagonalWipe";

const categories = [
  {
    id: "backend",
    label: "Backend Development",
    priority: "PRIMARY",
    priorityColor: "var(--accent-red)",
    description: "Core specialization — Java server-side development",
    skills: [
      { name: "Java",               note: "Primary language — OOP, Collections, Exception Handling, concurrent request handling" },
      { name: "Spring Boot",        note: "REST APIs, filter chains, MVC architecture, Dependency Injection" },
      { name: "REST API Design",    note: "HTTP methods, status codes, JSON contracts, structured error responses" },
      { name: "Spring Security",    note: "JWT filter chain, stateless auth, endpoint-level access control" },
      { name: "Exception Handling", note: "Global @ControllerAdvice — no stack traces or internal paths in API responses" },
    ],
  },
  {
    id: "database",
    label: "Database & Persistence",
    priority: "ACTIVE",
    priorityColor: "var(--accent-blue)",
    description: "Relational data modelling, ORM, and Redis state management",
    skills: [
      { name: "MySQL",          note: "Schema design, queries, indexing basics" },
      { name: "JPA / Hibernate",note: "Entity mapping, relationships, @Async writes to decouple DB from request path" },
      { name: "Redis",          note: "Rate-limit counters (TTL-based), idempotency state tracking via Spring Data Redis" },
      { name: "SQL",            note: "DDL/DML, joins, aggregations, subqueries" },
    ],
  },
  {
    id: "security",
    label: "Security & Auth",
    priority: "AWARE",
    priorityColor: "var(--accent-amber)",
    description: "Security concepts applied in real project code, not just theory",
    skills: [
      { name: "JWT Authentication",  note: "Token generation, validation, claims — implemented in Spring Security filter chain" },
      { name: "Attack Detection",    note: "SQL injection, XSS, path traversal detection — regex patterns at filter layer before business logic" },
      { name: "Security Headers",    note: "X-Frame-Options, HSTS, CSP, X-Content-Type-Options on every response" },
      { name: "Audit Logging",       note: "Structured event logs (actor, action, decision, outcome) — compliance pattern applied in fintech-gateway" },
    ],
  },
  {
    id: "tools",
    label: "Tooling & Infrastructure",
    priority: "CONFIGURED",
    priorityColor: "var(--text-secondary)",
    description: "Development environment, build tooling, and deployment",
    skills: [
      { name: "Docker",         note: "Containerization; docker-compose with health-check startup ordering across gateway, MySQL, and Redis" },
      { name: "Maven",          note: "Dependency management, build lifecycle" },
      { name: "Git & GitHub",   note: "Version control, branching, pull requests" },
      { name: "Spring Profiles",note: "Dev/prod separation — Swagger on in dev, ddl-auto=validate in prod, env-var config" },
      { name: "Postman",        note: "API testing and endpoint documentation" },
    ],
  },
  {
    id: "fundamentals",
    label: "Programming Fundamentals",
    priority: "SOLID",
    priorityColor: "var(--accent-green)",
    description: "Core CS concepts applied in backend development",
    skills: [
      { name: "OOP Principles",    note: "Encapsulation, Inheritance, Polymorphism, Abstraction — applied in service layer design" },
      { name: "Data Structures",   note: "Arrays, Lists, Maps — Java Collections in daily use" },
      { name: "Algorithms",        note: "Sorting, searching, complexity awareness" },
      { name: "Concurrency Basics",note: "Identified idempotency race condition in own code and documented the atomic fix — shows honest self-review" },
    ],
  },
];

export default function Skills() {
  const { activeIndex, direction, goTo } = usePanelWipe(categories.length);
  const current = categories[activeIndex];
  const panelKey = `${current.id}-${activeIndex}`;

  const handleTabClick = (idx) => {
    if (idx !== activeIndex) goTo(idx);
  };

  return (
    <section id="skills" className="section-container">

      {/* Section header */}
      <div style={{ marginBottom: "56px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: ".62rem", letterSpacing: ".2em", color: "var(--accent-red)", marginBottom: "12px" }}>
          // SECTION_03 · TECHNICAL_STACK
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-.02em" }}>
          Skills
        </h2>
        <div style={{ height: "1px", width: "60px", background: "var(--accent-red)", marginTop: "16px", opacity: .6 }} />
      </div>

      {/* Two-column layout */}
      <div style={{
        display: "grid", gridTemplateColumns: "260px 1fr", gap: "2px",
      }} className="skills-grid">

        {/* LEFT: Category tabs */}
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
                cursor: "pointer",
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

        {/* RIGHT: Content panel */}
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          overflow: "hidden",
          position: "relative",
        }}>
          <PanelWipe
            key={panelKey}
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
