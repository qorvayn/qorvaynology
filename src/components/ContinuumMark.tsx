import React from "react";

export function ContinuumMark({
  className = "w-7 h-7",
  strokeColor = "currentColor",
  accentColor = "#2E6BFF",
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
      viewBox="0 0 36.001 36.001"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M 16.808 1.039 C 17 -0.346 19.001 -0.346 19.193 1.039 L 20.423 9.93 C 20.83 12.864 23.137 15.171 26.071 15.578 L 34.962 16.808 C 36.347 17 36.347 19.001 34.962 19.193 L 26.071 20.423 C 23.137 20.83 20.83 23.137 20.423 26.071 L 19.193 34.962 C 19.001 36.347 17 36.347 16.808 34.962 L 15.578 26.071 C 15.171 23.137 12.864 20.83 9.93 20.423 L 1.039 19.193 C -0.346 19.001 -0.346 17 1.039 16.808 L 9.93 15.578 C 12.864 15.171 15.171 12.864 15.578 9.93 Z" />
    </svg>
  );
}

export function TeamAvatar({
  initials,
  name,
  tone = "from-[#2E6BFF]/45 via-[#0B1020] to-[#03050C]",
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
    xs: "w-8 h-8 text-[10px]",
    sm: "w-10 h-10 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-20 h-20 text-xl",
    xl: "w-48 h-48 md:w-64 md:h-64 text-4xl md:text-5xl",
  }[size];

  return (
    <div
      title={name}
      className={`relative rounded-full overflow-hidden flex items-center justify-center select-none bg-gradient-to-br ${tone} ${sizeClasses} ${
        active
          ? "ring-2 ring-[#2E6BFF] shadow-[0_0_55px_rgba(46,107,255,0.35)]"
          : "ring-1 ring-white/20"
      } transition-all duration-500`}
    >
      {/* Lunar shadow texture overlay matching Astra's Team portraits */}
      <img
        src="/astra/moon-shadow.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay pointer-events-none"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.28),transparent_62%)]" />
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
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-white/30"
        />
      </svg>
      <span className="relative z-10 font-display font-semibold tracking-tight text-white">
        {initials}
      </span>
    </div>
  );
}
