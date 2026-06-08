import { useState } from "react";

// ── Icons ──────────────────────────────────────────────────────────────────
const HeartSVG = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <path d="M34 14c0-5.523-4.477-8-8-8a8 8 0 0 0-6 2.708A8 8 0 0 0 14 6C9.477 6 6 9.477 6 14c0 8 14 20 14 20S34 22 34 14z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);

const CheckSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const PlusSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const ChevronSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ── Shared input style ─────────────────────────────────────────────────────
const inputStyle = (focused) => ({
  fontFamily: "system-ui",
  fontSize: "0.95rem",
  color: "#1A1A1A",
  width: "100%",
  padding: "0.85rem 1rem",
  border: `1.5px solid ${focused ? "#0F2456" : "#E5E5E0"}`,
  borderRadius: "8px",
  outline: "none",
  background: "#fff",
  transition: "border-color 0.2s ease",
  boxSizing: "border-box",
  appearance: "none",
});

// ── Field Component ────────────────────────────────────────────────────────
function Field({ label, required = false, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <label style={{ fontFamily: "system-ui", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#555" }}>
        {label}{required && <span style={{ color: "#E8892A", marginLeft: "0.2rem" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ name, value, onChange, type = "text", placeholder = "", required = true }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={inputStyle(focused)}
    />
  );
}

// ── Why Card ──────────────────────────────────────────────────────────────
function WhyCard({ icon, title, desc, color, bg }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? color : "#E5E5E0"}`,
        borderRadius: "16px",
        padding: "1.75rem",
        display: "flex", flexDirection: "column", gap: "0.85rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
        {icon}
      </div>
      <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.88rem", color: "#0F2456", textTransform: "uppercase", letterSpacing: "0.04em", margin: 0 }}>{title}</p>
      <p style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#777", lineHeight: 1.65, margin: 0 }}>{desc}</p>
      <div style={{ width: "2rem", height: "2px", background: color, borderRadius: "2px", marginTop: "auto" }} />
    </div>
  );
}

// ── Benefit Card ──────────────────────────────────────────────────────────
function BenefitCard({ icon, title, desc, color, bg }) {
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
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
          {icon}
        </div>
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
export default function PartnerCSRPage() {
  const [formData, setFormData] = useState({
    company_name: "",
    csr_registration_number: "",
    contact_person: "",
    email: "",
    phone: "",
    preferred_states: [],
    budget_range: "",
    receive_proposals: true,
  });
  const [stateInput, setStateInput] = useState("");
  const [stateFocused, setStateFocused] = useState(false);
  const [selectFocused, setSelectFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const budgetRanges = [
    "₹1–5 Lakhs", "₹5–10 Lakhs", "₹10–25 Lakhs",
    "₹25–50 Lakhs", "₹50 Lakhs – 1 Crore", "₹1 Crore+",
  ];

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const addState = () => {
    const trimmed = stateInput.trim();
    if (trimmed && !formData.preferred_states.includes(trimmed)) {
      setFormData({ ...formData, preferred_states: [...formData.preferred_states, trimmed] });
      setStateInput("");
    }
  };

  const removeState = (state) => {
    setFormData({ ...formData, preferred_states: formData.preferred_states.filter(s => s !== state) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setShowSuccess(true);
    setFormData({ company_name: "", csr_registration_number: "", contact_person: "", email: "", phone: "", preferred_states: [], budget_range: "", receive_proposals: true });
    setIsSubmitting(false);
    setTimeout(() => setShowSuccess(false), 6000);
  };

  const whyCards = [
    { icon: "📊", title: "100% Transparency", desc: "Detailed project reports, live tracking, and full financial visibility at every stage.", color: "#1B4FD8", bg: "#EEF2FF" },
    { icon: "🎓", title: "IIM Credibility", desc: "IIM Bangalore-backed initiative with professional management and institutional rigour.", color: "#065F46", bg: "#ECFDF5" },
    { icon: "📸", title: "Measurable Impact", desc: "Before-after documentation, student outcomes, and long-term impact measurement.", color: "#B45309", bg: "#FFFBEB" },
    { icon: "💰", title: "Tax Benefits", desc: "Section 80G eligible donations with complete documentation for your CSR reporting.", color: "#6D28D9", bg: "#F5F3FF" },
    { icon: "🏷️", title: "Brand Visibility", desc: "School signage, reports, and social media acknowledgment for your CSR contributions.", color: "#0E7490", bg: "#ECFEFF" },
    { icon: "🤝", title: "Dedicated Support", desc: "A dedicated relationship manager to handle proposals, visits, and reporting end-to-end.", color: "#BE123C", bg: "#FFF1F2" },
  ];

  const benefitCards = [
    { icon: "📋", title: "Detailed Reporting", desc: "Quarterly reports with photos, financials, and impact metrics for your CSR documentation.", color: "#1B4FD8", bg: "#EEF2FF" },
    { icon: "🚌", title: "Site Visits", desc: "Organised field visits to project schools for your team and key stakeholders.", color: "#065F46", bg: "#ECFDF5" },
    { icon: "📢", title: "Brand Recognition", desc: "Signage at schools, mentions in annual reports, and social media acknowledgment.", color: "#B45309", bg: "#FFFBEB" },
    { icon: "📈", title: "Impact Measurement", desc: "Before-after analysis, student feedback, and long-term outcome tracking with data.", color: "#6D28D9", bg: "#F5F3FF" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAFAF8", minHeight: "100vh", color: "#1A1A1A" }}>

      {/* ── HERO ── */}
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
            CSR &amp; Donor<br />Partnership
          </h1>
          <p style={{ fontFamily: "system-ui", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: 1.7, fontWeight: 400 }}>
            Partner with us to create lasting impact through strategic CSR investments in education across Karnataka.
          </p>
        </div>

        <div style={{ position: "absolute", bottom: "2rem", right: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "system-ui", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Scroll</span>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </header>

      {/* ── WHY PARTNER ── */}
      <section style={{ padding: "8rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "5rem", alignItems: "start", marginBottom: "4rem" }}>
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>The Opportunity</p>
            <h2 style={{ fontSize: "2.8rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0F2456", margin: 0 }}>
              Why invest<br />with Saksham?
            </h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", marginTop: "1.5rem" }} />
          </div>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.85, color: "#555", margin: 0, alignSelf: "center" }}>
            Your CSR investment doesn't just fund a project — it restores dignity, hope, and opportunity for children in Karnataka's most underserved schools. With Saksham, every rupee is tracked, reported, and visible.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {whyCards.map(card => <WhyCard key={card.title} {...card} />)}
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section style={{ background: "#F4F3EF", padding: "7rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Registration</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456", margin: "0 0 0.5rem" }}>CSR Partner Registration</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", margin: "1.25rem auto 0" }} />
          </div>

          {/* Success Banner */}
          {showSuccess && (
            <div style={{ background: "#ECFDF5", border: "1px solid #D1FAE5", borderRadius: "12px", padding: "1.5rem 2rem", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: "#065F46", flexShrink: 0 }}><CheckSVG /></div>
              <div>
                <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.9rem", color: "#065F46", margin: "0 0 0.25rem" }}>Registration Submitted!</p>
                <p style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#059669", margin: 0 }}>Thank you for your interest. Our team will contact you with project proposals within 3–5 business days.</p>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: "20px", padding: "3.5rem" }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

                {/* Company Name */}
                <Field label="Company Name" required>
                  <TextInput name="company_name" value={formData.company_name} onChange={handleChange} />
                </Field>

                {/* CSR Registration */}
                <Field label="CSR Registration Number">
                  <TextInput name="csr_registration_number" value={formData.csr_registration_number} onChange={handleChange} placeholder="If applicable" required={false} />
                </Field>

                {/* Contact Person */}
                <Field label="Contact Person Name" required>
                  <TextInput name="contact_person" value={formData.contact_person} onChange={handleChange} />
                </Field>

                {/* Email + Phone */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <Field label="Email Address" required>
                    <TextInput name="email" value={formData.email} onChange={handleChange} type="email" />
                  </Field>
                  <Field label="Phone Number" required>
                    <TextInput name="phone" value={formData.phone} onChange={handleChange} type="tel" />
                  </Field>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "#F0F0EA" }} />

                {/* Preferred States */}
                <Field label="Preferred States / Districts">
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <input
                      type="text"
                      value={stateInput}
                      onChange={e => setStateInput(e.target.value)}
                      onFocus={() => setStateFocused(true)}
                      onBlur={() => setStateFocused(false)}
                      onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addState())}
                      placeholder="e.g., Karnataka, Tamil Nadu…"
                      style={{ ...inputStyle(stateFocused), flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={addState}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.4rem",
                        padding: "0 1.25rem", background: "#E8892A", color: "#fff",
                        fontFamily: "system-ui", fontSize: "0.8rem", fontWeight: 700,
                        letterSpacing: "0.04em", border: "none", borderRadius: "8px",
                        cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s ease",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#D4791F"}
                      onMouseLeave={e => e.currentTarget.style.background = "#E8892A"}
                    >
                      <PlusSVG /> Add
                    </button>
                  </div>
                  {formData.preferred_states.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
                      {formData.preferred_states.map(state => (
                        <span key={state} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#FFFBEB", color: "#B45309", borderRadius: "6px", padding: "0.3rem 0.75rem", fontFamily: "system-ui", fontSize: "0.78rem", fontWeight: 600, border: "1px solid #FDE68A" }}>
                          {state}
                          <button type="button" onClick={() => removeState(state)} style={{ background: "none", border: "none", color: "#B45309", cursor: "pointer", fontSize: "1rem", lineHeight: 1, padding: 0, opacity: 0.6 }}>×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </Field>

                {/* Budget Range */}
                <Field label="Annual CSR Budget Range" required>
                  <div style={{ position: "relative" }}>
                    <select
                      name="budget_range"
                      value={formData.budget_range}
                      onChange={handleChange}
                      onFocus={() => setSelectFocused(true)}
                      onBlur={() => setSelectFocused(false)}
                      required
                      style={{ ...inputStyle(selectFocused), paddingRight: "2.5rem", cursor: "pointer" }}
                    >
                      <option value="">Select budget range…</option>
                      {budgetRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                    <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#888" }}>
                      <ChevronSVG />
                    </div>
                  </div>
                </Field>

                {/* Checkbox */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div
                    onClick={() => setFormData({ ...formData, receive_proposals: !formData.receive_proposals })}
                    style={{
                      width: "20px", height: "20px", borderRadius: "5px", flexShrink: 0, cursor: "pointer",
                      border: `2px solid ${formData.receive_proposals ? "#E8892A" : "#CCC"}`,
                      background: formData.receive_proposals ? "#E8892A" : "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {formData.receive_proposals && (
                      <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                        <polyline points="2 6 5 9 10 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <label
                    onClick={() => setFormData({ ...formData, receive_proposals: !formData.receive_proposals })}
                    style={{ fontFamily: "system-ui", fontSize: "0.85rem", color: "#555", cursor: "pointer", userSelect: "none" }}
                  >
                    I wish to receive school project proposals via email
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%", padding: "1.1rem",
                    background: isSubmitting ? "#CCC" : "#E8892A",
                    color: "#fff", border: "none", borderRadius: "8px",
                    fontFamily: "system-ui", fontSize: "0.88rem", fontWeight: 800,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = "#D4791F"; }}
                  onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = "#E8892A"; }}
                >
                  {isSubmitting ? "Submitting…" : "Submit Registration"}
                </button>

                <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "#AAA", textAlign: "center", margin: 0 }}>
                  Our team will share detailed project proposals matching your preferences and budget.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ padding: "7rem 4rem", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>What You Get</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456", margin: "0 0 0.5rem" }}>CSR Partnership Benefits</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", margin: "1.25rem auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {benefitCards.map(card => <BenefitCard key={card.title} {...card} />)}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: "7rem 4rem", background: "#0F2456", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-5%", right: "-20%", width: "70vw", height: "70vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Partnership Process</p>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff", marginBottom: "1.5rem" }}>From registration<br />to impact</h2>
            <p style={{ fontFamily: "system-ui", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>
              We make CSR partnerships simple and transparent. Once registered, our team takes care of everything — from matching you to the right projects to delivering comprehensive impact reports.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { step: "01", title: "Application Review", desc: "We review your company profile, preferred geography, and budget range." },
              { step: "02", title: "Project Proposals", desc: "We share curated school projects that match your preferences within 3–5 days." },
              { step: "03", title: "Agreement & Funding", desc: "Once you select a project, we formalise the agreement and begin disbursement." },
              { step: "04", title: "Reporting & Visibility", desc: "Quarterly updates, site visit invitations, and brand acknowledgment throughout." },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "system-ui", fontSize: "0.7rem", fontWeight: 800, color: "#E8892A", letterSpacing: "0.06em", minWidth: "28px", paddingTop: "0.1rem" }}>{step}</span>
                <div>
                  <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.88rem", color: "#fff", marginBottom: "0.2rem" }}>{title}</p>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              </div>
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