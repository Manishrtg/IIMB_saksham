import { useState, useEffect } from "react";

const pillars = [
  {
    number: "01",
    title: "Infrastructure\nAugmentation",
    description: "Rebuilding classrooms, furniture, lighting, and learning spaces to meet modern standards.",
    color: "#1B4FD8",
    bg: "#EEF2FF",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <rect x="6" y="18" width="28" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M3 18L20 6l17 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="15" y="25" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Career Guidance &\nCapacity Building",
    description: "Mentorship programs, workshops, and skill development to shape tomorrow's leaders.",
    color: "#B45309",
    bg: "#FFFBEB",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M28 18l2.5 2.5L34 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "E-Learning &\nICT Infrastructure",
    description: "Digital classrooms, computers, and internet connectivity bridging the technology gap.",
    color: "#065F46",
    bg: "#ECFDF5",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <rect x="5" y="8" width="30" height="20" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M13 34h14M20 28v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 16h5M12 21h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="27" cy="18.5" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Drinking Water,\nSanitation & Hygiene",
    description: "Clean water access, functional toilets, and hygiene habits for every child's dignity.",
    color: "#0E7490",
    bg: "#ECFEFF",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <path d="M20 6C14 6 10 11 10 16c0 6 10 20 10 20s10-14 10-20c0-5-4-10-10-10z" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="20" cy="15" r="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    number: "05",
    title: "Educational\nScholarship",
    description: "Financial support removing economic barriers so every deserving student can succeed.",
    color: "#6D28D9",
    bg: "#F5F3FF",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <path d="M20 5l3.5 8.8 9.8.2-7.8 5.8 3 9.4L20 24l-8.5 5.2 3-9.4L6.7 14l9.8-.2L20 5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "06",
    title: "Health &\nNutrition",
    description: "Midday meals, health checkups, and wellness programs fueling young minds and bodies.",
    color: "#BE123C",
    bg: "#FFF1F2",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
        <path d="M20 36C20 36 7 25 7 16a13 13 0 0126 0c0 9-13 20-13 20z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 16h12M20 11v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const values = [
  { icon: "🎯", title: "Transparency", desc: "Complete visibility into projects, funding, and outcomes" },
  { icon: "⚡", title: "Professionalism", desc: "IIM-backed standards in planning and execution" },
  { icon: "📊", title: "Impact", desc: "Data-driven decisions and measurable outcomes" },
  { icon: "🤝", title: "Ownership", desc: "Complete accountability for every commitment" },
];

const phases = [
  { period: "2020–2025", phase: "Phase 1", title: "Proving the Model", detail: "Establish a proven model in Karnataka, renovating 100+ schools and demonstrating measurable impact on student outcomes and community engagement." },
  { period: "2025–2030", phase: "Phase 2", title: "Scaling Karnataka", detail: "Partnering with state government and expanding our network of NGO partners and corporate donors to reach 1,000+ schools." },
  { period: "2030+", phase: "Phase 3", title: "Pan-India Movement", detail: "Replicating the Saksham model across multiple states, influencing policy, and creating a national movement for government school transformation." },
];

export default function AboutStoryPage() {
  const [activePhase, setActivePhase] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAFAF8", minHeight: "100vh", color: "#1A1A1A" }}>

      

      {/* ── HERO ── */}
      <header style={{
        minHeight: "70vh",
        background: "#0F2456",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 4rem 5rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-5%", right: "-20%", width: "70vw", height: "70vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "4rem", width: "4rem", height: "1px", background: "#E8892A" }} />

        <div style={{ position: "relative", maxWidth: "900px" }}>
      
          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#FFFFFF", margin: "0 0 2rem" }}>
            Our Story<br />&amp; Vision
          </h1>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: 1.7, fontWeight: 400 }}>
            Transforming government schools and Anganwadis across Karnataka — An Initiative Under the Unnat Bharat Abhiyan Initiatives of IIM Bangalore.
          </p>
        </div>

        {/* scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", right: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "system-ui", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Scroll</span>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </header>

      {/* ── BEGINNING ── */}
      <section id="story" style={{ padding: "8rem 4rem", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>The Beginning</p>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0F2456", margin: 0 }}>
            Born from<br />observation
          </h2>
          <div style={{ width: "3rem", height: "3px", background: "#E8892A", marginTop: "1.5rem" }} />
        </div>
        <div>
          <p style={{ fontSize: "1.15rem", lineHeight: 1.85, color: "#444", marginBottom: "1.5rem" }}>
            Saksham was born from a simple observation and a profound commitment. During field visits across Karnataka, Prof. Gopal Naik and his team from IIM Bangalore witnessed the stark reality of government schools: crumbling infrastructure, inadequate sanitation facilities, and learning environments that failed our children.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#555", marginBottom: "1.5rem" }}>
            While these schools served millions of children from underprivileged backgrounds, they lacked the most basic facilities—proper classrooms, clean toilets, functional furniture, and adequate lighting.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#555" }}>
            In 2023, Saksham was launched as an IIM Bangalore-backed initiative with a clear mission: to systematically renovate and revitalize government schools across Karnataka, bringing them up to standards that every child deserves.
          </p>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section style={{ background: "#0F2456", padding: "7rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "3.5rem" }}>Chairperson</p>
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "5rem", alignItems: "center" }}>
            {/* Avatar */}
            <div style={{ position: "relative" }}>
              <div style={{ width: "220px", height: "220px", borderRadius: "50%", background: "linear-gradient(135deg, #1B4FD8 0%, #0F2456 100%)", border: "2px solid rgba(232,137,42,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                <span style={{ fontSize: "4rem", fontWeight: 700, color: "rgba(255,255,255,0.15)", fontFamily: "Georgia" }}>GN</span>
              </div>
              <div style={{ position: "absolute", bottom: "-1rem", right: "1.5rem", background: "#E8892A", color: "#fff", fontFamily: "system-ui", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.4rem 0.9rem", borderRadius: "2rem" }}>
                Chairperson
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>Prof. Gopal Naik</h2>
              <p style={{ fontFamily: "system-ui", color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", marginBottom: "1.5rem", letterSpacing: "0.04em" }}>Faculty, IIM Bangalore · Visionary Leader</p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.7)", marginBottom: "1.25rem" }}>
                Prof. Gopal Naik is a distinguished faculty member at IIM Bangalore, with over two decades of experience in rural development, agricultural economics, and social entrepreneurship.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.7)", marginBottom: "1.25rem" }}>
                His research has consistently focused on bridging gaps in rural infrastructure and creating sustainable models for social impact. His vision for Saksham stems from the belief that quality education infrastructure is not a luxury—it's a fundamental right.
              </p>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                {["PhD, Agricultural Economics", "Professor, IIM Bangalore", "25+ yrs rural development"].map(tag => (
                  <span key={tag} style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", borderLeft: "2px solid #E8892A", paddingLeft: "0.75rem", lineHeight: 1.4 }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IIM PARTNERSHIP ── */}
      <section style={{ padding: "7rem 4rem", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Institutional Backing</p>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0F2456", marginBottom: "1.5rem" }}>IIM Bangalore<br />Partnership</h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#555" }}>
                IIM Bangalore provides institutional support through faculty advisors, student research teams, and access to the institute's extensive network of alumni and corporate partners — bringing management excellence to social transformation.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { label: "Credibility", desc: "Association with India's premier management institution" },
                { label: "Expertise", desc: "Faculty research and best practices in social impact" },
                { label: "Talent", desc: "Student volunteers contributing skills and time" },
                { label: "Network", desc: "Connections to corporate partners and funding sources" },
              ].map(({ label, desc }) => (
                <div key={label} style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: "12px", padding: "1.5rem" }}>
                  <div style={{ width: "2rem", height: "2px", background: "#E8892A", marginBottom: "0.75rem" }} />
                  <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.85rem", color: "#0F2456", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.85rem", color: "#666", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 PILLARS ── */}
      <section id="pillars" style={{ padding: "7rem 4rem", background: "#F4F3EF" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Our Approach</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456", margin: "0 0 0.5rem" }}>6 Pillars for Transformation</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", margin: "1.25rem auto 0" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {pillars.map((p, i) => (
              <div
                key={p.number}
                style={{
                  background: "#fff",
                  border: "1px solid #E5E5E0",
                  borderRadius: "16px",
                  padding: "2rem 1.75rem",
                  display: "flex", flexDirection: "column", gap: "1rem",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "default",
                  animationDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)";
                  e.currentTarget.style.borderColor = p.color;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#E5E5E0";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", color: p.color }}>
                    {p.icon}
                  </div>
                  <span style={{ fontFamily: "system-ui", fontSize: "0.75rem", fontWeight: 700, color: "#CCC", letterSpacing: "0.06em" }}>{p.number}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "system-ui", fontSize: "0.95rem", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.35, whiteSpace: "pre-line", marginBottom: "0.5rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#777", lineHeight: 1.65, margin: 0 }}>{p.description}</p>
                </div>
                <div style={{ width: "2rem", height: "2px", background: p.color, borderRadius: "2px", marginTop: "auto" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section id="vision" style={{ padding: "7rem 4rem", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Purpose</p>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456" }}>Vision &amp; Mission</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
            <div style={{ background: "#0F2456", borderRadius: "20px", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-3rem", right: "-3rem", width: "10rem", height: "10rem", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)" }} />
              <span style={{ fontFamily: "system-ui", fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>🎯</span>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.01em" }}>Vision</h3>
              <p style={{ fontFamily: "system-ui", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", margin: 0 }}>
                To create a future where every government school in India provides a safe, dignified, and inspiring learning environment—where infrastructure never stands as a barrier to a child's education and dreams.
              </p>
            </div>
            <div style={{ background: "#E8892A", borderRadius: "20px", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-3rem", right: "-3rem", width: "10rem", height: "10rem", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)" }} />
              <span style={{ fontFamily: "system-ui", fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>📐</span>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.01em" }}>Mission</h3>
              <p style={{ fontFamily: "system-ui", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(255,255,255,0.85)", margin: 0 }}>
                To systematically identify, fund, and renovate government schools across Karnataka and beyond, through transparent partnerships, professional management, and measurable impact.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: "20px", padding: "2.5rem" }}>
            <h3 style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", fontWeight: 600, marginBottom: "2rem" }}>Core Values</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
              {values.map(({ icon, title, desc }) => (
                <div key={title} style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>{icon}</span>
                  <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.85rem", color: "#0F2456", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>{title}</p>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.8rem", color: "#777", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LONG-TERM ROADMAP ── */}
      <section style={{ padding: "7rem 4rem", background: "#0F2456" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Roadmap</p>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", marginBottom: "3.5rem" }}>Long-Term Vision</h2>

          {/* Phase selector */}
          <div style={{ display: "flex", gap: "0", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", overflow: "hidden", width: "fit-content", marginBottom: "3rem" }}>
            {phases.map((ph, i) => (
              <button
                key={i}
                onClick={() => setActivePhase(i)}
                style={{
                  fontFamily: "system-ui", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.04em",
                  padding: "0.75rem 1.75rem", border: "none", cursor: "pointer",
                  background: activePhase === i ? "#E8892A" : "transparent",
                  color: activePhase === i ? "#fff" : "rgba(255,255,255,0.45)",
                  transition: "all 0.2s ease",
                }}
              >
                {ph.phase}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "4rem", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "0.5rem" }}>Period</p>
              <p style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", margin: 0 }}>{phases[activePhase].period}</p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>{phases[activePhase].title}</h3>
              <p style={{ fontFamily: "system-ui", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", margin: 0 }}>{phases[activePhase].detail}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: "3.5rem", height: "2px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(activePhase + 1) / phases.length * 100}%`, background: "#E8892A", borderRadius: "2px", transition: "width 0.4s ease" }} />
            {phases.map((_, i) => (
              <div key={i} onClick={() => setActivePhase(i)} style={{ position: "absolute", top: "50%", left: `${i / (phases.length - 1) * 100}%`, transform: "translate(-50%, -50%)", width: "10px", height: "10px", borderRadius: "50%", background: i <= activePhase ? "#E8892A" : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "background 0.3s ease" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={{ padding: "7rem 4rem", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "3rem", height: "3px", background: "#E8892A", margin: "0 auto 3rem" }} />
          <blockquote style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontStyle: "italic", fontWeight: 400, lineHeight: 1.65, color: "#1A1A1A", letterSpacing: "-0.01em", margin: "0 0 2rem" }}>
            "Our goal is not just to renovate buildings, but to restore dignity, hope, and opportunity for millions of children who deserve nothing less than excellence."
          </blockquote>
          <p style={{ fontFamily: "system-ui", fontSize: "0.85rem", fontWeight: 600, color: "#E8892A", letterSpacing: "0.08em", textTransform: "uppercase" }}>— Prof. Gopal Naik</p>
          <div style={{ width: "3rem", height: "3px", background: "#E5E5E0", margin: "3rem auto 0" }} />
        </div>
      </section>

      
    </div>
  );
}