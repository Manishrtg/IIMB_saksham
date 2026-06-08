import { useState } from "react";

const mockStats = {
  totalSchools: 106,
  completed: 74,
  ongoing: 12,
  pipeline: 20,
  totalRaised: 16000000,
};

const mockDonations = [
  { id: 1, donor_name: "Fresenius", amount: 500000, donation_type: "CSR", purpose: "Gendehalli GHS – New toilet construction", is_anonymous: false },
  { id: 2, donor_name: "Fresenius", amount: 200000, donation_type: "CSR", purpose: "DV Halli GHPS – Toilet renovation", is_anonymous: false },

  { id: 3, donor_name: "Impact Analytics", amount: 369930, donation_type: "CSR", purpose: "DV Halli GHPS – Model School (Electrical – Rana)", is_anonymous: false },
  { id: 4, donor_name: "Impact Analytics", amount: 456500, donation_type: "CSR", purpose: "DV Halli GHPS – Model School (Solar – Selco)", is_anonymous: false },

  { id: 5, donor_name: "Avakasha Foundation", amount: 192000, donation_type: "CSR", purpose: "Nutrition Garden", is_anonymous: false },
  { id: 6, donor_name: "Shree (1998)", amount: 20000, donation_type: "alumni", purpose: "Arehalli GHPUC – New toilet construction", is_anonymous: false },
  { id: 7, donor_name: "Kapil Devgan (1996)", amount: 10000, donation_type: "alumni", purpose: "Arehalli GHPUC – New toilet construction", is_anonymous: false },
  { id: 8, donor_name: "Viraj Tyagi (1992)", amount: 200000, donation_type: "alumni", purpose: "Arehalli GHPUC – New toilet construction", is_anonymous: false },
  { id: 9, donor_name: "Anand Athmaraman Gonibeedu (1996)", amount: 200000, donation_type: "alumni", purpose: "Arehalli GHPUC – New toilet construction", is_anonymous: false },
  { id: 10, donor_name: "Sri Priya Garg (1998)", amount: 12000, donation_type: "alumni", purpose: "Arehalli GHPUC – New toilet construction", is_anonymous: false },
  { id: 11, donor_name: "Sriram K (1998)", amount: 10000, donation_type: "alumni", purpose: "Arehalli GHPUC – New toilet construction", is_anonymous: false },
  { id: 12, donor_name: "Pashupathi Davella (1998)", amount: 5000, donation_type: "alumni", purpose: "Arehalli GHPUC – New toilet construction", is_anonymous: false },

  { id: 13, donor_name: "1998 Batch", amount: 1902691, donation_type: "alumni", purpose: "Furniture", is_anonymous: false },
  { id: 14, donor_name: "1998 Batch", amount: 88550, donation_type: "alumni", purpose: "Almirah Donation (10 units)", is_anonymous: false },
  { id: 15, donor_name: "1998 Batch", amount: 150000, donation_type: "alumni", purpose: "Hosanagara GHPS – Painting & Plumbing", is_anonymous: false },
  { id: 1, donor_name: "1998 Batch (4 donors)", amount: 400000, donation_type: "alumni", purpose: "Nonvinkere GHS – New toilet construction", is_anonymous: false },

  { id: 17, donor_name: "Pavan Sachedeva (1996)", amount: 100000, donation_type: "alumni", purpose: "Ganganghatta GHPS – Toilet renovation", is_anonymous: false },

];

const SchoolSVG = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <rect x="6" y="18" width="28" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M3 18L20 6l17 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="15" y="25" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const HeartSVG = ({ size = 28 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width={size} height={size}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);



const MapSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="52" height="52">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

function StatCard({ icon, label, value, color, bg, badge }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? color : "#E5E5E0"}`,
        borderRadius: "16px",
        padding: "2rem 1.75rem",
        display: "flex", flexDirection: "column", gap: "1rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.08)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color }}>
          {icon}
        </div>
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

function DonationRow({ donation, isLast, formatCurrency }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
        padding: "1.25rem 2rem",
        borderBottom: isLast ? "none" : "1px solid #F0F0EA",
        background: hovered ? "#FAFAF8" : "transparent",
        transition: "background 0.15s ease",
      }}
    >
      <span style={{ fontFamily: "system-ui", fontSize: "0.9rem", color: "#1A1A1A", fontWeight: 500 }}>
        {donation.is_anonymous ? "Anonymous Donor" : donation.donor_name || "Anonymous"}
      </span>
      <span style={{ fontFamily: "system-ui", fontSize: "0.9rem", color: "#065F46", fontWeight: 700 }}>
        {formatCurrency(Number(donation.amount))}
      </span>
      <span style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#888", textTransform: "capitalize" }}>
        {donation.donation_type.replace("_", " ")}
      </span>
      <span style={{ color: "#555" }}>
        {donation.purpose}
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const stats = mockStats;
  const recentDonations = mockDonations;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  const statCards = [
    { icon: <SchoolSVG />, label: "Total Schools", value: stats.totalSchools, color: "#1B4FD8", bg: "#EEF2FF", badge: "TOTAL" },
    { icon: <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>✓</span>, label: "Completed Projects", value: stats.completed, color: "#065F46", bg: "#ECFDF5", badge: "COMPLETED" },
    { icon: <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>◎</span>, label: "Ongoing Projects", value: stats.ongoing, color: "#B45309", bg: "#FFFBEB", badge: "ONGOING" },
    { icon: <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>◷</span>, label: "Pipeline Projects", value: stats.pipeline, color: "#6D28D9", bg: "#F5F3FF", badge: "PIPELINE" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAFAF8", minHeight: "100vh", color: "#1A1A1A" }}>

      {/* HERO */}
      <header style={{
        minHeight: "70vh", background: "#0F2456",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 4rem 5rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-5%", right: "-20%", width: "70vw", height: "70vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "4rem", width: "4rem", height: "1px", background: "#E8892A" }} />
        <div style={{ position: "relative", maxWidth: "900px" }}>
       
          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#FFFFFF", margin: "0 0 2rem" }}>
            Live Project<br />&amp; Dashboard
          </h1>
          <p style={{ fontFamily: "system-ui", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: 1.7, fontWeight: 400 }}>
            Real-time tracking of all Saksham projects and funding across Karnataka.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", right: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "system-ui", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Scroll</span>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </header>

      {/* STAT CARDS */}
      <section style={{ padding: "7rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Overview</p>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0F2456", margin: 0 }}>Overall Progress</h2>
          <div style={{ width: "3rem", height: "3px", background: "#E8892A", marginTop: "1.25rem" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
          {statCards.map(card => <StatCard key={card.badge} {...card} />)}
        </div>
      </section>

      {/* FUNDING */}
      <section style={{ padding: "0 4rem 7rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ background: "#ECFDF5", border: "1px solid #D1FAE5", borderRadius: "20px", padding: "3rem 3.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "16px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#065F46", flexShrink: 0, boxShadow: "0 4px 16px rgba(6,95,70,0.1)" }}>
              <HeartSVG size={32} />
            </div>
            <div>
              <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#059669", fontWeight: 600, marginBottom: "0.5rem" }}>Total Amount Raised</p>
              <p style={{ fontFamily: "system-ui", fontSize: "3rem", fontWeight: 800, color: "#065F46", lineHeight: 1, margin: 0 }}>{formatCurrency(stats.totalRaised)}</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.8rem", color: "#6EE7B7", lineHeight: 1.6, margin: 0, maxWidth: "240px" }}>
              Every rupee goes directly toward transforming government schools across Karnataka.
            </p>
            <div style={{ width: "2rem", height: "2px", background: "#065F46", borderRadius: "2px", marginTop: "1rem", marginLeft: "auto" }} />
          </div>
        </div>
      </section>

      {/* DONATIONS TABLE */}
      <section style={{ background: "#F4F3EF", padding: "7rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Generosity</p>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0F2456", margin: 0 }}>Recent Donations</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", marginTop: "1.25rem" }} />
          </div>
          <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "1rem 2rem", background: "#FAFAF8", borderBottom: "1px solid #E5E5E0" }}>
              {["Donor", "Amount", "Type", "Purpose"].map(h => (
                <span key={h} style={{ fontFamily: "system-ui", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#BBB" }}>{h}</span>
              ))}
            </div>
            {recentDonations.map((donation, i) => (
              <DonationRow key={donation.id} donation={donation} isLast={i === recentDonations.length - 1} formatCurrency={formatCurrency} />
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section style={{ padding: "7rem 4rem", background: "#0F2456", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-5%", right: "-20%", width: "70vw", height: "70vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Geography</p>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", marginBottom: "3rem" }}>Project Status Map</h2>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "6rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ color: "rgba(255,255,255,0.15)" }}><MapSVG /></div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>Interactive Map</h3>
            <p style={{ fontFamily: "system-ui", fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>Visualize all projects across Karnataka</p>
          </div>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", justifyContent: "center" }}>
            {[{ color: "#065F46", label: "Completed" }, { color: "#B45309", label: "Ongoing" }, { color: "#6D28D9", label: "Pipeline" }].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color }} />
                <span style={{ fontFamily: "system-ui", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
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