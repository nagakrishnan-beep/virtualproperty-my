// VirtualProperty wordmark — gradient hexagonal "house" mark + text.
export function Logo({ className = "", dark = true, showText = true }) {
  const textColor = dark ? "#f5f4f1" : "#111111";
  const subColor = dark ? "rgba(245,244,241,0.55)" : "rgba(17,17,17,0.55)";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="vpg" x1="4" y1="44" x2="44" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B1561" />
            <stop offset="0.55" stopColor="#E27B29" />
            <stop offset="1" stopColor="#F4B14C" />
          </linearGradient>
        </defs>
        <path
          d="M24 3.5 L42 14 V34 L24 44.5 L6 34 V14 Z"
          stroke="url(#vpg)"
          strokeWidth="3"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M15 30 L24 15 L33 30 Z"
          fill="url(#vpg)"
        />
      </svg>
      {showText && (
        <span
          className="font-display text-[1.05rem] tracking-tight leading-none"
          style={{ color: textColor }}
        >
          Virtual<span style={{ color: subColor }}>Property</span>
          <span className="text-gradient">.my</span>
        </span>
      )}
    </span>
  );
}
