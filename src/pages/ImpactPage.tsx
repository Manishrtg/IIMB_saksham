import { useState } from "react";

// ── Mock Data ──────────────────────────────────────────────────────────────
const mockStats = {
  schoolsCompleted: 108,
  studentsImpacted: 8000,
  fundsRaised: 15000000,
  partnersEngaged: "10+",
};

const yearlyProgress = [
  { year: "2023", schools: 18 },
  { year: "2024", schools: 52 },
  { year: "2025", schools: 38 },
];

const changes = [
  { icon: "🚽", title: "Sanitation", desc: "Clean, functional toilets with running water, ensuring dignity and hygiene for all students — especially girls.", color: "#1B4FD8", bg: "#EEF2FF" },
  { icon: "💡", title: "Infrastructure", desc: "Renovated classrooms with proper flooring, ceilings, windows, and adequate lighting for conducive learning environments.", color: "#B45309", bg: "#FFFBEB" },
  { icon: "🪑", title: "Furniture", desc: "Comfortable desks and benches appropriate for student age groups, replacing broken or missing furniture.", color: "#065F46", bg: "#ECFDF5" },
  { icon: "💻", title: "Digital Learning", desc: "Computer labs with internet connectivity, bridging the digital divide for rural students.", color: "#6D28D9", bg: "#F5F3FF" },
 { icon: "🌱", title: "Kitchen Gardening", desc: "A vibrant school garden where students grow vegetables and herbs, learning sustainability, nutrition, and hands-on skills.", color: "#166534", bg: "#ECFDF5" },
  { icon: "💧", title: "Drinking Water", desc: "Clean drinking water facilities with purifiers ensuring safe hydration for all students daily.", color: "#0E7490", bg: "#ECFEFF" },
];

// ── Icons ──────────────────────────────────────────────────────────────────
const SchoolSVG = () => (
  <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
    <rect x="6" y="18" width="28" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M3 18L20 6l17 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="15" y="25" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);
const UsersSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="32" height="32">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const HeartSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="32" height="32">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const AwardSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="32" height="32">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);
const TrendSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="48" height="48">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ icon, value, label, color, bg, badge }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", border: `1px solid ${hovered ? color : "#E5E5E0"}`, borderRadius: "16px", padding: "2rem 1.75rem", display: "flex", flexDirection: "column", gap: "1rem", transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease", transform: hovered ? "translateY(-4px)" : "translateY(0)", boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.08)" : "none", cursor: "default" }}>
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

// ── Change Card ────────────────────────────────────────────────────────────
function ChangeCard({ icon, title, desc, color, bg }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", border: `1px solid ${hovered ? color : "#E5E5E0"}`, borderRadius: "16px", padding: "2rem 1.75rem", display: "flex", flexDirection: "column", gap: "1rem", transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease", transform: hovered ? "translateY(-4px)" : "translateY(0)", boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.08)" : "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>{icon}</div>
      </div>
      <div>
        <h3 style={{ fontFamily: "system-ui", fontSize: "0.95rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "0.5rem" }}>{title}</h3>
        <p style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#777", lineHeight: 1.65, margin: 0 }}>{desc}</p>
      </div>
      <div style={{ width: "2rem", height: "2px", background: color, borderRadius: "2px", marginTop: "auto" }} />
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ImpactPage() {
  const stats = mockStats;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  const maxSchools = Math.max(...yearlyProgress.map(d => d.schools));

  const statCards = [
    { icon: <SchoolSVG />, value: `${stats.schoolsCompleted}+`, label: "Schools Transformed", color: "#1B4FD8", bg: "#EEF2FF", badge: "COMPLETED" },
    { icon: <UsersSVG />, value: `${stats.studentsImpacted.toLocaleString()}+`, label: "Students Impacted", color: "#B45309", bg: "#FFFBEB", badge: "STUDENTS" },
    { icon: <HeartSVG />, value: "₹1.5 Cr+", label: "Funds Raised", color: "#065F46", bg: "#ECFDF5", badge: "RAISED" },
    { icon: <AwardSVG />, value: stats.partnersEngaged, label: "Partners Engaged", color: "#6D28D9", bg: "#F5F3FF", badge: "PARTNERS" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAFAF8", minHeight: "100vh", color: "#1A1A1A" }}>

      {/* ── HERO ── */}
      <header style={{ minHeight: "70vh", background: "#0F2456", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 4rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-5%", right: "-20%", width: "70vw", height: "70vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "4rem", width: "4rem", height: "1px", background: "#E8892A" }} />
        <div style={{ position: "relative", maxWidth: "900px" }}>
          <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#E8892A", marginBottom: "1.5rem", fontWeight: 600 }}>IIM Bangalore Initiative · Est. 2023</p>
          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#FFFFFF", margin: "0 0 2rem" }}>
            Our<br />Impact
          </h1>
          <p style={{ fontFamily: "system-ui", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: 1.7, fontWeight: 400 }}>
            Measurable transformation in government schools across Karnataka — tracked, documented, and reported with full transparency.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", right: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "system-ui", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Scroll</span>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </header>

      {/* ── IMPACT BY NUMBERS ── */}
      <section style={{ padding: "8rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "5rem", alignItems: "start", marginBottom: "4rem" }}>
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>By the Numbers</p>
            <h2 style={{ fontSize: "2.8rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0F2456", margin: 0 }}>
              Impact that<br />speaks for itself
            </h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", marginTop: "1.5rem" }} />
          </div>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.85, color: "#555", margin: 0, alignSelf: "center" }}>
            Every number below represents a child who now studies in a better classroom, drinks clean water, and has access to a dignified learning environment — made possible through collective action.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
          {statCards.map(card => <StatCard key={card.badge} {...card} />)}
        </div>
      </section>

      {/* ── YEAR-WISE PROGRESS ── */}
      <section style={{ background: "#F4F3EF", padding: "7rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Growth</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456", margin: "0 0 0.5rem" }}>Year-wise Progress</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", margin: "1.25rem auto 0" }} />
          </div>

          <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: "20px", padding: "3rem 3.5rem" }}>
            {/* Bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "4rem", height: "220px", marginBottom: "1.5rem" }}>
              {yearlyProgress.map((data, i) => {
                const heightPct = (data.schools / maxSchools) * 100;
                const colors = ["#1B4FD8", "#E8892A", "#065F46"];
                const bgs = ["#EEF2FF", "#FFFBEB", "#ECFDF5"];
                return (
                  <div key={data.year} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", flex: 1, maxWidth: "140px" }}>
                    <p style={{ fontFamily: "system-ui", fontWeight: 800, fontSize: "1.6rem", color: colors[i % colors.length], margin: 0 }}>{data.schools}</p>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "140px" }}>
                      <div style={{ width: "100%", height: `${heightPct}%`, background: `linear-gradient(to top, ${colors[i % colors.length]}, ${bgs[i % bgs.length]})`, borderRadius: "8px 8px 0 0", transition: "height 0.6s ease", minHeight: "8px" }} />
                    </div>
                    <div style={{ width: "100%", height: "2px", background: "#F0F0EA" }} />
                    <p style={{ fontFamily: "system-ui", fontSize: "0.82rem", fontWeight: 700, color: "#0F2456", margin: 0, letterSpacing: "0.04em" }}>{data.year}</p>
                    <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", color: "#AAA", margin: 0 }}>Schools</p>
                  </div>
                );
              })}
            </div>
            {/* Total */}
            <div style={{ borderTop: "1px solid #F0F0EA", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontFamily: "system-ui", fontSize: "0.72rem", color: "#AAA", margin: 0, letterSpacing: "0.08em", textTransform: "uppercase" }}>Total Schools Transformed</p>
              <p style={{ fontFamily: "system-ui", fontWeight: 800, fontSize: "1.5rem", color: "#0F2456", margin: 0 }}>
                {yearlyProgress.reduce((s, d) => s + d.schools, 0)}+
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT CHANGED ── */}
      <section style={{ padding: "7rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Transformation</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456", margin: "0 0 0.5rem" }}>What Changed in Our Schools</h2>
          <div style={{ width: "3rem", height: "3px", background: "#E8892A", margin: "1.25rem auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {changes.map(card => <ChangeCard key={card.title} {...card} />)}
        </div>
      </section>

      {/* ── LONG-TERM IMPACT ── */}
      <section style={{ background: "#5a1d2b", padding: "7rem 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-5%", right: "-20%", width: "70vw", height: "70vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Beyond Infrastructure</p>
            <h2 style={{ fontSize: "2.8rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff", marginBottom: "1.5rem" }}>
              Long-Term<br />Impact
            </h2>
            <p style={{ fontFamily: "system-ui", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: "1.5rem" }}>
              Beyond infrastructure, our interventions have led to increased student attendance, improved learning outcomes, and enhanced community engagement with government schools.
            </p>
            <p style={{ fontFamily: "system-ui", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>
              Teachers report better classroom management, students show increased confidence, and parents express renewed faith in public education.
            </p>
          </div>
          {/* Outcome tiles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "Student Attendance", value: "↑ 23%", desc: "Average increase post-renovation", color: "#1B4FD8", bg: "#EEF2FF" },
              { label: "Learning Outcomes", value: "↑ 31%", desc: "Improvement in assessment scores", color: "#065F46", bg: "#ECFDF5" },
              { label: "Community Engagement", value: "↑ 40%", desc: "Increase in parent participation", color: "#B45309", bg: "#FFFBEB" },
              { label: "Teacher Satisfaction", value: "↑ 87%", desc: "Report improved work environment", color: "#6D28D9", bg: "#F5F3FF" },
            ].map(({ label, value, desc, color, bg }) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "system-ui", fontWeight: 800, fontSize: "0.85rem", color }}>{value}</span>
                </div>
                <div>
                  <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.85rem", color: "#fff", margin: "0 0 0.2rem" }}>{label}</p>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}