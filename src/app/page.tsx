"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
  Mail,
  Minus,
  Phone,
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
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { CaseStudyDrawer } from "@/components/CaseStudyDrawer";
import { ContactModal, InsightModal } from "@/components/StudioModals";

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

  // Team orbital carousel state
  const [activeTeamIdx, setActiveTeamIdx] = useState<number>(0);

  // Method quote switcher state
  const [activeMethodQuoteIdx, setActiveMethodQuoteIdx] = useState<number>(0);

  // FAQ accordion state
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    timeline: true,
    meaning: true,
  });

  // Footer inline form state
  const [footerName, setFooterName] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [footerSent, setFooterSent] = useState(false);

  const openContactWith = (subject = "") => {
    setContactSubject(subject);
    setContactOpen(true);
  };

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentPackage =
    PRICING_PACKAGES.find((p) => p.id === selectedPkgId) || PRICING_PACKAGES[0];
  const currentTier = currentPackage.tiers[selectedTierIdx] || currentPackage.tiers[1];

  const activeMember = TEAM_MEMBERS[activeTeamIdx] || TEAM_MEMBERS[0];

  const filteredProjects =
    selectedProjectCategory === "All"
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) =>
          p.category.toLowerCase().includes(selectedProjectCategory.toLowerCase())
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
    <div className="min-h-screen bg-[#07090D] text-[#F4F3EE] selection:bg-[#F5B83D] selection:text-[#07090D]">
      {/* =====================================================================
          FLOATING ARCHITECTURAL HEADER (Matches Astra top bar 1:1)
      ===================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 py-5 flex items-center justify-between">
          {/* Left: Celestial cross + Continuum studio mark */}
          <a
            href="#top"
            className="pointer-events-auto group inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#07090D]/70 backdrop-blur-md border border-white/12 text-white hover:border-[#F5B83D]/60 transition-colors"
          >
            <CelestialCross className="w-4 h-4 text-[#F5B83D] transition-transform duration-500 group-hover:rotate-90" />
            <ContinuumMark
              className="w-5 h-5"
              strokeColor="#FFFFFF"
              accentColor="#F5B83D"
            />
            <span className="font-display text-xs font-semibold tracking-tight hidden sm:inline">
              qorvaynolog<span className="text-[#F5B83D]">y</span>
            </span>
          </a>

          {/* Right: Pill Contact Trigger + Three-Dot Menu Trigger */}
          <div className="pointer-events-auto flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => openContactWith("Discovery Call — Header CTA")}
              className="group inline-flex items-center gap-3 sm:gap-6 pl-1.5 pr-4 py-1.5 rounded-full bg-[#07090D]/80 backdrop-blur-md border border-white/20 hover:border-white/45 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <TeamAvatar
                  initials="RZ"
                  name="Ryan Zannah"
                  tone="from-[#F5B83D]/50 to-[#0B1020]"
                  size="xs"
                />
                <span className="text-xs font-medium text-white/95 pr-2">
                  Contact Now
                </span>
              </div>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-white/45 group-hover:bg-[#F5B83D] transition-colors" />
                <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              className="w-10 h-10 rounded-full bg-[#07090D]/80 backdrop-blur-md border border-white/15 flex items-center justify-center gap-1 hover:border-white/40 transition-colors cursor-pointer"
            >
              <span className="w-1 h-1 rounded-full bg-white" />
              <span className="w-1 h-1 rounded-full bg-white" />
              <span className="w-1 h-1 rounded-full bg-white" />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          FULL-SCREEN NAVIGATION OVERLAY (Triggered by ••• button)
      ===================================================================== */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 cosmos-surface starfield-overlay text-[#F4F3EE] flex flex-col justify-between p-6 sm:p-12">
          <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between border-b border-white/12 pb-6">
            <div className="flex items-center gap-3">
              <ContinuumMark className="w-7 h-7" strokeColor="#FFFFFF" accentColor="#F5B83D" />
              <span className="font-mono-tech text-[11px] text-white/60">
                QORVAYNOLOGY® NAVIGATION INDEX
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 my-auto py-8">
            <nav className="md:col-span-7 flex flex-col gap-2 sm:gap-3">
              {[
                { idx: "01", label: "Home", href: "#top" },
                { idx: "02", label: "Studio & Facts", href: "#studio" },
                { idx: "03", label: "Services", href: "#services" },
                { idx: "04", label: "Projects", href: "#projects" },
                { idx: "05", label: "Pricing", href: "#pricing" },
                { idx: "06", label: "The Method", href: "#method" },
                { idx: "07", label: "Team", href: "#team" },
                { idx: "08", label: "Insights", href: "#insights" },
                { idx: "09", label: "FAQ", href: "#faq" },
              ].map((item) => (
                <a
                  key={item.idx}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-4 py-1 text-2xl sm:text-4xl font-display font-semibold tracking-tight text-white/80 hover:text-white transition-colors"
                >
                  <span className="font-mono-tech text-[11px] text-[#F5B83D] opacity-70 group-hover:opacity-100">
                    /{item.idx}
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

            <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/12 pt-6 md:pt-0 md:pl-10">
              <div>
                <div className="font-mono-tech text-[11px] text-[#F5B83D] mb-2">
                  DIRECT STUDIO CONTACT
                </div>
                <p className="font-display text-xl font-medium text-white">
                  The QORVAYN way of building, applied to your business.
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-white/70">
                  <div>Kushtia & Dhaka, Bangladesh · Remote Worldwide</div>
                  <div>
                    <a href="mailto:qorvaynology@gmail.com" className="underline hover:text-white">
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
                    className="inline-flex items-center gap-2 bg-[#F5B83D] text-[#07090D] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-white transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Discovery Call</span>
                  </a>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      openContactWith("Project Brief from Menu");
                    }}
                    className="inline-flex items-center gap-2 border border-white/25 px-5 py-2.5 rounded-full text-xs font-medium hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    <span>Send Project Brief</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/12">
                <div className="font-mono-tech text-[10px] text-white/45 mb-3">
                  VERIFIED PLATFORMS
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/70">
                  {VERIFIED_SOCIALS.slice(0, 8).map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#F5B83D] transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between text-[11px] font-mono-tech text-white/45 pt-4 border-t border-white/12">
            <span>QORVAYNOLOGY® · EST. 2026</span>
            <span>BUILT BY THE TEAM BEHIND QORVAYN</span>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 01: SPLIT ECLIPSE HERO (Matches download.avif 1:1)
      ===================================================================== */}
      <section
        id="top"
        className="relative min-h-[96vh] lg:min-h-screen w-full cosmos-surface starfield-overlay overflow-hidden flex flex-col justify-between"
      >
        {/* Left Celestial Warm-Paper Eclipse Arc */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-18%] bottom-[-18%] left-[-38%] sm:left-[-22%] lg:left-[-12%] w-[88vw] sm:w-[68vw] lg:w-[56vw] rounded-r-full bg-gradient-to-r from-[#D8D6CE] via-[#EAE8E1] to-[#F7F6F1] shadow-[30px_0_90px_rgba(255,255,255,0.12)]"
        />

        {/* Horizontal Architectural Ink Horizon Bar cutting across the left arc (from download.avif) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[43%] left-0 w-[48vw] h-[18px] sm:h-[22px] bg-gradient-to-r from-[#07090D] via-[#07090D] to-transparent z-10"
        />

        {/* Black Eclipse Sphere + Orbiting Satellite Dot on the light arc (from download.avif) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[31%] left-[30%] sm:left-[34%] lg:left-[36%] z-10 flex items-start gap-1.5 animate-slow-orbit"
        >
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#07090D] shadow-[inset_-4px_-4px_12px_rgba(255,255,255,0.14)]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#07090D] mt-0.5" />
        </div>

        {/* Right-edge celestial star coordinate (from download.avif) */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute top-[56%] right-10 z-10 text-white/80"
        >
          <CelestialCross className="w-3.5 h-3.5" />
        </div>

        {/* Top Spacer + Sub-caption under the Contact pill */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-10 pt-24 sm:pt-28 flex justify-end">
          <div className="w-56 sm:w-64 text-left">
            <p className="text-[11px] sm:text-xs text-white/65 leading-snug">
              Reach out to start
              <br />
              your project
            </p>
          </div>
        </div>

        {/* Middle & Lower Hero Content */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-10 mt-auto pb-12 sm:pb-16">
          {/* Right-side lead-in above the monumental title */}
          <div className="flex justify-end mb-2 sm:mb-4">
            <div className="w-full sm:w-[44%] lg:w-[38%]">
              <p className="font-display text-lg sm:text-2xl font-medium tracking-tight text-white/95 leading-snug">
                The QORVAYN Way
                <br />
                of Building
              </p>
            </div>
          </div>

          {/* Bottom Grid: Left 4 Service Lines on Paper Arc + Center/Right Monumental Wordmark */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8">
            {/* Left 4 Service Index Lines sitting over the Warm Paper Eclipse Arc */}
            <div className="lg:col-span-4 pb-2 sm:pb-4">
              <div className="max-w-[260px] space-y-2.5 bg-[#F4F3EE]/85 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-4 lg:p-0 border border-black/10 lg:border-0">
                {HERO_SERVICES.map((srv) => {
                  const isActive = activeHeroService === srv.id;
                  return (
                    <a
                      key={srv.id}
                      href="#services"
                      onMouseEnter={() => setActiveHeroService(srv.id)}
                      onClick={() => setOpenServiceId(srv.id)}
                      className="group flex items-center justify-between text-xs font-medium text-[#0B1020] py-0.5 transition-opacity"
                    >
                      <span
                        className={
                          isActive
                            ? "font-semibold text-[#07090D]"
                            : "text-[#0B1020]/70 group-hover:text-[#07090D]"
                        }
                      >
                        {srv.label}
                      </span>
                      <span
                        className={`h-[1.5px] transition-all duration-300 ${
                          isActive
                            ? "w-4 bg-[#07090D]"
                            : "w-2.5 bg-[#0B1020]/30 group-hover:w-3.5 group-hover:bg-[#07090D]"
                        }`}
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Monumental Dual-Polarity Wordmark spanning the Eclipse boundary */}
            <div className="lg:col-span-8 flex flex-col items-start lg:items-start">
              <div className="relative inline-flex items-start select-none mix-blend-difference">
                <h1 className="font-display font-semibold text-white text-[clamp(3.3rem,10.2vw,10.5rem)] leading-[0.88] tracking-[-0.045em]">
                  Qorvayn
                </h1>
                <span className="ml-1 sm:ml-2 mt-1 sm:mt-3 w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-white text-[#07090D] font-display font-bold text-xs sm:text-base flex items-center justify-center">
                  ®
                </span>
              </div>

              {/* Sub-caption directly below the monumental wordmark */}
              <div className="mt-5 sm:mt-6 lg:ml-[24%] flex flex-wrap items-center gap-6">
                <p className="text-xs sm:text-sm text-white/80 leading-snug">
                  Full-service Design &amp; Tech Studio
                  <br />
                  <span className="text-white/55">
                    qorvaynology.com · Kushtia &amp; Dhaka, BD
                  </span>
                </p>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 bg-white/[0.04] text-xs font-medium text-white hover:border-[#F5B83D] hover:text-[#F5B83D] transition-colors"
                >
                  <span>Explore Work</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02: STUDIO FACTSHEET & "TEAM OF PILOTS" (Warm Paper #F4F3EE)
          Matches frame_005.jpg, frame_006.jpg & download (1).avif
      ===================================================================== */}
      <section
        id="studio"
        className="paper-surface text-[#0B1020] py-20 sm:py-28 lg:py-36 border-t border-black/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10">
          {/* Top Row: ++ Crosshairs on Left + Architectural Facts on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 flex items-center gap-1 text-lg font-mono-tech text-[#0B1020]">
              <span>+</span>
              <span>+</span>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12">
              {STUDIO_FACTS.slice(0, 2).map((fact, idx) => (
                <div key={idx}>
                  <div className="text-xs font-semibold text-[#0B1020] pb-3 border-b border-black/20">
                    {fact.title}
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-6">
                    <div className="font-display text-6xl sm:text-7xl font-semibold tracking-tight text-[#0B1020] leading-none flex items-start">
                      <span>{fact.value}</span>
                      {fact.sup && (
                        <span className="text-2xl sm:text-3xl font-medium ml-1 -mt-1">
                          {fact.sup}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-black/65 leading-relaxed max-w-[210px]">
                      {fact.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Third Fact Block offset to the left column of the 2-col grid (matches "Year of Establishment 2004/2008" in frame_005.jpg) */}
              <div className="sm:col-span-1 pt-2">
                <div className="text-xs font-semibold text-[#0B1020] pb-3 border-b border-black/20">
                  {STUDIO_FACTS[2].title}
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <p className="text-xs text-black/65 leading-relaxed max-w-[200px]">
                    {STUDIO_FACTS[2].description}
                  </p>
                  <div className="text-right">
                    <div className="font-display text-5xl sm:text-6xl font-semibold tracking-tight text-[#0B1020] leading-none">
                      {STUDIO_FACTS[2].value}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-[#0B1020] text-white text-[9px] flex items-center justify-center font-mono-tech">
                        Q
                      </span>
                      <span className="w-4 h-4 rounded-full bg-[#F5B83D] text-[#0B1020] text-[9px] flex items-center justify-center font-mono-tech font-bold">
                        y
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row: "Team of Pilots" + Studio Lead + Editorial Statement (Matches frame_006.jpg) */}
          <div className="mt-24 sm:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-12 border-t border-black/10">
            {/* Col 1: Team of Pilots */}
            <div className="lg:col-span-3">
              <div className="text-xs font-semibold text-[#0B1020]">
                Team of Pilots
              </div>
              <div className="w-3 h-[1.5px] bg-[#0B1020]/40 my-2" />
              <div className="text-xs text-black/55">Our People</div>

              <div className="mt-6 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/[0.06] border border-black/15 font-mono-tech text-[11px] font-semibold text-[#0B1020]">
                  06
                </span>
                <div className="flex -space-x-2">
                  {TEAM_MEMBERS.slice(0, 4).map((m) => (
                    <TeamAvatar
                      key={m.id}
                      initials={m.initials}
                      name={m.name}
                      tone={m.tone}
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Col 2: Qorvaynology Studio + Founder Badge */}
            <div className="lg:col-span-3">
              <div className="text-xs font-semibold text-[#0B1020]">
                Qorvaynology
              </div>
              <div className="text-xs text-black/55 mt-0.5">
                Design &amp; Tech Studio
              </div>
              <p className="text-[11px] text-black/50 mt-3 leading-relaxed">
                A product team that designs, builds, and ships its own software.
              </p>
              <div className="w-3 h-[1.5px] bg-[#0B1020] my-4" />

              <div className="mt-4 flex items-center gap-3">
                <TeamAvatar
                  initials="RZ"
                  name="Ryan Zannah"
                  tone="from-[#F5B83D]/50 to-[#0B1020]"
                  size="md"
                />
                <div>
                  <div className="text-xs font-semibold text-[#0B1020]">
                    Ryan Zannah
                  </div>
                  <div className="text-[11px] text-black/55">
                    Founder &amp; CEO
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3: Studio Positioning Statement + Real Ecosystem Strip */}
            <div className="lg:col-span-6">
              <p className="font-display text-xl sm:text-2xl lg:text-[26px] font-medium text-[#0B1020] leading-[1.35] tracking-tight">
                We&apos;re a full-service design and technology studio{" "}
                <span className="text-black/60">
                  built by the team behind QORVAYN. From brand identity systems to full-stack Next.js and Supabase web applications, we create digital products that don&apos;t just look world-class:
                </span>{" "}
                they ship cleanly, convert, and endure.
              </p>

              {/* Real QORVAYN Ecosystem & Venture Marks */}
              <div className="mt-10 pt-6 border-t border-black/12 flex flex-wrap items-center justify-between gap-6 text-xs font-mono-tech text-black/45">
                <span className="font-display font-bold tracking-tight text-sm text-[#0B1020]/70">
                  QORVAYN®
                </span>
                <span className="flex items-center gap-1.5 text-[#0B1020]/70">
                  <CelestialCross className="w-3 h-3 text-[#B45F06]" />
                  ORBYN BETA
                </span>
                <span className="text-[#0B1020]/70">SNOWVAYN / SUNVAYN</span>
                <span className="text-[#0B1020]/70">CONTINUUM SYSTEM</span>
                <span className="text-[#0B1020]/70">KUSHTIA &amp; DHAKA, BD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 03: SERVICES ACCORDION MATRIX (Warm Paper #F4F3EE)
          Matches frame_007.jpg & frame_008.jpg
      ===================================================================== */}
      <section
        id="services"
        className="paper-surface text-[#0B1020] pb-24 sm:pb-32 pt-8 border-t border-black/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10">
          {/* Monumental "Services" Heading */}
          <div className="mb-14 sm:mb-20 lg:pl-[25%]">
            <h2 className="font-display text-[clamp(3.2rem,7.5vw,6.8rem)] font-semibold tracking-[-0.045em] text-[#0B1020] leading-none">
              Services
            </h2>
          </div>

          {/* 1px Hairline Accordion Rows (/01 to /06) */}
          <div className="divide-y divide-black/15 border-t border-b border-black/15">
            {SERVICES_LIST.map((srv) => {
              const isOpen = openServiceId === srv.id;
              return (
                <div
                  key={srv.id}
                  className="py-7 sm:py-9 transition-colors"
                >
                  <div
                    onClick={() =>
                      setOpenServiceId(isOpen ? "" : srv.id)
                    }
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start cursor-pointer group"
                  >
                    {/* Left Index (/01) */}
                    <div className="lg:col-span-3 flex items-center justify-between lg:justify-start gap-4">
                      <span className="font-mono-tech text-xs text-black/50">
                        {srv.index}
                      </span>
                      <span className="lg:hidden font-mono-tech text-[11px] text-black/55">
                        {srv.timeline}
                      </span>
                    </div>

                    {/* Service Title + Circular Aperture Badge when expanded */}
                    <div className="lg:col-span-4 flex items-center justify-between pr-4">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#0B1020] group-hover:text-[#B45F06] transition-colors">
                          {srv.title}
                        </h3>
                        <p className="text-xs text-black/50 mt-0.5">
                          {srv.shortLabel}
                        </p>
                      </div>

                      {isOpen && (
                        <div className="hidden sm:flex items-center gap-1.5">
                          <div
                            className={`w-16 h-16 rounded-full bg-gradient-to-br ${srv.accentHue} flex items-center justify-center shadow-inner border border-black/15`}
                          >
                            <ContinuumMark
                              className="w-7 h-7"
                              strokeColor="#FFFFFF"
                              accentColor="#F5B83D"
                            />
                          </div>
                          <span className="w-5 h-5 rounded-full bg-[#0B1020] text-white font-mono-tech text-[10px] flex items-center justify-center">
                            i
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Summary & Deliverables */}
                    <div className="lg:col-span-3">
                      <p className="text-xs sm:text-sm text-[#0B1020]/85 leading-relaxed">
                        {srv.summary}
                      </p>

                      {isOpen && (
                        <ul className="mt-4 space-y-1.5 text-xs text-black/60">
                          {srv.deliverables.map((d, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#B45F06]">·</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Right Column: Timeline / Pricing + Expand Toggle */}
                    <div className="lg:col-span-2 flex items-start justify-between lg:justify-end gap-6">
                      <div className="text-left lg:text-right">
                        <div className="font-display text-lg font-semibold text-[#0B1020]">
                          {currency === "USD" ? srv.usdRange : srv.bdtRange}
                        </div>
                        <div className="font-mono-tech text-[10px] text-black/50 mt-0.5">
                          {srv.timeline}
                        </div>
                        {isOpen && (
                          <div className="mt-3 space-y-0.5 text-[11px] text-black/55">
                            {srv.relatedProjects.map((rp) => (
                              <div key={rp}>{rp}</div>
                            ))}
                          </div>
                        )}
                      </div>

                      <span className="w-7 h-7 rounded-full border border-black/15 flex items-center justify-center text-[#0B1020] group-hover:bg-[#0B1020] group-hover:text-white transition-colors shrink-0">
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Summary Bar under Services (matches frame_008.jpg) */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-3" />
            <div className="lg:col-span-5">
              <p className="font-display text-lg sm:text-xl font-medium text-[#0B1020] leading-snug">
                Qorvaynology helps businesses stand out with calm, world-class design and full-stack engineering.{" "}
                <span className="text-black/55">
                  We mix strategy, product craft, and modern technology.
                </span>
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                onClick={() => openContactWith("Service Package Inquiry")}
                className="inline-flex items-center justify-between gap-8 bg-[#0B1020] text-[#F4F3EE] pl-6 pr-4 py-3 rounded-full text-xs font-medium hover:bg-[#1E293B] transition-colors cursor-pointer min-w-[180px]"
              >
                <span>Get Started</span>
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B83D]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 04: PROJECTS SHOWCASE (Dark Cosmic Surface #07090D)
          Matches download (2).avif & frame_009.jpg–frame_011.jpg
      ===================================================================== */}
      <section
        id="projects"
        className="cosmos-surface starfield-overlay text-[#F4F3EE] py-24 sm:py-32 border-t border-white/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10">
          {/* Monumental "Projects" Heading + Category Filter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 sm:mb-24">
            <div className="lg:col-span-3 hidden lg:block">
              <CelestialCross className="w-5 h-5 text-white/80" />
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-display text-[clamp(3.4rem,8vw,7.2rem)] font-semibold tracking-[-0.045em] text-white leading-none">
                Projects
              </h2>
              <div className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-white/90">
                0{PROJECTS_LIST.length}
                <sup className="text-sm text-[#F5B83D] ml-0.5">+</sup>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2 text-xs">
              {[
                { label: "All Ecosystem & Studio Work", filter: "All" },
                { label: "Brand Identity & Systems", filter: "Brand" },
                { label: "Full-Stack Web Apps & UI/UX", filter: "App" },
                { label: "E-Commerce & Seasonal Platforms", filter: "Commerce" },
              ].map((cat) => {
                const active = selectedProjectCategory === cat.filter;
                return (
                  <button
                    key={cat.filter}
                    onClick={() => setSelectedProjectCategory(cat.filter)}
                    className={`flex items-center justify-between py-1 text-left transition-colors cursor-pointer ${
                      active
                        ? "text-white font-medium"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`h-[1.5px] transition-all ${
                        active ? "w-4 bg-[#F5B83D]" : "w-2 bg-white/25"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stacked Full-Width Editorial Project Cards (Matches frame_010.jpg & frame_011.jpg) */}
          <div className="space-y-16 sm:space-y-24">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveCaseStudy(project)}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-6 items-start cursor-pointer"
              >
                {/* Left Column: Date Stamp (Matches "Jul 22 / 2025" in download (2).avif) */}
                <div className="lg:col-span-2 pt-2">
                  <div className="font-display text-base sm:text-lg font-medium text-white pb-2 border-b border-white/25">
                    {project.dateLabel.split(" ")[0]}
                  </div>
                  <div className="font-mono-tech text-[11px] text-white/45 mt-2">
                    {project.year} · {project.badge}
                  </div>
                </div>

                {/* Center Column: Large Interactive Artwork Showcase */}
                <div className="lg:col-span-9 relative overflow-hidden border border-white/15 group-hover:border-[#F5B83D]/60 transition-colors">
                  <ProjectArtwork projectId={project.id} variant="hero" />

                  {/* Bottom Title Overlay Bar inside Project Card */}
                  <div className="bg-[#07090D]/95 backdrop-blur-md border-t border-white/12 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-white group-hover:text-[#F5B83D] transition-colors">
                          {project.title}
                        </h3>
                        <span className="font-mono-tech text-[10px] px-2 py-0.5 border border-white/15 text-white/70">
                          {project.badge}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#07090D] text-xs font-medium group-hover:bg-[#F5B83D] transition-colors">
                      <span>Open Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Right Column: Pod Avatars (Matches right avatar stack in download (2).avif) */}
                <div className="lg:col-span-1 hidden lg:flex flex-col items-center gap-2 pt-4">
                  {TEAM_MEMBERS.slice(0, 3).map((m) => (
                    <TeamAvatar
                      key={m.id}
                      initials={m.initials}
                      name={m.name}
                      tone={m.tone}
                      size="xs"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom "All Projects •→" bar (Matches pricing_03.jpg) */}
          <div className="mt-16 pt-10 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono-tech text-xs text-white/50">++</span>
            <button
              onClick={() => openContactWith("Custom Project Walkthrough Request")}
              className="inline-flex items-center gap-6 bg-[#F4F3EE] text-[#07090D] pl-6 pr-4 py-2.5 rounded-full text-xs font-semibold hover:bg-[#F5B83D] transition-colors cursor-pointer"
            >
              <span>Request a Custom Prototype or Audit</span>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-black/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 05: ORBITAL PRICING & CONFIGURATOR (Dark Cosmic Surface)
          Matches pfast_01.jpg–pfast_12.jpg
      ===================================================================== */}
      <section
        id="pricing"
        className="cosmos-surface starfield-overlay text-[#F4F3EE] py-24 sm:py-32 border-t border-white/10 relative overflow-hidden"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10">
          {/* Monumental "Pricing" Heading + Currency & Package Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="font-display text-[clamp(3.4rem,8vw,7.2rem)] font-semibold tracking-[-0.045em] text-white leading-none">
                Pricing
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-white/65 max-w-md">
                Transparent 3-tier packages with fixed scope in writing. 50% upfront and 50% on delivery (or 40% / 30% / 30% milestones over $3,000).
              </p>
            </div>

            {/* Interactive Currency Toggle (USD ↔ BDT) */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center p-1 rounded-full bg-white/[0.05] border border-white/15 text-xs">
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-4 py-1.5 rounded-full font-mono-tech text-[11px] transition-colors cursor-pointer ${
                    currency === "USD"
                      ? "bg-[#F4F3EE] text-[#07090D] font-semibold"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  USD ($) · INTL
                </button>
                <button
                  onClick={() => setCurrency("BDT")}
                  className={`px-4 py-1.5 rounded-full font-mono-tech text-[11px] transition-colors cursor-pointer ${
                    currency === "BDT"
                      ? "bg-[#F5B83D] text-[#07090D] font-semibold"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  BDT (৳) · BANGLADESH
                </button>
              </div>
            </div>
          </div>

          {/* Package Selector Tabs + 3-Tier Switcher */}
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/12">
            <div className="flex flex-wrap gap-2">
              {PRICING_PACKAGES.map((pkg) => {
                const active = pkg.id === selectedPkgId;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      active
                        ? "bg-white text-[#07090D] border-white"
                        : "bg-white/[0.03] text-white/70 border-white/15 hover:border-white/35"
                    }`}
                  >
                    {pkg.name}
                  </button>
                );
              })}
            </div>

            <div className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/12 p-1 rounded-full">
              {currentPackage.tiers.map((t, idx) => (
                <button
                  key={t.tierName}
                  onClick={() => setSelectedTierIdx(idx)}
                  className={`px-3.5 py-1 rounded-full text-[11px] font-mono-tech transition-colors cursor-pointer ${
                    selectedTierIdx === idx
                      ? "bg-[#F5B83D] text-[#07090D] font-semibold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {t.tierName}
                </button>
              ))}
            </div>
          </div>

          {/* ORBITAL ROW /01: PER PROJECT (Matches pfast_06.jpg & pfast_07.jpg) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-10 border-b border-white/12">
            <div className="lg:col-span-2 font-mono-tech text-xs text-white/50">
              ++
            </div>

            <div className="lg:col-span-10">
              <div className="flex items-center justify-between pb-3 border-b border-white/20">
                <span className="font-display text-lg font-medium text-white">
                  Per Project — {currentPackage.name} ({currentTier.tierName})
                </span>
                <span className="font-mono-tech text-xs text-white/50">/01</span>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Lunar Orbital Package Sphere + Price */}
                <div className="md:col-span-6 flex items-center gap-6">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#F4F3EE] via-[#D8D5CC] to-[#8C887E] text-[#07090D] p-5 flex flex-col justify-between overflow-hidden shrink-0 shadow-[0_0_50px_rgba(244,243,238,0.12)]">
                    <span className="text-[10px] font-mono-tech">+</span>
                    <div>
                      <div className="text-[9px] font-mono-tech uppercase tracking-wider text-black/60">
                        Fixed Scope
                      </div>
                      <div className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-none mt-0.5">
                        Qorv.
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-mono-tech text-[11px] text-[#F5B83D]">
                      {currentTier.subtitle}
                    </div>
                    <div className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-1">
                      {currency === "USD" ? currentTier.usd : currentTier.bdt}
                    </div>
                    <div className="text-xs text-white/50 mt-1">
                      50% upfront · 2 revision rounds · 30d support
                    </div>
                  </div>
                </div>

                {/* Right Deliverables + Delivery Time + CTA */}
                <div className="md:col-span-6 flex flex-col justify-between">
                  <ul className="space-y-2 text-xs sm:text-sm text-white/85">
                    {currentTier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#F5B83D] font-mono-tech">+</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-white/45">Delivery time:</div>
                      <div className="font-display text-sm font-medium text-white">
                        {currentPackage.timeline}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        openContactWith(
                          `${currentPackage.name} — ${currentTier.tierName} (${
                            currency === "USD" ? currentTier.usd : currentTier.bdt
                          })`
                        )
                      }
                      className="inline-flex items-center gap-6 px-5 py-2.5 rounded-full border border-white/25 text-xs font-medium text-white hover:bg-white hover:text-[#07090D] transition-colors cursor-pointer"
                    >
                      <span>Get in Touch</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B83D]" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ORBITAL ROW /02: MONTHLY GROWTH RETAINER (Matches pfast_08.jpg) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-12">
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between pb-3 border-b border-white/20">
                <span className="font-display text-lg font-medium text-white">
                  Monthly — Growth Retainer &amp; Care Plan
                </span>
                <span className="font-mono-tech text-xs text-white/50">/02</span>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6">
                  <ul className="space-y-2 text-xs sm:text-sm text-white/85">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#F5B83D] font-mono-tech">+</span>
                      <span>Ongoing website &amp; web app feature iterations</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#F5B83D] font-mono-tech">+</span>
                      <span>Social media visual templates, content &amp; ad creative</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#F5B83D] font-mono-tech">+</span>
                      <span>Uptime monitoring, backups, security &amp; SEO updates</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#F5B83D] font-mono-tech">+</span>
                      <span>Dedicated Friday updates &amp; monthly strategy report</span>
                    </li>
                  </ul>

                  <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-white/45">Delivery time:</div>
                      <div className="font-display text-sm font-medium text-white">
                        Ongoing Monthly (Pause or cancel anytime)
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        openContactWith("Monthly Growth Retainer / Care Plan")
                      }
                      className="inline-flex items-center gap-6 px-5 py-2.5 rounded-full border border-white/25 text-xs font-medium text-white hover:bg-white hover:text-[#07090D] transition-colors cursor-pointer"
                    >
                      <span>Get in Touch</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B83D]" />
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right Dark Orbital Sphere + Retainer Price */}
                <div className="md:col-span-6 flex items-center gap-6">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#2B313D] via-[#161B26] to-[#0B0E14] border border-white/20 text-white p-5 flex flex-col justify-between overflow-hidden shrink-0">
                    <span className="text-[10px] font-mono-tech text-[#F5B83D]">+</span>
                    <div>
                      <div className="text-[9px] font-mono-tech uppercase tracking-wider text-white/50">
                        Retainer
                      </div>
                      <div className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-none mt-0.5">
                        Qorv.
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-mono-tech text-[11px] text-white/55">
                      Growth Retainer (or Care Plan from $100/mo)
                    </div>
                    <div className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-1">
                      {currency === "USD" ? "$500+" : "৳20,000+"}
                      <span className="text-base font-normal text-white/50">/mo</span>
                    </div>
                    <div className="text-xs text-white/50 mt-1">
                      Scales up to {currency === "USD" ? "$2,000/mo" : "৳60,000/mo"} for full growth pods
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right-side founder note (Matches pfast_11.jpg) */}
            <div className="lg:col-span-4 lg:pt-16">
              <div className="p-6 bg-white/[0.03] border border-white/10">
                <div className="text-[#F5B83D] text-xs mb-2">✦</div>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  Add copywriting, technical SEO, extra pages, campaign landing pages, or pitch decks — flexible add-ons scoped around your business goals.
                </p>
                <div className="mt-4 flex items-center gap-2.5 pt-3 border-t border-white/10">
                  <TeamAvatar
                    initials="RZ"
                    name="Ryan Zannah"
                    tone="from-[#F5B83D]/50 to-[#0B1020]"
                    size="xs"
                  />
                  <div className="text-[11px]">
                    <span className="font-medium text-white">Ryan Zannah</span>
                    <span className="text-white/50"> · Founder &amp; CEO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 06: THE METHOD & PRODUCT BENCHMARKS (Warm Paper #F4F3EE)
          Matches frame_014.jpg–frame_018.jpg layout with 100% real studio data
      ===================================================================== */}
      <section
        id="method"
        className="paper-surface text-[#0B1020] py-24 sm:py-32 border-t border-black/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10">
          {/* Monumental Heading */}
          <div className="lg:pl-[25%] mb-16">
            <h2 className="font-display text-[clamp(3.2rem,7.5vw,6.8rem)] font-semibold tracking-[-0.045em] text-[#0B1020] leading-none">
              The Method
            </h2>
            <div className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-[#0B1020]">
              7-Step Delivery
            </div>
          </div>

          {/* 3-Column Studio Principles Switcher (Matches frame_014.jpg / pricing_09.jpg) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-black/12">
            {[
              {
                person: "Ryan Zannah",
                role: "Founder & CEO, QORVAYN",
                initials: "RZ",
                title: "Strategy before a single line of code",
                body: "Every engagement starts with a free 15–30 minute discovery call and a written 3-tier proposal within 24 hours. We align on your users, revenue goals, and exact deliverables before we build.",
              },
              {
                person: "Shoyetur Rahman Sayel",
                role: "Lead Software Engineer",
                initials: "SS",
                title: "Production Next.js & Supabase craft",
                body: "We engineer client websites and web apps with the exact stack behind Orbyn — Next.js 15, React 19, strict TypeScript, and Supabase — with weekly Friday progress updates.",
              },
              {
                person: "Adelia Maharani",
                role: "Co-Founder & Creative Director",
                initials: "AM",
                title: "One team from brand to launch + 30d care",
                body: "Instead of juggling disconnected freelancers, you get one pod for brand identity, UI/UX, and code — backed by a full launch checklist and 30 days of included post-launch support.",
              },
            ].map((item, idx) => {
              const active = activeMethodQuoteIdx === idx;
              return (
                <div
                  key={item.person}
                  onClick={() => setActiveMethodQuoteIdx(idx)}
                  className={`p-6 border transition-all cursor-pointer ${
                    active
                      ? "bg-white border-black/25 shadow-sm"
                      : "bg-black/[0.02] border-black/10 opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <TeamAvatar
                      initials={item.initials}
                      name={item.person}
                      size="sm"
                      active={active}
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#0B1020]">
                        {item.person}
                      </div>
                      <div className="text-[11px] text-black/55">{item.role}</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono-tech text-[#B45F06] mb-1.5">
                    0{idx + 1} / PRINCIPLE
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0B1020] leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-black/70 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 3 Architectural Visual Charts Row (Matches frame_017.jpg 1:1) */}
          <div className="py-16 grid grid-cols-1 lg:grid-cols-3 gap-10 border-b border-black/12">
            {/* Chart 1: Capabilities by Discipline (Donut chart) */}
            <div>
              <div className="text-xs font-semibold text-[#0B1020] pb-3 border-b border-black/20">
                Capabilities by Discipline
              </div>
              <div className="mt-6 flex items-center gap-8">
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#E2E0D8"
                      strokeWidth="4.5"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#0B1020"
                      strokeWidth="4.5"
                      strokeDasharray="62 100"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#F5B83D"
                      strokeWidth="4.5"
                      strokeDasharray="24 100"
                      strokeDashoffset="-62"
                    />
                  </svg>
                  <span className="absolute font-display text-xl font-bold text-[#0B1020]">
                    06
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0B1020]" />
                    <span className="font-medium text-[#0B1020]">Web Apps &amp; Sites</span>
                    <span className="text-black/45">Next.js / Supabase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F5B83D]" />
                    <span className="font-medium text-[#0B1020]">Brand Identity</span>
                    <span className="text-black/45">Logo &amp; Systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-black/40" />
                    <span className="font-medium text-[#0B1020]">UI/UX &amp; E-Com</span>
                    <span className="text-black/45">Figma &amp; Stores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-black/20" />
                    <span className="font-medium text-[#0B1020]">AI Automation</span>
                    <span className="text-black/45">Workflows</span>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-[11px] text-black/55">
                Core studio packages spanning brand systems, Figma UI/UX, and full-stack Next.js engineering.
              </p>
            </div>

            {/* Chart 2: Delivery Cadence (Vertical bar chart matching frame_017.jpg) */}
            <div>
              <div className="text-xs font-semibold text-[#0B1020] pb-3 border-b border-black/20">
                5-Phase Delivery Cadence
              </div>
              <div className="mt-6 h-28 flex items-end gap-3 pt-4">
                {[
                  { step: "Call", val: "30m", h: "h-10", dark: true },
                  { step: "Scope", val: "24h", h: "h-14", dark: false },
                  { step: "Design", val: "Wk 1", h: "h-20", dark: false },
                  { step: "Build", val: "Wk 2+", h: "h-24", dark: false },
                  { step: "Care", val: "30d", h: "h-28", dark: true },
                ].map((bar) => (
                  <div key={bar.step} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full ${bar.h} ${
                        bar.dark
                          ? "bg-[#0B1020] text-white"
                          : "bg-black/20 text-[#0B1020]"
                      } flex items-start justify-center pt-1.5 text-[10px] font-mono-tech font-medium`}
                    >
                      {bar.val}
                    </div>
                    <span className="text-[10px] font-mono-tech text-black/60 mt-1.5">
                      {bar.step}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[11px] text-black/55">
                Structured weekly milestones with Friday demos and 30 days of post-launch engineering care.
              </p>
            </div>

            {/* Chart 3: Studio Pod Allocation (Dot matrix matching frame_017.jpg) */}
            <div>
              <div className="text-xs font-semibold text-[#0B1020] pb-3 border-b border-black/20">
                People Making a Project
              </div>
              <div className="mt-6 flex items-center gap-6">
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < 6
                          ? "bg-[#0B1020]"
                          : i < 9
                          ? "bg-[#F5B83D]"
                          : "bg-black/15"
                      }`}
                    />
                  ))}
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0B1020]" />
                    <span className="text-[#0B1020] font-medium">Core Studio Pod (3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F5B83D]" />
                    <span className="text-black/65">QORVAYN Specialists (3)</span>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-[11px] text-black/55">
                Every project has a dedicated lead plus brand, UI/UX, and full-stack Next.js specialists.
              </p>
            </div>
          </div>

          {/* "Built by Us: Product Benchmarks" (Matches "User cases:" in frame_018.jpg) */}
          <div className="pt-16">
            <div className="lg:pl-[33%] mb-12">
              <h3 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#0B1020]">
                Product proof:
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  mark: "ORBYN®",
                  num: "06",
                  sup: "+",
                  metricLabel:
                    "Real-time modules shipped in live beta on Next.js 15 & Supabase",
                  lead: "Ryan Zannah",
                  role: "Founder & Product Lead",
                  initials: "RZ",
                  note: "Live presence, daily reflection, voice notes, shared memories, AI date planner, and an on-device background-removal Photobooth.",
                },
                {
                  mark: "SNOWVAYN®",
                  num: "02",
                  sup: "×",
                  metricLabel:
                    "Seasonal brand & storefront engines (SnowVayn Winter / SunVayn Summer)",
                  lead: "Shoyetur Rahman Sayel",
                  role: "Lead Software Engineer",
                  initials: "SS",
                  note: "Tokenized e-commerce architecture that switches visual identity and merchandising automatically between winter and summer.",
                },
                {
                  mark: "CONTINUUM®",
                  num: "30",
                  sup: "d",
                  metricLabel:
                    "Post-launch engineering support & launch checklist on every client build",
                  lead: "Adelia Maharani",
                  role: "Co-Founder & Creative Director",
                  initials: "AM",
                  note: "Every brand, website, and web app ships with full asset handover, 2 revision rounds, and 30 days of included support.",
                },
              ].map((item) => (
                <div key={item.mark} className="flex flex-col justify-between">
                  <div>
                    <div className="font-mono-tech text-xs font-semibold text-black/55 pb-3 border-b border-black/20">
                      {item.mark}
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div className="font-display text-5xl sm:text-6xl font-semibold text-[#0B1020] leading-none">
                        {item.num}
                        <sup className="text-2xl ml-0.5 text-[#B45F06]">
                          {item.sup}
                        </sup>
                      </div>
                      <p className="text-xs text-black/65 max-w-[180px] leading-relaxed">
                        {item.metricLabel}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/10">
                    <div className="flex items-center gap-2.5 mb-2">
                      <TeamAvatar
                        initials={item.initials}
                        name={item.lead}
                        size="xs"
                      />
                      <div className="text-[11px]">
                        <div className="font-semibold text-[#0B1020]">
                          {item.lead}
                        </div>
                        <div className="text-black/50">{item.role}</div>
                      </div>
                    </div>
                    <p className="text-xs text-black/65 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 07: TEAM ORBITAL CAROUSEL (Dark Cosmic Surface #07090D)
          Matches download (1).avif & frame_024.jpg–frame_026.jpg 1:1
      ===================================================================== */}
      <section
        id="team"
        className="cosmos-surface starfield-overlay text-[#F4F3EE] py-24 sm:py-36 border-t border-white/10 relative overflow-hidden"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10">
          {/* Monumental "Team" Heading */}
          <div className="lg:pl-[38%] mb-14 sm:mb-20">
            <h2 className="font-display text-[clamp(3.4rem,8vw,7.2rem)] font-semibold tracking-[-0.045em] text-white leading-none">
              Team
            </h2>
          </div>

          {/* Active Member Name & Role above Orbital Line */}
          <div className="lg:pl-[38%] mb-6">
            <div className="font-display text-lg sm:text-xl font-medium text-white">
              {activeMember.name}
            </div>
            <div className="w-8 h-[1px] bg-white/35 my-2" />
            <div className="text-xs text-white/60">
              {activeMember.role} · {activeMember.division}
            </div>
          </div>

          {/* Horizontal Orbital Selector Bar (• Prev.  ... avatars ...  Next •) */}
          <div className="relative flex items-center justify-between gap-4 py-6">
            {/* Subtle horizontal orbital equator line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-16 right-16 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />

            {/* Left Prev Button */}
            <button
              onClick={() =>
                setActiveTeamIdx((prev) =>
                  prev === 0 ? TEAM_MEMBERS.length - 1 : prev - 1
                )
              }
              className="relative z-10 inline-flex items-center gap-2 text-xs text-white/75 hover:text-[#F5B83D] transition-colors cursor-pointer shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>Prev.</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Center Orbital Portraits */}
            <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-8 md:gap-10 overflow-x-auto py-4 px-2">
              {TEAM_MEMBERS.map((member, idx) => {
                const isCenter = idx === activeTeamIdx;
                return (
                  <button
                    key={member.id}
                    onClick={() => setActiveTeamIdx(idx)}
                    className={`transition-all duration-500 cursor-pointer shrink-0 ${
                      isCenter
                        ? "scale-100 opacity-100"
                        : "scale-75 sm:scale-90 opacity-50 hover:opacity-85"
                    }`}
                  >
                    <TeamAvatar
                      initials={member.initials}
                      name={member.name}
                      tone={member.tone}
                      size={isCenter ? "xl" : "md"}
                      active={isCenter}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Next Button */}
            <button
              onClick={() =>
                setActiveTeamIdx((prev) =>
                  prev === TEAM_MEMBERS.length - 1 ? 0 : prev + 1
                )
              }
              className="relative z-10 inline-flex items-center gap-2 text-xs text-white/75 hover:text-[#F5B83D] transition-colors cursor-pointer shrink-0"
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Next</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </button>
          </div>

          {/* Quote Block below Active Team Portrait (Matches download (1).avif) */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 flex lg:justify-end pr-8 pt-4">
              <CelestialCross className="w-3.5 h-3.5 text-white/70" />
            </div>
            <div className="lg:col-span-7 max-w-md">
              <div className="font-display text-4xl text-white/40 leading-none select-none">
                &rdquo;
              </div>
              <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                {activeMember.quote}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeMember.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="font-mono-tech text-[10px] px-2.5 py-1 border border-white/12 text-white/60"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 08: INSIGHTS / STUDIO NOTES (Warm Paper #F4F3EE)
          Matches frame_027.jpg & ifast_03.jpg–ifast_06.jpg
      ===================================================================== */}
      <section
        id="insights"
        className="paper-surface text-[#0B1020] py-24 sm:py-32 border-t border-black/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10">
          {/* Monumental "Insights" Heading + Founder Intro */}
          <div className="lg:pl-[33%] mb-16 sm:mb-20">
            <h2 className="font-display text-[clamp(3.2rem,7.5vw,6.8rem)] font-semibold tracking-[-0.045em] text-[#0B1020] leading-none">
              Insights
            </h2>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12">
              <div className="flex items-center gap-3 shrink-0">
                <TeamAvatar
                  initials="RZ"
                  name="Ryan Zannah"
                  tone="from-[#F5B83D]/50 to-[#0B1020]"
                  size="sm"
                />
                <div className="text-xs">
                  <div className="font-semibold text-[#0B1020]">Ryan Zannah</div>
                  <div className="text-black/55">Founder &amp; CEO</div>
                </div>
              </div>

              <p className="font-display text-lg sm:text-xl font-medium text-[#0B1020] max-w-md leading-snug">
                We write openly about how we design, architect, and ship digital products at QORVAYN —{" "}
                <span className="text-black/55">
                  practical engineering and brand notes for founders.
                </span>
              </p>
            </div>
          </div>

          {/* 3 Circular-Aperture Article Columns (Matches ifast_05.jpg & ifast_06.jpg) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {INSIGHTS_LIST.map((article, idx) => {
              const gradients = [
                "from-[#0B1020] via-[#1E293B] to-[#F5B83D]",
                "from-[#0F172A] via-[#0284C7] to-[#38BDF8]",
                "from-[#1C1917] via-[#B45F06] to-[#F5B83D]",
              ];
              return (
                <article
                  key={article.id}
                  onClick={() => setActiveInsight(article)}
                  className="group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Circular Aperture Thumbnail */}
                    <div className="mb-6 flex items-center justify-center md:justify-start">
                      <div
                        className={`w-24 h-24 rounded-full bg-gradient-to-tr ${gradients[idx % 3]} p-4 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}
                      >
                        <ContinuumMark
                          className="w-8 h-8"
                          strokeColor="#FFFFFF"
                          accentColor="#F5B83D"
                        />
                      </div>
                    </div>

                    {/* Top 1px Rule + Date & Title */}
                    <div className="pt-5 border-t border-black/20 flex items-start justify-between gap-6">
                      <div className="flex items-baseline gap-1 shrink-0">
                        <span className="font-display text-2xl sm:text-3xl font-semibold text-[#0B1020]">
                          {article.day}
                        </span>
                        <span className="text-xs text-black/55">
                          {article.month}
                        </span>
                      </div>

                      <div>
                        <div className="font-mono-tech text-[10px] text-[#B45F06] mb-1">
                          {article.category} · {article.readTime}
                        </div>
                        <h3 className="font-display text-base sm:text-lg font-semibold text-[#0B1020] group-hover:text-[#B45F06] transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="mt-2 text-xs text-black/65 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0B1020] group-hover:text-[#B45F06]">
                      <span>Read Article</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom "All Insights •→" bar (Matches ifast_11.jpg) */}
          <div className="mt-16 pt-8 border-t border-black/10 flex items-center justify-between">
            <span className="font-mono-tech text-xs text-black/50">++</span>
            <button
              onClick={() => setActiveInsight(INSIGHTS_LIST[0])}
              className="inline-flex items-center gap-6 bg-[#0B1020] text-[#F4F3EE] pl-6 pr-4 py-2.5 rounded-full text-xs font-medium hover:bg-[#1E293B] transition-colors cursor-pointer"
            >
              <span>All Insights</span>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B83D]" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 09: FAQ ACCORDION (Warm Paper #F4F3EE)
          Matches frame_028.jpg, frame_031.jpg & ifast_09.jpg–ifast_14.jpg
      ===================================================================== */}
      <section
        id="faq"
        className="paper-surface text-[#0B1020] py-20 sm:py-28 border-t border-black/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Founder Note */}
            <div className="lg:col-span-4 lg:pt-24">
              <TeamAvatar
                initials="RZ"
                name="Ryan Zannah"
                tone="from-[#F5B83D]/50 to-[#0B1020]"
                size="sm"
              />
              <div className="mt-3 text-xs font-semibold text-[#0B1020]">
                Ryan Zannah
              </div>
              <div className="text-[11px] text-black/50">Founder &amp; CEO</div>
              <p className="mt-4 text-xs sm:text-sm text-black/75 max-w-[230px] leading-relaxed">
                Behind every project: the product thinking and transparent milestones that fuel Qorvaynology&apos;s build process.
              </p>
            </div>

            {/* Right Column: Monumental "FAQ" Heading + 1px Hairline Accordion */}
            <div className="lg:col-span-8">
              <h2 className="font-display text-[clamp(3.2rem,7.5vw,6.8rem)] font-semibold tracking-[-0.045em] text-[#0B1020] leading-none mb-12">
                FAQ
              </h2>

              <div className="divide-y divide-black/15 border-t border-b border-black/15">
                {FAQ_ITEMS.map((faq) => {
                  const isOpen = !!openFaqIds[faq.id];
                  return (
                    <div key={faq.id} className="py-6">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between gap-6 text-left cursor-pointer group"
                      >
                        <span className="font-display text-base sm:text-lg font-semibold text-[#0B1020] group-hover:text-[#B45F06] transition-colors">
                          {faq.question}
                        </span>
                        <span className="text-black/60 group-hover:text-[#0B1020] shrink-0">
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="mt-3 text-xs sm:text-sm text-black/70 leading-relaxed max-w-2xl">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom "Didn't find the answer? Ask your Question •→" (Matches ifast_14.jpg) */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                <p className="text-xs font-medium text-[#0B1020]">
                  Didn&apos;t find the answer?
                  <br />
                  <span className="text-black/60">
                    Ask us about our services!
                  </span>
                </p>

                <button
                  onClick={() => openContactWith("Custom Question from FAQ")}
                  className="inline-flex items-center gap-6 bg-[#0B1020] text-[#F4F3EE] pl-6 pr-4 py-3 rounded-full text-xs font-medium hover:bg-[#1E293B] transition-colors cursor-pointer"
                >
                  <span>Ask your Question</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-white/50" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5B83D]" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10: COSMIC FOOTER & DIRECT BRIEF HUB (Dark Cosmic #07090D)
          Matches frame_032.jpg & ifast_15.jpg–ifast_16.jpg 1:1
      ===================================================================== */}
      <footer
        id="contact"
        className="cosmos-surface starfield-overlay text-[#F4F3EE] pt-24 sm:pt-32 pb-12 border-t border-white/10"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-10">
          {/* Top Manifesto Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20 border-b border-white/12">
            <div className="lg:col-span-4">
              <CelestialCross className="w-5 h-5 text-white" />
            </div>

            <div className="lg:col-span-5">
              <p className="font-display text-xl sm:text-2xl font-medium text-white leading-snug">
                Qorvaynology creates brands, websites, and web apps that are{" "}
                <span className="text-white/60">
                  calm, fast, and built to last. We care about every detail and treat every project like our own — because it is.
                </span>
              </p>

              <div className="mt-6 flex items-center gap-3">
                <TeamAvatar
                  initials="RZ"
                  name="Ryan Zannah"
                  tone="from-[#F5B83D]/50 to-[#0B1020]"
                  size="sm"
                />
                <div className="text-xs">
                  <div className="font-semibold text-white">Ryan Zannah</div>
                  <div className="text-white/50">Founder &amp; CEO, QORVAYN</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex lg:justify-end">
              <div className="text-left lg:text-right">
                <div className="text-xs font-medium text-white">
                  Design &amp; Technology Studio
                </div>
                <div className="text-xs text-white/50 mt-0.5">
                  Kushtia &amp; Dhaka, Bangladesh
                </div>
              </div>
            </div>
          </div>

          {/* Middle 4-Column Architectural Grid (Matches frame_032.jpg) */}
          <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
            {/* Col 1: Phone, Email & Location */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-xs text-white/60">+880 1410-831205</div>
              <div>
                <a
                  href="mailto:qorvaynology@gmail.com"
                  className="font-display text-lg sm:text-xl font-medium text-white hover:text-[#F5B83D] transition-colors"
                >
                  qorvaynology@gmail.com
                </a>
              </div>
              <div className="pt-3 flex flex-wrap gap-2">
                <a
                  href="https://cal.com/qorvaynology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-xs text-[#F5B83D] hover:bg-white hover:text-black transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>cal.com/qorvaynology</span>
                </a>
                <a
                  href="https://linktr.ee/qorvaynology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/12 text-xs text-white/75 hover:text-white transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>linktr.ee/qorvaynology</span>
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="lg:col-span-2">
              <div className="text-[11px] font-mono-tech text-white/40 mb-4">
                Navigation
              </div>
              <ul className="space-y-2 text-sm sm:text-base font-display font-medium">
                <li>
                  <a href="#top" className="text-white/60 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#studio" className="text-white hover:text-[#F5B83D] transition-colors">
                    Studio
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-white hover:text-[#F5B83D] transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-white hover:text-[#F5B83D] transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-white hover:text-[#F5B83D] transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#insights" className="text-white hover:text-[#F5B83D] transition-colors">
                    Insights
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Verified Socials & Profiles */}
            <div className="lg:col-span-2">
              <div className="text-[11px] font-mono-tech text-white/40 mb-4">
                Profiles
              </div>
              <ul className="space-y-2 text-xs text-white/75">
                {VERIFIED_SOCIALS.slice(0, 8).map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#F5B83D] transition-colors inline-flex items-center gap-1"
                    >
                      <span>{s.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Quick Start Brief Form (Matches "Your name * / Email * / Subscribe" in frame_032.jpg) */}
            <div className="lg:col-span-4">
              <div className="text-[11px] font-mono-tech text-white/40 mb-4">
                Start a Conversation
              </div>
              {footerSent ? (
                <div className="p-4 border border-emerald-400/30 bg-emerald-500/10 text-xs text-emerald-200">
                  Email draft opened. You can also book directly at{" "}
                  <a
                    href="https://cal.com/qorvaynology"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-white"
                  >
                    cal.com/qorvaynology
                  </a>
                  .
                </div>
              ) : (
                <form onSubmit={handleFooterBrief} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={footerName}
                      onChange={(e) => setFooterName(e.target.value)}
                      placeholder="Your name *"
                      className="w-full bg-transparent border-b border-white/20 py-2.5 text-xs text-white placeholder:text-white/45 focus:outline-none focus:border-[#F5B83D]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      value={footerEmail}
                      onChange={(e) => setFooterEmail(e.target.value)}
                      placeholder="Email *"
                      className="w-full bg-transparent border-b border-white/20 py-2.5 text-xs text-white placeholder:text-white/45 focus:outline-none focus:border-[#F5B83D]"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-between gap-8 px-6 py-2.5 rounded-full border border-white/25 text-xs font-medium text-white hover:bg-white hover:text-[#07090D] transition-colors cursor-pointer min-w-[170px]"
                    >
                      <span>Start Brief</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B83D]" />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Monumental Footer Wordmark (Matches "Astra®" in frame_032.jpg) */}
          <div className="pt-10 pb-12 border-t border-white/10 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-start select-none">
              <span className="font-display font-semibold text-white text-[clamp(3rem,9vw,8.5rem)] leading-none tracking-[-0.045em]">
                Qorvaynolog<span className="text-[#F5B83D]">y</span>
              </span>
              <span className="ml-1.5 mt-1 sm:mt-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/40 text-white font-display text-xs sm:text-sm flex items-center justify-center">
                ®
              </span>
            </div>
          </div>

          {/* Bottom Copyright & Attribution Bar */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-4 gap-4 text-[11px] text-white/45">
            <div>
              <div>© 2026</div>
              <div className="text-white/75">Qorvaynology Studio</div>
            </div>
            <div>
              <div>Parent Ecosystem</div>
              <div className="text-white/75">QORVAYN (Est. 10 Mar 2026)</div>
            </div>
            <div>
              <div>Stack</div>
              <div className="text-white/75">Next.js 15 · React 19 · TypeScript</div>
            </div>
            <div className="sm:text-right">
              <div>Location</div>
              <div className="text-white/75">Kushtia &amp; Dhaka, Bangladesh</div>
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
