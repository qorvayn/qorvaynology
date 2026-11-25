"use client";

import React, { useState } from "react";
import { ContinuumMark } from "./ContinuumMark";

const PROJECT_VIDEOS: Record<string, string | null> = {
  orbyn: "/astra/proj-video-1.mp4",
  "qorvayn-ecosystem": "/astra/proj-video-3.mp4",
  "snowvayn-sunvayn": "/astra/proj-video-2.mp4",
  "qorvaynology-continuum": null,
  "aether-clinic-concept": null,
};

export function ProjectArtwork({
  projectId,
  variant = "hero",
}: {
  projectId: string;
  variant?: "hero" | "detailA" | "detailB";
}) {
  const [season, setSeason] = useState<"winter" | "summer">("winter");
  const videoSrc =
    projectId in PROJECT_VIDEOS ? PROJECT_VIDEOS[projectId] : "/astra/proj-video-1.mp4";

  if (variant === "detailA") {
    return (
      <div className="relative w-full h-full min-h-[250px] bg-[#070B16] text-white p-6 flex flex-col justify-between overflow-hidden rounded-[8px] border border-[#0B1020]/15">
        {videoSrc && (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#0B1020]/70 to-[#0B1020]/40" />
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech text-white/70">
          <span>SYSTEM ARCHITECTURE</span>
          <span className="text-[#60A5FA]">PRODUCTION SPEC</span>
        </div>
        <div className="relative z-10 my-auto py-4">
          <p className="text-xs uppercase tracking-widest text-white/55 mb-1.5">
            Core Engineering Layer
          </p>
          <p className="font-display text-lg md:text-xl font-semibold text-white leading-snug">
            Next.js 15 App Router + React 19 + Strict TypeScript
          </p>
          <p className="text-xs text-white/75 mt-2 leading-relaxed">
            Built with zero bloated page-builders, sub-second route transitions, and full source-code ownership upon delivery.
          </p>
        </div>
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono-tech text-white/50 border-t border-white/15 pt-3">
          <span>QORVAYNOLOGY POD</span>
          <span>VERCEL EDGE</span>
        </div>
      </div>
    );
  }

  if (variant === "detailB") {
    return (
      <div className="relative w-full h-full min-h-[250px] bg-[#0B1020] text-white p-6 flex flex-col justify-between overflow-hidden rounded-[8px] border border-[#0B1020]/15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(46,107,255,0.28),transparent_65%)]" />
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech text-white/70">
          <span>DESIGN &amp; HANDOVER</span>
          <span className="text-[#60A5FA]">30-DAY SUPPORT</span>
        </div>
        <div className="relative z-10 my-auto py-4 grid grid-cols-2 gap-3">
          <div className="p-3.5 bg-white/[0.06] border border-white/15 rounded-[6px]">
            <div className="text-[10px] font-mono-tech text-[#60A5FA]">FIGMA TOKENS</div>
            <div className="text-xs font-medium text-white mt-1">
              Dark Navy &amp; Crisp White Surface Polarity
            </div>
          </div>
          <div className="p-3.5 bg-white/[0.06] border border-white/15 rounded-[6px]">
            <div className="text-[10px] font-mono-tech text-[#60A5FA]">LAUNCH SLA</div>
            <div className="text-xs font-medium text-white mt-1">
              Full Checklist + 30 Days Included Care
            </div>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono-tech text-white/50 border-t border-white/15 pt-3">
          <span>KUSHTIA &amp; DHAKA, BD</span>
          <span>CONTINUUM STANDARD</span>
        </div>
      </div>
    );
  }

  // Main Hero Video Showcase Card matching Astra's 1091x622 rounded-[8px] Video Container
  return (
    <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[622px] rounded-[8px] overflow-hidden bg-[#050811] text-white select-none group border border-white/10">
      {/* Real Looping Showcase Video OR Bespoke Navy Architectural Backdrop */}
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-[1.01] group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div className="absolute inset-0 bg-[#060B18] flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(46,107,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(46,107,255,0.22) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute w-80 h-80 rounded-full bg-[#2E6BFF]/18 blur-3xl" />
          {projectId === "qorvaynology-continuum" ? (
            <div className="relative z-10 flex items-center gap-6 px-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-[#0B1020] border border-white/20 flex items-center justify-center p-6 shadow-2xl">
                <ContinuumMark className="w-full h-full" strokeColor="#FFFFFF" accentColor="#2E6BFF" />
              </div>
              <div className="text-left">
                <div className="font-mono-tech text-[10px] text-[#60A5FA]">
                  CONCEPT 02 / UNBROKEN LINE (q → y)
                </div>
                <div className="font-display text-3xl sm:text-5xl font-semibold tracking-tight mt-1">
                  qorvaynolog<span className="text-[#60A5FA]">y</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-2xl px-5 sm:px-6 w-full">
              {[
                { s: "01", t: "Department", d: "Specialty Finder" },
                { s: "02", t: "Live Schedule", d: "Instant Slots" },
                { s: "03", t: "WhatsApp / SMS", d: "Zero Call Queue" },
              ].map((card) => (
                <div key={card.s} className="p-3 sm:p-4 bg-[#0B1020]/90 border border-white/15 rounded-lg flex sm:block items-center justify-between gap-3">
                  <div className="font-mono-tech text-[10px] text-[#60A5FA]">STEP {card.s}</div>
                  <div className="font-display text-xs sm:text-base font-semibold sm:mt-1">{card.t}</div>
                  <div className="text-[11px] text-white/60 sm:mt-0.5">{card.d}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Navy Blue + Cosmic Black Cinema Gradient Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          projectId === "snowvayn-sunvayn" && season === "summer"
            ? "bg-gradient-to-t from-[#070B16]/90 via-[#1E3A8A]/35 to-[#070B16]/40"
            : "bg-gradient-to-t from-[#03050C]/90 via-[#0B1020]/45 to-[#03050C]/35"
        }`}
      />

      {/* Top Glassmorphic Telemetry Bar */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#050811]/70 backdrop-blur-md border border-white/15 text-[11px] font-mono-tech text-white/90">
          <span className="w-2 h-2 rounded-full bg-[#2E6BFF]" />
          <span>
            {projectId === "orbyn" && "ORBYN · LIVE BETA WEB APP"}
            {projectId === "qorvayn-ecosystem" && "QORVAYN · PARENT ECOSYSTEM"}
            {projectId === "snowvayn-sunvayn" &&
              (season === "winter"
                ? "SNOWVAYN · WINTER ARCHIVE"
                : "SUNVAYN · SUMMER SOLAR")}
            {projectId === "qorvaynology-continuum" &&
              "CONTINUUM · BRAND IDENTITY SYSTEM"}
            {projectId === "aether-clinic-concept" &&
              "AETHER DIAGNOSTICS · CONCEPT"}
          </span>
        </div>

        {projectId === "snowvayn-sunvayn" ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSeason(season === "winter" ? "summer" : "winter");
            }}
            className="px-3.5 py-1.5 rounded-full bg-[#2E6BFF] text-white text-[11px] font-mono-tech font-medium hover:bg-white hover:text-[#070B16] transition-colors cursor-pointer"
          >
            TOGGLE SEASON: {season === "winter" ? "WINTER → SUMMER" : "SUMMER → WINTER"}
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#050811]/60 backdrop-blur-md border border-white/15 text-[11px] font-mono-tech text-white/75">
            <ContinuumMark className="w-4 h-4" strokeColor="#FFFFFF" accentColor="#2E6BFF" />
            <span>QORVAYNOLOGY® CASE STUDY</span>
          </div>
        )}
      </div>

      {/* Center Interactive Cursor Pill on Video Cards */}
      {videoSrc && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050811]/75 backdrop-blur-md border border-white/25 text-xs font-medium text-white opacity-90 group-hover:scale-110 group-hover:border-[#2E6BFF] transition-all duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <span className="w-2 h-2 rounded-full bg-[#2E6BFF]" />
            <span className="ml-1">View Case Study</span>
          </div>
        </div>
      )}

      {/* Bottom Centered Project Title Overlay (Matches "Sonora Sport" / "Zima Beauty" at bottom center of Astra project cards) */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="hidden sm:block text-xs text-white/65 max-w-xs">
          {projectId === "orbyn" &&
            "Next.js 15, React 19, TypeScript & Supabase Realtime"}
          {projectId === "qorvayn-ecosystem" &&
            "Founded 10 March 2026 · Multi-Product Architecture"}
          {projectId === "snowvayn-sunvayn" &&
            "Automatic Winter / Summer Storefront Theme Engine"}
          {projectId === "qorvaynology-continuum" &&
            "27-File Production Identity & Monogram System"}
          {projectId === "aether-clinic-concept" &&
            "3-Step Patient Booking Flow (Labeled Concept)"}
        </div>

        <div className="sm:mx-auto text-center">
          <div className="font-display text-2xl sm:text-4xl font-semibold tracking-[-0.04em] text-white drop-shadow-md">
            {projectId === "orbyn" && "Orbyn"}
            {projectId === "qorvayn-ecosystem" && "QORVAYN®"}
            {projectId === "snowvayn-sunvayn" &&
              (season === "winter" ? "SnowVayn" : "SunVayn")}
            {projectId === "qorvaynology-continuum" && "Continuum"}
            {projectId === "aether-clinic-concept" && "Aether Clinic"}
          </div>
        </div>

        <div className="hidden sm:block text-right font-mono-tech text-[11px] text-white/65">
          CLICK TO OPEN DRAWER →
        </div>
      </div>
    </div>
  );
}
