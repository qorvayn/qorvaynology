"use client";

import React, { useState } from "react";
import { ContinuumMark } from "./ContinuumMark";

export function ProjectArtwork({
  projectId,
  variant = "hero",
}: {
  projectId: string;
  variant?: "hero" | "detailA" | "detailB";
}) {
  const [season, setSeason] = useState<"winter" | "summer">("winter");

  if (projectId === "orbyn") {
    if (variant === "detailA") {
      return (
        <div className="relative w-full h-full min-h-[240px] bg-[#0B0F19] text-[#F4F3EE] p-6 flex flex-col justify-between overflow-hidden border border-black/10">
          <div className="flex items-center justify-between text-[11px] font-mono-tech text-white/50">
            <span>ORBYN / DAILY QUESTION</span>
            <span className="text-[#F5B83D]">SYNCED LIVE</span>
          </div>
          <div className="my-auto py-4">
            <p className="text-xs uppercase tracking-widest text-white/45 mb-2">
              Prompt #142 · Dhaka ↔ Toronto
            </p>
            <p className="font-display text-lg md:text-xl font-medium text-white leading-snug">
              &ldquo;What small moment from this week do you wish we could have shared in person?&rdquo;
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-white/[0.05] border border-white/10">
                <div className="text-[10px] font-mono-tech text-[#F5B83D]">PARTNER A · 11:42 PM</div>
                <p className="text-xs text-white/80 mt-1">Late rain over Dhanmondi lake with a cup of cha.</p>
              </div>
              <div className="p-3 bg-white/[0.05] border border-white/10">
                <div className="text-[10px] font-mono-tech text-sky-400">PARTNER B · 1:42 PM</div>
                <p className="text-xs text-white/80 mt-1">First snowfall outside the studio window.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-white/40 border-t border-white/10 pt-3">
            <span>SUPABASE REALTIME CHANNEL</span>
            <span>RLS ISOLATED</span>
          </div>
        </div>
      );
    }

    if (variant === "detailB") {
      return (
        <div className="relative w-full h-full min-h-[240px] bg-[#111827] text-[#F4F3EE] p-6 flex flex-col justify-between overflow-hidden border border-black/10">
          <div className="flex items-center justify-between text-[11px] font-mono-tech text-white/50">
            <span>TWO-PERSON PHOTOBOOTH</span>
            <span className="text-emerald-400">ON-DEVICE AI SEGMENTATION</span>
          </div>
          <div className="my-auto grid grid-cols-2 gap-3 py-4">
            <div className="aspect-[4/3] bg-gradient-to-br from-[#F5B83D]/25 to-[#0B0F19] border border-white/15 p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono-tech text-white/60">CAM 01 · KUSHTIA</span>
              <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 mx-auto" />
              <span className="text-[10px] text-emerald-300 font-mono-tech">BG REMOVED · 14ms</span>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-bl from-sky-500/25 to-[#0B0F19] border border-white/15 p-3 flex flex-col justify-between">
              <span className="text-[10px] font-mono-tech text-white/60">CAM 02 · LONDON</span>
              <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 mx-auto" />
              <span className="text-[10px] text-sky-300 font-mono-tech">COMPOSITED FRAME</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-white/40 border-t border-white/10 pt-3">
            <span>ZERO SERVER GPU QUEUE</span>
            <span>WEBGL + WASM</span>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full min-h-[360px] md:min-h-[480px] bg-[#090D16] text-white p-6 md:p-10 flex flex-col justify-between overflow-hidden">
        {/* Ambient orbital glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F5B83D]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-500/12 blur-3xl pointer-events-none" />

        {/* Top bar inside artwork */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-mono-tech text-[11px] text-white/75">
              ORBYN · LIVE BETA INTERFACE
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono-tech text-[11px] text-white/50">
            <span>NEXT.JS 15</span>
            <span>REACT 19</span>
            <span>SUPABASE REALTIME</span>
          </div>
        </div>

        {/* Center simulated Orbyn app workspace */}
        <div className="relative z-10 my-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7 bg-white/[0.04] border border-white/12 p-5 md:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[10px] text-[#F5B83D]">
                SHARED ROOM · 2 PRESENT NOW
              </span>
              <span className="font-mono-tech text-[10px] text-white/45">
                LATENCY 28ms
              </span>
            </div>
            <div className="my-6">
              <div className="text-xs text-white/50 mb-1">Today in your shared space</div>
              <div className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Two cities, one quiet room.
              </div>
              <p className="text-xs md:text-sm text-white/65 mt-2 leading-relaxed">
                Live presence, synchronized daily reflection, voice notes, shared memory vault, and an on-device two-person photobooth.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-[11px]">
              <div>
                <div className="text-white/40 font-mono-tech text-[10px]">PRESENCE</div>
                <div className="text-white font-medium mt-0.5">Both Online</div>
              </div>
              <div>
                <div className="text-white/40 font-mono-tech text-[10px]">VOICE NOTE</div>
                <div className="text-[#F5B83D] font-medium mt-0.5">00:42 Recorded</div>
              </div>
              <div>
                <div className="text-white/40 font-mono-tech text-[10px]">DATE PLANNER</div>
                <div className="text-white font-medium mt-0.5">Friday 8:00 PM</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex-1 bg-white/[0.04] border border-white/12 p-5 flex flex-col justify-between">
              <div className="font-mono-tech text-[10px] text-sky-300">
                LIVE TWO-PERSON PHOTOBOOTH
              </div>
              <div className="my-3 flex items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#F5B83D]/20 border border-[#F5B83D]/50 flex items-center justify-center font-display text-sm font-semibold">
                  A
                </div>
                <div className="w-6 h-[1px] bg-white/30" />
                <div className="w-14 h-14 rounded-full bg-sky-400/20 border border-sky-400/50 flex items-center justify-center font-display text-sm font-semibold">
                  B
                </div>
              </div>
              <div className="text-[11px] text-white/60 text-center">
                On-device background removal merges both camera feeds in real time.
              </div>
            </div>
            <div className="bg-[#F5B83D]/10 border border-[#F5B83D]/30 p-4 flex items-center justify-between">
              <div>
                <div className="font-mono-tech text-[10px] text-[#F5B83D]">BUILT BY QORVAYN</div>
                <div className="text-xs text-white/85 mt-0.5">Production Consumer Web App</div>
              </div>
              <ContinuumMark className="w-6 h-6" strokeColor="#FFFFFF" accentColor="#F5B83D" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech text-white/45 pt-2">
          <span>01 / ORBYN CASE STUDY</span>
          <span>VERCEL EDGE + SUPABASE RLS</span>
        </div>
      </div>
    );
  }

  if (projectId === "snowvayn-sunvayn") {
    const isWinter = season === "winter";
    return (
      <div
        className={`relative w-full h-full min-h-[360px] md:min-h-[480px] p-6 md:p-10 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
          isWinter
            ? "bg-[#0D131F] text-[#F4F3EE]"
            : "bg-[#F3EFE6] text-[#0B1020]"
        }`}
      >
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-current/15 pb-4">
          <div className="font-mono-tech text-[11px] opacity-75">
            {isWinter
              ? "SNOWVAYN · WINTER ARCHIVE MODE"
              : "SUNVAYN · SUMMER SOLAR MODE"}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSeason(isWinter ? "summer" : "winter");
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-current/25 text-[11px] font-mono-tech cursor-pointer hover:border-[#F5B83D] transition-colors"
          >
            <span>SWITCH SEASON THEME:</span>
            <span className="font-semibold underline">
              {isWinter ? "WINTER → SUMMER" : "SUMMER → WINTER"}
            </span>
          </div>
        </div>

        <div className="relative z-10 my-auto py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <div className="font-mono-tech text-[10px] opacity-60 mb-2">
              AUTOMATIC SEASONAL STOREFRONT ENGINE
            </div>
            <div className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-none">
              {isWinter ? "SnowVayn®" : "SunVayn®"}
            </div>
            <p className="mt-3 text-sm opacity-75 max-w-md leading-relaxed">
              {isWinter
                ? "Heavyweight winter fleece, structured wool outerwear, and alpine slate surface tokens activated automatically during winter months."
                : "Breathable linen shirts, lightweight cotton silhouettes, and warm solar paper tokens activated automatically for summer."}
            </p>
          </div>
          <div className="md:col-span-5 border border-current/15 p-5">
            <div className="font-mono-tech text-[10px] opacity-60">ACTIVE DESIGN TOKENS</div>
            <div className="mt-3 space-y-2 text-xs font-mono-tech">
              <div className="flex justify-between">
                <span>SURFACE</span>
                <span>{isWinter ? "#0D131F (ALPINE)" : "#F3EFE6 (SOLAR LINEN)"}</span>
              </div>
              <div className="flex justify-between">
                <span>COLLECTION</span>
                <span>{isWinter ? "WINTER / AW26" : "SUMMER / SS27"}</span>
              </div>
              <div className="flex justify-between">
                <span>CHECKOUT</span>
                <span>BKASH + INTL CARDS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech opacity-55 pt-3 border-t border-current/15">
          <span>QORVAYN APPAREL DIVISION</span>
          <span>CLICK THEME SWITCH ABOVE TO PREVIEW</span>
        </div>
      </div>
    );
  }

  if (projectId === "qorvaynology-continuum") {
    return (
      <div className="relative w-full h-full min-h-[360px] md:min-h-[480px] bg-[#0B1020] text-[#F4F3EE] p-6 md:p-10 flex flex-col justify-between overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative z-10 flex items-center justify-between border-b border-white/12 pb-4 font-mono-tech text-[11px] text-white/60">
          <span>CONCEPT 02 / &ldquo;CONTINUUM&rdquo; GEOMETRY</span>
          <span className="text-[#F5B83D]">q → y UNBROKEN LINE</span>
        </div>

        <div className="relative z-10 my-auto py-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 md:w-36 md:h-36 border border-white/20 bg-[#07090D] flex items-center justify-center p-6">
              <ContinuumMark className="w-full h-full" strokeColor="#FFFFFF" accentColor="#F5B83D" />
            </div>
            <div>
              <div className="font-mono-tech text-[10px] text-[#F5B83D]">
                HAND-OFF STROKE (#F5B83D)
              </div>
              <div className="font-display text-3xl md:text-4xl font-semibold tracking-tight mt-1">
                qorvaynolog<span className="text-[#F5B83D]">y</span>
              </div>
              <p className="text-xs md:text-sm text-white/65 mt-2 max-w-sm">
                From first idea (q) to finished product (y) — one continuous line, one integrated studio team.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 w-full md:w-auto">
            <div className="p-3 bg-[#07090D] border border-white/15">
              <div className="w-5 h-5 bg-[#0B1020] border border-white/25 mb-2" />
              <div className="font-mono-tech text-[10px] text-white/80">NAVY #0B1020</div>
            </div>
            <div className="p-3 bg-[#07090D] border border-white/15">
              <div className="w-5 h-5 bg-[#F5B83D] mb-2" />
              <div className="font-mono-tech text-[10px] text-[#F5B83D]">GOLD #F5B83D</div>
            </div>
            <div className="p-3 bg-[#F4F3EE] text-[#0B1020] border border-white/15">
              <div className="w-5 h-5 bg-[#F4F3EE] border border-black/25 mb-2" />
              <div className="font-mono-tech text-[10px]">PAPER #F4F3EE</div>
            </div>
            <div className="p-3 bg-[#07090D] border border-white/15">
              <div className="w-5 h-5 bg-[#EEF1F8] mb-2" />
              <div className="font-mono-tech text-[10px] text-white/80">MIST #EEF1F8</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech text-white/45 pt-3 border-t border-white/12">
          <span>27 PRODUCTION LOGO ASSETS</span>
          <span>SVG · PNG · JPG · PDF</span>
        </div>
      </div>
    );
  }

  if (projectId === "aether-clinic-concept") {
    return (
      <div className="relative w-full h-full min-h-[360px] md:min-h-[480px] bg-[#0B1517] text-[#F4F3EE] p-6 md:p-10 flex flex-col justify-between overflow-hidden">
        <div className="relative z-10 flex items-center justify-between border-b border-white/12 pb-4 font-mono-tech text-[11px]">
          <span className="text-emerald-300">CONCEPT SHOWCASE · HEALTHCARE UX</span>
          <span className="px-2 py-0.5 bg-white/10 text-white/80">LABELED CONCEPT</span>
        </div>

        <div className="relative z-10 my-auto py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/[0.04] border border-white/12 p-5">
            <div className="font-mono-tech text-[10px] text-emerald-300">STEP 01 / DEPARTMENT</div>
            <div className="font-display text-lg font-medium mt-2">Select Specialty</div>
            <p className="text-xs text-white/60 mt-1">Cardiology, Pediatrics, Orthopedics & Diagnostics in one tap.</p>
          </div>
          <div className="bg-white/[0.04] border border-white/12 p-5">
            <div className="font-mono-tech text-[10px] text-emerald-300">STEP 02 / LIVE SLOT</div>
            <div className="font-display text-lg font-medium mt-2">Real-Time Doctor Schedule</div>
            <p className="text-xs text-white/60 mt-1">Instant evening & morning chamber slots without calling reception.</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-400/30 p-5">
            <div className="font-mono-tech text-[10px] text-emerald-300">STEP 03 / CONFIRMATION</div>
            <div className="font-display text-lg font-medium mt-2">SMS & WhatsApp Serial</div>
            <p className="text-xs text-white/75 mt-1">Designed for Dhaka clinics to reduce phone queue drop-offs.</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech text-white/45 pt-3 border-t border-white/12">
          <span>SELF-INITIATED STUDIO CONCEPT</span>
          <span>DHAKA HEALTHCARE DIGITALIZATION</span>
        </div>
      </div>
    );
  }

  // Default: QORVAYN Parent Ecosystem
  return (
    <div className="relative w-full h-full min-h-[360px] md:min-h-[480px] bg-[#080B12] text-[#F4F3EE] p-6 md:p-10 flex flex-col justify-between overflow-hidden">
      <div className="relative z-10 flex items-center justify-between border-b border-white/12 pb-4 font-mono-tech text-[11px] text-white/60">
        <span>QORVAYN · PARENT TECHNOLOGY ECOSYSTEM</span>
        <span className="text-[#F5B83D]">FOUNDED 10 MARCH 2026</span>
      </div>

      <div className="relative z-10 my-auto py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-6">
          <div className="font-mono-tech text-[10px] text-[#F5B83D] mb-2">
            MULTI-PRODUCT VENTURE ARCHITECTURE
          </div>
          <div className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            QORVAYN
          </div>
          <p className="text-sm text-white/70 mt-3 max-w-md leading-relaxed">
            Founded in Bangladesh by Ryan Zannah with co-founders Adelia Maharani and Siyami Muntaha Saba. One technology company building consumer web apps, seasonal commerce, and client digital products.
          </p>
        </div>

        <div className="md:col-span-6 grid grid-cols-2 gap-3">
          <div className="p-4 bg-white/[0.04] border border-white/12">
            <div className="font-mono-tech text-[10px] text-[#F5B83D]">01 / CONSUMER APP</div>
            <div className="font-display text-base font-medium mt-1">Orbyn</div>
            <div className="text-xs text-white/55 mt-0.5">Couples Web App (Live Beta)</div>
          </div>
          <div className="p-4 bg-white/[0.04] border border-white/12">
            <div className="font-mono-tech text-[10px] text-sky-300">02 / COMMERCE</div>
            <div className="font-display text-base font-medium mt-1">SnowVayn / SunVayn</div>
            <div className="text-xs text-white/55 mt-0.5">Seasonal Apparel System</div>
          </div>
          <div className="p-4 bg-white/[0.04] border border-white/12">
            <div className="font-mono-tech text-[10px] text-emerald-300">03 / STUDIO</div>
            <div className="font-display text-base font-medium mt-1">Qorvaynology®</div>
            <div className="text-xs text-white/55 mt-0.5">Client Design & Tech Studio</div>
          </div>
          <div className="p-4 bg-white/[0.04] border border-white/12">
            <div className="font-mono-tech text-[10px] text-white/60">04 / METHOD</div>
            <div className="font-display text-base font-medium mt-1">30-Day Support</div>
            <div className="text-xs text-white/55 mt-0.5">Standard on Every Ship</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech text-white/45 pt-3 border-t border-white/12">
        <span>KUSHTIA & DHAKA, BANGLADESH</span>
        <span>REMOTE WORLDWIDE</span>
      </div>
    </div>
  );
}
