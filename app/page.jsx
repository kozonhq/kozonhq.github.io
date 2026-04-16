"use client"; // <--- Add this exactly like this

// ... the rest of your KozonHQ code
import { useState, useEffect, useRef } from "react";

const BLUE = "#3b82f6";
const GREEN = "#10b981";

const LIGHT = {
  bg: "#f8f7f4", bgAlt: "#ffffff",
  surface: "rgba(255,255,255,0.8)", surfaceHover: "rgba(255,255,255,0.97)",
  border: "rgba(0,0,0,0.08)", borderAccent: "rgba(59,130,246,0.35)",
  text: "#0a0a0b", textMuted: "rgba(10,10,11,0.45)", textSub: "rgba(10,10,11,0.6)",
  navBg: "rgba(248,247,244,0.9)",
  shadow: "0 2px 20px rgba(0,0,0,0.06)", shadowHover: "0 8px 36px rgba(59,130,246,0.12)",
  gridLine: "rgba(59,130,246,0.05)",
  glow1: "rgba(59,130,246,0.08)", glow2: "rgba(16,185,129,0.06)",
};
const DARK = {
  bg: "#09090b", bgAlt: "#111113",
  surface: "rgba(255,255,255,0.03)", surfaceHover: "rgba(255,255,255,0.055)",
  border: "rgba(255,255,255,0.08)", borderAccent: "rgba(59,130,246,0.4)",
  text: "#f4f4f5", textMuted: "rgba(244,244,245,0.4)", textSub: "rgba(244,244,245,0.55)",
  navBg: "rgba(9,9,11,0.9)",
  shadow: "none", shadowHover: "0 0 32px rgba(59,130,246,0.18)",
  gridLine: "rgba(59,130,246,0.04)",
  glow1: "rgba(59,130,246,0.12)", glow2: "rgba(16,185,129,0.08)",
};

const NAV_LINKS = [
  { label: "Product Lab", target: "product-lab" },
  { label: "Services", target: "services" },
  { label: "Process", target: "process" },
];

const BENTO = [
  { icon: "⚡", title: "Single-Purpose Tools", desc: "Laser-focused productivity instruments. One problem, one solution, zero bloat.", accent: BLUE },
  { icon: "🔁", title: "Automation Utilities", desc: "Eliminate repetition at scale. Wire the logic so your team never repeats itself again.", accent: GREEN },
  { icon: "🌐", title: "Web Applications", desc: "Focused, fast, opinionated. Built for the exact workflow — nothing more, nothing less.", accent: BLUE },
  { icon: "🛤️", title: "Low-Friction Workflows", desc: "Digital pipelines that remove friction between intent and outcome.", accent: GREEN },
];

const SERVICES = [
  { num: "01", title: "Web & Mobile Engineering", desc: "High-performance applications built for speed, scale, and longevity. Products that outlast trends.", tags: ["React", "Next.js", "React Native", "TypeScript"], accent: BLUE },
  { num: "02", title: "QA Automation & Test Management", badge: "Senior-level Architecture", desc: "Testing is not an afterthought. We architect quality from line one — automated, reliable, ruthless.", tags: ["Playwright", "Cypress", "Jest", "CI/CD"], accent: GREEN },
  { num: "03", title: "Workflow & Business Automation", desc: "We turn manual, repetitive processes into self-running systems that scale without headcount.", tags: ["n8n", "Zapier", "Make", "Custom APIs"], accent: BLUE },
];

const STEPS = [
  { label: "Discovery", desc: "Understand the exact problem, no more." },
  { label: "Architecture", desc: "Design the system before a line is written." },
  { label: "Engineering", desc: "Ship fast. Ship right. No shortcuts." },
  { label: "Automated QA", desc: "Test everything. Trust nothing manually." },
  { label: "Deployment", desc: "Live, monitored, production-hardened." },
];

const SITEMAP_COLS = [
  { section: "Main", color: BLUE, links: [{ label: "Home", action: "scroll:home" }, { label: "Product Lab", action: "scroll:product-lab" }, { label: "Services", action: "scroll:services" }, { label: "Process", action: "scroll:process" }, { label: "Book a Call", action: "booking" }] },
  { section: "Legal", color: GREEN, links: [{ label: "Privacy Policy", action: "legal:Privacy Policy" }, { label: "Terms of Service", action: "legal:Terms of Service" }, { label: "Cookie Policy", action: "legal:Cookie Policy" }, { label: "Refund Policy", action: "legal:Refund Policy" }] },
  { section: "Products", color: BLUE, links: [{ label: "Automation Tools", action: "scroll:product-lab" }, { label: "Web Apps", action: "scroll:product-lab" }, { label: "Productivity Tools", action: "scroll:product-lab" }, { label: "Workflows", action: "scroll:product-lab" }] },
  { section: "Company", color: GREEN, links: [{ label: "About KozonHQ", action: "scroll:home" }, { label: "Careers", action: "#" }, { label: "Blog", action: "#" }, { label: "Contact", action: "booking" }] },
];

const SOCIALS = [
  { label: "LinkedIn", url: "https://linkedin.com/company/kozonhq", icon: "in" },
  { label: "X", url: "https://x.com/kozonhq", icon: "𝕏" },
  { label: "GitHub", url: "https://github.com/kozonhq", icon: "◈" },
  { label: "Instagram", url: "https://instagram.com/kozonhq", icon: "◎" },
];

const LEGAL_CONTENT = {
  "Privacy Policy": {
    intro: "KozonHQ is committed to protecting your personal information. This policy explains what we collect and how we use it.",
    sections: [
      { title: "Data We Collect", body: "We collect only the information you provide via our contact form: name, email address, company name, and project details. We do not collect any data passively beyond standard server logs." },
      { title: "How We Use It", body: "Your data is used solely to respond to your inquiry and scope your project. We never sell, rent, or share your data with third parties for marketing purposes." },
      { title: "Data Retention", body: "We retain your contact information for up to 24 months from last contact, after which it is securely deleted unless an active engagement exists." },
      { title: "Your Rights", body: "You may request access to, correction of, or deletion of your data at any time by emailing hello@kozonhq.com. We will respond within 30 days." },
    ],
  },
  "Terms of Service": {
    intro: "By engaging KozonHQ for services, you agree to the following terms. Please read carefully.",
    sections: [
      { title: "Services", body: "KozonHQ provides software engineering, QA automation, and workflow automation services on a project basis. All engagements begin with a scoping call and written proposal." },
      { title: "Payment", body: "Payment terms are defined per-project in the signed proposal. Typically: 50% upfront, 50% on delivery. Late payments incur a 2% monthly fee." },
      { title: "Intellectual Property", body: "Upon full payment, all custom code and deliverables are assigned to the client. KozonHQ retains the right to reference the project in its portfolio unless otherwise agreed in writing." },
      { title: "Limitation of Liability", body: "KozonHQ's liability is limited to the total fees paid for the specific engagement. We are not liable for indirect, incidental, or consequential damages." },
    ],
  },
  "Cookie Policy": {
    intro: "KozonHQ uses cookies minimally and only for essential site function and anonymous analytics.",
    sections: [
      { title: "What Are Cookies", body: "Cookies are small text files stored on your device by your browser. They help websites remember your preferences." },
      { title: "Cookies We Use", body: "Essential cookies: Required for site function (e.g., theme preference). Analytics cookies: Anonymous, aggregated usage data. We do not use advertising or tracking cookies." },
      { title: "Managing Cookies", body: "You can disable cookies in your browser settings at any time. Disabling essential cookies may affect site functionality." },
    ],
  },
  "Refund Policy": {
    intro: "KozonHQ delivers custom software solutions. Our refund policy reflects the nature of bespoke digital work.",
    sections: [
      { title: "No Refunds on Custom Development", body: "Due to the bespoke nature of software development, upfront payments are non-refundable once work has commenced. This is standard practice in the custom software industry." },
      { title: "Milestone-Based Engagements", body: "For phased projects, if KozonHQ fails to deliver an agreed milestone within the agreed timeframe, the client may request a credit toward future work equal to that milestone's value." },
      { title: "Cancellation", body: "Either party may cancel an engagement with 14 days written notice. Work completed up to cancellation will be invoiced at the agreed rate." },
    ],
  },
};

// ── Hooks ──
function useInView(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(22px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ── GlassCard ──
function Card({ children, accent = BLUE, tk, style = {}, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={onClick}
      style={{ background: h ? tk.surfaceHover : tk.surface, border: `1px solid ${h ? accent + "50" : tk.border}`, borderRadius: 16, backdropFilter: "blur(16px)", boxShadow: h ? tk.shadowHover : tk.shadow, transition: "all 0.3s ease", cursor: onClick ? "pointer" : "default", ...style }}>
      {children}
    </div>
  );
}

// ── Stepper ──
function Stepper({ tk }) {
  const [a, setA] = useState(0);
  const [ref, v] = useInView(0.2);
  useEffect(() => {
    if (!v) return;
    const iv = setInterval(() => setA(p => (p + 1) % STEPS.length), 2400);
    return () => clearInterval(iv);
  }, [v]);

  return (
    <div ref={ref}>
      {/* Desktop */}
      <div style={{ display: "flex", alignItems: "flex-start" }} className="kzn-stepper-d">
        {STEPS.map((s, i) => (
          <div key={i} onClick={() => setA(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
            <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1, height: 1, background: i === 0 ? "transparent" : i <= a ? BLUE : tk.border, transition: "background 0.5s" }} />
              <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, border: `2px solid ${i === a ? BLUE : i < a ? GREEN : tk.border}`, background: i === a ? `${BLUE}18` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.4s", boxShadow: i === a ? `0 0 18px ${BLUE}35` : "none" }}>
                {i < a ? <span style={{ color: GREEN, fontSize: 13 }}>✓</span> : <span style={{ color: i === a ? BLUE : tk.textMuted, fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono',monospace" }}>{i + 1}</span>}
              </div>
              <div style={{ flex: 1, height: 1, background: i >= STEPS.length - 1 ? "transparent" : i < a ? BLUE : tk.border, transition: "background 0.5s" }} />
            </div>
            <div style={{ marginTop: 14, textAlign: "center", padding: "0 4px" }}>
              <p style={{ color: i === a ? tk.text : tk.textMuted, fontWeight: i === a ? 700 : 400, fontSize: 12, letterSpacing: "0.04em", fontFamily: "'DM Mono',monospace", transition: "color 0.3s" }}>{s.label}</p>
              <p style={{ color: tk.textMuted, fontSize: 11, marginTop: 6, lineHeight: 1.5, opacity: i === a ? 1 : 0, transform: i === a ? "translateY(0)" : "translateY(4px)", transition: "all 0.4s", maxWidth: 100 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile */}
      <div className="kzn-stepper-m" style={{ flexDirection: "column", gap: 10 }}>
        {STEPS.map((s, i) => (
          <div key={i} onClick={() => setA(i)} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 18px", borderRadius: 12, cursor: "pointer", background: i === a ? `${BLUE}10` : "transparent", border: `1px solid ${i === a ? BLUE + "40" : tk.border}`, transition: "all 0.3s" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, border: `2px solid ${i === a ? BLUE : i < a ? GREEN : tk.border}`, background: i === a ? `${BLUE}18` : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {i < a ? <span style={{ color: GREEN, fontSize: 12 }}>✓</span> : <span style={{ color: i === a ? BLUE : tk.textMuted, fontSize: 10, fontWeight: 700, fontFamily: "'DM Mono',monospace" }}>{i + 1}</span>}
            </div>
            <div>
              <p style={{ color: i === a ? tk.text : tk.textMuted, fontWeight: 600, fontSize: 13 }}>{s.label}</p>
              <p style={{ color: tk.textMuted, fontSize: 12, marginTop: 3, lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Booking Modal ──
function BookingModal({ open, onClose, tk }) {
  const isDark = tk.bg === DARK.bg;
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  if (!open) return null;
  const submit = () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };
  const inp = { width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${tk.border}`, background: isDark ? "rgba(255,255,255,0.04)" : "#fafafa", color: tk.text, fontSize: 14, outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", transition: "border-color 0.2s" };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#111113" : "#fff", border: `1px solid ${tk.border}`, borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 480, boxShadow: "0 24px 80px rgba(0,0,0,0.22)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: tk.textMuted, fontSize: 20 }}>✕</button>
        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ color: tk.text, fontWeight: 800, fontSize: 22, marginBottom: 8 }}>We'll be in touch.</h3>
            <p style={{ color: tk.textMuted, fontSize: 14, lineHeight: 1.6 }}>Expect a response within 48 hours. We'll send a clear scope — no fluff.</p>
            <button onClick={() => { setDone(false); setForm({ name: "", email: "", company: "", message: "" }); onClose(); }} style={{ marginTop: 24, padding: "10px 24px", borderRadius: 8, background: BLUE, color: "#fff", border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Close</button>
          </div>
        ) : (
          <>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: BLUE, letterSpacing: "0.1em", textTransform: "uppercase" }}>// Book a Call</span>
            <h3 style={{ color: tk.text, fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em", margin: "10px 0 6px" }}>Let's scope your project.</h3>
            <p style={{ color: tk.textMuted, fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>Fill in the details and we'll respond within 48 hours with a clear scope and no-surprise proposal.</p>
            {[{ k: "name", l: "Full Name *", t: "text", p: "Deepu Kumar" }, { k: "email", l: "Work Email *", t: "email", p: "deepu@company.com" }, { k: "company", l: "Company / Project", t: "text", p: "KozonHQ" }].map(f => (
              <div key={f.k} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: tk.textSub, marginBottom: 6, fontFamily: "'DM Mono',monospace", letterSpacing: "0.05em" }}>{f.l}</label>
                <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} style={inp} onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = tk.border} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: tk.textSub, marginBottom: 6, fontFamily: "'DM Mono',monospace", letterSpacing: "0.05em" }}>Tell us about your project</label>
              <textarea rows={3} placeholder="We need an automation workflow that..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ ...inp, resize: "vertical" }} onFocus={e => e.target.style.borderColor = BLUE} onBlur={e => e.target.style.borderColor = tk.border} />
            </div>
            <button onClick={submit} disabled={loading} style={{ width: "100%", padding: "13px 24px", borderRadius: 8, background: `linear-gradient(135deg,${BLUE},#2563eb)`, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, boxShadow: `0 4px 20px ${BLUE}35`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {loading ? "Sending..." : "Send Message →"}
            </button>
            <p style={{ marginTop: 10, fontSize: 11, color: tk.textMuted, textAlign: "center" }}>No spam. No retainers. Just a clear conversation.</p>
          </>
        )}
      </div>
    </div>
  );
}

// ── Legal Modal ──
function LegalModal({ open, page, onClose, tk }) {
  const isDark = tk.bg === DARK.bg;
  const c = LEGAL_CONTENT[page];
  if (!open || !c) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "60px 24px 40px", overflowY: "auto" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: isDark ? "#111113" : "#fff", border: `1px solid ${tk.border}`, borderRadius: 20, padding: "48px 40px", width: "100%", maxWidth: 620, boxShadow: "0 24px 80px rgba(0,0,0,0.25)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: tk.textMuted, fontSize: 20 }}>✕</button>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: BLUE, letterSpacing: "0.1em", textTransform: "uppercase" }}>// Legal</span>
        <h2 style={{ color: tk.text, fontWeight: 800, fontSize: 26, letterSpacing: "-0.02em", margin: "10px 0 16px" }}>{page}</h2>
        <p style={{ color: tk.textMuted, fontSize: 14, lineHeight: 1.7, marginBottom: 28, paddingBottom: 24, borderBottom: `1px solid ${tk.border}` }}>{c.intro}</p>
        {c.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 22 }}>
            <h4 style={{ color: tk.text, fontWeight: 700, fontSize: 14, marginBottom: 7 }}>{s.title}</h4>
            <p style={{ color: tk.textMuted, fontSize: 13, lineHeight: 1.75 }}>{s.body}</p>
          </div>
        ))}
        <p style={{ color: tk.textMuted, fontSize: 11, marginTop: 28, paddingTop: 20, borderTop: `1px solid ${tk.border}`, fontFamily: "'DM Mono',monospace" }}>
          Last updated: January 2026 · KozonHQ · SpringBoard 91, Sector 2, Noida, India
        </p>
      </div>
    </div>
  );
}

// ── Divider ──
function Divider({ tk }) {
  return <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}><div style={{ height: 1, background: `linear-gradient(to right,transparent,${tk.border},transparent)` }} /></div>;
}

// ── Main ──
export default function KozonHQ() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [legalPage, setLegalPage] = useState(null);
  const tk = dark ? DARK : LIGHT;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleAction = (action) => {
    if (!action) return;
    if (action === "booking") { setBookingOpen(true); setMenuOpen(false); }
    else if (action.startsWith("scroll:")) scrollTo(action.replace("scroll:", ""));
    else if (action.startsWith("legal:")) setLegalPage(action.replace("legal:", ""));
  };

  const LBtn = ({ style = {}, onClick, children }) => (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", ...style }}>{children}</button>
  );

  return (
    <div style={{ background: tk.bg, minHeight: "100vh", color: tk.text, fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", overflowX: "hidden", transition: "background 0.35s,color 0.35s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:rgba(59,130,246,0.25)}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(59,130,246,0.3);border-radius:4px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .kzn-stepper-d{display:flex!important}
        .kzn-stepper-m{display:none!important}
        .kzn-desktop-nav{display:flex!important}
        .kzn-mobile-nav{display:none!important}
        .kzn-footer-grid{grid-template-columns:2fr 1fr 1fr 1fr!important}
        @media(max-width:700px){
          .kzn-stepper-d{display:none!important}
          .kzn-stepper-m{display:flex!important}
          .kzn-desktop-nav{display:none!important}
          .kzn-mobile-nav{display:flex!important}
          .kzn-footer-grid{grid-template-columns:1fr 1fr!important}
          .kzn-hero-stats{gap:28px!important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 64, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? tk.navBg : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${tk.border}` : "none", transition: "all 0.4s" }}>
        {/* Logo */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${BLUE},${GREEN})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>K</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em", color: tk.text }}>
            Kozon<span style={{ color: BLUE }}>HQ</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="kzn-desktop-nav" style={{ alignItems: "center", gap: 4 }}>
          {NAV_LINKS.map(l => (
            <LBtn key={l.label} onClick={() => scrollTo(l.target)} style={{ padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: tk.textSub, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = tk.text; e.currentTarget.style.background = tk.border; }}
              onMouseLeave={e => { e.currentTarget.style.color = tk.textSub; e.currentTarget.style.background = "none"; }}
            >{l.label}</LBtn>
          ))}
          <button onClick={() => setDark(d => !d)} title="Toggle theme" style={{ marginLeft: 8, width: 36, height: 36, borderRadius: 8, border: `1px solid ${tk.border}`, background: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button onClick={() => setBookingOpen(true)} style={{ marginLeft: 6, padding: "9px 20px", borderRadius: 8, background: `linear-gradient(135deg,${BLUE},#2563eb)`, color: "#fff", border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: `0 4px 16px ${BLUE}35`, transition: "all 0.25s", fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${BLUE}45`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 16px ${BLUE}35`; }}
          >Book a Call →</button>
        </div>

        {/* Mobile nav controls */}
        <div className="kzn-mobile-nav" style={{ alignItems: "center", gap: 8 }}>
          <button onClick={() => setDark(d => !d)} style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${tk.border}`, background: "none", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button onClick={() => setMenuOpen(o => !o)} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${tk.border}`, background: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 16, height: 1.5, background: tk.textSub, borderRadius: 2, transition: "all 0.3s", transform: menuOpen && i === 0 ? "rotate(45deg) translate(3.5px,3.5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(3.5px,-3.5px)" : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />)}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown — only renders on mobile via CSS */}
      <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 199, background: tk.bgAlt, borderBottom: `1px solid ${tk.border}`, padding: menuOpen ? "16px 24px 20px" : "0 24px", maxHeight: menuOpen ? 280 : 0, overflow: "hidden", transition: "max-height 0.35s ease,padding 0.35s ease", boxShadow: menuOpen ? "0 8px 32px rgba(0,0,0,0.08)" : "none" }}>
        {NAV_LINKS.map(l => (
          <LBtn key={l.label} onClick={() => scrollTo(l.target)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0", fontSize: 15, fontWeight: 600, color: tk.text, borderBottom: `1px solid ${tk.border}` }}>
            {l.label}
          </LBtn>
        ))}
        <button onClick={() => { setBookingOpen(true); setMenuOpen(false); }} style={{ marginTop: 14, width: "100%", padding: "12px 24px", borderRadius: 8, background: `linear-gradient(135deg,${BLUE},#2563eb)`, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Book a Call →
        </button>
      </div>

      {/* HERO */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`, backgroundSize: "56px 56px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", filter: "blur(130px)", background: tk.glow1, top: "5%", left: "10%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", filter: "blur(110px)", background: tk.glow2, bottom: "10%", right: "8%", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 800, padding: "0 24px", paddingTop: 80 }}>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.1s forwards" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 100, background: `${GREEN}12`, border: `1px solid ${GREEN}28`, fontSize: 11, fontWeight: 600, color: GREEN, fontFamily: "'DM Mono',monospace", letterSpacing: "0.06em" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "inline-block", animation: "pulse 2s infinite" }} />
              IT Agency & Product Studio · Noida, India
            </span>
          </div>
          <h1 style={{ marginTop: 28, fontSize: "clamp(34px,6.5vw,76px)", fontWeight: 800, lineHeight: 1.07, letterSpacing: "-0.04em", color: tk.text, opacity: 0, animation: "fadeUp 0.9s ease 0.25s forwards" }}>
            Engineering Velocity.{" "}
            <span style={{ background: `linear-gradient(135deg,${BLUE} 0%,${GREEN} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Automating Growth.</span>
          </h1>
          <p style={{ marginTop: 24, fontSize: "clamp(15px,2vw,18px)", color: tk.textMuted, lineHeight: 1.75, maxWidth: 560, margin: "24px auto 0", opacity: 0, animation: "fadeUp 0.9s ease 0.4s forwards" }}>
            From high-performance mobile apps to low-friction automation workflows, we build digital products that scale.
          </p>
          <div style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", opacity: 0, animation: "fadeUp 0.9s ease 0.55s forwards" }}>
            <button onClick={() => setBookingOpen(true)} style={{ padding: "13px 28px", borderRadius: 8, background: `linear-gradient(135deg,${BLUE},#2563eb)`, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: `0 4px 20px ${BLUE}35`, transition: "all 0.25s", fontFamily: "'Plus Jakarta Sans',sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >Start a Project →</button>
            <button onClick={() => scrollTo("product-lab")} style={{ padding: "13px 28px", borderRadius: 8, background: "none", color: tk.textSub, border: `1px solid ${tk.border}`, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.25s", fontFamily: "'Plus Jakarta Sans',sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.color = tk.text; e.currentTarget.style.borderColor = tk.textMuted; }}
              onMouseLeave={e => { e.currentTarget.style.color = tk.textSub; e.currentTarget.style.borderColor = tk.border; }}
            >View Product Lab</button>
          </div>
          <div className="kzn-hero-stats" style={{ marginTop: 72, display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap", opacity: 0, animation: "fadeUp 0.9s ease 0.7s forwards" }}>
            {[["50+", "Products Shipped"], ["99%", "Test Coverage"], ["3×", "Avg Growth"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, letterSpacing: "-0.03em", background: `linear-gradient(135deg,${tk.text},${tk.textSub})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{v}</div>
                <div style={{ fontSize: 11, color: tk.textMuted, marginTop: 4, fontFamily: "'DM Mono',monospace", letterSpacing: "0.07em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: 0, animation: "fadeUp 1s ease 1.1s forwards" }}>
          <div style={{ fontSize: 11, color: tk.textMuted, fontFamily: "'DM Mono',monospace", letterSpacing: "0.1em", marginBottom: 8 }}>SCROLL</div>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom,${BLUE}55,transparent)`, margin: "0 auto" }} />
        </div>
      </section>

      <Divider tk={tk} />

      {/* PRODUCT LAB */}
      <section id="product-lab" style={{ padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE }}>// Product Lab</span>
          <h2 style={{ marginTop: 16, fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, color: tk.text }}>Tools built with one rule.<br /><span style={{ color: tk.textMuted }}>Solve one problem perfectly.</span></h2>
          <p style={{ marginTop: 16, color: tk.textMuted, fontSize: 15, maxWidth: 480, lineHeight: 1.75 }}>We don't build feature-bloated platforms. Every product solves a single, focused problem — elegantly and completely.</p>
        </FadeIn>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
          {BENTO.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Card tk={tk} accent={c.accent} style={{ padding: "32px 28px", height: "100%" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.accent}14`, border: `1px solid ${c.accent}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: tk.text }}>{c.title}</h3>
                <p style={{ fontSize: 13.5, color: tk.textMuted, lineHeight: 1.7 }}>{c.desc}</p>
                <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.accent, animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 11, color: c.accent, fontFamily: "'DM Mono',monospace", fontWeight: 500 }}>LIVE IN LAB</span>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider tk={tk} />

      {/* SERVICES */}
      <section id="services" style={{ padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE }}>// Agency Services</span>
          <h2 style={{ marginTop: 16, fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, color: tk.text }}>We build. We test.<br /><span style={{ color: tk.textMuted }}>We automate the rest.</span></h2>
        </FadeIn>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <Card tk={tk} accent={s.accent} style={{ padding: "36px 32px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, fontWeight: 500, color: s.accent }}>{s.num}</span>
                  {s.badge && <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 100, background: `${GREEN}12`, border: `1px solid ${GREEN}28`, color: GREEN, fontFamily: "'DM Mono',monospace" }}>{s.badge}</span>}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 14, color: tk.text }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: tk.textMuted, lineHeight: 1.7, flex: 1 }}>{s.desc}</p>
                <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.tags.map(t => <span key={t} style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 500, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", border: `1px solid ${tk.border}`, color: tk.textMuted, fontFamily: "'DM Mono',monospace" }}>{t}</span>)}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider tk={tk} />

      {/* PROCESS */}
      <section id="process" style={{ padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE }}>// The QA-First Process</span>
          <h2 style={{ marginTop: 16, fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, color: tk.text }}>Quality isn't a step.<br /><span style={{ color: tk.textMuted }}>It's the architecture.</span></h2>
          <p style={{ marginTop: 16, color: tk.textMuted, fontSize: 15, maxWidth: 480, lineHeight: 1.75 }}>Every engagement follows a process where testing is designed from day one — not bolted on at the end.</p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Card tk={tk} style={{ marginTop: 56, padding: "48px 36px" }}>
            <Stepper tk={tk} />
          </Card>
        </FadeIn>
      </section>

      <Divider tk={tk} />

      {/* SITEMAP */}
      <section id="sitemap" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: GREEN }}>// Site Map</span>
          <h2 style={{ marginTop: 16, fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", color: tk.text }}>Everything KozonHQ.</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {SITEMAP_COLS.map((col, i) => (
              <Card key={i} tk={tk} style={{ padding: "28px 24px" }}>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 600, color: col.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{col.section}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(l => (
                    <button key={l.label} onClick={() => handleAction(l.action)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, color: tk.textSub, fontFamily: "'Plus Jakarta Sans',sans-serif", display: "flex", alignItems: "center", gap: 8, transition: "color 0.2s", padding: 0 }}
                      onMouseEnter={e => e.currentTarget.style.color = col.color}
                      onMouseLeave={e => e.currentTarget.style.color = tk.textSub}
                    >
                      <span style={{ color: tk.border, fontSize: 10 }}>→</span>{l.label}
                    </button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 120px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ borderRadius: 20, padding: "64px 48px", textAlign: "center", background: `linear-gradient(135deg,${BLUE}0d,${GREEN}0a)`, border: `1px solid ${BLUE}28`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: `${BLUE}08`, filter: "blur(80px)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: BLUE, letterSpacing: "0.12em", textTransform: "uppercase" }}>Ready to build?</span>
              <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", marginTop: 12, marginBottom: 14, color: tk.text }}>Let's ship something precise.</h2>
              <p style={{ color: tk.textMuted, fontSize: 15, maxWidth: 420, margin: "0 auto 36px", lineHeight: 1.7 }}>"Book a Call" and we'll scope your project within 48 hours. No retainers, no surprises.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setBookingOpen(true)} style={{ padding: "14px 32px", borderRadius: 8, background: `linear-gradient(135deg,${BLUE},#2563eb)`, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: `0 4px 20px ${BLUE}35`, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Book a Call →</button>
                <button onClick={() => scrollTo("services")} style={{ padding: "14px 32px", borderRadius: 8, background: "none", color: tk.textSub, border: `1px solid ${tk.border}`, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>View Services</button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a0b", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px 40px" }}>
          <div className="kzn-footer-grid" style={{ display: "grid", gap: 48, marginBottom: 60 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${BLUE},${GREEN})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>K</span>
                </div>
                <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em", color: "#fff" }}>Kozon<span style={{ color: BLUE }}>HQ</span></span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.75, maxWidth: 260, marginBottom: 18 }}>
                Engineering Velocity. Automating Growth.<br />Building digital products that scale — one focused tool at a time.
              </p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, fontFamily: "'DM Mono',monospace", lineHeight: 1.7 }}>SpringBoard 91, Sector 2<br />Noida, Uttar Pradesh, India</p>
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 700, textDecoration: "none", fontFamily: "'DM Mono',monospace", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE; e.currentTarget.style.background = `${BLUE}12`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.background = "none"; }}
                  >{s.icon}</a>
                ))}
              </div>
            </div>
            {/* Company */}
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 20 }}>Company</p>
              {[{ label: "Home", action: "scroll:home" }, { label: "Product Lab", action: "scroll:product-lab" }, { label: "Services", action: "scroll:services" }, { label: "Process", action: "scroll:process" }, { label: "Book a Call", action: "booking" }].map(l => (
                <button key={l.label} onClick={() => handleAction(l.action)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: 13, cursor: "pointer", marginBottom: 12, padding: 0, textAlign: "left", fontFamily: "'Plus Jakarta Sans',sans-serif", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
                >{l.label}</button>
              ))}
            </div>
            {/* Legal */}
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 20 }}>Legal</p>
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"].map(l => (
                <button key={l} onClick={() => setLegalPage(l)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: 13, cursor: "pointer", marginBottom: 12, padding: 0, textAlign: "left", fontFamily: "'Plus Jakarta Sans',sans-serif", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
                >{l}</button>
              ))}
            </div>
            {/* Contact */}
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 20 }}>Get in Touch</p>
              <a href="mailto:hello@kozonhq.com" style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 14, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = BLUE}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
              >hello@kozonhq.com</a>
              <button onClick={() => setBookingOpen(true)} style={{ padding: "9px 18px", borderRadius: 8, background: `linear-gradient(135deg,${BLUE},#2563eb)`, color: "#fff", border: "none", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Book a Call →
              </button>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, marginTop: 18, fontFamily: "'DM Mono',monospace", lineHeight: 1.7 }}>Response within 48hrs.<br />No spam. No retainers.</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, fontFamily: "'DM Mono',monospace" }}>© 2026 KozonHQ. All rights reserved.</p>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, fontFamily: "'DM Mono',monospace" }}>Built by <span style={{ color: BLUE }}>KozonHQ</span> · Noida, India</p>
          </div>
        </div>
      </footer>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} tk={tk} />
      <LegalModal open={!!legalPage} page={legalPage} onClose={() => setLegalPage(null)} tk={tk} />
    </div>
  );
}
