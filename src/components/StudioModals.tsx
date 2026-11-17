"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Calendar, Check, Mail, Phone, X } from "lucide-react";
import { InsightArticle } from "@/data/studioData";
import { ContinuumMark } from "./ContinuumMark";

export function InsightModal({
  article,
  onClose,
  onOpenContact,
}: {
  article: InsightArticle | null;
  onClose: () => void;
  onOpenContact: (subject?: string) => void;
}) {
  useEffect(() => {
    if (!article) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl h-full overflow-y-auto paper-surface text-[#0B1020] shadow-2xl border-l border-black/15 px-6 sm:px-12 py-8 md:py-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-6 border-b border-black/12">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#0B1020] hover:text-[#B45F06] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Insights</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close insight"
            className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-3 font-mono-tech text-[11px] text-black/55">
            <span>
              {article.day} {article.month} {article.year}
            </span>
            <span>·</span>
            <span>{article.category}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#0B1020] leading-tight">
            {article.title}
          </h2>

          <div className="mt-4 flex items-center gap-3 text-xs text-black/65 pb-6 border-b border-black/10">
            <span className="font-medium text-[#0B1020]">{article.author}</span>
            <span>—</span>
            <span>{article.authorRole}, Qorvaynology</span>
          </div>

          <div className="mt-8 space-y-5 text-sm sm:text-base text-black/80 leading-relaxed">
            {article.body.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="mt-10 p-6 bg-black/[0.035] border border-black/12">
            <div className="font-mono-tech text-[11px] text-[#B45F06] mb-3">
              KEY STUDIO TAKEAWAYS
            </div>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-black/80">
                  <span className="font-mono-tech text-[11px] text-black/45 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 pt-6 border-t border-black/12 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-display text-base font-semibold text-[#0B1020]">
                Building a brand, website, or web app?
              </div>
              <div className="text-xs text-black/60">
                Start with a free 15–30 minute discovery call with Ryan Zannah.
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenContact(`Discovery Call — Read "${article.title}"`);
              }}
              className="inline-flex items-center gap-2.5 bg-[#0B1020] text-[#F4F3EE] px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[#1E293B] transition-colors cursor-pointer"
            >
              <span>Start a Project</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5B83D]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactModal({
  isOpen,
  initialSubject = "",
  onClose,
}: {
  isOpen: boolean;
  initialSubject?: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(initialSubject || "Full-Stack Web App / MVP");
  const [budget, setBudget] = useState("$1,200 – $3,500");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubject) setService(initialSubject);
  }, [initialSubject]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Qorvaynology Project Brief: ${service} (${name})`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPackage / Scope: ${service}\nEstimated Budget: ${budget}\n\nProject Details:\n${details}\n\n— Sent from qorvaynology.com`
    );
    window.open(`mailto:qorvaynology@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl cosmos-surface text-[#F4F3EE] border border-white/15 shadow-2xl p-6 sm:p-10 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-5 border-b border-white/12">
          <div className="flex items-center gap-3">
            <ContinuumMark className="w-6 h-6" strokeColor="#FFFFFF" accentColor="#F5B83D" />
            <span className="font-mono-tech text-[11px] text-white/70">
              START A PROJECT · QORVAYNOLOGY STUDIO
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close contact dialog"
            className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Tell us what you&apos;re building.
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-white/65">
            Every project starts with a free 15–30 minute discovery call and a written 3-tier proposal within 24 hours.
          </p>

          {/* Direct Booking & Instant Channels */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href="https://cal.com/qorvaynology"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-[#F5B83D]/12 border border-[#F5B83D]/40 hover:bg-[#F5B83D]/20 transition-colors text-xs"
            >
              <span className="flex items-center gap-2 font-medium text-[#F5B83D]">
                <Calendar className="w-3.5 h-3.5" />
                Book on Cal.com
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F5B83D]" />
            </a>
            <a
              href="mailto:qorvaynology@gmail.com"
              className="flex items-center justify-between p-3 bg-white/[0.04] border border-white/12 hover:border-white/30 transition-colors text-xs"
            >
              <span className="flex items-center gap-2 text-white/85">
                <Mail className="w-3.5 h-3.5 text-white/55" />
                qorvaynology@gmail.com
              </span>
            </a>
            <a
              href="https://wa.me/8801410831205"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white/[0.04] border border-white/12 hover:border-white/30 transition-colors text-xs"
            >
              <span className="flex items-center gap-2 text-white/85">
                <Phone className="w-3.5 h-3.5 text-white/55" />
                +880 1410-831205
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/45" />
            </a>
          </div>

          {submitted ? (
            <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-400/30 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mx-auto mb-3">
                <Check className="w-5 h-5" />
              </div>
              <div className="font-display text-lg font-semibold text-white">
                Brief prepared in your email client
              </div>
              <p className="text-xs text-white/70 mt-1">
                You can also book your discovery slot directly at{" "}
                <a
                  href="https://cal.com/qorvaynology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5B83D] underline"
                >
                  cal.com/qorvaynology
                </a>
                .
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-mono-tech text-white/60 hover:text-white underline cursor-pointer"
              >
                Edit brief
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-tech text-[10px] text-white/55 mb-1.5">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ryan / Founder name"
                    className="w-full bg-white/[0.04] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#F5B83D]"
                  />
                </div>
                <div>
                  <label className="block font-mono-tech text-[10px] text-white/55 mb-1.5">
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-white/[0.04] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#F5B83D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-tech text-[10px] text-white/55 mb-1.5">
                    PACKAGE / SERVICE
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#0C1018] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5B83D]"
                  >
                    <option value="Brand + Website Bundle ($1,200 – $3,500)">
                      Brand + Website Bundle ($1,200 – $3,500)
                    </option>
                    <option value="Launch Website ($800 – $2,500)">
                      Launch Website ($800 – $2,500)
                    </option>
                    <option value="Full-Stack Web App / MVP ($3,000 – $12,000+)">
                      Full-Stack Web App / MVP ($3,000 – $12,000+)
                    </option>
                    <option value="Brand Identity System ($400 – $1,200)">
                      Brand Identity System ($400 – $1,200)
                    </option>
                    <option value="UI/UX & Product Design ($500 – $2,500)">
                      UI/UX & Product Design ($500 – $2,500)
                    </option>
                    <option value="E-Commerce Store ($1,000 – $4,000)">
                      E-Commerce Store ($1,000 – $4,000)
                    </option>
                    <option value="AI Workflow Automation ($500 – $3,000)">
                      AI Workflow Automation ($500 – $3,000)
                    </option>
                    <option value="Monthly Growth Retainer ($500 – $2,000/mo)">
                      Monthly Growth Retainer ($500 – $2,000/mo)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono-tech text-[10px] text-white/55 mb-1.5">
                    BUDGET RANGE (USD OR BDT)
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#0C1018] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5B83D]"
                  >
                    <option value="$400 – $1,200 (৳25k – ৳60k)">
                      $400 – $1,200 (৳25k – ৳60k)
                    </option>
                    <option value="$1,200 – $3,500 (৳60k – ৳1.8L)">
                      $1,200 – $3,500 (৳60k – ৳1.8L)
                    </option>
                    <option value="$3,000 – $8,000 (৳2L – ৳5L)">
                      $3,000 – $8,000 (৳2L – ৳5L)
                    </option>
                    <option value="$8,000 – $15,000+">
                      $8,000 – $15,000+
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono-tech text-[10px] text-white/55 mb-1.5">
                  PROJECT GOALS & TIMELINE
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Share your product URL, what you want to launch or redesign, and your target timeline..."
                  className="w-full bg-white/[0.04] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#F5B83D]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-[11px] text-white/50">
                  Response within 24h · Kushtia & Dhaka, BD
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-[#F4F3EE] text-[#0B1020] px-6 py-2.5 rounded-full text-xs font-medium hover:bg-[#F5B83D] transition-colors cursor-pointer"
                >
                  <span>Send Project Brief</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B1020]" />
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
