import React from "react";

export function ContinuumMark({
  className = "w-7 h-7",
  strokeColor = "currentColor",
  accentColor = "#F5B83D",
}: {
  className?: string;
  strokeColor?: string;
  accentColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 112 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Qorvaynology Continuum Mark"
    >
      <circle
        cx="32"
        cy="44"
        r="15"
        stroke={strokeColor}
        strokeWidth="8"
      />
      <path
        d="M47 28 L47 72 Q47 86 61 86 L84 28"
        stroke={strokeColor}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 28 L70 54"
        stroke={accentColor}
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CelestialCross({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C12.35 6.4 13.6 11.65 24 12C13.6 12.35 12.35 17.6 12 24C11.65 17.6 10.4 12.35 0 12C10.4 11.65 11.65 6.4 12 0Z" />
    </svg>
  );
}

export function TeamAvatar({
  initials,
  name,
  tone = "from-[#F5B83D]/40 to-[#0B1020]",
  size = "md",
  active = false,
}: {
  initials: string;
  name: string;
  tone?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  active?: boolean;
}) {
  const sizeClasses = {
    xs: "w-7 h-7 text-[10px]",
    sm: "w-9 h-9 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-20 h-20 text-xl",
    xl: "w-44 h-44 md:w-56 md:h-56 text-4xl",
  }[size];

  return (
    <div
      title={name}
      className={`relative rounded-full overflow-hidden flex items-center justify-center select-none bg-gradient-to-br ${tone} ${sizeClasses} ${
        active
          ? "ring-2 ring-[#F5B83D] shadow-[0_0_40px_rgba(245,184,61,0.22)]"
          : "ring-1 ring-white/20"
      } transition-all duration-500`}
    >
      {/* Subtle architectural portrait silhouette + geometric lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.22),transparent_60%)]" />
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-35"
        fill="none"
      >
        <circle cx="50" cy="36" r="16" fill="currentColor" className="text-white/60" />
        <path
          d="M20 92 C20 68, 80 68, 80 92"
          fill="currentColor"
          className="text-white/50"
        />
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.75" className="text-white/30" />
      </svg>
      <span className="relative z-10 font-display font-semibold tracking-tight text-white/95">
        {initials}
      </span>
    </div>
  );
}
