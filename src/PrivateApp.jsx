import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";

const TERMS_URL = "/terms";
const PRIVACY_URL = "/privacy";

const renderLinkedTerms = (text, lang, termsUrl, privacyUrl) => {
  const map = {
    en: { terms: "Terms & Conditions", privacy: "Privacy Policy" },
    fr: { terms: "Conditions Générales", privacy: "Politique de Confidentialité" },
    es: { terms: "Términos y Condiciones", privacy: "Política de Privacidad" },
    de: { terms: "Allgemeinen Geschäftsbedingungen", privacy: "Datenschutzerklärung" },
    it: { terms: "Termini e Condizioni", privacy: "Informativa sulla Privacy" },
    pt: { terms: "Termos e Condições", privacy: "Política de Privacidade" },
    ar: { terms: "الشروط والأحكام", privacy: "سياسة الخصوصية" },
    ru: { terms: "Условиями использования", privacy: "Политикой конфиденциальности" },
    zh: { terms: "条款与条件", privacy: "隐私政策" },
    hi: { terms: "नियम और शर्तें", privacy: "गोपनीयता नीति" },
    ja: { terms: "利用規約", privacy: "個人情報保護方針" }
  };
  const config = map[lang] || map.en;
  const idxTerms = text.indexOf(config.terms);
  const idxPrivacy = text.indexOf(config.privacy);
  if (idxTerms === -1 || idxPrivacy === -1) return text;
  const first = idxTerms < idxPrivacy ? { type: "terms", text: config.terms, url: termsUrl, start: idxTerms } : { type: "privacy", text: config.privacy, url: privacyUrl, start: idxPrivacy };
  const second = idxTerms < idxPrivacy ? { type: "privacy", text: config.privacy, url: privacyUrl, start: idxPrivacy } : { type: "terms", text: config.terms, url: termsUrl, start: idxTerms };
  const linkStyle = { color: "#c9a84c", textDecoration: "underline", cursor: "pointer" };
  return (
    <span>
      {text.substring(0, first.start)}
      <a href={first.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>{first.text}</a>
      {text.substring(first.start + first.text.length, second.start)}
      <a href={second.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>{second.text}</a>
      {text.substring(second.start + second.text.length)}
    </span>
  );
};
// ─── Design Tokens 
// ───────────────────────────────────────────
// ──────────────
const C = {
  teal900: "#0d3d40", teal800: "#16585d", teal700: "#1e6e74",
  teal600: "#27848b", teal500: "#2e9aa2", teal400: "#4ab3ba",
  teal300: "#7dcdd3", teal200: "#b2e4e7", teal100: "#ddf2f4",
  teal50: "#f0fafb",
  gold: "#c9a84c", goldLt: "#e8c87a",
  cream: "#faf8f4", dark: "#0a1f21",
  muted: "#6b8c8e", border: "#d4e8ea",
  bg: "#f5f8f8", white: "#ffffff",
  red: "#e05252", green: "#3aaa6e", amber: "#e5a44a",
};
const ff = { serif: "'Playfair Display', Georgia, serif", sans: "'Inter', system-ui, sans-serif" };
// ─── Fonts 
// ───────────────────────────────────────────
// ───────────────────────
const FontAndCursorLoader = () => {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(l);

    const fav = document.querySelector("link[rel*='icon']") || document.createElement("link");
    fav.type = "image/png";
    fav.rel = "shortcut icon";
    fav.href = "/favicon.png";
    document.getElementsByTagName("head")[0].appendChild(fav);
  }, []);
  return (
    <style>{`
      body {
        margin: 0;
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='5.5' fill='%2327848b'/%3E%3Ccircle cx='32' cy='32' r='14' fill='none' stroke='white' stroke-width='2.5' stroke-opacity='0.4'/%3E%3Ccircle cx='32' cy='32' r='14' fill='none' stroke='%2327848b' stroke-width='1.2' stroke-opacity='0.8'/%3E%3C/svg%3E") 32 32, auto;
        font-size: 15px;
        line-height: 1.8;
      }
      a, button, select, input, textarea, [role="button"], option {
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='7.5' fill='%2327848b'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='white' stroke-width='3.5' stroke-opacity='0.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%23c9a84c' stroke-width='2' stroke-opacity='0.95'/%3E%3C/svg%3E") 32 32, pointer;
      }
      .rtl-wrapper {
        direction: rtl;
        text-align: right;
      }
      .ltr-wrapper {
        direction: ltr;
        text-align: left;
      }
    `}</style>
  );
};
// ─── Shared UI Atoms 
// ───────────────────────────────────────────
// ─────────────
const Btn = ({ children, variant = "primary", onClick, style = {}, size = "md", disabled = false }) => {
  const [hov, setHov] = useState(false);
  const base = {
    fontFamily: ff.sans, fontWeight: 500, border: "none", cursor: disabled ? "not-allowed" :
      "pointer",
    borderRadius: 5, transition: "all 0.18s", letterSpacing: "0.03em", display: "inline-flex",
    alignItems: "center", gap: 6, opacity: disabled ? 0.55 : 1,
    padding: size === "sm" ? "6px 14px" : size === "lg" ? "14px 32px" : "9px 20px",
    fontSize: size === "sm" ? 12 : size === "lg" ? 14 : 13,
  };
  const variants = {
    primary: { background: hov ? C.teal800 : C.teal700, color: "#fff" },
    gold: { background: hov ? C.goldLt : C.gold, color: C.dark },
    ghost: {
      background: hov ? C.teal100 : "transparent", color: C.teal700, border: `1px solid $
{C.border}` },
    danger: { background: hov ? "#c94444" : C.red, color: "#fff" },
    outline: { background: "transparent", color: C.teal700, border: `1px solid ${C.teal400}` },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  );


};
const Badge = ({ children, color = "teal" }) => {
  const map = {
    teal: { bg: C.teal100, text: C.teal700 },
    gold: { bg: "#f5eccf", text: "#8a6a1a" },
    green: { bg: "#d4f0e2", text: "#1e7a4a" },
    amber: { bg: "#fdefd4", text: "#8a5c10" },
    red: { bg: "#fde4e4", text: "#943535" },
    muted: { bg: "#eaf0f1", text: C.muted },
  };
  const s = map[color] || map.teal;
  return (
    <span style={{
      background: s.bg, color: s.text, fontSize: 10, fontWeight: 600, padding: "3px  8px",
      borderRadius: 3, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: ff.sans
    }}>
      {children}
    </span>
  );
};
const Card = ({ children, style = {}, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white,
        border: hov ? `1px solid ${C.gold}` : `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "1.5rem",
        boxShadow: hov
          ? "0 10px 35px rgba(13, 61, 64, 0.08), 0 2px 10px rgba(13, 61, 64, 0.02)"
          : "0 4px 20px rgba(13, 61, 64, 0.02), 0 1px 3px rgba(13, 61, 64, 0.01)",
        cursor: onClick ? "pointer" : "default",
        transform: hov && onClick ? "translateY(-3px)" : "none",
        transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
const Input = ({ label, type = "text", value, onChange, placeholder, icon }) => (
  <div style={{ marginBottom: "1rem" }}>
    {label && <label style={{
      display: "block", fontSize: 12, fontWeight: 500, color: C.teal800,
      marginBottom: 5, fontFamily: ff.sans
    }}>{label}</label>}
    <div style={{ position: "relative" }}>
      {icon && <span style={{
        position: "absolute", left: 14, top: "50%", transform:
          "translateY(-50%)",
        fontSize: 15, color: C.muted
      }}>{icon}</span>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          width: "100%", padding: icon ? "15px 16px 15px 42px" : "15px 16px",
          border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13,
          fontFamily: ff.sans, color: C.dark, background: C.white, outline: "none",
          boxSizing: "border-box", transition: "border-color 0.2s"
        }}
        onFocus={e => (e.target.style.borderColor = C.teal500)}
        onBlur={e => (e.target.style.borderColor = C.border)} />
    </div>
  </div>
);
const Select = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: "1rem" }}>
    {label && <label style={{
      display: "block", fontSize: 12, fontWeight: 500,
      color: C.teal800, marginBottom: 5, fontFamily: ff.sans
    }}>{label}</label>}
    <select value={value} onChange={onChange} style={{
      width: "100%", padding: "15px 16px",
      border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, fontFamily: ff.sans,
      color: C.dark, background: C.white, outline: "none", cursor: "pointer"
    }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);
const Avatar = ({ name, size = 36, color = C.teal700 }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: color,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: size * 0.35, fontWeight: 600, fontFamily: ff.sans,
      flexShrink: 0, letterSpacing: "0.04em"
    }}>
      {initials}
    </div>
  );
};
const Divider = ({ style = {} }) => (
  <div style={{ height: 1, background: C.border, margin: "1rem 0", ...style }} />
);
const StatCard = ({ label, value, sub, accent = false }) => (
  <Card>
    <div style={{
      fontSize: 11, fontWeight: 500, color: C.muted, letterSpacing: "0.08em",
      textTransform: "uppercase", marginBottom: 8, fontFamily: ff.sans
    }}>{label}</div>
    <div style={{
      fontFamily: ff.serif, fontSize: "2rem", fontWeight: 400,
      color: accent ? C.teal700 : C.dark, lineHeight: 1
    }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: C.muted, marginTop: 6, fontFamily: ff.sans }}>{sub}</div>}
  </Card>
);
// ─── Seed Data 
// ───────────────────────────────────────────
// ───────────────────
const MEMBERS = [
  {
    id: 1, name: "Meridian Capital Group", type: "Corporate", sector: "Financial Services", country:
      "United Kingdom", verified: true, tagline: "Global private equity & structured finance advisory",
    tags: ["M&A", "Structured Finance", "PE"], connected: false
  },
  {
    id: 2, name: "Nexus Legal Advisory", type: "Service Provider", sector: "Legal & Compliance",
    country: "Singapore", verified: true, tagline: "Cross-border regulatory compliance & corporate  law", tags: ["Compliance", "Regulatory", "Corporate Law"], connected: true
  },
  {
    id: 3, name: "Quantara Technologies", type: "Corporate", sector: "Technology", country:
      "United States", verified: true, tagline: "Enterprise AI and blockchain infrastructure solutions",
    tags: ["AI", "Blockchain", "SaaS"], connected: false
  },
  {
    id: 4, name: "Vantage Consulting Partners", type: "Service Provider", sector: "Consulting",
    country: "Germany", verified: true, tagline: "Strategic transformation & digital operations  advisory", tags: ["Consulting", "Digital Transformation"], connected: true
  },
  {
    id: 5, name: "Aureum Asset Management", type: "Corporate", sector: "Asset Management",
    country: "Switzerland", verified: true, tagline: "Tokenized asset portfolios and alternative  investments", tags: ["Tokenization", "Alternative Assets"], connected: false
  },
  {
    id: 6, name: "CipherShield Cybersecurity", type: "Service Provider", sector: "Cybersecurity",
    country: "Israel", verified: true, tagline: "Enterprise threat intelligence and security architecture",
    tags: ["Cybersecurity", "Risk Management"], connected: false
  },
  {
    id: 7, name: "Luminos Marketing Group", type: "Service Provider", sector: "Marketing",
    country: "France", verified: false, tagline: "B2B brand strategy and content for financial & tech  sectors", tags: ["Marketing", "Brand Strategy"], connected: false
  },


  {
    id: 8, name: "DataPrecision Analytics", type: "Corporate", sector: "Technology", country:
      "Netherlands", verified: true, tagline: "Real-time data intelligence and regulatory reporting", tags:
      ["Data Analytics", "AI", "Reporting"], connected: false
  },
];
const OPPORTUNITIES = [
  {
    id: 1, type: "RFP", titleKey: "portal.opp1_title", title: "Legal & Compliance Advisory — APAC Expansion", org: "Meridian Capital Group", sector: "Legal / Compliance", deadline: "2026-07-15", budget: "£80k–£150k",
    description: "We are seeking a qualified legal advisory firm with demonstrated experience in APAC regulatory environments to support our regional expansion strategy across Singapore, Hong Kong, and Japan.", tags: ["Legal", "Compliance", "APAC"], status: "Open", applicants: 4, descKey: "portal.opp1_desc"
  },
  {
    id: 2, type: "Partnership", titleKey: "portal.opp2_title", title: "Joint Venture — Tokenized Real Estate Fund", org: "Aureum Asset Management", sector: "Asset Management / Technology", deadline: "2026-07-30", budget: "Strategic", description: "Aureum is seeking a technology partner with blockchain infrastructure expertise to co-develop a tokenized real estate investment fund targeting European institutional investors.", tags: ["Tokenization", "Blockchain", "JV"], status: "Open", applicants: 7, descKey: "portal.opp2_desc"
  },
  {
    id: 3, type: "Mandate", titleKey: "portal.opp3_title", title: "Enterprise Cybersecurity Audit — 4 Entities", org: "Nexus Legal Advisory", sector: "Cybersecurity", deadline: "2026-07-10", budget: "€60k–€90k", description: "Seeking a cybersecurity firm to conduct a comprehensive security audit across four regulated entities ahead of upcoming regulatory review. NDA required.", tags: ["Cybersecurity", "Audit", "Regulated"], status: "Open", applicants: 2, descKey: "portal.opp3_desc"
  },
  {
    id: 4, type: "RFP", titleKey: "portal.opp4_title", title: "AI-Powered Due Diligence Platform", org: "Meridian Capital Group", sector: "Technology / AI", deadline: "2026-08-01", budget: "£200k+", description: "Looking for an AI technology provider to build or license a due diligence automation platform capable of processing large document sets with KYC and AML flagging.", tags: ["AI", "Due Diligence", "Fintech"], status: "Open", applicants: 9, descKey: "portal.opp4_desc"
  },
  {
    id: 5, type: "Distribution", titleKey: "portal.opp5_title", title: "European Distribution Partner — AI Research Reports", org: "DataPrecision Analytics", sector: "Research / Intelligence", deadline: "2026-08-15", budget: "Revenue Share", description: "DataPrecision is seeking a distribution partner with access to European institutional and corporate networks to commercialize our AI market research reports.", tags: ["Research", "Distribution", "AI"], status: "Open", applicants: 3, descKey: "portal.opp5_desc"
  },
];
const INTEL = [
  { id: 1, category: "Regulatory", titleKey: "portal.art1_title", title: "MiCA Compliance Deadline — What European Asset Managers Must Do Now", source: "EquusChain Intelligence", date: "June 17, 2026", readTime: "6 min", summaryKey: "portal.art1_summary", summary: "The Markets in Crypto-Assets regulation enters full enforcement in Q3 2026. We break down the key obligations for asset managers operating tokenized portfolios across EU member states.", tags: ["Regulation", "Tokenization", "EU"] },
  {
    id: 2, category: "Technology", titleKey: "portal.art2_title", title: "How Frontier AI Is Reshaping Enterprise Due Diligence in 2026", source: "EquusChain Intelligence", date: "June 15, 2026", readTime: "8 min", summaryKey: "portal.art2_summary", summary: "Large language models are now embedded in the due diligence workflows of leading private equity and M&A advisory firms. We examine what this means for service providers and corporate buyers.", tags: ["AI", "Due Diligence", "Technology"]
  },
  {
    id: 3, category: "Market Insight", titleKey: "portal.art3_title", title: "Cross-Border M&A Flows: Southeast Asia Leads Q2 Deal Activity", source: "EquusChain Intelligence", date: "June 12, 2026", readTime: "5 min", summaryKey: "portal.art3_summary", summary: "Southeast Asia accounted for a record share of cross-border M&A mandates in Q2 2026, driven by digital infrastructure consolidation and regional sovereign wealth fund activity.", tags: ["M&A", "APAC", "Deal Flow"]
  },
  {
    id: 4, category: "Innovation", titleKey: "portal.art4_title", title: "Tokenized Credit: From Pilot to Mainstream in 36 Months", source: "EquusChain Intelligence", date: "June 10, 2026", readTime: "7 min", summaryKey: "portal.art4_summary", summary: "Three years after the first institutional tokenized credit pilots, the market has reached an inflection point. Issuance volumes, investor adoption, and secondary market liquidity are all accelerating.", tags: ["Tokenization", "Credit", "Innovation"]
  },
  {
    id: 5, category: "Regulatory", titleKey: "portal.art5_title", title: "Singapore's Variable Capital Company: Updated Guidance for 2026", source: "EquusChain Intelligence", date: "June 8, 2026", readTime: "4 min", summaryKey: "portal.art5_summary", summary: "MAS has issued updated guidance on VCC structures, with significant implications for fund managers and corporate service providers operating in the region.", tags: ["Regulation", "Singapore", "Fund Structures"]
  },
];


const MESSAGES = [
  { id: 1, from: "Nexus Legal Advisory", previewKey: "portal.messages_preview1", preview: "Thank you for connecting — we'd be glad to discuss the APAC mandate in more detail.", time: "2h ago", unread: true },
  { id: 2, from: "Vantage Consulting Partners", previewKey: "portal.messages_preview2", preview: "Following up on our introduction — when would be a good time to connect?", time: "Yesterday", unread: true },
  { id: 3, from: "EquusChain Platform", previewKey: "portal.messages_preview3", preview: "Your profile has been verified. You now have full access to all member services.", time: "2 days ago", unread: false },
];
const ACTIVITY = [
  { type: "connection", name: "Nexus Legal Advisory", time: "2h ago", icon: "🤝" },
  { type: "opportunity", name: "AI-Powered Due Diligence Platform", time: "4h ago", icon: "📋" },
  { type: "intel", name: "MiCA Compliance Deadline", time: "Yesterday", icon: "📰" },
  { type: "view", count: 3, time: "Yesterday", icon: "👁" },
  { type: "message", name: "Vantage Consulting Partners", time: "2 days ago", icon: "✉" }
];
// ─── AUTH SCREEN 
// ───────────────────────────────────────────
// ──────────────────

// ─── Custom Language Dropdown (Styled after Reference Image)
const LanguageDropdown = ({ currentLang, onLangChange, dark = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "it", name: "Italiano" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "pt", name: "Portuguese" },
    { code: "ar", name: "Arabic (RTL)" },
    { code: "ru", name: "Русский" },
    { code: "zh", name: "中文" },
    { code: "hi", name: "हिन्दी" },
    { code: "ja", name: "日本語" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLang = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "transparent",
          border: `1.5px solid ${C.gold}`,
          color: dark ? "#fff" : C.teal800,
          fontSize: 13,
          fontWeight: 600,
          padding: "0 16px",
          height: 42,
          boxSizing: "border-box",
          borderRadius: 6,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: ff.sans,
          textTransform: "uppercase",
          outline: "none",
          transition: "all 0.2s"
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{activeLang.code}</span>
        <span style={{ fontSize: 9 }}>▼</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: 8,
            background: "#faf8f4",
            border: `1.5px solid ${C.gold}`,
            borderRadius: 6,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            zIndex: 1000,
            minWidth: 180,
            overflow: "hidden",
            padding: "6px 0"
          }}
        >
          {languages.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onLangChange(lang.code);
                  setIsOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 20px",
                  border: "none",
                  background: isSelected ? "rgba(201, 168, 76, 0.08)" : "transparent",
                  color: isSelected ? C.gold : C.teal900,
                  fontSize: 14,
                  fontWeight: isSelected ? 600 : 400,
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: ff.sans,
                  transition: "all 0.15s"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(201, 168, 76, 0.12)";
                  e.target.style.color = C.gold;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = isSelected ? "rgba(201, 168, 76, 0.08)" : "transparent";
                  e.target.style.color = isSelected ? C.gold : C.teal900;
                }}
              >
                {lang.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const AuthScreen = ({ onLogin, currentLang, onLangChange }) => {
  const { t, i18n } = useTranslation();
  const [mode, setMode] = useState("signin");
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "", password: "", orgName: "", orgType: "Corporate",
    sector: "Financial Services", country: "", firstName: "", lastName: "",
    newsletter: false, terms: false
  });

  const f = k => e => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(p => ({ ...p, [k]: val }));
  };

  const orgTypes = [
    { value: "Corporate", label: "Corporate Entity" },
    { value: "Sovereign", label: "Sovereign / Institutional" },
    { value: "Advisor", label: "Professional Advisory Firm" },
    { value: "Provider", label: "Specialist Service Provider" }
  ];

  const sectors = [
    { value: "Financial Services", label: "Financial Services / Private Equity" },
    { value: "Legal", label: "Legal & Compliance" },
    { value: "Technology", label: "Technology / AI" },
    { value: "Consulting", label: "Management Consulting" }
  ];

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!form.terms) return;
    setSubmitting(true);
    try {
      const res = await fetch("/mail_handler.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "membership", ...form })
      });
      const data = await res.json();
      if (data.success) {
        onLogin({ name: form.firstName || "Member", org: form.orgName || "Your Organisation" });
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      onLogin({ name: form.firstName || "Member", org: form.orgName || "Your Organisation" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", minHeight: "100vh" }}>
      {/* Left panel */}
      <div style={{
        background: C.teal900, display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: "4rem 3rem", position: "relative", overflow: "hidden"
      }}>
        {[480, 320, 180].map((sz, i) => (
          <div key={i} style={{
            position: "absolute", right: -sz * 0.6, top: -sz * 0.2,
            width: sz, height: sz, borderRadius: "50%",
            border: `1px solid rgba(255,255,255,${0.05 - i * 0.01})`, pointerEvents: "none"
          }} />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/logo.png"
            alt="The Corporate Hub Logo"
            style={{
              height: 70,
              width: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)"
            }}
          />
        </div>
        <div>
          <p style={{
            fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
            color: C.gold, marginBottom: 16, display: "flex", alignItems: "center", gap: 8
          }}>
            <span style={{ display: "block", width: 24, height: 1.5, background: C.gold }} />
            {t("portal.member_platform")}
          </p>
          <h2 style={{
            fontFamily: ff.serif, fontSize: "2.5rem", fontWeight: 400, color: "#fff",
            lineHeight: 1.25, marginBottom: "1.5rem"
          }}>
            {t("portal.hero_title_part1")}<br />
            {t("portal.hero_title_part2")}<br />
            <em style={{ color: C.teal300, fontStyle: "italic" }}>{t("portal.hero_title_part3")}</em>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 420, fontWeight: 300, margin: 0 }}>
            {t("portal.hero_subtitle")}
          </p>
        </div>

        {/* Footnote disclaimer info */}
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: ff.sans, margin: 0 }}>
          &copy; 2026 The Corporate Hub. All rights reserved.
        </p>
      </div>

      {/* Right panel — form */}
      <div style={{
        background: C.cream, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "3rem 2rem", position: "relative"
      }}>
        {/* Floating Language Dropdown Top Right */}
        <div style={{ position: "absolute", right: "2rem", top: "2rem", zIndex: 100 }}>
          <LanguageDropdown currentLang={currentLang} onLangChange={onLangChange} dark={false} />
        </div>

        <div style={{ width: "100%", maxWidth: 440 }}>

          {/* Tab Panel */}
          <div style={{ display: "flex", gap: 0, background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden", height: 42, marginBottom: "2rem" }}>
            {["Sign In", "Register"].map(t_item => (
              <button key={t_item} onClick={() => { setMode(t_item === "Sign In" ? "signin" : "register"); setStep(1); }}
                style={{
                  flex: 1, height: "100%", border: "none", cursor: "pointer", fontFamily: ff.sans,
                  fontSize: 14, fontWeight: 500, transition: "all 0.2s",
                  background: (t_item === "Sign In" && mode === "signin") || (t_item === "Register" && mode === "register") ? C.teal700 : "transparent",
                  color: (t_item === "Sign In" && mode === "signin") || (t_item === "Register" && mode === "register") ? "#fff" : C.muted
                }}>
                {t_item === "Sign In" ? t("portal.signin") : t("portal.register")}
              </button>
            ))}
          </div>

          {mode === "signin" ? (
            <div>
              <h3 style={{ fontFamily: ff.serif, fontSize: "1.75rem", fontWeight: 400, color: C.teal900, marginBottom: "0.25rem" }}>
                {t("portal.welcome")}
              </h3>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: "2rem" }}>{t("portal.signin_desc")}</p>
              <Input label={t("portal.email")} type="email" value={form.email} onChange={f("email")} placeholder="you@organisation.com" />
              <Input label={t("portal.password")} type="password" value={form.password} onChange={f("password")} placeholder="••••••••" />

              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.75rem" }}>
                <span style={{ fontSize: 13, color: C.teal600, cursor: "pointer" }}>{t("portal.forgot")}</span>
              </div>

              <Btn variant="primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }} size="lg"
                onClick={() => onLogin({ name: form.email ? form.email.split("@")[0] : "Member", org: "Your Organisation" })}>
                {t("portal.signin")}
              </Btn>

              <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
                <span style={{ fontSize: 13, color: C.muted }}>{t("portal.demoTip")}</span>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.75rem" }}>
                {[1, 2].map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600,
                      background: step >= s ? C.teal700 : C.border, color: step >= s ? "#fff" : C.muted
                    }}>
                      {s}
                    </div>
                    <span style={{ fontSize: 13, color: step === s ? C.teal700 : C.muted }}>
                      {s === 1 ? t("portal.stepOrg") : t("portal.stepContact")}
                    </span>
                    {s < 2 && <div style={{ width: 28, height: 1, background: C.border }} />}
                  </div>
                ))}
              </div>

              {step === 1 ? (
                <div>
                  <h3 style={{ fontFamily: ff.serif, fontSize: "1.75rem", fontWeight: 400, color: C.teal900, marginBottom: "0.25rem" }}>
                    {t("portal.apply_title")}
                  </h3>
                  <p style={{ fontSize: 14, color: C.muted, marginBottom: "1.75rem" }}>{t("portal.org_desc")}</p>

                  <Input label={t("portal.orgName")} value={form.orgName} onChange={f("orgName")} placeholder="Acme Corporation Ltd" />
                  <Select label={t("portal.orgType")} value={form.orgType} onChange={f("orgType")} options={orgTypes} />
                  <Select label={t("portal.sector")} value={form.sector} onChange={f("sector")} options={sectors} />
                  <Input label={t("portal.country")} value={form.country} onChange={f("country")} placeholder="United Kingdom" />

                  <Btn variant="primary" style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: "1rem" }} size="lg"
                    onClick={() => { if (form.orgName && form.country) setStep(2); }}>
                    {t("portal.continue")}
                  </Btn>
                </div>
              ) : (
                <div>
                  <h3 style={{ fontFamily: ff.serif, fontSize: "1.75rem", fontWeight: 400, color: C.teal900, marginBottom: "0.25rem" }}>
                    {t("portal.contact_title")}
                  </h3>
                  <p style={{ fontSize: 14, color: C.muted, marginBottom: "1.75rem" }}>{t("portal.account_desc")}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                    <Input label={t("portal.firstName")} value={form.firstName} onChange={f("firstName")} placeholder="Alexandra" />
                    <Input label={t("portal.lastName")} value={form.lastName} onChange={f("lastName")} placeholder="Chen" />
                  </div>
                  <Input label={t("portal.workEmail")} type="email" value={form.email} onChange={f("email")} placeholder="a.chen@acmecorp.com" />
                  <Input label={t("portal.createPassword")} type="password" value={form.password} onChange={f("password")} placeholder="Min. 12 characters" />

                  {/* Guidelines checkboxes */}
                  <div style={{ margin: "14px 0", display: "flex", flexDirection: "column", gap: 10 }}>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 12, color: C.muted }}>
                      <input type="checkbox" checked={form.newsletter} onChange={f("newsletter")} />
                      <span>{t("modal.newsletter")}</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 12, color: C.muted }}>
                      <input type="checkbox" checked={form.terms} onChange={f("terms")} required />
                      <span>{renderLinkedTerms(t("modal.terms"), i18n.language || "en", TERMS_URL, PRIVACY_URL)}</span>
                    </label>
                  </div>

                  <p style={{ fontSize: 12, color: C.muted, marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    {t("portal.termsNote")}
                  </p>

                  <div style={{ display: "flex", gap: 12 }}>
                    <Btn variant="ghost" onClick={() => setStep(1)} style={{ padding: "12px 20px" }}>{t("portal.back")}</Btn>
                    <Btn variant="gold" style={{ flex: 1, justifyContent: "center", padding: "12px" }} size="lg"
                      disabled={submitting || !form.terms}
                      onClick={handleRegisterSubmit}>
                      {submitting ? "Submitting..." : t("portal.submit")}
                    </Btn>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NAV_ITEMS = [
  { id: "dashboard", icon: "❖", label: "portal.dashboard" },
  { id: "directory", icon: "☲", label: "portal.network" },
  { id: "opportunities", icon: "✦", label: "portal.opportunities" },
  { id: "courses", icon: "◈", label: "portal.courses" },
  { id: "intelligence", icon: "⧉", label: "portal.intelligence" },
  { id: "messages", icon: "✉", label: "portal.messages", badge: 2 },
  { id: "profile", icon: "⍜", label: "portal.profile" },
];

const SidebarBtn = ({ item, active, collapsed, onNav, t }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={() => onNav(item.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        padding: "12px 14px",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontFamily: ff.sans,
        fontSize: 14,
        fontWeight: active === item.id ? 600 : 400,
        background: active === item.id
          ? "rgba(201, 168, 76, 0.12)"
          : hov
            ? "rgba(255, 255, 255, 0.04)"
            : "transparent",
        color: active === item.id
          ? C.gold
          : hov
            ? "#fff"
            : "rgba(255, 255, 255, 0.65)",
        borderLeft: active === item.id ? `3px solid ${C.gold}` : "3px solid transparent",
        justifyContent: collapsed ? "center" : "flex-start",
        transition: "all 0.18s ease",
        outline: "none",
        boxSizing: "border-box"
      }}
    >
      <span style={{
        fontSize: 16,
        width: 20,
        textAlign: "center",
        color: active === item.id ? C.gold : hov ? "#fff" : "rgba(255,255,255,0.6)",
        transition: "color 0.18s"
      }}>
        {item.icon}
      </span>
      {!collapsed && <span style={{ flex: 1, textAlign: "left" }}>{t(item.label)}</span>}
      {!collapsed && item.badge && (
        <span style={{
          background: C.gold,
          color: C.dark,
          fontSize: 10,
          fontWeight: 700,
          padding: "2px 6px",
          borderRadius: 10
        }}>{item.badge}</span>
      )}
    </button>
  );
};

const Sidebar = ({ active, onNav, user, onLogout, collapsed, setCollapsed, isMobile, open, onClose }) => {
  const { t } = useTranslation();

  return (
    <>
      {isMobile && open && (
        <div onClick={onClose} style={{
          position: "fixed", inset: 0, background: "rgba(10,31,33,0.45)", zIndex: 999,
          backdropFilter: "blur(4px)", transition: "opacity 0.3s ease"
        }} />
      )}
      <aside style={{
        width: isMobile ? 240 : (collapsed ? 70 : 240),
        background: "linear-gradient(180deg, #092123 0%, #0d3d40 100%)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: isMobile ? "transform 0.3s ease" : "width 0.25s ease",
        flexShrink: 0,
        position: isMobile ? "fixed" : "sticky",
        left: isMobile ? 0 : "auto",
        top: 0,
        transform: isMobile ? (open ? "translateX(0)" : "translateX(-100%)") : "none",
        zIndex: isMobile ? 1000 : 10,
        boxShadow: "4px 0 25px rgba(0, 0, 0, 0.15)",
        overflow: "hidden"
      }}>
        {/* Logo */}
        <div style={{
          padding: (isMobile || !collapsed) ? "1.5rem" : "1.5rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: (isMobile || !collapsed) ? "flex-start" : "center",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          cursor: "pointer"
        }} onClick={() => { onNav("dashboard"); if (isMobile) onClose(); }}>
          {(isMobile || !collapsed) ? (
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                height: 88,
                width: "auto",
                objectFit: "contain",
                filter: "brightness(0) invert(1)"
              }}
            />
          ) : (
            <img src="/emblem.jpg" alt="Logo" style={{ height: 32, width: 32, objectFit: "cover", borderRadius: "50%" }} />
          )}
        </div>

        {/* Toggle */}
        {!isMobile && (
          <button onClick={() => setCollapsed(c => !c)}
            style={{
              position: "absolute",
              right: -12,
              top: 76,
              width: 24,
              height: 24,
              background: C.teal700,
              border: `1px solid ${C.teal600}`,
              borderRadius: "50%",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              cursor: "pointer",
              outline: "none",
              zIndex: 12,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
            }}>
            {collapsed ? "→" : "←"}
          </button>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: "1.5rem 0.75rem", display: "flex", flexDirection: "column", gap: 6 }}>
          {NAV_ITEMS.map((item) => (
            <SidebarBtn
              key={item.id}
              item={item}
              active={active}
              collapsed={isMobile ? false : collapsed}
              onNav={(id) => { onNav(id); if (isMobile) onClose(); }}
              t={t}
            />
          ))}
        </nav>

        {/* User */}
        <div style={{
          padding: (isMobile || !collapsed) ? "1.5rem 1.5rem" : "1.5rem 0",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          justifyContent: (isMobile || !collapsed) ? "flex-start" : "center"
        }}>
          <Avatar name={user.name === "Member" || !user.name ? t("portal.default_member") : user.name} size={34} color={C.teal600} />
          {(isMobile || !collapsed) && (
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}>{user.name === "Member" || !user.name ? t("portal.default_member") : user.name}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                {user.org === "Your Organisation" || !user.org ? t("portal.default_org") : user.org}
              </div>
            </div>
          )}
          {(isMobile || !collapsed) && (
            <button onClick={onLogout} title={t("portal.signOut")}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                fontSize: 18,
                padding: 2,
                transition: "color 0.15s"
              }}
              onMouseEnter={(e) => e.target.style.color = C.gold}
              onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.4)"}>
              &times;
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

const Topbar = ({ title, onNav, notifications = 2, currentLang, onLangChange, isMobile, onToggleSidebar }) => {
  const { t } = useTranslation();
  const [hovMsg, setHovMsg] = useState(false);
  const [hovProf, setHovProf] = useState(false);

  return (
    <div style={{
      height: 64,
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(13, 61, 64, 0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "0 1rem" : "0 2rem",
      flexShrink: 0,
      position: "sticky",
      top: 0,
      zIndex: 50
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {isMobile && (
          <button onClick={onToggleSidebar}
            style={{
              background: "none", border: "none", cursor: "pointer", fontSize: 22,
              color: C.teal900, padding: 4, display: "flex", alignItems: "center", outline: "none"
            }}>
            ☰
          </button>
        )}
        <h1 style={{
          fontFamily: ff.serif,
          fontSize: isMobile ? "1.2rem" : "1.45rem",
          fontWeight: 450,
          color: C.teal900,
          letterSpacing: "-0.01em",
          margin: 0
        }}>
          {t(title)}
        </h1>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Language Selector */}
        <LanguageDropdown currentLang={currentLang} onLangChange={onLangChange} dark={false} />

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => onNav("messages")}
            onMouseEnter={() => setHovMsg(true)}
            onMouseLeave={() => setHovMsg(false)}
            style={{
              background: hovMsg ? "rgba(13, 61, 64, 0.04)" : "transparent",
              border: `1px solid ${hovMsg ? C.gold : "rgba(13, 61, 64, 0.1)"}`,
              borderRadius: 8,
              width: 40,
              height: 40,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: hovMsg ? C.gold : C.teal800,
              transition: "all 0.2s ease",
              outline: "none"
            }}
          >
            ✉
          </button>
          {notifications > 0 && (
            <span style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 18,
              height: 18,
              background: C.gold,
              borderRadius: "50%",
              fontSize: 10,
              fontWeight: 700,
              color: C.dark,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
              {notifications}
            </span>
          )}
        </div>

        {/* Profile Avatar Button */}
        <div
          onClick={() => onNav("profile")}
          onMouseEnter={() => setHovProf(true)}
          onMouseLeave={() => setHovProf(false)}
          style={{
            width: 40,
            height: 40,
            background: hovProf ? C.teal800 : C.teal700,
            border: `2px solid ${hovProf ? C.gold : "transparent"}`,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxSizing: "border-box",
            boxShadow: "0 2px 6px rgba(13,61,64,0.08)"
          }}
        >
          {t("portal.profile").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "M"}
        </div>
      </div>
    </div>
  );
};

const QuickActionBtn = ({ label, desc, icon, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 8,
        border: "none",
        background: hov ? "rgba(201, 168, 76, 0.08)" : "transparent",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s ease",
        outline: "none"
      }}
    >
      <span style={{
        fontSize: 20,
        color: hov ? C.gold : C.teal800,
        transition: "color 0.2s"
      }}>{icon}</span>
      <div>
        <div style={{
          fontSize: 13,
          fontWeight: 600,
          color: hov ? C.gold : C.teal900,
          fontFamily: ff.sans,
          transition: "color 0.2s"
        }}>{label}</div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{desc}</div>
      </div>
    </button>
  );
};

const Dashboard = ({ user, onNav, isMobile }) => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: isMobile ? "1rem" : "2rem", fontFamily: ff.sans }}>
      {/* Welcome */}
      <div style={{
        background: `linear-gradient(135deg, ${C.teal900} 0%, ${C.teal800} 100%)`,
        borderLeft: `4px solid ${C.gold}`,
        borderRadius: 10,
        padding: isMobile ? "1.5rem" : "2.5rem 2rem",
        marginBottom: "1.5rem",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        boxShadow: "0 6px 20px rgba(13,61,64,0.12)",
        gap: isMobile ? 16 : 0
      }}>
        <div>
          <p style={{
            fontSize: 11,
            color: C.gold,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 8,
            fontWeight: 600
          }}>{t("portal.memberDashboard")}</p>
          <h2 style={{
            fontFamily: ff.serif,
            fontSize: isMobile ? "1.5rem" : "2rem",
            fontWeight: 400,
            color: "#fff",
            marginBottom: 8,
            letterSpacing: "-0.01em"
          }}>
            {t("portal.welcome")}, {user.name === "Member" || !user.name ? t("portal.default_member") : user.name}
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 300, margin: 0, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {user.org === "Your Organisation" || !user.org ? t("portal.default_org") : user.org} &bull; <Badge color="green">{t("portal.verifiedMember")}</Badge>
          </p>
        </div>
        <div style={{ textAlign: isMobile ? "left" : "right" }}>
          <Btn variant="gold" onClick={() => onNav("opportunities")} style={{ padding: "12px 28px", borderRadius: 6 }}>
            {t("portal.browseOpp")}
          </Btn>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: "1rem",
        marginBottom: "1.5rem"
      }}>
        <StatCard label={t("portal.stats_connections")} value="12" sub={t("portal.stats_connections_sub")} accent />
        <StatCard label={t("portal.stats_mandates")} value="5" sub={t("portal.stats_mandates_sub")} />
        <StatCard label={t("portal.stats_intel")} value="8" sub={t("portal.stats_intel_sub")} />
        <StatCard label={t("portal.stats_views")} value="24" sub={t("portal.stats_views_sub")} />
      </div>

      {/* Activity + Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 340px", gap: "1.5rem" }}>
        {/* Activity feed */}
        <Card>
          <div style={{ fontWeight: 600, color: C.teal900, marginBottom: "1.25rem", fontSize: 15, fontFamily: ff.sans }}>
            {t("portal.recentActivity")}
          </div>
          {ACTIVITY.map((a, i) => (
            <div key={i} style={{
              display: "flex",
              gap: 12,
              padding: "12px 0",
              borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${C.border}` : "none",
              alignItems: "flex-start"
            }}>
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: C.dark, margin: 0, lineHeight: 1.5 }}>
                  {a.type === "connection" ? t("portal.activity_connection", { name: a.name }) :
                    a.type === "opportunity" ? t("portal.activity_opportunity", { name: a.name }) :
                      a.type === "intel" ? t("portal.activity_intel", { name: a.name }) :
                        a.type === "view" ? t("portal.activity_view", { count: a.count }) :
                          a.type === "message" ? t("portal.activity_message", { name: a.name }) :
                            a.text}
                </p>
                <span style={{ fontSize: 11, color: C.muted, marginTop: 4, display: "inline-block" }}>{a.time}</span>
              </div>
            </div>
          ))}
        </Card>

        {/* Quick actions + messages */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Card>
            <div style={{ fontWeight: 600, color: C.teal900, marginBottom: "1.25rem", fontSize: 15, fontFamily: ff.sans }}>
              {t("portal.quickActions")}
            </div>
            {[
              {
                label: t("portal.findProviderTitle"),
                desc: t("portal.findProviderDesc"),
                nav: "directory",
                icon: "🔍"
              },
              {
                label: t("portal.postOppTitle"),
                desc: t("portal.postOppDesc"),
                nav: "opportunities",
                icon: "📋"
              },
              {
                label: t("portal.readIntelTitle"),
                desc: t("portal.readIntelDesc"),
                nav: "intelligence",
                icon: "📰"
              },
              {
                label: t("portal.expandNetworkTitle"),
                desc: t("portal.expandNetworkDesc"),
                nav: "directory",
                icon: "🔗"
              },
            ].map(a => (
              <QuickActionBtn
                key={a.label}
                label={a.label}
                desc={a.desc}
                icon={a.icon}
                onClick={() => onNav(a.nav)}
              />
            ))}
          </Card>

          <Card>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem"
            }}>
              <span style={{ fontWeight: 600, color: C.teal900, fontSize: 15, fontFamily: ff.sans }}>
                {t("portal.recentMessages")}
              </span>
              <span
                style={{ cursor: "pointer", fontSize: 12, color: C.teal600, fontWeight: 550 }}
                onClick={() => onNav("messages")}
              >
                {t("portal.viewAll")}
              </span>
            </div>
            {MESSAGES.slice(0, 2).map(m => (
              <div key={m.id} style={{
                display: "flex",
                gap: 12,
                padding: "10px 0",
                borderBottom: `1px solid ${C.border}`,
                cursor: "pointer"
              }}
                onClick={() => onNav("messages")}>
                <Avatar name={m.from} size={28} />
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: m.unread ? 600 : 400, color: C.dark }}>{m.from}</span>
                    <span style={{ fontSize: 10, color: C.muted }}>{m.time}</span>
                  </div>
                  <p style={{
                    fontSize: 11,
                    color: C.muted,
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginTop: 3
                  }}>{t(m.previewKey) || m.preview}</p>
                </div>
                {m.unread && <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: C.teal500, flexShrink: 0, alignSelf: "center"
                }} />}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};
// ─── PROVIDER DIRECTORY 
// ───────────────────────────────────────────
// ────────────
const Directory = ({ isMobile }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [sectorF, setSectorF] = useState("All");
  const [typeF, setTypeF] = useState("All");


  const [selected, setSelected] = useState(null);
  const [connections, setConnections] = useState(
    MEMBERS.reduce((acc, m) => ({ ...acc, [m.id]: m.connected }), {})
  );
  const filtered = MEMBERS.filter(m => {
    const q = search.toLowerCase();
    const matchQ = !q || m.name.toLowerCase().includes(q) || m.sector.toLowerCase().includes(q)
      || m.tags.some(t => t.toLowerCase().includes(q));
    const matchS = sectorF === "All" || m.sector === sectorF;
    const matchT = typeF === "All" || m.type === typeF;
    return matchQ && matchS && matchT;
  });
  const sectors = ["All", ...Array.from(new Set(MEMBERS.map(m => m.sector)))];
  const types = ["All", "Corporate", "Service Provider"];
  const toggle = (id) => setConnections(p => ({ ...p, [id]: !p[id] }));
  if (selected) {
    const m = MEMBERS.find(x => x.id === selected);
    return (
      <div style={{ padding: isMobile ? "1rem" : "2rem", fontFamily: ff.sans }}>
        <button onClick={() => setSelected(null)}
          style={{
            background: "none", border: "none", cursor: "pointer", color: C.teal700,
            fontSize: 13, marginBottom: "1rem", display: "flex", alignItems: "center", gap: 6
          }}>
          {t("portal.directory_back")}
        </button>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 340px", gap: "1.5rem" }}>
          <Card>
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>
              <Avatar name={m.name} size={64} color={C.teal700} />
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap",
                  marginBottom: 6
                }}>
                  <h2 style={{ fontFamily: ff.serif, fontSize: "1.4rem", fontWeight: 400, color: C.teal900, margin: 0 }}>{m.name}</h2>
                  {m.verified && <Badge color="green">✓ {t("portal.directory_verified")}</Badge>}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Badge>{m.type === "Service Provider" ? t("membership.tier3_tag") : t("membership.tier1_tag")}</Badge>
                  <Badge color="muted">{m.sector}</Badge>
                  <Badge color="muted">{m.country}</Badge>
                </div>
                <p style={{
                  fontSize: 14, color: C.muted, marginTop: 10, fontWeight: 300, lineHeight:
                    1.6
                }}>{m.tagline}</p>
              </div>
            </div>
            <Divider />
            <div style={{ marginBottom: "1rem" }}>
              <div style={{
                fontSize: 12, fontWeight: 500, color: C.muted, textTransform: "uppercase",
                letterSpacing: "0.08em", marginBottom: 8
              }}>{t("portal.directory_expertise_tags")}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {m.tags.map(t_tag => <Badge key={t_tag} color="teal">{t_tag}</Badge>)}
              </div>
            </div>
            <Divider />
            <p style={{ fontSize: 13, color: C.dark, lineHeight: 1.75, fontWeight: 300 }}>
              {t("portal.directory_member_description", {
                name: m.name,
                type: m.type === "Service Provider" ? t("membership.tier3_tag").toLowerCase() : t("membership.tier1_tag").toLowerCase(),
                sector: m.sector,
                country: m.country,
                status: m.verified ? t("portal.directory_verified").toLowerCase() : "registered"
              })}
            </p>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.teal900, marginBottom: "1rem" }}>{t("portal.directory_connect")}</div>
              <p style={{
                fontSize: 13, color: C.muted, marginBottom: "1rem", lineHeight: 1.65,
                fontWeight: 300
              }}>
                {t("portal.directory_connect_desc", { name: m.name.split(" ")[0] })}
              </p>
              <Btn variant={connections[m.id] ? "ghost" : "primary"} style={{
                width: "100%",
                justifyContent: "center"
              }}
                onClick={() => toggle(m.id)}>
                {connections[m.id] ? t("portal.directory_connected") : t("portal.directory_send_request")}
              </Btn>
            </Card>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.teal900, marginBottom: "0.75rem" }}>{t("portal.directory_details")}</div>
              <div style={{ overflowX: "auto", width: "100%" }}>
                {[[t("portal.directory_filter_type"), m.type === "Service Provider" ? t("membership.tier3_tag") : t("membership.tier1_tag")], [t("portal.directory_filter_sector"), m.sector], [t("portal.country"), m.country],
                [t("portal.directory_verified"), m.verified ? t("portal.profile_verified") : "Pending"]].map(([k, v]) => (
                  <div key={k} style={{
                    display: "flex", justifyContent: "space-between", gap: 12, minWidth: 260,
                    padding: "6px 0", borderBottom: `1px solid ${C.border}`, fontSize: 13
                  }}>
                    <span style={{ color: C.muted, flexShrink: 0 }}>{k}</span>
                    <span style={{ color: C.dark, fontWeight: 400, textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ padding: isMobile ? "1rem" : "2rem", fontFamily: ff.sans }}>
      {/* Search & filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <span style={{
            position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
            fontSize: 14, color: C.muted
          }}>
            🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t("portal.directory_search_placeholder")}
            style={{
              width: "100%", padding: "9px 12px 9px 34px", border: `1px solid ${C.border}`,
              borderRadius: 5, fontSize: 13, fontFamily: ff.sans, outline: "none", boxSizing: "border-box",
              background: C.white
            }} />
        </div>
        {[{ label: t("portal.directory_filter_sector"), val: sectorF, set: setSectorF, opts: sectors },
        { label: t("portal.directory_filter_type"), val: typeF, set: setTypeF, opts: types }].map(f_filter => (
          <select key={f_filter.label} value={f_filter.val} onChange={e => f_filter.set(e.target.value)}
            style={{
              padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 5,
              fontSize: 13, fontFamily: ff.sans, background: C.white, cursor: "pointer"
            }}>
            {f_filter.opts.map(o => <option key={o}>{o === "All" ? t("portal.viewAll") : (o === "Corporate" ? t("membership.tier1_tag") : o === "Service Provider" ? t("membership.tier3_tag") : o)}</option>)}
          </select>
        ))}
        <span style={{ fontSize: 13, color: C.muted, alignSelf: "center" }}>
          {filtered.length} {t("nav.membership").toLowerCase()}
        </span>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem"
      }}>
        {filtered.map(m => (
          <Card key={m.id} onClick={() => setSelected(m.id)} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 12, marginBottom: "0.75rem", alignItems: "flex-start", flexDirection: "column" }}>
              <Avatar name={m.name} size={40} color={C.teal700} />
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.teal900 }}>{m.name}</span>
                  {m.verified && <span style={{ fontSize: 9, color: C.green }}>✓</span>}
                </div>
                <div style={{ fontSize: 11, color: C.muted }}>{m.sector} · {m.country}</div>
              </div>
              <Badge>{m.type === "Service Provider" ? t("membership.tier3_tag") : t("membership.tier1_tag")}</Badge>
            </div>
            <p style={{
              fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: "0.75rem",
              fontWeight: 300
            }}>
              {m.tagline}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "0.75rem" }}>
              {m.tags.slice(0, 3).map(t => <Badge key={t} color="muted">{t}</Badge>)}
            </div>
            <Divider style={{ margin: "0.5rem 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: connections[m.id] ? C.green : C.muted }}>
                {connections[m.id] ? "✓ Connected" : "Not connected"}
              </span>
              <button onClick={e => { e.stopPropagation(); toggle(m.id); }}
                style={{
                  fontSize: 11, fontWeight: 500, padding: "4px 12px", borderRadius: 4,
                  border: `1px solid ${connections[m.id] ? C.border : C.teal500}`,
                  background: connections[m.id] ? "transparent" : C.teal700,
                  color: connections[m.id] ? C.muted : "#fff", cursor: "pointer", fontFamily: ff.sans
                }}>
                {connections[m.id] ? "Connected" : "Connect"}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
// ─── OPPORTUNITIES 
// ───────────────────────────────────────────
// ─────────────────
const Opportunities = ({ isMobile }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");
  const [showPost, setShowPost] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    title: "", type: "RFP", sector: "", budget: "", description: "",
    deadline: ""
  });
  const [submitted, setSubmitted] = useState(false);


  const [applied, setApplied] = useState({});
  const types = ["All", "RFP", "Partnership", "Mandate", "Distribution"];
  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const filtered = filter === "All" ? OPPORTUNITIES : OPPORTUNITIES.filter(o => o.type === filter);
  const typeColor = { RFP: "teal", Partnership: "gold", Mandate: "amber", Distribution: "muted" };
  if (selected) {
    const o = OPPORTUNITIES.find(x => x.id === selected);
    return (
      <div style={{ padding: isMobile ? "1rem" : "2rem", fontFamily: ff.sans }}>
        <button onClick={() => setSelected(null)}
          style={{
            background: "none", border: "none", cursor: "pointer", color: C.teal700,
            fontSize: 13, marginBottom: "1rem", display: "flex", alignItems: "center", gap: 6
          }}>
          {t("portal.opp_back")}
        </button>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 320px", gap: "1.5rem" }}>
          <Card>
            <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <Badge color={typeColor[o.type]}>{o.type}</Badge>
              <Badge color="green">Open</Badge>
            </div>
            <h2 style={{
              fontFamily: ff.serif, fontSize: "1.5rem", fontWeight: 400,
              color: C.teal900, marginBottom: "0.5rem"
            }}>{t(o.titleKey) || o.title}</h2>
            <p style={{ fontSize: 13, color: C.muted, marginBottom: "1.25rem" }}>
              {t("portal.opp_posted_by")} <strong style={{ color: C.teal700 }}>{o.org}</strong> · {o.sector}
            </p>
            <Divider />
            <p style={{ fontSize: 14, color: C.dark, lineHeight: 1.8, marginTop: "1rem", fontWeight: 300 }}>
              {t(o.descKey) || o.description}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "1rem" }}>
              {o.tags.map(t_tag => <Badge key={t_tag} color="muted">{t_tag}</Badge>)}
            </div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.teal900, marginBottom: "1rem" }}>{t("portal.opp_details_title")}</div>
              <div style={{ overflowX: "auto", width: "100%" }}>
                {[[t("portal.opp_type"), o.type], [t("portal.opp_budget"), o.budget], [t("portal.opp_deadline"), o.deadline],
                [t("portal.opp_applicants"), t("portal.opp_applicants_count", { count: o.applicants })]].map(([k, v]) => (
                  <div key={k} style={{
                    display: "flex", justifyContent: "space-between", gap: 12, minWidth: 240,
                    padding: "7px 0", borderBottom: `1px solid ${C.border}`, fontSize: 13
                  }}>
                    <span style={{ color: C.muted, flexShrink: 0 }}>{k}</span>
                    <span style={{ color: C.dark, fontWeight: 400, textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1.25rem" }}>
                {applied[o.id] ? (
                  <div style={{
                    textAlign: "center", padding: "10px", background: C.teal50,
                    borderRadius: 5, fontSize: 13, color: C.green, fontWeight: 500
                  }}>
                    {t("portal.opp_applied_success")}
                  </div>
                ) : (
                  <Btn variant="primary" style={{ width: "100%", justifyContent: "center" }}
                    onClick={() => setApplied(p => ({ ...p, [o.id]: true }))}>
                    {t("portal.opp_apply_btn")}
                  </Btn>
                )}
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.teal900, marginBottom: "0.5rem" }}>{t("portal.opp_posted_by_card")}</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Avatar name={o.org} size={32} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{o.org}</div>
                  <Badge color="green">✓ {t("portal.opp_verified_member")}</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  if (showPost) {
    return (
      <div style={{ padding: "2rem", fontFamily: ff.sans }}>
        <button onClick={() => { setShowPost(false); setSubmitted(false); }}
          style={{
            background: "none", border: "none", cursor: "pointer", color: C.teal700,
            fontSize: 13, marginBottom: "1rem", display: "flex", alignItems: "center", gap: 6
          }}>
          {t("portal.back")}
        </button>
        <Card style={{ maxWidth: 620 }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: 48, marginBottom: "1rem" }}>
                ✅</div>
              <h3 style={{
                fontFamily: ff.serif, fontSize: "1.4rem", color: C.teal900, marginBottom:
                  "0.5rem"
              }}>
                {t("portal.opp_post_success_title")}
              </h3>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
                {t("portal.opp_post_success_desc")}
              </p>
              <Btn variant="primary" style={{ marginTop: "1.5rem" }} onClick={() => { setShowPost(false); setSubmitted(false); }}>
                {t("portal.opp_view_exchange")}
              </Btn>
            </div>
          ) : (
            <>
              <h3 style={{
                fontFamily: ff.serif, fontSize: "1.4rem", color: C.teal900, marginBottom:
                  "0.25rem"
              }}>
                {t("portal.opp_post_title")}
              </h3>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: "1.5rem" }}>{t("portal.opp_post_subtitle")}</p>
              <Select label={t("portal.opp_form_type")} value={form.type} onChange={f("type")}
                options={["RFP", "Partnership", "Mandate", "Distribution"].map(v => ({
                  value: v, label:
                    v
                }))} />

              <Input label={t("portal.opp_form_title")} value={form.title} onChange={f("title")} placeholder="e.g. Legal  Advisory — APAC Expansion" />
              <Input label={t("portal.opp_form_sector")} value={form.sector} onChange={f("sector")} placeholder="e.g.  Legal / Compliance" />
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 1rem" }}>
                <Input label={t("portal.opp_form_budget")} value={form.budget} onChange={f("budget")}
                  placeholder="e.g. £80k–£150k" />
                <Input label={t("portal.opp_form_deadline")} type="date" value={form.deadline} onChange={f("deadline")} />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{
                  display: "block", fontSize: 12, fontWeight: 500, color: C.teal800,
                  marginBottom: 5
                }}>
                  {t("portal.opp_form_desc")}
                </label>
                <textarea value={form.description} onChange={e => setForm(p => ({
                  ...p, description:
                    e.target.value
                }))}
                  placeholder={t("portal.opp_form_desc_placeholder")}
                  rows={5} style={{
                    width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`,
                    borderRadius: 5, fontSize: 13, fontFamily: ff.sans, resize: "vertical",
                    outline: "none", boxSizing: "border-box"
                  }} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="ghost" onClick={() => setShowPost(false)}>{t("portal.opp_cancel")}</Btn>
                <Btn variant="primary" style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => setSubmitted(true)}>
                  {t("portal.opp_publish")}
                </Btn>
              </div>
            </>
          )}
        </Card>
      </div>
    );
  }
  return (
    <div style={{ padding: isMobile ? "1rem" : "2rem", fontFamily: ff.sans }}>
      <div style={{
        display: "flex", gap: "1rem", marginBottom: "1.5rem",
        justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {types.map(t_tab => (
            <button key={t_tab} onClick={() => setFilter(t_tab)}
              style={{
                padding: "6px 14px", borderRadius: 4, border: `1px solid ${filter === t_tab ?
                  C.teal500 : C.border}`,
                background: filter === t_tab ? C.teal700 : "transparent", color: filter === t_tab ? "#fff" : C.muted,
                fontSize: 12, fontFamily: ff.sans, cursor: "pointer", fontWeight: filter === t_tab ? 500 : 400
              }}>
              {t_tab === "All" ? t("portal.viewAll") : t_tab}
            </button>
          ))}
        </div>
        <Btn variant="gold" onClick={() => setShowPost(true)}>{t("portal.opp_post_new_btn")}</Btn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filtered.map(o => (
          <Card key={o.id} onClick={() => setSelected(o.id)} style={{ cursor: "pointer" }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap:
                "1rem"
            }}>
              <div style={{ flex: 1 }}>

                <div style={{
                  display: "flex", gap: 8, marginBottom: "0.5rem", flexWrap: "wrap",
                  alignItems: "center"
                }}>
                  <Badge color={typeColor[o.type]}>{o.type}</Badge>
                  <Badge color="muted">{o.sector}</Badge>
                  {applied[o.id] && <Badge color="green">{t("portal.opp_applied_success").replace("✓ ", "")}</Badge>}
                </div>
                <h3 style={{
                  fontSize: 15, fontWeight: 500, color: C.teal900, marginBottom: 4,
                  fontFamily: ff.sans
                }}>
                  {t(o.titleKey) || o.title}
                </h3>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: "0.75rem" }}>
                  {o.org} · {t("portal.opp_deadline")}: {o.deadline}
                </p>
                <p style={{
                  fontSize: 13, color: C.dark, lineHeight: 1.6, margin: 0, fontWeight: 300,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow:
                    "hidden"
                }}>
                  {t(o.descKey) || o.description}
                </p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.teal700 }}>{o.budget}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{t("portal.opp_interested", { count: o.applicants })}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: "0.75rem", flexWrap: "wrap" }}>
              {o.tags.map(t_tag => <Badge key={t_tag} color="muted">{t_tag}</Badge>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
// ─── INTELLIGENCE HUB 
// ───────────────────────────────────────────
// ──────────────
const Intelligence = ({ isMobile }) => {
  const { t } = useTranslation();
  const [catF, setCatF] = useState("All");
  const [selected, setSelected] = useState(null);
  const cats = ["All", "Regulatory", "Technology", "Market Insight", "Innovation"];
  const catColor = {
    Regulatory: "amber", Technology: "teal", "Market Insight": "gold", Innovation:
      "muted"
  };
  const filtered = catF === "All" ? INTEL : INTEL.filter(a => a.category === catF);
  if (selected) {
    const a = INTEL.find(x => x.id === selected);
    return (
      <div style={{ padding: isMobile ? "1rem" : "2rem", fontFamily: ff.sans }}>
        <button onClick={() => setSelected(null)}
          style={{
            background: "none", border: "none", cursor: "pointer", color: C.teal700,
            fontSize: 13, marginBottom: "1rem", display: "flex", alignItems: "center", gap: 6
          }}>
          {t("portal.intel_back")}
        </button>
        <div style={{ maxWidth: 720 }}>
          <Card>
            <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
              <Badge color={catColor[a.category]}>{a.category}</Badge>
              <span style={{ fontSize: 12, color: C.muted }}>{t("portal.intel_read_time", { count: a.readTime.split(" ")[0] })}</span>
            </div>
            <h2 style={{
              fontFamily: ff.serif, fontSize: "1.7rem", fontWeight: 400,
              color: C.teal900, lineHeight: 1.2, marginBottom: "0.75rem"
            }}>{t(a.titleKey) || a.title}</h2>
            <p style={{ fontSize: 13, color: C.muted, marginBottom: "1.5rem" }}>
              {a.source} · {a.date}
            </p>
            <Divider />
            <p style={{ fontSize: 15, color: C.dark, lineHeight: 1.85, marginTop: "1rem", fontWeight: 300 }}>
              {t(a.summaryKey) || a.summary}
            </p>
            <p style={{ fontSize: 14, color: C.dark, lineHeight: 1.85, marginTop: "1rem", fontWeight: 300 }}>
              {t("portal.intel_full_report_disclaimer")}
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: "1.5rem", flexWrap: "wrap" }}>
              {a.tags.map(t_tag => <Badge key={t_tag} color="muted">{t_tag}</Badge>)}
            </div>
            <Divider style={{ marginTop: "1.5rem" }} />
            <Btn variant="primary">{t("portal.intel_request_report")}</Btn>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div style={{ padding: isMobile ? "1rem" : "2rem", fontFamily: ff.sans }}>
      {/* Featured */}
      <div style={{
        background: `linear-gradient(135deg, ${C.teal800}, ${C.teal900})`,
        borderRadius: 10, padding: isMobile ? "1.25rem" : "2rem", marginBottom: "1.5rem", cursor: "pointer"
      }}
        onClick={() => setSelected(1)}>
        <Badge color="gold">{INTEL[0].category}</Badge>
        <h2 style={{
          fontFamily: ff.serif, fontSize: isMobile ? "1.2rem" : "1.5rem", fontWeight: 400, color: "#fff",
          lineHeight: 1.2, margin: "0.75rem 0 0.5rem"
        }}>{t(INTEL[0].titleKey) || INTEL[0].title}</h2>
        <p style={{
          fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65,
          maxWidth: 600, fontWeight: 300
        }}>{t(INTEL[0].summaryKey) || INTEL[0].summary}</p>
        <div style={{ display: "flex", gap: 8, marginTop: "1rem", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{INTEL[0].source} ·
            {INTEL[0].date}</span>
          <span style={{ fontSize: 12, color: C.gold }}>· {t("portal.intel_read_time", { count: INTEL[0].readTime.split(" ")[0] })}</span>
        </div>
      </div>
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCatF(c)}
            style={{
              padding: "6px 14px", borderRadius: 4, border: `1px solid ${catF === c ? C.teal500
                : C.border}`,
              background: catF === c ? C.teal700 : "transparent", color: catF === c ? "#fff" : C.muted,
              fontSize: 12, fontFamily: ff.sans, cursor: "pointer", fontWeight: catF === c ? 500 : 400
            }}>
            {c === "All" ? t("portal.viewAll") : c}
          </button>
        ))}
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem"
      }}>
        {filtered.map(a => (
          <Card key={a.id} onClick={() => setSelected(a.id)} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <Badge color={catColor[a.category]}>{a.category}</Badge>
              <span style={{ fontSize: 11, color: C.muted }}>{t("portal.intel_read_time", { count: a.readTime.split(" ")[0] })}</span>
            </div>
            <h3 style={{
              fontSize: 14, fontWeight: 500, color: C.teal900, lineHeight: 1.4,
              marginBottom: "0.5rem", fontFamily: ff.sans
            }}>{t(a.titleKey) || a.title}</h3>
            <p style={{
              fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: "0.75rem",
              fontWeight: 300, display: "-webkit-box", WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical", overflow: "hidden"
            }}>{t(a.summaryKey) || a.summary}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "0.5rem" }}>
              {a.tags.map(t_tag => <Badge key={t_tag} color="muted">{t_tag}</Badge>)}
            </div>
            <div style={{ fontSize: 11, color: C.muted }}>{a.date}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};
// ─── NETWORK 
// ───────────────────────────────────────────
// ───────────────────────

// ─── MESSAGES 
// ───────────────────────────────────────────
// ──────────────────────
const Messages = ({ isMobile }) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(1);
  const [input, setInput] = useState("");
  const [showThreadOnMobile, setShowThreadOnMobile] = useState(false);
  const [threads, setThreads] = useState({
    1: [{ from: "them", textKey: "portal.messages_thread1_msg1", text: "Thank you for connecting — we'd be glad to discuss the APAC mandate in more detail. When would be a convenient time to speak?", time: "2h ago" }],
    2: [{ from: "them", textKey: "portal.messages_thread2_msg1", text: "Following up on our introduction — when would be a good time to connect for a brief call?", time: "Yesterday" }],
    3: [{ from: "system", textKey: "portal.messages_thread3_msg1", text: "Your profile has been verified. You now have full access to all member services. Welcome to The Corporate Hub.", time: "2 days ago" }],
  });

  const sendMessage = () => {
    if (!input.trim()) return;
    setThreads(p => ({ ...p, [active]: [...(p[active] || []), { from: "me", text: input, time: "now" }] }));
    setInput("");
  };

  const msgs = MESSAGES;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "300px 1fr",
      height: "calc(100vh - 64px)",
      fontFamily: ff.sans
    }}>
      {/* Sidebar list of threads */}
      {(!isMobile || !showThreadOnMobile) && (
        <div style={{ borderRight: `1px solid ${C.border}`, overflowY: "auto", background: C.white }}>
          <div style={{ padding: "1rem", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                fontSize: 13, color: C.muted
              }}>
                🔍</span>
              <input placeholder={t("portal.messages_search_placeholder")} style={{
                width: "100%", padding: "7px 10px 7px 30px",
                border: `1px solid ${C.border}`, borderRadius: 5, fontSize: 12,
                fontFamily: ff.sans, outline: "none", boxSizing: "border-box"
              }} />
            </div>
          </div>
          {msgs.map(m => (
            <div key={m.id} onClick={() => { setActive(m.id); if (isMobile) setShowThreadOnMobile(true); }}
              style={{
                padding: "0.875rem 1rem", borderBottom: `1px solid ${C.border}`,
                cursor: "pointer", background: active === m.id ? C.teal50 : "transparent",
                borderLeft: active === m.id ? `3px solid ${C.teal500}` : "3px solid transparent",
                transition: "background 0.15s"
              }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Avatar name={m.from} size={34} color={m.from === "EquusChain Platform" ? C.gold : C.teal700} />
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.dark }}>{m.from}</span>
                    <span style={{ fontSize: 10, color: C.muted }}>{m.time}</span>
                  </div>
                  <p style={{
                    fontSize: 11,
                    color: C.muted,
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginTop: 3
                  }}>{t(m.previewKey) || m.preview}</p>
                </div>
                {m.unread && <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: C.teal500, flexShrink: 0, alignSelf: "center"
                }} />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active Conversation thread */}
      {(!isMobile || showThreadOnMobile) && (
        <div style={{ display: "flex", flexDirection: "column", background: C.bg, height: "100%" }}>
          {/* Thread Header */}
          <div style={{
            padding: "1rem 1.5rem", background: C.white,
            borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10
          }}>
            {isMobile && (
              <button onClick={() => setShowThreadOnMobile(false)}
                style={{
                  background: "none", border: "none", cursor: "pointer", fontSize: 16,
                  color: C.teal700, paddingRight: 8, display: "flex", alignItems: "center", outline: "none"
                }}>
                ←
              </button>
            )}
            <Avatar name={msgs.find(m => m.id === active)?.from || "?"} size={34} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.dark }}>{msgs.find(m => m.id === active)?.from}</div>
              <div style={{ fontSize: 11, color: C.green }}>{t("portal.messages_active_member")}</div>
            </div>
          </div>

          {/* Messages list */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex",
            flexDirection: "column", gap: "0.75rem"
          }}>
            {(threads[active] || []).map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.from === "me" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "66%", padding: "10px 14px",
                  borderRadius: msg.from === "me" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: msg.from === "me" ? C.teal700 : C.white,
                  border: msg.from !== "me" ? `1px solid ${C.border}` : "none",
                  color: msg.from === "me" ? "#fff" : C.dark, fontSize: 13, lineHeight: 1.6
                }}>
                  {t(msg.textKey) || msg.text}
                  <div style={{
                    fontSize: 10, color: msg.from === "me" ? "rgba(255,255,255,0.55)" : C.muted,
                    marginTop: 4, textAlign: "right"
                  }}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat composer input */}
          <div style={{
            padding: "1rem 1.5rem", background: C.white, borderTop: `1px solid ${C.border}`,
            display: "flex", gap: 10, alignItems: "flex-end"
          }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={2}
              placeholder={t("portal.messages_type_message")}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              style={{
                flex: 1, padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8,
                fontSize: 13, fontFamily: ff.sans, resize: "none", outline: "none"
              }} />
            <Btn variant="primary" onClick={sendMessage}>{t("portal.messages_send_btn")}</Btn>
          </div>
        </div>
      )}
    </div>
  );
};
// ─── PROFILE 
// ───────────────────────────────────────────
// ───────────────────────
const Profile = ({ user, isMobile }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user.name === "Member" || !user.name ? t("portal.default_member") : user.name,
    org: user.org === "Your Organisation" || !user.org ? t("portal.default_org") : user.org,
    sector: "Financial Services",
    country: "United Kingdom", bio: "Senior executive with 15+ years of experience across  international financial markets, private equity, and strategic advisory. Focused on building long- term value through trusted partnerships and cross-border transactions.",
    website: "https://www.yourorganisation.com",
    tags: ["M&A", "Strategic Advisory", "Private Equity"],
  });
  const [saved, setSaved] = useState(false);
  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const handleSave = () => {
    setSaved(true); setEditMode(false); setTimeout(() => setSaved(false),
      3000);
  };
  return (
    <div style={{ padding: isMobile ? "1rem" : "2rem", fontFamily: ff.sans }}>
      {saved && (
        <div style={{
          background: "#d4f0e2", border: `1px solid ${C.green}`, borderRadius: 6,
          padding: "10px 16px", marginBottom: "1rem", fontSize: 13, color: "#1e5a35", display: "flex",
          alignItems: "center", gap: 8
        }}>
          {t("portal.profile_save_success")}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 320px", gap: "1.5rem", alignItems: "start" }}>
        <Card>
          {/* Header */}
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", alignItems: "flex-start" }}>
            <div style={{ position: "relative" }}>
              <Avatar name={form.name} size={72} color={C.teal700} />
              {editMode && (
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer", fontSize: 16
                }}>
                  📷</div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              {editMode ? (
                <Input value={form.name} onChange={f("name")} label={t("portal.profile_display_name")} />
              ) : (
                <>
                  <div style={{
                    display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap",
                    marginBottom: 4
                  }}>
                    <h2 style={{
                      fontFamily: ff.serif, fontSize: "1.4rem", fontWeight: 400, color:
                        C.teal900
                    }}>
                      {form.name}
                    </h2>
                    <Badge color="green">✓ {t("portal.profile_verified")}</Badge>
                  </div>
                  <p style={{ fontSize: 13, color: C.muted }}>{form.org} · {form.sector} · {form.country}</p>
                </>
              )}
            </div>
            <Btn variant={editMode ? "ghost" : "outline"} onClick={() => editMode ? handleSave() :
              setEditMode(true)}>
              {editMode ? t("portal.profile_save_btn") : t("portal.profile_edit_btn")}
            </Btn>
          </div>
          <Divider />
          {editMode ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 1rem" }}>
                <Input label={t("portal.profile_org")} value={form.org} onChange={f("org")} />
                <Input label={t("portal.profile_country")} value={form.country} onChange={f("country")} />
              </div>
              <Select label={t("portal.profile_sector")} value={form.sector} onChange={f("sector")}
                options={["Financial Services", "Technology", "Legal & Compliance", "Consulting", "Asset  Management", "Cybersecurity", "Marketing", "Other"].map(v => ({ value: v, label: v }))} />
              <Input label={t("portal.profile_website")} value={form.website} onChange={f("website")} icon=" Web: " />
              <div style={{ marginBottom: "1rem" }}>
                <label style={{
                  display: "block", fontSize: 12, fontWeight: 500, color: C.teal800,
                  marginBottom: 5
                }}>
                  {t("portal.profile_bio")}
                </label>
                <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                  rows={4}
                  style={{
                    width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`,
                    borderRadius: 5, fontSize: 13, fontFamily: ff.sans, resize: "vertical",
                    outline: "none", boxSizing: "border-box"
                  }} />
              </div>
            </>
          ) : (
            <>
              <p style={{
                fontSize: 14, color: C.dark, lineHeight: 1.8, fontWeight: 300, marginBottom:
                  "1.25rem"
              }}>
                {form.bio}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {form.tags.map(t_tag => <Badge key={t_tag}>{t_tag}</Badge>)}
              </div>
              <Divider />
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 13, color: C.muted }}>
                  Web: </span>
                <a href={form.website} style={{ fontSize: 13, color: C.teal600, textDecoration: "none" }}>{form.website}</a>
              </div>
            </>
          )}
        </Card>
        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 500, color: C.teal900, marginBottom: "1rem" }}>{t("nav.membership")}</div>
            {[[t("portal.profile_membership_status"), t("portal.profile_membership_status_active")], [t("portal.profile_membership_tier"), t("membership.tier1_title")], [t("portal.profile_membership_since"), t("portal.profile_membership_since_val")],
            [t("portal.profile_membership_verification"), t("portal.profile_membership_verification_val")], [t("portal.profile_membership_ecosystem"), t("portal.profile_membership_ecosystem_val")]].map(([k, v]) => (
              <div key={k} style={{
                display: "flex", justifyContent: "space-between",
                padding: "7px 0", borderBottom: `1px solid ${C.border}`, fontSize: 13
              }}>
                <span style={{ color: C.muted }}>{k}</span>
                <span style={{ color: C.dark, fontWeight: 400 }}>{v}</span>
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 500, color: C.teal900, marginBottom: "1rem" }}>{t("portal.profile_strength_title")}</div>
            <div style={{
              height: 6, background: C.border, borderRadius: 3, marginBottom: 8, overflow:
                "hidden"
            }}>
              <div style={{ width: "72%", height: "100%", background: C.teal500, borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 12, color: C.muted }}>{t("portal.profile_strength_desc")}</div>
          </Card>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 500, color: C.teal900, marginBottom: "0.75rem" }}>{t("portal.profile_privacy_title")}</div>
            {[[t("portal.profile_privacy_visible"), true], [t("portal.profile_privacy_accept"), true],
            [t("portal.profile_privacy_search"), true], [t("portal.profile_privacy_email"), false]].map(([label, on]) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between",


                alignItems: "center", padding: "7px 0", borderBottom: `1px solid ${C.border}`
              }}>
                <span style={{ fontSize: 12, color: C.dark }}>{label}</span>
                <div style={{
                  width: 36, height: 20, borderRadius: 10,
                  background: on ? C.teal500 : C.border, cursor: "pointer",
                  display: "flex", alignItems: "center", padding: "0 3px",
                  justifyContent: on ? "flex-end" : "flex-start"
                }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff" }} />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};
// ─── PAGE TITLES 
// ───────────────────────────────────────────
// ───────────────────
const PAGE_TITLES = {
  dashboard: "portal.dashboard",
  directory: "portal.network",
  opportunities: "portal.opportunitiesExchange",
  courses: "portal.courses",
  intelligence: "portal.intelligenceHub",
  messages: "portal.messages",
  profile: "portal.profile",
};
// ─── PLATFORM SHELL 
// ───────────────────────────────────────────
// ────────────────

// ─── Trainings & Courses Component
const Courses = ({ isMobile }) => {
  const { t } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState("professional");

  const courseOptions = {
    professional: {
      title: t("courses_data.title_professional"),
      duration: t("courses_data.dur_professional"),
      level: t("courses_data.level_professional"),
      description: t("courses_data.desc_professional"),
      modules: [
        t("courses_data.mod_professional_1"),
        t("courses_data.mod_professional_2"),
        t("courses_data.mod_professional_3"),
        t("courses_data.mod_professional_4")
      ]
    },
    executive: {
      title: t("courses_data.title_executive"),
      duration: t("courses_data.dur_executive"),
      level: t("courses_data.level_executive"),
      description: t("courses_data.desc_executive"),
      modules: [
        t("courses_data.mod_executive_1"),
        t("courses_data.mod_executive_2"),
        t("courses_data.mod_executive_3"),
        t("courses_data.mod_executive_4")
      ]
    },
    masterclass: {
      title: t("courses_data.title_masterclass"),
      duration: t("courses_data.dur_masterclass"),
      level: t("courses_data.level_masterclass"),
      description: t("courses_data.desc_masterclass"),
      modules: [
        t("courses_data.mod_masterclass_1"),
        t("courses_data.mod_masterclass_2"),
        t("courses_data.mod_masterclass_3"),
        t("courses_data.mod_masterclass_4")
      ]
    },
    certification: {
      title: t("courses_data.title_certification"),
      duration: t("courses_data.dur_certification"),
      level: t("courses_data.level_certification"),
      description: t("courses_data.desc_certification"),
      modules: [
        t("courses_data.mod_certification_1"),
        t("courses_data.mod_certification_2"),
        t("courses_data.mod_certification_3"),
        t("courses_data.mod_certification_4")
      ]
    }
  };

  const current = courseOptions[selectedCourse];

  return (
    <div style={{ padding: isMobile ? "1rem" : "2.5rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Selector Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", background: C.white, padding: "10px", borderRadius: 8, border: `1px solid ${C.border}`, flexDirection: isMobile ? "column" : "row" }}>
        {Object.entries(courseOptions).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setSelectedCourse(key)}
            style={{
              flex: 1,
              padding: "14px 20px",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: ff.sans,
              cursor: "pointer",
              transition: "all 0.2s",
              background: selectedCourse === key ? C.teal700 : "transparent",
              color: selectedCourse === key ? "#fff" : C.muted
            }}
          >
            {value.title}
          </button>
        ))}
      </div>

      {/* Detail Display Card */}
      <Card style={{ padding: isMobile ? "1.5rem" : "3rem", background: C.white }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem", flexWrap: "wrap", gap: 14 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", background: C.teal100, color: C.teal700, padding: "6px 12px", borderRadius: 4, fontFamily: ff.sans }}>
              {current.level}
            </span>
            <h3 style={{ fontFamily: ff.serif, fontSize: isMobile ? "1.6rem" : "2rem", fontWeight: 400, color: C.teal900, marginTop: 10, marginBottom: 0 }}>
              {current.title}
            </h3>
          </div>
          <div style={{ textAlign: isMobile ? "left" : "right", fontSize: 14, color: C.muted, fontFamily: ff.sans }}>
            <div>{t("courses_data.duration_label")}: <strong>{current.duration}</strong></div>
          </div>
        </div>

        <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: "2.5rem", fontWeight: 300 }}>
          {current.description}
        </p>

        <Divider />

        <h4 style={{ fontSize: 14, fontWeight: 600, color: C.teal900, marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: ff.sans }}>
          {t("courses_data.curriculum_modules")}
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.25rem" }}>
          {current.modules.map((mod, idx) => (
            <div key={idx} style={{ display: "flex", gap: 14, background: C.bg, padding: "14px 18px", borderRadius: 6, alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.gold, fontFamily: ff.sans }}>
                0{idx + 1}
              </span>
              <span style={{ fontSize: 14, color: C.dark, fontFamily: ff.sans, fontWeight: 400 }}>
                {mod}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const Platform = ({ user, onLogout, currentLang, onLangChange }) => {
  const [page, setPage] = useState(() => {
    return localStorage.getItem("tch_member_page") || "dashboard";
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("tch_member_page", page);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard user={user} onNav={setPage} isMobile={isMobile} />;
      case "directory": return <Directory isMobile={isMobile} />;
      case "opportunities": return <Opportunities isMobile={isMobile} />;
      case "courses": return <Courses isMobile={isMobile} />;
      case "intelligence": return <Intelligence isMobile={isMobile} />;
      case "messages": return <Messages isMobile={isMobile} />;
      case "profile": return <Profile user={user} isMobile={isMobile} />;
      default: return <Dashboard user={user} onNav={setPage} isMobile={isMobile} />;
    }
  };
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: ff.sans }}>
      <Sidebar active={page} onNav={setPage} user={user} onLogout={onLogout}
        collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed}
        isMobile={isMobile} open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <Topbar title={PAGE_TITLES[page]} onNav={setPage} currentLang={currentLang} onLangChange={onLangChange}
          isMobile={isMobile} onToggleSidebar={() => setMobileSidebarOpen(true)} />
        <main style={{ flex: 1, overflowY: "auto" }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default function CorporateHubApp() {
  const { i18n } = useTranslation();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("tch_member_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [currentLang, setCurrentLang] = useState(localStorage.getItem("preferred_language") || i18n.language || "en");

  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    localStorage.setItem("preferred_language", lang);
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.className = "rtl-wrapper";
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.className = "ltr-wrapper";
    }
  };

  useEffect(() => {
    handleLangChange(currentLang);
    if (!user) {
      window.location.href = "/login/";
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: C.bg }}>
        <p style={{ color: C.muted, fontFamily: ff.sans }}>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <>
      <FontAndCursorLoader />
      <div style={{ fontFamily: ff.sans, color: C.dark }}>
        <Platform
          user={user}
          onLogout={() => {
            localStorage.removeItem("tch_member_user");
            localStorage.removeItem("tch_member_page");
            setUser(null);
            window.location.href = "/login/";
          }}
          currentLang={currentLang}
          onLangChange={handleLangChange}
        />
      </div>
    </>
  );
}
