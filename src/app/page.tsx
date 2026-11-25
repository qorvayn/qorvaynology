"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Check,
  Minus,
  Plus,
  X,
} from "lucide-react";
import {
  FAQ_ITEMS,
  HERO_SERVICES,
  INSIGHTS_LIST,
  InsightArticle,
  PRICING_PACKAGES,
  PROJECTS_LIST,
  ProjectCaseStudy,
  SERVICES_LIST,
  STUDIO_FACTS,
  TEAM_MEMBERS,
  VERIFIED_SOCIALS,
} from "@/data/studioData";
import {
  ContinuumMark,
  TeamAvatar,
} from "@/components/ContinuumMark";
import {
  HeroAsteroidStreaks,
  TitleAsteroidSplatter,
} from "@/components/AstraSvgDefs";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { CaseStudyDrawer } from "@/components/CaseStudyDrawer";
import { ContactModal, InsightModal } from "@/components/StudioModals";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Architectural index line: 20px hairline + numbered mono label */
function SectionIndex({
  num,
  label,
  tone = "dark",
}: {
  num: string;
  label: string;
  tone?: "dark" | "light";
}) {
  const ink = tone === "dark" ? "text-[#0A1633]/65" : "text-white/65";
  const rule = tone === "dark" ? "bg-[#1E3A8A]" : "bg-[#60A5FA]";
  return (
    <div
      className={`mb-5 flex items-center gap-3 font-mono-tech text-[11px] tracking-[0.16em] ${ink}`}
    >
      <span className={`h-px w-5 ${rule}`} />
      <span>
        {num} / {label}
      </span>
    </div>
  );
}

const INSIGHT_IMAGES = [
  "/astra/insight-1.png",
  "/astra/insight-2.png",
  "/astra/insight-3.png",
];

const SERVICE_SCOPE_COUNTS: Record<string, { num: string; unit: string }> = {
  "brand-identity": { num: "27", unit: "Assets" },
  "ui-ux-design": { num: "15", unit: "Screens+" },
  "websites-ecommerce": { num: "30", unit: "Days Care" },
  "fullstack-webapps": { num: "06", unit: "Modules+" },
  "ai-automation": { num: "24", unit: "Hr Scope" },
  "growth-retainer": { num: "04", unit: "Sprints/Mo" },
};

/* Base numeric values from Qorvaynology-Brief.md for the interactive scope calculator */
const PACKAGE_BASE_PRICES: Record<
  string,
  { usd: [number, number, number]; bdt: [number, number, number] }
> = {
  "launch-website": {
    usd: [800, 1500, 2800],
    bdt: [40000, 75000, 130000],
  },
  "webapp-mvp": {
    usd: [3000, 5500, 9500],
    bdt: [180000, 320000, 550000],
  },
  "brand-identity-pkg": {
    usd: [400, 750, 1200],
    bdt: [25000, 42000, 60000],
  },
  "brand-plus-web": {
    usd: [1200, 2100, 3500],
    bdt: [60000, 105000, 175000],
  },
};

const SCOPE_ADDONS = [
  {
    id: "copywriting",
    label: "Editorial Copywriting (per 5 pages)",
    usd: 150,
    bdt: 10000,
    recurring: false,
  },
  {
    id: "extra-pages",
    label: "2 Additional Custom Pages / Views",
    usd: 120,
    bdt: 8000,
    recurring: false,
  },
  {
    id: "seo-schema",
    label: "Technical SEO, OpenGraph & Schema Pack",
    usd: 150,
    bdt: 12000,
    recurring: false,
  },
  {
    id: "care-plan",
    label: "Post-30d Monthly Care & Hosting Plan (/mo)",
    usd: 100,
    bdt: 8000,
    recurring: true,
  },
];

const DELIVERY_STAGES = [
  {
    num: "01",
    code: "STAGE 01 · DAY 01–02",
    title: "Discovery Call & Written 3-Tier Proposal",
    duration: "15–30 min call · Proposal in 24h",
    lead: "Ryan Zannah",
    leadRole: "Founder & CEO",
    leadInitials: "RZ",
    summary:
      "We start with a focused 15–30 minute discovery call to map your business goals, target users, and technical constraints. Within 24 hours, you receive a written proposal with 3 clear scope options (Basic, Standard, Premium), exact deliverables, timeline, and milestone schedule.",
    artifacts: [
      "Written 3-tier scope & investment breakdown (USD or BDT)",
      "System architecture & stack recommendation (Next.js, Supabase, Figma)",
      "Fixed milestone payment schedule (50/50 or 40/30/30)",
      "Shared project channel (WhatsApp, Slack, or Discord)",
    ],
  },
  {
    num: "02",
    code: "STAGE 02 · WEEK 01–02",
    title: "Visual Architecture & Interactive Figma Prototype",
    duration: "1–2 weeks · Full UI approval before code",
    lead: "Adelia Maharani & Siyami Muntaha Saba",
    leadRole: "Creative Direction & Design Systems",
    leadInitials: "AM",
    summary:
      "Before writing production frontend code, we design your visual system and clickable Figma prototype. You review real screens on desktop and mobile, test user flows, and approve the interface direction so engineering runs with zero guesswork.",
    artifacts: [
      "Typography, surface palette, and 1px structural grid tokens",
      "High-fidelity desktop & mobile screens in Figma",
      "Interactive clickable prototype for stakeholder sign-off",
      "Brand mark, responsive lockups, and asset library",
    ],
  },
  {
    num: "03",
    code: "STAGE 03 · WEEK 02–06",
    title: "Next.js & Supabase Engineering Sprints",
    duration: "Weekly Friday demos · Live staging URL",
    lead: "Shoyetur Rahman Sayel & Tam Zayn",
    leadRole: "Lead Software Engineer & Head of Technology",
    leadInitials: "SS",
    summary:
      "We build on the exact Next.js, React 19, TypeScript, and Supabase stack that powers Orbyn in live beta. Every Friday you receive a working staging deployment and recorded walkthrough so you can test real features in your browser every week.",
    artifacts: [
      "Clean Next.js App Router + TypeScript production codebase",
      "Supabase PostgreSQL schema, Auth, and Row-Level Security (for apps)",
      "Framer Motion scroll choreography & Core Web Vitals tuning",
      "Every-Friday live staging link + progress review",
    ],
  },
  {
    num: "04",
    code: "STAGE 04 · LAUNCH + 30 DAYS",
    title: "Production Cutover, Code Handover & 30d Care",
    duration: "30 days included post-launch support",
    lead: "Rahat Ehsan Sufi & Ryan Zannah",
    leadRole: "Operations & Studio Leadership",
    leadInitials: "RS",
    summary:
      "At launch, we connect your custom domain, configure SSL and edge security headers, verify analytics, and hand over 100% of your GitHub repository and Figma files. Every build includes a 30-day post-launch support window for bug fixes and team onboarding.",
    artifacts: [
      "Custom domain DNS cutover, SSL, and security header verification",
      "Full GitHub repository, Figma source files, and credentials handover",
      "Recorded walkthrough teaching your team how to manage content",
      "30 days of included post-launch engineering support",
    ],
  },
];

export default function QorvaynologyHomePage() {
  // Interactive state
  const [activeHeroService, setActiveHeroService] =
    useState<string>("websites-ecommerce");
  const [openServiceId, setOpenServiceId] = useState<string>("brand-identity");
  const [selectedProjectCategory, setSelectedProjectCategory] =
    useState<string>("All");
  const [activeCaseStudy, setActiveCaseStudy] =
    useState<ProjectCaseStudy | null>(null);
  const [activeInsight, setActiveInsight] = useState<InsightArticle | null>(
    null
  );
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [contactSubject, setContactSubject] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Interactive Scope & Investment Architect state
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");
  const [selectedPkgId, setSelectedPkgId] = useState<string>("launch-website");
  const [selectedTierIdx, setSelectedTierIdx] = useState<number>(1); // Standard default
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>(
    {
      copywriting: false,
      "extra-pages": false,
      "seo-schema": false,
      "care-plan": false,
    }
  );

  // Delivery Architecture interactive stage index (0..3)
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);

  // Team orbital carousel state
  const [activeTeamIdx, setActiveTeamIdx] = useState<number>(0);

  // FAQ accordion state
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    timeline: true,
    meaning: false,
  });

  // Footer inline form state
  const [footerName, setFooterName] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSent, setFooterSent] = useState(false);

  // =========================================================================
  // SCROLL-LINKED ANIMATIONS (Hero, Pricing Sticky Spheres, Team Sticky Orbit)
  // =========================================================================
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothHero = useSpring(heroScroll, { stiffness: 110, damping: 28 });
  const heroVideoScale = useTransform(smoothHero, [0, 1], [1, 1.12]);
  const heroPlanetY = useTransform(smoothHero, [0, 1], [0, -90]);
  const heroTitleY = useTransform(smoothHero, [0, 1], [0, 65]);

  // Pricing Sticky Scroll Section
  const pricingScrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: pricingProgress } = useScroll({
    target: pricingScrollRef,
    offset: ["start end", "end end"],
  });
  const smoothPricing = useSpring(pricingProgress, {
    stiffness: 100,
    damping: 26,
  });
  const planet1Y = useTransform(smoothPricing, [0.05, 0.5], [80, 0]);
  const planet1Scale = useTransform(smoothPricing, [0.05, 0.5], [0.84, 1]);
  const planet2Y = useTransform(smoothPricing, [0.3, 0.8], [90, 0]);
  const planet2Scale = useTransform(smoothPricing, [0.3, 0.8], [0.84, 1]);

  // Team Sticky Scroll Section
  const teamScrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: teamProgress } = useScroll({
    target: teamScrollRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(teamProgress, "change", (v) => {
    const idx = Math.min(
      TEAM_MEMBERS.length - 1,
      Math.max(0, Math.floor(v * TEAM_MEMBERS.length))
    );
    if (idx !== activeTeamIdx) {
      setActiveTeamIdx(idx);
    }
  });

  const openContactWith = (subject = "") => {
    setContactSubject(subject);
    setContactOpen(true);
  };

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentPackage =
    PRICING_PACKAGES.find((p) => p.id === selectedPkgId) || PRICING_PACKAGES[0];
  const currentTier =
    currentPackage.tiers[selectedTierIdx] || currentPackage.tiers[1];

  const activeService =
    SERVICES_LIST.find((s) => s.id === openServiceId) || SERVICES_LIST[0];

  const activeStage = DELIVERY_STAGES[activeStageIdx] || DELIVERY_STAGES[0];
  const activeMember = TEAM_MEMBERS[activeTeamIdx] || TEAM_MEMBERS[0];

  // Live Interactive Scope Calculator math
  const basePriceTuple =
    PACKAGE_BASE_PRICES[selectedPkgId] || PACKAGE_BASE_PRICES["launch-website"];
  const baseAmount =
    currency === "USD"
      ? basePriceTuple.usd[selectedTierIdx] || basePriceTuple.usd[1]
      : basePriceTuple.bdt[selectedTierIdx] || basePriceTuple.bdt[1];

  const oneTimeAddonTotal = SCOPE_ADDONS.reduce((sum, addon) => {
    if (!addon.recurring && selectedAddons[addon.id]) {
      return sum + (currency === "USD" ? addon.usd : addon.bdt);
    }
    return sum;
  }, 0);

  const hasCarePlan = !!selectedAddons["care-plan"];
  const totalEstimate = baseAmount + oneTimeAddonTotal;
  const isThreeMilestone =
    (currency === "USD" && totalEstimate >= 1500) ||
    (currency === "BDT" && totalEstimate >= 80000);

  const formatMoney = (amount: number) =>
    currency === "USD"
      ? `$${amount.toLocaleString("en-US")}`
      : `৳${amount.toLocaleString("en-IN")}`;

  const activeAddonNames = SCOPE_ADDONS.filter((a) => selectedAddons[a.id]).map(
    (a) => a.label
  );

  const filteredProjects =
    selectedProjectCategory === "All"
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) =>
          p.category
            .toLowerCase()
            .includes(selectedProjectCategory.toLowerCase())
        );

  const handleFooterBrief = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project Inquiry from ${footerName || "Website Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${footerName}\nEmail: ${footerEmail}\n\nHi Ryan & Qorvaynology team, I'd like to discuss a project.`
    );
    window.open(
      `mailto:qorvaynology@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    setFooterSent(true);
  };

  return (
    <div className="min-h-screen bg-[#03050C] text-white selection:bg-[#2E6BFF] selection:text-white">
      {/* =====================================================================
          FIXED HEADER WITH QORVAYNOLOGY CONTINUUM (q → y) MONOGRAM & MIX-BLEND
      ===================================================================== */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none mix-blend-difference"
      >
        <div className="max-w-[1426px] mx-auto px-5 sm:px-9 pt-[28px] pb-3 flex items-start justify-between">
          {/* Left: Qorvaynology Continuum (q → y) Geometric Mark + Wordmark */}
          <a
            href="#top"
            className="pointer-events-auto group inline-flex items-center gap-3 text-white"
          >
            <ContinuumMark
              className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-500 group-hover:scale-105"
              strokeColor="#FFFFFF"
              accentColor="#FFFFFF"
            />
            <span className="hidden md:inline-block font-display text-sm font-semibold tracking-[-0.04em] text-white/95">
              Qorvaynology®
            </span>
          </a>

          {/* Right: Monochrome Founder Badge + Contact Pill + Menu Trigger */}
          <div className="pointer-events-auto flex items-start gap-5 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 overflow-hidden shrink-0">
                <TeamAvatar
                  initials="RZ"
                  name="Ryan Zannah"
                  tone="from-[#141414] to-[#000000]"
                  size="xs"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openContactWith("Discovery Call — Header CTA")}
                className="group h-[42px] w-[196px] sm:w-[230px] px-4 rounded-[32px] border border-white/35 hover:border-white flex items-center justify-between text-xs font-medium tracking-[-0.03em] text-white transition-colors cursor-pointer"
              >
                <span>Start a Project</span>
                <span className="flex items-center gap-1.5">
                  <span className="font-mono-tech text-[10px] text-white/60">
                    24H
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform" />
                </span>
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              className="h-[42px] px-2.5 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* =====================================================================
          FULL-SCREEN NAVIGATION OVERLAY (Navy Blue + Cosmic Black)
      ===================================================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0, y: "-4%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-4%" }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-50 cosmos-surface text-white flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
          >
            <div className="max-w-[1354px] w-full mx-auto flex items-center justify-between border-b border-white/15 pb-6">
              <div className="flex items-center gap-3">
                <ContinuumMark
                  className="w-7 h-7"
                  strokeColor="#FFFFFF"
                  accentColor="#2E6BFF"
                />
                <span className="font-mono-tech text-[11px] text-white/65">
                  QORVAYNOLOGY® · ARCHITECTURAL DIRECTORY
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 text-xs hover:bg-white hover:text-[#070B16] transition-colors cursor-pointer"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="max-w-[1354px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 my-auto py-8">
              <nav className="md:col-span-7 flex flex-col gap-2 sm:gap-3">
                {[
                  { idx: "00", label: "Overview", href: "#top" },
                  { idx: "01", label: "Studio & Ecosystem", href: "#studio" },
                  { idx: "02", label: "Capabilities Matrix", href: "#services" },
                  { idx: "03", label: "Selected Work", href: "#projects" },
                  { idx: "04", label: "Interactive Scope & Pricing", href: "#pricing" },
                  { idx: "05", label: "Delivery Architecture", href: "#method" },
                  { idx: "06", label: "Leadership & Engineering Pod", href: "#team" },
                  { idx: "07", label: "Studio Notes", href: "#insights" },
                  { idx: "08", label: "FAQ", href: "#faq" },
                ].map((item, i) => (
                  <motion.a
                    key={item.idx}
                    href={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.04 + i * 0.04,
                      duration: 0.45,
                      ease: EASE_OUT_EXPO,
                    }}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-1 text-2xl sm:text-4xl font-display font-semibold tracking-[-0.04em] text-white/80 hover:text-white transition-colors"
                  >
                    <span className="font-mono-tech text-[11px] text-[#60A5FA] opacity-75 group-hover:opacity-100">
                      /{item.idx}
                    </span>
                    <span className="group-hover:translate-x-2 transition-transform">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/15 pt-6 md:pt-0 md:pl-10">
                <div>
                  <div className="font-mono-tech text-[11px] text-[#60A5FA] mb-2">
                    DIRECT STUDIO CONTACT
                  </div>
                  <p className="font-display text-xl font-medium text-white">
                    The QORVAYN product engineering team, available for selected client builds.
                  </p>
                  <div className="mt-4 space-y-1.5 text-xs text-white/70">
                    <div>Kushtia &amp; Dhaka, Bangladesh · Remote Worldwide</div>
                    <div>
                      <a
                        href="mailto:qorvaynology@gmail.com"
                        className="underline hover:text-white"
                      >
                        qorvaynology@gmail.com
                      </a>
                    </div>
                    <div>+880 1410-831205</div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="https://cal.com/qorvaynology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#2E6BFF] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-white hover:text-[#070B16] transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Discovery Call</span>
                    </a>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        openContactWith("Project Brief from Menu");
                      }}
                      className="inline-flex items-center gap-2 border border-white/25 px-5 py-2.5 rounded-full text-xs font-medium hover:bg-white hover:text-[#070B16] transition-colors cursor-pointer"
                    >
                      <span>Send Project Brief</span>
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15">
                  <div className="font-mono-tech text-[10px] text-white/45 mb-3">
                    VERIFIED PLATFORMS
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/75">
                    {VERIFIED_SOCIALS.slice(0, 8).map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#60A5FA] transition-colors"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-[1354px] w-full mx-auto flex items-center justify-between text-[11px] font-mono-tech text-white/45 pt-4 border-t border-white/15">
              <span>QORVAYNOLOGY® · EST. 10 MAR 2026</span>
              <span>WHITE · NAVY BLUE · COSMIC BLACK</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          SECTION 00: HERO — LIVE UNIVERSE VIDEO, ECLIPSE HORIZON & 1PX SPEC BAR
      ===================================================================== */}
      <section
        ref={heroRef}
        id="top"
        className="relative w-full h-[760px] sm:h-[840px] lg:h-screen min-h-[740px] bg-[#040711] overflow-hidden select-none"
      >
        {/* Layer 0: Live Universe Nebula & Starfield Video */}
        <motion.div
          style={{ scale: heroVideoScale }}
          className="absolute inset-0 z-0"
        >
          <video
            src="/astra/sky-universe.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Layer 1: Deep Midnight Navy Blue + Cosmic Black Atmospheric Wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-[#06112E]/78 via-[#0B1E4E]/45 to-[#1E3A8A]/40"
        />

        {/* Layer 1b: Giant Curved White Eclipse Planet PNG on the Left */}
        <motion.img
          src="/astra/hero-stars-bg.png"
          alt=""
          initial={{ x: "-6%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-left z-[2]"
        />

        {/* Layer 2: Orbiting Planet (80x80) + Satellite (17x17) */}
        <motion.div
          style={{ y: heroPlanetY }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.9, ease: EASE_OUT_EXPO }}
          className="pointer-events-none absolute left-[32%] sm:left-[34.5%] top-[26%] sm:top-[27.6%] -translate-x-1/2 -translate-y-1/2 z-[2] w-[101px] h-[93px]"
        >
          <img
            src="/astra/hero-planet.png"
            alt=""
            className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-full object-cover shadow-lg"
          />
          <motion.img
            src="/astra/hero-sat.png"
            alt=""
            animate={{
              x: [-36, 18, -36],
              y: [28, -14, 28],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
            className="absolute top-[52px] left-[16px] w-[17px] h-[17px] rounded-full mix-blend-difference"
          />
        </motion.div>

        {/* Layer 2b: Distressed Ink & Asteroid Streaks */}
        <HeroAsteroidStreaks />

        {/* Layer 3: Architectural Topblock with mix-blend-mode: difference */}
        <div className="relative z-[3] h-full max-w-[1426px] mx-auto px-5 sm:px-9 flex flex-col justify-between mix-blend-difference text-white">
          {/* Sub-caption under the Contact pill */}
          <div className="pt-[98px] grid grid-cols-12">
            <div className="col-start-7 sm:col-start-9 col-span-6 sm:col-span-4">
              <p className="font-mono-tech text-[10px] tracking-[0.16em] text-white/80">
                00 / STUDIO OVERVIEW
              </p>
              <p className="mt-1 text-[13.5px] font-medium leading-[18.5px] tracking-[-0.4px] text-white/90">
                Free 15–30 min discovery call · Written 3-tier scope in 24h
              </p>
            </div>
          </div>

          {/* Center Hero Block: Discipline Index + Monumental Wordmark */}
          <motion.div
            style={{ y: heroTitleY }}
            className="my-auto pt-8 sm:pt-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE_OUT_EXPO }}
              className="grid grid-cols-12 mb-3 sm:mb-4"
            >
              <div className="col-start-6 sm:col-start-9 col-span-7 sm:col-span-4">
                <p className="font-display text-[19px] sm:text-[23px] font-semibold leading-[1.3] tracking-[-0.035em] text-[#FAFAFA]">
                  Brand Systems, Figma UI/UX
                  <br />
                  &amp; Next.js Web Applications
                </p>
              </div>
            </motion.div>

            {/* Left 4 Discipline Rows + Right Monumental Wordmark */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.75, ease: EASE_OUT_EXPO }}
                className="lg:col-span-3 space-y-[8px] max-w-[260px]"
              >
                {HERO_SERVICES.map((srv, idx) => {
                  const isActive = activeHeroService === srv.id;
                  return (
                    <a
                      key={srv.id}
                      href="#services"
                      onMouseEnter={() => setActiveHeroService(srv.id)}
                      onClick={() => setOpenServiceId(srv.id)}
                      className="group flex items-center justify-between text-[13.5px] font-semibold leading-[19px] tracking-[-0.5px] text-white py-0.5"
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono-tech text-[10px] opacity-55">
                          0{idx + 1}
                        </span>
                        <span className="transition-opacity group-hover:opacity-100">
                          {srv.label}
                        </span>
                      </span>
                      <span
                        className={`w-[16px] h-[2px] bg-white transition-opacity ${
                          isActive
                            ? "opacity-100"
                            : "opacity-25 group-hover:opacity-75"
                        }`}
                      />
                    </a>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.9, ease: EASE_OUT_EXPO }}
                className="lg:col-span-9 flex items-center justify-between"
              >
                <div className="relative inline-flex items-start max-w-full">
                  <TitleAsteroidSplatter className="absolute -top-2 left-4 z-10 mix-blend-normal" />

                  <h1 className="font-display font-semibold text-[#FAFAFA] text-[clamp(2.35rem,7.2vw,112px)] leading-[1.02] tracking-[-0.04em] whitespace-nowrap">
                    Qorvaynology
                  </h1>

                  <span className="ml-1 sm:ml-2 mt-1.5 sm:mt-3 w-[18px] h-[18px] sm:w-[26px] sm:h-[26px] rounded-full bg-[#FAFAFA] text-black font-display font-extrabold text-[10px] sm:text-[14px] tracking-[-0.5px] flex items-center justify-center shrink-0">
                    R
                  </span>
                </div>

                <div className="hidden sm:flex items-center pr-1 shrink-0">
                  <ContinuumMark
                    className="w-6 h-6"
                    strokeColor="#FFFFFF"
                    accentColor="#FFFFFF"
                  />
                </div>
              </motion.div>
            </div>

            {/* Bottom Architectural Metadata Strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.65, ease: EASE_OUT_EXPO }}
              className="mt-8 pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-tech text-[10px] tracking-[0.14em] text-white/85"
            >
              <div>EST. 10 MAR 2026 · BANGLADESH</div>
              <div>PARENT COMPANY: QORVAYN</div>
              <div>KUSHTIA &amp; DHAKA · REMOTE</div>
              <div className="sm:text-right">NEXT.JS 16 · SUPABASE · FIGMA</div>
            </motion.div>
          </motion.div>

          <div className="pb-6" />
        </div>
      </section>

      {/* =====================================================================
          SECTION 01: STUDIO & ECOSYSTEM
          Geometry: Asymmetric 4/8 Editorial Split + 1px Hairline Matrix + Spec Table
      ===================================================================== */}
      <section
        id="studio"
        className="paper-surface text-[#0A1633] py-24 sm:py-32 border-b border-[#0A1633]/10"
      >
        <div className="max-w-[1354px] mx-auto px-5 sm:px-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 4 Columns: Sticky Editorial Thesis & Founder Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <SectionIndex num="01" label="STUDIO &amp; ORIGIN" />

              <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#0A1633]">
                Built by the team shipping QORVAYN&apos;s own software.
              </h2>

              <p className="mt-4 text-sm leading-[1.65] text-[#525D73]">
                QORVAYN was founded on 10 March 2026 in Bangladesh by Ryan
                Zannah with co-founders Adelia Maharani and Siyami Muntaha Saba.
                Qorvaynology brings our internal product design and engineering
                pod directly to client builds.
              </p>

              {/* Founder Attribution Block */}
              <div className="mt-8 pt-6 border-t border-[#0A1633]/12 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <TeamAvatar
                      initials="RZ"
                      name="Ryan Zannah"
                      tone="from-[#2E6BFF] via-[#0B1020] to-[#03050C]"
                      size="sm"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0A1633]">
                      Ryan Zannah
                    </div>
                    <div className="text-[11px] text-[#525D73]">
                      Founder &amp; CEO · Kushtia &amp; Dhaka
                    </div>
                  </div>
                </div>

                <a
                  href="https://cal.com/qorvaynology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] tracking-[0.14em] text-[#1E3A8A] hover:text-[#2E6BFF] transition-colors"
                >
                  <span>CAL.COM</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 6-Builder Pod Cluster */}
              <div className="mt-6 p-4 bg-[#EFF4FF]/80 border border-[#1E3A8A]/15 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {TEAM_MEMBERS.map((m) => (
                    <div key={m.id} className="w-8 h-8">
                      <TeamAvatar
                        initials={m.initials}
                        name={m.name}
                        tone={m.tone}
                        size="xs"
                      />
                    </div>
                  ))}
                </div>
                <span className="font-mono-tech text-[10px] tracking-[0.14em] text-[#0A1633]">
                  06 CORE BUILDERS
                </span>
              </div>
            </div>

            {/* Right 8 Columns: 1px Hairline Matrix + Narrative + Structured Ecosystem Factsheet */}
            <div className="lg:col-span-8">
              {/* 3-Cell 1px Hairline Matrix for Verifiable Studio Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#0A1633]/12 divide-y sm:divide-y-0 sm:divide-x divide-[#0A1633]/12 bg-white">
                {STUDIO_FACTS.map((fact, idx) => (
                  <motion.div
                    key={fact.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: idx * 0.08,
                      duration: 0.55,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.16em] text-[#525D73]">
                      <span>0{idx + 1} / METRIC</span>
                      <span className="text-[#1E3A8A]">VERIFIED</span>
                    </div>

                    <div className="my-5 font-display text-5xl sm:text-6xl font-semibold leading-none tracking-[-0.045em] text-[#0A1633] flex items-start">
                      <span>{fact.value}</span>
                      {fact.sup && (
                        <span className="text-2xl font-semibold text-[#2E6BFF] ml-1 -mt-1">
                          {fact.sup}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-[#0A1633]">
                        {fact.title}
                      </div>
                      <p className="mt-1.5 text-xs leading-[1.55] text-[#525D73]">
                        {fact.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Concrete Studio Narrative */}
              <div className="mt-10">
                <p className="font-display text-xl sm:text-2xl font-medium leading-[1.45] tracking-[-0.025em] text-[#0A1633]">
                  We started QORVAYN in March 2026 to build our own software:
                  Orbyn, a shared web app for long-distance couples in live
                  beta, and SnowVayn / SunVayn, a seasonal clothing brand and
                  storefront engine.{" "}
                  <span className="text-[#525D73]">
                    Qorvaynology applies that exact six-person product team and
                    Next.js + Supabase architecture to client businesses.
                  </span>
                </p>
              </div>

              {/* Structured Ecosystem Factsheet / Spec Table */}
              <div className="mt-10">
                <div className="flex items-center justify-between pb-3 border-b border-[#0A1633]/15 font-mono-tech text-[10px] tracking-[0.16em] text-[#525D73]">
                  <span>QORVAYN GROUP DIRECTORY</span>
                  <span>STATUS &amp; ARCHITECTURE</span>
                </div>

                <div className="divide-y divide-[#0A1633]/10 border-b border-[#0A1633]/15 text-xs sm:text-sm">
                  {[
                    {
                      idx: "01",
                      name: "QORVAYN",
                      role: "Parent technology company",
                      stack: "Founded 10 Mar 2026 · Bangladesh",
                      status: "Parent Entity",
                    },
                    {
                      idx: "02",
                      name: "Orbyn",
                      role: "Shared web application for long-distance couples (6 real-time modules)",
                      stack: "Next.js 15 · React 19 · Supabase",
                      status: "Live Beta",
                    },
                    {
                      idx: "03",
                      name: "SnowVayn / SunVayn",
                      role: "Seasonal winter & summer apparel storefront with auto-switching theme engine",
                      stack: "Next.js · Tokenized Commerce UI",
                      status: "In Progress",
                    },
                    {
                      idx: "04",
                      name: "Qorvaynology®",
                      role: "Client design & technology studio (Brand, Figma UI/UX, Websites, Web Apps)",
                      stack: "Kushtia & Dhaka · Remote Worldwide",
                      status: "Active Studio",
                    },
                  ].map((row) => (
                    <div
                      key={row.name}
                      className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center"
                    >
                      <div className="sm:col-span-4 flex items-center gap-3">
                        <span className="font-mono-tech text-[10px] text-[#1E3A8A]">
                          /{row.idx}
                        </span>
                        <span className="font-display font-semibold text-[#0A1633]">
                          {row.name}
                        </span>
                      </div>
                      <div className="sm:col-span-5 text-xs text-[#525D73]">
                        {row.role}
                      </div>
                      <div className="sm:col-span-3 flex sm:justify-end items-center gap-2">
                        <span className="font-mono-tech text-[10px] px-2 py-0.5 border border-[#1E3A8A]/25 bg-[#EFF4FF] text-[#1E3A8A]">
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02: CAPABILITIES MATRIX
          Geometry: Flush 6-Cell 1px Hairline Matrix + Interactive Blueprint Bar
      ===================================================================== */}
      <section
        id="services"
        className="paper-surface text-[#0A1633] py-24 sm:py-32 relative overflow-hidden"
      >
        <div className="noise-overlay absolute inset-0" />

        <div className="relative z-10 max-w-[1354px] mx-auto px-5 sm:px-9">
          {/* Header Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-7">
              <SectionIndex num="02" label="CAPABILITIES MATRIX" />
              <h2 className="font-display text-[clamp(2.5rem,5.6vw,76px)] font-semibold leading-[0.98] tracking-[-0.038em] text-[#0A1633]">
                Six disciplines, one integrated product pod.
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4">
              <p className="text-xs sm:text-sm text-[#525D73] max-w-[360px] lg:text-right">
                Select any capability cell below to inspect deliverables,
                typical timeline, and transparent USD / BDT investment bands.
              </p>
              <div className="inline-flex items-center p-1 border border-[#0A1633]/15 bg-white">
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1 font-mono-tech text-[10px] transition-colors cursor-pointer ${
                    currency === "USD"
                      ? "bg-[#0A1633] text-white"
                      : "text-[#525D73] hover:text-[#0A1633]"
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency("BDT")}
                  className={`px-3 py-1 font-mono-tech text-[10px] transition-colors cursor-pointer ${
                    currency === "BDT"
                      ? "bg-[#1E3A8A] text-white"
                      : "text-[#525D73] hover:text-[#0A1633]"
                  }`}
                >
                  BDT (৳)
                </button>
              </div>
            </div>
          </div>

          {/* 6-Cell 1px Hairline Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#0A1633]/15 divide-y md:divide-x divide-[#0A1633]/15 bg-white">
            {SERVICES_LIST.map((srv) => {
              const isSelected = activeService.id === srv.id;
              const scopeStat = SERVICE_SCOPE_COUNTS[srv.id] || {
                num: "12",
                unit: "Deliverables",
              };

              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setOpenServiceId(srv.id)}
                  className={`text-left p-6 sm:p-8 flex flex-col justify-between transition-colors cursor-pointer relative ${
                    isSelected
                      ? "bg-[#EFF4FF]"
                      : "bg-white hover:bg-[#F8FAFF]"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-0 left-0 right-0 h-[3px] bg-[#1E3A8A]" />
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono-tech text-[11px] tracking-[0.16em] text-[#1E3A8A]">
                        {srv.index} · {srv.timeline.toUpperCase()}
                      </span>
                      <span className="font-mono-tech text-[10px] px-2 py-0.5 border border-[#0A1633]/15 text-[#0A1633]">
                        {scopeStat.num} {scopeStat.unit}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-[#0A1633]">
                      {srv.title}
                    </h3>
                    <p className="mt-2 text-xs leading-[1.6] text-[#525D73]">
                      {srv.summary}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#0A1633]/10 flex items-center justify-between">
                    <div>
                      <div className="font-mono-tech text-[10px] text-[#525D73]">
                        TYPICAL BAND
                      </div>
                      <div className="font-display text-base font-semibold text-[#0A1633]">
                        {currency === "USD" ? srv.usdRange : srv.bdtRange}
                      </div>
                    </div>
                    <span
                      className={`font-mono-tech text-[10px] tracking-[0.14em] ${
                        isSelected ? "text-[#1E3A8A] font-semibold" : "text-[#525D73]"
                      }`}
                    >
                      {isSelected ? "INSPECTING ●" : "INSPECT →"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Capability Blueprint Bar (Updates live when any matrix cell is selected) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              className="mt-6 border border-[#1E3A8A]/30 bg-[#07122E] text-white p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Col 1-4: Selected Discipline Title + Navy Sphere Emblem */}
                <div className="lg:col-span-4 flex items-center gap-5">
                  <div className="relative shrink-0">
                    <img
                      src="/astra/service-sphere.png"
                      alt={activeService.title}
                      className="w-[84px] h-[84px] sm:w-[96px] sm:h-[96px] rounded-full object-cover ring-2 ring-[#2E6BFF]/45 [filter:hue-rotate(205deg)_saturate(1.4)_contrast(1.05)]"
                    />
                  </div>
                  <div>
                    <div className="font-mono-tech text-[10px] tracking-[0.16em] text-[#60A5FA]">
                      {activeService.index} / BLUEPRINT SPECIFICATION
                    </div>
                    <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
                      {activeService.title}
                    </h3>
                    <div className="mt-1 text-xs text-white/65">
                      Timeline: {activeService.timeline} ·{" "}
                      {currency === "USD"
                        ? activeService.usdRange
                        : activeService.bdtRange}
                    </div>
                  </div>
                </div>

                {/* Col 5-9: Deliverables Checklist */}
                <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/12 pt-5 lg:pt-0 lg:pl-8">
                  <div className="font-mono-tech text-[10px] tracking-[0.16em] text-white/50 mb-3">
                    INCLUDED DELIVERABLES &amp; HANDOVER
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/90">
                    {activeService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono-tech text-[10px] text-[#60A5FA] mt-0.5">
                          0{idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 10-12: Benchmarks + Direct Scope CTA */}
                <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-white/12 pt-5 lg:pt-0 lg:pl-8 flex flex-col justify-between gap-4">
                  <div>
                    <div className="font-mono-tech text-[10px] tracking-[0.16em] text-white/50">
                      STUDIO BENCHMARKS
                    </div>
                    <div className="mt-1.5 text-xs text-white/85">
                      {activeService.relatedProjects.join(" · ")}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openContactWith(
                        `Capability Inquiry — ${activeService.title} (${
                          currency === "USD"
                            ? activeService.usdRange
                            : activeService.bdtRange
                        })`
                      )
                    }
                    className="w-full py-3 px-5 bg-[#2E6BFF] hover:bg-white text-white hover:text-[#0A1633] font-mono-tech text-[11px] tracking-[0.14em] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>SCOPE THIS CAPABILITY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================================
          SECTIONS 03 & 04: STICKY UNIVERSE WRAPPER FOR WORK & INTERACTIVE SCOPE
      ===================================================================== */}
      <div className="relative bg-[#050B1C] text-white">
        {/* Sticky 100vh Universe Starfield Backdrop + Signature Midnight Navy Glow */}
        <div
          aria-hidden="true"
          className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0"
        >
          <img
            src="/astra/section-stars-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_75%_30%,rgba(29,78,216,0.44),rgba(7,18,46,0.70)_55%,rgba(4,7,17,0.90)_90%)]" />
        </div>

        {/* Content floating over the Sticky Universe Starfield */}
        <div className="relative z-10 -mt-[100vh]">
          {/* -----------------------------------------------------------------
              SECTION 03: SELECTED WORK (Editorial Frame + 1px Spec Strip)
          ----------------------------------------------------------------- */}
          <section
            id="projects"
            className="pt-28 sm:pt-36 pb-24 border-b border-white/10"
          >
            <div className="max-w-[1354px] mx-auto px-5 sm:px-9">
              {/* Asymmetric 5/7 Header + Filter Bar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
                <div className="lg:col-span-6">
                  <SectionIndex
                    num="03"
                    label="SELECTED WORK &amp; VENTURES"
                    tone="light"
                  />
                  <h2 className="font-display text-[clamp(2.8rem,6.5vw,88px)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
                    Shipped products &amp; studio systems.
                  </h2>
                </div>

                <div className="lg:col-span-6 flex flex-col lg:items-end justify-end gap-4">
                  <p className="text-xs sm:text-sm text-white/65 max-w-[440px] lg:text-right">
                    Real QORVAYN ventures in live beta and active build,
                    alongside clearly labeled studio concept explorations.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: `All (0${PROJECTS_LIST.length})`, filter: "All" },
                      { label: "Brand Systems", filter: "Brand" },
                      { label: "Web Apps & UI/UX", filter: "App" },
                      { label: "Seasonal Commerce", filter: "Commerce" },
                    ].map((cat) => {
                      const active = selectedProjectCategory === cat.filter;
                      return (
                        <button
                          key={cat.filter}
                          type="button"
                          onClick={() =>
                            setSelectedProjectCategory(cat.filter)
                          }
                          className={`px-3.5 py-2 font-mono-tech text-[10px] tracking-[0.14em] border transition-colors cursor-pointer ${
                            active
                              ? "bg-[#2E6BFF] text-white border-[#2E6BFF]"
                              : "bg-[#050B1C]/70 text-white/65 border-white/15 hover:border-white/40 hover:text-white"
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Architectural Project Frames with 1px Spec Strips */}
              <div className="space-y-16 sm:space-y-20">
                {filteredProjects.map((project, idx) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      delay: idx * 0.05,
                      duration: 0.65,
                      ease: EASE_OUT_EXPO,
                    }}
                    onClick={() => setActiveCaseStudy(project)}
                    className="border border-white/15 bg-[#050B1C]/85 backdrop-blur-md cursor-pointer group"
                  >
                    {/* Top 1px Architectural Bar */}
                    <div className="px-5 sm:px-8 py-3.5 border-b border-white/12 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono-tech text-[11px] text-[#60A5FA]">
                          0{idx + 1} / {project.badge.toUpperCase()}
                        </span>
                        <span className="text-white/25">·</span>
                        <span className="font-display text-lg font-semibold text-white">
                          {project.title}
                        </span>
                        <span className="hidden md:inline text-xs text-white/55">
                          — {project.subtitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono-tech text-[10px] text-white/55">
                          {project.dateLabel}
                        </span>
                        <span className="font-mono-tech text-[10px] px-2.5 py-1 bg-[#1E3A8A]/45 border border-[#2E6BFF]/40 text-white group-hover:bg-[#2E6BFF] transition-colors">
                          OPEN CASE STUDY →
                        </span>
                      </div>
                    </div>

                    {/* Main Interactive Video / Visual Canvas */}
                    <div className="p-3 sm:p-6">
                      <ProjectArtwork projectId={project.id} variant="hero" />
                    </div>

                    {/* Bottom 4-Cell 1px Hairline Spec Table */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/12 divide-y lg:divide-y-0 divide-x divide-white/12 text-xs">
                      <div className="p-4 sm:px-6">
                        <div className="font-mono-tech text-[10px] text-white/45">
                          OWNER / STATUS
                        </div>
                        <div className="mt-1 font-medium text-white">
                          {project.clientOrOwner}
                        </div>
                      </div>
                      <div className="p-4 sm:px-6">
                        <div className="font-mono-tech text-[10px] text-white/45">
                          DISCIPLINE
                        </div>
                        <div className="mt-1 font-medium text-white">
                          {project.category}
                        </div>
                      </div>
                      <div className="p-4 sm:px-6">
                        <div className="font-mono-tech text-[10px] text-white/45">
                          STACK &amp; SYSTEM
                        </div>
                        <div className="mt-1 font-mono-tech text-[11px] text-[#60A5FA] truncate">
                          {project.stack}
                        </div>
                      </div>
                      <div className="p-4 sm:px-6 flex items-center justify-between">
                        <div>
                          <div className="font-mono-tech text-[10px] text-white/45">
                            KEY METRIC
                          </div>
                          <div className="mt-1 font-medium text-white">
                            {project.metrics[0]?.value}{" "}
                            <span className="text-white/55">
                              {project.metrics[0]?.label}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#60A5FA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              SECTION 04: INTERACTIVE SCOPE & INVESTMENT ARCHITECT
              Geometry: Real In-Page Interactive Calculator + Sticky Lunar Spheres
          ----------------------------------------------------------------- */}
          <section
            ref={pricingScrollRef}
            id="pricing"
            className="pt-24 sm:pt-32 pb-28"
          >
            <div className="max-w-[1354px] mx-auto px-5 sm:px-9">
              {/* Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
                <div className="lg:col-span-7">
                  <SectionIndex
                    num="04"
                    label="INTERACTIVE SCOPE &amp; INVESTMENT ARCHITECT"
                    tone="light"
                  />
                  <h2 className="font-display text-[clamp(2.6rem,6vw,84px)] font-semibold leading-[0.96] tracking-[-0.04em] text-white">
                    Transparent 3-tier pricing &amp; live milestone calculator.
                  </h2>
                </div>
                <div className="lg:col-span-5 flex lg:justify-end">
                  <p className="text-xs sm:text-sm text-white/65 max-w-[410px] lg:text-right">
                    Configure your primary package, tier, and optional add-ons
                    below to calculate exact USD or BDT milestone payments
                    before our discovery call.
                  </p>
                </div>
              </div>

              {/* 7/5 Split: Left Interactive Scope Architect, Right Sticky Lunar Spheres & Retainer */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 Columns: Interactive In-Page Scope Configurator */}
                <div className="lg:col-span-7 border border-[#2E6BFF]/35 bg-[#07122E]/85 backdrop-blur-md p-6 sm:p-10">
                  {/* Step 1: Currency & Package Track */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/12">
                    <div>
                      <div className="font-mono-tech text-[10px] tracking-[0.16em] text-[#60A5FA]">
                        STEP 01 / SELECT TRACK &amp; CURRENCY
                      </div>
                      <div className="mt-1 text-xs text-white/65">
                        International (USD) &amp; Bangladesh (BDT) rate cards
                      </div>
                    </div>

                    <div className="inline-flex items-center p-1 bg-[#050B1C] border border-white/15">
                      <button
                        type="button"
                        onClick={() => setCurrency("USD")}
                        className={`px-3.5 py-1 font-mono-tech text-[11px] transition-colors cursor-pointer ${
                          currency === "USD"
                            ? "bg-white text-[#0A1633] font-semibold"
                            : "text-white/65 hover:text-white"
                        }`}
                      >
                        USD ($)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency("BDT")}
                        className={`px-3.5 py-1 font-mono-tech text-[11px] transition-colors cursor-pointer ${
                          currency === "BDT"
                            ? "bg-[#2E6BFF] text-white font-semibold"
                            : "text-white/65 hover:text-white"
                        }`}
                      >
                        BDT (৳)
                      </button>
                    </div>
                  </div>

                  {/* 4 Package Track Buttons */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PRICING_PACKAGES.map((pkg) => {
                      const active = selectedPkgId === pkg.id;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setSelectedPkgId(pkg.id)}
                          className={`p-4 text-left border transition-colors cursor-pointer ${
                            active
                              ? "bg-[#1E3A8A]/55 border-[#2E6BFF] text-white"
                              : "bg-[#050B1C]/60 border-white/12 text-white/75 hover:border-white/35"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display text-sm font-semibold">
                              {pkg.name}
                            </span>
                            <span className="font-mono-tech text-[10px] text-[#60A5FA]">
                              {pkg.timeline}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-white/55 line-clamp-1">
                            {pkg.summary}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Step 2: 3-Tier Selector (Basic / Standard / Premium) */}
                  <div className="mt-8 pt-6 border-t border-white/12">
                    <div className="font-mono-tech text-[10px] tracking-[0.16em] text-[#60A5FA] mb-3">
                      STEP 02 / CHOOSE SCOPE TIER
                    </div>

                    <div className="grid grid-cols-3 border border-white/15 divide-x divide-white/15">
                      {currentPackage.tiers.map((t, idx) => {
                        const active = selectedTierIdx === idx;
                        return (
                          <button
                            key={t.tierName}
                            type="button"
                            onClick={() => setSelectedTierIdx(idx)}
                            className={`p-3.5 sm:p-4 text-left transition-colors cursor-pointer ${
                              active
                                ? "bg-white text-[#0A1633]"
                                : "bg-[#050B1C]/60 text-white/75 hover:bg-white/5"
                            }`}
                          >
                            <div className="font-mono-tech text-[10px] tracking-[0.14em] opacity-70">
                              0{idx + 1} / {t.tierName.toUpperCase()}
                            </div>
                            <div className="mt-1 font-display text-lg sm:text-xl font-semibold">
                              {currency === "USD" ? t.usd : t.bdt}
                            </div>
                            <div className="mt-0.5 text-[11px] opacity-75 line-clamp-1">
                              {t.subtitle}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Included Features for Selected Tier */}
                    <div className="mt-5 p-4 bg-[#050B1C]/70 border border-white/10">
                      <div className="font-mono-tech text-[10px] text-white/50 mb-2.5">
                        INCLUDED IN {currentPackage.name.toUpperCase()} (
                        {currentTier.tierName.toUpperCase()})
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/90">
                        {currentTier.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#60A5FA] font-bold">+</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Step 3: Interactive Add-on Toggles */}
                  <div className="mt-8 pt-6 border-t border-white/12">
                    <div className="font-mono-tech text-[10px] tracking-[0.16em] text-[#60A5FA] mb-3">
                      STEP 03 / OPTIONAL STUDIO ADD-ONS
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SCOPE_ADDONS.map((addon) => {
                        const checked = !!selectedAddons[addon.id];
                        const priceText =
                          currency === "USD"
                            ? `+$${addon.usd}${addon.recurring ? "/mo" : ""}`
                            : `+৳${addon.bdt.toLocaleString("en-IN")}${
                                addon.recurring ? "/mo" : ""
                              }`;
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() => toggleAddon(addon.id)}
                            className={`p-3 border text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                              checked
                                ? "bg-[#1E3A8A]/50 border-[#2E6BFF] text-white"
                                : "bg-[#050B1C]/50 border-white/12 text-white/70 hover:border-white/30"
                            }`}
                          >
                            <span className="flex items-center gap-2.5 text-xs">
                              <span
                                className={`w-4 h-4 flex items-center justify-center border ${
                                  checked
                                    ? "bg-[#2E6BFF] border-[#2E6BFF] text-white"
                                    : "border-white/30"
                                }`}
                              >
                                {checked && <Check className="w-3 h-3" />}
                              </span>
                              <span>{addon.label}</span>
                            </span>
                            <span className="font-mono-tech text-[10px] text-[#60A5FA] shrink-0">
                              {priceText}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4: Live Calculated Estimate & Milestone Schedule */}
                  <div className="mt-8 pt-6 border-t border-[#2E6BFF]/40 bg-[#050B1C]/90 p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <div>
                        <div className="font-mono-tech text-[10px] tracking-[0.16em] text-[#60A5FA]">
                          ESTIMATED PROJECT INVESTMENT
                        </div>
                        <div className="mt-1 font-display text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-white">
                          {formatMoney(totalEstimate)}
                          {selectedPkgId === "webapp-mvp" &&
                            selectedTierIdx === 2 && (
                              <span className="text-2xl text-[#60A5FA]">+</span>
                            )}
                        </div>
                        {hasCarePlan && (
                          <div className="mt-1 font-mono-tech text-[10px] text-[#60A5FA]">
                            + {currency === "USD" ? "$100/mo" : "৳8,000/mo"}{" "}
                            POST-30D CARE PLAN
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="font-mono-tech text-[10px] text-white/50">
                          ESTIMATED TIMELINE
                        </div>
                        <div className="mt-1 font-display text-lg font-semibold text-white">
                          {currentPackage.timeline}
                        </div>
                        <div className="text-[11px] text-white/55">
                          + 30 days post-launch support
                        </div>
                      </div>
                    </div>

                    {/* Milestone Breakdown Bar */}
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <div className="font-mono-tech text-[10px] text-white/50 mb-2">
                        CONTRACT MILESTONE SCHEDULE (
                        {isThreeMilestone
                          ? "40% / 30% / 30%"
                          : "50% KICKOFF / 50% HANDOVER"}
                        )
                      </div>
                      {isThreeMilestone ? (
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="p-2.5 bg-white/[0.03] border border-white/10">
                            <div className="font-mono-tech text-[10px] text-[#60A5FA]">
                              40% KICKOFF
                            </div>
                            <div className="font-semibold mt-0.5">
                              {formatMoney(Math.round(totalEstimate * 0.4))}
                            </div>
                          </div>
                          <div className="p-2.5 bg-white/[0.03] border border-white/10">
                            <div className="font-mono-tech text-[10px] text-[#60A5FA]">
                              30% FIGMA / MID
                            </div>
                            <div className="font-semibold mt-0.5">
                              {formatMoney(Math.round(totalEstimate * 0.3))}
                            </div>
                          </div>
                          <div className="p-2.5 bg-white/[0.03] border border-white/10">
                            <div className="font-mono-tech text-[10px] text-[#60A5FA]">
                              30% LAUNCH
                            </div>
                            <div className="font-semibold mt-0.5">
                              {formatMoney(
                                totalEstimate -
                                  Math.round(totalEstimate * 0.4) -
                                  Math.round(totalEstimate * 0.3)
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-white/[0.03] border border-white/10">
                            <div className="font-mono-tech text-[10px] text-[#60A5FA]">
                              50% KICKOFF DEPOSIT
                            </div>
                            <div className="font-semibold mt-0.5">
                              {formatMoney(Math.round(totalEstimate * 0.5))}
                            </div>
                          </div>
                          <div className="p-2.5 bg-white/[0.03] border border-white/10">
                            <div className="font-mono-tech text-[10px] text-[#60A5FA]">
                              50% FINAL HANDOVER
                            </div>
                            <div className="font-semibold mt-0.5">
                              {formatMoney(
                                totalEstimate - Math.round(totalEstimate * 0.5)
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openContactWith(
                          `Configured Scope: ${currentPackage.name} (${
                            currentTier.tierName
                          }) — Est. ${formatMoney(totalEstimate)}${
                            activeAddonNames.length
                              ? ` + [${activeAddonNames.join(", ")}]`
                              : ""
                          }`
                        )
                      }
                      className="mt-5 w-full py-3.5 px-6 bg-[#2E6BFF] hover:bg-white text-white hover:text-[#0A1633] font-mono-tech text-[11px] tracking-[0.15em] font-semibold flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>LOCK IN THIS SCOPE FOR DISCOVERY CALL</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right 5 Columns: Scroll-Animated Lunar Spheres (Per Project + Monthly Retainer) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Card /01: Fixed-Scope Project Sphere */}
                  <div className="border border-[#2E6BFF]/25 bg-[#091536]/60 backdrop-blur-sm p-6 sm:p-8">
                    <div className="flex items-center justify-between pb-3 border-b border-[#2E6BFF]/30">
                      <span className="font-mono-tech text-[10px] tracking-[0.16em] text-[#60A5FA]">
                        /01 · FIXED-SCOPE ENGAGEMENT
                      </span>
                      <span className="font-mono-tech text-[10px] text-white/55">
                        {currentPackage.timeline}
                      </span>
                    </div>

                    <div className="mt-6 flex items-center gap-6">
                      <motion.div
                        style={{ y: planet1Y, scale: planet1Scale }}
                        className="relative w-[124px] h-[124px] sm:w-[144px] sm:h-[144px] rounded-full shrink-0"
                      >
                        <img
                          src="/astra/moon-shadow.png"
                          alt=""
                          className="absolute -inset-3 w-[170px] h-[170px] rounded-full object-cover opacity-50 pointer-events-none"
                        />
                        <img
                          src="/astra/pack-project.png"
                          alt="Per Project Sphere"
                          className="relative z-10 w-full h-full rounded-full object-cover shadow-2xl ring-2 ring-[#2E6BFF]/40"
                        />
                      </motion.div>

                      <div>
                        <div className="font-mono-tech text-[10px] text-[#60A5FA]">
                          {currentPackage.name.toUpperCase()}
                        </div>
                        <div className="mt-1 font-display text-3xl font-semibold text-white">
                          {currency === "USD"
                            ? currentTier.usd
                            : currentTier.bdt}
                        </div>
                        <p className="mt-2 text-xs text-white/65 leading-relaxed">
                          Written scope, weekly Friday staging demos, full
                          GitHub &amp; Figma ownership, and 30 days of support.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card /02: Monthly Growth Retainer Lunar Sphere */}
                  <div className="border border-white/15 bg-[#050B1C]/80 backdrop-blur-sm p-6 sm:p-8">
                    <div className="flex items-center justify-between pb-3 border-b border-white/15">
                      <span className="font-mono-tech text-[10px] tracking-[0.16em] text-[#60A5FA]">
                        /02 · DEDICATED MONTHLY POD
                      </span>
                      <span className="font-mono-tech text-[10px] text-white/55">
                        ONGOING
                      </span>
                    </div>

                    <div className="mt-6 flex items-center gap-6">
                      <motion.div
                        style={{ y: planet2Y, scale: planet2Scale }}
                        className="relative w-[124px] h-[124px] sm:w-[144px] sm:h-[144px] rounded-full shrink-0"
                      >
                        <img
                          src="/astra/moon-shadow.png"
                          alt=""
                          className="absolute -inset-3 w-[170px] h-[170px] rounded-full object-cover opacity-40 pointer-events-none"
                        />
                        <img
                          src="/astra/pack-month.png"
                          alt="Monthly Retainer Sphere"
                          className="relative z-10 w-full h-full rounded-full object-cover shadow-2xl ring-2 ring-[#2E6BFF]/40"
                        />
                      </motion.div>

                      <div>
                        <div className="font-mono-tech text-[10px] text-white/60">
                          GROWTH RETAINER &amp; CARE
                        </div>
                        <div className="mt-1 font-display text-3xl font-semibold text-white">
                          {currency === "USD"
                            ? "$500 – $2,000/mo"
                            : "৳20k – ৳60k/mo"}
                        </div>
                        <p className="mt-2 text-xs text-white/65 leading-relaxed">
                          Continuous Next.js feature shipping, conversion pages,
                          social design systems, and Friday progress reports.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/12 flex items-center justify-between">
                      <span className="text-xs text-white/60">
                        Cancel or pause between monthly cycles
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          openContactWith("Monthly Growth Retainer Inquiry")
                        }
                        className="px-4 py-2 border border-[#2E6BFF]/60 bg-[#0F2557]/80 hover:bg-white text-white hover:text-[#0A1633] font-mono-tech text-[10px] tracking-[0.14em] transition-colors cursor-pointer"
                      >
                        INQUIRE RETAINER →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =====================================================================
          SECTION 05: DELIVERY ARCHITECTURE & STUDIO STANDARD
          Geometry: Asymmetric 5/7 Split + Interactive 4-Stage Sprint Switcher
                    + 1px Hairline Product Benchmarks Matrix
      ===================================================================== */}
      <section
        id="method"
        className="paper-surface text-[#0A1633] py-24 sm:py-32 relative overflow-hidden border-b border-[#0A1633]/10"
      >
        <div className="noise-overlay absolute inset-0" />

        <div className="relative z-10 max-w-[1354px] mx-auto px-5 sm:px-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 5 Columns: Heading + Interactive 4-Stage Delivery Selector */}
            <div className="lg:col-span-5">
              <SectionIndex num="05" label="DELIVERY ARCHITECTURE" />
              <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.02] tracking-[-0.038em] text-[#0A1633]">
                How a build moves from discovery call to 30-day care.
              </h2>
              <p className="mt-4 text-xs sm:text-sm leading-[1.65] text-[#525D73]">
                No vague agency retainers or disappearing freelancers. Every
                project follows four fixed checkpoints with written sign-offs
                and weekly Friday builds.
              </p>

              {/* 4-Stage Vertical Selector Buttons */}
              <div className="mt-8 border border-[#0A1633]/15 divide-y divide-[#0A1633]/15 bg-white">
                {DELIVERY_STAGES.map((st, idx) => {
                  const active = activeStageIdx === idx;
                  return (
                    <button
                      key={st.num}
                      type="button"
                      onClick={() => setActiveStageIdx(idx)}
                      className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                        active
                          ? "bg-[#0A1633] text-white"
                          : "bg-white text-[#0A1633] hover:bg-[#EFF4FF]"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`font-mono-tech text-[11px] mt-0.5 ${
                            active ? "text-[#60A5FA]" : "text-[#1E3A8A]"
                          }`}
                        >
                          /{st.num}
                        </span>
                        <div>
                          <div className="font-display text-sm sm:text-base font-semibold">
                            {st.title}
                          </div>
                          <div
                            className={`text-[11px] mt-0.5 ${
                              active ? "text-white/65" : "text-[#525D73]"
                            }`}
                          >
                            {st.duration}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono-tech text-[10px]">
                        {active ? "ACTIVE ●" : "VIEW →"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 7 Columns: Live Stage Specification + 2x2 Hairline Benchmark Matrix */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.num}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                  className="border border-[#0A1633]/15 bg-white p-6 sm:p-10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#0A1633]/12">
                    <span className="font-mono-tech text-[11px] tracking-[0.16em] text-[#1E3A8A]">
                      {activeStage.code}
                    </span>
                    <span className="font-mono-tech text-[10px] px-2.5 py-1 bg-[#EFF4FF] text-[#1E3A8A] border border-[#1E3A8A]/20">
                      {activeStage.duration}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#0A1633]">
                    {activeStage.title}
                  </h3>

                  <p className="mt-3 text-sm leading-[1.7] text-[#525D73]">
                    {activeStage.summary}
                  </p>

                  {/* Stage Artifacts Grid */}
                  <div className="mt-8 pt-6 border-t border-[#0A1633]/12">
                    <div className="font-mono-tech text-[10px] tracking-[0.16em] text-[#525D73] mb-4">
                      STAGE DELIVERABLES &amp; VERIFICATION ARTIFACTS
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeStage.artifacts.map((art, i) => (
                        <div
                          key={i}
                          className="p-3.5 bg-[#F8FAFF] border border-[#0A1633]/10 flex items-start gap-2.5 text-xs text-[#0A1633]"
                        >
                          <span className="font-mono-tech text-[10px] text-[#1E3A8A] mt-0.5">
                            0{i + 1}
                          </span>
                          <span className="font-medium">{art}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stage Lead Attribution */}
                  <div className="mt-8 pt-5 border-t border-[#0A1633]/12 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <TeamAvatar
                        initials={activeStage.leadInitials}
                        name={activeStage.lead}
                        size="sm"
                      />
                      <div>
                        <div className="text-xs font-semibold text-[#0A1633]">
                          Stage Lead: {activeStage.lead}
                        </div>
                        <div className="text-[11px] text-[#525D73]">
                          {activeStage.leadRole}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openContactWith(
                          `Discovery Call — ${activeStage.title}`
                        )
                      }
                      className="px-5 py-2.5 bg-[#0A1633] hover:bg-[#1E3A8A] text-white font-mono-tech text-[10px] tracking-[0.14em] transition-colors cursor-pointer"
                    >
                      BOOK 15–30M DISCOVERY CALL →
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* 2x2 1px Hairline Matrix: In-House Product Benchmarks */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 border border-[#0A1633]/15 divide-y sm:divide-x divide-[#0A1633]/15 bg-white">
                {[
                  {
                    code: "BENCHMARK 01 / ORBYN",
                    metric: "06+",
                    title: "Real-Time Modules in Live Beta",
                    note: "Presence, daily reflection, voice notes, shared memories, AI date planner, and two-person photobooth on Next.js & Supabase.",
                  },
                  {
                    code: "BENCHMARK 02 / SNOWVAYN & SUNVAYN",
                    metric: "02×",
                    title: "Dual-Season Commerce Engine",
                    note: "Tokenized storefront architecture that shifts identity and catalog styling between winter and summer seasons.",
                  },
                  {
                    code: "BENCHMARK 03 / CONTINUUM",
                    metric: "27",
                    title: "Production Brand Asset Pack",
                    note: "Every brand identity ships with 27 production files across SVG, PNG, JPG, and print-ready PDF with dark/light surface rules.",
                  },
                  {
                    code: "BENCHMARK 04 / CARE STANDARD",
                    metric: "30d",
                    title: "Included Post-Launch Support",
                    note: "Every website and web app includes a structured launch checklist, full code handover, and 30 days of engineering care.",
                  },
                ].map((bm) => (
                  <div key={bm.code} className="p-6">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono-tech text-[10px] tracking-[0.14em] text-[#1E3A8A]">
                        {bm.code}
                      </span>
                      <span className="font-display text-2xl font-semibold text-[#0A1633]">
                        {bm.metric}
                      </span>
                    </div>
                    <div className="mt-2 text-xs font-semibold text-[#0A1633]">
                      {bm.title}
                    </div>
                    <p className="mt-1 text-xs leading-[1.55] text-[#525D73]">
                      {bm.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 06: LEADERSHIP & ENGINEERING POD
          Geometry: Sticky Orbital Stage + 6-Cell 1px Hairline Roster Matrix
      ===================================================================== */}
      <div
        ref={teamScrollRef}
        id="team"
        className="relative bg-[#03050C] text-white py-24 sm:py-32 border-b border-white/10"
      >
        <img
          src="/astra/section-stars-bg.png"
          alt=""
          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_65%_45%,rgba(30,58,138,0.38),rgba(3,5,12,0.78)_75%)]"
        />

        <div className="relative z-10 max-w-[1354px] w-full mx-auto px-5 sm:px-9">
          {/* Header + Active Orbital Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-6">
              <SectionIndex
                num="06"
                label="LEADERSHIP &amp; ENGINEERING POD"
                tone="light"
              />
              <h2 className="font-display text-[clamp(2.6rem,6vw,84px)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
                Six builders behind QORVAYN &amp; Qorvaynology.
              </h2>
            </div>
            <div className="lg:col-span-6 flex lg:justify-end">
              <p className="text-xs sm:text-sm text-white/65 max-w-[420px] lg:text-right">
                Select any team member in the orbital stage or the 1px roster
                matrix below to inspect their role, division, and direct quote.
              </p>
            </div>
          </div>

          {/* Interactive Orbital Spotlight Bar */}
          <div className="border border-white/15 bg-[#050B1C]/80 backdrop-blur-md p-6 sm:p-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 5 Cols: Active Portrait + Orbital Satellites */}
              <div className="lg:col-span-5 flex items-center justify-between sm:justify-start gap-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.id}
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.88, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                    }}
                    className="shrink-0"
                  >
                    <TeamAvatar
                      initials={activeMember.initials}
                      name={activeMember.name}
                      tone={activeMember.tone}
                      size="lg"
                      active
                    />
                  </motion.div>
                </AnimatePresence>

                <div>
                  <div className="font-mono-tech text-[10px] tracking-[0.16em] text-[#60A5FA]">
                    0{activeTeamIdx + 1} / 0{TEAM_MEMBERS.length} ·{" "}
                    {activeMember.location.toUpperCase()}
                  </div>
                  <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-white">
                    {activeMember.name}
                  </h3>
                  <div className="text-xs text-white/70 mt-0.5">
                    {activeMember.role} · {activeMember.division}
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTeamIdx((prev) =>
                          prev === 0 ? TEAM_MEMBERS.length - 1 : prev - 1
                        )
                      }
                      className="px-3 py-1.5 border border-white/20 hover:border-white font-mono-tech text-[10px] text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      ← PREV.
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTeamIdx((prev) =>
                          prev === TEAM_MEMBERS.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="px-3 py-1.5 border border-white/20 hover:border-white font-mono-tech text-[10px] text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      NEXT →
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 7 Cols: Direct Quote & Focus Tags */}
              <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-white/12 pt-6 lg:pt-0 lg:pl-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="font-display text-lg sm:text-xl font-medium leading-[1.5] text-white/90">
                      &ldquo;{activeMember.quote}&rdquo;
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeMember.focusAreas.map((area) => (
                        <span
                          key={area}
                          className="font-mono-tech text-[10px] px-2.5 py-1 bg-[#1E3A8A]/35 border border-[#2E6BFF]/35 text-[#93C5FD]"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 6-Cell 1px Hairline Roster Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-white/15 divide-y sm:divide-x divide-white/15 bg-[#050B1C]/75">
            {TEAM_MEMBERS.map((member, idx) => {
              const isSelected = idx === activeTeamIdx;
              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => setActiveTeamIdx(idx)}
                  className={`p-6 text-left transition-colors cursor-pointer relative ${
                    isSelected
                      ? "bg-[#0F2557]/75"
                      : "hover:bg-white/[0.04]"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#2E6BFF]" />
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <TeamAvatar
                        initials={member.initials}
                        name={member.name}
                        tone={member.tone}
                        size="sm"
                      />
                      <div>
                        <div className="font-display text-base font-semibold text-white">
                          {member.name}
                        </div>
                        <div className="text-xs text-[#60A5FA]">
                          {member.role}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono-tech text-[10px] text-white/45">
                      /0{idx + 1}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                    <span>{member.division}</span>
                    <span className="font-mono-tech text-[10px] text-white/45">
                      {member.location}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 07: STUDIO NOTES (INSIGHTS)
          Geometry: Structured 12-Column Editorial Index Rows (divide-y)
      ===================================================================== */}
      <section
        id="insights"
        className="paper-surface text-[#0A1633] py-24 sm:py-32 border-b border-[#0A1633]/10"
      >
        <div className="max-w-[1354px] mx-auto px-5 sm:px-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-7">
              <SectionIndex num="07" label="STUDIO NOTES &amp; ARCHITECTURE" />
              <h2 className="font-display text-[clamp(2.5rem,5.5vw,76px)] font-semibold leading-[0.98] tracking-[-0.038em] text-[#0A1633]">
                Notes on shipping software and enduring brand systems.
              </h2>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
              <p className="text-xs sm:text-sm text-[#525D73] max-w-[380px] lg:text-right">
                Written by our founders and engineers from real product work on
                Orbyn, SnowVayn, and Qorvaynology.
              </p>
            </div>
          </div>

          {/* Structured Editorial Table Rows */}
          <div className="divide-y divide-[#0A1633]/12 border-t border-b border-[#0A1633]/15">
            {INSIGHTS_LIST.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.08,
                  duration: 0.55,
                  ease: EASE_OUT_EXPO,
                }}
                onClick={() => setActiveInsight(article)}
                className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center cursor-pointer group hover:bg-[#EFF4FF]/50 px-3 -mx-3 transition-colors"
              >
                {/* Col 1-2: Number + Date + Read time */}
                <div className="lg:col-span-2 flex lg:flex-col justify-between gap-2">
                  <span className="font-mono-tech text-[10px] tracking-[0.16em] text-[#1E3A8A]">
                    /0{idx + 1} · {article.category.toUpperCase()}
                  </span>
                  <div className="font-mono-tech text-[11px] text-[#525D73]">
                    {article.day} {article.month} {article.year} ·{" "}
                    {article.readTime}
                  </div>
                </div>

                {/* Col 3-4: 88px Circular Visual Aperture */}
                <div className="lg:col-span-2 flex items-center">
                  <img
                    src={INSIGHT_IMAGES[idx % INSIGHT_IMAGES.length]}
                    alt={article.title}
                    className="w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Col 5-9: Title & Excerpt */}
                <div className="lg:col-span-6">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.025em] text-[#0A1633] group-hover:text-[#1E3A8A] transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#525D73] leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                {/* Col 10-12: Author + Open Trigger */}
                <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-end justify-between gap-2">
                  <div className="text-xs font-medium text-[#0A1633]">
                    {article.author}
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono-tech text-[10px] tracking-[0.14em] text-[#1E3A8A] group-hover:translate-x-1 transition-transform">
                    <span>READ NOTE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 08: FAQ ACCORDION
          Geometry: Asymmetric 4/8 Split + 1px Hairline Accordion
      ===================================================================== */}
      <section
        id="faq"
        className="paper-surface text-[#0A1633] py-24 sm:py-32 relative overflow-hidden"
      >
        <div className="noise-overlay absolute inset-0" />

        <div className="relative z-10 max-w-[1354px] mx-auto px-5 sm:px-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 4 Cols: Section Index + Heading + Direct Founder Contact */}
            <div className="lg:col-span-4">
              <SectionIndex num="08" label="QUESTIONS &amp; TERMS" />
              <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.02] tracking-[-0.038em] text-[#0A1633]">
                Answers before we talk.
              </h2>
              <p className="mt-4 text-xs sm:text-sm leading-[1.65] text-[#525D73]">
                Questions we get on almost every discovery call regarding
                timelines, milestone payments, code ownership, and post-launch
                support.
              </p>

              <div className="mt-8 p-5 border border-[#0A1633]/15 bg-white">
                <div className="flex items-center gap-3">
                  <TeamAvatar
                    initials="RZ"
                    name="Ryan Zannah"
                    tone="from-[#2E6BFF] to-[#0B1020]"
                    size="sm"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#0A1633]">
                      Ryan Zannah
                    </div>
                    <div className="text-[11px] text-[#525D73]">
                      Founder &amp; CEO · Replies within 24h
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openContactWith("Direct Question from FAQ")}
                  className="mt-4 w-full py-2.5 px-4 bg-[#0B1B46] hover:bg-[#1E3A8A] text-white font-mono-tech text-[10px] tracking-[0.14em] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>ASK A DIRECT QUESTION</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 8 Cols: 1px Hairline FAQ Accordion */}
            <div className="lg:col-span-8">
              <div className="divide-y divide-[#0A1633]/15 border-t border-b border-[#0A1633]/15">
                {FAQ_ITEMS.map((faq, idx) => {
                  const isOpen = !!openFaqIds[faq.id];
                  return (
                    <div key={faq.id} className="py-6">
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between gap-6 text-left cursor-pointer group"
                      >
                        <div className="flex items-baseline gap-3.5">
                          <span className="font-mono-tech text-[10px] text-[#1E3A8A]">
                            /0{idx + 1}
                          </span>
                          <span className="font-display text-lg sm:text-xl font-semibold tracking-[-0.025em] text-[#0A1633] group-hover:text-[#2E6BFF] transition-colors">
                            {faq.question}
                          </span>
                        </div>
                        <span className="text-[#0A1633] shrink-0">
                          {isOpen ? (
                            <Minus className="w-4 h-4 stroke-[2.2]" />
                          ) : (
                            <Plus className="w-4 h-4 stroke-[2.2]" />
                          )}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                            className="overflow-hidden"
                          >
                            <p className="pt-3 pl-8 text-xs sm:text-sm leading-[1.65] text-[#525D73] max-w-[650px]">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 09: FOOTER WITH LIVE UNIVERSE SKY VIDEO & CONTINUUM MONOGRAM
      ===================================================================== */}
      <footer
        id="contact"
        className="relative bg-[#03050C] text-white pt-24 sm:pt-32 pb-12 overflow-hidden"
      >
        <video
          src="/astra/sky-universe.mp4"
          poster="/astra/section-stars-bg.png"
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-65"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06112E]/85 via-[#0B1C47]/70 to-[#040711]/95"
        />

        <div className="relative z-10 max-w-[1354px] mx-auto px-5 sm:px-9">
          {/* Top Manifesto & Persona Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20 border-b border-white/12">
            <div className="lg:col-span-4 flex items-center gap-3">
              <ContinuumMark
                className="w-8 h-8"
                strokeColor="#FFFFFF"
                accentColor="#2E6BFF"
              />
              <div>
                <div className="font-mono-tech text-[10px] tracking-[0.16em] text-[#60A5FA]">
                  09 / INITIATE PROJECT BRIEF
                </div>
                <div className="text-xs text-white/65">
                  Qorvaynology® · Built by QORVAYN
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="font-display text-xl sm:text-2xl font-medium leading-[1.4] tracking-[-0.03em] text-white/95 max-w-[440px]">
                Qorvaynology designs brands and builds websites and web apps for
                businesses in Bangladesh and abroad.{" "}
                <span className="text-white/55">
                  Every build ships with full code handover and 30 days of
                  support.
                </span>
              </p>

              <div className="mt-6 flex items-center gap-3">
                <TeamAvatar
                  initials="RZ"
                  name="Ryan Zannah"
                  tone="from-[#2E6BFF] to-[#0B1020]"
                  size="sm"
                />
                <div>
                  <div className="text-[13px] font-semibold text-white">
                    Ryan Zannah
                  </div>
                  <div className="text-[12px] text-white/50">
                    Founder &amp; CEO · QORVAYN
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 lg:text-right">
              <p className="text-xs font-medium leading-[1.6] text-white/85">
                Kushtia &amp; Dhaka, Bangladesh
                <br />
                Remote worldwide · QORVAYN
              </p>
              <a
                href="https://cal.com/qorvaynology"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#2E6BFF] hover:bg-white text-white hover:text-[#0A1633] font-mono-tech text-[10px] tracking-[0.14em] transition-colors"
              >
                <span>BOOK ON CAL.COM</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Middle Contacts, Navigation, Social & Direct Brief Row */}
          <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
            {/* Col 1-4: Direct Channels */}
            <div className="lg:col-span-4 space-y-2">
              <div className="font-mono-tech text-[10px] tracking-[0.16em] text-white/45 mb-3">
                DIRECT CHANNELS
              </div>
              <div className="text-sm font-medium text-white/75">
                +880 1410-831205 (WhatsApp / Call)
              </div>
              <div>
                <a
                  href="mailto:qorvaynology@gmail.com"
                  className="font-display text-lg sm:text-xl font-semibold tracking-[-0.03em] text-white hover:text-[#60A5FA] transition-colors"
                >
                  qorvaynology@gmail.com
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://cal.com/qorvaynology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#60A5FA] hover:underline"
                >
                  <span>cal.com/qorvaynology</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Col 5-6: Section Directory */}
            <div className="lg:col-span-2">
              <div className="font-mono-tech text-[10px] tracking-[0.16em] text-white/45 mb-4">
                DIRECTORY
              </div>
              <ul className="space-y-2.5 text-sm font-semibold text-white">
                <li>
                  <a
                    href="#top"
                    className="text-white/55 hover:text-white transition-colors"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#studio"
                    className="hover:text-[#60A5FA] transition-colors"
                  >
                    Studio
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#60A5FA] transition-colors"
                  >
                    Capabilities
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="hover:text-[#60A5FA] transition-colors"
                  >
                    Selected Work
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-[#60A5FA] transition-colors"
                  >
                    Scope Architect
                  </a>
                </li>
                <li>
                  <a
                    href="#insights"
                    className="hover:text-[#60A5FA] transition-colors"
                  >
                    Notes
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 7-8: Verified Social Profiles */}
            <div className="lg:col-span-2">
              <div className="font-mono-tech text-[10px] tracking-[0.16em] text-white/45 mb-4">
                PROFILES
              </div>
              <ul className="space-y-2 text-xs font-medium text-white/85">
                {[
                  {
                    label: "LinkedIn",
                    url: "https://www.linkedin.com/company/qorvaynology/",
                  },
                  {
                    label: "Instagram",
                    url: "https://www.instagram.com/qorvaynology",
                  },
                  { label: "X (Twitter)", url: "https://x.com/qorvaynology" },
                  {
                    label: "Facebook",
                    url: "https://www.facebook.com/qorvaynology",
                  },
                  {
                    label: "YouTube",
                    url: "https://www.youtube.com/@Qorvaynology",
                  },
                  {
                    label: "TikTok",
                    url: "https://www.tiktok.com/@qorvaynology",
                  },
                ].map((soc) => (
                  <li key={soc.label}>
                    <a
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#60A5FA] transition-colors"
                    >
                      {soc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 9-12: Quick Project Brief Form */}
            <div className="lg:col-span-4">
              <div className="font-mono-tech text-[10px] tracking-[0.16em] text-white/45 mb-4">
                START A PROJECT BRIEF
              </div>
              {footerSent ? (
                <div className="p-4 border border-[#2E6BFF]/40 bg-[#2E6BFF]/10 text-xs text-white">
                  Brief prepared. Book directly at{" "}
                  <a
                    href="https://cal.com/qorvaynology"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#60A5FA]"
                  >
                    cal.com/qorvaynology
                  </a>
                  .
                </div>
              ) : (
                <form onSubmit={handleFooterBrief} className="space-y-4">
                  <input
                    id="footer-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={120}
                    value={footerName}
                    onChange={(e) => setFooterName(e.target.value)}
                    placeholder="Your name *"
                    className="w-full bg-transparent border-b border-white/20 py-2.5 text-xs text-white placeholder:text-white/55 focus:outline-none focus:border-[#2E6BFF]"
                  />
                  <input
                    id="footer-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={160}
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="Email *"
                    className="w-full bg-transparent border-b border-white/20 py-2.5 text-xs text-white placeholder:text-white/55 focus:outline-none focus:border-[#2E6BFF]"
                  />
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="h-[42px] w-[195px] px-5 bg-[#0F2557] border border-[#2E6BFF]/60 hover:bg-white hover:text-[#070B16] flex items-center justify-between font-mono-tech text-[10px] tracking-[0.14em] transition-colors cursor-pointer"
                    >
                      <span>INITIATE BRIEF</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Monumental Wordmark */}
          <div className="pt-10 pb-12 grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-start-5 lg:col-span-8">
              <div className="inline-flex items-start select-none">
                <span className="font-display font-semibold text-white text-[clamp(2.8rem,7.8vw,108px)] leading-none tracking-[-0.045em]">
                  Qorvaynology
                </span>
                <span className="ml-2 mt-2 sm:mt-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-[#070B16] font-display font-extrabold text-xs sm:text-sm flex items-center justify-center">
                  R
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Copyrights & Attribution Bar */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 lg:grid-cols-12 gap-6 text-[12px] text-white/50">
            <div className="lg:col-span-4">
              <div>© 2026</div>
              <div className="text-white font-medium mt-0.5">
                Qorvaynology Studio
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="text-white font-medium">Kushtia &amp; Dhaka</div>
              <div className="mt-0.5">Bangladesh</div>
            </div>
            <div className="lg:col-span-2">
              <div>Stack</div>
              <div className="text-white font-medium mt-0.5">
                Next.js 16 &amp; Framer Motion
              </div>
            </div>
            <div className="lg:col-span-4">
              <div>Parent Company</div>
              <div className="text-white font-medium mt-0.5">
                QORVAYN (Founded 10 March 2026 · Ryan Zannah)
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          SLIDE-OVER DRAWERS & MODALS
      ===================================================================== */}
      <CaseStudyDrawer
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onOpenContact={(subject) => openContactWith(subject)}
      />

      <InsightModal
        article={activeInsight}
        onClose={() => setActiveInsight(null)}
        onOpenContact={(subject) => openContactWith(subject)}
      />

      <ContactModal
        isOpen={contactOpen}
        initialSubject={contactSubject}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
