import { useState } from "react";

// ── Icons ──────────────────────────────────────────────────────────────────
const MailSVG = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width={size} height={size}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneSVG = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width={size} height={size}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.09h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.98 5.98l1.19-1.19a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MapSVG = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width={size} height={size}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const CheckSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const ClockSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="22" height="22">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const ArrowSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const LinkedInSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const InstaSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="16" height="16">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const YoutubeSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="16" height="16">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);
const TwitterSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// ── Field + Input ──────────────────────────────────────────────────────────
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

function TextInput({ name, value, onChange, type = "text", required = true }) {
  const [focused, setFocused] = useState(false);
  return (
    <input type={type} name={name} value={value} onChange={onChange} required={required}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{ fontFamily: "system-ui", fontSize: "0.95rem", color: "#1A1A1A", width: "100%", padding: "0.85rem 1rem", border: `1.5px solid ${focused ? "#0F2456" : "#E5E5E0"}`, borderRadius: "8px", outline: "none", background: "#fff", transition: "border-color 0.2s ease", boxSizing: "border-box" }}
    />
  );
}

function TextArea({ name, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea name={name} value={value} onChange={onChange} required rows={5}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{ fontFamily: "system-ui", fontSize: "0.95rem", color: "#1A1A1A", width: "100%", padding: "0.85rem 1rem", border: `1.5px solid ${focused ? "#0F2456" : "#E5E5E0"}`, borderRadius: "8px", outline: "none", background: "#fff", transition: "border-color 0.2s ease", resize: "vertical", boxSizing: "border-box", minHeight: "140px" }}
    />
  );
}

// ── Social Button ──────────────────────────────────────────────────────────
function SocialBtn({ href, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ width: "36px", height: "36px", borderRadius: "8px", border: `1px solid ${hovered ? "#E8892A" : "#E5E5E0"}`, background: hovered ? "rgba(232,137,42,0.06)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: hovered ? "#E8892A" : "#999", textDecoration: "none", transition: "all 0.2s ease" }}>
      {icon}
    </a>
  );
}

// ── Contact Info Card ──────────────────────────────────────────────────────
function InfoCard({ icon, label, children, color, bg }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", border: `1px solid ${hovered ? color : "#E5E5E0"}`, borderRadius: "16px", padding: "1.75rem", display: "flex", gap: "1.25rem", alignItems: "flex-start", transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease", transform: hovered ? "translateY(-3px)" : "translateY(0)", boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.07)" : "none" }}>
      <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>{icon}</div>
      <div>
        <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#0F2456", marginBottom: "0.5rem" }}>{label}</p>
        {children}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setShowSuccess(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
    setTimeout(() => setShowSuccess(false), 6000);
  };

  const hours = [
    { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { day: "Saturday", time: "10:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAFAF8", minHeight: "100vh", color: "#1A1A1A" }}>

      {/* ── HERO ── */}
      <header style={{ minHeight: "70vh", background: "#0F2456", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 4rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-5%", right: "-20%", width: "70vw", height: "70vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "4rem", width: "4rem", height: "1px", background: "#E8892A" }} />
        <div style={{ position: "relative", maxWidth: "900px" }}>
          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#FFFFFF", margin: "0 0 2rem" }}>
            Get in<br />Touch
          </h1>
          <p style={{ fontFamily: "system-ui", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: 1.7, fontWeight: 400 }}>
            We'd love to hear from you. Reach out for partnerships, queries, or to learn more about Saksham's work across Karnataka.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", right: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "system-ui", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Scroll</span>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </header>

      {/* ── MAIN GRID ── */}
      <section style={{ padding: "8rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "5rem", alignItems: "start" }}>

          {/* LEFT — Contact info */}
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Reach Us</p>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0F2456", marginBottom: "0.5rem" }}>Contact<br />Information</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", marginBottom: "3rem" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
              <InfoCard icon={<MapSVG />} label="Office Address" color="#1B4FD8" bg="#EEF2FF">
                <p style={{ fontFamily: "system-ui", fontSize: "0.85rem", color: "#555", lineHeight: 1.75, margin: 0 }}>
                  IIM Bangalore, Bannerghatta Road<br />Bangalore – 560076, Karnataka, India
                </p>
              </InfoCard>
              <InfoCard icon={<MailSVG />} label="Email" color="#B45309" bg="#FFFBEB">
                <a href="mailto:contact@saksham.org.in" style={{ fontFamily: "system-ui", fontSize: "0.88rem", color: "#0F2456", textDecoration: "none", fontWeight: 600, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#E8892A"}
                  onMouseLeave={e => e.currentTarget.style.color = "#0F2456"}>
                  contact@saksham.org.in
                </a>
              </InfoCard>
              <InfoCard icon={<PhoneSVG />} label="Phone" color="#065F46" bg="#ECFDF5">
                <a href="tel:+918012345678" style={{ fontFamily: "system-ui", fontSize: "0.88rem", color: "#0F2456", textDecoration: "none", fontWeight: 600, display: "block", marginBottom: "0.25rem", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#E8892A"}
                  onMouseLeave={e => e.currentTarget.style.color = "#0F2456"}>
                  +91 80 1234 5678
                </a>
                <span style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "#AAA" }}>Monday – Friday, 9:00 AM – 6:00 PM</span>
              </InfoCard>
            </div>

            {/* Office Hours */}
            <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: "16px", padding: "1.75rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{ color: "#6D28D9" }}><ClockSVG /></div>
                <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#0F2456", margin: 0 }}>Office Hours</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {hours.map(({ day, time }) => (
                  <div key={day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#777" }}>{day}</span>
                    <span style={{ fontFamily: "system-ui", fontSize: "0.82rem", fontWeight: 700, color: time === "Closed" ? "#BE123C" : "#0F2456" }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAA", fontWeight: 600, marginBottom: "1rem" }}>Follow Us</p>
              <div style={{ display: "flex", gap: "0.65rem" }}>
                <SocialBtn href="https://linkedin.com" icon={<LinkedInSVG />} />
                <SocialBtn href="https://instagram.com" icon={<InstaSVG />} />
                <SocialBtn href="https://youtube.com" icon={<YoutubeSVG />} />
                <SocialBtn href="https://twitter.com" icon={<TwitterSVG />} />
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Write to Us</p>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0F2456", marginBottom: "0.5rem" }}>Send a<br />Message</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", marginBottom: "3rem" }} />

            {/* Success banner */}
            {showSuccess && (
              <div style={{ background: "#ECFDF5", border: "1px solid #D1FAE5", borderRadius: "12px", padding: "1.25rem 1.5rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div style={{ color: "#065F46", flexShrink: 0 }}><CheckSVG /></div>
                <div>
                  <p style={{ fontFamily: "system-ui", fontWeight: 700, fontSize: "0.88rem", color: "#065F46", margin: "0 0 0.2rem" }}>Message Sent!</p>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.78rem", color: "#059669", margin: 0 }}>We'll get back to you within 24–48 hours.</p>
                </div>
              </div>
            )}

            <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: "20px", padding: "3rem" }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  <Field label="Your Name" required>
                    <TextInput name="name" value={formData.name} onChange={handleChange} />
                  </Field>
                  <Field label="Email Address" required>
                    <TextInput name="email" value={formData.email} onChange={handleChange} type="email" />
                  </Field>
                  <Field label="Phone Number">
                    <TextInput name="phone" value={formData.phone} onChange={handleChange} type="tel" required={false} />
                  </Field>
                  <Field label="Message" required>
                    <TextArea name="message" value={formData.message} onChange={handleChange} />
                  </Field>
                  <button type="submit" disabled={isSubmitting}
                    style={{ width: "100%", padding: "1.1rem", background: isSubmitting ? "#CCC" : "#E8892A", color: "#fff", border: "none", borderRadius: "8px", fontFamily: "system-ui", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", cursor: isSubmitting ? "not-allowed" : "pointer", transition: "background 0.2s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}
                    onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = "#D4791F"; }}
                    onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = "#E8892A"; }}>
                    {isSubmitting ? "Sending…" : <><span>Send Message</span><ArrowSVG /></>}
                  </button>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.72rem", color: "#AAA", textAlign: "center", margin: 0 }}>We typically respond within one business day.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP / VISIT ── */}
      <section style={{ background: "#F4F3EF", padding: "7rem 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>Visit Us</p>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0F2456", marginBottom: "1.5rem" }}>Find Our<br />Office</h2>
            <div style={{ width: "3rem", height: "3px", background: "#E8892A", marginBottom: "1.5rem" }} />
            <p style={{ fontFamily: "system-ui", fontSize: "1.05rem", lineHeight: 1.8, color: "#555", marginBottom: "2.5rem" }}>
              Located on the IIM Bangalore campus on Bannerghatta Road. Please schedule an appointment before visiting.
            </p>
            <a href="https://www.google.com/maps/search/?api=1&query=IIM+Bangalore" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#E8892A", color: "#fff", fontFamily: "system-ui", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", padding: "1rem 2rem", borderRadius: "4px", textDecoration: "none", transition: "background 0.2s ease" }}
              onMouseEnter={e => e.currentTarget.style.background = "#D4791F"}
              onMouseLeave={e => e.currentTarget.style.background = "#E8892A"}>
              Get Directions <ArrowSVG />
            </a>
          </div>
          {/* Map placeholder */}
          <div style={{ background: "#fff", border: "1px solid #E5E5E0", borderRadius: "20px", padding: "4rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
            <div style={{ color: "#CBD5E1" }}><MapSVG size={52} /></div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0F2456", letterSpacing: "-0.01em", margin: 0 }}>IIM Bangalore</h3>
            <p style={{ fontFamily: "system-ui", fontSize: "0.82rem", color: "#AAA", margin: 0, textAlign: "center", lineHeight: 1.6 }}>Bannerghatta Road<br />Bangalore – 560076</p>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
              {[{ label: "Mon–Fri", time: "9AM–6PM" }, { label: "Saturday", time: "10AM–2PM" }, { label: "Sunday", time: "Closed" }].map(({ label, time }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#E8892A", margin: "0 0 0.2rem" }}>{label}</p>
                  <p style={{ fontFamily: "system-ui", fontSize: "0.72rem", color: "#999", margin: 0 }}>{time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}