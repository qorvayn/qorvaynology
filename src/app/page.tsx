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
  ChevronLeft,
  ChevronRight,
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
  CelestialCross,
  ContinuumMark,
  TeamAvatar,
} from "@/components/ContinuumMark";
import {
  AstraStarLogo,
  HeroAsteroidStreaks,
  TitleAsteroidSplatter,
} from "@/components/AstraSvgDefs";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { CaseStudyDrawer } from "@/components/CaseStudyDrawer";
import { ContactModal, InsightModal } from "@/components/StudioModals";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

const PERSPECTIVE_SLIDES = [
  [
    {
      slot: "one", // Featured center-right (x: 52%, top: 0, w: 414px)
      name: "Ryan Zannah",
      role: "Founder & CEO, QORVAYN",
      initials: "RZ",
      quote:
        "Every product we launch at QORVAYN teaches us how to design for real people and build fast without cutting corners. Qorvaynology is that exact product method turned into a dedicated studio for your business.",
    },
    {
      slot: "two", // Top-left (x: 2.5%, top: 120px, w: 289px)
      name: "Shoyetur Rahman Sayel",
      role: "Lead Software Engineer",
      initials: "SS",
      quote:
        "We build client platforms on the exact Next.js 15, React 19, TypeScript, and Supabase architecture that powers Orbyn in live beta.",
    },
    {
      slot: "three", // Bottom-center-left (x: 26%, top: 270px, w: 343px)
      name: "Adelia Maharani",
      role: "Co-Founder & Creative Director",
      initials: "AM",
      quote:
        "Instead of hiring disconnected freelancers for logo, UI, and code, you get one integrated team carrying your brand from first sketch to production launch.",
    },
    {
      slot: "four", // Bottom-right (x: 80%, top: 250px, w: 245px)
      name: "Tam Zayn",
      role: "Head of Technology, QORVAYN",
      initials: "TZ",
      quote:
        "Every build ships with a written 3-tier scope, weekly Friday demos, a launch checklist, and 30 days of included post-launch support.",
    },
  ],
  [
    {
      slot: "one",
      name: "Siyami Muntaha Saba",
      role: "Co-Founder & Head of Design, QORVAYN",
      initials: "SM",
      quote:
        "Restraint is what separates enduring digital products from loud templates. Our White, Navy Blue, and Cosmic Black design system is engineered for clarity on every screen.",
    },
    {
      slot: "two",
      name: "Rahat Ehsan Sufi",
      role: "Operations & Business, QORVAYN",
      initials: "RS",
      quote:
        "Fixed scope in writing, 50/50 or 40/30/30 milestone billing, and zero surprise fees from discovery call to final handover.",
    },
    {
      slot: "three",
      name: "Orbyn Live Beta",
      role: "In-House Product Benchmark",
      initials: "OR",
      quote:
        "6 real-time modules — presence, daily reflection, voice notes, shared memories, AI date planner, and an on-device two-person photobooth.",
    },
    {
      slot: "four",
      name: "SnowVayn / SunVayn",
      role: "Seasonal Commerce Engine",
      initials: "SV",
      quote:
        "Dual-season clothing brand and storefront architecture that automatically shifts its visual theme between winter and summer.",
    },
  ],
];

export default function QorvaynologyHomePage() {
  // Interactive state
  const [activeHeroService, setActiveHeroService] = useState<string>("websites-ecommerce");
  const [openServiceId, setOpenServiceId] = useState<string>("brand-identity");
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectCaseStudy | null>(null);
  const [activeInsight, setActiveInsight] = useState<InsightArticle | null>(null);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [contactSubject, setContactSubject] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Pricing configurator state
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");
  const [selectedPkgId, setSelectedPkgId] = useState<string>("launch-website");
  const [selectedTierIdx, setSelectedTierIdx] = useState<number>(1); // Standard default

  // Scattered perspectives slide index (0 or 1)
  const [perspectiveSlideIdx, setPerspectiveSlideIdx] = useState<number>(0);

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
  // SCROLL-LINKED ANIMATIONS (Hero, Pricing Sticky Timeline, Team Sticky Orbit)
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
  const planet1Y = useTransform(smoothPricing, [0.05, 0.45], [140, 0]);
  const planet1Scale = useTransform(smoothPricing, [0.05, 0.45], [0.72, 1]);
  const row1Opacity = useTransform(smoothPricing, [0.1, 0.4], [0, 1]);
  const row1Y = useTransform(smoothPricing, [0.1, 0.4], [48, 0]);

  const planet2Y = useTransform(smoothPricing, [0.35, 0.78], [160, 0]);
  const planet2Scale = useTransform(smoothPricing, [0.35, 0.78], [0.72, 1]);
  const row2Opacity = useTransform(smoothPricing, [0.42, 0.78], [0, 1]);
  const row2Y = useTransform(smoothPricing, [0.42, 0.78], [56, 0]);

  // Team Sticky Scroll Section — automatically advances active team member as you scroll!
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

  const currentPackage =
    PRICING_PACKAGES.find((p) => p.id === selectedPkgId) || PRICING_PACKAGES[0];
  const currentTier =
    currentPackage.tiers[selectedTierIdx] || currentPackage.tiers[1];

  const activeMember = TEAM_MEMBERS[activeTeamIdx] || TEAM_MEMBERS[0];

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
          FIXED HEADER WITH MIX-BLEND-MODE: DIFFERENCE (Matches Astra Menu 1:1)
      ===================================================================== */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none mix-blend-difference"
      >
        <div className="max-w-[1426px] mx-auto px-5 sm:px-9 pt-[30px] pb-3 flex items-start justify-between">
          {/* Left: 4-Point Astra Star Logomark + Continuum Mark */}
          <a
            href="#top"
            className="pointer-events-auto group inline-flex items-center gap-3 text-white"
          >
            <AstraStarLogo className="w-8 h-8 sm:w-9 sm:h-9 text-white transition-transform duration-500 group-hover:rotate-90" />
            <span className="hidden md:inline-block font-display text-sm font-semibold tracking-[-0.04em] text-white/90">
              Qorvaynology®
            </span>
          </a>

          {/* Right: Contact Pill (245x42, rounded-[32px], 2px border) + Reach out text + Menu dots */}
          <div className="pointer-events-auto flex items-start gap-6 sm:gap-10">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white p-0.5 overflow-hidden shrink-0">
                  <TeamAvatar
                    initials="RZ"
                    name="Ryan Zannah"
                    tone="from-[#2E6BFF] to-[#0B1020]"
                    size="xs"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openContactWith("Discovery Call — Header CTA")}
                  className="group h-[42px] w-[200px] sm:w-[235px] px-4 rounded-[32px] border-2 border-white/25 hover:border-white/60 flex items-center justify-between text-xs font-medium tracking-[-0.04em] text-white transition-colors cursor-pointer"
                >
                  <span>Contact Now</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#91908E]" />
                    <span className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform" />
                  </span>
                </motion.button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              className="h-[42px] px-2 flex items-center justify-center gap-1.5 cursor-pointer"
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
                  QORVAYNOLOGY® NAVIGATION INDEX
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 text-xs hover:bg-white hover:text-[#070B16] transition-colors cursor-pointer"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="max-w-[1354px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 my-auto py-8">
              <nav className="md:col-span-7 flex flex-col gap-2 sm:gap-3">
                {[
                  { idx: "01", label: "Home", href: "#top" },
                  { idx: "02", label: "Studio & Numbers", href: "#studio" },
                  { idx: "03", label: "Services", href: "#services" },
                  { idx: "04", label: "Projects", href: "#projects" },
                  { idx: "05", label: "Pricing", href: "#pricing" },
                  { idx: "06", label: "Studio Standard", href: "#method" },
                  { idx: "07", label: "Team", href: "#team" },
                  { idx: "08", label: "Insights", href: "#insights" },
                  { idx: "09", label: "FAQ", href: "#faq" },
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
                    The QORVAYN way of building, applied to your business.
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
              <span>QORVAYNOLOGY® · EST. 2026</span>
              <span>WHITE · NAVY BLUE · COSMIC BLACK</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          SECTION 01: HERO WITH LIVE UNIVERSE VIDEO, WHITE PLANET CURVE & MIX-BLEND
          Matches https://astralab.framer.website/ [data-framer-name="Hero"] 1:1
      ===================================================================== */}
      <section
        ref={heroRef}
        id="top"
        className="relative w-full h-[732px] sm:h-[820px] lg:h-screen min-h-[720px] bg-[#040711] overflow-hidden select-none"
      >
        {/* Layer 0: Live Universe Nebula & Starfield Video on the right / full canvas */}
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

        {/* Layer 1: Deep Navy Blue + Black Cosmic Tint over the Moving Universe Video */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-[#060C1F]/40 via-[#040711]/25 to-[#1E3A8A]/25"
        />

        {/* Layer 1b: Giant Curved White Eclipse Planet PNG on the Left (transparent on right so universe video shows!) */}
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

        {/* Layer 3: Topblock with mix-blend-mode: difference (Matches Astra's Topblock 1:1) */}
        <div className="relative z-[3] h-full max-w-[1426px] mx-auto px-5 sm:px-9 flex flex-col justify-between mix-blend-difference text-white">
          {/* Sub-caption under the Contact pill ("Reach out to start your project") */}
          <div className="pt-[102px] grid grid-cols-12">
            <div className="col-start-7 sm:col-start-9 col-span-6 sm:col-span-4">
              <p className="text-[14.08px] font-medium leading-[19.7px] tracking-[-0.704px] text-white/85">
                Reach out to start
                <br />
                your project
              </p>
            </div>
          </div>

          {/* Center-to-Bottom Hero Block: Slogan + Services & Giant Title + Who we are */}
          <motion.div
            style={{ y: heroTitleY }}
            className="my-auto pt-10 sm:pt-14"
          >
            {/* Slogan Row */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE_OUT_EXPO }}
              className="grid grid-cols-12 mb-3 sm:mb-4"
            >
              <div className="col-start-6 sm:col-start-9 col-span-7 sm:col-span-4">
                <p className="font-display text-[20px] sm:text-[24px] font-medium leading-[1.35] tracking-[-1.44px] text-[#FAFAFA]">
                  Design &amp; Technology
                  <br />
                  Studio
                </p>
              </div>
            </motion.div>

            {/* Main Info Row: Left 4 Service Lines (inverts to black on white planet) + Monumental Wordmark spanning the curve */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4">
              {/* Left 4 Service Rows */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.75, ease: EASE_OUT_EXPO }}
                className="lg:col-span-3 space-y-[8px] max-w-[260px]"
              >
                {HERO_SERVICES.map((srv) => {
                  const isActive = activeHeroService === srv.id;
                  return (
                    <a
                      key={srv.id}
                      href="#services"
                      onMouseEnter={() => setActiveHeroService(srv.id)}
                      onClick={() => setOpenServiceId(srv.id)}
                      className="group flex items-center justify-between text-[14.08px] font-semibold leading-[19.7px] tracking-[-0.704px] text-white py-0.5"
                    >
                      <span className="transition-opacity group-hover:opacity-100">
                        {srv.label}
                      </span>
                      <span
                        className={`w-[16px] h-[3px] bg-white transition-opacity ${
                          isActive
                            ? "opacity-100"
                            : "opacity-25 group-hover:opacity-75"
                        }`}
                      />
                    </a>
                  );
                })}
              </motion.div>

              {/* Right Monumental Title straddling the white planet edge */}
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
                  <AstraStarLogo className="w-[15px] h-[15px] text-white" />
                </div>
              </motion.div>
            </div>

            {/* Bottom "Who we are" Row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.65, ease: EASE_OUT_EXPO }}
              className="mt-5 sm:mt-7 grid grid-cols-12"
            >
              <div className="col-start-5 sm:col-start-7 col-span-8 sm:col-span-6">
                <p className="text-[14.08px] font-medium leading-[19.7px] tracking-[-0.704px] text-white/90">
                  Full-service
                  <br />
                  Design &amp; Tech Studio · Qorvaynology
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="pb-6" />
        </div>
      </section>

      {/* =====================================================================
          SECTION 02: ABOUT — NUMBERS BLOCK, TEAM OF PILOTS & TICKER (Crisp White)
          Matches [data-framer-name="About"] (y: 732, h: 1140) 1:1
      ===================================================================== */}
      <section
        id="studio"
        className="paper-surface text-[#070B16] py-24 sm:py-36 overflow-hidden"
      >
        <div className="max-w-[1354px] mx-auto px-5 sm:px-9">
          {/* NUMBERS BLOCK (Top Row: ++ on left, 2 Stat Columns on right, 3rd Stat below) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left ++ stars */}
            <div className="lg:col-span-4 flex items-center gap-1.5 text-[#070B16]">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>

            {/* Stat 1 (col 5-8) & Stat 2 (col 9-12) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
              {STUDIO_FACTS.slice(0, 2).map((fact, idx) => (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    delay: idx * 0.12,
                    duration: 0.7,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <div className="text-[14.08px] font-semibold tracking-[-0.704px] text-[#070B16] pb-3 border-b border-[#070B16]/20">
                    {fact.title}
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-6">
                    <div className="font-display text-[64px] sm:text-[72px] font-semibold leading-none tracking-[-0.045em] text-[#070B16] flex items-start">
                      <span>{fact.value}</span>
                      {fact.sup && (
                        <span className="text-2xl sm:text-3xl font-semibold text-[#2E6BFF] ml-1 -mt-1">
                          {fact.sup}
                        </span>
                      )}
                    </div>
                    <p className="text-[15px] sm:text-[16px] font-medium leading-[22.4px] tracking-[-0.8px] text-[#686963] max-w-[185px]">
                      {fact.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Stat 3: Year of Establishment (Offset to start at center column, matching y: 1104) */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.24, duration: 0.7, ease: EASE_OUT_EXPO }}
                className="sm:col-span-2 lg:ml-[25%] pt-6"
              >
                <div className="text-[14.08px] font-semibold tracking-[-0.704px] text-[#070B16] pb-3 border-b border-[#070B16]/20">
                  {STUDIO_FACTS[2].title}
                </div>
                <div className="mt-5 flex flex-wrap items-start justify-between gap-6">
                  <p className="text-[15px] sm:text-[16px] font-medium leading-[22.4px] tracking-[-0.8px] text-[#686963] max-w-[230px]">
                    {STUDIO_FACTS[2].description}
                  </p>
                  <div className="flex flex-col items-end">
                    <div className="font-display text-[64px] sm:text-[72px] font-semibold leading-none tracking-[-0.045em] text-[#070B16]">
                      {STUDIO_FACTS[2].value}
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="w-5 h-5 rounded-full bg-[#0B1020] text-white text-[10px] font-semibold flex items-center justify-center">
                        Q
                      </span>
                      <span className="w-5 h-5 rounded-full bg-[#2E6BFF] text-white text-[10px] font-semibold flex items-center justify-center">
                        y
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* TEAM AND MESSAGE ROW (Matches y: 1378 in steps/2239/output.txt) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
            className="mt-28 sm:mt-36 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            {/* Left Col (w: 441): Team of Pilots + 2x3 circular cluster */}
            <div className="lg:col-span-4">
              <div className="text-[14.08px] font-semibold tracking-[-0.704px] text-[#070B16]">
                Team of Pilots
              </div>
              <div className="w-3 h-[1.5px] bg-[#91908E] my-1.5" />
              <div className="text-[14.08px] font-medium tracking-[-0.704px] text-[#91908E]">
                Our People
              </div>

              {/* 2x3 Avatar Cluster matching download (1).avif */}
              <div className="mt-7 grid grid-cols-3 gap-2.5 w-[146px]">
                <div className="w-[42px] h-[42px] rounded-full bg-[#F0F3FA] border border-[#0B1020]/15 flex items-center justify-center font-display text-xs font-semibold text-[#070B16]">
                  06<sup className="text-[9px] text-[#2E6BFF]">+</sup>
                </div>
                {TEAM_MEMBERS.slice(0, 5).map((m) => (
                  <div key={m.id} className="w-[42px] h-[42px]">
                    <TeamAvatar
                      initials={m.initials}
                      name={m.name}
                      tone={m.tone}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Col (w: 221): Qorvaynology Creative Agency + Founder portrait */}
            <div className="lg:col-span-2">
              <div className="text-[14.08px] font-semibold tracking-[-0.704px] text-[#070B16]">
                Qorvaynology
              </div>
              <div className="text-[14.08px] font-medium tracking-[-0.704px] text-[#91908E]">
                Design &amp; Tech Studio
              </div>
              <p className="mt-3 text-[12px] leading-[16.8px] text-[#686963]">
                A community
                <br />
                of driven builders.
              </p>
              <div className="w-3 h-[2px] bg-[#070B16] my-4" />

              <div className="mt-3">
                <div className="w-[65px] h-[65px] rounded-full overflow-hidden mb-2.5">
                  <TeamAvatar
                    initials="RZ"
                    name="Ryan Zannah"
                    tone="from-[#2E6BFF] via-[#0B1020] to-[#03050C]"
                    size="md"
                  />
                </div>
                <div className="text-[14.08px] font-semibold tracking-[-0.704px] text-[#070B16]">
                  Ryan Zannah
                </div>
                <div className="text-[14.08px] font-medium tracking-[-0.704px] text-[#91908E]">
                  Founder &amp; CEO
                </div>
              </div>
            </div>

            {/* Right Col (w: 662): 24px Editorial Message + Infinite Marquee Ticker */}
            <div className="lg:col-span-6">
              <p className="font-display text-[21px] sm:text-[24px] font-medium leading-[33.12px] tracking-[-1.44px] text-[#070B16]">
                We’re a full-service studio driven by strategy, design, and technology. From brand foundations to fully developed Next.js &amp; Supabase digital products, we create work that doesn’t just look good —{" "}
                <span className="text-[#686963]">
                  it performs, connects, and endures.
                </span>
              </p>

              {/* Infinite Clients / Ecosystem Ticker (Matches "Clients ticker" at y: 1599) */}
              <div className="mt-12 pt-8 border-t border-[#070B16]/12 overflow-hidden relative">
                <div className="animate-ticker flex items-center gap-12">
                  {[
                    "QORVAYN®",
                    "ORBYN LIVE BETA",
                    "SNOWVAYN®",
                    "SUNVAYN®",
                    "CONTINUUM SYSTEM",
                    "NEXT.JS 15",
                    "SUPABASE",
                    "QORVAYN®",
                    "ORBYN LIVE BETA",
                    "SNOWVAYN®",
                    "SUNVAYN®",
                    "CONTINUUM SYSTEM",
                    "NEXT.JS 15",
                    "SUPABASE",
                  ].map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-3 font-display text-sm sm:text-base font-semibold tracking-[-0.04em] text-[#070B16]/55 whitespace-nowrap"
                    >
                      <AstraStarLogo className="w-3.5 h-3.5 text-[#2E6BFF]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 03: SERVICES ACCORDION (Crisp White + Noise + 135px Sphere)
          Matches [data-framer-name="Services"] (y: 1872, h: 1448) 1:1
      ===================================================================== */}
      <section
        id="services"
        className="paper-surface text-[#070B16] py-24 sm:py-36 relative overflow-hidden"
      >
        <div className="noise-overlay absolute inset-0" />

        <div className="relative z-10 max-w-[1354px] mx-auto px-5 sm:px-9">
          {/* Monumental 128px "Services" Header at col-start-5 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 mb-16 sm:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
              className="lg:col-start-5 lg:col-span-8"
            >
              <h2 className="font-display text-[clamp(3.8rem,9vw,128px)] font-semibold leading-[0.9] tracking-[-0.04em] text-[#070B16]">
                Services
              </h2>
            </motion.div>
          </div>

          {/* Services List (/01 to /06) */}
          <div className="divide-y divide-[#070B16]/15 border-t border-b border-[#070B16]/15">
            {SERVICES_LIST.map((srv) => {
              const isOpen = openServiceId === srv.id;
              const scopeStat = SERVICE_SCOPE_COUNTS[srv.id] || {
                num: "12",
                unit: "Deliverables",
              };

              return (
                <motion.div
                  key={srv.id}
                  layout
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  className="py-8 sm:py-10"
                >
                  {isOpen ? (
                    /* OPEN STATE (Matches "Desktop - Open" in frame_007.jpg) */
                    <div
                      onClick={() => setOpenServiceId("")}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start cursor-pointer"
                    >
                      {/* Col 1-4: /01 */}
                      <div className="lg:col-span-4">
                        <span className="font-display text-[20px] font-semibold tracking-[-1px] text-[#070B16]">
                          {srv.index}
                        </span>
                      </div>

                      {/* Col 5-7: Title + 135x135 Circular Sphere + 40x40 "i" badge */}
                      <div className="lg:col-span-3 flex items-start justify-between gap-4">
                        <h3 className="font-display text-[22px] sm:text-[24px] font-semibold leading-[1.2] tracking-[-1px] text-[#070B16] max-w-[160px]">
                          {srv.title}
                        </h3>

                        <motion.div
                          initial={{ scale: 0.75, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 22,
                          }}
                          className="relative flex items-start shrink-0"
                        >
                          <img
                            src="/astra/service-sphere.png"
                            alt={srv.title}
                            className="w-[110px] h-[110px] sm:w-[135px] sm:h-[135px] rounded-full object-cover shadow-md"
                          />
                          <img
                            src="/astra/service-i.png"
                            alt="Info"
                            className="w-[34px] h-[34px] sm:w-[40px] sm:h-[40px] -ml-3 mt-1 rounded-full object-cover shadow"
                          />
                        </motion.div>
                      </div>

                      {/* Col 8-10: 20px Summary + Deliverable keywords */}
                      <div className="lg:col-span-3">
                        <p className="font-display text-[18px] sm:text-[20px] font-medium leading-[28px] tracking-[-0.8px] text-[#070B16]">
                          {srv.summary}
                        </p>
                        <p className="mt-4 text-[14.08px] font-medium leading-[19.7px] tracking-[-0.704px] text-[#686963]">
                          {srv.deliverables.join(" · ")}
                        </p>
                      </div>

                      {/* Col 11-12: Related Projects list + Minus icon */}
                      <div className="lg:col-span-2 flex items-start justify-between">
                        <div className="space-y-1 text-[14.08px] font-semibold tracking-[-0.704px] text-[#070B16]">
                          {srv.relatedProjects.map((rp) => (
                            <div key={rp}>{rp}</div>
                          ))}
                          <div className="text-[#91908E] pt-1">
                            {currency === "USD" ? srv.usdRange : srv.bdtRange}
                          </div>
                        </div>

                        <span className="mt-1 text-[#070B16]">
                          <Minus className="w-4 h-4 stroke-[2.2]" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* CLOSED STATE (Matches "Desktop - Closed" in frame_008.jpg) */
                    <div
                      onClick={() => setOpenServiceId(srv.id)}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center cursor-pointer group"
                    >
                      {/* Left: Service Title */}
                      <div className="lg:col-span-4 flex items-center gap-4">
                        <span className="font-display text-[18px] sm:text-[20px] font-semibold tracking-[-0.8px] text-[#070B16] group-hover:text-[#2E6BFF] transition-colors">
                          {srv.title}
                        </span>
                      </div>

                      {/* Middle (col-start-5): 16px short description */}
                      <div className="lg:col-span-4">
                        <p className="text-[15px] sm:text-[16px] font-medium leading-[22.4px] tracking-[-0.8px] text-[#595959] max-w-[240px]">
                          {srv.summary}
                        </p>
                      </div>

                      {/* Right (col-start-9): 40.8px Bold Scope Numeral + Unit + Plus Icon */}
                      <div className="lg:col-span-4 flex items-center justify-between">
                        <div className="flex items-start gap-2">
                          <span className="font-display text-[36px] sm:text-[40.8px] font-semibold leading-none tracking-[-2.04px] text-[#070B16]">
                            {scopeStat.num}
                          </span>
                          <span className="text-[14.08px] font-medium tracking-[-0.704px] text-[#070B16] mt-0.5">
                            {scopeStat.unit}
                          </span>
                        </div>

                        <span className="text-[#070B16] group-hover:text-[#2E6BFF] transition-colors">
                          <Plus className="w-4 h-4 stroke-[2.2]" />
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Message & CTA Row (Matches y: 2994 in steps/2239/output.txt) */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-start-5 lg:col-span-4">
              <p className="font-display text-[18px] sm:text-[20px] font-medium leading-[26px] tracking-[-0.8px] text-[#070B16]">
                Qorvaynology helps businesses stand out with bold design and smart digital solutions. We mix strategy, creativity, and technology.
              </p>
            </div>
            <div className="lg:col-start-9 lg:col-span-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openContactWith("Get Started — Services CTA")}
                className="h-[47px] w-[235px] px-6 rounded-[32px] bg-[#070B16] hover:bg-[#1E3A8A] text-white flex items-center justify-between text-xs font-medium tracking-[-0.48px] transition-colors cursor-pointer"
              >
                <span>Get Started</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#91908E]" />
                  <span className="w-2 h-2 rounded-full bg-white" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTIONS 04 & 05: STICKY UNIVERSE WRAPPER FOR PROJECTS & PRICING
          Matches [data-framer-name="Projects and Pricing"] (y: 3320, h: 6846) 1:1
      ===================================================================== */}
      <div className="relative bg-[#03050C] text-white">
        {/* Sticky 100vh Universe Starfield Backdrop + Navy Blue Cosmic Glow */}
        <div
          aria-hidden="true"
          className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0"
        >
          <img
            src="/astra/section-stars-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_75%_35%,rgba(30,58,138,0.28),rgba(3,5,12,0.55)_70%)]" />
        </div>

        {/* Content floating over the Sticky Universe Starfield */}
        <div className="relative z-10 -mt-[100vh]">
          {/* -----------------------------------------------------------------
              SECTION 04: PROJECTS SHOWCASE
          ----------------------------------------------------------------- */}
          <section id="projects" className="pt-28 sm:pt-40 pb-24">
            <div className="max-w-[1354px] mx-auto px-5 sm:px-9">
              {/* Header Block: Monumental 128px "Projects" + 05+ count + 4 Service Filter lines */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 sm:mb-24">
                <div className="lg:col-start-5 lg:col-span-8">
                  <motion.h2
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                    className="font-display text-[clamp(3.8rem,9vw,128px)] font-semibold leading-[0.9] tracking-[-0.04em] text-white mix-blend-difference"
                  >
                    Projects
                  </motion.h2>
                  <div className="mt-4 font-display text-[36px] sm:text-[40.8px] font-semibold leading-none tracking-[-2px] text-white flex items-start">
                    <span>0{PROJECTS_LIST.length}</span>
                    <span className="text-xl text-[#60A5FA] ml-0.5">+</span>
                  </div>
                </div>

                {/* Filter lines at col-start-7 (x: 728) */}
                <div className="lg:col-start-7 lg:col-span-6 max-w-[340px] space-y-2 pt-2">
                  {[
                    { label: "All Studio & Ecosystem Work", filter: "All" },
                    { label: "Branding and Identity", filter: "Brand" },
                    { label: "UI/UX and Product Design", filter: "App" },
                    { label: "E-Commerce & Seasonal Systems", filter: "Commerce" },
                  ].map((cat) => {
                    const active = selectedProjectCategory === cat.filter;
                    return (
                      <button
                        key={cat.filter}
                        onClick={() => setSelectedProjectCategory(cat.filter)}
                        className={`w-full flex items-center justify-between text-[14.08px] font-semibold tracking-[-0.704px] py-0.5 text-left transition-opacity cursor-pointer ${
                          active
                            ? "text-white opacity-100"
                            : "text-white/45 hover:text-white/80"
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span
                          className={`w-[16px] h-[2.5px] transition-colors ${
                            active ? "bg-white" : "bg-white/25"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stacked Project Video Cards (1091x622 center frame, date on left, avatars on right) */}
              <div className="space-y-16 sm:space-y-24">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      delay: idx * 0.06,
                      duration: 0.75,
                      ease: EASE_OUT_EXPO,
                    }}
                    onClick={() => setActiveCaseStudy(project)}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start cursor-pointer group"
                  >
                    {/* Left Date Stamp (x: 36, w: 105) */}
                    <div className="lg:col-span-1 pt-2">
                      <div className="text-[18px] font-semibold tracking-[-0.8px] text-white pb-2.5 border-b border-white/25">
                        {project.dateLabel.split(" ")[0]}
                      </div>
                      <div className="text-[12px] font-medium text-white/50 mt-2">
                        {project.year}
                      </div>
                    </div>

                    {/* Center 1091x622 Video Container */}
                    <div className="lg:col-span-10">
                      <ProjectArtwork projectId={project.id} variant="hero" />
                    </div>

                    {/* Right 2-Column Team Avatars Stack (x: 1282, w: 108) */}
                    <div className="lg:col-span-1 hidden lg:grid grid-cols-2 gap-1.5 pt-2">
                      {TEAM_MEMBERS.slice(0, 5).map((m) => (
                        <TeamAvatar
                          key={m.id}
                          initials={m.initials}
                          name={m.name}
                          tone={m.tone}
                          size="xs"
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Block: ++ on left, White "All Projects •●" pill button at col-start-7 */}
              <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
                <div className="lg:col-start-5 lg:col-span-2 flex items-center gap-1 text-white/80">
                  <Plus className="w-4 h-4" />
                  <Plus className="w-4 h-4" />
                </div>
                <div className="lg:col-start-7 lg:col-span-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveCaseStudy(PROJECTS_LIST[0])}
                    className="h-[47px] w-[244px] px-6 rounded-[32px] bg-white text-[#070B16] hover:bg-[#2E6BFF] hover:text-white flex items-center justify-between text-xs font-semibold tracking-[-0.48px] transition-colors cursor-pointer"
                  >
                    <span>All Projects</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#91908E]" />
                      <span className="w-2 h-2 rounded-full bg-current" />
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              SECTION 05: PRICING (Sticky Scroll-Animated Lunar Spheres)
              Matches [data-framer-name="Pricing"] (y: 6864) 1:1
          ----------------------------------------------------------------- */}
          <section
            ref={pricingScrollRef}
            id="pricing"
            className="pt-20 sm:pt-32 pb-28"
          >
            <div className="max-w-[1354px] mx-auto px-5 sm:px-9">
              {/* Monumental 128px "Pricing" Header at col-start-5 + Currency & Package Switcher */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
                <div className="lg:col-start-5 lg:col-span-8">
                  <motion.h2
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                    className="font-display text-[clamp(3.8rem,9vw,128px)] font-semibold leading-[0.9] tracking-[-0.04em] text-white"
                  >
                    Pricing
                  </motion.h2>

                  {/* Interactive Currency + Package Switcher Pills */}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center p-1 rounded-full bg-white/[0.06] border border-white/15">
                      <button
                        onClick={() => setCurrency("USD")}
                        className={`px-3.5 py-1 rounded-full text-[11px] font-mono-tech transition-colors cursor-pointer ${
                          currency === "USD"
                            ? "bg-white text-[#070B16] font-semibold"
                            : "text-white/65 hover:text-white"
                        }`}
                      >
                        USD ($)
                      </button>
                      <button
                        onClick={() => setCurrency("BDT")}
                        className={`px-3.5 py-1 rounded-full text-[11px] font-mono-tech transition-colors cursor-pointer ${
                          currency === "BDT"
                            ? "bg-[#2E6BFF] text-white font-semibold"
                            : "text-white/65 hover:text-white"
                        }`}
                      >
                        BDT (৳)
                      </button>
                    </div>

                    {PRICING_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPkgId(pkg.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                          selectedPkgId === pkg.id
                            ? "bg-[#2E6BFF] text-white border-[#2E6BFF]"
                            : "bg-white/[0.03] text-white/70 border-white/15 hover:border-white/40"
                        }`}
                      >
                        {pkg.name}
                      </button>
                    ))}

                    <div className="inline-flex items-center gap-1 bg-white/[0.05] border border-white/15 p-1 rounded-full">
                      {currentPackage.tiers.map((t, idx) => (
                        <button
                          key={t.tierName}
                          onClick={() => setSelectedTierIdx(idx)}
                          className={`px-3 py-1 rounded-full text-[11px] font-mono-tech transition-colors cursor-pointer ${
                            selectedTierIdx === idx
                              ? "bg-white text-[#070B16] font-semibold"
                              : "text-white/60 hover:text-white"
                          }`}
                        >
                          {t.tierName}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW /01: PER PROJECT (Starts at col-start-5, w: 883px, matches pfast_06.jpg) */}
              <motion.div
                style={{ opacity: row1Opacity, y: row1Y }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-10"
              >
                <div className="lg:col-span-4 hidden lg:flex items-center gap-1 text-white/55 pt-2">
                  <AstraStarLogo className="w-2.5 h-2.5" />
                  <AstraStarLogo className="w-2.5 h-2.5" />
                </div>

                <div className="lg:col-span-8">
                  <div className="text-[18px] font-semibold tracking-[-0.8px] text-white pb-3 border-b border-white/25">
                    Per Project — {currentPackage.name} ({currentTier.tierName})
                  </div>

                  <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: Real 185x185 Pack Per Project Sphere + 241x241 Lunar Shadow + Price */}
                    <div className="relative flex items-center gap-5">
                      <motion.div
                        style={{ y: planet1Y, scale: planet1Scale }}
                        className="relative w-[155px] h-[155px] sm:w-[185px] sm:h-[185px] rounded-full shrink-0"
                      >
                        <img
                          src="/astra/moon-shadow.png"
                          alt=""
                          className="absolute -inset-4 w-[220px] h-[220px] rounded-full object-cover opacity-50 pointer-events-none"
                        />
                        <img
                          src="/astra/pack-project.png"
                          alt="Pack per project"
                          className="relative z-10 w-full h-full rounded-full object-cover shadow-2xl"
                        />
                      </motion.div>

                      <div className="relative z-10">
                        <div className="text-[11px] font-mono-tech text-[#60A5FA] mb-1">
                          {currentTier.subtitle}
                        </div>
                        <div className="font-display text-[36px] sm:text-[42px] font-semibold leading-none tracking-[-2px] text-white">
                          {currency === "USD" ? currentTier.usd : currentTier.bdt}
                        </div>
                      </div>
                    </div>

                    {/* Right: Features + /01 + Delivery time + Get in Touch pill */}
                    <div className="flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <ul className="space-y-2 text-[14.08px] font-medium tracking-[-0.704px] text-white/90">
                          {currentTier.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="text-[#60A5FA] font-bold">+</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                        <span className="text-[12px] font-medium text-white/50 shrink-0">
                          /01
                        </span>
                      </div>

                      <div className="mt-8 pt-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[12px] text-white/50">
                            Delivery time:
                          </div>
                          <div className="text-[16px] font-semibold tracking-[-0.8px] text-white">
                            {currentPackage.timeline}
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            openContactWith(
                              `Per Project: ${currentPackage.name} (${currentTier.tierName})`
                            )
                          }
                          className="h-[42px] w-[190px] px-5 rounded-[32px] border-2 border-white/25 hover:border-white hover:bg-white hover:text-[#070B16] flex items-center justify-between text-xs font-medium transition-colors cursor-pointer"
                        >
                          <span>Get in Touch</span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#91908E]" />
                            <span className="w-2 h-2 rounded-full bg-current" />
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ROW /02: MONTHLY (Starts at col-start-1, w: 883px, matches pfast_08.jpg) */}
              <motion.div
                style={{ opacity: row2Opacity, y: row2Y }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-12"
              >
                <div className="lg:col-span-8">
                  <div className="text-[18px] font-semibold tracking-[-0.8px] text-white pb-3 border-b border-white/25">
                    Monthly — Growth Retainer &amp; Care Plan
                  </div>

                  <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: Features + /02 + Delivery time + Get in Touch */}
                    <div className="flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <ul className="space-y-2 text-[14.08px] font-medium tracking-[-0.704px] text-white/90">
                          <li className="flex items-start gap-2.5">
                            <span className="text-[#60A5FA] font-bold">+</span>
                            <span>Homepage + inner pages &amp; continuous updates</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-[#60A5FA] font-bold">+</span>
                            <span>Design, Next.js development &amp; conversion tuning</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-[#60A5FA] font-bold">+</span>
                            <span>Social media creative &amp; campaign landing pages</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-[#60A5FA] font-bold">+</span>
                            <span>Dedicated monthly support &amp; Friday reports</span>
                          </li>
                        </ul>
                        <span className="text-[12px] font-medium text-white/50 shrink-0">
                          /02
                        </span>
                      </div>

                      <div className="mt-8 pt-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[12px] text-white/50">
                            Delivery time:
                          </div>
                          <div className="text-[16px] font-semibold tracking-[-0.8px] text-white">
                            Ongoing
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            openContactWith("Monthly Growth Retainer Inquiry")
                          }
                          className="h-[42px] w-[190px] px-5 rounded-[32px] border-2 border-white/25 hover:border-white hover:bg-white hover:text-[#070B16] flex items-center justify-between text-xs font-medium transition-colors cursor-pointer"
                        >
                          <span>Get in Touch</span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#91908E]" />
                            <span className="w-2 h-2 rounded-full bg-current" />
                          </span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Right: Real 185x185 Pack Per Month Dark Lunar Sphere + Price */}
                    <div className="relative flex items-center gap-5">
                      <motion.div
                        style={{ y: planet2Y, scale: planet2Scale }}
                        className="relative w-[155px] h-[155px] sm:w-[185px] sm:h-[185px] rounded-full shrink-0"
                      >
                        <img
                          src="/astra/moon-shadow.png"
                          alt=""
                          className="absolute -inset-4 w-[220px] h-[220px] rounded-full object-cover opacity-40 pointer-events-none"
                        />
                        <img
                          src="/astra/pack-month.png"
                          alt="Pack per month"
                          className="relative z-10 w-full h-full rounded-full object-cover shadow-2xl"
                        />
                      </motion.div>

                      <div className="relative z-10">
                        <div className="text-[11px] font-mono-tech text-white/60 mb-1">
                          Monthly Retainer
                        </div>
                        <div className="font-display text-[36px] sm:text-[42px] font-semibold leading-none tracking-[-2px] text-white">
                          {currency === "USD" ? "$500+" : "৳20,000+"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Founder Message Row (Matches pfast_11.jpg / y: 9809) */}
              <div className="mt-14 pt-10 border-t border-white/12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-start-5 lg:col-span-4">
                  <div className="mb-3 text-white/80">
                    <AstraStarLogo className="w-3.5 h-3.5" />
                  </div>
                  <p className="font-display text-[18px] sm:text-[20px] font-medium leading-[27px] tracking-[-0.8px] text-white/85">
                    Add copywriting, SEO, extra pages, or a $100/mo Care Plan — flexible tools designed to strengthen your project. We build solutions around your business.
                  </p>
                </div>

                <div className="lg:col-start-9 lg:col-span-4 flex items-center gap-3 pt-4">
                  <TeamAvatar
                    initials="RZ"
                    name="Ryan Zannah"
                    tone="from-[#2E6BFF] to-[#0B1020]"
                    size="sm"
                  />
                  <div>
                    <div className="text-[14.08px] font-semibold tracking-[-0.704px] text-white">
                      Ryan Zannah
                    </div>
                    <div className="text-[14.08px] font-medium tracking-[-0.704px] text-white/50">
                      Founder &amp; CEO
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =====================================================================
          SECTION 06: SCATTERED STUDIO PERSPECTIVES + DASHBOARD CHARTS (White)
          Matches [data-framer-name="Testimonials"] & [data-framer-name="Dashboard"] 1:1
      ===================================================================== */}
      <section
        id="method"
        className="paper-surface text-[#070B16] py-24 sm:py-36 relative overflow-hidden"
      >
        <div className="noise-overlay absolute inset-0" />

        <div className="relative z-10 max-w-[1354px] mx-auto px-5 sm:px-9">
          {/* Header Block: Monumental 128px Heading + Metric at col-start-5 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 mb-12">
            <div className="lg:col-start-5 lg:col-span-8">
              <motion.h2
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="font-display text-[clamp(3.6rem,8.5vw,124px)] font-semibold leading-[0.92] tracking-[-0.04em] text-[#070B16]"
              >
                Our standard
              </motion.h2>
              <div className="mt-4 font-display text-[32px] sm:text-[40.8px] font-semibold tracking-[-2px] text-[#070B16]">
                30d Care
              </div>
            </div>
          </div>

          {/* SCATTERED 4-CARD SPATIAL CANVAS (Matches pricing_09.jpg & steps/2243/output.txt 1:1) */}
          <div className="relative min-h-[600px] lg:h-[680px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-${perspectiveSlideIdx}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className="grid grid-cols-1 md:grid-cols-2 lg:block gap-8 lg:h-full relative"
              >
                {PERSPECTIVE_SLIDES[perspectiveSlideIdx].map((card) => {
                  if (card.slot === "one") {
                    // Featured Large Card at x: 52%, y: 48px, w: 414px
                    return (
                      <div
                        key={card.name}
                        className="lg:absolute lg:left-[51%] lg:top-12 lg:w-[414px] p-4"
                      >
                        <div className="w-[84px] h-[84px] mb-4">
                          <TeamAvatar
                            initials={card.initials}
                            name={card.name}
                            size="lg"
                            active
                          />
                        </div>
                        <div className="text-[14.08px] font-semibold tracking-[-0.704px] text-[#070B16]">
                          {card.name}
                        </div>
                        <div className="text-[13px] font-medium text-[#91908E] mb-4">
                          {card.role}
                        </div>
                        <div className="flex items-center gap-1 text-[#2E6BFF] text-xs mb-2">
                          <span>★★★★★</span>
                        </div>
                        <p className="font-display text-[20px] sm:text-[22px] font-medium leading-[29px] tracking-[-0.9px] text-[#070B16]">
                          {card.quote}
                        </p>
                      </div>
                    );
                  }
                  if (card.slot === "two") {
                    // Top-Left Card at x: 0%, y: 150px, w: 289px
                    return (
                      <div
                        key={card.name}
                        className="lg:absolute lg:left-0 lg:top-[150px] lg:w-[289px] p-4 opacity-75 hover:opacity-100 transition-opacity"
                      >
                        <div className="w-[55px] h-[55px] mb-3">
                          <TeamAvatar
                            initials={card.initials}
                            name={card.name}
                            size="md"
                          />
                        </div>
                        <div className="text-[13px] font-semibold text-[#070B16]">
                          {card.name}
                        </div>
                        <div className="text-[12px] text-[#91908E] mb-2">
                          {card.role}
                        </div>
                        <p className="text-[13px] leading-[18.5px] text-[#686963]">
                          {card.quote}
                        </p>
                      </div>
                    );
                  }
                  if (card.slot === "three") {
                    // Bottom-Center-Left Card at x: 25%, y: 315px, w: 343px
                    return (
                      <div
                        key={card.name}
                        className="lg:absolute lg:left-[25%] lg:top-[315px] lg:w-[343px] p-4"
                      >
                        <div className="w-[65px] h-[65px] mb-3">
                          <TeamAvatar
                            initials={card.initials}
                            name={card.name}
                            size="md"
                          />
                        </div>
                        <div className="text-[14px] font-semibold text-[#070B16]">
                          {card.name}
                        </div>
                        <div className="text-[12px] text-[#91908E] mb-2">
                          {card.role}
                        </div>
                        <div className="text-[#2E6BFF] text-[11px] mb-1">
                          ★★★★★
                        </div>
                        <p className="text-[14.5px] font-medium leading-[20.5px] text-[#070B16]/85">
                          {card.quote}
                        </p>
                      </div>
                    );
                  }
                  // Bottom-Right Card at x: 82%, y: 295px, w: 245px
                  return (
                    <div
                      key={card.name}
                      className="lg:absolute lg:right-0 lg:top-[295px] lg:w-[245px] p-4 opacity-75 hover:opacity-100 transition-opacity"
                    >
                      <div className="w-[46px] h-[46px] mb-2.5">
                        <TeamAvatar
                          initials={card.initials}
                          name={card.name}
                          size="sm"
                        />
                      </div>
                      <div className="text-[13px] font-semibold text-[#070B16]">
                        {card.name}
                      </div>
                      <div className="text-[11px] text-[#91908E] mb-2">
                        {card.role}
                      </div>
                      <p className="text-[12.5px] leading-[17.5px] text-[#686963]">
                        {card.quote}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls & CTA Bar below Scattered Perspectives (Matches pricing_10.jpg) */}
          <div className="mt-8 pt-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
            <div className="lg:col-start-4 lg:col-span-3 flex items-center gap-6 text-xs font-semibold">
              <button
                onClick={() =>
                  setPerspectiveSlideIdx((p) => (p === 0 ? 1 : 0))
                }
                className="inline-flex items-center gap-2 text-[#91908E] hover:text-[#070B16] transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span>Previous</span>
              </button>
              <button
                onClick={() =>
                  setPerspectiveSlideIdx((p) => (p === 0 ? 1 : 0))
                }
                className="inline-flex items-center gap-2 text-[#070B16] hover:text-[#2E6BFF] transition-colors cursor-pointer"
              >
                <span>Next</span>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
              </button>
            </div>

            <div className="lg:col-start-7 lg:col-span-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {TEAM_MEMBERS.slice(0, 3).map((m) => (
                    <TeamAvatar
                      key={m.id}
                      initials={m.initials}
                      name={m.name}
                      size="xs"
                    />
                  ))}
                </div>
                <span className="font-display text-sm font-semibold text-[#070B16]">
                  06<sup className="text-[#2E6BFF]">+</sup>
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openContactWith("Book Discovery Call")}
                className="h-[47px] w-[237px] px-6 rounded-[32px] bg-[#070B16] hover:bg-[#1E3A8A] text-white flex items-center justify-between text-xs font-medium cursor-pointer transition-colors"
              >
                <span>Book a Discovery Call</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#91908E]" />
                  <span className="w-2 h-2 rounded-full bg-white" />
                </span>
              </motion.button>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              DASHBOARD GRAPHS (Matches y: 11588 in steps/2243/output.txt 1:1)
          ----------------------------------------------------------------- */}
          <div className="mt-28 sm:mt-36 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Graph 1: Projects by Field */}
            <div>
              <div className="text-[14.08px] font-semibold tracking-[-0.704px] text-[#070B16] pb-3 border-b border-[#070B16]/20">
                Capabilities by Field
              </div>
              <div className="mt-7 flex items-center gap-8 h-[190px]">
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="4.8"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#070B16"
                      strokeWidth="4.8"
                      initial={{ strokeDasharray: "0 100" }}
                      whileInView={{ strokeDasharray: "58 100" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#2E6BFF"
                      strokeWidth="4.8"
                      strokeDashoffset="-58"
                      initial={{ strokeDasharray: "0 100" }}
                      whileInView={{ strokeDasharray: "26 100" }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.2,
                        duration: 0.9,
                        ease: EASE_OUT_EXPO,
                      }}
                    />
                  </svg>
                  <span className="absolute font-display text-2xl font-bold text-[#070B16]">
                    06
                  </span>
                </div>

                <div className="space-y-2 text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#070B16]" />
                    <span className="font-semibold text-[#070B16]">Web Apps</span>
                    <span className="text-[#91908E]">Next.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2E6BFF]" />
                    <span className="font-semibold text-[#070B16]">Branding</span>
                    <span className="text-[#91908E]">Identity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#686963]" />
                    <span className="font-semibold text-[#070B16]">UI/UX</span>
                    <span className="text-[#91908E]">Figma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D1D5DB]" />
                    <span className="font-semibold text-[#070B16]">AI Ops</span>
                    <span className="text-[#91908E]">Workflows</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[13px] text-[#686963]">
                The breakdown is based on the primary discipline of our studio packages.
              </p>
            </div>

            {/* Graph 2: Delivery Cadence Bar Chart */}
            <div>
              <div className="text-[14.08px] font-semibold tracking-[-0.704px] text-[#070B16] pb-3 border-b border-[#070B16]/20">
                Delivery Milestones
              </div>
              <div className="mt-7 h-[190px] flex items-end gap-3 pt-4">
                {[
                  { yr: "Call", val: "30m", pct: 32, active: true },
                  { yr: "Scope", val: "24h", pct: 52, active: false },
                  { yr: "UI/UX", val: "Wk 1", pct: 74, active: false },
                  { yr: "Code", val: "Wk 2", pct: 62, active: false },
                  { yr: "Care", val: "30d", pct: 96, active: false },
                ].map((bar, i) => (
                  <div
                    key={bar.yr}
                    className="flex-1 h-full flex flex-col justify-end items-center"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${bar.pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.1 + i * 0.08,
                        duration: 0.8,
                        ease: EASE_OUT_EXPO,
                      }}
                      className={`w-full ${
                        bar.active
                          ? "bg-[#070B16] text-white"
                          : "bg-[#91908E]/50 text-white"
                      } flex items-start justify-center pt-2 text-[11px] font-semibold`}
                    >
                      {bar.val}
                    </motion.div>
                    <span className="text-[11px] font-semibold text-[#070B16] mt-2">
                      {bar.yr}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] text-[#686963]">
                Structured weekly milestones from discovery call to 30-day post-launch support.
              </p>
            </div>

            {/* Graph 3: People Making a Project (6x3 Dot Matrix) */}
            <div>
              <div className="text-[14.08px] font-semibold tracking-[-0.704px] text-[#070B16] pb-3 border-b border-[#070B16]/20">
                People making a Project
              </div>
              <div className="mt-7 h-[190px] flex items-center gap-8">
                <div className="grid grid-cols-6 gap-2.5">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.025, duration: 0.35 }}
                      className={`w-4 h-4 rounded-full ${
                        i < 11 ? "bg-[#070B16]" : "bg-[#91908E]/40"
                      }`}
                    />
                  ))}
                </div>
                <div className="space-y-2 text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#070B16]" />
                    <span className="font-semibold text-[#070B16]">Involved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#91908E]/50" />
                    <span className="text-[#686963]">Advisory</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[13px] text-[#686963]">
                Dedicated product, brand, and full-stack Next.js specialists assigned to every build.
              </p>
            </div>
          </div>

          {/* USER CASES / PRODUCT BENCHMARKS (Matches y: 12040 in steps/2243/output.txt) */}
          <div className="mt-24 sm:mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 mb-12">
              <div className="lg:col-start-5 lg:col-span-8">
                <h3 className="font-display text-[48px] sm:text-[64px] font-semibold leading-none tracking-[-0.04em] text-[#070B16]">
                  Product cases:
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {[
                {
                  logo: "ORBYN®",
                  num: "06",
                  sup: "+",
                  statDesc: "Real-time modules live in beta on Next.js 15 & Supabase",
                  person: "Ryan Zannah",
                  role: "Founder & CEO, QORVAYN",
                  initials: "RZ",
                  quote:
                    "Live presence, daily reflection, voice notes, shared memories, AI date planner, and an on-device two-person photobooth.",
                },
                {
                  logo: "SNOWVAYN®",
                  num: "02",
                  sup: "×",
                  statDesc: "Seasonal brand & storefront engines in one unified store",
                  person: "Shoyetur Rahman Sayel",
                  role: "Lead Software Engineer",
                  initials: "SS",
                  quote:
                    "Tokenized e-commerce architecture that switches visual identity automatically between winter (SnowVayn) and summer (SunVayn).",
                },
                {
                  logo: "CONTINUUM®",
                  num: "30",
                  sup: "d",
                  statDesc: "Post-launch engineering care included on every project",
                  person: "Adelia Maharani",
                  role: "Co-Founder & Creative Director",
                  initials: "AM",
                  quote:
                    "Every project starts with clear discovery and ships with a launch checklist, full code handover, and 30 days of support.",
                },
              ].map((uc) => (
                <div key={uc.logo}>
                  <div className="font-display text-sm font-bold tracking-tight text-[#686963] pb-3 border-b border-[#070B16]/20">
                    {uc.logo}
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="font-display text-[56px] sm:text-[64px] font-semibold leading-none tracking-[-0.045em] text-[#070B16]">
                      {uc.num}
                      <sup className="text-2xl text-[#2E6BFF] ml-0.5">
                        {uc.sup}
                      </sup>
                    </div>
                    <p className="text-[14px] font-medium leading-[19.5px] text-[#686963] max-w-[165px]">
                      {uc.statDesc}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <TeamAvatar
                      initials={uc.initials}
                      name={uc.person}
                      size="sm"
                    />
                    <div>
                      <div className="text-[13px] font-semibold text-[#070B16]">
                        {uc.person}
                      </div>
                      <div className="text-[12px] text-[#91908E]">{uc.role}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-[13px] leading-[18.5px] text-[#070B16]/80 max-w-[280px]">
                    {uc.quote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 07: TEAM STICKY SCROLL-DRIVEN ORBITAL PARADE (9 Moons/Portraits)
          Matches [data-framer-name="Team"] (y: 12655, h: 3167) 1:1
      ===================================================================== */}
      <div
        ref={teamScrollRef}
        id="team"
        className="relative bg-[#03050C] text-white lg:h-[240vh]"
      >
        {/* Sticky 100vh Universe Stage */}
        <div className="lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden flex flex-col justify-center py-20 lg:py-0">
          {/* Universe Starfield Background */}
          <img
            src="/astra/section-stars-bg.png"
            alt=""
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-85"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_65%_45%,rgba(30,58,138,0.32),rgba(3,5,12,0.68)_75%)]"
          />

          <div className="relative z-10 max-w-[1354px] w-full mx-auto px-5 sm:px-9">
            {/* Monumental 128px "Team" Heading at col-start-5 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 mb-6 sm:mb-10">
              <div className="lg:col-start-5 lg:col-span-8">
                <h2 className="font-display text-[clamp(3.8rem,9vw,128px)] font-semibold leading-[0.9] tracking-[-0.04em] text-white">
                  Team
                </h2>
              </div>
            </div>

            {/* Active Member Name & Role at col-start-5 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 mb-4">
              <div className="lg:col-start-5 lg:col-span-8 min-h-[54px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="text-[18px] font-semibold tracking-[-0.8px] text-white">
                      {activeMember.name}
                    </div>
                    <div className="w-8 h-[1px] bg-white/35 my-1.5" />
                    <div className="text-[13px] text-white/60">
                      {activeMember.role}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* 9-OBJECT ORBITAL PARADE ROW (Matches "Parade row" in steps/2247/output.txt 1:1) */}
            <div className="relative flex items-center justify-between gap-4 py-4">
              {/* Left "• Prev." button */}
              <button
                onClick={() =>
                  setActiveTeamIdx((prev) =>
                    prev === 0 ? TEAM_MEMBERS.length - 1 : prev - 1
                  )
                }
                className="relative z-10 inline-flex items-center gap-2 text-xs font-medium text-white/80 hover:text-[#60A5FA] transition-colors cursor-pointer shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Prev.</span>
              </button>

              {/* Left 4 Distant Moons / Avatars (14px, 21px, 13px, 9px) */}
              <div className="hidden md:flex items-center gap-4 lg:gap-6">
                <span className="w-[14px] h-[14px] rounded-full bg-white/30" />
                <button
                  onClick={() =>
                    setActiveTeamIdx(
                      (activeTeamIdx + TEAM_MEMBERS.length - 2) %
                        TEAM_MEMBERS.length
                    )
                  }
                  className="w-[24px] h-[24px] rounded-full overflow-hidden opacity-65 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <TeamAvatar
                    initials={
                      TEAM_MEMBERS[
                        (activeTeamIdx + TEAM_MEMBERS.length - 2) %
                          TEAM_MEMBERS.length
                      ].initials
                    }
                    name=""
                    size="xs"
                  />
                </button>
                <button
                  onClick={() =>
                    setActiveTeamIdx(
                      (activeTeamIdx + TEAM_MEMBERS.length - 1) %
                        TEAM_MEMBERS.length
                    )
                  }
                  className="w-[16px] h-[16px] rounded-full bg-[#2E6BFF]/60 hover:scale-125 transition-transform cursor-pointer"
                />
                <span className="w-[9px] h-[9px] rounded-full bg-white/40" />
              </div>

              {/* Center Active 255x255 Portrait + Right Graduated Portraits (95px, 61px, 29px, 29px) */}
              <div className="flex items-center justify-center gap-5 sm:gap-8 lg:gap-10">
                {/* Active 255px Portrait */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.id}
                    initial={{ scale: 0.86, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.86, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                    }}
                    className="relative"
                  >
                    <TeamAvatar
                      initials={activeMember.initials}
                      name={activeMember.name}
                      tone={activeMember.tone}
                      size="xl"
                      active
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Next 4 Graduated Orbital Portraits on the right (95px, 61px, 29px, 29px) */}
                {[1, 2, 3, 4].map((offset) => {
                  const m =
                    TEAM_MEMBERS[(activeTeamIdx + offset) % TEAM_MEMBERS.length];
                  const sizeMap: Record<number, string> = {
                    1: "w-[76px] h-[76px] sm:w-[95px] sm:h-[95px]",
                    2: "hidden sm:flex w-[61px] h-[61px]",
                    3: "hidden lg:flex w-[32px] h-[32px]",
                    4: "hidden lg:flex w-[29px] h-[29px]",
                  };
                  return (
                    <button
                      key={`${m.id}-${offset}`}
                      onClick={() =>
                        setActiveTeamIdx(
                          (activeTeamIdx + offset) % TEAM_MEMBERS.length
                        )
                      }
                      className={`${sizeMap[offset]} rounded-full overflow-hidden opacity-75 hover:opacity-100 hover:scale-105 transition-all cursor-pointer shrink-0`}
                    >
                      <TeamAvatar
                        initials={m.initials}
                        name={m.name}
                        tone={m.tone}
                        size={offset === 1 ? "lg" : offset === 2 ? "md" : "xs"}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right "Next •" button */}
              <button
                onClick={() =>
                  setActiveTeamIdx((prev) =>
                    prev === TEAM_MEMBERS.length - 1 ? 0 : prev + 1
                  )
                }
                className="relative z-10 inline-flex items-center gap-2 text-xs font-medium text-white/80 hover:text-[#60A5FA] transition-colors cursor-pointer shrink-0"
              >
                <span>Next</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </button>
            </div>

            {/* Bottom Quote Line (Matches "Message line" at y: 13883) */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-start-5 lg:col-span-2 flex items-center justify-between pt-4">
                <AstraStarLogo className="w-3.5 h-3.5 text-white/80" />
                <span className="font-display text-5xl text-white/35 leading-none select-none">
                  &rdquo;
                </span>
              </div>
              <div className="lg:col-start-7 lg:col-span-5 min-h-[96px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeMember.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-[14.08px] font-medium leading-[20px] tracking-[-0.704px] text-white/85 max-w-[300px]"
                  >
                    {activeMember.quote}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 08: INSIGHTS (Crisp White + 128x128 Circular Apertures)
          Matches [data-framer-name="Insights"] (y: 15821) 1:1
      ===================================================================== */}
      <section
        id="insights"
        className="paper-surface text-[#070B16] py-24 sm:py-36"
      >
        <div className="max-w-[1354px] mx-auto px-5 sm:px-9">
          {/* Monumental 128px "Insights" Heading at col-start-5 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
              className="lg:col-start-5 lg:col-span-8"
            >
              <h2 className="font-display text-[clamp(3.8rem,9vw,128px)] font-semibold leading-[0.9] tracking-[-0.04em] text-[#070B16]">
                Insights
              </h2>
            </motion.div>
          </div>

          {/* Founder Message Row at col-start-5 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
            <div className="lg:col-start-5 lg:col-span-2">
              <div className="w-[42px] h-[42px] mb-2">
                <TeamAvatar
                  initials="RZ"
                  name="Ryan Zannah"
                  tone="from-[#2E6BFF] to-[#0B1020]"
                  size="sm"
                />
              </div>
              <div className="text-[13px] font-semibold text-[#070B16]">
                Ryan Zannah
              </div>
              <div className="text-[12px] text-[#91908E]">Founder &amp; CEO</div>
            </div>

            <div className="lg:col-start-7 lg:col-span-6">
              <p className="font-display text-[20px] sm:text-[24px] font-medium leading-[33.12px] tracking-[-1.44px] text-[#070B16] max-w-[512px]">
                We have a lot to say about how we design, architect, and ship digital products at QORVAYN — and the nuances of our process. We made it practical for you.
              </p>
            </div>
          </div>

          {/* 3 Insight Columns (w: 431 each, 128x128 circular image on right half of column) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {INSIGHTS_LIST.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.65,
                  ease: EASE_OUT_EXPO,
                }}
                onClick={() => setActiveInsight(article)}
                className="group cursor-pointer"
              >
                {/* 128x128 Circular Image aligned with right sub-column (matches x: 267, 728, 1190) */}
                <div className="grid grid-cols-2 mb-8">
                  <div />
                  <div>
                    <motion.img
                      whileHover={{ scale: 1.06 }}
                      src={INSIGHT_IMAGES[idx % INSIGHT_IMAGES.length]}
                      alt={article.title}
                      className="w-[112px] h-[112px] sm:w-[128px] sm:h-[128px] rounded-full object-cover shadow-md"
                    />
                  </div>
                </div>

                {/* 1px Top Rule + Date on left, Title on right */}
                <div className="pt-5 border-t border-[#070B16]/20 grid grid-cols-2 gap-4 items-start">
                  <div className="flex items-start gap-1">
                    <span className="font-display text-[32px] sm:text-[36px] font-semibold leading-none tracking-[-1.8px] text-[#070B16]">
                      {article.day}
                    </span>
                    <span className="text-[12px] font-medium text-[#686963] mt-0.5">
                      {article.month}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-[14.08px] font-semibold leading-[19.7px] tracking-[-0.704px] text-[#070B16] group-hover:text-[#2E6BFF] transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA Block: ++ on left, "All Insights •●" black pill at col-start-7 */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
            <div className="lg:col-start-5 lg:col-span-2 flex items-center gap-1 text-[#070B16]">
              <Plus className="w-4 h-4" />
              <Plus className="w-4 h-4" />
            </div>
            <div className="lg:col-start-7 lg:col-span-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveInsight(INSIGHTS_LIST[0])}
                className="h-[47px] w-[233px] px-6 rounded-[32px] bg-[#070B16] hover:bg-[#1E3A8A] text-white flex items-center justify-between text-xs font-medium cursor-pointer transition-colors"
              >
                <span>All Insights</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#91908E]" />
                  <span className="w-2 h-2 rounded-full bg-white" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 09: FAQ ACCORDION (Crisp White + Noise Overlay)
          Matches [data-framer-name="FAQ"] (y: 16991) 1:1
      ===================================================================== */}
      <section
        id="faq"
        className="paper-surface text-[#070B16] py-24 sm:py-36 relative overflow-hidden"
      >
        <div className="noise-overlay absolute inset-0" />

        <div className="relative z-10 max-w-[1354px] mx-auto px-5 sm:px-9">
          {/* Monumental 128px "FAQ" Heading at col-start-5 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
              className="lg:col-start-5 lg:col-span-8"
            >
              <h2 className="font-display text-[clamp(3.8rem,9vw,128px)] font-semibold leading-[0.9] tracking-[-0.04em] text-[#070B16]">
                FAQ
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col (w: 445): Founder Persona */}
            <div className="lg:col-span-4">
              <div className="w-[42px] h-[42px] mb-2.5">
                <TeamAvatar
                  initials="RZ"
                  name="Ryan Zannah"
                  tone="from-[#2E6BFF] to-[#0B1020]"
                  size="sm"
                />
              </div>
              <div className="text-[13px] font-semibold text-[#070B16]">
                Ryan Zannah
              </div>
              <div className="text-[12px] text-[#91908E]">Founder &amp; CEO</div>
              <p className="mt-5 text-[14.08px] font-semibold leading-[19.7px] tracking-[-0.704px] text-[#070B16] max-w-[210px]">
                Behind every project: the thinking that fuels Qorvaynology’s creative process.
              </p>
            </div>

            {/* Right Col (col-start-5, w: 890): Accordion + Ask your Question CTA */}
            <div className="lg:col-span-8">
              <div className="divide-y divide-[#070B16]/15 border-t border-b border-[#070B16]/15">
                {FAQ_ITEMS.map((faq) => {
                  const isOpen = !!openFaqIds[faq.id];
                  return (
                    <div key={faq.id} className="py-6">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between gap-6 text-left cursor-pointer group"
                      >
                        <span className="font-display text-[18px] sm:text-[20px] font-semibold tracking-[-0.8px] text-[#070B16] group-hover:text-[#2E6BFF] transition-colors">
                          {faq.question}
                        </span>
                        <span className="text-[#070B16] shrink-0">
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
                            <p className="pt-3 text-[14.08px] font-medium leading-[20px] tracking-[-0.5px] text-[#686963] max-w-[618px]">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Bottom "Didn't find the answer? Ask your Question •●" */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-12 items-center gap-6">
                <div className="sm:col-span-4">
                  <p className="text-[14.08px] font-semibold leading-[19.7px] tracking-[-0.704px] text-[#070B16]">
                    Didn’t find the answer?
                    <br />
                    Ask us about our services!
                  </p>
                </div>
                <div className="sm:col-span-8">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openContactWith("Question from FAQ")}
                    className="h-[47px] w-[239px] px-6 rounded-[32px] bg-[#070B16] hover:bg-[#1E3A8A] text-white flex items-center justify-between text-xs font-medium cursor-pointer transition-colors"
                  >
                    <span>Ask your Question</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#91908E]" />
                      <span className="w-2 h-2 rounded-full bg-white" />
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10: FOOTER WITH LIVE UNIVERSE SKY VIDEO (Matches y: 18036 1:1)
      ===================================================================== */}
      <footer
        id="contact"
        className="relative bg-[#03050C] text-white pt-24 sm:pt-32 pb-12 overflow-hidden"
      >
        {/* Live Universe Sky Video Background (Same video as Hero, darkened by Overlay black) */}
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
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#03050C]/75 via-[#060C1E]/80 to-[#03050C]/95"
        />

        <div className="relative z-10 max-w-[1354px] mx-auto px-5 sm:px-9">
          {/* Top Manifesto & Persona Row (Matches y: 18108) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-24">
            <div className="lg:col-span-4">
              <AstraStarLogo className="w-6 h-6 text-white" />
            </div>

            <div className="lg:col-span-4">
              <p className="font-display text-[20px] sm:text-[22px] font-medium leading-[30px] tracking-[-1.1px] text-white/90 max-w-[381px]">
                Qorvaynology creates brands, websites, and web apps that are simple, bold, and built to last.{" "}
                <span className="text-white/55">
                  We care about every detail and treat every project like it matters — because it does.
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
                  <div className="text-[12px] text-white/50">Founder &amp; CEO</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <p className="text-[14.08px] font-medium leading-[19.7px] tracking-[-0.704px] text-white/85">
                Space of Creative
                <br />
                Solutions · QORVAYN
              </p>
            </div>
          </div>

          {/* Middle Contacts, Navigation, Social & Subscribe Row (Matches y: 18444) */}
          <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
            {/* Col 1-4: Phone & Email */}
            <div className="lg:col-span-4 space-y-1.5">
              <div className="text-[14.08px] font-medium tracking-[-0.704px] text-white/70">
                +880 1410-831205
              </div>
              <div>
                <a
                  href="mailto:qorvaynology@gmail.com"
                  className="font-display text-[18px] sm:text-[20px] font-semibold tracking-[-0.8px] text-white hover:text-[#60A5FA] transition-colors"
                >
                  qorvaynology@gmail.com
                </a>
              </div>
              <div className="pt-3">
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

            {/* Col 5-6: Navigation */}
            <div className="lg:col-span-2">
              <div className="text-[12px] font-medium text-white/45 mb-4">
                Navigation
              </div>
              <ul className="space-y-1.5 font-display text-[20px] font-semibold tracking-[-0.8px]">
                <li>
                  <a
                    href="#top"
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#studio"
                    className="text-white hover:text-[#60A5FA] transition-colors"
                  >
                    Studio
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-white hover:text-[#60A5FA] transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#insights"
                    className="text-white hover:text-[#60A5FA] transition-colors"
                  >
                    Insights
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-white hover:text-[#60A5FA] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 7-8: Social */}
            <div className="lg:col-span-2">
              <div className="text-[12px] font-medium text-white/45 mb-4 opacity-0 select-none">
                Social
              </div>
              <ul className="space-y-2 text-[13px] font-medium text-white/80">
                {VERIFIED_SOCIALS.slice(0, 6).map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#60A5FA] transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 9-12: Subscribe / Start Brief */}
            <div className="lg:col-span-4">
              <div className="text-[12px] font-medium text-white/45 mb-4">
                Start a Project Brief
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
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="h-[42px] w-[195px] px-5 rounded-[32px] border-2 border-white/25 hover:border-white hover:bg-white hover:text-[#070B16] flex items-center justify-between text-xs font-medium transition-colors cursor-pointer"
                    >
                      <span>Start Brief</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#91908E]" />
                        <span className="w-2 h-2 rounded-full bg-current" />
                      </span>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Monumental Wordmark at col-start-5 (Matches y: 18820 in steps/2247/output.txt) */}
          <div className="pt-14 pb-14 grid grid-cols-1 lg:grid-cols-12 items-center">
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

          {/* Bottom Copyrights & Attribution Bar (Matches y: 19024) */}
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
              <div>Built in</div>
              <div className="text-white font-medium mt-0.5">
                Next.js 15 &amp; Framer Motion
              </div>
            </div>
            <div className="lg:col-span-4">
              <div>Created by</div>
              <div className="text-white font-medium mt-0.5">
                QORVAYN Team (Ryan Zannah)
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
