export function ScoutMark({ size = 40 }) {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background:
          "linear-gradient(135deg, oklch(0.42 0.1 160) 0%, oklch(0.28 0.07 160) 100%)",
        boxShadow: "0 8px 24px -10px oklch(0.32 0.07 160 / 0.5)",
      }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none">
        <path
          d="M12 3 L13.2 9.5 L19.5 8 L14.5 12 L19 17 L12.5 14.8 L11 21 L9.2 14.8 L4 16.5 L8.5 12 L4.5 8 L10.5 9.5 Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export function LocaliQLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
          fill="oklch(0.32 0.07 160)"
        />
      </svg>
      <span className="font-display text-[22px] font-semibold tracking-tight text-foreground">
        LocaliQ
      </span>
    </div>
  );
}
