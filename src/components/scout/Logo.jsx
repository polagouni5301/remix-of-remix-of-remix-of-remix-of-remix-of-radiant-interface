export function ScoutMark({ size = 100 }) {
  return (
    <img
      src="/ScoutInfo.png"
      alt="Scout Logo"
      style={{
        width: size,
        height: size,
      }}
      className="rounded-full object-contain"
    />
  );
}

export function ScoutIconMark({ size = 100 }) {
  return (
    <img
      src="/scout-img.png"
      alt="Scout Logo"
      style={{
        width: size,
        height: size,
      }}
      className="rounded-full object-contain"
    />
  );
}

export function LocaliQLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
          fill="oklch(0.665 0.215 36)"
        />
      </svg>
      <span className="font-display text-[22px] font-semibold tracking-tight text-foreground">
        LocaliQ
      </span>
    </div>
  );
}
