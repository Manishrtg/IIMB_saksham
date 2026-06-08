export default function Footer() {
  return (
    <footer style={{ background: "#0F2456", color: "#fff", position: "relative", overflow: "hidden" }}>

      {/* Decorative circles — same as hero sections */}
      <div style={{ position: "absolute", bottom: "-20%", left: "-8%", width: "40vw", height: "40vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-30%", left: "-16%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", pointerEvents: "none" }} />

      {/* Main content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 4rem 0", position: "relative" }}>

        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "4rem", paddingBottom: "4rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Brand block */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#E8892A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "system-ui", fontWeight: 900, fontSize: "1.1rem", color: "#fff" }}>S</span>
              </div>
              <div>
                <p style={{ fontFamily: "system-ui", fontWeight: 800, fontSize: "1.1rem", color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>Saksham</p>
                <p style={{ fontFamily: "system-ui", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", margin: 0, letterSpacing: "0.08em", textTransform: "uppercase" }}>IIM Bangalore Initiative</p>
              </div>
            </div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: "0 0 2rem", maxWidth: "280px" }}>
              Transforming government schools and Anganwadis across Karnataka — restoring dignity and opportunity for every child.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.65rem" }}>
              {[
                { href: "https://linkedin.com", icon: <LinkedInIcon />, label: "LinkedIn" },
                { href: "https://instagram.com", icon: <InstagramIcon />, label: "Instagram" },
                { href: "https://youtube.com", icon: <YoutubeIcon />, label: "YouTube" },
                { href: "https://twitter.com", icon: <TwitterIcon />, label: "X" },
              ].map(({ href, icon, label }) => (
                <SocialBtn key={label} href={href} icon={icon} />
              ))}
            </div>
          </div>

          {/* Contact block */}
          <div>
            <p style={{ fontFamily: "system-ui", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", marginBottom: "1.5rem" }}>Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <ContactItem icon={<MailIcon />} href="mailto:contact@saksham.org.in" text="contact@saksham.org.in" />
              <ContactItem icon={<PhoneIcon />} href="tel:+918012345678" text="+91 80 1234 5678" />
              <ContactItem icon={<MapIcon />} text="IIM Bangalore, Bannerghatta Road, Bangalore – 560076" />
            </div>
          </div>

          {/* Est. + amber rule block */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "system-ui", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8892A", marginBottom: "1.5rem" }}>Our Reach</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { value: "106+", label: "Schools Impacted" },
                  { value: "Karnataka", label: "State Coverage" },
                  { value: "Est. 2023", label: "IIM Bangalore" },
                ].map(({ value, label }) => (
                  <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <div style={{ width: "3px", height: "2.5rem", background: "rgba(232,137,42,0.3)", borderRadius: "2px", flexShrink: 0, position: "relative" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "50%", background: "#E8892A", borderRadius: "2px" }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "system-ui", fontWeight: 800, fontSize: "1rem", color: "#fff", margin: 0, lineHeight: 1 }}>{value}</p>
                      <p style={{ fontFamily: "system-ui", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", margin: "0.2rem 0 0", letterSpacing: "0.04em" }}>{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ padding: "1.75rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontFamily: "system-ui", fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", margin: 0 }}>
            © {new Date().getFullYear()} Saksham — Revitalizing Government Schools. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "1.5rem", height: "1px", background: "rgba(255,255,255,0.15)" }} />
            <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#E8892A" }} />
            <div style={{ width: "1.5rem", height: "1px", background: "rgba(255,255,255,0.15)" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────
function SocialBtn({ href, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "36px", height: "36px", borderRadius: "8px",
        border: `1px solid ${hovered ? "#E8892A" : "rgba(255,255,255,0.1)"}`,
        background: hovered ? "rgba(232,137,42,0.12)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hovered ? "#E8892A" : "rgba(255,255,255,0.4)",
        textDecoration: "none",
        transition: "all 0.2s ease",
      }}
    >
      {icon}
    </a>
  );
}

function ContactItem({ icon, href, text }) {
  const [hovered, setHovered] = useState(false);
  const isLink = !!href;
  const Tag = isLink ? "a" : "div";
  return (
    <Tag
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: "0.65rem",
        textDecoration: "none",
        color: isLink && hovered ? "#E8892A" : "rgba(255,255,255,0.45)",
        transition: "color 0.2s ease",
        cursor: isLink ? "pointer" : "default",
      }}
    >
      <span style={{ color: "#E8892A", marginTop: "1px", flexShrink: 0 }}>{icon}</span>
      <span style={{ fontFamily: "system-ui", fontSize: "0.82rem", lineHeight: 1.6 }}>{text}</span>
    </Tag>
  );
}

// ── useState import ─────────────────────────────────────────────────────────
import { useState } from "react";

// ── SVG Icons ──────────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.09h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.98 5.98l1.19-1.19a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="15" height="15">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="15" height="15">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);