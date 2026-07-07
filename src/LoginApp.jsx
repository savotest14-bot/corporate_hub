import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import "./LoginApp.css";
import { countries } from "./countries";

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

// ─── Fonts & Cursor Loader
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
const Btn = ({ children, variant = "primary", onClick, style = {}, size = "md", disabled = false }) => {
  const [hov, setHov] = useState(false);
  const base = {
    fontFamily: ff.sans, fontWeight: 500, border: "none", cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: 5, transition: "all 0.18s", letterSpacing: "0.03em", display: "inline-flex",
    alignItems: "center", gap: 6, opacity: disabled ? 0.55 : 1,
    padding: size === "sm" ? "6px 14px" : size === "lg" ? "14px 32px" : "9px 20px",
    fontSize: size === "sm" ? 12 : size === "lg" ? 14 : 13,
  };
  const variants = {
    primary: { background: C.teal700, color: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
    ghost: { background: "transparent", color: C.teal800, border: `1px solid ${C.border}` },
    gold: { background: C.gold, color: "#fff", fontWeight: 600 },
    danger: { background: C.red, color: "#fff" },
  };
  const hovers = {
    primary: { background: C.teal600 },
    ghost: { background: "rgba(201, 168, 76, 0.08)" },
    gold: { background: C.goldLt },
    danger: { background: "#d04242" },
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...base,
        ...variants[variant],
        ...(hov && !disabled ? hovers[variant] : {}),
        ...style
      }}
    >
      {children}
    </button>
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
        position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
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

const SearchableSelect = ({ label, value, onChange, options, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredOptions = options.filter(o => 
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find(o => o.value === value);

  return (
    <div ref={containerRef} style={{ position: "relative", marginBottom: "1rem" }}>
      {label && <label style={{
        display: "block", fontSize: 12, fontWeight: 500,
        color: C.teal800, marginBottom: 5, fontFamily: ff.sans
      }}>{label}</label>}
      <div 
        onClick={() => { setIsOpen(!isOpen); setSearch(""); }}
        style={{
          width: "100%", padding: "15px 16px",
          border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, fontFamily: ff.sans,
          color: value ? C.dark : "#9CA3AF", background: C.white, outline: "none", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          boxSizing: "border-box", userSelect: "none"
        }}
      >
        <span>{selectedOption && selectedOption.value ? selectedOption.label : placeholder}</span>
        <span style={{ fontSize: 10, color: "rgba(0,0,0,0.3)" }}>▼</span>
      </div>

      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          zIndex: 1000,
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: 6,
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          marginTop: 4,
          maxHeight: 250,
          display: "flex",
          flexDirection: "column"
        }}>
          <input
            type="text"
            placeholder="Type to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()} // Prevent dropdown closing on click inside search
            style={{
              padding: "10px 12px",
              border: "none",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              outline: "none",
              fontSize: 13,
              fontFamily: ff.sans,
              width: "100%",
              boxSizing: "border-box"
            }}
          />
          <div style={{ overflowY: "auto", flex: 1, maxHeight: 180 }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((o) => (
                <div
                  key={o.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(o.value);
                    setIsOpen(false);
                  }}
                  style={{
                    padding: "10px 12px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontFamily: ff.sans,
                    background: o.value === value ? "rgba(39, 132, 139, 0.08)" : "transparent",
                    color: o.value === value ? "#27848b" : C.dark
                  }}
                  onMouseEnter={(e) => {
                    if (o.value !== value) {
                      e.target.style.background = "#f9f9f9";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (o.value !== value) {
                      e.target.style.background = "transparent";
                    }
                  }}
                >
                  {o.label}
                </div>
              ))
            ) : (
              <div style={{ padding: "10px 12px", fontSize: 13, fontFamily: ff.sans, color: "#9ca3af" }}>
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


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

// ─── AuthScreen Component
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
    { value: "Financial Services & FinTechs", label: "Financial Services & FinTechs" },
    { value: "Technology & AI", label: "Technology & AI" },
    { value: "Blockchain, Web3 & Digital Assets", label: "Blockchain, Web3 & Digital Assets" },
    { value: "Legal, Compliance & Governance", label: "Legal, Compliance & Governance" },
    { value: "Accounting, Tax & Audit", label: "Accounting, Tax & Audit" },
    { value: "Strategy & Management Consulting", label: "Strategy & Management Consulting" },
    { value: "Real Estate & Infrastructure", label: "Real Estate & Infrastructure" },
    { value: "Healthcare & Life Sciences", label: "Healthcare & Life Sciences" },
    { value: "Manufacturing & Industrial", label: "Manufacturing & Industrial" },
    { value: "Energy & Natural Resources", label: "Energy & Natural Resources" },
    { value: "Agriculture & Food", label: "Agriculture & Food" },
    { value: "Consumer Goods & Retail", label: "Consumer Goods & Retail" },
    { value: "Luxury Goods & Lifestyle", label: "Luxury Goods & Lifestyle" },
    { value: "Hospitality & Tourism", label: "Hospitality & Tourism" },
    { value: "Logistics & Supply Chain", label: "Logistics & Supply Chain" },
    { value: "Telecommunications", label: "Telecommunications" },
    { value: "Media, Marketing & Communications", label: "Media, Marketing & Communications" },
    { value: "Education & Training", label: "Education & Training" },
    { value: "Non-Profit & Foundation", label: "Non-Profit & Foundation" },
    { value: "Family Office", label: "Family Office" },
    { value: "Other", label: "Other" }
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
    <div className="login-page-container">
      {/* Left panel */}
      <div className="login-left-panel">
        {[480, 320, 180].map((sz, i) => (
          <div key={i} className={`login-bg-circle login-bg-circle-${i + 1}`} />
        ))}
        <div className="login-logo-container">
          <a href="/" className="login-logo-link">
            <img
              src="/logo.png"
              alt="The Corporate Hub Logo"
              className="login-logo-img"
            />
          </a>
        </div>
        <div>
          <p className="login-eyebrow">
            <span className="login-eyebrow-line" />
            {t("portal.member_platform")}
          </p>
          <h2 className="login-hero-title">
            {t("portal.hero_title_part1")}<br />
            {t("portal.hero_title_part2")}<br />
            <em className="login-hero-title-italic">{t("portal.hero_title_part3")}</em>
          </h2>
          <p className="login-hero-subtitle">
            {t("portal.hero_subtitle")}
          </p>
        </div>

        {/* Footnote disclaimer info */}
        <p className="login-left-footnote">
          &copy; 2026 The Corporate Hub, {t("footer.brandOf")} {t("footer.rights")}
        </p>
      </div>

      {/* Right panel — form */}
      <div className="login-right-panel">
        {/* Floating Language Dropdown Top Right */}
        <div className="login-lang-dropdown-wrapper">
          <LanguageDropdown currentLang={currentLang} onLangChange={onLangChange} dark={false} />
        </div>

        <div className="login-form-wrapper">
          <div className="login-mobile-logo-container">
            <a href="/" className="login-logo-link">
              <img
                src="/logo.png"
                alt="The Corporate Hub Logo"
                className="login-mobile-logo-img"
              />
            </a>
          </div>

          {/* Tab Panel */}
          <div className="login-tab-container">
            {["Sign In", "Register"].map(t_item => {
              const isActive = (t_item === "Sign In" && mode === "signin") || (t_item === "Register" && mode === "register");
              return (
                <button key={t_item} onClick={() => { setMode(t_item === "Sign In" ? "signin" : "register"); setStep(1); }}
                  className={`login-tab-btn ${isActive ? "login-tab-btn-active" : ""}`}>
                  {t_item === "Sign In" ? t("portal.signin") : t("portal.register")}
                </button>
              );
            })}
          </div>

          {mode === "signin" ? (
            <div>
              <h3 className="login-form-title">
                {t("portal.welcome")}
              </h3>
              <p className="login-form-desc">{t("portal.signin_desc")}</p>
              <Input label={t("portal.email")} type="email" value={form.email} onChange={f("email")} placeholder="you@organisation.com" />
              <Input label={t("portal.password")} type="password" value={form.password} onChange={f("password")} placeholder="••••••••" />

              <div className="login-forgot-password-row">
                <span className="login-forgot-password-link">{t("portal.forgot")}</span>
              </div>

              <Btn variant="primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }} size="lg"
                onClick={() => onLogin({ name: form.email ? form.email.split("@")[0] : "Member", org: "Your Organisation" })}>
                {t("portal.signin")}
              </Btn>

              <div className="login-demo-tip-row">
                <span className="login-demo-tip">{t("portal.demoTip")}</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="login-step-indicator-row">
                {[1, 2].map(s => {
                  const isActiveCircle = step >= s;
                  const isActiveText = step === s;
                  return (
                    <div key={s} className="login-step-indicator-item">
                      <div className={`login-step-circle ${isActiveCircle ? "login-step-circle-active" : "login-step-circle-inactive"}`}>
                        {s}
                      </div>
                      <span className={`login-step-label ${isActiveText ? "login-step-label-active" : "login-step-label-inactive"}`}>
                        {s === 1 ? t("portal.stepOrg") : t("portal.stepContact")}
                      </span>
                      {s < 2 && <div className="login-step-line" />}
                    </div>
                  );
                })}
              </div>

              {step === 1 ? (
                <div>
                  <h3 className="login-form-title">
                    {t("portal.apply_title")}
                  </h3>
                  <p className="login-form-desc">{t("portal.org_desc")}</p>

                  <Input label={t("portal.orgName")} value={form.orgName} onChange={f("orgName")} placeholder="Acme Corporation Ltd" />
                  <Select label={t("portal.orgType")} value={form.orgType} onChange={f("orgType")} options={orgTypes} />
                  <Select label={t("portal.sector")} value={form.sector} onChange={f("sector")} options={sectors} />
                  <SearchableSelect label={t("portal.country")} value={form.country} onChange={(val) => setForm(p => ({ ...p, country: val }))} options={countries} placeholder="Select Country..." />

                  <Btn variant="primary" style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: "1rem" }} size="lg"
                    onClick={() => { if (form.orgName && form.country) setStep(2); }}>
                    {t("portal.continue")}
                  </Btn>
                </div>
              ) : (
                <div>
                  <h3 className="login-form-title">
                    {t("portal.contact_title")}
                  </h3>
                  <p className="login-form-desc">{t("portal.account_desc")}</p>

                  <div className="login-name-grid">
                    <Input label={t("portal.firstName")} value={form.firstName} onChange={f("firstName")} placeholder="Alexandra" />
                    <Input label={t("portal.lastName")} value={form.lastName} onChange={f("lastName")} placeholder="Chen" />
                  </div>
                  <Input label={t("portal.workEmail")} type="email" value={form.email} onChange={f("email")} placeholder="a.chen@acmecorp.com" />
                  <Input label={t("portal.createPassword")} type="password" value={form.password} onChange={f("password")} placeholder="Min. 12 characters" />

                  {/* Guidelines checkboxes */}
                  <div className="login-checkbox-group">
                    <label className="login-checkbox-label">
                      <input type="checkbox" checked={form.newsletter} onChange={f("newsletter")} />
                      <span>{t("modal.newsletter")}</span>
                    </label>
                    <label className="login-checkbox-label">
                      <input type="checkbox" checked={form.terms} onChange={f("terms")} required />
                      <span>{renderLinkedTerms(t("modal.terms"), i18n.language || "en", TERMS_URL, PRIVACY_URL)}</span>
                    </label>
                  </div>

                  <p className="login-terms-note">
                    {t("portal.termsNote")}
                  </p>

                  <div className="login-btn-row">
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

export default function LoginApp() {
  const { i18n } = useTranslation();
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
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("tch_member_user", JSON.stringify(userData));
    window.location.href = "/private/";
  };

  return (
    <>
      <FontAndCursorLoader />
      <div style={{ fontFamily: ff.sans, color: C.dark }}>
        <AuthScreen onLogin={handleLogin} currentLang={currentLang} onLangChange={handleLangChange} />
      </div>
    </>
  );
}
