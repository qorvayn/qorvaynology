export interface ServiceItem {
  index: string;
  id: string;
  title: string;
  shortLabel: string;
  timeline: string;
  usdRange: string;
  bdtRange: string;
  summary: string;
  deliverables: string[];
  relatedProjects: string[];
  accentHue: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: "Live Beta" | "Parent Ecosystem" | "In Progress" | "Brand System" | "Concept";
  dateLabel: string;
  year: string;
  clientOrOwner: string;
  services: string;
  stack: string;
  liveUrl?: string;
  summary: string;
  problemAndGoal: string;
  architectureAndExecution: string[];
  metrics: { label: string; value: string; note: string }[];
  palette: { bg: string; primary: string; secondary: string; accent: string };
}

export interface PricingPackage {
  id: string;
  name: string;
  timeline: string;
  summary: string;
  tiers: {
    tierName: "Basic" | "Standard" | "Premium";
    subtitle: string;
    usd: string;
    bdt: string;
    features: string[];
  }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: string;
  location: string;
  quote: string;
  focusAreas: string[];
  initials: string;
  tone: string;
}

export interface InsightArticle {
  id: string;
  day: string;
  month: string;
  year: string;
  readTime: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  body: string[];
  keyTakeaways: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const HERO_SERVICES = [
  { id: "brand-identity", label: "Brand Identity Systems" },
  { id: "ui-ux-design", label: "UI/UX & Product Design" },
  { id: "websites-ecommerce", label: "Launch Websites & E-Commerce" },
  { id: "fullstack-webapps", label: "Full-Stack Web Apps & MVPs" },
];

export const STUDIO_FACTS = [
  {
    value: "04",
    sup: "+",
    title: "QORVAYN Products & Ventures",
    description:
      "Built by the team shipping Orbyn (live couples web app), SnowVayn / SunVayn seasonal commerce, and the QORVAYN ecosystem.",
  },
  {
    value: "30",
    sup: "d",
    title: "Post-Launch Support Window",
    description:
      "Every website and web application ships with a structured launch checklist, full code handover, and 30 days of included support.",
  },
  {
    value: "2026",
    sup: "",
    title: "Year of Establishment",
    description:
      "QORVAYN was founded on 10 March 2026 in Bangladesh; Qorvaynology brings our internal product engineering method to client teams worldwide.",
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    index: "/01",
    id: "brand-identity",
    title: "Brand Identity",
    shortLabel: "Visual Identity & Guidelines",
    timeline: "1–2 weeks",
    usdRange: "$400 – $1,200",
    bdtRange: "৳25,000 – ৳60,000",
    summary:
      "We define your visual architecture, typography, colour system, and brand guidelines so your business looks unmistakable across every touchpoint.",
    deliverables: [
      "Primary mark, wordmark & responsive lockups (SVG, PNG, PDF)",
      "Dark & light surface colour architecture with WCAG contrast specs",
      "Optical typography pairing & hierarchy rules",
      "Complete Brand Guidelines book & social launch kit",
    ],
    relatedProjects: ["Qorvaynology Continuum", "QORVAYN", "SnowVayn"],
    accentHue: "from-[#2E6BFF] via-[#1E3A8A] to-[#050B1C]",
  },
  {
    index: "/02",
    id: "ui-ux-design",
    title: "UI/UX & Product Design",
    shortLabel: "Figma Systems & Prototypes",
    timeline: "1–3 weeks",
    usdRange: "$500 – $2,500",
    bdtRange: "৳30,000 – ৳1,20,000",
    summary:
      "Human-centered interface architecture that turns complex workflows into calm, tactile product experiences ready for engineering handoff.",
    deliverables: [
      "User flows, information architecture & wireframes",
      "Tokenized Figma component library & design system",
      "Interactive high-fidelity desktop & mobile prototypes",
      "Developer-ready specs, states & motion guidelines",
    ],
    relatedProjects: ["Orbyn Web App", "SnowVayn Storefront", "Aether Clinic (Concept)"],
    accentHue: "from-[#3B82F6] via-[#1D4ED8] to-[#050B1C]",
  },
  {
    index: "/03",
    id: "websites-ecommerce",
    title: "Launch Websites & E-Commerce",
    shortLabel: "Custom Next.js Sites & Stores",
    timeline: "2–4 weeks",
    usdRange: "$800 – $4,000",
    bdtRange: "৳40,000 – ৳1,50,000",
    summary:
      "Fast, editorial websites and conversion-focused e-commerce stores engineered from scratch — no bloated page builders or generic templates.",
    deliverables: [
      "Custom responsive frontend built in Next.js, React & Tailwind CSS",
      "Product catalog, cart, checkout & local/international payment flows",
      "Technical SEO, OpenGraph metadata, schema markup & analytics",
      "Launch checklist + 30 days of post-launch engineering support",
    ],
    relatedProjects: ["QORVAYN Flagship", "SnowVayn / SunVayn", "Qorvaynology Studio"],
    accentHue: "from-[#60A5FA] via-[#1E3A8A] to-[#050B1C]",
  },
  {
    index: "/04",
    id: "fullstack-webapps",
    title: "Full-Stack Web Apps & MVPs",
    shortLabel: "Next.js 15, React 19 & Supabase",
    timeline: "4–10 weeks",
    usdRange: "$3,000 – $12,000+",
    bdtRange: "৳2,00,000+",
    summary:
      "From product discovery to production launch: we architect and ship real-time web applications using the exact stack behind our own products.",
    deliverables: [
      "Product discovery, database schema design & API architecture",
      "Authentication, role-based access & real-time state with Supabase",
      "Next.js 15 App Router, React 19 & TypeScript production codebase",
      "Vercel edge deployment, monitoring & 30-day post-launch support",
    ],
    relatedProjects: ["Orbyn (Live Beta)", "QORVAYN Core"],
    accentHue: "from-[#2563EB] via-[#0F2557] to-[#040711]",
  },
  {
    index: "/05",
    id: "ai-automation",
    title: "AI Workflow Automation",
    shortLabel: "Internal Tools & AI Assistants",
    timeline: "1–3 weeks",
    usdRange: "$500 – $3,000",
    bdtRange: "৳30,000 – ৳1,50,000",
    summary:
      "Practical AI integrations and automated internal pipelines that save hours of manual operations for lean teams — built for reliability, not hype.",
    deliverables: [
      "Custom domain-specific AI assistants & knowledge retrieval",
      "Automated lead triage, CRM sync & document processing workflows",
      "On-device or API-driven media/data pipelines (like Orbyn's AI planner)",
      "Team documentation, guardrails & cost-controlled model routing",
    ],
    relatedProjects: ["Orbyn AI Date Planner", "Studio Ops Pipeline"],
    accentHue: "from-[#93C5FD] via-[#1E40AF] to-[#050B1C]",
  },
  {
    index: "/06",
    id: "growth-retainer",
    title: "Growth Retainer & Care Plan",
    shortLabel: "Ongoing Product & Brand Partner",
    timeline: "Ongoing monthly",
    usdRange: "$500 – $2,000 / mo",
    bdtRange: "৳20,000 – ৳60,000 / mo",
    summary:
      "A dedicated design and engineering pod on retainer for continuous shipping, new landing pages, social content systems, and monthly performance reviews.",
    deliverables: [
      "Continuous website/app feature iterations & conversion experiments",
      "Social media visual systems, campaign graphics & ad creative",
      "Security updates, uptime monitoring, backups & speed optimization",
      "Clear Friday progress reports & monthly strategy review",
    ],
    relatedProjects: ["QORVAYN Ecosystem", "Partner Retainers"],
    accentHue: "from-[#2E6BFF] via-[#0B1B46] to-[#040711]",
  },
];

export const PROJECTS_LIST: ProjectCaseStudy[] = [
  {
    id: "orbyn",
    title: "Orbyn",
    subtitle: "Private Shared Digital Space for Long-Distance Couples",
    category: "Full-Stack Web App & Product Design",
    badge: "Live Beta",
    dateLabel: "Nov 2026",
    year: "2026",
    clientOrOwner: "QORVAYN In-House Product (Live Beta)",
    services: "Product Strategy, UI/UX System, Full-Stack Next.js 15 + Supabase Build",
    stack: "Next.js 15, React 19, TypeScript, Tailwind CSS, Supabase Realtime, Vercel",
    liveUrl: "https://cal.com/qorvaynology",
    summary:
      "Orbyn is QORVAYN's flagship consumer web application in live beta — a calm, private shared space designed specifically for long-distance couples to feel present together in real time.",
    problemAndGoal:
      "Generic messaging apps bury meaningful moments under noisy chat threads. We set out to engineer a dedicated, low-latency shared room where two people can see live presence, answer a daily question together, leave voice notes, build a shared memory vault, plan dates with AI, and take live two-person photobooth snapshots from different cities.",
    architectureAndExecution: [
      "Engineered real-time presence channels and synchronized state over Supabase Realtime so both partners see instant status without page refreshes.",
      "Built a live two-person Photobooth with client-side on-device background removal, compositing two remote camera feeds into a single keepsake frame.",
      "Designed an intimate, distraction-free interface system with tactile cards for Daily Questions, Voice Notes, Shared Memories, and an AI Date Planner.",
      "Deployed on Next.js 15 and React 19 with strict TypeScript type safety and row-level security (RLS) policies protecting private couple data.",
    ],
    metrics: [
      { label: "Core Realtime Modules", value: "06", note: "Presence, Daily Q, Voice, Memories, AI Planner, Photobooth" },
      { label: "Frontend Runtime", value: "Next 15", note: "React 19 App Router + TypeScript strict mode" },
      { label: "Privacy Architecture", value: "RLS", note: "End-to-end couple-isolated Supabase policies" },
    ],
    palette: {
      bg: "#0B0F1A",
      primary: "#F5B83D",
      secondary: "#1E293B",
      accent: "#38BDF8",
    },
  },
  {
    id: "qorvayn-ecosystem",
    title: "QORVAYN",
    subtitle: "Parent Technology Company Brand & Ecosystem Architecture",
    category: "Brand Identity & Flagship Web Platform",
    badge: "Parent Ecosystem",
    dateLabel: "Mar 2026",
    year: "2026",
    clientOrOwner: "QORVAYN (Founded 10 March 2026)",
    services: "Brand Architecture, Visual Identity, Design System & Web Platform",
    stack: "Next.js, TypeScript, Tailwind CSS, Figma Design System",
    liveUrl: "https://qorvaynology.com",
    summary:
      "Founded on 10 March 2026 in Bangladesh by Ryan Zannah alongside co-founder Siyami Muntaha Saba, QORVAYN is the parent technology company behind Orbyn, SnowVayn, and Qorvaynology.",
    problemAndGoal:
      "As a multi-product venture builder launching consumer web apps, seasonal apparel commerce, and a client-facing studio, QORVAYN needed a cohesive parent identity that unifies diverse products under one disciplined standard of craft.",
    architectureAndExecution: [
      "Established the master brand architecture linking QORVAYN (parent company) with Orbyn (consumer SaaS), SnowVayn/SunVayn (commerce), and Qorvaynology (agency studio).",
      "Created a modular typographic and grid system that adapts from dark technical product interfaces to warm editorial storytelling.",
      "Codified the internal QORVAYN engineering playbook — discovery-first scoping, Friday milestone demos, and a mandatory pre-launch checklist.",
    ],
    metrics: [
      { label: "Founded", value: "10 Mar", note: "Established in Bangladesh in March 2026" },
      { label: "Brands in the group", value: "04", note: "QORVAYN, Orbyn, SnowVayn/SunVayn, Qorvaynology" },
      { label: "Core Team", value: "05", note: "Cross-functional leadership, design & engineering pod" },
    ],
    palette: {
      bg: "#090D16",
      primary: "#EEF1F8",
      secondary: "#12182B",
      accent: "#F5B83D",
    },
  },
  {
    id: "snowvayn-sunvayn",
    title: "SnowVayn / SunVayn",
    subtitle: "Dual-Season Apparel Brand & Adaptive Storefront System",
    category: "Brand Identity & E-Commerce Architecture",
    badge: "In Progress",
    dateLabel: "Oct 2026",
    year: "2026",
    clientOrOwner: "QORVAYN Apparel Division",
    services: "Dual Brand Identity, Seasonal UI Theme Engine, E-Commerce Storefront",
    stack: "Next.js, React, TypeScript, Dynamic CSS Tokens, Headless Commerce",
    summary:
      "A clothing brand system built with two distinct seasonal identities — SnowVayn for winter collections and SunVayn for summer — powered by an e-commerce storefront that automatically shifts its visual theme with the season.",
    problemAndGoal:
      "Apparel brands in South Asia and globally often struggle to transition their digital flagship between heavy winter outerwear and lightweight summer essentials without rebuilding their store every six months.",
    architectureAndExecution: [
      "Designed paired typographic marks and colour palettes: crisp alpine slate and frost ivory for SnowVayn; warm solar ochre and linen paper for SunVayn.",
      "Architected a token-driven storefront theme switch that transitions hero art direction, surface contrast, and collection merchandising seamlessly.",
      "Structured mobile-first product detail pages, size matrices, and streamlined checkout flows for local (bKash/cards) and international orders.",
    ],
    metrics: [
      { label: "Seasonal Modes", value: "02", note: "SnowVayn (Winter) & SunVayn (Summer) theme engine" },
      { label: "Storefront Architecture", value: "Tokenized", note: "Zero-rebuild seasonal visual switching" },
      { label: "Status", value: "Active", note: "In active development by the QORVAYN product team" },
    ],
    palette: {
      bg: "#0F172A",
      primary: "#E2E8F0",
      secondary: "#1E293B",
      accent: "#F59E0B",
    },
  },
  {
    id: "qorvaynology-continuum",
    title: "Continuum Identity",
    subtitle: "Qorvaynology® Studio Visual System & Monogram Architecture",
    category: "Brand Identity & Design System",
    badge: "Brand System",
    dateLabel: "Nov 2026",
    year: "2026",
    clientOrOwner: "Qorvaynology Studio",
    services: "Logo Concept 2 ('Continuum'), Colour Polarity System, Multi-Format Asset Pack",
    stack: "Vector Geometry, SVG Architecture, Dual-Polarity Dark/Light Tokens",
    liveUrl: "https://qorvaynology.com",
    summary:
      "Concept 2, 'Continuum': the first and last letters of Qorvaynology — q and y — drawn as one unbroken geometric line, punctuated by a Continuum Gold stroke marking the hand-off where an idea becomes a shipped product.",
    problemAndGoal:
      "We wanted a studio mark that visually embodies our core promise: one integrated team carrying a project from first discovery sketch to deployed software without broken hand-offs.",
    architectureAndExecution: [
      "Constructed the 'q → y' Continuum monogram on a strict geometric grid with balanced stroke weights and a distinct #F5B83D gold catalyst stroke.",
      "Paired the mark with a custom lowercase wordmark ('qorvaynology') where the terminal 'y' carries the signature gold accent.",
      "Delivered a complete 27-file production logo pack across SVG, PNG, JPG, and print-ready PDF for dark (#0B1020) and warm paper (#F4F3EE) surfaces.",
    ],
    metrics: [
      { label: "Production Assets", value: "27", note: "SVG, PNG, JPG & PDF across dark, light & transparent" },
      { label: "Primary Surface Pair", value: "02", note: "Cosmic Navy #07090D + Editorial Paper #F4F3EE" },
      { label: "Signature Accent", value: "#F5B83D", note: "Continuum Gold hand-off stroke" },
    ],
    palette: {
      bg: "#0B1020",
      primary: "#F5B83D",
      secondary: "#12182B",
      accent: "#F4F3EE",
    },
  },
  {
    id: "aether-clinic-concept",
    title: "Aether Diagnostics",
    subtitle: "Concept Redesign & Patient Booking Flow for a Dhaka Specialty Clinic",
    category: "UI/UX & Web Application (Concept)",
    badge: "Concept",
    dateLabel: "Nov 2026",
    year: "2026",
    clientOrOwner: "Self-Initiated Studio Concept (Labeled Concept)",
    services: "UX Audit, Interface Redesign, Specialist Appointment Booking Flow",
    stack: "Figma Design System, Next.js App Prototype, Cal/Booking Architecture",
    summary:
      "A self-initiated concept redesign demonstrating how established healthcare clinics in Dhaka can replace cluttered, slow directories with a calm, mobile-first doctor discovery and instant appointment booking experience.",
    problemAndGoal:
      "Many private clinics and diagnostic centers in Bangladesh rely on outdated websites where patients cannot easily check specialist schedules or book consultations on mobile devices.",
    architectureAndExecution: [
      "Replaced multi-level dropdown clutter with a 3-step specialist finder: Department → Doctor Availability → Instant SMS/WhatsApp-confirmed slot.",
      "Designed high-contrast, accessible typography in English and Bengali-ready layouts so older patients and mobile users can navigate effortlessly.",
      "Explicitly labeled as a Qorvaynology Studio Concept showcase to demonstrate our healthcare & local enterprise redesign capabilities.",
    ],
    metrics: [
      { label: "Booking Steps", value: "03", note: "Streamlined from 8+ legacy form fields" },
      { label: "Project Type", value: "Concept", note: "Self-initiated studio showcase" },
      { label: "Target Sector", value: "Healthcare", note: "Designed for Dhaka & regional clinics" },
    ],
    palette: {
      bg: "#0D1518",
      primary: "#34D399",
      secondary: "#112226",
      accent: "#F4F3EE",
    },
  },
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "launch-website",
    name: "Launch Website",
    timeline: "2–4 weeks",
    summary:
      "Custom strategy, Figma UI/UX, responsive Next.js website build, technical SEO, analytics, launch checklist, and 30 days of support.",
    tiers: [
      {
        tierName: "Basic",
        subtitle: "Single-Page Launch Site",
        usd: "$800",
        bdt: "৳40,000",
        features: [
          "Custom high-converting 1-page editorial website",
          "Mobile-responsive Next.js + Tailwind build",
          "Contact form, Cal.com booking & speed optimization",
          "2 revision rounds + 30 days post-launch support",
        ],
      },
      {
        tierName: "Standard",
        subtitle: "Multi-Page Studio Website (Up to 5–7 Pages)",
        usd: "$1,500",
        bdt: "৳75,000",
        features: [
          "Homepage + 4–6 inner pages (Services, Work, About, Contact)",
          "Custom Figma UI design + interactive motion polish",
          "On-page SEO, OpenGraph, sitemap & analytics setup",
          "CMS integration + 30 days post-launch support",
        ],
      },
      {
        tierName: "Premium",
        subtitle: "Flagship Custom Website + CMS & Growth Setup",
        usd: "$2,500",
        bdt: "৳1,20,000",
        features: [
          "Up to 10 custom pages + dynamic case studies/blog CMS",
          "Bespoke interactive components & performance engineering",
          "Full technical SEO audit, schema markup & conversion tracking",
          "Priority delivery + 30 days support & team training",
        ],
      },
    ],
  },
  {
    id: "webapp-mvp",
    name: "Web App / SaaS MVP",
    timeline: "4–10 weeks",
    summary:
      "End-to-end product discovery, Figma UI/UX system, full-stack Next.js + TypeScript + Supabase engineering, and production deployment.",
    tiers: [
      {
        tierName: "Basic",
        subtitle: "Clickable Prototype + Frontend MVP UI",
        usd: "$3,000",
        bdt: "৳2,00,000",
        features: [
          "Product discovery workshop & user flow architecture",
          "Complete Figma UI/UX design system & prototype",
          "Production Next.js + TypeScript frontend views",
          "30 days post-launch support",
        ],
      },
      {
        tierName: "Standard",
        subtitle: "Full-Stack MVP (Auth + Database + Core Flows)",
        usd: "$6,000",
        bdt: "৳3,80,000",
        features: [
          "Everything in Basic + Supabase Auth & PostgreSQL schema",
          "Core product workflows, dashboard & user roles (RLS)",
          "Payment integration (Stripe / SSLCommerz / Payoneer flow)",
          "Vercel production deployment + 30 days support",
        ],
      },
      {
        tierName: "Premium",
        subtitle: "Complete Production SaaS + Realtime / AI Modules",
        usd: "$12,000+",
        bdt: "৳7,50,000+",
        features: [
          "Multi-module production web app (Realtime, AI, admin portal)",
          "Custom API integrations, automated workflows & audit logs",
          "Performance load testing, security hardening & documentation",
          "Dedicated milestone delivery (40% / 30% / 30%) + 30d support",
        ],
      },
    ],
  },
  {
    id: "brand-identity",
    name: "Brand Identity System",
    timeline: "1–2 weeks",
    summary:
      "Logo architecture, colour polarity system, typography rules, brand book, and social media templates crafted from scratch.",
    tiers: [
      {
        tierName: "Basic",
        subtitle: "Core Logo + Colour & Type System",
        usd: "$400",
        bdt: "৳25,000",
        features: [
          "2 initial logo concepts & 2 refinement rounds",
          "Primary mark, wordmark & favicon (SVG, PNG, JPG)",
          "Core colour palette & typography selection sheet",
          "Full commercial ownership upon final payment",
        ],
      },
      {
        tierName: "Standard",
        subtitle: "Complete Brand Guidelines + Social Kit",
        usd: "$750",
        bdt: "৳42,000",
        features: [
          "Full logo system (horizontal, stacked, dark/light variants)",
          "Comprehensive Brand Guidelines PDF book",
          "Social media profile & post templates (LinkedIn, IG, X)",
          "Business card / letterhead / pitch deck cover assets",
        ],
      },
      {
        tierName: "Premium",
        subtitle: "Brand Identity + Figma UI Component Kit",
        usd: "$1,200",
        bdt: "৳60,000",
        features: [
          "Everything in Standard + complete art direction system",
          "Tokenized Figma UI kit (buttons, cards, forms, grids)",
          "Launch social graphics & brand narrative messaging guide",
          "Seamless handoff into Website or Web App build",
        ],
      },
    ],
  },
  {
    id: "brand-website-bundle",
    name: "Brand + Website Bundle",
    timeline: "3–5 weeks",
    summary:
      "Our most popular founder package: complete brand identity system and custom launch website built by one unified team.",
    tiers: [
      {
        tierName: "Basic",
        subtitle: "Core Identity + Single-Page Launch Website",
        usd: "$1,200",
        bdt: "৳60,000",
        features: [
          "Logo system, colour palette & typography guidelines",
          "Custom 1-page Next.js launch website + booking flow",
          "Social profile assets + basic technical SEO",
          "30 days of post-launch support included",
        ],
      },
      {
        tierName: "Standard",
        subtitle: "Full Brand Book + 5-Page Custom Website",
        usd: "$2,200",
        bdt: "৳1,10,000",
        features: [
          "Complete Brand Identity System + Guidelines PDF",
          "Custom 5–7 page responsive website with CMS",
          "Copywriting polish, SEO setup & analytics dashboard",
          "Launch checklist + 30 days post-launch support",
        ],
      },
      {
        tierName: "Premium",
        subtitle: "Flagship Brand + Custom Web / E-Commerce Platform",
        usd: "$3,500",
        bdt: "৳1,80,000",
        features: [
          "Full Brand System + Figma Design System tokens",
          "Up to 10-page custom website or e-commerce storefront",
          "Interactive product showcases, blog/work CMS & speed tuning",
          "Priority 40/30/30 milestone delivery + 30 days support",
        ],
      },
    ],
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "ryan-zannah",
    name: "Ryan Zannah",
    role: "Founder & CEO",
    division: "QORVAYN & Qorvaynology Leadership",
    location: "Kushtia & Dhaka, Bangladesh",
    quote:
      "Every product we launch at QORVAYN teaches us how to design for real people and ship without cutting corners. When you work with Qorvaynology, you get the exact method behind our own products.",
    focusAreas: ["Product Strategy", "Full-Stack Web Apps", "AI Automation", "Client Architecture"],
    initials: "RZ",
    tone: "from-[#2E6BFF]/55 via-[#1E3A8A] to-[#050B1C]",
  },
  {
    id: "siyami-muntaha-saba",
    name: "Siyami Muntaha Saba",
    role: "Co-Founder & Head of Design",
    division: "QORVAYN Brand & Design Systems",
    location: "QORVAYN Leadership",
    quote:
      "Restraint is what separates enduring design from trend-chasing templates. Every border, typeface, and transition should earn its place on the screen.",
    focusAreas: ["Brand Identity", "Design Systems", "UI/UX Craft", "Visual Direction"],
    initials: "SM",
    tone: "from-[#93C5FD]/35 via-[#1E3A8A] to-[#050B1C]",
  },
  {
    id: "tam-zayn",
    name: "Tam Zayn",
    role: "Head of Technology & Product",
    division: "QORVAYN Core Ecosystem",
    location: "QORVAYN Core Team",
    quote:
      "We architect systems so that design tokens, API contracts, and edge deployments work as one continuous pipeline from day one.",
    focusAreas: ["System Architecture", "Product Engineering", "Performance & Security"],
    initials: "TZ",
    tone: "from-[#1D4ED8]/50 via-[#0B1B46] to-[#040711]",
  },
  {
    id: "rahat-ehsan-sufi",
    name: "Rahat Ehsan Sufi",
    role: "Operations & Business",
    division: "QORVAYN Operations",
    location: "QORVAYN Core Team",
    quote:
      "Clear milestones, Friday progress updates, and structured launch checklists keep every build predictable from kickoff to handover.",
    focusAreas: ["Delivery Operations", "Milestone Governance", "Client Handover"],
    initials: "RS",
    tone: "from-[#2563EB]/45 via-[#0F2557] to-[#040711]",
  },
  {
    id: "shoyetur-rahman-sayel",
    name: "Shoyetur Rahman Sayel",
    role: "Software / Product Development",
    division: "Websites, Web Apps & E-Commerce",
    location: "Bangladesh",
    quote:
      "Fast load times, clean TypeScript architecture, and database schemas that don't break under real traffic — good engineering should feel effortless to the end user.",
    focusAreas: ["Next.js & React 19", "TypeScript", "Supabase & Databases", "E-Commerce Systems"],
    initials: "SS",
    tone: "from-[#60A5FA]/45 via-[#0F2557] to-[#050B1C]",
  },
];

export const INSIGHTS_LIST: InsightArticle[] = [
  {
    id: "qorvayn-way-of-building",
    day: "17",
    month: "Nov",
    year: "2026",
    readTime: "4 min read",
    category: "Studio Philosophy",
    title: "Why We Built Qorvaynology: Turning the QORVAYN Product Method into a Studio",
    excerpt:
      "Most new agencies pitch 'cheap, fast AI'. We built Qorvaynology around the opposite conviction: a product team that ships its own software and builds yours with the same discipline.",
    author: "Ryan Zannah",
    authorRole: "Founder & CEO",
    body: [
      "Qorvaynology combines QORVAYN with '-ology' — the study and method of how we build. When we founded QORVAYN in March 2026, our focus was building our own digital products, starting with Orbyn (a live shared web app for long-distance couples) and SnowVayn / SunVayn (our seasonal apparel system).",
      "Along the way, founders and business owners kept asking the same question: who designed your brand, and who engineered your web stack? They were tired of hiring disconnected freelancers — one person for a logo, another for a WordPress template, and nobody responsible for whether the whole product actually worked.",
      "Qorvaynology is our answer. Instead of selling generic 'AI-powered everything', we bring one integrated team (strategy, brand identity, Figma UI/UX, and Next.js + Supabase engineering) to every engagement. Every project starts with a real discovery call, ships with weekly Friday demos, and includes a 30-day post-launch support window.",
    ],
    keyTakeaways: [
      "One unified pod handles Brand Identity, UI/UX, and Full-Stack Next.js engineering.",
      "AI is an internal accelerator we use responsibly — never a substitute for human craft.",
      "Every build includes a written 3-tier scope, Friday updates, and 30 days of post-launch support.",
    ],
  },
  {
    id: "inside-orbyn-realtime-stack",
    day: "14",
    month: "Nov",
    year: "2026",
    readTime: "5 min read",
    category: "Engineering Architecture",
    title: "Inside Orbyn's Stack: Next.js 15, React 19, Supabase Realtime & On-Device Vision",
    excerpt:
      "How we architected low-latency presence, shared voice notes, and a two-person remote Photobooth with client-side background removal.",
    author: "Shoyetur Rahman Sayel",
    authorRole: "Lead Software Engineer",
    body: [
      "Building consumer software that feels intimate requires eliminating mechanical lag. When we architected Orbyn in Next.js 15 and React 19, our primary goal was making a shared digital space feel immediate across continents.",
      "We paired Next.js App Router server components with Supabase Realtime broadcast and presence channels. The moment both partners open Orbyn, their presence indicators synchronize in milliseconds while strict PostgreSQL Row-Level Security (RLS) ensures couple data remains completely private.",
      "For Orbyn's two-person Photobooth, we avoided expensive server-side GPU queues by running background segmentation directly on-device in the browser before compositing both partners into a shared polaroid frame.",
    ],
    keyTakeaways: [
      "Next.js 15 + React 19 paired with Supabase Realtime delivers sub-second shared state.",
      "On-device browser inference keeps interactive media features fast and private.",
      "We apply the exact same full-stack architecture to client SaaS MVPs and web apps.",
    ],
  },
  {
    id: "continuum-identity-system",
    day: "10",
    month: "Nov",
    year: "2026",
    readTime: "3 min read",
    category: "Brand Systems",
    title: "The 'Continuum' Monogram: Designing an Identity System That Works at 16px and 16ft",
    excerpt:
      "Behind Concept 2 ('Continuum') — why we drew q and y as one unbroken line and paired Cosmic Navy with Warm Editorial Paper.",
    author: "Siyami Muntaha Saba",
    authorRole: "Co-Founder & Head of Design",
    body: [
      "When designing Qorvaynology's own visual identity, we rejected the neon cyan-and-purple clichés that dominate tech agency websites. A studio that values permanence needed a calmer, more architectural palette.",
      "Our monogram — Concept 2, 'Continuum' — connects the first letter 'q' and final letter 'y' of qorvaynology in a single continuous path. A single Continuum Gold (#F5B83D) stroke marks the exact inflection point where an idea becomes a tangible product.",
      "By pairing deep Cosmic Obsidian (#07090D) with warm archival Paper (#F4F3EE) and 1px structural hairlines, the identity reads with equal clarity as a 16-pixel browser favicon or a monumental display header.",
    ],
    keyTakeaways: [
      "Unbroken 'q → y' geometry symbolizes one team from first idea to shipped product.",
      "High-contrast dual polarity (Deep Obsidian + Warm Paper) prevents visual fatigue.",
      "Every client brand identity package ships with 20+ production-ready SVG, PNG, and PDF files.",
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "timeline",
    category: "Delivery",
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope, and we lock them in writing before starting: Brand Identity Systems take 1–2 weeks; UI/UX Design takes 1–3 weeks; Launch Websites & E-Commerce stores take 2–4 weeks; and Full-Stack Web Apps / SaaS MVPs take 4–10 weeks. Every client receives a structured progress update every Friday.",
  },
  {
    id: "meaning",
    category: "Studio",
    question: "What does 'Qorvaynology' mean, and how does it relate to QORVAYN?",
    answer:
      "QORVAYN is our parent technology company (founded 10 March 2026 in Bangladesh), where we build and operate our own products like Orbyn and SnowVayn. '-ology' means the study or science of something — so Qorvaynology means 'the QORVAYN way of building', offered directly to ambitious businesses.",
  },
  {
    id: "pricing-payments",
    category: "Commercial",
    question: "How do pricing, proposals, and payment milestones work?",
    answer:
      "After a free 15–30 minute discovery call, we send a written proposal with 3 clear tiers (Basic, Standard, Premium) within 24 hours. Projects under $3,000 are billed 50% upfront and 50% upon delivery. Projects over $3,000 use 40% / 30% / 30% milestone billing. International clients can pay via Payoneer, Contra (0% fee), Upwork, or Fiverr; Bangladeshi clients can pay via bank transfer or bKash.",
  },
  {
    id: "existing-brand",
    category: "Process",
    question: "Can you work with our existing brand style, or do we need a full rebrand?",
    answer:
      "We gladly work with both. If you already have an established logo and brand guide, we can design and engineer your new website or Next.js web app around it. If you are starting from zero — or your visual identity is holding back conversions — our Brand + Website bundle covers the entire system in one cohesive sprint.",
  },
  {
    id: "post-launch-support",
    category: "Support",
    question: "Do you provide ongoing website or app support after launch?",
    answer:
      "Yes. Every website and web app we ship includes a rigorous pre-launch checklist, complete source-code and design-file handover, and 30 days of free post-launch support. After those 30 days, you can manage the product yourself, opt into a lightweight Care Plan ($100–$300/month), or partner with us on a Monthly Growth Retainer ($500–$2,000/month).",
  },
  {
    id: "what-we-dont-do",
    category: "Scope",
    question: "Do you use generic templates or offer standalone video editing?",
    answer:
      "No. Every brand system, Figma interface, and Next.js codebase is crafted specifically for your business goals — never resold templates. And to keep our engineering and design quality high, we focus strictly on brand systems, UI/UX, websites, e-commerce, web apps, and AI workflow automation (we do not offer standalone client video editing).",
  },
];

export const VERIFIED_SOCIALS = [
  { label: "LinkedIn", url: "https://www.linkedin.com/company/qorvaynology", group: "Social" },
  { label: "Instagram", url: "https://www.instagram.com/qorvaynology/", group: "Social" },
  { label: "X (Twitter)", url: "https://x.com/qorvaynology", group: "Social" },
  { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61596735802619", group: "Social" },
  { label: "YouTube", url: "https://www.youtube.com/@Qorvaynology", group: "Social" },
  { label: "TikTok", url: "https://www.tiktok.com/@qorvaynology", group: "Social" },
  { label: "Behance", url: "https://www.behance.net/qorvaynology", group: "Portfolio" },
  { label: "Dribbble", url: "https://dribbble.com/qorvaynology", group: "Portfolio" },
  { label: "Figma", url: "https://www.figma.com/@qorvaynology", group: "Portfolio" },
  { label: "Medium", url: "https://medium.com/@qorvaynology", group: "Portfolio" },
  { label: "Contra", url: "https://contra.com/qorvaynology", group: "Hire" },
  { label: "Clutch", url: "https://clutch.co/profile/qorvaynology", group: "Hire" },
  { label: "Indie Hackers", url: "https://www.indiehackers.com/qorvaynology", group: "Community" },
  { label: "Linktree", url: "https://linktr.ee/qorvaynology", group: "Directory" },
];
