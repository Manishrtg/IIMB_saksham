import { useState } from "react";

const staticMembers = [
  {
    initials: "NG",
    color: "#1B4FD8",
    bg: "#EEF2FF",
    name: "Navaneeth Ganesh",
    role: "Senior Associate, IIM Bangalore",
    department: "Centre for Public Policy",
    bio: "Navaneeth brings extensive experience in public policy research and program management. He plays a pivotal role in strategic planning, stakeholder engagement, and driving impact at the Centre for Public Policy, IIM Bangalore.",
    linkedin: "https://www.linkedin.com/in/navaneeth-ganesh/",
    tags: ["Public Policy", "Strategic Planning", "Stakeholder Engagement"],
  },
  {
    initials: "AR",
    color: "#B45309",
    bg: "#FFFBEB",
    name: "Amshrutha Rudresh",
    role: "Project Coordinator",
    department: "Operations",
    bio: "Amshrutha oversees on-ground implementation, teacher training modules, and progress tracking across multiple government school clusters.",
    linkedin: "https://www.linkedin.com/in/amshrutha-rudresh/",
    tags: ["Implementation", "Teacher Training", "Progress Tracking"],
  },
  {
    initials: "AG",
    color: "#065F46",
    bg: "#ECFDF5",
    name: "Anukirthana G",
    role: "Project Coordinator",
    department: "Community Engagement",
    bio: "Anukirthana focuses on curriculum alignment, community engagement, and ensuring sustainable adoption of Saksham initiatives in rural schools.",
    linkedin: "https://www.linkedin.com/in/anukirthana-g/",
    tags: ["Curriculum", "Community", "Sustainability"],
  },
  {
    initials: "DS",
    color: "#6D28D9",
    bg: "#F5F3FF",
    name: "Darshan M S",
    role: "Project Coordinator",
    department: "Field Operations",
    bio: "Darshan manages field operations, data collection, and impact assessment, ensuring every intervention is evidence-based and scalable.",
    linkedin: "https://www.linkedin.com/in/darshan-ms/",
    tags: ["Field Operations", "Data Collection", "Impact Assessment"],
  },
  {
    initials: "RR",
    color: "#BE123C",
    bg: "#FFF1F2",
    name: "Dr. Ritwik Raj",
    role: "Associate to the Chairperson",
    department: "Centre for Public Policy",
    bio: "Policy expert with over 12 years in education reform and governance advisory. Provides strategic direction and liaison with government bodies.",
    linkedin: "https://www.linkedin.com/in/ritwik-raj/",
    tags: ["Education Reform", "Governance", "Policy Advisory"],
  },
  {
    initials: "PS",
    color: "#0E7490",
    bg: "#ECFEFF",
    name: "Priyanka Sharma",
    role: "Associate to the Chairperson",
    department: "Centre for Public Policy",
    bio: "Specializes in monitoring & evaluation frameworks and stakeholder management for large-scale public programs.",
    linkedin: "https://www.linkedin.com/in/priyanka-sharma-cpp/",
    tags: ["M&E Frameworks", "Stakeholder Mgmt", "Public Programs"],
  },
  {
    initials: "AM",
    color: "#1B4FD8",
    bg: "#EEF2FF",
    name: "Arjun Menon",
    role: "Associate to the Chairperson",
    department: "Centre for Public Policy",
    bio: "Focuses on research, policy drafting, and inter-departmental coordination to strengthen education policy implementation.",
    linkedin: "https://www.linkedin.com/in/arjun-menon-iimb/",
    tags: ["Research", "Policy Drafting", "Coordination"],
  },
];

const departments = ["All", "Centre for Public Policy", "Operations", "Community Engagement", "Field Operations"];

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function AboutTeamPage() {
  const [activeDept, setActiveDept] = useState("All");
  const [hoveredCard, setHoveredCard] = useState(null);

  const filtered = activeDept === "All"
    ? staticMembers
    : staticMembers.filter(m => m.department === activeDept);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAFAF8", minHeight: "100vh", color: "#1A1A1A" }}>




      {/* ── TEAM GRID ── */}
      <section style={{ padding: "7rem 4rem", background: "#F4F3EF" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>The Team</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456", margin: "0 0 0.5rem" }}>Associates &amp; Coordinators</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", margin: "1.25rem auto 2.5rem" }} />

            {/* Filter tabs */}
            <div style={{ display: "flex", gap: "0", border: "1px solid rgba(15,36,86,0.15)", borderRadius: "10px", overflow: "hidden", width: "fit-content", margin: "0 auto", flexWrap: "wrap" }}>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  style={{
                    fontFamily: "system-ui", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em",
                    padding: "0.75rem 1.4rem", border: "none", cursor: "pointer",
                    background: activeDept === dept ? "#0F2456" : "transparent",
                    color: activeDept === dept ? "#fff" : "rgba(15,36,86,0.45)",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {filtered.map((member, i) => (
              <div
                key={member.name}
                onMouseEnter={() => setHoveredCard(member.name)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: "#fff",
                  border: `1px solid ${hoveredCard === member.name ? member.color : "#E5E5E0"}`,
                  borderRadius: "16px",
                  padding: "2rem 1.75rem",
                  display: "flex", flexDirection: "column", gap: "1rem",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                  transform: hoveredCard === member.name ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hoveredCard === member.name ? "0 12px 32px rgba(0,0,0,0.08)" : "none",
                  cursor: "default",
                }}
              >
                {/* Top row: avatar + dept */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: member.bg, border: `1.5px solid ${member.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "system-ui", fontSize: "0.85rem", fontWeight: 800, color: member.color, letterSpacing: "0.04em" }}>{member.initials}</span>
                  </div>
                  <span style={{ fontFamily: "system-ui", fontSize: "0.65rem", fontWeight: 700, color: "#CCC", letterSpacing: "0.06em", textAlign: "right", maxWidth: "100px", lineHeight: 1.4 }}>{member.department.toUpperCase()}</span>
                </div>

                {/* Name & role */}
                <div>
                  <h3 style={{ fontFamily: "system-ui", fontSize: "1rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "0.25rem" }}>{member.name}</h3>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.78rem", color: member.color, fontWeight: 600, letterSpacing: "0.02em", margin: 0 }}>{member.role}</p>
                </div>

                {/* Bio */}
                <p style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#777", lineHeight: 1.65, margin: 0, flexGrow: 1 }}>{member.bio}</p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {member.tags.map(tag => (
                    <span key={tag} style={{ fontFamily: "system-ui", fontSize: "0.65rem", fontWeight: 600, color: member.color, background: member.bg, borderRadius: "4px", padding: "0.2rem 0.55rem", letterSpacing: "0.03em" }}>{tag}</span>
                  ))}
                </div>

                {/* Footer: accent line + LinkedIn */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <div style={{ width: "2rem", height: "2px", background: member.color, borderRadius: "2px" }} />
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "system-ui", fontSize: "0.72rem", fontWeight: 600, color: "#999", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={e => e.currentTarget.style.color = member.color}
                    onMouseLeave={e => e.currentTarget.style.color = "#999"}
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IIM BACKING ── */}
      <section style={{ padding: "7rem 4rem", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Institutional Backing</p>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0F2456", marginBottom: "1.5rem" }}>Backed by<br />IIM Bangalore</h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#555" }}>
                Every member of the Saksham team benefits from the institutional rigour, research expertise, and vast alumni network of IIM Bangalore — bringing management excellence to grassroots transformation.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { label: "Research", desc: "Evidence-based interventions backed by faculty research" },
                { label: "Talent", desc: "Top MBA graduates and student volunteers on the ground" },
                { label: "Network", desc: "Corporate connections enabling sustainable funding" },
                { label: "Standards", desc: "Management best practices in project execution" },
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

      {/* ── JOIN SECTION ── */}
      <section style={{ padding: "7rem 4rem", background: "#0F2456", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-8%", width: "40vw", height: "40vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "0%", right: "-18%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1.5rem" }}>Join the Mission</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.1 }}>
            Be Part of<br />the Change
          </h2>
          <p style={{ fontFamily: "system-ui", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem", maxWidth: "520px", margin: "0 auto 2.5rem" }}>
            We're always looking for passionate individuals who want to make a lasting difference in education. Whether you're a researcher, coordinator, or field volunteer — there's a place for you.
          </p>
          <a
            href="mailto:careers@saksham.org.in"
            style={{
              display: "inline-block", background: "#E8892A", color: "#fff",
              fontFamily: "system-ui", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.06em",
              textTransform: "uppercase", padding: "1rem 2.5rem", borderRadius: "4px",
              textDecoration: "none", transition: "background 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#D4791F"}
            onMouseLeave={e => e.currentTarget.style.background = "#E8892A"}
          >
            Explore Opportunities
          </a>
        </div>
      </section>

      

    </div>
  );
}