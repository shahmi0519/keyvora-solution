import { useState, useEffect, useRef } from "react";
import profilePhoto from './image/Ahamed Shahmi.jpeg';

const PHOTO_B64 = "PHOTO_PLACEHOLDER";

const NAV_LINKS = ["About", "Services", "Work", "Reviews", "Contact"];

const SERVICES = [
  {
    icon: "🌐",
    title: "Web Design & Development",
    tag: "Web Presence",
    tagColor: "#1A5C3A",
    tagBg: "#D6F5E6",
    accent: "#00C47A",
    featured: true,
    desc: "Stunning static and dynamic websites — from lightning-fast portfolios and landing pages to full-featured React web apps with backend APIs. Every pixel intentional, every interaction smooth.",
    outcomes: [
      "Static sites: HTML/CSS/JS — blazing fast, SEO-ready",
      "Dynamic apps: React + Vite with state, routing, animations",
      "Full-stack: FastAPI backend + React frontend, deployed",
      "Mobile-first responsive design on every build",
      "Deployed to Vercel, Netlify, or your own server",
    ],
    techIcons: ["React", "Vite", "Tailwind", "HTML5", "CSS3", "FastAPI", "Vercel"],
  },
  {
    icon: "🔍",
    title: "RAG Pipeline Engineering",
    tag: "Knowledge Systems",
    tagColor: "#0C447C",
    tagBg: "#E6F1FB",
    accent: "#185FA5",
    desc: "Production-grade Retrieval-Augmented Generation systems with hybrid vector + keyword search, intelligent chunking, and FAISS/BM25 retrieval. Zero-hallucination data querying over proprietary knowledge bases.",
    outcomes: ["90%+ retrieval accuracy", "Hybrid semantic + keyword search", "Sub-second query latency"],
    techIcons: ["LangChain", "FAISS", "BM25", "Python", "Vector DBs"]
  },
  {
    icon: "⚡",
    title: "AI Agent & Automation",
    tag: "Workflow Automation",
    tagColor: "#3B6D11",
    tagBg: "#EAF3DE",
    accent: "#3B6D11",
    desc: "Autonomous multi-agent workflows using LangChain that automate complex, multi-step business operations — from data ingestion to decision-making — with full observability and fallback logic.",
    outcomes: ["End-to-end agentic workflows", "LangChain orchestration", "Intent-based routing"],
    techIcons: ["LangChain", "CrewAI", "Python", "FastAPI", "Automation"]
  },
  {
    icon: "👁",
    title: "Computer Vision Systems",
    tag: "Visual Intelligence",
    tagColor: "#854F0B",
    tagBg: "#FAEEDA",
    accent: "#854F0B",
    desc: "Real-time multi-modal vision pipelines combining CNNs, YOLO, Vision Transformers, and sensor fusion. Award-winning research-grade implementations deployed to edge devices.",
    outcomes: ["93.42% accuracy on edge", "113ms inference latency", "Multi-modal sensor fusion"],
    techIcons: ["OpenCV", "PyTorch", "TensorFlow", "YOLO", "Edge Computing"]
  },
  {
    icon: "💬",
    title: "AI-Powered Chatbots & Apps",
    tag: "Full-Stack AI",
    tagColor: "#533AB7",
    tagBg: "#EEEDFE",
    accent: "#533AB7",
    desc: "Full-stack production AI applications — FastAPI backends, React frontends, LLM integrations, and cloud deployment on AWS EC2 + Vercel. Built to serve real users, not just demos.",
    outcomes: ["FastAPI + React stack", "AWS EC2 + Vercel deployment", "Production-grade reliability"],
    techIcons: ["React", "FastAPI", "Docker", "AWS EC2", "LLM APIs"]
  },
  {
    icon: "✍️",
    title: "AI Technical Content",
    tag: "Thought Leadership",
    tagColor: "#993556",
    tagBg: "#FBEAF0",
    accent: "#993556",
    desc: "Deep-dive technical writing on MLOps, vector databases, RAG architectures, and LLM systems. Content that builds brand authority and establishes engineering credibility with technical audiences.",
    outcomes: ["Architecture-level depth", "MLOps & LLM coverage", "Publication-ready quality"],
    techIcons: ["Medium", "Technical Writing", "MLOps", "Architectures"]
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

// Point directly to your active local loopback runtime address
const BACKEND_API_URL = "http://127.0.0.1:8000";

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

function WebDevCard({ s }) {
  const [hovered, setHovered] = useState(false);
  if (!s) return null;

  return (
    <div
      className="webdev-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden",
        border: `1px solid rgba(0,196,122,${hovered ? "0.5" : "0.2"})`,
        background: hovered
          ? "linear-gradient(135deg, rgba(0,196,122,0.08) 0%, rgba(9,9,11,1) 60%)"
          : "linear-gradient(135deg, rgba(0,196,122,0.04) 0%, rgba(9,9,11,1) 60%)",
        transition: "all 0.4s ease",
        cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(0,196,122,${hovered ? "0.18" : "0.08"}) 0%, transparent 70%)`,
        transition: "all 0.4s ease", pointerEvents: "none",
      }} />
 
      <div className="webdev-grid">
        <div className="webdev-left" style={{ padding: "40px 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(0,196,122,0.12)", border: "1px solid rgba(0,196,122,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
            }}>🌐</div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{
                  background: "#D6F5E6", color: "#1A5C3A",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                  textTransform: "uppercase", padding: "3px 8px", borderRadius: 2
                }}>Web Presence</span>
                <span style={{
                  background: "rgba(0,196,122,0.15)", color: "#00C47A",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                  textTransform: "uppercase", padding: "3px 8px", borderRadius: 2,
                  border: "1px solid rgba(0,196,122,0.3)"
                }}>✦ New Service</span>
              </div>
            </div>
          </div>
 
          <h3 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 4vw, 30px)",
            color: "#FAFAF9", marginBottom: 14, letterSpacing: "-0.02em", lineHeight: 1.1
          }}>
            Web Design &<br />
            <span style={{ color: "#00C47A" }}>Development</span>
          </h3>
 
          <p style={{ fontSize: 14, color: "#A1A09A", lineHeight: 1.75, fontWeight: 300, marginBottom: 28 }}>
            From blazing-fast static landing pages to full-featured dynamic React applications with backend APIs. Every site is mobile-first, performance-optimized, and deployed — not just designed.
          </p>
 
          <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
            {[["Static", "HTML · CSS · JS · SEO-ready"], ["Dynamic", "React · Vite · API · Realtime"]].map(([type, sub]) => (
              <div key={type} style={{
                flex: "1 1 160px", padding: "12px 14px",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#00C47A", marginBottom: 4 }}>{type}</div>
                <div style={{ fontSize: 11, color: "#71706A" }}>{sub}</div>
              </div>
            ))}
          </div>
 
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {s?.techIcons?.map(t => (
              <span key={t} style={{
                background: "rgba(0,196,122,0.08)", color: "#00C47A",
                border: "1px solid rgba(0,196,122,0.2)",
                fontSize: 11, padding: "3px 10px", borderRadius: 2, fontWeight: 500
              }}>{t}</span>
            ))}
          </div>
        </div>
 
        <div style={{ padding: "40px 30px" }}>
          <div style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>What's included</div>
 
          {s?.outcomes?.map((o, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16,
              padding: "12px 14px",
              background: hovered ? "rgba(0,196,122,0.04)" : "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              transition: "all 0.3s ease",
            }}>
              <span style={{ color: "#00C47A", fontSize: 14, fontWeight: 700, marginTop: 1, flexShrink: 0 }}>→</span>
              <span style={{ fontSize: 13, color: "#A1A09A", lineHeight: 1.5 }}>{o}</span>
            </div>
          ))}
 
          <div className="webdev-metrics" style={{ marginTop: 24 }}>
            {[["100%", "Mobile First"], ["<1s", "Load Time"], ["∞", "Scalable"]].map(([n, l]) => (
              <div key={l} style={{
                background: "rgba(0,196,122,0.06)", border: "1px solid rgba(0,196,122,0.15)",
                padding: "14px 12px", textAlign: "center"
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "#00C47A" }}>{n}</div>
                <div style={{ fontSize: 10, color: "#71706A", marginTop: 4, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 
function ServicePanel({ s }) {
  if (!s) return null;
  return (
    <div className="service-panel" style={{ padding: "40px 30px", animation: "fadeIn 0.3s ease" }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: none; } }`}</style>
      <div style={{ fontSize: 40, marginBottom: 20 }}>{s.icon}</div>
      <span style={{ display: "inline-block", background: s.tagBg, color: s.tagColor, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 2, marginBottom: 20 }}>
        {s.tag}
      </span>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: "#FAFAF9", marginBottom: 20 }}>{s.title}</h3>
      <p style={{ fontSize: 15, color: "#A1A09A", lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>{s.desc}</p>
      
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
        <div style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>What you get</div>
        {(s.outcomes || []).map((o, i) => (
          <div key={i} style={{ fontSize: 14, color: "#A1A09A", marginBottom: 10, display: "flex", alignItems: "center" }}>
            <span style={{ color: s.accent || "#378ADD", marginRight: 10, fontWeight: 700 }}>→</span>{o}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(s.techIcons || []).map(t => (
          <span key={t} style={{ background: "rgba(255,255,255,0.06)", color: "#A1A09A", fontSize: 12, padding: "4px 10px", borderRadius: 2 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const nonFeaturedServices = SERVICES.filter(s => !s.featured);
  const [activeService, setActiveService] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", company: "", email: "", rating: 5, text: "" });
  const [reviewError, setReviewError] = useState("");

  // Hook to pull data with strict JSON structure validation guards
  useEffect(() => {
    fetch(`${BACKEND_API_URL}/api/reviews`)
      .then((res) => {
        if (!res.ok) {
          console.error(`Backend API validation failure tracking code: ${res.status}`);
          return [];
        }
        return res.json();
      })
      .then((data) => {
        // Validation Guard: Ensure payload is an iterable array so map loop doesn't crash
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error("FastAPI returned validation dictionary instead of an Array sequence:", data);
          setReviews([]);
        }
      })
      .catch((err) => {
        console.error("Network interface connection failure:", err);
        setReviews([]);
      });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
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


  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(newReview.email)) {
      setReviewError("Please provide a completely valid email format (e.g., alex@company.com).");
      return;
    }

    try {
     
      const response = await fetch(`${BACKEND_API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview)
      });

      
      const result = await response.json();

      if (response.ok) {
        
        const refreshedResponse = await fetch(`${BACKEND_API_URL}/api/reviews`);
        if (refreshedResponse.ok) {
          const refreshedData = await refreshedResponse.json();
          
          if (Array.isArray(refreshedData)) {
            setReviews(refreshedData);
          }
        }
        
        
        setReviewModalOpen(false);
        setNewReview({ name: "", company: "", email: "", rating: 5, text: "" });
        alert("Thank you! Your review has been saved to our database and is visible to everyone.");
      } else {
        
        const errorDetail = result.detail;
        if (typeof errorDetail === "string") {
          setReviewError(errorDetail);
        } else if (Array.isArray(errorDetail)) {
          
          setReviewError(errorDetail[0]?.msg || "Invalid input parameters submitted.");
        } else {
          setReviewError("Failed to process review submission parameters.");
        }
      }
    } catch (err) {
      setReviewError("Could not connect to the database server. Please try again later.");
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
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
        .grid-noise { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M60 0H0v60' stroke='rgba(255,255,255,0.03)' stroke-width='0.5'/%3E%3C/svg%3E"); }
        
        .service-btn { background: transparent; border: none; cursor: pointer; font-family: inherit; text-align: left; width: 100%; padding: 18px 24px; border-left: 2px solid transparent; transition: all 0.2s; }
        .service-btn:hover { background: rgba(255,255,255,0.03); }
        .service-btn.active { border-left-color: #378ADD; background: rgba(55,138,221,0.06); }
        .service-btn.active .svc-title { color: #FAFAF9; }
        .svc-title { font-size: 15px; font-weight: 500; color: #71706A; transition: color 0.2s; }
        .stack-pill { background: rgba(255,255,255,0.06); color: #A1A09A; font-size: 12px; padding: 4px 10px; border-radius: 2px; letter-spacing: 0.02em; }
        
        .input-field { background: #18181B; border: 1px solid rgba(255,255,255,0.1); color: #FAFAF9; padding: 14px 16px; font-size: 14px; font-family: inherit; width: 100%; transition: border-color 0.2s; outline: none; }
        .input-field:focus { border-color: rgba(55,138,221,0.6); }
        .input-field::placeholder { color: rgba(255,255,255,0.25); }
        .proj-tab { background: transparent; border: none; cursor: pointer; font-family: inherit; padding: 12px 20px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #71706A; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .proj-tab.active { color: #FAFAF9; border-bottom-color: #378ADD; }
        .link-arrow { display: inline-flex; align-items: center; gap: 6px; color: #378ADD; font-size: 13px; font-weight: 500; text-decoration: none; transition: gap 0.2s; }
        .link-arrow:hover { gap: 10px; }
        
        .nav-links-container { display: flex; gap: 40px; align-items: center; }
        .burger-menu { display: none; background: transparent; border: none; cursor: pointer; color: #FAFAF9; font-size: 24px; }
        .hero-flex { display: flex; align-items: flex-end; gap: 60px; flex-wrap: wrap; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .services-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 64px; gap: 20px; }
        .webdev-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .webdev-left { border-right: 1px solid rgba(255,255,255,0.06); }
        .webdev-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .services-tabs-layout { display: grid; grid-template-columns: 260px 1fr; gap: 0; border: 1px solid rgba(255,255,255,0.07); }
        .project-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
        .trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1; background: rgba(255,255,255,0.06); }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .footer-container { display: flex; justify-content: space-between; align-items: center; }
        
        .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; margin-top: 40px; }
        .review-card { background: #16161A; border: 1px solid rgba(255,255,255,0.06); padding: 32px; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between; position: relative; }
        
        .location-container { background: #16161A; border: 1px solid rgba(255,255,255,0.06); padding: 24px; border-radius: 4px; margin-top: 32px; display: flex; flex-direction: column; gap: 16px; }
        .map-wrapper { width: 100%; height: 180px; background-color: #222226; position: relative; border-radius: 2px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
        .map-bg-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.65; transition: opacity 0.3s ease, transform 0.4s ease; }
        .map-wrapper:hover .map-bg-img { opacity: 0.85; transform: scale(1.02); }
        .map-overlay-btn { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(18,18,20,0.4); text-decoration: none; transition: background 0.3s ease; }
        .map-wrapper:hover .map-overlay-btn { background: rgba(18,18,20,0.2); }

        .photo-frame { width: 320px; height: 400px; overflow: hidden; position: relative; flex-shrink: 0; }
        .photo-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .photo-accent { position: absolute; top: -12px; right: -12px; width: 100%; height: 100%; border: 1px solid rgba(55,138,221,0.3); z-index: -1; }
        .hero-title { font-family: 'Syne', sans-serif; font-weight: 800; line-height: 1.0; letter-spacing: -0.03em; }

        @media (max-width: 1024px) {
          .about-grid, .contact-grid, .project-grid { grid-template-columns: 1fr; gap: 48px; }
          .services-header { flex-direction: column; align-items: flex-start; }
          .services-header p { text-align: left; }
          .trust-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .nav-links-container { display: none; }
          .burger-menu { display: block; }
          .hero-flex { flex-direction: column; align-items: center; text-align: center; }
          .hero-flex p { margin: 0 auto 32px; }
          .hero-flex div { justify-content: center; }
          .photo-frame { width: 280px; height: 350px; }
          .webdev-grid { grid-template-columns: 1fr; }
          .webdev-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .services-tabs-layout { grid-template-columns: 1fr; }
          .services-tabs-layout > div:first-child { display: flex; overflow-x: auto; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .service-btn { min-width: 200px; border-left: none; border-bottom: 2px solid transparent; text-align: center; }
          .service-btn.active { border-left-color: transparent; border-bottom-color: #378ADD; }
          .form-row { grid-template-columns: 1fr; }
          .footer-container { flex-direction: column; gap: 20px; text-align: center; }
          .reviews-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .webdev-metrics { grid-template-columns: 1fr; }
          .trust-grid { grid-template-columns: 1fr; }
          .proj-tab { padding: 10px 12px; font-size: 11px; }
        }
      `}</style>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 5%", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled || mobileMenuOpen ? "rgba(9,9,11,0.95)" : "transparent", backdropFilter: scrolled || mobileMenuOpen ? "blur(12px)" : "none", borderBottom: scrolled || mobileMenuOpen ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.3s" }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
          <span style={{ color: "#FAFAF9" }}>Keyvora AI Solutions</span><span style={{ color: "#378ADD" }}>.</span>
        </div>
        
        <div className="nav-links-container">
          {NAV_LINKS.map(l => <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</span>)}
          <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }} onClick={() => scrollTo("contact")}>
            Hire Me
          </button>
        </div>

        <button className="burger-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        {mobileMenuOpen && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(9,9,11,0.98)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", padding: "20px 5%", gap: "20px", boxSizing: "border-box" }}>
            {NAV_LINKS.map(l => <span key={l} className="nav-link" style={{ fontSize: "16px", padding: "8px 0" }} onClick={() => scrollTo(l.toLowerCase())}>{l}</span>)}
            <button className="btn-primary" style={{ width: "100%", padding: "14px" }} onClick={() => scrollTo("contact")}>
              Hire Me
            </button>
          </div>
        )}
      </nav>

      <section id="hero" className="grid-noise" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "120px 5% 80px", position: "relative", overflow: "hidden", background: "linear-gradient(to bottom, #161619, #121214)", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", top: "15%", right: "-10%", width: "min(600px, 90vw)", height: "min(600px, 90vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(24,95,165,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "min(400px, 70vw)", height: "min(400px, 70vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(55,138,221,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ opacity: 0, animation: "fadeUp 1s ease 0.2s forwards" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, justifyContent: "inherit" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 12px #22C55E" }} />
              <span style={{ fontSize: 13, color: "#71706A", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>Available for new projects</span>
            </div>
          </div>

          <div className="hero-flex">
            <div style={{ flex: "1 1 300px" }}>
              <h1 className="hero-title" style={{ fontSize: "clamp(32px, 7vw, 56px)", color: "#FAFAF9", marginBottom: 32, opacity: 0, animation: "fadeUp 1s ease 0.4s forwards" }}>
                Full-Stack<br />
                <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>AI Engineer</span><br />
                <span style={{ color: "#378ADD" }}>& Builder</span>
              </h1>
              <div style={{ opacity: 0, animation: "fadeUp 1s ease 0.6s forwards" }}>
                <p style={{ fontSize: 17, color: "#A1A09A", lineHeight: 1.7, marginBottom: 32, fontWeight: 300, maxWidth: 480 }}>
                  I build production AI systems that generate measurable ROI — RAG pipelines, autonomous agents, computer vision, and full-stack LLM applications. Based in Sri Lanka, working globally.
                </p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <button className="btn-primary" onClick={() => scrollTo("work")}>View My Work</button>
                  <button className="btn-outline" onClick={() => scrollTo("contact")}>Start a Project</button>
                </div>
              </div>
            </div>

            <div style={{ opacity: 0, animation: "fadeUp 1s ease 0.5s forwards", position: "relative" }}>
              <div className="photo-frame">
                <img src={profilePhoto} alt="Ahamed Shahmi" />
              </div>
              <div className="photo-accent" />
            </div>
          </div>

          <div style={{ display: "flex", gap: "40px 48px", marginTop: 60, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)", opacity: 0, animation: "fadeUp 1s ease 0.8s forwards", flexWrap: "wrap" }}>
            {[["3+", "Production Systems Deployed"], ["10+", "AI Projects Completed"], ["93%", "Peak Model Accuracy"], ["3", "Deployed Cloud Platforms"]].map(([n, l]) => (
              <div key={n} style={{ flex: "1 1 160px", minWidth: "140px" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "#FAFAF9", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12, color: "#71706A", marginTop: 6, lineHeight: 1.4, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }`}</style>
      </section>

      <section id="about" style={{ padding: "120px 5%", borderTop: "1px solid rgba(255,255,255,0.06)", background: "#121214" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }} className="about-grid">
          <Reveal>
            <div style={{ fontSize: 12, color: "#378ADD", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>About</div>
            <h2 className="hero-title" style={{ fontSize: "clamp(32px, 4vw, 54px)", color: "#FAFAF9", marginBottom: 32, lineHeight: 1.1 }}>
              Engineering meets<br />Generative Intelligence
            </h2>
            <p style={{ fontSize: 16, color: "#A1A09A", lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>
              I'm Abdul Jabbar Ahamed Shahmi — an AI/ML and full-stack engineer. My background in computer vision, image processing, natural language processing and systems engineering gives me an edge over standard developers.
            </p>
            <p style={{ fontSize: 16, color: "#A1A09A", lineHeight: 1.8, fontWeight: 300 }}>
              I won 1st Place at the IEEE FYP Arena for a multi-modal AI system achieving 93% accuracy on edge hardware. That same precision and obsession with production-grade reliability is what I bring to every client project.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { label: "Recognition", value: "1st Place", sub: "IEEE FYP Arena" },
                { label: "Core Focus", value: "AI / MLOps", sub: "Production Systems" },
                { label: "Primary Stack", value: "Python + React", sub: "FastAPI + LangChain" },
                { label: "Cloud", value: "AWS EC2", sub: "Docker + Vercel" },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ background: "#1A1A1E", padding: "28px 24px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.02)" }}>
                  <div style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#FAFAF9", marginBottom: 4 }}>{value}</div>
                  <div style={{ fontSize: 12, color: "#71706A" }}>{sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" style={{ padding: "120px 5%", borderTop: "1px solid rgba(255,255,255,0.06)", background: "#16161A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div className="services-header">
              <div>
                <div style={{ fontSize: 12, color: "#378ADD", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Services</div>
                <h2 className="hero-title" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", color: "#FAFAF9" }}>What I build for you</h2>
              </div>
              <p style={{ maxWidth: 320, fontSize: 15, color: "#71706A", lineHeight: 1.7, fontWeight: 300 }}>
                Each engagement is scoped around concrete technical outcomes. I measure project success by what your business can do after.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <WebDevCard s={SERVICES.find(s => s.featured)} />
          </Reveal>

          <Reveal delay={120}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "40px 0 32px" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
              <span style={{ fontSize: 11, color: "#555550", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>AI & ML Services</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="services-tabs-layout">
              <div>
                {nonFeaturedServices.map((s, i) => (
                  <button
                    key={i}
                    className={`service-btn ${activeService === i ? "active" : ""}`}
                    onClick={() => setActiveService(i)}
                    style={{ borderLeftColor: window.innerWidth > 768 && activeService === i ? (s.accent || "#378ADD") : "transparent" }}
                  >
                    <div className="svc-title" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
                    <div className="svc-tag" style={{ color: activeService === i ? (s.accent || "#378ADD") : "#555550", fontSize: 11 }}>{s.tag}</div>
                  </button>
                ))}
              </div>
              {nonFeaturedServices[activeService] ? (
                <ServicePanel key={activeService} s={nonFeaturedServices[activeService]} />
              ) : (
                <div style={{ padding: 48, color: "#71706A" }}>Select an option to view details.</div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="work" style={{ padding: "120px 5%", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 12, color: "#378ADD", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Featured Work</div>
            <h2 className="hero-title" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", color: "#FAFAF9", marginBottom: 48 }}>Case studies</h2>
          </Reveal>

          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 0, display: "flex", overflowX: "auto" }}>
            {PROJECTS.map((p, i) => (
              <button key={i} className={`proj-tab ${activeProject === i ? "active" : ""}`} onClick={() => setActiveProject(i)} style={{ whiteSpace: "nowrap" }}>
                {p.name}
              </button>
            ))}
          </div>

          {(() => {
            const p = PROJECTS[activeProject];
            if (!p) return null;
            return (
              <div key={activeProject} style={{ border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", padding: "40px 5%", animation: "fadeIn 0.3s ease", boxSizing: "border-box" }}>
                <div className="project-grid">
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                      <span style={{ background: p.bgColor, color: p.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 2 }}>{p.status}</span>
                      <span style={{ color: "#71706A", fontSize: 13 }}>{p.year}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, color: "#FAFAF9", lineHeight: 1.1, marginBottom: 8 }}>{p.name}</h3>
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
                        {p.stack?.map(t => <span key={t} className="stack-pill">{t}</span>)}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {p.demo !== "#" && p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "#185FA5", color: "#FAFAF9", textAlign: "center", padding: "14px", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
                          ▶ Watch Demo
                        </a>
                      )}
                      {p.github !== "#" && p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#FAFAF9", textAlign: "center", padding: "14px", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
                          GitHub →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      <section id="reviews" style={{ padding: "120px 5%", background: "#16161A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <div style={{ fontSize: 12, color: "#378ADD", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Testimonials</div>
                <h2 className="hero-title" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", color: "#FAFAF9" }}>Customer Reviews</h2>
              </div>
              <button className="btn-outline" style={{ padding: "10px 24px", fontSize: 13 }} onClick={() => setReviewModalOpen(true)}>
                + Leave a Review
              </button>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="reviews-grid">
              {reviews.map((r, idx) => (
                <div key={idx} className="review-card">
                  <div>
                    <div style={{ display: "flex", color: "#F59E0B", gap: 4, marginBottom: 16, fontSize: "16px" }}>
                      {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                    </div>
                    <p style={{ fontSize: 15, color: "#A1A09A", lineHeight: 1.7, fontWeight: 300, marginBottom: 24, fontStyle: "italic" }}>
                      "{r.text}"
                    </p>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#FAFAF9" }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: "#71706A", marginTop: 2 }}>{r.company}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#555550" }}>{r.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {reviewModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(9,9,11,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
          <div style={{ background: "#121214", border: "1px solid rgba(255,255,255,0.1)", width: "100%", maxWidth: "540px", padding: 40, position: "relative" }}>
            <button style={{ position: "absolute", top: 20, right: 20, background: "transparent", border: "none", color: "#71706A", fontSize: 20, cursor: "pointer" }} onClick={() => setReviewModalOpen(false)}>✕</button>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 700, color: "#FAFAF9", marginBottom: 8 }}>Write a Review</h3>
            <p style={{ fontSize: 13, color: "#71706A", marginBottom: 24 }}>Provide your genuine evaluation. A valid email format is verified against testing burner setups.</p>
            
            {reviewError && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#EF4444", padding: "12px 16px", fontSize: 13, marginBottom: 16 }}>
                {reviewError}
              </div>
            )}

            <form onSubmit={handleReviewSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="form-row">
                <div>
                  <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Full Name</label>
                  <input className="input-field" type="text" required placeholder="Alex Johnson" value={newReview.name} onChange={e => setNewReview({ ...newReview, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Company / Role</label>
                  <input className="input-field" type="text" required placeholder="Tech Corp / CEO" value={newReview.company} onChange={e => setNewReview({ ...newReview, company: e.target.value })} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email Address</label>
                <input className="input-field" type="email" required placeholder="alex@company.com" value={newReview.email} onChange={e => setNewReview({ ...newReview, email: e.target.value })} />
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Rating</label>
                <select className="input-field" value={newReview.rating} onChange={e => setNewReview({ ...newReview, rating: parseInt(e.target.value) })} style={{ cursor: "pointer" }}>
                  <option value={5}>★★★★★ (5/5 Stars)</option>
                  <option value={4}>★★★★☆ (4/5 Stars)</option>
                  <option value={3}>★★★☆☆ (3/5 Stars)</option>
                  <option value={2}>★★☆☆☆ (2/5 Stars)</option>
                  <option value={1}>★☆☆☆☆ (1/5 Stars)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Review Content</label>
                <textarea className="input-field" required rows={4} placeholder="How was your experience working together?" value={newReview.text} onChange={e => setNewReview({ ...newReview, text: e.target.value })} style={{ resize: "none" }} />
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: 8 }}>
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}

      <section style={{ padding: "60px 5%", background: "#0D0D10", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="trust-grid">
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

      <section id="contact" style={{ padding: "120px 5%", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }} className="contact-grid">
          <Reveal>
            <div style={{ fontSize: 12, color: "#378ADD", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Contact</div>
            <h2 className="hero-title" style={{ fontSize: "clamp(32px, 3.5vw, 54px)", color: "#FAFAF9", lineHeight: 1.1, marginBottom: 24 }}>
              Let's build something<br />
              <span style={{ color: "#378ADD" }}>extraordinary</span>
            </h2>
            <p style={{ fontSize: 16, color: "#A1A09A", lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>
              Whether you need a production RAG system, an autonomous agent workflow, or a full-stack AI application — I'm ready to scope it, build it, and ship it.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Email", value: "shahmiahamed123@gmail.com", href: "mailto:shahmiahamed123@gmail.com" },
                { label: "LinkedIn", value: "ahamed-shahmi-abduljabbar", href: "https://www.linkedin.com/in/ahamed-shahmi-abduljabbar/" },
                { label: "GitHub", value: "shahmi0519", href: "https://github.com/shahmi0519" },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", minWidth: 70 }}>{label}</div>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="link-arrow" style={{ wordBreak: "break-all" }}>{value} <span>↗</span></a>
                </div>
              ))}
            </div>

            <div className="location-container">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "16px" }}>📍</span>
                <div style={{ fontSize: 11, color: "#378ADD", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>HQ Operations Base</div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#FAFAF9" }}>Keyvora Solutions, Sainthamaruthu, Ampara, Sri Lanka</div>
              
              <div className="map-wrapper">
                <img 
                  className="map-bg-img" 
                  src="https://maps.app.goo.gl/PnLANutaipG7ELLHA" 
                  alt="Sainthamaruthu, Ampara, Sri Lanka Location Map Overview" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <a 
                  href="https://maps.app.goo.gl/PnLANutaipG7ELLHA" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="map-overlay-btn"
                >
                  <span style={{ background: "rgba(9,9,11,0.85)", border: "1px solid rgba(255,255,255,0.15)", padding: "10px 18px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.04em", color: "#FAFAF9" }}>
                    🗺️ View Business Profile & Reviews on Maps
                  </span>
                </a>
              </div>
              <div style={{ fontSize: 12, color: "#71706A", marginTop: -4 }}>Distributed execution framework serving clients globally. Open 8:00 AM.</div>
            </div>
          </Reveal>
    
          <Reveal delay={150}>
            {formStatus === "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: 48, border: "1px solid rgba(55,138,221,0.3)", background: "rgba(55,138,221,0.04)" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, color: "#FAFAF9", marginBottom: 12 }}>Message Sent</h3>
                <p style={{ color: "#A1A09A", fontSize: 15, fontWeight: 300 }}>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="form-row">
                  <div>
                    <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name</label>
                    <input className="input-field" type="text" required placeholder="Alex Johnson" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
                    <input className="input-field" type="email" required placeholder="alex@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Service Needed</label>
                  <select className="input-field" required value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} style={{ cursor: "pointer" }}>
                    <option value="" disabled>Select a service...</option>
                    <option value="web">Web Design & Development</option>
                    <option value="rag">RAG Pipeline Engineering</option>
                    <option value="agents">AI Agent & Automation</option>
                    <option value="cv">Computer Vision Systems</option>
                    <option value="app">AI-Powered App / Chatbot</option>
                    <option value="content">AI Technical Content</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#71706A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
                  <textarea className="input-field" required rows={5} placeholder="Tell me about your project — what are you building, what does success look like?" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ resize: "vertical" }} />
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

      <footer style={{ padding: "40px 5%", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="footer-container">
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 16 }}>
            <span style={{ color: "#FAFAF9" }}>Keyvora AI Solutions</span><span style={{ color: "#378ADD" }}>.</span>
          </div>
          <p style={{ fontSize: 13, color: "#555550" }}>© 2026 Keyvora AI Solutions. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="https://www.linkedin.com/in/ahamed-shahmi-abduljabbar/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#71706A", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#FAFAF9"} onMouseLeave={e => e.target.style.color = "#71706A"}>LinkedIn</a>
            <a href="https://github.com/shahmi0519" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#71706A", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#FAFAF9"} onMouseLeave={e => e.target.style.color = "#71706A"}>GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
