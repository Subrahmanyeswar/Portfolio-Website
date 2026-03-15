/* ═══════════════════════════════════════════════════════
   Portfolio Data — Subrahmanyeswar Kolluru
   Single source of truth for all content.
   ═══════════════════════════════════════════════════════ */

// ─── Type Definitions ───────────────────────────────────

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  huggingface: string;
  portfolio: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  bullets: string[];
  githubUrl?: string;
  projectName?: string;
  metrics?: ProjectMetric[];
  paperTitle?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  bullets: string[];
  githubUrl: string;
  metrics: ProjectMetric[];
  featured: boolean;
  keyFeatures?: string[];
  isResearch?: boolean;
}

export interface Education {
  institution: string;
  institutionShort: string;
  degree: string;
  field: string;
  cgpa: string;
  period: string;
  location: string;
  logo?: string;
}

export interface Achievement {
  title: string;
  description: string;
  venue?: string;
  year: string;
  icon: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: SkillCategory[];
  experience: ExperienceEntry[];
  projects: Project[];
  education: Education;
  achievements: Achievement[];
  heroSubtitles: string[];
  heroStats: { label: string; value: string }[];
}

// ─── Data ───────────────────────────────────────────────

export const portfolioData: PortfolioData = {
  personal: {
    name: "Subrahmanyeswar Kolluru",
    firstName: "Subrahmanyeswar",
    lastName: "Kolluru",
    initials: "SK",
    title: "AI Engineer",
    tagline: "Building intelligent systems at the intersection of deep learning, edge AI, and large language models.",
    email: "subrahmanyeswarkolluru@gmail.com",
    phone: "+91 9640296002",
    location: "Andhra Pradesh, India",
    linkedin: "https://www.linkedin.com/in/subrahmanyeswar-kolluru-914694293",
    github: "https://github.com/Subrahmanyeswar",
    huggingface: "https://huggingface.co/Subrahmanyeswar",
    portfolio: "https://subrahmanyeswarkolluru.vercel.app",
  },

  heroSubtitles: [
    "Computer Vision Engineer",
    "LLM Systems Builder",
    "Edge AI Specialist",
    "Published AI Researcher",
  ],

  heroStats: [
    { label: "Edge AI", value: "447 FPS" },
    { label: "Face Recognition", value: "95%" },
    { label: "Published @ IIT Indore", value: "ICCCNT '25" },
  ],

  skills: [
    {
      category: "AI / ML",
      icon: "🧠",
      skills: [
        "PyTorch",
        "TensorFlow",
        "Scikit-learn",
        "OpenCV",
        "YOLO",
        "MediaPipe",
        "CNNs",
        "Transfer Learning",
        "ArcFace",
        "Face Recognition",
        "Python",
      ],
    },
    {
      category: "LLM & GenAI",
      icon: "🤖",
      skills: [
        "LangChain",
        "LlamaIndex",
        "Ollama",
        "Groq API",
        "RAG Pipelines",
        "Prompt Engineering",
        "Vector Databases",
        "Language Models",
        "Fine-tuning",
        "CrewAI",
      ],
    },
    {
      category: "AI Agents",
      icon: "⚡",
      skills: [
        "Multi-Agent Systems",
        "CrewAI",
        "Tool-Use Agents",
        "Autonomous Workflows",
        "Agent Orchestration",
        "Function Calling",
      ],
    },
    {
      category: "Deployment",
      icon: "🚀",
      skills: [
        "Docker",
        "FastAPI",
        "Streamlit",
        "Gradio",
        "TensorRT",
        "ONNX",
        "NVIDIA Jetson",
        "Edge Deployment",
        "REST APIs",
      ],
    },
    {
      category: "Data & DB",
      icon: "🗄️",
      skills: [
        "MySQL",
        "MongoDB",
        "Qdrant",
        "ChromaDB",
        "Pinecone",
        "Pandas",
        "NumPy",
        "Data Pipelines",
      ],
    },
    {
      category: "Dev Tools",
      icon: "🛠️",
      skills: [
        "Git",
        "GitHub",
        "VS Code",
        "Jupyter",
      ],
    },
  ],

  experience: [
    {
      role: "AI Engineering Intern",
      company: "READ Automation Pvt. Ltd.",
      location: "Chennai, India",
      period: "November 2025 – January 2026",
      type: "Internship",
      projectName: "Edge-Based Automated Optical Inspection System",
      githubUrl: "https://github.com/Subrahmanyeswar/Bottle-Cap-Inspection-System",
      bullets: [
        "Engineered a 4-stage Edge AI inspection pipeline (Video Acquisition → Motion Trigger → ROI Extraction → MobileNetV2 Inference) achieving 447 FPS at 2.23ms latency on a standard laptop CPU — a 23.8% throughput gain over the TensorFlow Lite baseline (361 FPS).",
        "Applied transfer learning on MobileNetV2 with ImageNet pre-trained weights, trained on ~200 custom images with data augmentation, achieving 95% overall classification accuracy and 100% recall on critical Missing Cap defects.",
        "Optimized inference using Intel OpenVINO FP16 quantization — reduced model size by 48% (8.9 MB → 4.6 MB) and CPU utilization by 15.1% (28.4% → 24.1%), enabling multi-stream capability on a single processor.",
        "Implemented motion-based triggering via frame differencing (Gaussian blur 21×21, binary threshold 15, pixel count >150), cutting idle inference overhead by 60% and reducing unnecessary compute.",
        "Applied CLAHE preprocessing (clip limit 3.0, 8×8 tile grid, LAB color space) ensuring robust detection accuracy above 92% across a 10× lighting range (200–2000 lux).",
      ],
      metrics: [
        { label: "Throughput", value: "447 FPS" },
        { label: "Latency", value: "2.23ms" },
        { label: "Accuracy", value: "95%" },
        { label: "Recall", value: "100%" },
        { label: "CPU Overhead", value: "-60%" },
        { label: "Size reduction", value: "48%" },
      ],
      paperTitle: "Edge-Based Automated Optical Inspection System for Bottle Manufacturing using Optimized MobileNetV2",
    },
  ],

  projects: [
    {
      name: "Aeternum Hub — Real time AI security system",
      tagline: "Real-time AI security with multi-stage threat detection and automated incident reporting",
      description: "A full-stack GPU-accelerated AI security platform. Detects people and threats in real-time using YOLO11m, recognizes faces with ArcFace, triggers a 3-stage progressive alert system (5s warning → 10s critical popup → 20s panic with SMS + voice call + video recording + AI-generated police report). 100% local processing — no cloud dependency. DPDP Act 2023 compliant.",
      tech: ["Python", "YOLO11m", "TensorRT", "ArcFace", "Moondream 2", "FastAPI", "Redis", "WebSocket", "Next.js", "NVIDIA RTX 3050"],
      bullets: [
        "Architected a full-stack AI security platform using YOLO11m (TensorRT) achieving <100ms detection latency at 25–30 FPS, with 3–5x GPU speedup over standard inference via TensorRT optimization on NVIDIA RTX 3050 6GB.",
        "Integrated ArcFace (buffalo_l) for face recognition using 512-dimensional embeddings achieving 95%+ accuracy and <2% false positive rate; implemented real-time identity switching with <100ms state change response.",
        "Built a 3-stage progressive threat alert system (5s → 10s → 20s) with automated SMS + voice call alerts, incident-triggered video recording (.webm), and Moondream 2 vision-language pipeline for AI-generated police reports in NP299 format.",
        "Designed a privacy-first, 100% local processing architecture (zero cloud dependency) ensuring full DPDP Act 2023 compliance; all face embeddings and video evidence stored locally with encrypted access control.",
        "Built full-stack system: Python + FastAPI backend with Redis Pub/Sub for real-time event streaming (<30ms latency), WebSocket for instant frontend updates, Next.js PWA frontend installable on iOS/Android.",
      ],
      githubUrl: "https://github.com/Subrahmanyeswar/aeternum-hub",
      metrics: [
        { label: "Latency", value: "<100ms" },
        { label: "Accuracy", value: "95%+" },
        { label: "GPU Speedup", value: "3–5x" },
        { label: "Detection", value: "25–30 FPS" },
        { label: "FPR", value: "<2%" },
        { label: "Local", value: "100%" },
        { label: "Alert", value: "3-stage" },
      ],
      featured: true,
      isResearch: true,
    },
    {
      name: "Jarvis AI Assistant",
      tagline: "Modular voice-controlled AI assistant with computer vision, PC automation, and productivity tools",
      description: "A fully modular, voice-enabled AI personal assistant that runs on desktop. Combines natural language chat (Groq API + LLaMA 3), speech-to-text, text-to-speech, face/object recognition security module, and full PC automation into one unified system. Two parallel modules: Security System (face + object detection) and AI Core (chat, productivity, automation).",
      tech: ["Python", "Groq API", "Meta LLaMA 3", "YOLOv8", "OpenCV", "Face Recognition", "Speech-to-Text", "Text-to-Speech", "NewsAPI", "OpenWeather API", "ONNX"],
      bullets: [
        "Built a modular voice-controlled AI assistant integrating Groq API (Meta LLaMA 3) for natural language conversation, speech-to-text, and text-to-speech — enabling fully hands-free PC interaction.",
        "Implemented a parallel security module using YOLOv8 for real-time object detection (8 classes) and face recognition for authorized/unauthorized person detection with automated voice alerts and facial expression analysis.",
        "Engineered PC automation capabilities including voice-controlled app open/close, voice typing, smart search across Google/YouTube/Amazon, auto form filling, scroll/click/tab switching, and system power controls (shutdown/restart/sleep).",
        "Built productivity module with to-do list manager, reminders, alarms, timers, live news updates (NewsAPI), weather reports (OpenWeather API), and world clock — all accessible through natural voice commands.",
        "Designed modular architecture (ai_core/, productivity/, pc_automation/, system/) with YOLO and face recognition models in a dedicated /models directory, enabling independent development and testing of each module.",
      ],
      githubUrl: "https://github.com/Subrahmanyeswar/Jarvis-AI-Assistant",
      metrics: [
        { label: "Modules", value: "5" },
        { label: "Response", value: "Instant" },
      ],
      featured: false,
      keyFeatures: [
        "Voice commands + natural chat (LLaMA 3 via Groq)",
        "Face recognition security (authorized/unauthorized)",
        "YOLOv8 object detection with live alerts",
        "Full PC automation via voice",
        "Productivity suite (tasks, reminders, weather, news)",
        "Facial expression detection",
        "Modular architecture — 5 independent modules",
      ],
    },
    {
      name: "Advanced RAG System & LLM Infrastructure",
      tagline: "Production-grade RAG pipeline with local LLM inference",
      description: "Production-grade RAG pipeline with local LLM inference.",
      tech: ["Python", "LangChain", "LlamaIndex", "Ollama", "Vector Databases", "Embeddings", "Local LLM Inference"],
      bullets: [
        "Built an end-to-end RAG pipeline with document ingestion, text chunking, embedding generation, and vector similarity search — enabling context-aware, grounded LLM responses with significantly reduced hallucinations.",
        "Deployed local LLM inference using Ollama for offline, zero-latency, zero-API-cost inference with open-source models; integrated with LangChain and LlamaIndex for pipeline orchestration.",
      ],
      githubUrl: "https://github.com/Subrahmanyeswar/Aeternum-AI-Advanced-RAG",
      metrics: [],
      featured: false,
    },
    {
      name: "Multi-Agent Competitive Intelligence Platform",
      tagline: "Autonomous multi-agent system for competitive landscape monitoring and intelligence reporting",
      description: "Autonomous multi-agent system for competitive landscape monitoring and intelligence reporting.",
      tech: ["Python", "CrewAI", "LLMs", "Multi-Agent Systems", "Agent Orchestration"],
      bullets: [
        "Designed a multi-agent orchestration pipeline using CrewAI with three specialized agent roles: Research Agents (continuous news/report collection), Analysis Agents (insight extraction + strategic pattern detection), and a Synthesizer Agent (cross-agent aggregation into structured weekly reports).",
        "Implemented autonomous task delegation between agents with parallel information processing — enabling simultaneous monitoring of multiple competitor companies with structured intelligence output generation.",
      ],
      githubUrl: "https://github.com/Subrahmanyeswar/multi-agent-competitive-intelligence",
      metrics: [],
      featured: false,
    },
  ],

  education: {
    institution: "Kalasalingam Academy of Research and Education",
    institutionShort: "KARE",
    degree: "B.Tech",
    field: "Artificial Intelligence & Machine Learning",
    cgpa: "8.27",
    period: "2023 – 2027",
    location: "Tamil Nadu, India",
    logo: "/kare-logo.jpeg",
  },

  achievements: [
    {
      title: "Research Publication — ICCCNT 2025",
      description:
        "Published a research paper on AI-powered exam proctoring with real-time computer vision at the International Conference on Computing, Communication and Networking Technologies (ICCCNT 2025), hosted at IIT Indore.",
      venue: "IIT Indore",
      year: "2025",
      icon: "📄",
    },
    {
      title: "Hackathon — 3rd Prize",
      description:
        "Secured 3rd place in a national level hackathon for building an innovative AI-powered solution under tight time constraints.",
      year: "2024",
      icon: "🏆",
    },
    {
      title: "National Project Expo — Top 10",
      description:
        "Selected in the Top 10 nationally at a major project exposition for demonstrating an AI/ML project with real-world impact and technical depth.",
      year: "2024",
      icon: "🎯",
    },
  ],
};
