import { useState } from "react";

// ── Mock Data ──────────────────────────────────────────────────────────────
const mockStats = {
  schoolsSupported: 108,
  fundsRaised: 15000000,
  childrenImpacted: 8000,
  ongoingProjects: 12,
};

const mockSchools = [
  { id: 1, project_code: "KA-001", name: "GHPS Doddaballapur", district: "Bangalore Rural", state: "Karnataka", student_count: 320, total_cost: 850000 },
  { id: 2, project_code: "KA-002", name: "GMPS Nelamangala", district: "Bangalore Rural", state: "Karnataka", student_count: 210, total_cost: 620000 },
  { id: 3, project_code: "KA-003", name: "GHPS Ramanagara", district: "Ramanagara", state: "Karnataka", student_count: 415, total_cost: 1100000 },
];

const testimonials = [
  { initials: "RP", name: "Rajesh Patel", role: "School Principal, Belgaum", color: "#1B4FD8", bg: "#EEF2FF", quote: "The transformation of our school has been remarkable. Students now have clean toilets, bright classrooms, and proper furniture — attendance and learning outcomes have significantly improved." },
  { initials: "SK", name: "Sunita Krishnan", role: "CSR Head, Tech Corp", color: "#065F46", bg: "#ECFDF5", quote: "Saksham's transparent approach and detailed reporting gave us full confidence in our CSR investment. Every rupee is tracked and the impact is tangible." },
  { initials: "GN", name: "Prof. Gopal Naik", role: "Founder, IIM Bangalore", color: "#B45309", bg: "#FFFBEB", quote: "Academic rigour and professional management applied to social impact. Saksham's systematic approach to school transformation should be replicated across India." },
];

// ── Icons ──────────────────────────────────────────────────────────────────
const SchoolSVG = () => (
  <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
    <rect x="6" y="18" width="28" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M3 18L20 6l17 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="15" y="25" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);
const HeartSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="32" height="32">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const UsersSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="32" height="32">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const TrendSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="32" height="32">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);
const ArrowSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const BuildingSVG = () => (
  <svg viewBox="0 0 40 40" fill="none" width="52" height="52">
    <rect x="5" y="10" width="30" height="26" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M13 36V24h14v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="10" y="15" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="25" y="15" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 10L20 2l18 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ icon, value, label, color, bg, badge }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", border: `1px solid ${hovered ? color : "#E5E5E0"}`,
        borderRadius: "16px", padding: "2rem 1.75rem",
        display: "flex", flexDirection: "column", gap: "1rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.08)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color }}>{icon}</div>
        <span style={{ fontFamily: "system-ui", fontSize: "0.65rem", fontWeight: 700, color: "#CCC", letterSpacing: "0.08em" }}>{badge}</span>
      </div>
      <div>
        <p style={{ fontFamily: "system-ui", fontSize: "2.4rem", fontWeight: 800, color, lineHeight: 1, marginBottom: "0.35rem" }}>{value}</p>
        <p style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#777", margin: 0 }}>{label}</p>
      </div>
      <div style={{ width: "2rem", height: "2px", background: color, borderRadius: "2px", marginTop: "auto" }} />
    </div>
  );
}

// ── School Card ────────────────────────────────────────────────────────────
function SchoolCard({ school, formatCurrency }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", border: `1px solid ${hovered ? "#1B4FD8" : "#E5E5E0"}`,
        borderRadius: "16px", overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.08)" : "none",
        cursor: "pointer",
      }}
    >
      <div style={{ height: "160px", background: "linear-gradient(135deg, #0F2456 0%, #1B4FD8 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.15)" }}>
        <BuildingSVG />
      </div>
      <div style={{ padding: "1.75rem" }}>
        <span style={{ fontFamily: "system-ui", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", color: "#065F46", background: "#ECFDF5", borderRadius: "4px", padding: "0.2rem 0.6rem", textTransform: "uppercase" }}>Completed</span>
        <h3 style={{ fontFamily: "system-ui", fontSize: "1rem", fontWeight: 700, color: "#1A1A1A", margin: "0.85rem 0 0.25rem" }}>{school.name}</h3>
        <p style={{ fontFamily: "system-ui", fontSize: "0.8rem", color: "#999", margin: "0 0 1.25rem" }}>{school.district}, {school.state}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {[
            { label: "Students", value: school.student_count.toLocaleString() },
            { label: "Project Cost", value: formatCurrency(Number(school.total_cost)) },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "system-ui", fontSize: "0.78rem", color: "#AAA" }}>{label}</span>
              <span style={{ fontFamily: "system-ui", fontSize: "0.82rem", fontWeight: 700, color: "#1A1A1A" }}>{value}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid #F0F0EA" }}>
          <span style={{ fontFamily: "system-ui", fontSize: "0.78rem", fontWeight: 600, color: "#1B4FD8" }}>View Details</span>
          <div style={{ color: "#1B4FD8" }}><ArrowSVG /></div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const stats = mockStats;
  const recentSchools = mockSchools;
  const [activeStep, setActiveStep] = useState(0);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  const statCards = [
    { icon: <SchoolSVG />, value: `${stats.schoolsSupported}+`, label: "Schools Supported", color: "#1B4FD8", bg: "#EEF2FF", badge: "TOTAL" },
    { icon: <HeartSVG />, value: "₹1.5 Cr+", label: "Funds Raised", color: "#B45309", bg: "#FFFBEB", badge: "RAISED" },
    { icon: <UsersSVG />, value: `${stats.childrenImpacted.toLocaleString()}+`, label: "Children Impacted", color: "#065F46", bg: "#ECFDF5", badge: "IMPACT" },
    { icon: <TrendSVG />, value: `${stats.ongoingProjects}+`, label: "Ongoing Projects", color: "#6D28D9", bg: "#F5F3FF", badge: "LIVE" },
  ];

  const steps = [
    { num: "01", title: "Identify & Assess", color: "#1B4FD8", bg: "#EEF2FF", desc: "We conduct thorough assessments of government schools, identifying critical infrastructure needs and working with local authorities to prioritise interventions." },
    { num: "02", title: "Fund & Execute", color: "#E8892A", bg: "#FFFBEB", desc: "We partner with verified NGOs and contractors, raise targeted funds from donors and CSR partners, and execute renovations with full transparency and accountability." },
    { num: "03", title: "Track & Report", color: "#065F46", bg: "#ECFDF5", desc: "Real-time project tracking, detailed expenditure reports, before-after documentation, and impact measurement ensure complete transparency for all stakeholders." },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAFAF8", minHeight: "100vh", color: "#1A1A1A" }}>

      {/* ── HERO ── */}
      <header style={{
        minHeight: "100vh", background: "#0F2456",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 4rem 5rem", position: "relative", overflow: "hidden",
      }}>
        {/* Background image overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg?auto=compress&cs=tinysrgb&w=1920')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "65vw", height: "65vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-5%", right: "-22%", width: "80vw", height: "80vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "5%", width: "30vw", height: "30vw", borderRadius: "50%", border: "1px solid rgba(232,137,42,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "4rem", width: "4rem", height: "1px", background: "#E8892A" }} />

        <div style={{ position: "relative", maxWidth: "900px" }}>
          <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#E8892A", marginBottom: "1.5rem", fontWeight: 600 }}>
            IIM Bangalore Initiative 
          </p>
          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 250, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#FFFFFF", margin: "0 0 2rem" }}>
            Transforming<br />Government Schools <br />and Anganwadis
          </h1>
          <p style={{ fontFamily: "system-ui", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: "700px", lineHeight: 1.7, fontWeight: 400, marginBottom: "3rem" }}>
            Saksham, IIM Bangalore’s School Development Initiative, is transforming government schools and anganwadis across Karnataka by improving infrastructure, access to safe drinking water, sanitation, digital learning, and community-driven development.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              style={{ background: "#E8892A", color: "#fff", fontFamily: "system-ui", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", padding: "1rem 2.25rem", borderRadius: "4px", border: "none", cursor: "pointer", transition: "background 0.2s ease", display: "flex", alignItems: "center", gap: "0.6rem" }}
              onMouseEnter={e => e.currentTarget.style.background = "#D4791F"}
              onMouseLeave={e => e.currentTarget.style.background = "#E8892A"}
            >
              Donate Now <ArrowSVG />
            </button>
            <button
              style={{ background: "transparent", color: "#fff", fontFamily: "system-ui", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "1rem 2.25rem", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "0.6rem" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#E8892A"; e.currentTarget.style.color = "#E8892A"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#fff"; }}
            >
              View Our Work <ArrowSVG />
            </button>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2rem", right: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "system-ui", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Scroll</span>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </header>

      {/* ── STAT CARDS ── */}
      <section style={{ padding: "7rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "5rem", alignItems: "start", marginBottom: "4rem" }}>
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Impact at a Glance</p>
            <h2 style={{ fontSize: "2.8rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0F2456", margin: 0 }}>
              Numbers that<br />tell the story
            </h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", marginTop: "1.5rem" }} />
          </div>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.85, color: "#555", margin: 0, alignSelf: "center" }}>
            Since 2023, Saksham has systematically transformed over a hundred government schools across Karnataka — improving classrooms, sanitation, digital access, and restoring dignity for thousands of children.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
          {statCards.map(card => <StatCard key={card.badge} {...card} />)}
        </div>
      </section>

      {/* ── HOW SAKSHAM WORKS ── */}
      <section style={{ background: "#F4F3EF", padding: "7rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Our Approach</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456", margin: "0 0 0.5rem" }}>How Saksham Works</h2>
            <p style={{ fontFamily: "system-ui", fontSize: "0.95rem", color: "#777", maxWidth: "400px", margin: "0 auto" }}>Our transparent, professional approach ensures every rupee creates maximum impact</p>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", margin: "1.25rem auto 0" }} />
          </div>

          {/* Step selector */}
          <div style={{ display: "flex", gap: "0", border: "1px solid rgba(15,36,86,0.15)", borderRadius: "10px", overflow: "hidden", width: "fit-content", margin: "0 auto 3.5rem", flexWrap: "wrap" }}>
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)} style={{ fontFamily: "system-ui", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.04em", padding: "0.75rem 1.75rem", border: "none", cursor: "pointer", background: activeStep === i ? "#0F2456" : "transparent", color: activeStep === i ? "#fff" : "rgba(15,36,86,0.45)", transition: "all 0.2s ease", whiteSpace: "nowrap" }}>
                {s.num} — {s.title}
              </button>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: "20px", padding: "3rem", display: "grid", gridTemplateColumns: "180px 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <div style={{ width: "64px", height: "64px", borderRadius: "14px", background: steps[activeStep].bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "system-ui", fontWeight: 900, fontSize: "1.6rem", color: steps[activeStep].color }}>{activeStep + 1}</span>
              </div>
              <p style={{ fontFamily: "system-ui", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: steps[activeStep].color, margin: 0 }}>Step {steps[activeStep].num}</p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#0F2456", letterSpacing: "-0.02em", marginBottom: "1rem" }}>{steps[activeStep].title}</h3>
              <p style={{ fontFamily: "system-ui", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(0,0,0,0.55)", margin: 0 }}>{steps[activeStep].desc}</p>
            </div>
          </div>

          {/* Progress dots */}
          <div style={{ marginTop: "2rem", height: "2px", background: "rgba(15,36,86,0.08)", borderRadius: "2px", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(activeStep + 1) / steps.length * 100}%`, background: "#E8892A", borderRadius: "2px", transition: "width 0.4s ease" }} />
            {steps.map((_, i) => (
              <div key={i} onClick={() => setActiveStep(i)} style={{ position: "absolute", top: "50%", left: `${i / (steps.length - 1) * 100}%`, transform: "translate(-50%, -50%)", width: "10px", height: "10px", borderRadius: "50%", background: i <= activeStep ? "#E8892A" : "rgba(15,36,86,0.15)", cursor: "pointer", transition: "background 0.3s ease" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT TRANSFORMATIONS ── */}
      <section style={{ padding: "7rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem" }}>
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Portfolio</p>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456", margin: 0 }}>Recent Transformations</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", marginTop: "1.25rem" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "system-ui", fontSize: "0.82rem", fontWeight: 700, color: "#E8892A", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.04em", textTransform: "uppercase", paddingBottom: "0.1rem", borderBottom: "1px solid #E8892A" }}
            onMouseEnter={e => e.currentTarget.style.color = "#D4791F"}
            onMouseLeave={e => e.currentTarget.style.color = "#E8892A"}>
            View All <ArrowSVG />
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {recentSchools.map(school => <SchoolCard key={school.id} school={school} formatCurrency={formatCurrency} />)}
        </div>
      </section>

      {/* ── IIM BACKING ── */}
      <section style={{ background: "#0F2456", padding: "7rem 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-5%", right: "-20%", width: "70vw", height: "70vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Institutional Backing</p>
            <h2 style={{ fontSize: "2.8rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff", marginBottom: "1.5rem" }}>
              Backed by<br />IIM Bangalore
            </h2>
            <p style={{ fontFamily: "system-ui", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem" }}>
              Led by Prof. Gopal Naik and supported by IIMB's institutional expertise, Saksham combines academic rigour with on-ground impact to transform government schools across Karnataka.
            </p>
            <button style={{ background: "#E8892A", color: "#fff", fontFamily: "system-ui", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", padding: "1rem 2.25rem", borderRadius: "4px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem", transition: "background 0.2s ease" }}
              onMouseEnter={e => e.currentTarget.style.background = "#D4791F"}
              onMouseLeave={e => e.currentTarget.style.background = "#E8892A"}>
              Learn Our Story <ArrowSVG />
            </button>
          </div>
          {/* Prof card */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "2.5rem" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #1B4FD8 0%, #0F2456 100%)", border: "2px solid rgba(232,137,42,0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "rgba(255,255,255,0.2)", fontFamily: "Georgia" }}>GN</span>
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>Prof. Gopal Naik</h3>
            <p style={{ fontFamily: "system-ui", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginBottom: "1.25rem", letterSpacing: "0.04em" }}>Faculty, IIM Bangalore · Chairperson</p>
            <blockquote style={{ fontSize: "0.95rem", fontStyle: "italic", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", borderLeft: "2px solid #E8892A", paddingLeft: "1rem", margin: 0 }}>
              "Our goal is not just to renovate buildings, but to restore dignity, hope, and opportunity for every child."
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "7rem 4rem", background: "#F4F3EF" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Voices</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456", margin: "0 0 0.5rem" }}>What People Say</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", margin: "1.25rem auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {testimonials.map((t, i) => {
              const [hovered, setHovered] = useState(false);
              return (
                <div key={i}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{ background: "#fff", border: `1px solid ${hovered ? t.color : "#E5E5E0"}`, borderRadius: "16px", padding: "2rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem", transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease", transform: hovered ? "translateY(-4px)" : "translateY(0)", boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.08)" : "none" }}>
                  <span style={{ fontFamily: "Georgia", fontSize: "3rem", color: "#E8892A", lineHeight: 0.8, display: "block" }}>"</span>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.85rem", color: "#555", lineHeight: 1.75, margin: 0, flexGrow: 1 }}>{t.quote}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", paddingTop: "1rem", borderTop: "1px solid #F0F0EA" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "system-ui", fontWeight: 800, fontSize: "0.72rem", color: t.color }}>{t.initials}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.85rem", color: "#1A1A1A", margin: 0 }}>{t.name}</p>
                      <p style={{ fontFamily: "system-ui", fontSize: "0.72rem", color: "#AAA", margin: 0 }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "7rem 4rem", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "3rem", height: "3px", background: "#E8892A", margin: "0 auto 3rem" }} />
          <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1.5rem" }}>Make a Difference</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456", marginBottom: "1.25rem", lineHeight: 1.1 }}>
            Ready to Change<br />a Child's Future?
          </h2>
          <p style={{ fontFamily: "system-ui", fontSize: "1.05rem", lineHeight: 1.8, color: "#777", marginBottom: "2.5rem" }}>
            Your contribution can transform a school and change hundreds of lives. Every rupee is tracked, reported, and visible.
          </p>
          <button style={{ background: "#E8892A", color: "#fff", fontFamily: "system-ui", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", padding: "1.1rem 3rem", borderRadius: "4px", border: "none", cursor: "pointer", transition: "background 0.2s ease", display: "inline-flex", alignItems: "center", gap: "0.6rem" }}
            onMouseEnter={e => e.currentTarget.style.background = "#D4791F"}
            onMouseLeave={e => e.currentTarget.style.background = "#E8892A"}>
            Donate Now <ArrowSVG />
          </button>
          <div style={{ width: "3rem", height: "3px", background: "#E5E5E0", margin: "3rem auto 0" }} />
        </div>
      </section>
    </div>
  );
}