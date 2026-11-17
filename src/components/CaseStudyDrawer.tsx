"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import { ProjectCaseStudy, TEAM_MEMBERS } from "@/data/studioData";
import { ProjectArtwork } from "./ProjectArtwork";
import { TeamAvatar } from "./ContinuumMark";

export function CaseStudyDrawer({
  project,
  onClose,
  onOpenContact,
}: {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onOpenContact: (prefillSubject?: string) => void;
}) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Editorial Warm Paper Slide-Over Sheet matching Astra's "Linx Auto" drawer */}
          <motion.div
            key={project.id}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34, mass: 0.9 }}
            className="relative w-full max-w-4xl h-full overflow-y-auto paper-surface text-[#0B1020] shadow-2xl border-l border-black/15 px-6 sm:px-10 md:px-14 py-8 md:py-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header Row: "See all Projects •→" + Team Avatars + Close */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-black/10">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2.5 text-xs font-medium text-[#0B1020] hover:text-[#2E6BFF] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>See all Projects</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0B1020]" />
              </button>

              <div className="flex items-center gap-5">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex -space-x-2">
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
                  <div className="text-[11px] leading-tight text-black/65">
                    <div className="font-medium text-[#0B1020]">Qorvaynology Pod</div>
                    <div>Core Product Team</div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close case study"
                  className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Monumental Project Title & Date */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 mb-8"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-mono-tech text-[11px] px-2.5 py-1 border border-black/15 bg-black/[0.03]">
                  {project.badge}
                </span>
                <span className="font-mono-tech text-[11px] text-black/55">
                  {project.dateLabel} · {project.category}
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-[#0B1020]">
                {project.title}
              </h2>
              <p className="mt-2 text-base sm:text-lg text-black/65">
                {project.subtitle}
              </p>
            </motion.div>

            {/* Main Hero Visual Canvas */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.16, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-full overflow-hidden border border-black/12"
            >
              <ProjectArtwork projectId={project.id} variant="hero" />
            </motion.div>

            {/* About + 1px Architectural Hairline Spec Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              <div className="md:col-span-4">
                <span className="font-mono-tech text-[11px] text-black/50">
                  About the Project:
                </span>
              </div>
              <div className="md:col-span-8">
                <p className="font-display text-lg sm:text-xl font-medium leading-relaxed text-[#0B1020]">
                  {project.summary}
                </p>

                {/* 1px Hairline Spec Table */}
                <div className="mt-8 divide-y divide-black/12 border-t border-b border-black/12 text-xs sm:text-sm">
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <span className="text-black/50">Year</span>
                    <span className="font-medium text-[#0B1020] text-right">{project.year}</span>
                  </div>
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <span className="text-black/50">Owner / Status</span>
                    <span className="font-medium text-[#0B1020] text-right">
                      {project.clientOrOwner}
                    </span>
                  </div>
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <span className="text-black/50">Services</span>
                    <span className="font-medium text-[#0B1020] text-right">{project.services}</span>
                  </div>
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <span className="text-black/50">Tech Stack</span>
                    <span className="font-mono-tech text-[11px] text-[#0B1020] text-right">
                      {project.stack}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenContact(`Project Inquiry — Inspired by ${project.title}`);
                    }}
                    className="inline-flex items-center gap-3 bg-[#0B1020] text-white px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[#1E293B] transition-colors cursor-pointer"
                  >
                    <span>Request a Similar Build</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2E6BFF]" />
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/20 text-xs font-medium text-[#0B1020] hover:border-black transition-colors"
                    >
                      <span>Book Live Walkthrough</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* 2-Column Detail Visuals */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProjectArtwork projectId={project.id} variant="detailA" />
              <ProjectArtwork projectId={project.id} variant="detailB" />
            </div>

            {/* Goals & Architecture Breakdown */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-8 border-t border-black/10">
              <div className="md:col-span-4">
                <span className="font-mono-tech text-[11px] text-black/50">
                  Goals &amp; Architecture:
                </span>
              </div>
              <div className="md:col-span-8">
                <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                  {project.problemAndGoal}
                </p>
                <ul className="mt-6 space-y-3">
                  {project.architectureAndExecution.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-black/75 leading-relaxed"
                    >
                      <span className="font-mono-tech text-[11px] text-[#2E6BFF] mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* 3 Architectural Metrics Row */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-black/12">
                  {project.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-[11px] font-mono-tech text-black/50">
                        {m.label}
                      </div>
                      <div className="font-display text-3xl font-semibold text-[#0B1020] mt-1">
                        {m.value}
                      </div>
                      <div className="text-xs text-black/60 mt-1">{m.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
