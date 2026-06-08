import { useState } from "react";

// ── Icons ──────────────────────────────────────────────────────────────────
const BuildingSVG = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <rect x="5" y="10" width="30" height="26" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M13 36V24h14v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="10" y="15" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="25" y="15" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 10L20 2l18 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const CheckSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const UploadSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="22" height="22">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);

const PlusSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

// ── Field Component ────────────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <label style={{ fontFamily: "system-ui", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#555" }}>
        {label}{required && <span style={{ color: "#E8892A", marginLeft: "0.2rem" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

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
});

function TextInput({ name, value, onChange, type = "text", placeholder = "" }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={inputStyle(focused)}
    />
  );
}

// ── Why Partner Card ───────────────────────────────────────────────────────
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

// ── Main Page ──────────────────────────────────────────────────────────────
export default function PartnerNGOPage() {
  const [formData, setFormData] = useState({
    name: "",
    registration_number: "",
    pan: "",
    areas_of_operation: [],
    contact_person: "",
    email: "",
    phone: "",
  });
  const [areaInput, setAreaInput] = useState("");
  const [areaFocused, setAreaFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addArea = () => {
    const trimmed = areaInput.trim();
    if (trimmed && !formData.areas_of_operation.includes(trimmed)) {
      setFormData({ ...formData, areas_of_operation: [...formData.areas_of_operation, trimmed] });
      setAreaInput("");
    }
  };

  const removeArea = (area) => {
    setFormData({ ...formData, areas_of_operation: formData.areas_of_operation.filter(a => a !== area) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(r => setTimeout(r, 1200));
    setShowSuccess(true);
    setFormData({ name: "", registration_number: "", pan: "", areas_of_operation: [], contact_person: "", email: "", phone: "" });
    setIsSubmitting(false);
    setTimeout(() => setShowSuccess(false), 6000);
  };

  const whyCards = [
    { icon: "🏫", title: "Vetted Projects", desc: "Access to school renovation projects across Karnataka, carefully selected for impact.", color: "#1B4FD8", bg: "#EEF2FF" },
    { icon: "📊", title: "Transparent Funding", desc: "Professional project management with full financial transparency at every stage.", color: "#065F46", bg: "#ECFDF5" },
    { icon: "🎓", title: "IIM Backing", desc: "Work alongside an IIM Bangalore-backed initiative with institutional rigour.", color: "#B45309", bg: "#FFFBEB" },
    { icon: "✅", title: "Build Credibility", desc: "Documented, verified work that strengthens your NGO's track record.", color: "#6D28D9", bg: "#F5F3FF" },
  ];

  const docList = ["80G / 12A Certificate (if applicable)", "Registration Certificate", "PAN Card", "Photos of past work (optional)"];

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
          <div style={{ color: "rgba(255,255,255,0.25)", marginBottom: "1.5rem" }}>
            <BuildingSVG />
          </div>
          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#FFFFFF", margin: "0 0 2rem" }}>
            Register as<br />NGO Partner
          </h1>
          <p style={{ fontFamily: "system-ui", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: 1.7, fontWeight: 400 }}>
            Join our network of verified implementation partners and help transform government schools across Karnataka.
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
              Why partner<br />with Saksham?
            </h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", marginTop: "1.5rem" }} />
          </div>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.85, color: "#555", margin: 0, alignSelf: "center" }}>
            Saksham brings together NGOs with proven on-ground capabilities and connects them to resources, institutional credibility, and a robust pipeline of vetted projects. Together, we can scale impact for millions of children.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
          {whyCards.map(card => <WhyCard key={card.title} {...card} />)}
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section style={{ background: "#F4F3EF", padding: "7rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Registration</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0F2456", margin: "0 0 0.5rem" }}>NGO Registration Form</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", margin: "1.25rem auto 0" }} />
          </div>

          {/* Success Banner */}
          {showSuccess && (
            <div style={{ background: "#ECFDF5", border: "1px solid #D1FAE5", borderRadius: "12px", padding: "1.5rem 2rem", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: "#065F46", flexShrink: 0 }}><CheckSVG /></div>
              <div>
                <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.9rem", color: "#065F46", margin: "0 0 0.25rem" }}>Registration Submitted!</p>
                <p style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#059669", margin: 0 }}>Our team will review your application and contact you within 5–7 business days.</p>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: "20px", padding: "3.5rem" }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

                {/* NGO Name */}
                <Field label="NGO Name" required>
                  <TextInput name="name" value={formData.name} onChange={handleChange} />
                </Field>

                {/* Reg + PAN */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <Field label="Registration Number" required>
                    <TextInput name="registration_number" value={formData.registration_number} onChange={handleChange} />
                  </Field>
                  <Field label="PAN Number" required>
                    <TextInput name="pan" value={formData.pan} onChange={handleChange} />
                  </Field>
                </div>

                {/* Areas of Operation */}
                <Field label="Areas of Operation">
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <input
                      type="text"
                      value={areaInput}
                      onChange={e => setAreaInput(e.target.value)}
                      onFocus={() => setAreaFocused(true)}
                      onBlur={() => setAreaFocused(false)}
                      onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addArea())}
                      placeholder="e.g., Bangalore Urban, Mysore…"
                      style={{ ...inputStyle(areaFocused), flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={addArea}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.4rem",
                        padding: "0 1.25rem", background: "#0F2456", color: "#fff",
                        fontFamily: "system-ui", fontSize: "0.8rem", fontWeight: 700,
                        letterSpacing: "0.04em", border: "none", borderRadius: "8px",
                        cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s ease",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#1B4FD8"}
                      onMouseLeave={e => e.currentTarget.style.background = "#0F2456"}
                    >
                      <PlusSVG /> Add
                    </button>
                  </div>
                  {formData.areas_of_operation.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
                      {formData.areas_of_operation.map(area => (
                        <span key={area} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#EEF2FF", color: "#1B4FD8", borderRadius: "6px", padding: "0.3rem 0.75rem", fontFamily: "system-ui", fontSize: "0.78rem", fontWeight: 600 }}>
                          {area}
                          <button type="button" onClick={() => removeArea(area)} style={{ background: "none", border: "none", color: "#1B4FD8", cursor: "pointer", fontSize: "1rem", lineHeight: 1, padding: 0, opacity: 0.6 }}>×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </Field>

                {/* Divider */}
                <div style={{ height: "1px", background: "#F0F0EA" }} />

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

                {/* Document Info */}
                <div style={{ background: "#FAFAF8", border: "1px solid #E5E5E0", borderRadius: "12px", padding: "1.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1rem" }}>
                    <div style={{ color: "#888" }}><UploadSVG /></div>
                    <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.85rem", color: "#0F2456", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Document Upload</p>
                  </div>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#777", lineHeight: 1.6, marginBottom: "1rem" }}>
                    Please have the following documents ready. Our team will contact you for submission:
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {docList.map(doc => (
                      <div key={doc} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#E8892A", flexShrink: 0 }} />
                        <span style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#666" }}>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%", padding: "1.1rem", background: isSubmitting ? "#CCC" : "#E8892A",
                    color: "#fff", border: "none", borderRadius: "8px",
                    fontFamily: "system-ui", fontSize: "0.88rem", fontWeight: 800,
                    letterSpacing: "0.08em", textTransform: "uppercase", cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = "#D4791F"; }}
                  onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = "#E8892A"; }}
                >
                  {isSubmitting ? "Submitting…" : "Submit Registration"}
                </button>

                <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "#AAA", textAlign: "center", margin: 0 }}>
                  By submitting this form, you agree to our verification process and partnership terms.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── IIM BACKING ── */}
      <section style={{ padding: "7rem 4rem", background: "#964a88", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-5%", right: "-20%", width: "70vw", height: "70vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Partnership Process</p>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff", marginBottom: "1.5rem" }}>What happens<br />next?</h2>
            <p style={{ fontFamily: "system-ui", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.6)" }}>
              After you submit, our team at IIM Bangalore reviews your application, verifies credentials, and schedules an onboarding call within 5–7 business days.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { step: "01", title: "Application Review", desc: "Our team reviews your NGO's credentials and areas of operation." },
              { step: "02", title: "Document Verification", desc: "We verify registration, PAN, and certifications with official records." },
              { step: "03", title: "Onboarding Call", desc: "A 30-minute call to align on expectations, projects, and next steps." },
              { step: "04", title: "Project Assignment", desc: "You're matched with suitable school renovation projects in your area." },
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

     
    </div>
  );
}