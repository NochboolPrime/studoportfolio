import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─── IMAGES ─── */
const IMG_HERO = "https://cdn.poehali.dev/projects/77fcd083-3be9-46e5-a435-5ccf68d4c788/files/9fdfbd79-cd9e-402e-97f8-038fd869be97.jpg";
const IMG_1 = "https://cdn.poehali.dev/projects/77fcd083-3be9-46e5-a435-5ccf68d4c788/files/b79ce02f-8464-4d69-a4e4-35811dd60564.jpg";
const IMG_2 = "https://cdn.poehali.dev/projects/77fcd083-3be9-46e5-a435-5ccf68d4c788/files/db4e34e1-d9ff-422a-8803-0568e4ee45e0.jpg";
const IMG_3 = "https://cdn.poehali.dev/projects/77fcd083-3be9-46e5-a435-5ccf68d4c788/files/9fdfbd79-cd9e-402e-97f8-038fd869be97.jpg";

/* ─── DATA ─── */
const PORTFOLIO = [
  { id: 1, title: "Геометрия света", category: "брендинг", img: IMG_1, year: "2024" },
  { id: 2, title: "Минимал-студия", category: "дизайн", img: IMG_2, year: "2024" },
  { id: 3, title: "Тёмная материя", category: "иллюстрация", img: IMG_3, year: "2023" },
  { id: 4, title: "Золотое сечение", category: "брендинг", img: IMG_1, year: "2024" },
  { id: 5, title: "Архитектура форм", category: "дизайн", img: IMG_2, year: "2023" },
  { id: 6, title: "Портрет эпохи", category: "иллюстрация", img: IMG_3, year: "2024" },
];

const SERVICES = [
  { icon: "Layers", title: "Брендинг", desc: "Создаю уникальный визуальный язык бренда — от логотипа до полного гайдлайна." },
  { icon: "PenTool", title: "Дизайн интерфейсов", desc: "UI/UX для веб и мобильных приложений с фокусом на опыт пользователя." },
  { icon: "Image", title: "Иллюстрация", desc: "Авторская иллюстрация для редакций, издательств и рекламных кампаний." },
  { icon: "Film", title: "Моушн-дизайн", desc: "Анимация логотипов, рекламные ролики и кинематографичные интро." },
  { icon: "Type", title: "Типографика", desc: "Шрифтовые решения, леттеринг и работа с текстом как с изображением." },
  { icon: "Palette", title: "Арт-дирекция", desc: "Концепция и руководство визуальными проектами от идеи до финального результата." },
];

const TESTIMONIALS = [
  { name: "Анна Светлова", role: "CEO, Lumière Agency", text: "Работа превзошла все ожидания. Уникальный взгляд и безупречное исполнение — редкое сочетание в индустрии.", stars: 5 },
  { name: "Михаил Орлов", role: "Арт-директор, Nova Media", text: "Профессионал высочайшего класса. Умеет превратить абстрактную идею в визуальный шедевр.", stars: 5 },
  { name: "Елена Краснова", role: "Основатель, Forma Studio", text: "Сотрудничаем уже третий год подряд. Каждый проект — это открытие. Рекомендую без оговорок.", stars: 5 },
];

const CATEGORIES = ["все", "брендинг", "дизайн", "иллюстрация"];

/* ─── HOOK ─── */
function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── CUSTOM CURSOR ─── */
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const h = t.closest("button, a, .portfolio-card, .filter-pill");
      ringRef.current?.classList.toggle("hovering", !!h);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    let raf: number;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ─── PARALLAX BACKGROUND ─── */
function ParallaxBg() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = () => { if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * 0.35}px)`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute animate-pulse-glow"
        style={{ top: "25%", left: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)" }} />
      <div className="absolute animate-pulse-glow"
        style={{ top: "55%", right: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(120,60,200,0.12) 0%, transparent 70%)", animationDelay: "1.5s" }} />
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)" />
      </svg>
      <div className="absolute animate-float" style={{ top: 80, right: 128, width: 10, height: 10, background: "#D4AF37", opacity: 0.5, transform: "rotate(45deg)" }} />
      <div className="absolute animate-float" style={{ top: "33%", left: 64, width: 6, height: 6, background: "#D4AF37", opacity: 0.3, transform: "rotate(45deg)", animationDelay: "1s" }} />
      <div className="absolute animate-float" style={{ bottom: 160, right: "25%", width: 8, height: 8, background: "#D4AF37", opacity: 0.2, transform: "rotate(45deg)", animationDelay: "2s" }} />
      <div className="absolute animate-spin-slow"
        style={{ top: "60%", left: "35%", width: 200, height: 200, border: "1px solid rgba(212,175,55,0.07)", borderRadius: "50%" }} />
      <div className="absolute"
        style={{ top: "25%", right: "25%", width: 120, height: 120, border: "1px solid rgba(212,175,55,0.05)", borderRadius: "50%", animation: "spin-slow 25s linear infinite reverse" }} />
    </div>
  );
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(15,10,25,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.1)" : "none"
      }}>
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <button onClick={() => go("hero")} className="font-display text-2xl font-light tracking-widest" style={{ color: "var(--gold)", cursor: "none", background: "none", border: "none" }}>
          STUDIO
        </button>
        <div className="hidden md:flex items-center gap-10">
          {[["about", "О специалисте"], ["portfolio", "Портфолио"], ["services", "Услуги"], ["testimonials", "Отзывы"], ["contact", "Контакты"]].map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="nav-link" style={{ background: "none", border: "none" }}>{label}</button>
          ))}
        </div>
        <button onClick={() => go("contact")} className="btn-gold hidden md:block">Заявка</button>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--purple-deep)" }}>
      <ParallaxBg />
      <div className="noise-overlay" />
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="opacity-0-init animate-reveal-up mb-8 flex items-center gap-4">
              <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.6 }} />
              <span style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Творческая студия</span>
            </div>
            <h1 className="opacity-0-init animate-reveal-up delay-200 font-display glow-text"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--text-bright)" }}>
              Создаю<br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>красоту</em><br />
              из форм
            </h1>
            <p className="opacity-0-init animate-reveal-up delay-400 mt-8"
              style={{ color: "var(--text-dim)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 480 }}>
              Арт-директор и дизайнер с 10+ годами опыта. Специализируюсь на брендинге, иллюстрации и создании визуальных концепций.
            </p>
            <div className="opacity-0-init animate-reveal-up delay-600 mt-10 flex items-center gap-4 flex-wrap">
              <button className="btn-gold" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}>Смотреть работы</button>
              <button className="btn-outline-gold" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Обсудить проект</button>
            </div>
            <div className="opacity-0-init animate-reveal-up delay-800 mt-16 flex gap-12">
              {[["120+", "проектов"], ["10", "лет опыта"], ["40+", "клиентов"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display" style={{ fontSize: "2.5rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.3rem" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative opacity-0-init animate-reveal-scale delay-300">
            <div className="relative" style={{ maxWidth: 460, margin: "0 auto" }}>
              <div className="absolute pointer-events-none" style={{ inset: -16, border: "1px solid rgba(212,175,55,0.15)" }} />
              <div className="absolute pointer-events-none" style={{ inset: -32, border: "1px solid rgba(212,175,55,0.06)" }} />
              {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map(pos => (
                <div key={pos} className={`absolute ${pos}`} style={{ width: 14, height: 14, border: "1px solid var(--gold)", opacity: 0.9 }} />
              ))}
              <img src={IMG_HERO} alt="Специалист" className="w-full object-cover glow-gold" style={{ aspectRatio: "4/5", display: "block", filter: "contrast(1.05) saturate(0.85)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,10,25,0.45) 0%, transparent 55%)" }} />
              <div className="absolute -right-6 bottom-16 animate-float"
                style={{ background: "var(--purple-card)", border: "1px solid rgba(212,175,55,0.3)", padding: "0.875rem 1.25rem" }}>
                <div style={{ fontSize: "0.6rem", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Доступен</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-bright)" }}>для новых проектов</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.5 }}>
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--text-dim)" }}>скролл</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
      </div>
    </section>
  );
}

/* ─── MARQUEE ─── */
function Marquee() {
  const items = ["Брендинг", "·", "Иллюстрация", "·", "UI/UX", "·", "Моушн", "·", "Типографика", "·", "Арт-дирекция", "·"];
  return (
    <div style={{ background: "var(--gold)", overflow: "hidden", padding: "0.7rem 0" }}>
      <div style={{ display: "flex", width: "max-content", animation: "marquee 22s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--purple-deep)", padding: "0 1.5rem", whiteSpace: "nowrap" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT ─── */
function About() {
  const { ref, visible } = useInView();
  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="relative py-32 overflow-hidden" style={{ background: "var(--purple-mid)" }}>
      <div className="section-number">01</div>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 30, height: 1, background: "var(--gold)" }} />
              <span style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>О специалисте</span>
            </div>
            <h2 className="font-display mb-8" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, lineHeight: 1.1, color: "var(--text-bright)" }}>
              Я превращаю идеи <em style={{ color: "var(--gold)", fontStyle: "italic" }}>в образы</em>
            </h2>
            <p style={{ color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Начал карьеру в 2014 году в московских рекламных агентствах. Сотрудничал с международными брендами, создавал визуальные языки для стартапов и крупных корпораций.
            </p>
            <p style={{ color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Мой подход — сочетание строгой геометрии с органичностью форм. Я верю, что великий дизайн рождается на стыке рационального и интуитивного.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {["Adobe Suite", "Figma", "Cinema 4D", "After Effects", "Procreate"].map(tag => (
                <span key={tag} style={{ border: "1px solid rgba(212,175,55,0.3)", color: "var(--text-dim)", fontSize: "0.7rem", letterSpacing: "0.1em", padding: "0.4rem 1rem" }}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="grid grid-cols-2 gap-4">
              {[["2014", "Начало пути"], ["№1", "Рейтинг агентств"], ["12+", "Наград и премий"], ["5★", "Средняя оценка"]].map(([num, label]) => (
                <div key={label} className="service-card p-8 text-center">
                  <div className="font-display mb-2" style={{ fontSize: "3rem", fontWeight: 300, color: "var(--gold)" }}>{num}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)" }} />
    </section>
  );
}

/* ─── PORTFOLIO ─── */
function Portfolio() {
  const { ref, visible } = useInView();
  const [active, setActive] = useState("все");
  const [lightbox, setLightbox] = useState<typeof PORTFOLIO[0] | null>(null);
  const filtered = active === "все" ? PORTFOLIO : PORTFOLIO.filter(p => p.category === active);

  return (
    <section id="portfolio" ref={ref as React.RefObject<HTMLElement>} className="relative py-32 overflow-hidden" style={{ background: "var(--purple-deep)" }}>
      <div className="section-number">02</div>
      <div className="max-w-7xl mx-auto px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 30, height: 1, background: "var(--gold)" }} />
            <span style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Мои работы</span>
            <div style={{ width: 30, height: 1, background: "var(--gold)" }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "var(--text-bright)" }}>Портфолио</h2>
        </div>

        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} className={`filter-pill ${active === cat ? "active" : ""}`}>{cat}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <div key={item.id}
              className={`portfolio-card transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ aspectRatio: "4/3", transitionDelay: `${i * 0.1}s` }}
              onClick={() => setLightbox(item)}>
              <img src={item.img} alt={item.title} />
              <div className="overlay" />
              <div className="card-content">
                <div style={{ fontSize: "0.6rem", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{item.category} · {item.year}</div>
                <h3 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 300, color: "var(--text-bright)", lineHeight: 1.2 }}>{item.title}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)", fontSize: "0.7rem", marginTop: "0.75rem" }}>
                  <Icon name="Eye" size={12} />
                  <span>Подробнее</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 24, right: 24, color: "var(--gold)", background: "none", border: "none", zIndex: 10, cursor: "none" }}>
            <Icon name="X" size={28} />
          </button>
          <div className="relative w-full" style={{ maxWidth: 860, padding: "0 1rem" }} onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} style={{ width: "100%", maxHeight: "70vh", objectFit: "cover", border: "1px solid rgba(212,175,55,0.2)", display: "block" }} />
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ fontSize: "0.6rem", color: "var(--gold)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{lightbox.category} · {lightbox.year}</div>
              <h3 className="font-display" style={{ fontSize: "2rem", fontWeight: 300, color: "var(--text-bright)" }}>{lightbox.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── SERVICES ─── */
function Services() {
  const { ref, visible } = useInView();
  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} className="relative py-32 overflow-hidden" style={{ background: "var(--purple-mid)" }}>
      <div className="section-number">03</div>
      <div className="max-w-7xl mx-auto px-8">
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 30, height: 1, background: "var(--gold)" }} />
            <span style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Что я делаю</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "var(--text-bright)", maxWidth: 500 }}>
              Услуги и <em style={{ color: "var(--gold)", fontStyle: "italic" }}>направления</em>
            </h2>
            <button className="btn-outline-gold" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Обсудить проект</button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`service-card p-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 0.1}s` }}>
              <div style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>
                <Icon name={s.icon as "Layers"} fallback="Star" size={26} />
              </div>
              <h3 className="font-display mb-3" style={{ fontSize: "1.6rem", fontWeight: 300, color: "var(--text-bright)" }}>{s.title}</h3>
              <p style={{ color: "var(--text-dim)", lineHeight: 1.7, fontSize: "0.9rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function Testimonials() {
  const { ref, visible } = useInView();
  return (
    <section id="testimonials" ref={ref as React.RefObject<HTMLElement>} className="relative py-32 overflow-hidden" style={{ background: "var(--purple-deep)" }}>
      <div className="section-number">04</div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 600, height: 600, border: "1px solid rgba(212,175,55,0.04)", borderRadius: "50%" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 380, height: 380, border: "1px solid rgba(212,175,55,0.07)", borderRadius: "50%" }} />
      </div>
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 30, height: 1, background: "var(--gold)" }} />
            <span style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Мнения клиентов</span>
            <div style={{ width: 30, height: 1, background: "var(--gold)" }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "var(--text-bright)" }}>Отзывы</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`testimonial-card p-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 0.15}s` }}>
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.5rem" }}>
                {Array.from({ length: t.stars }).map((_, j) => <span key={j} style={{ color: "var(--gold)" }}>★</span>)}
              </div>
              <p className="font-display mb-6" style={{ color: "var(--text-bright)", fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.65, fontStyle: "italic" }}>
                «{t.text}»
              </p>
              <div style={{ borderTop: "1px solid rgba(212,175,55,0.1)", paddingTop: "1.25rem" }}>
                <div style={{ fontWeight: 600, color: "var(--text-bright)", fontSize: "0.85rem" }}>{t.name}</div>
                <div style={{ color: "var(--gold)", fontSize: "0.7rem", marginTop: "0.2rem" }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  const { ref, visible } = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} className="relative py-32 overflow-hidden" style={{ background: "var(--purple-mid)" }}>
      <div className="section-number">05</div>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 30, height: 1, background: "var(--gold)" }} />
              <span style={{ color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Связаться</span>
            </div>
            <h2 className="font-display mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "var(--text-bright)", lineHeight: 1.1 }}>
              Начнём <em style={{ color: "var(--gold)", fontStyle: "italic" }}>вместе?</em>
            </h2>
            <p style={{ color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "3rem" }}>
              Открыт к новым проектам, коллаборациям и интересным идеям. Расскажите о своём проекте — отвечаю в течение 24 часов.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { icon: "Mail", label: "Email", value: "hello@studio.com" },
                { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                { icon: "MapPin", label: "Локация", value: "Москва, Россия" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ color: "var(--gold)", width: 40, height: 40, border: "1px solid rgba(212,175,55,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={icon as "Mail"} fallback="Circle" size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.6rem", color: "var(--text-dim)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</div>
                    <div style={{ color: "var(--text-bright)", fontSize: "0.88rem", marginTop: "0.1rem" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {sent ? (
              <div className="service-card p-12 text-center">
                <div style={{ color: "var(--gold)", marginBottom: "1.5rem" }}><Icon name="CheckCircle" size={48} /></div>
                <h3 className="font-display mb-3" style={{ fontSize: "2rem", fontWeight: 300, color: "var(--text-bright)" }}>Сообщение отправлено!</h3>
                <p style={{ color: "var(--text-dim)" }}>Свяжусь с вами в течение 24 часов.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="service-card p-10" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { key: "name", label: "Ваше имя", type: "text", placeholder: "Как вас зовут?" },
                  { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: "0.6rem", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{label}</label>
                    <input type={type} required placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                      style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.2)", color: "var(--text-bright)", padding: "0.875rem 1rem", fontSize: "0.9rem", outline: "none", fontFamily: "'Golos Text'", cursor: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: "0.6rem", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Сообщение</label>
                  <textarea required rows={4} placeholder="Расскажите о вашем проекте..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.2)", color: "var(--text-bright)", padding: "0.875rem 1rem", fontSize: "0.9rem", resize: "vertical", outline: "none", fontFamily: "'Golos Text'", cursor: "none", boxSizing: "border-box" }} />
                </div>
                <button type="submit" className="btn-gold" style={{ width: "100%", display: "block", textAlign: "center" }}>Отправить заявку</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: "var(--purple-deep)", borderTop: "1px solid rgba(212,175,55,0.1)", padding: "2.5rem 2rem" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-xl tracking-widest" style={{ color: "var(--gold)", fontWeight: 300 }}>STUDIO</div>
        <div style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>© 2024 — Все права защищены</div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Behance", "Instagram", "Telegram"].map(name => (
            <a key={name} href="#" className="gold-link" style={{ fontSize: "0.75rem", letterSpacing: "0.1em", cursor: "none" }}>{name}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function Index() {
  return (
    <div style={{ background: "var(--purple-deep)", minHeight: "100vh" }}>
      <Cursor />
      <div className="noise-overlay" />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Portfolio />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
