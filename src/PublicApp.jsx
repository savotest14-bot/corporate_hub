import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";

// Constant links
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
const T = {
  teal900: "#0d3d40",
  teal800: "#16585d",
  teal700: "#1e6e74",
  teal600: "#27848b",
  teal500: "#2e9aa2",
  teal400: "#4ab3ba",
  teal300: "#7dcdd3",
  teal200: "#b2e4e7",
  teal100: "#ddf2f4",
  teal50: "#f0fafb",
  gold: "#c9a84c",
  goldLt: "#e8c87a",
  cream: "#faf8f4",
  dark: "#0a1f21",
  textMuted: "#6b8c8e",
  border: "#d4e8ea",
};

// ─── Shared Layout Sizing Container
const containerStyle = {
  width: "100%",
  boxSizing: "border-box"
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
          border: `1.5px solid ${T.gold}`,
          color: dark ? "#fff" : T.teal800,
          fontSize: 13,
          fontWeight: 600,
          padding: "8px 16px",
          borderRadius: 4,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "'Inter', sans-serif",
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
            background: "#faf8f4", // Website cream color
            border: `1.5px solid ${T.gold}`,
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
                  color: isSelected ? T.gold : T.teal900,
                  fontSize: 14,
                  fontWeight: isSelected ? 600 : 400,
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.15s"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(201, 168, 76, 0.12)";
                  e.target.style.color = T.gold;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = isSelected ? "rgba(201, 168, 76, 0.08)" : "transparent";
                  e.target.style.color = isSelected ? T.gold : T.teal900;
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

// ─── Google Fonts & Branded Cursor Injection
const FontAndCursorLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);

    // Set favicon
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
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='3.5' fill='%2327848b'/%3E%3Ccircle cx='32' cy='32' r='12' fill='none' stroke='white' stroke-width='2.5' stroke-opacity='0.4'/%3E%3Ccircle cx='32' cy='32' r='12' fill='none' stroke='%2327848b' stroke-width='1.2' stroke-opacity='0.8'/%3E%3C/svg%3E") 32 32, auto;
        font-size: 15px;
        line-height: 1.8;
      }
      a, button, select, input, textarea, [role="button"], option {
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='4' fill='%2327848b'/%3E%3Ccircle cx='32' cy='32' r='22' fill='none' stroke='white' stroke-width='3.5' stroke-opacity='0.5'/%3E%3Ccircle cx='32' cy='32' r='22' fill='none' stroke='%23c9a84c' stroke-width='1.8' stroke-opacity='0.95'/%3E%3C/svg%3E") 32 32, pointer;
      }
      .rtl-wrapper {
        direction: rtl;
        text-align: right;
      }
      .ltr-wrapper {
        direction: ltr;
        text-align: left;
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.35; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.1); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
      }
    `}</style>
  );
};

// ─── Scroll Reveal Hook
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0, style = {} }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─── Reusable Primitives
const Eyebrow = ({ children, light = false, center = false }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: center ? "center" : "flex-start",
      gap: 10,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: light ? T.gold : T.teal600,
      marginBottom: 14,
      fontFamily: "'Inter', sans-serif",
    }}
  >
    <span style={{ display: "block", width: 28, height: 1.5, background: light ? T.gold : T.teal600 }} />
    {children}
  </div>
);

const SectionTitle = ({ children, light = false, style = {} }) => (
  <h2
    style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
      fontWeight: 400,
      color: light ? "#fff" : T.teal900,
      lineHeight: 1.25,
      marginBottom: "1.25rem",
      ...style,
    }}
  >
    {children}
  </h2>
);

const SectionSub = ({ children, light = false, style = {} }) => (
  <p
    style={{
      fontSize: 18,
      color: light ? "rgba(255,255,255,0.6)" : T.textMuted,
      maxWidth: 620,
      lineHeight: 1.8,
      marginBottom: "3.5rem",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 300,
      ...style,
    }}
  >
    {children}
  </p>
);

// ─── Navigation Menu
const Nav = ({ onApply, currentLang, onLangChange, isMobile }) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("nav.overview"), id: "Overview" },
    { label: t("nav.network"), id: "TheNetwork" },
    { label: t("nav.capabilities"), id: "Capabilities" },
    { label: t("nav.membership"), id: "Membership" },
    { label: t("nav.ecosystem"), id: "Ecosystem" }
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.96)",
        backdropFilter: "blur(14px)",
        borderBottom: `0.5px solid ${T.border}`,
        padding: isMobile ? "0 1.5rem" : "0 4rem",
        height: 72,
        display: "flex",
        alignItems: "center",
        transition: "background 0.3s",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ ...containerStyle, display: "flex", alignItems: "center", justifyContent: "space-between", padding: 0 }}>
        {/* Logo (Text Removed - Only Image Used) */}
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src="/logo.png"
            alt="The Corporate Hub Logo"
            style={{ height: 48, width: "auto", objectFit: "contain" }}
          />
        </div>

        {/* Responsive Options */}
        {isMobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <LanguageDropdown currentLang={currentLang} onLangChange={onLangChange} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: T.teal800,
                fontSize: 28,
                cursor: "pointer",
                padding: 4,
                outline: "none"
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        ) : (
          /* Desktop Links */
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(l.id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: T.teal800,
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = 1)}
                onMouseLeave={(e) => (e.target.style.opacity = 0.8)}
              >
                {l.label}
              </a>
            ))}

            {/* Premium Language selector */}
            <LanguageDropdown currentLang={currentLang} onLangChange={onLangChange} />

            <button
              onClick={onApply}
              style={{
                background: T.teal700,
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                padding: "10px 24px",
                borderRadius: 4,
                border: "none",
                letterSpacing: "0.04em",
                transition: "background 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = T.teal800)}
              onMouseLeave={(e) => (e.currentTarget.style.background = T.teal700)}
            >
              {t("nav.requestAccess")}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 0,
            right: 0,
            background: "#fff",
            borderBottom: `1.5px solid ${T.border}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            padding: "2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            zIndex: 199
          }}
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                const el = document.getElementById(l.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                fontSize: 17,
                fontWeight: 500,
                color: T.teal800,
                textDecoration: "none"
              }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              onApply();
            }}
            style={{
              background: T.teal700,
              color: "#fff",
              fontSize: 16,
              fontWeight: 500,
              padding: "14px",
              borderRadius: 4,
              border: "none",
              width: "100%",
              cursor: "pointer"
            }}
          >
            {t("nav.requestAccess")}
          </button>
        </div>
      )}
    </nav>
  );
};

// ─── Hero Section
const Hero = ({ onApply, isMobile }) => {
  const { t } = useTranslation();

  return (
    <section
      id="Overview"
      style={{
        background: T.teal900,
        minHeight: "75vh",
        padding: isMobile ? "4rem 1.5rem" : "6rem 4rem",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Background Rings */}
      {[600, 440].map((size, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            right: -100 + i * 80,
            top: -100 + i * 80,
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1px solid rgba(255,255,255,${0.05 - i * 0.02})`,
            pointerEvents: "none",
          }}
        />
      ))}

      <div style={{ ...containerStyle, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr", gap: "4rem", alignItems: "center", padding: 0 }}>
        {/* Left Column */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <Eyebrow light>{t("ecosystem.eyebrow")}</Eyebrow>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: isMobile ? "clamp(2rem, 6vw, 2.6rem)" : "clamp(2.4rem, 4.5vw, 4rem)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#fff",
                marginBottom: "1.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              {t("hero.title")}
            </h1>
            <p
              style={{
                fontSize: 17,
                fontWeight: 300,
                color: "rgba(255,255,255,0.7)",
                marginBottom: "2.5rem",
                lineHeight: 1.8,
                maxWidth: 580,
              }}
            >
              {t("hero.subtitle")}
            </p>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
              <button
                style={{
                  background: T.gold,
                  color: T.dark,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  padding: "14px 34px",
                  borderRadius: 4,
                  border: "none",
                  transition: "background 0.2s",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = T.goldLt)}
                onMouseLeave={(e) => (e.currentTarget.style.background = T.gold)}
                onClick={onApply}
              >
                {t("hero.ctaExplore")}
              </button>
              <button
                style={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  padding: "14px 34px",
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.3)",
                  transition: "border-color 0.2s, color 0.2s",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                }}
                onClick={() => (window.location.href = "/private/")}
              >
                {t("hero.ctaPortal")}
              </button>
            </div>

            {/* Disclaimer text aligned inline */}
            <p
              style={{
                fontSize: 15,
                color: "rgba(255, 255, 255, 0.45)",
                maxWidth: 580,
                lineHeight: 1.7,
                borderLeft: `2px solid ${T.gold}`,
                paddingLeft: 16,
                margin: 0,
              }}
            >
              {t("hero.curatedText")}
            </p>
          </Reveal>
        </div>

        {/* Right Column: Decorative Geometric Luxury Globe / Glow Ring effect */}
        {!isMobile && (
          <div style={{ position: "relative", width: "100%", height: 420, display: "flex", alignItems: "center", justifyContent: "center", animation: "float 6s ease-in-out infinite" }}>
            {/* Glowing blur background */}
            <div style={{
              position: "absolute",
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(201, 168, 76, 0.15) 0%, transparent 70%)`,
              filter: "blur(30px)",
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              width: 350,
              height: 350,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(39, 132, 139, 0.12) 0%, transparent 70%)`,
              filter: "blur(40px)",
              pointerEvents: "none"
            }} />

            {/* Concentric Gold and Teal Rings */}
            {[280, 200, 120].map((size, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  border: `1.5px solid ${idx % 2 === 0 ? "rgba(201, 168, 76, 0.25)" : "rgba(39, 132, 139, 0.3)"}`,
                  boxShadow: idx === 1 ? "0 0 20px rgba(201, 168, 76, 0.1)" : "none",
                  animation: `spin ${20 + idx * 10}s linear infinite`,
                  transform: `rotate(${idx * 45}deg)`,
                  pointerEvents: "none"
                }}
              />
            ))}

            {/* Intersecting Orbital Rings */}
            <div style={{
              position: "absolute",
              width: 320,
              height: 120,
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transform: "rotate(-30deg)",
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              width: 320,
              height: 120,
              borderRadius: "50%",
              border: "1px solid rgba(201, 168, 76, 0.15)",
              transform: "rotate(30deg)",
              pointerEvents: "none"
            }} />

            {/* Central Glowing Orb with logo emblem watermark */}
            <div style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${T.teal800} 0%, ${T.teal900} 100%)`,
              border: `2px solid ${T.gold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3), 0 0 20px rgba(201, 168, 76, 0.2)",
              zIndex: 2,
              position: "relative",
              pointerEvents: "none"
            }}>
              {/* Gold brand initial emblem monogram inside */}
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: T.gold, fontWeight: 500, letterSpacing: "0.05em" }}>
                TCH
              </span>
            </div>

            {/* Tiny satellite glowing dots */}
            {[
              { top: "25%", left: "20%", size: 8, bg: T.gold },
              { bottom: "20%", right: "25%", size: 6, bg: "#fff" },
              { top: "60%", left: "70%", size: 10, bg: T.teal400 },
              { top: "15%", right: "30%", size: 5, bg: "rgba(255,255,255,0.7)" }
            ].map((dot, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: dot.top,
                  left: dot.left,
                  right: dot.right,
                  bottom: dot.bottom,
                  width: dot.size,
                  height: dot.size,
                  borderRadius: "50%",
                  background: dot.bg,
                  boxShadow: `0 0 10px ${dot.bg}`,
                  animation: `pulse 3s ease-in-out infinite ${idx * 0.5}s`,
                  pointerEvents: "none"
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ─── The Network Section (About)
const TheNetwork = ({ isMobile }) => {
  const { t } = useTranslation();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const cards = [
    {
      num: "01",
      title: t("network.card1_title"),
      sub: t("network.card1_sub"),
      bg: "#fff",
      titleColor: T.teal800,
      subColor: T.textMuted,
      numColor: T.teal600,
      border: `1.5px solid ${T.border}`,
    },
    {
      num: "02",
      title: t("network.card2_title"),
      sub: t("network.card2_sub"),
      bg: T.teal700,
      titleColor: "#fff",
      subColor: "rgba(255,255,255,0.75)",
      numColor: T.gold,
      border: "1.5px solid transparent",
    },
    {
      num: "03",
      title: t("network.card3_title"),
      sub: t("network.card3_sub"),
      bg: T.teal900,
      titleColor: "rgba(255,255,255,0.95)",
      subColor: "rgba(255,255,255,0.55)",
      numColor: T.goldLt,
      border: "1px solid transparent",
    },
  ];

  return (
    <section
      id="TheNetwork"
      style={{
        background: T.cream,
        padding: isMobile ? "4rem 1.5rem" : "8rem 4rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ ...containerStyle, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "6rem", alignItems: "center", padding: 0 }}>
        {/* Visual Stack Cards */}
        <Reveal>
          {/* Fanned deck — all 3 cards share same centre, rotated like held cards */}
          <div style={{
            position: "relative",
            height: isMobile ? 280 : 440,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: 1000,
          }}>
            {cards.map((c, i) => {
              const isHovered = hoveredIdx === i;
              // Fan angles: left card tilts left, centre stays flat, right tilts right
              const angles = isMobile ? [-6, 0, 6] : [-10, 0, 10];
              const translateX = isMobile ? [-35, 0, 35] : [-70, 0, 70];
              const translateY = isMobile ? [5, 0, 5] : [10, 0, 10];
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    position: "absolute",
                    width: isMobile ? 190 : 290,
                    height: isMobile ? 230 : 320,
                    background: c.bg,
                    border: isHovered ? `2px solid ${T.gold}` : c.border,
                    borderRadius: 14,
                    padding: isMobile ? "1.25rem" : "1.75rem 2rem",
                    boxShadow: isHovered
                      ? "0 30px 60px rgba(13, 61, 64, 0.28), 0 0 0 1px rgba(201,168,76,0.2)"
                      : `0 ${8 + i * 4}px ${20 + i * 10}px rgba(13, 61, 64, ${0.08 + i * 0.03})`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    zIndex: isHovered ? 100 : 3 - i,
                    transform: isHovered
                      ? `rotate(0deg) translateY(-22px) scale(1.05)`
                      : `rotate(${angles[i]}deg) translateX(${translateX[i]}px) translateY(${translateY[i]}px)`,
                    transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "pointer",
                    transformOrigin: "bottom center",
                  }}
                >
                  {/* Number badge top-left */}
                  <div style={{
                    fontSize: 15,
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    color: c.numColor,
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: `1.5px solid ${c.numColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: c.bg === "#fff" ? "rgba(39,132,139,0.06)" : "rgba(255,255,255,0.12)",
                  }}>
                    {c.num}
                  </div>

                  {/* Content bottom */}
                  <div>
                    <div style={{
                      fontSize: isMobile ? 14 : 16,
                      fontWeight: 600,
                      color: c.titleColor,
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.3,
                      marginBottom: 6,
                    }}>
                      {c.title}
                    </div>
                    <div style={{
                      fontSize: isMobile ? 11 : 13,
                      color: c.subColor,
                      lineHeight: 1.5,
                      fontWeight: 300,
                    }}>
                      {c.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Content Column */}
        <Reveal delay={100}>
          <Eyebrow>{t("nav.network")}</Eyebrow>
          <SectionTitle>{t("network.title")}</SectionTitle>
          <p style={{ fontSize: 16, color: "#4a6365", lineHeight: 1.85, marginBottom: "1.5rem", fontWeight: 300 }}>
            {t("network.p1")}
          </p>
          <p style={{ fontSize: 16, color: "#4a6365", lineHeight: 1.85, marginBottom: 0, fontWeight: 300 }}>
            {t("network.p2")}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// ─── Capabilities Section
const Capabilities = ({ isMobile }) => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(null);

  const capabilities = [
    { num: "01", title: t("capabilities.cap1_title"), body: t("capabilities.cap1_body") },
    { num: "02", title: t("capabilities.cap2_title"), body: t("capabilities.cap2_body") },
    { num: "03", title: t("capabilities.cap3_title"), body: t("capabilities.cap3_body") },
    { num: "04", title: t("capabilities.cap4_title"), body: t("capabilities.cap4_body") },
    { num: "05", title: t("capabilities.cap5_title"), body: t("capabilities.cap5_body") },
    { num: "06", title: t("capabilities.cap6_title"), body: t("capabilities.cap6_body") },
  ];

  return (
    <section
      id="Capabilities"
      style={{
        background: "#fff",
        padding: isMobile ? "4rem 1.5rem" : "8rem 4rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ ...containerStyle, padding: 0 }}>
        <Reveal>
          <Eyebrow>{t("nav.capabilities")}</Eyebrow>
          <SectionTitle>{t("capabilities.title")}</SectionTitle>
          <SectionSub style={{ marginBottom: "4rem" }}>{t("capabilities.subtitle")}</SectionSub>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "1.5rem",
          alignItems: "stretch",
        }}>
          {capabilities.map((cap, i) => {
            const isHov = hovered === i;
            return (
              <Reveal key={cap.num} delay={i * 60} style={{ height: "100%" }}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: isHov ? T.cream : "#fff",
                    border: `1px solid ${isHov ? T.gold : T.border}`,
                    borderRadius: 12,
                    padding: isMobile ? "1.75rem" : "2.25rem",
                    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    transform: isHov ? "translateY(-6px)" : "none",
                    boxShadow: isHov ? `0 20px 40px rgba(13,61,64,0.1)` : "0 2px 12px rgba(13,61,64,0.04)",
                    cursor: "default",
                    boxSizing: "border-box",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                    minHeight: 210,
                  }}
                >
                  {/* Top accent bar + number */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{
                      width: 32, height: 3,
                      borderRadius: 2,
                      background: isHov ? T.gold : T.teal400,
                      transition: "background 0.3s",
                    }} />
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: isHov ? T.gold : T.textMuted,
                      letterSpacing: "0.12em",
                      transition: "color 0.3s",
                    }}>
                      {cap.num}
                    </span>
                  </div>

                  {/* Title */}
                  <div style={{
                    fontSize: isMobile ? 17 : 19,
                    fontWeight: 600,
                    color: isHov ? T.teal900 : T.teal800,
                    lineHeight: 1.3,
                    fontFamily: "'Inter', sans-serif",
                    transition: "color 0.3s",
                  }}>
                    {cap.title}
                  </div>

                  {/* Body */}
                  <p style={{
                    fontSize: 14,
                    color: T.textMuted,
                    lineHeight: 1.75,
                    margin: 0,
                    fontWeight: 300,
                  }}>
                    {cap.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Trust Section
const Trust = ({ isMobile }) => {
  const { t } = useTranslation();
  const [hoveredPillar, setHoveredPillar] = useState(null);

  const pillars = [
    { num: "I", name: t("trust.p1"), desc: t("trust.p1_desc") ?? "" },
    { num: "II", name: t("trust.p2"), desc: t("trust.p2_desc") ?? "" },
    { num: "III", name: t("trust.p3"), desc: t("trust.p3_desc") ?? "" },
    { num: "IV", name: t("trust.p4"), desc: t("trust.p4_desc") ?? "" },
  ];

  return (
    <section
      id="Trust"
      style={{
        background: T.teal900,
        padding: isMobile ? "5rem 1.5rem" : "9rem 4rem",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background rings */}
      {[600, 380].map((sz, ri) => (
        <div key={ri} style={{
          position: "absolute",
          left: "50%",
          top: ri === 0 ? "-15%" : "60%",
          transform: "translateX(-50%)",
          width: sz, height: sz,
          borderRadius: "50%",
          border: `1px solid rgba(201,168,76,${0.04 - ri * 0.01})`,
          pointerEvents: "none",
        }} />
      ))}

      <div style={{ ...containerStyle, padding: 0, position: "relative", zIndex: 1 }}>

        {/* Header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: isMobile ? "3.5rem" : "5rem" }}>
            <Eyebrow light center>{t("trust.eyebrow")}</Eyebrow>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? "clamp(2rem,6vw,2.6rem)" : "clamp(2.4rem,4vw,3.6rem)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.2,
              margin: "0 auto 1.25rem",
              maxWidth: 1080,
            }}>
              {t("trust.title")}
            </h2>
            <p style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.5)",
              maxWidth: 560,
              lineHeight: 1.8,
              margin: "0 auto",
              fontWeight: 300,
            }}>
              {t("trust.subtitle")}
            </p>
          </div>
        </Reveal>

        {/* Pillar Cards */}
        <Reveal delay={100}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: "1.25rem",
            marginBottom: isMobile ? "3.5rem" : "5rem",
          }}>
            {pillars.map((p, idx) => {
              const isHov = hoveredPillar === idx;
              return (
                <div
                  key={p.name}
                  onMouseEnter={() => setHoveredPillar(idx)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  style={{
                    padding: isMobile ? "1.75rem 1.25rem" : "2.5rem 1.75rem",
                    background: isHov
                      ? `linear-gradient(160deg, ${T.teal800} 0%, rgba(13,61,64,0.9) 100%)`
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isHov ? T.gold : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 12,
                    textAlign: "center",
                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                    transform: isHov ? "translateY(-8px)" : "none",
                    boxShadow: isHov ? `0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px ${T.gold}22` : "none",
                    cursor: "default",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  {/* Roman numeral in gold ring */}
                  <div style={{
                    width: 52, height: 52,
                    borderRadius: "50%",
                    border: `1.5px solid ${isHov ? T.gold : "rgba(201,168,76,0.3)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isHov ? "rgba(201,168,76,0.1)" : "transparent",
                    transition: "all 0.3s",
                  }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 18,
                      fontWeight: 600,
                      color: isHov ? T.gold : "rgba(201,168,76,0.6)",
                      transition: "color 0.3s",
                    }}>
                      {p.num}
                    </span>
                  </div>

                  {/* Pillar name */}
                  <div style={{
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: 600,
                    color: isHov ? "#fff" : "rgba(255,255,255,0.65)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    lineHeight: 1.4,
                    transition: "color 0.3s",
                  }}>
                    {p.name}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Decorative horizontal divider with gold centre dot */}
        <Reveal delay={180}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            maxWidth: 560,
            margin: "0 auto",
            marginBottom: isMobile ? "3rem" : "4rem",
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />
            <div style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: T.gold,
              boxShadow: `0 0 12px ${T.gold}`,
            }} />
            <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />
          </div>
        </Reveal>

        {/* Quote Block */}
        <Reveal delay={220}>
          <div style={{
            maxWidth: 720,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            padding: "0 2rem",
          }}>
            {/* Large decorative opening quotation mark */}
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 80,
              color: T.gold,
              opacity: 0.25,
              lineHeight: 1,
              marginBottom: -30,
              userSelect: "none",
            }}>
              "
            </div>
            <p style={{
              fontSize: isMobile ? 17 : 20,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.85,
              fontStyle: "italic",
              fontFamily: "'Playfair Display', serif",
              margin: "0 0 1.5rem",
              fontWeight: 400,
            }}>
              {t("trust.quote")}
            </p>
            {/* Gold accent line below quote */}
            <div style={{
              width: 48, height: 2,
              background: T.gold,
              margin: "0 auto",
              borderRadius: 1,
              opacity: 0.6,
            }} />
          </div>
        </Reveal>

      </div>
    </section>
  );
};


// ─── Ecosystem Section
const Ecosystem = ({ isMobile }) => {
  const { t } = useTranslation();
  const [hoveredEc, setHoveredEc] = useState(null);

  const features = [
    { num: "01", title: t("ecosystem.f1_title"), body: t("ecosystem.f1_body"), marginLeft: 0, marginRight: 60 },
    { num: "02", title: t("ecosystem.f2_title"), body: t("ecosystem.f2_body"), marginLeft: 30, marginRight: 30 },
    { num: "03", title: t("ecosystem.f3_title"), body: t("ecosystem.f3_body"), marginLeft: 60, marginRight: 0 },
  ];

  return (
    <section
      id="Ecosystem"
      style={{ background: T.cream, padding: isMobile ? "4rem 1.5rem" : "8rem 4rem", fontFamily: "'Inter', sans-serif" }}
    >
      <div style={{ ...containerStyle, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "6rem", alignItems: "center", padding: 0 }}>

        {/* Left Column: Heading */}
        <Reveal>
          <Eyebrow>{t("nav.ecosystem")}</Eyebrow>
          <SectionTitle>{t("ecosystem.title")}</SectionTitle>
          <SectionSub style={{ marginBottom: 0 }}>{t("ecosystem.subtitle")}</SectionSub>
        </Reveal>

        {/* Right Column: Features List */}
        <Reveal delay={120}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {features.map((f, i) => {
              const isHov = hoveredEc === i;
              return (
                <div
                  key={f.num}
                  onMouseEnter={() => setHoveredEc(i)}
                  onMouseLeave={() => setHoveredEc(null)}
                  style={{
                    marginLeft: isMobile ? 0 : f.marginLeft,
                    marginRight: isMobile ? 0 : f.marginRight,
                    background: isHov
                      ? `linear-gradient(135deg, #fff 60%, ${T.teal50} 100%)`
                      : "#fff",
                    border: `1px solid ${isHov ? T.teal400 : T.border}`,
                    borderTop: `3px solid ${isHov ? T.gold : T.teal400}`,
                    borderRadius: 12,
                    padding: "1.5rem 1.75rem",
                    boxShadow: isHov
                      ? "0 12px 32px rgba(13,61,64,0.12)"
                      : "0 2px 12px rgba(13,61,64,0.05)",
                    transform: isHov ? "translateY(-4px)" : "none",
                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                    cursor: "default",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.25rem",
                  }}
                >
                  {/* Number badge */}
                  <div style={{
                    flexShrink: 0,
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: isHov ? T.teal900 : T.cream,
                    border: `1.5px solid ${isHov ? T.teal900 : T.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s",
                    marginTop: 2,
                  }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: isHov ? T.gold : T.teal500,
                      transition: "color 0.3s",
                    }}>
                      {f.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: isHov ? T.teal900 : T.teal800,
                      marginBottom: 6,
                      fontFamily: "'Inter', sans-serif",
                      transition: "color 0.3s",
                    }}>
                      {f.title}
                    </div>
                    <p style={{
                      fontSize: 13,
                      color: T.textMuted,
                      lineHeight: 1.75,
                      margin: 0,
                      fontWeight: 300,
                    }}>
                      {f.body}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div style={{
                    flexShrink: 0,
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: isHov ? 1 : 0,
                    transform: isHov ? "translateX(0)" : "translateX(-6px)",
                    transition: "all 0.3s",
                    marginTop: 10,
                    color: T.gold,
                    fontSize: 16,
                  }}>
                    →
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

      </div>
    </section>
  );
};



// ─── Membership Tiers Section


const Membership = ({ onApply, isMobile }) => {
  const { t } = useTranslation();

  const membershipTiers = [
    {
      tag: t("membership.tier1_tag"),
      title: t("membership.tier1_title"),
      desc: t("membership.tier1_desc"),
      features: [
        t("membership.feat_curated_dir"),
        t("membership.feat_opp_exchange"),
        t("membership.feat_intel_access"),
        t("membership.feat_eco_visibility")
      ],
      featured: false,
    },
    {
      tag: t("membership.tier2_tag"),
      title: t("membership.tier2_title"),
      desc: t("membership.tier2_desc"),
      features: [
        t("membership.feat_corp_benefits"),
        t("membership.feat_strategic_access"),
        t("membership.feat_partner_initiatives"),
        t("membership.feat_exec_access")
      ],
      featured: true,
    },
    {
      tag: t("membership.tier3_tag"),
      title: t("membership.tier3_title"),
      desc: t("membership.tier3_desc"),
      features: [
        t("membership.feat_profile_listing"),
        t("membership.feat_rfp_visibility"),
        t("membership.feat_eco_intro"),
        t("membership.feat_knowledge_access")
      ],
      featured: false,
    },
  ];

  return (
    <section
      id="Membership"
      style={{
        background: "#fff",
        padding: isMobile ? "5rem 1.5rem" : "9rem 4rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ ...containerStyle, padding: 0 }}>

        {/* Header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: isMobile ? "3rem" : "5rem" }}>
            <Eyebrow center>{t("membership.eyebrow")}</Eyebrow>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? "clamp(2rem,6vw,2.6rem)" : "clamp(2.4rem,4vw,3.4rem)",
              fontWeight: 400,
              color: T.teal900,
              lineHeight: 1.2,
              margin: "0 auto 1.25rem",
              maxWidth: 620,
            }}>
              {t("membership.title")}
            </h2>
            <p style={{
              fontSize: 16,
              color: T.textMuted,
              maxWidth: 500,
              lineHeight: 1.8,
              margin: "0 auto",
              fontWeight: 300,
            }}>
              {t("membership.subtitle")}
            </p>
          </div>
        </Reveal>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "1.5rem",
          alignItems: "start",
          maxWidth: 1080,
          margin: "0 auto",
        }}>
          {membershipTiers.map((tier, i) => (
            <Reveal key={tier.tag} delay={i * 80}>
              <div style={{
                background: tier.featured ? T.teal50 : "#fff",
                border: `1px solid ${tier.featured ? T.gold : T.border}`,
                borderRadius: 16,
                padding: "2.5rem 2rem",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
                position: "relative",
                transform: tier.featured && !isMobile ? "translateY(-16px)" : "none",
                boxShadow: tier.featured
                  ? `0 24px 48px rgba(13,61,64,0.12), 0 0 0 1px ${T.gold}33`
                  : "0 2px 12px rgba(13,61,64,0.05)",
              }}>

                {/* Featured crown badge */}
                {tier.featured && (
                  <div style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: `linear-gradient(135deg, ${T.gold} 0%, ${T.goldLt} 100%)`,
                    color: T.teal900,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "5px 16px",
                    borderRadius: 20,
                    whiteSpace: "nowrap",
                  }}>
                    ★ Most Popular
                  </div>
                )}

                <div>
                  {/* Tag pill */}
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "5px 12px",
                    borderRadius: 20,
                    display: "inline-block",
                    marginBottom: "1.5rem",
                    background: tier.featured ? `rgba(201,168,76,0.12)` : T.teal100,
                    color: tier.featured ? T.gold : T.teal700,
                    border: `1px solid ${tier.featured ? `${T.gold}55` : T.border}`,
                  }}>
                    {tier.tag}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.55rem",
                    fontWeight: 400,
                    color: T.teal900,
                    marginBottom: "0.75rem",
                    lineHeight: 1.3,
                  }}>
                    {tier.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: 13,
                    color: T.textMuted,
                    lineHeight: 1.75,
                    marginBottom: "2rem",
                    fontWeight: 300,
                  }}>
                    {tier.desc}
                  </p>

                  {/* Gold divider */}
                  <div style={{
                    height: 1,
                    background: tier.featured
                      ? `linear-gradient(90deg, ${T.gold}66, transparent)`
                      : T.border,
                    marginBottom: "1.5rem",
                  }} />

                  {/* Feature list */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem" }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{
                        fontSize: 13,
                        color: T.teal800,
                        padding: "7px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        borderBottom: `1px solid ${T.border}`,
                      }}>
                        <span style={{
                          width: 18, height: 18,
                          borderRadius: "50%",
                          background: tier.featured ? `rgba(201,168,76,0.12)` : T.teal100,
                          border: `1px solid ${tier.featured ? T.gold + "66" : T.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: 9,
                          color: tier.featured ? T.gold : T.teal500,
                        }}>
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={onApply}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: 8,
                    border: `1px solid ${tier.featured ? T.gold : T.teal500}`,
                    background: tier.featured
                      ? `linear-gradient(135deg, ${T.gold} 0%, ${T.goldLt} 100%)`
                      : "transparent",
                    color: tier.featured ? T.teal900 : T.teal700,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.05em",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (tier.featured) {
                      e.currentTarget.style.opacity = "0.88";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    } else {
                      e.currentTarget.style.background = T.teal50;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (tier.featured) {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "none";
                    } else {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {t("membership.btnApply")}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};



// ─── CTA Bar

const CTABar = ({ onApply, onContact, isMobile }) => {
  const { t } = useTranslation();

  const rawTitle = t("ctaBar.title");
  let renderedTitle = rawTitle;
  if (rawTitle && rawTitle.includes(".")) {
    const parts = rawTitle.split(".");
    if (parts.length >= 3) {
      renderedTitle = (
        <>
          {parts[0]}.{parts[1]}.
          <span style={{
            color: T.gold,
            background: `linear-gradient(135deg, ${T.gold} 30%, ${T.goldLt} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            marginLeft: "0.25em",
            fontWeight: 500
          }}>
            {parts[2].trim()}.
          </span>
        </>
      );
    }
  }

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${T.teal900} 0%, ${T.teal800} 60%, ${T.dark} 100%)`,
        padding: isMobile ? "4rem 1.5rem" : "4rem 4rem",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
        borderTop: `1px solid rgba(255, 255, 255, 0.05)`,
        borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
      }}
    >
      {/* Decorative ambient lighting */}
      <div style={{
        position: "absolute",
        top: "-20%",
        right: "-10%",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(46,154,162,0.15) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-30%",
        left: "-10%",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{
        ...containerStyle,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr",
        gap: isMobile ? "3rem" : "4rem",
        alignItems: "center",
        padding: 0,
        position: "relative",
        zIndex: 2
      }}>
        <div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? "clamp(2.2rem, 5vw, 2.6rem)" : "clamp(2.6rem, 4vw, 3.4rem)",
              fontWeight: 400,
              color: "#fff",
              marginTop: 0,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            {renderedTitle}
          </h2>
          <p style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.7)",
            fontWeight: 300,
            lineHeight: 1.7,
            margin: 0,
            maxWidth: 620
          }}>
            {t("ctaBar.subtitle")}
          </p>
        </div>

        <div style={{
          display: "flex",
          gap: "1.25rem",
          flexWrap: "wrap",
          justifyContent: isMobile ? "flex-start" : "flex-end",
          flexShrink: 0
        }}>
          <button
            style={{
              background: `linear-gradient(135deg, ${T.gold} 0%, ${T.goldLt} 100%)`,
              color: T.teal900,
              fontSize: 15,
              fontWeight: 700,
              padding: "16px 36px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.05em",
              boxShadow: `0 8px 24px rgba(201, 168, 76, 0.25)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 14px 30px rgba(201, 168, 76, 0.4)`;
              e.currentTarget.style.opacity = "0.95";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = `0 8px 24px rgba(201, 168, 76, 0.25)`;
              e.currentTarget.style.opacity = "1";
            }}
            onClick={onApply}
          >
            {t("ctaBar.ctaApply")}
          </button>
          <button
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              padding: "16px 36px",
              borderRadius: 8,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              backdropFilter: "blur(4px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }}
            onClick={onContact}
          >
            {t("ctaBar.ctaContact")}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Footer
const Footer = ({ onApply, onContact, onResetCookies, isMobile }) => {
  const { t } = useTranslation();

  const cols = [
    {
      title: t("footer.col1_title"),
      links: [
        { label: t("nav.overview"), id: "Overview" },
        { label: t("nav.network"), id: "TheNetwork" },
        { label: t("nav.capabilities"), id: "Capabilities" },
        { label: t("nav.membership"), id: "Membership" }
      ],
    },
    {
      title: t("footer.col2_title"),
      links: [
        { label: t("capabilities.cap1_title"), id: "Capabilities" },
        { label: t("capabilities.cap4_title"), id: "Capabilities" },
        { label: t("capabilities.cap3_title"), id: "Capabilities" },
        { label: t("capabilities.cap6_title"), id: "Capabilities" }
      ],
    },
    {
      title: "",
      links: [{ label: t("footer.col3_title"), href: "https://www.equuschain.com", external: true }],
    },
  ];

  return (
    <footer
      style={{
        background: T.dark,
        padding: isMobile ? "4rem 1.5rem 3rem" : "6rem 4rem 4rem",
        fontFamily: "'Inter', sans-serif",
        borderTop: `1px solid rgba(255,255,255,0.04)`,
      }}
    >
      <div style={{ ...containerStyle, padding: 0 }}>
        {/* Top Link Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.8fr repeat(3, 1fr) 1.2fr",
          gap: "3rem",
          marginBottom: "4rem",
        }}>
          {/* Brand info */}
          <div>
            <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center" }}>
              <img
                src="/logo.png"
                alt="The Corporate Hub Logo"
                style={{
                  height: 84,
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
            <p style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.8,
              maxWidth: 260,
              fontWeight: 300,
              margin: 0
            }}>
              {t("footer.desc")}
            </p>
          </div>

          {/* Nav groups */}
          {cols.map((col, index) => (
            <div key={col.title || index}>
              {col.title && (
                <h5
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: T.gold,
                    marginBottom: "1.5rem",
                    marginTop: 0,
                  }}
                >
                  {col.title}
                </h5>
              )}
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: 12 }}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.55)",
                          textDecoration: "none",
                          fontWeight: 300,
                          transition: "all 0.25s ease",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#fff";
                          e.target.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "rgba(255,255,255,0.55)";
                          e.target.style.transform = "none";
                        }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => {
                          const el = document.getElementById(link.id);
                          if (el) {
                            e.preventDefault();
                            el.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.55)",
                          textDecoration: "none",
                          fontWeight: 300,
                          transition: "all 0.25s ease",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#fff";
                          e.target.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "rgba(255,255,255,0.55)";
                          e.target.style.transform = "none";
                        }}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Trigger */}
          <div>
            <h5
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: T.gold,
                marginBottom: "1.5rem",
                marginTop: 0,
              }}
            >
              {t("modal.contactUs")}
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 12 }}>
                <a
                  href="#Contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onContact();
                  }}
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    fontWeight: 300,
                    transition: "all 0.25s ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#fff";
                    e.target.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgba(255,255,255,0.55)";
                    e.target.style.transform = "none";
                  }}
                >
                  {t("footer.contactForm")}
                </a>
              </li>
              <li style={{ marginBottom: 12 }}>
                <button
                  onClick={onResetCookies}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    font: "inherit",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.55)",
                    cursor: "pointer",
                    fontWeight: 300,
                    transition: "all 0.25s ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#fff";
                    e.target.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgba(255,255,255,0.55)";
                    e.target.style.transform = "none";
                  }}
                >
                  {t("footer.cookieSettings")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "rgba(255,255,255,0.06)",
          marginBottom: "2.5rem"
        }} />

        {/* Bottom Metadata & Legal Links */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>
              &copy; 2026 The Corporate Hub &mdash; {t("footer.brandOf")} {t("footer.rights")}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 6 }}>
              <span>🇦🇪</span> {t("footer.address")}
            </div>
          </div>

          <div style={{ display: "flex", gap: 24, fontSize: 13 }}>
            <a
              href={PRIVACY_URL}
              style={{
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => (e.target.style.color = T.gold)}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.4)")}
            >
              {t("footer.privacyPolicy")}
            </a>
            <a
              href={TERMS_URL}
              style={{
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => (e.target.style.color = T.gold)}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.4)")}
            >
              {t("footer.termsOfMembership")}
            </a>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <p style={{
          fontSize: 11,
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.3)",
          textAlign: "justify",
          fontWeight: 300,
          margin: 0
        }}>
          {t("footer.disclaimer")}
        </p>
      </div>
    </footer>
  );
};

// ─── Request Access / Contact Modal
const RequestAccessModal = ({ isOpen, onClose, defaultType = "membership" }) => {
  const { t, i18n } = useTranslation();
  const [type, setType] = useState(defaultType); // "membership" | "contact"
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    orgName: "",
    orgType: "Corporate",
    sector: "Financial Services",
    country: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    message: "",
    newsletter: false,
    terms: false,
  });
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const orgTypes = [
    { value: "Corporate", label: "Corporate Entity" },
    { value: "Sovereign", label: "Sovereign / Institutional" },
    { value: "Advisor", label: "Professional Advisory Firm" },
    { value: "Provider", label: "Specialist Service Provider" },
  ];

  const sectors = [
    { value: "Financial Services", label: "Financial Services / Private Equity" },
    { value: "Legal", label: "Legal / Compliance / Governance" },
    { value: "Technology", label: "Technology / Fintech / AI" },
    { value: "Consulting", label: "Strategy & Management Consulting" },
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setStatus("idle");
      setType(defaultType);
      setForm({
        orgName: "",
        orgType: "Corporate",
        sector: "Financial Services",
        country: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        message: "",
        newsletter: false,
        terms: false,
      });
    }
  }, [isOpen, defaultType]);

  if (!isOpen) return null;

  const handleChange = (k) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [k]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "membership" && !form.terms) return;

    setStatus("submitting");
    try {
      const payload = { formType: type, ...form };
      console.log("Submitting form data to API:", payload);

      const res = await fetch("https://3d43-106-222-213-73.ngrok-free.app/api/mail_handler.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      console.log("API Server Response:", data);

      if (data.success) {
        setStatus("success");
      } else {
        alert(data.message || "Submission failed");
        setStatus("error");
      }
    } catch (err) {
      console.warn("API error, falling back to success for preview:", err);
      setStatus("success");
    }
  };

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(10, 31, 33, 0.72)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    padding: "1.5rem",
    boxSizing: "border-box",
  };

  const containerStyle = {
    background: T.cream,
    border: `1px solid ${T.border}`,
    borderRadius: 12,
    padding: "2.75rem",
    width: "100%",
    maxWidth: 520,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
    position: "relative",
    color: T.dark,
    fontFamily: "'Inter', sans-serif",
  };

  const closeBtnStyle = {
    position: "absolute",
    top: 20,
    right: 20,
    background: "none",
    border: "none",
    fontSize: 28,
    cursor: "pointer",
    color: T.teal800,
    opacity: 0.6,
    transition: "opacity 0.2s",
  };

  const tabContainerStyle = {
    display: "flex",
    borderBottom: `1.5px solid ${T.border}`,
    marginBottom: "1.75rem",
  };

  const tabStyle = (active) => ({
    flex: 1,
    padding: "12px",
    background: "none",
    border: "none",
    borderBottom: active ? `3.5px solid ${T.teal700}` : "none",
    color: active ? T.teal800 : T.textMuted,
    fontWeight: active ? 600 : 400,
    fontSize: 15,
    cursor: "pointer",
    textAlign: "center",
  });

  const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: T.teal800,
    marginBottom: 6,
    marginTop: 14,
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: `1px solid ${T.border}`,
    borderRadius: 6,
    fontSize: 14,
    color: T.dark,
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const primaryBtnStyle = {
    background: T.teal700,
    color: "#fff",
    padding: "14px 28px",
    borderRadius: 6,
    border: "none",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    width: "100%",
    marginTop: "1.75rem",
    transition: "background 0.2s",
  };

  const ghostBtnStyle = {
    background: "none",
    border: `1px solid ${T.border}`,
    color: T.teal800,
    padding: "14px 28px",
    borderRadius: 6,
    fontWeight: 500,
    fontSize: 15,
    cursor: "pointer",
    flex: 1,
    transition: "background 0.2s",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
        <button
          style={closeBtnStyle}
          onClick={onClose}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
        >
          &times;
        </button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <div style={{ fontSize: 56, marginBottom: "1rem", color: T.gold }}>✓</div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                fontWeight: 400,
                color: T.teal900,
                marginBottom: "0.75rem",
              }}
            >
              {t("modal.successTitle")}
            </h3>
            <p style={{ fontSize: 15, color: T.textMuted, lineHeight: 1.8, marginBottom: "2rem" }}>
              {type === "membership"
                ? t("modal.successDescMembership")
                : t("modal.successDescContact")}
            </p>
            {type === "membership" && (
              <div
                style={{
                  padding: "1.25rem",
                  background: T.teal50,
                  border: `1px solid ${T.border}`,
                  borderRadius: 8,
                  fontSize: 14,
                  color: T.teal900,
                  marginBottom: "2rem",
                }}
              >
                <strong>{t("modal.demoNote")}</strong>
              </div>
            )}
            <div style={{ display: "flex", gap: 12 }}>
              {type === "membership" && (
                <button
                  onClick={() => (window.location.href = "/private/")}
                  style={{
                    ...primaryBtnStyle,
                    margin: 0,
                    flex: 2,
                    background: T.gold,
                    color: T.dark,
                  }}
                >
                  {t("modal.btnProceed")}
                </button>
              )}
              <button onClick={onClose} style={{ ...ghostBtnStyle, flex: 1 }}>
                {t("modal.btnClose")}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={tabContainerStyle}>
              <button
                type="button"
                style={tabStyle(type === "membership")}
                onClick={() => setType("membership")}
              >
                {t("modal.requestAccess")}
              </button>
              <button
                type="button"
                style={tabStyle(type === "contact")}
                onClick={() => setType("contact")}
              >
                {t("modal.contactUs")}
              </button>
            </div>

            {status === "error" && (
              <div
                style={{
                  padding: 12,
                  background: "#fde4e4",
                  border: "1px solid #e05252",
                  borderRadius: 6,
                  color: "#943535",
                  fontSize: 14,
                  marginBottom: "1.25rem",
                }}
              >
                {errorMsg}
              </div>
            )}

            {type === "membership" ? (
              <div>
                {step === 1 ? (
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.5rem",
                        fontWeight: 400,
                        color: T.teal900,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {t("modal.orgDetails")}
                    </h4>
                    <label style={labelStyle}>{t("modal.orgName")}</label>
                    <input
                      style={inputStyle}
                      value={form.orgName}
                      onChange={handleChange("orgName")}
                      placeholder="e.g. Acme Corp Ltd"
                      required
                    />

                    <label style={labelStyle}>{t("modal.orgType")}</label>
                    <select
                      style={{ ...inputStyle, cursor: "pointer" }}
                      value={form.orgType}
                      onChange={handleChange("orgType")}
                    >
                      {orgTypes.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>

                    <label style={labelStyle}>{t("modal.sector")}</label>
                    <select
                      style={{ ...inputStyle, cursor: "pointer" }}
                      value={form.sector}
                      onChange={handleChange("sector")}
                    >
                      {sectors.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>

                    <label style={labelStyle}>{t("modal.country")}</label>
                    <input
                      style={inputStyle}
                      value={form.country}
                      onChange={handleChange("country")}
                      placeholder="e.g. United Kingdom"
                      required
                    />

                    <button
                      type="button"
                      style={primaryBtnStyle}
                      onClick={() => {
                        if (form.orgName && form.country) setStep(2);
                      }}
                    >
                      {t("modal.btnContinue")} &rarr;
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.5rem",
                        fontWeight: 400,
                        color: T.teal900,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {t("modal.contactDetails")}
                    </h4>
                    <div style={{ display: "flex", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>{t("modal.firstName")}</label>
                        <input
                          style={inputStyle}
                          value={form.firstName}
                          onChange={handleChange("firstName")}
                          placeholder="Alexandra"
                          required
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>{t("modal.lastName")}</label>
                        <input
                          style={inputStyle}
                          value={form.lastName}
                          onChange={handleChange("lastName")}
                          placeholder="Chen"
                          required
                        />
                      </div>
                    </div>

                    <label style={labelStyle}>{t("modal.email")}</label>
                    <input
                      style={inputStyle}
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="a.chen@acmecorp.com"
                      required
                    />

                    <label style={labelStyle}>{t("modal.password")}</label>
                    <input
                      style={inputStyle}
                      type="password"
                      value={form.password}
                      onChange={handleChange("password")}
                      placeholder="••••••••"
                      required
                    />

                    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: T.teal900 }}>
                        <input
                          type="checkbox"
                          checked={form.newsletter}
                          onChange={handleChange("newsletter")}
                          style={{ marginTop: 3 }}
                        />
                        <span>{t("modal.newsletter")}</span>
                      </label>

                      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: T.teal900 }}>
                        <input
                          type="checkbox"
                          checked={form.terms}
                          onChange={handleChange("terms")}
                          style={{ marginTop: 3 }}
                          required
                        />
                        <span>
                          {renderLinkedTerms(t("modal.terms"), i18n.language || "en", TERMS_URL, PRIVACY_URL)}
                        </span>
                      </label>
                    </div>

                    <div style={{ display: "flex", gap: 12, marginTop: "2rem" }}>
                      <button type="button" style={ghostBtnStyle} onClick={() => setStep(1)}>
                        {t("modal.btnBack")}
                      </button>
                      <button
                        type="submit"
                        style={{ ...primaryBtnStyle, margin: 0, flex: 2 }}
                        disabled={status === "submitting" || !form.terms}
                      >
                        {status === "submitting" ? "Submitting..." : t("modal.btnSubmit")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h4
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    color: T.teal900,
                    marginBottom: "1.25rem",
                  }}
                >
                  {t("modal.messageDetails")}
                </h4>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>{t("modal.firstName")}</label>
                    <input
                      style={inputStyle}
                      value={form.firstName}
                      onChange={handleChange("firstName")}
                      placeholder="Alexandra"
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>{t("modal.lastName")}</label>
                    <input
                      style={inputStyle}
                      value={form.lastName}
                      onChange={handleChange("lastName")}
                      placeholder="Chen"
                      required
                    />
                  </div>
                </div>

                <label style={labelStyle}>{t("modal.email")}</label>
                <input
                  style={inputStyle}
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="a.chen@acmecorp.com"
                  required
                />

                <label style={labelStyle}>{t("modal.orgName")}</label>
                <input
                  style={inputStyle}
                  value={form.orgName}
                  onChange={handleChange("orgName")}
                  placeholder="e.g. Acme Corp Ltd"
                  required
                />

                <label style={labelStyle}>{t("modal.message")}</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder="Enter your enquiry details..."
                  required
                />

                <div style={{ margin: "2rem 0 1.5rem" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: T.teal900, marginBottom: 12 }}>
                    <input
                      type="checkbox"
                      checked={form.newsletter}
                      onChange={handleChange("newsletter")}
                      style={{ marginTop: 3 }}
                    />
                    <span>{t("modal.newsletter")}</span>
                  </label>

                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: T.teal900 }}>
                    <input
                      type="checkbox"
                      checked={form.terms}
                      onChange={handleChange("terms")}
                      style={{ marginTop: 3 }}
                      required
                    />
                    <span>
                      {renderLinkedTerms(t("modal.terms"), i18n.language || "en", TERMS_URL, PRIVACY_URL)}
                    </span>
                  </label>
                </div>

                <button type="submit" style={primaryBtnStyle} disabled={status === "submitting" || !form.terms}>
                  {status === "submitting" ? "Sending..." : t("modal.btnSend")}
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

// ─── Cookie Consent Banner
const CookieBanner = ({ onAccept, onRefuse }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("corporatehub_cookies_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAction = (status) => {
    localStorage.setItem("corporatehub_cookies_consent", status);
    setShow(false);
    if (status === "accepted") {
      onAccept();
    } else {
      onRefuse();
    }
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        right: 24,
        zIndex: 9999,
        background: "rgba(10, 31, 33, 0.96)",
        backdropFilter: "blur(16px)",
        border: `1.5px solid ${T.teal600}`,
        borderRadius: 12,
        padding: "2rem",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <h4 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: T.gold }}>
          {t("cookie.title")}
        </h4>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>
          {t("cookie.body")}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={() => handleAction("rejected")}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {t("cookie.btnRefuse")}
          </button>
          <button
            onClick={() => handleAction("accepted")}
            style={{
              background: T.gold,
              color: T.dark,
              border: "none",
              padding: "10px 20px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t("cookie.btnAccept")}
          </button>
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              padding: "10px",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {t("cookie.btnCustomize")}
          </button>
        </div>
        <a
          href={PRIVACY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 13, color: T.goldLt, textDecoration: "underline" }}
        >
          {t("cookie.linkText")}
        </a>
      </div>
    </div>
  );
};

// ─── App Root Component
export default function CorporateHub() {
  const { i18n } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("membership"); // "membership" | "contact"
  const [currentLang, setCurrentLang] = useState(localStorage.getItem("preferred_language") || i18n.language || "en");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    localStorage.setItem("preferred_language", lang);

    // Set RTL direction attribute on root element
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.className = "rtl-wrapper";
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.className = "ltr-wrapper";
    }
  };

  const openApply = () => {
    setModalType("membership");
    setModalOpen(true);
  };

  const openContact = () => {
    setModalType("contact");
    setModalOpen(true);
  };

  const handleResetCookies = () => {
    localStorage.removeItem("corporatehub_cookies_consent");
    window.location.reload();
  };

  useEffect(() => {
    handleLangChange(currentLang);
  }, []);

  return (
    <div style={{ background: "#fff", color: T.dark, overflowX: "hidden", paddingTop: 72 }}>
      <FontAndCursorLoader />
      <Nav
        onApply={openApply}
        currentLang={currentLang}
        onLangChange={handleLangChange}
        isMobile={isMobile}
      />
      <Hero onApply={openApply} isMobile={isMobile} />
      <TheNetwork isMobile={isMobile} />
      <Capabilities isMobile={isMobile} />
      <Trust isMobile={isMobile} />
      <Ecosystem isMobile={isMobile} />
      <Membership onApply={openApply} isMobile={isMobile} />
      <CTABar onApply={openApply} onContact={openContact} isMobile={isMobile} />
      <Footer
        onApply={openApply}
        onContact={openContact}
        onResetCookies={handleResetCookies}
        isMobile={isMobile}
      />
      <RequestAccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultType={modalType}
      />
      <CookieBanner onAccept={() => { }} onRefuse={() => { }} />
    </div>
  );
}
