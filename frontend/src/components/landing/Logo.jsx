// VirtualProperty wordmark — real brand icon + text lockup.
export function Logo({ className = "", dark = true, showText = true }) {
  const virtualColor = dark ? "rgba(245,244,241,0.9)" : "rgba(90,90,90,1)";
  const propertyColor = dark ? "#ffffff" : "#3f3f46";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/vp-icon-64.png"
        alt="VirtualProperty.my logo"
        width="30"
        height="30"
        className="w-[30px] h-[30px] object-contain shrink-0"
      />
      {showText && (
        <span className="font-display text-[1.05rem] tracking-tight leading-none">
          <span style={{ color: virtualColor }}>Virtual</span>
          <span style={{ color: propertyColor, fontWeight: 900 }}>Property</span>
          <span className="text-gradient">.my</span>
        </span>
      )}
    </span>
  );
}
