import React, { useState } from "react";

const channels = [
  {
    label: "EMAIL",
    value: "AnupKS9705@outlook.com",
    url: "mailto:AnupKS9705@outlook.com",
    color: "var(--accent-red)",
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/aks9705",
    url: "https://www.linkedin.com/in/aks9705",
    color: "var(--accent-blue)",
  },
  {
    label: "GITHUB",
    value: "github.com/anupkumarsharma9705",
    url: "https://github.com/anupkumarsharma9705",
    color: "var(--text-secondary)",
  },
  {
    label: "TWITTER / X",
    value: "@Anup_9705",
    url: "https://x.com/Anup_9705",
    color: "var(--accent-cyan)",
  },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    setSending(false);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.78rem",
    borderRadius: "0",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    letterSpacing: "0.12em",
    color: "var(--text-muted)",
    display: "block",
    marginBottom: "6px",
  };

  return (
    <section id="contact" style={{
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
          // SECTION_07 · CONNECT
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
        }}>
          Contact
        </h2>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          marginTop: "12px",
          maxWidth: "480px",
        }}>
          Open to full-time backend roles, internships, and backend engineering collaborations.
        </p>
        <div style={{ height: "1px", width: "60px", background: "var(--accent-red)", marginTop: "16px", opacity: 0.6 }} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        gap: "48px",
        alignItems: "start",
      }} className="contact-grid">

        {/* Left: channels */}
        <div>
          {/* Status */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            padding: "20px 24px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "var(--accent-green)",
              boxShadow: "0 0 6px var(--accent-green)",
              flexShrink: 0,
              animation: "status-pulse 2s ease-in-out infinite",
            }} />
            <div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--text-primary)",
                marginBottom: "2px",
              }}>
                AVAILABLE_FOR_OPPORTUNITIES
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-muted)",
              }}>
                Full-time · Internships · Backend Projects
              </div>
            </div>
          </div>

          {/* Channel list */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              padding: "14px 20px 10px",
              borderBottom: "1px solid var(--border)",
            }}>
              DIRECT_CHANNELS
            </div>
            {channels.map((ch, i) => (
              <a
                key={i}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  borderBottom: i < channels.length - 1 ? "1px solid var(--border)" : "none",
                  textDecoration: "none",
                  transition: "background 0.15s ease",
                  gap: "16px",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}>
                    {ch.label}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: ch.color,
                  }}>
                    {ch.value}
                  </div>
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                }}>
                  →
                </span>
              </a>
            ))}
          </div>

          {/* Mini manifesto */}
          <div style={{
            marginTop: "24px",
            padding: "20px",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
          }}>
            <span style={{ color: "var(--accent-red)" }}>// </span>
            Backend developer focused on systems that are secure, scalable, and well-structured. Looking for environments that value clean architecture and engineering discipline.
          </div>
        </div>

        {/* Right: form */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          padding: "32px",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "var(--text-muted)",
            marginBottom: "24px",
          }}>
            SEND_TRANSMISSION
          </div>

          {sent ? (
            <div style={{
              padding: "40px 20px",
              textAlign: "center",
              background: "rgba(34, 197, 94, 0.05)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--accent-green)",
                marginBottom: "8px",
              }}>
                TRANSMISSION_RECEIVED ✓
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
              }}>
                Message queued. I'll respond shortly.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              <div>
                <label style={labelStyle}>IDENTIFIER / NAME</label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "var(--accent-red)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                />
              </div>

              <div>
                <label style={labelStyle}>RETURN_ADDRESS / EMAIL</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "var(--accent-red)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                />
              </div>

              <div>
                <label style={labelStyle}>MESSAGE_PAYLOAD</label>
                <textarea
                  placeholder="Your message..."
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = "var(--accent-red)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: sending ? "var(--bg-secondary)" : "var(--accent-red)",
                  color: sending ? "var(--text-muted)" : "#fff",
                  border: "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  cursor: sending ? "not-allowed" : "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={e => { if (!sending) e.target.style.background = "#be1235"; }}
                onMouseLeave={e => { if (!sending) e.target.style.background = "var(--accent-red)"; }}
              >
                {sending ? "TRANSMITTING..." : "SEND_MESSAGE →"}
              </button>

            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes status-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}