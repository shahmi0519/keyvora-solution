import { useState, useEffect, useRef } from "react";
import profilePhoto from './image/Ahamed Shahmi.jpeg';

const PHOTO_B64 = "PHOTO_PLACEHOLDER";

const NAV_LINKS = ["About", "Services", "Work", "Contact"];

const SERVICES = [
  {
    icon: "🔍",
    title: "RAG Pipeline Engineering",
    tag: "Knowledge Systems",
    tagColor: "#0C447C",
    tagBg: "#E6F1FB",
    desc: "Production-grade Retrieval-Augmented Generation systems with hybrid vector + keyword search, intelligent chunking, and FAISS/BM25 retrieval. Zero-hallucination data querying over proprietary knowledge bases.",
    outcomes: ["90%+ retrieval accuracy", "Hybrid semantic + keyword search", "Sub-second query latency"],
  },
  {
    icon: "⚡",
    title: "AI Agent & Automation",
    tag: "Workflow Automation",
    tagColor: "#3B6D11",
    tagBg: "#EAF3DE",
    desc: "Autonomous multi-agent workflows using LangChain that automate complex, multi-step business operations — from data ingestion to decision-making — with full observability and fallback logic.",
    outcomes: ["End-to-end agentic workflows", "LangChain orchestration", "Intent-based routing"],
  },
  {
    icon: "👁",
    title: "Computer Vision Systems",
    tag: "Visual Intelligence",
    tagColor: "#854F0B",
    tagBg: "#FAEEDA",
    desc: "Real-time multi-modal vision pipelines combining CNNs, YOLO, Vision Transformers, and sensor fusion. Award-winning research-grade implementations deployed to edge devices.",
    outcomes: ["93.42% accuracy on edge", "113ms inference latency", "Multi-modal sensor fusion"],
  },
  {
    icon: "💬",
    title: "AI-Powered Chatbots & Apps",
    tag: "Full-Stack AI",
    tagColor: "#533AB7",
    tagBg: "#EEEDFE",
    desc: "Full-stack production AI applications — FastAPI backends, React frontends, LLM integrations, and cloud deployment on AWS EC2 + Vercel. Built to serve real users, not just demos.",
    outcomes: ["FastAPI + React stack", "AWS EC2 + Vercel deployment", "Production-grade reliability"],
  },
  {
    icon: "✍️",
    title: "AI Technical Content",
    tag: "Thought Leadership",
    tagColor: "#993556",
    tagBg: "#FBEAF0",
    desc: "Deep-dive technical writing on MLOps, vector databases, RAG architectures, and LLM systems. Content that builds brand authority and establishes engineering credibility with technical audiences.",
    outcomes: ["Architecture-level depth", "MLOps & LLM coverage", "Publication-ready quality"],
  },
];

const PROJECTS = [
  {
    name: "Arxia",
    subtitle: "Agentic RAG Research Assistant",
    year: "2026",
    status: "Live",
    color: "#185FA5",
    bgColor: "#E6F1FB",
    problem: "Researchers waste hours skimming dense AI/ML papers for specific technical concepts and comparisons.",
    solution: "Agentic RAG chatbot with 5-category intent classification, hybrid FAISS+BM25 retrieval over 25 landmark papers, and two-layer memory (session + cross-session SQLite).",
    impact: "Source-attributed answers with page-level citations. Zero unnecessary vector searches via intelligent routing.",
    stack: ["LangChain", "FAISS", "BM25", "Gemini 2.5", "FastAPI", "AWS EC2", "React", "Vercel"],
    // link: "https://arxiv-research-assistant.vercel.app",
    github: "https://github.com/shahmi0519/ArXiv-research-assistant",
    demo: "https://drive.google.com/file/d/1PNken4Ar-Uwc8To4LbdgiZYR5ItM2KTu/view?usp=sharing",
  },
  {
    name: "AI Resume Analyzer",
    subtitle: "ATS Intelligence Engine",
    year: "2026",
    status: "Live",
    color: "#3B6D11",
    bgColor: "#EAF3DE",
    problem: "Candidates submit resumes blind — no feedback on ATS compatibility, skill gaps, or alignment with specific JDs.",
    solution: "6-stage pipeline: PDF parsing → keyword extraction → semantic similarity via all-MiniLM-L6-v2 → Gemini 2.5 structured analysis → weighted scoring engine → actionable recommendations.",
    impact: "Multi-dimensional scoring across 5 dimensions, semantic keyword matching, and specific skill gap detection with improvement suggestions.",
    stack: ["Gemini 2.5 Flash", "all-MiniLM-L6-v2", "FastAPI", "pdfplumber", "React", "Tailwind"],
    // link: "#",
    github: "https://github.com/shahmi0519/ai_resume_analyzer",
    demo: "https://drive.google.com/file/d/1MI_z-y1Pfm1Fnj22SHRIGFb-Chi4ovv_/view?usp=sharing",
  },
  {
    name: "Produce Freshness AI",
    subtitle: "Multi-Modal Vision System",
    year: "2025",
    status: "Award Winner",
    color: "#854F0B",
    bgColor: "#FAEEDA",
    problem: "Produce freshness assessment is manual, subjective, and error-prone — causing waste and food safety issues.",
    solution: "Multi-modal AI fusing CNN image analysis with gas sensors, NIR spectroscopy, and metadata through early fusion. Deployed on portable edge hardware.",
    impact: "93.42% accuracy at 113ms inference latency on edge device. 1st Place, IEEE FYP Arena competition. Validated in real vegetable shop environments.",
    stack: ["TensorFlow", "PyTorch", "EfficientNet", "YOLO", "ViT", "Edge Deployment", "Sensor Fusion"],
    link: "#",
    github: "#",
    demo: "#",
  },
];

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeService, setActiveService] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      // Replace 'YOUR_FORM_ID' with the actual ID or URL you copied from Formspree
      const response = await fetch("https://formspree.io/f/mbdbyodl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("sent");
        // Reset the form data values back to empty strings
        setFormData({ name: "", email: "", service: "", message: "" });
      } else {
        setFormStatus("idle");
        alert("Oops! Something went wrong while sending the message.");
      }
    } catch (error) {
      setFormStatus("idle");
      alert("Network error. Please try again later.");
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#121214", color: "#FAFAF9", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #185FA5; color: #fff; }
        html { scroll-behavior: smooth; }
        .nav-link { cursor: pointer; color: #A1A09A; font-size: 14px; font-weight: 500; letter-spacing: 0.04em; transition: color 0.2s; text-decoration: none; }
        .nav-link:hover { color: #FAFAF9; }
        .btn-primary { background: #FAFAF9; color: #09090B; border: none; padding: 14px 32px; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .btn-primary:hover { background: #E5E5E3; transform: translateY(-1px); }
        .btn-outline { background: transparent; color: #FAFAF9; border: 1px solid rgba(255,255,255,0.2); padding: 14px 32px; font-size: 14px; font-weight: 500; letter-spacing: 0.04em; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .btn-outline:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.04); }
        .tag { display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; }
        .grid-noise { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M60 0H0v60' stroke='rgba(255,255,255,0.03)' stroke-width='0.5'/%3E%3C/svg%3E"); }
        .service-btn { background: transparent; border: none; cursor: pointer; font-family: inherit; text-align: left; width: 100%; padding: 18px 24px; border-left: 2px solid transparent; transition: all 0.2s; }
        .service-btn:hover { background: rgba(255,255,255,0.03); }
        .service-btn.active { border-left-color: #378ADD; background: rgba(55,138,221,0.06); }
        .service-btn.active .svc-title { color: #FAFAF9; }
        .svc-title { font-size: 15px; font-weight: 500; color: #71706A; transition: color 0.2s; }
        .svc-tag-label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 4px; }
        .stack-pill { background: rgba(255,255,255,0.06); color: #A1A09A; font-size: 12px; padding: 4px 10px; border-radius: 2px; letter-spacing: 0.02em; }
        .input-field { background: #18181B; border: 1px solid rgba(255,255,255,0.1); color: #FAFAF9; padding: 14px 16px; font-size: 14px; font-family: inherit; width: 100%; transition: border-color 0.2s; outline: none; }
        .input-field:focus { border-color: rgba(55,138,221,0.6); }
        .input-field::placeholder { color: rgba(255,255,255,0.25); }
        .input-field option{background: #FFFFFF, color: #09090B}
        .proj-tab { background: transparent; border: none; cursor: pointer; font-family: inherit; padding: 12px 20px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #71706A; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .proj-tab:hover { color: #A1A09A; }
        .proj-tab.active { color: #FAFAF9; border-bottom-color: #378ADD; }
        .link-arrow { display: inline-flex; align-items: center; gap: 6px; color: #378ADD; font-size: 13px; font-weight: 500; text-decoration: none; transition: gap 0.2s; }
        .link-arrow:hover { gap: 10px; }
        a { text-decoration: none; }
        .hero-title { font-family: 'Syne', sans-serif; font-weight: 800; line-height: 1.0; letter-spacing: -0.03em; }
        .photo-frame { width: 320px; height: 400px; overflow: hidden; position: relative; flex-shrink: 0; }
        .photo-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .photo-accent { position: absolute; top: -12px; right: -12px; width: 100%; height: 100%; border: 1px solid rgba(55,138,221,0.3); z-index: -1; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(9,9,11,0.9)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.3s" }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
          <span style={{ color: "#FAFAF9" }}>Keyvora AI Solutions</span><span style={{ color: "#378ADD" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          {NAV_LINKS.map(l => <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</span>)}
        </div>
        <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }} onClick={() => scrollTo("contact")}>
          Hire Me
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" className="grid-noise" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 40px 80px", position: "relative", overflow: "hidden", background: "linear-gradient(to bottom, #161619, #121214)" }}>
        <div style={{ position: "absolute", top: "15%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(24,95,165,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(55,138,221,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ opacity: 0, animation: "fadeUp 1s ease 0.2s forwards" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 12px #22C55E" }} />
              <span style={{ fontSize: 13, color: "#71706A", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>Available for new projects</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: 60, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <h1 className="hero-title" style={{ fontSize: "clamp(30px, 7vw, 50px)", color: "#FAFAF9", marginBottom: 32, opacity: 0, animation: "fadeUp 1s ease 0.4s forwards" }}>
                Full-Stack<br />
                <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>AI Engineer</span><br />
                <span style={{ color: "#378ADD" }}>& Builder</span>
              </h1>
              <div style={{ opacity: 0, animation: "fadeUp 1s ease 0.6s forwards" }}>
                <p style={{ fontSize: 17, color: "#A1A09A", lineHeight: 1.7, marginBottom: 32, fontWeight: 300, maxWidth: 480 }}>
                  I build production AI systems that generate measurable ROI — RAG pipelines, autonomous agents, computer vision, and full-stack LLM applications. Based in Sri Lanka, working globally.
                </p>
                <div style={{ display: "flex", gap: 16 }}>
                  <button className="btn-primary" onClick={() => scrollTo("work")}>View My Work</button>
                  <button className="btn-outline" onClick={() => scrollTo("contact")}>Start a Project</button>
                </div>
              </div>
            </div>

            {/* PHOTO */}
            <div style={{ opacity: 0, animation: "fadeUp 1s ease 0.5s forwards", position: "relative" }}>
              <div className="photo-frame">
                <img src={profilePhoto} alt="Ahamed Shahmi" />
              </div>
              <div className="photo-accent" />
            </div>
          </div>

          {/* STATS */}
          <div style={{ display: "flex", gap: 48, marginTop: 60, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)", opacity: 0, animation: "fadeUp 1s ease 0.8s forwards", flexWrap: "wrap" }}>
            {[["3+", "Production Systems Deployed"], ["10+", "AI Projects Completed"], ["93%", "Peak Model Accuracy"], ["3", "Deployed Cloud Platforms"]].map(([n, l]) => (
              <div key={n}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "#FAFAF9", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12, color: "#71706A", marginTop: 6, lineHeight: 1.4, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }`}</style>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "120px 40px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "#121214" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <Reveal>
            <div style={{ fontSize: 12, color: "#378ADD", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>About</div>
            <h2 className="hero-title" style={{ fontSize: "clamp(36px, 4vw, 54px)", color: "#FAFAF9", marginBottom: 32, lineHeight: 1.1 }}>
              Engineering meets<br />Generative Intelligence
            </h2>
            <p style={{ fontSize: 16, color: "#A1A09A", lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>
              I'm Abdul Jabbar Ahamed Shahmi — an AI/ML and full-stack engineer. My background in computer vision, image processing, natural language processing and systems engineering gives me an edge most AI developers.
            </p>
            <p style={{ fontSize: 16, color: "#A1A09A", lineHeight: 1.8, fontWeight: 300 }}>
              I won 1st Place at the IEEE FYP Arena for a multi-modal AI system achieving 93% accuracy on edge hardware. That same precision and obsession with production-grade systems is what I bring to every client project.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.06)" }}>
              {[
                // { label: "Degree", value: "BSc Hons EIE", sub: "University of Ruhuna" },
                // { label: "GPA", value: "3.5 / 4.0", sub: "Second Class Upper" },
                { label: "Recognition", value: "1st Place", sub: "IEEE FYP Arena" },
                { label: "Core Focus", value: "AI / MLOps", sub: "Production Systems" },
                { label: "Primary Stack", value: "Python + React", sub: "FastAPI + LangChain" },
                { label: "Cloud", value: "AWS EC2", sub: "Docker + Vercel" },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ background: "#1A1A1E", padding: "28px 24px", borderRadius: "4px" }}>
                  <div style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#FAFAF9", marginBottom: 4 }}>{value}</div>
                  <div style={{ fontSize: 12, color: "#71706A" }}>{sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "120px 40px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "#16161A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
              <div>
                <div style={{ fontSize: 12, color: "#378ADD", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Services</div>
                <h2 className="hero-title" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", color: "#FAFAF9" }}>What I build for you</h2>
              </div>
              <p style={{ maxWidth: 320, fontSize: 15, color: "#71706A", lineHeight: 1.7, textAlign: "right", fontWeight: 300 }}>
                Each engagement is scoped around outcomes, not hours. I measure success by what your business can do after.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0, border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
              {SERVICES.map((s, i) => (
                <button key={i} className={`service-btn ${activeService === i ? "active" : ""}`} onClick={() => setActiveService(i)}>
                  <div className="svc-title">{s.title}</div>
                  <div className="svc-tag-label" style={{ color: activeService === i ? "#378ADD" : "#555550" }}>{s.tag}</div>
                </button>
              ))}
            </div>
            <div style={{ padding: 48 }}>
              {(() => {
                const s = SERVICES[activeService];
                return (
                  <div key={activeService} style={{ animation: "fadeIn 0.3s ease" }}>
                    <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: none; } }`}</style>
                    <div style={{ fontSize: 40, marginBottom: 20 }}>{s.icon}</div>
                    <span className="tag" style={{ background: s.tagBg, color: s.tagColor, marginBottom: 20, display: "inline-block" }}>{s.tag}</span>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: "#FAFAF9", marginBottom: 20 }}>{s.title}</h3>
                    <p style={{ fontSize: 15, color: "#A1A09A", lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>{s.desc}</p>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
                      <div style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>What you get</div>
                      {s.outcomes.map((o, i) => (
                        <div key={i} style={{ fontSize: 14, color: "#A1A09A", marginBottom: 10, display: "flex", alignItems: "center" }}>
                          <span style={{ color: "#378ADD", marginRight: 10, fontWeight: 600 }}>→</span>{o}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" style={{ padding: "120px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 12, color: "#378ADD", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Featured Work</div>
            <h2 className="hero-title" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", color: "#FAFAF9", marginBottom: 48 }}>Case studies</h2>
          </Reveal>

          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 0, display: "flex" }}>
            {PROJECTS.map((p, i) => (
              <button key={i} className={`proj-tab ${activeProject === i ? "active" : ""}`} onClick={() => setActiveProject(i)}>
                {p.name}
              </button>
            ))}
          </div>

          {(() => {
            const p = PROJECTS[activeProject];
            return (
              <div key={activeProject} style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", padding: 48, animation: "fadeIn 0.3s ease" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                      <span style={{ background: p.bgColor, color: p.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 2 }}>{p.status}</span>
                      <span style={{ color: "#71706A", fontSize: 13 }}>{p.year}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: "#FAFAF9", lineHeight: 1.1, marginBottom: 8 }}>{p.name}</h3>
                    <p style={{ color: "#71706A", fontSize: 15, marginBottom: 40 }}>{p.subtitle}</p>

                    <div style={{ marginBottom: 28 }}>
                      <div style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>The Problem</div>
                      <p style={{ fontSize: 15, color: "#A1A09A", lineHeight: 1.7, fontWeight: 300 }}>{p.problem}</p>
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <div style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>The Solution</div>
                      <p style={{ fontSize: 15, color: "#A1A09A", lineHeight: 1.7, fontWeight: 300 }}>{p.solution}</p>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Impact</div>
                      <p style={{ fontSize: 15, color: "#FAFAF9", lineHeight: 1.7, fontWeight: 400 }}>{p.impact}</p>
                    </div>
                  </div>

                  <div>
                    <div style={{ background: "#0D0D10", border: "1px solid rgba(255,255,255,0.07)", padding: 32, marginBottom: 24 }}>
                      <div style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>Tech Stack</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {p.stack.map(t => <span key={t} className="stack-pill">{t}</span>)}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {p.demo !== "#" && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "#185FA5", color: "#FAFAF9", textAlign: "center", padding: "14px", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
                          ▶ Watch Demo
                        </a>
                      )}
                      <div style={{ display: "flex",flexDirection: "column", gridTemplateColumns: p.link !== "#" ? "1fr 1fr" : "1fr", gap: 12 }}>
                        {/* {p.link !== "#" && (
                          <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#FAFAF9", textAlign: "center", padding: "14px", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
                            Live Site ↗
                          </a>
                        )} */}
                        {p.github !== "#" && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#FAFAF9", textAlign: "center", padding: "14px", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
                            GitHub →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ padding: "80px 40px", background: "#0D0D10", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)" }}>
            {[
              { n: "AWS EC2", l: "Cloud Platform" },
              { n: "LangChain", l: "AI Framework" },
              { n: "Gemini 2.5", l: "LLM Provider" },
              { n: "FastAPI", l: "Backend" },
            ].map(({ n, l }) => (
              <Reveal key={n}>
                <div style={{ background: "#0D0D10", padding: "32px 24px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#FAFAF9", marginBottom: 6 }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#71706A", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "120px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <Reveal>
            <div style={{ fontSize: 12, color: "#378ADD", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Contact</div>
            <h2 className="hero-title" style={{ fontSize: "clamp(32px, 3.5vw, 54px)", color: "#FAFAF9", lineHeight: 1.1, marginBottom: 24 }}>
              Let's build something<br />
              <span style={{ color: "#378ADD" }}>extraordinary</span>
            </h2>
            <p style={{ fontSize: 16, color: "#A1A09A", lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
              Whether you need a production RAG system, an autonomous agent workflow, or a full-stack AI application — I'm ready to scope it, build it, and ship it.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Email", value: "shahmiahamed123@gmail.com", href: "mailto:shahmiahamed123@gmail.com" },
                { label: "LinkedIn", value: "ahamed-shahmi-abduljabbar", href: "https://www.linkedin.com/in/ahamed-shahmi-abduljabbar/" },
                { label: "GitHub", value: "shahmi0519", href: "https://github.com/shahmi0519" },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", minWidth: 70 }}>{label}</div>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="link-arrow">{value} <span>↗</span></a>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            {formStatus === "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: 48, border: "1px solid rgba(55,138,221,0.3)", background: "rgba(55,138,221,0.04)" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 700, color: "#FAFAF9", marginBottom: 12 }}>Message Sent</h3>
                <p style={{ color: "#A1A09A", fontSize: 15, fontWeight: 300 }}>I'll get back to you within 24 hours. Looking forward to talking.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name</label>
                    <input className="input-field" type="text" name="name" required placeholder="Alex Johnson" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
                    <input className="input-field" type="email" name="email" required placeholder="alex@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Service Needed</label>
                  <select className="input-field" name="service" required value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} style={{ cursor: "pointer" }}>
                    <option value="" disabled>Select a service...</option>
                    <option value="rag">RAG Pipeline Engineering</option>
                    <option value="agents">AI Agent & Automation</option>
                    <option value="cv">Computer Vision Systems</option>
                    <option value="app">AI-Powered App / Chatbot</option>
                    <option value="content">AI Technical Content</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
                  <textarea className="input-field" name="" required rows={5} placeholder="Tell me about your project — what problem are you solving, what data do you have, what does success look like?" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ resize: "vertical" }} />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }} disabled={formStatus === "sending"}>
                  {formStatus === "sending" ? "Sending..." : "Send Message →"}
                </button>
                <p style={{ fontSize: 12, color: "#555550" }}>
                  Or email directly: <a href="mailto:shahmiahamed123@gmail.com" style={{ color: "#378ADD" }}>shahmiahamed123@gmail.com</a>
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 16 }}>
          <span style={{ color: "#FAFAF9" }}>Keyvora AI Solutions</span><span style={{ color: "#378ADD" }}>.</span>
        </div>
        <p style={{ fontSize: 13, color: "#555550" }}>© 2026 Keyvora AI Solutions. All rights reserved.</p>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="https://www.linkedin.com/in/ahamed-shahmi-abduljabbar/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#71706A", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#FAFAF9"} onMouseLeave={e => e.target.style.color = "#71706A"}>LinkedIn</a>
          <a href="https://github.com/shahmi0519" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#71706A", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#FAFAF9"} onMouseLeave={e => e.target.style.color = "#71706A"}>GitHub</a>
        </div>
      </footer>
    </div>
  );
}
