import { useState, useEffect } from "react";
import { Heart, Building2, Droplet, Monitor, Book, CheckCircle } from "lucide-react";
import { supabase } from '../lib/supabase';
import type { School } from '../lib/supabase';

const causes = [
  { id: 'wash', label: 'Drinking Water, Sanitation & Hygiene', icon: Droplet },
  { id: 'digital', label: 'E-Learning & Digital Infrastructure', icon: Monitor },
  { id: 'furniture', label: 'Classroom Furniture & Fixtures', icon: Building2 },
  { id: 'library', label: 'Library & Learning Resources', icon: Book },
];

const predefinedAmounts = [1000, 5000, 10000, 25000, 50000, 100000];

export default function DonatePage() {
  const [donationType, setDonationType] = useState<'specific' | 'cause' | 'general'>('general');
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedCause, setSelectedCause] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('id, name, district, project_code, status')
        .in('status', ['ongoing', 'pipeline'])
        .order('name', { ascending: true });

      if (error) throw error;
      if (data) setSchools(data);
    } catch (error) {
      console.error('Error loading schools:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const donationData = {
        school_id: donationType === 'specific' ? selectedSchool : null,
        donor_name: isAnonymous ? null : donorName,
        is_anonymous: isAnonymous,
        amount: parseFloat(amount),
        donation_type: donationType === 'specific' ? 'specific_school' : donationType === 'cause' ? 'cause' : 'general',
        cause_category: donationType === 'cause' ? selectedCause : null,
      };

      const { error } = await supabase.from('donations').insert([donationData]);

      if (error) throw error;

      setShowSuccess(true);
      // Reset form
      setAmount('');
      setDonorName('');
      setDonorEmail('');
      setSelectedSchool('');
      setSelectedCause('');
      setIsAnonymous(false);

      setTimeout(() => setShowSuccess(false), 6000);
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('There was an error processing your donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      fontFamily: "'Georgia', 'Times New Roman', serif", 
      background: "#FAFAF8", 
      minHeight: "100vh", 
      color: "#1A1A1A" 
    }}>

      {/* ── HERO ── */}
      <header style={{ minHeight: "70vh", background: "#0F2456", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 4rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-5%", right: "-20%", width: "70vw", height: "70vw", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "4rem", width: "4rem", height: "1px", background: "#E8892A" }} />
        <div style={{ position: "relative", maxWidth: "900px" }}>
          <h1 style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#FFFFFF", margin: "0 0 2rem" }}>
            Make a Lasting<br />Difference
          </h1>
          <p style={{ fontFamily: "system-ui", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: "480px", lineHeight: 1.7, fontWeight: 400 }}>
           Your generosity directly transforms government schools in Karnataka — giving children the dignity and opportunity they deserve.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", right: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "system-ui", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Scroll</span>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </header>

      {/* SUCCESS MESSAGE */}
      {showSuccess && (
        <div style={{ 
          maxWidth: "680px", 
          margin: "3rem auto 0", 
          background: "#F0FDF4", 
          borderLeft: "5px solid #15803D", 
          padding: "2rem",
          borderRadius: "8px"
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <CheckCircle size={32} color="#15803D" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ color: "#166534", fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Thank You for Your Generosity
              </h3>
              <p style={{ color: "#14532D", lineHeight: 1.7 }}>
                Your donation has been recorded successfully. Our team will reach out shortly with secure payment details and a formal receipt.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DONATION FORM */}
      <section style={{ padding: "7rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ 
          background: "#FFFFFF", 
          borderRadius: "20px", 
          padding: "3.5rem 3rem", 
          boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
          border: "1px solid #E5E5E0"
        }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600 }}>
              Support Saksham
            </p>
            <h2 style={{ fontSize: "2.6rem", fontWeight: 700, color: "#0F2456", marginTop: "0.75rem" }}>
              Choose How You Want to Help
            </h2>
          </div>

          {/* Donation Type Selection */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "3.5rem" }}>
            {[
              { type: 'specific', label: "Specific School", icon: Building2, desc: "Directly support a particular school renovation" },
              { type: 'cause', label: "Specific Cause", icon: Droplet, desc: "Fund one of our core transformation pillars" },
              { type: 'general', label: "General Fund", icon: Heart, desc: "Support wherever the need is greatest" },
            ].map(({ type, label, icon: Icon, desc }) => (
              <button
                key={type}
                onClick={() => setDonationType(type as any)}
                style={{
                  padding: "2rem 1.75rem",
                  border: donationType === type ? "2px solid #E8892A" : "2px solid #E5E5E0",
                  background: donationType === type ? "#FFF9F0" : "#fff",
                  borderRadius: "16px",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                }}
              >
                <Icon size={36} color={donationType === type ? "#E8892A" : "#888"} style={{ marginBottom: "1rem" }} />
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "0.5rem" }}>{label}</h3>
                <p style={{ fontFamily: "system-ui", fontSize: "0.9rem", color: "#666", lineHeight: 1.5 }}>{desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Specific School */}
            {donationType === 'specific' && (
              <div>
                <label style={{ display: "block", fontFamily: "system-ui", fontSize: "0.9rem", fontWeight: 600, color: "#444", marginBottom: "0.75rem" }}>
                  Select School to Support *
                </label>
                <select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "1rem 1.25rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "10px",
                    fontSize: "1.05rem",
                    background: "#fff"
                  }}
                >
                  <option value="">Choose a school...</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name} — {school.district}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Specific Cause */}
            {donationType === 'cause' && (
              <div>
                <label style={{ display: "block", fontFamily: "system-ui", fontSize: "0.9rem", fontWeight: 600, color: "#444", marginBottom: "1rem" }}>
                  Choose a Cause *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
                  {causes.map((cause) => {
                    const Icon = cause.icon;
                    return (
                      <button
                        key={cause.id}
                        type="button"
                        onClick={() => setSelectedCause(cause.id)}
                        style={{
                          padding: "1.5rem",
                          border: selectedCause === cause.id ? "2px solid #E8892A" : "1px solid #E5E5E0",
                          background: selectedCause === cause.id ? "#FFF9F0" : "#fff",
                          borderRadius: "14px",
                          textAlign: "left",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Icon size={28} color={selectedCause === cause.id ? "#E8892A" : "#666"} />
                        <div style={{ marginTop: "1rem", fontWeight: 700, color: "#1A1A1A" }}>{cause.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Amount */}
            <div>
              <label style={{ display: "block", fontFamily: "system-ui", fontSize: "0.9rem", fontWeight: 600, color: "#444", marginBottom: "1rem" }}>
                Donation Amount (₹) *
              </label>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.75rem", marginBottom: "1.25rem" }}>
                {predefinedAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt.toString())}
                    style={{
                      padding: "0.9rem 1rem",
                      border: amount === amt.toString() ? "2px solid #E8892A" : "1px solid #D1D5DB",
                      background: amount === amt.toString() ? "#E8892A" : "#fff",
                      color: amount === amt.toString() ? "#fff" : "#1A1A1A",
                      borderRadius: "10px",
                      fontWeight: 600,
                      fontSize: "1.02rem",
                    }}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="100"
                placeholder="Or enter custom amount"
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  border: "1px solid #D1D5DB",
                  borderRadius: "10px",
                  fontSize: "1.1rem",
                }}
              />
            </div>

            {/* Anonymous */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                style={{ width: "20px", height: "20px", accentColor: "#E8892A" }}
              />
              <label htmlFor="anonymous" style={{ fontFamily: "system-ui", fontSize: "1rem", color: "#555", cursor: "pointer" }}>
                I wish to donate anonymously
              </label>
            </div>

            {/* Donor Details */}
            {!isAnonymous && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "system-ui", fontSize: "0.9rem", fontWeight: 600, color: "#444", marginBottom: "0.75rem" }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "1rem 1.25rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "10px",
                      fontSize: "1.05rem",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "system-ui", fontSize: "0.9rem", fontWeight: 600, color: "#444", marginBottom: "0.75rem" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "1rem 1.25rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "10px",
                      fontSize: "1.05rem",
                    }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: "1.5rem",
                width: "100%",
                background: "#E8892A",
                color: "#fff",
                padding: "1.25rem",
                fontSize: "1.15rem",
                fontWeight: 700,
                borderRadius: "12px",
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.85 : 1,
                transition: "all 0.2s ease",
              }}
            >
              {isSubmitting ? "Processing your donation..." : "Proceed to Donate Securely"}
            </button>

            <p style={{ 
              textAlign: "center", 
              fontFamily: "system-ui", 
              fontSize: "0.85rem", 
              color: "#777", 
              marginTop: "1rem" 
            }}>
              Our team will contact you shortly with secure payment instructions and a formal receipt.
            </p>
          </form>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section style={{ padding: "6rem 2rem", background: "#F4F3EF" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#E8892A", fontWeight: 600, marginBottom: "1rem" }}>
            Your Contribution
          </p>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 700, color: "#0F2456", marginBottom: "3rem" }}>
            See the Real Impact
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.75rem" }}>
            {[
              { amount: "₹1,000", impact: "Furniture for one classroom – benefiting 30–40 children" },
              { amount: "₹5,000", impact: "Complete renovation of one sanitation unit" },
              { amount: "₹25,000", impact: "Basic digital learning setup with computers" },
              { amount: "₹1,00,000", impact: "Full transformation of a small government school" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#fff",
                padding: "2.25rem 1.75rem",
                borderRadius: "16px",
                border: "1px solid #E5E5E0",
                textAlign: "left"
              }}>
                <div style={{ fontSize: "2.1rem", fontWeight: 700, color: "#E8892A", marginBottom: "1rem" }}>
                  {item.amount}
                </div>
                <p style={{ fontFamily: "system-ui", fontSize: "0.97rem", lineHeight: 1.65, color: "#555" }}>
                  {item.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}