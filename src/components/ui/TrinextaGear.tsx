function gearPath(
  cx: number,
  cy: number,
  numTeeth: number,
  tipR: number,
  rootR: number,
): string {
  const step = (2 * Math.PI) / numTeeth;
  const rootTw = step * 0.58;
  const tipTw = step * 0.36;
  const pts: string[] = [];
  for (let i = 0; i < numTeeth; i++) {
    const mid = i * step;
    pts.push(
      `${(cx + Math.cos(mid - rootTw / 2) * rootR).toFixed(2)},${(cy + Math.sin(mid - rootTw / 2) * rootR).toFixed(2)}`,
      `${(cx + Math.cos(mid - tipTw / 2) * tipR).toFixed(2)},${(cy + Math.sin(mid - tipTw / 2) * tipR).toFixed(2)}`,
      `${(cx + Math.cos(mid + tipTw / 2) * tipR).toFixed(2)},${(cy + Math.sin(mid + tipTw / 2) * tipR).toFixed(2)}`,
      `${(cx + Math.cos(mid + rootTw / 2) * rootR).toFixed(2)},${(cy + Math.sin(mid + rootTw / 2) * rootR).toFixed(2)}`,
    );
  }
  return `M ${pts.join(" L ")} Z`;
}

interface TrinextaGearProps {
  size?: number;
  className?: string;
}

export function TrinextaGear({ size = 48, className }: TrinextaGearProps) {
  const cx = 32;
  const cy = 32;

  const outerPath = gearPath(cx, cy, 14, 29.5, 22);
  const innerPath = gearPath(cx, cy, 8, 11.5, 9);

  const spokeAngles = [0, 60, 120];

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {/* Outer gear ring — CW 20s */}
      <path
        d={outerPath}
        fill="var(--secondary)"
        fillOpacity={0.17}
        stroke="var(--secondary)"
        strokeOpacity={0.55}
        strokeWidth={0.8}
        strokeLinejoin="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${cx} ${cy}`}
          to={`360 ${cx} ${cy}`}
          dur="20s"
          repeatCount="indefinite"
        />
      </path>

      {/* Bore #1 — visual hole for outer gear */}
      <circle cx={cx} cy={cy} r={14} fill="var(--primary)" />

      {/* Bore edge ring */}
      <circle
        cx={cx}
        cy={cy}
        r={14}
        fill="none"
        stroke="var(--secondary)"
        strokeOpacity={0.22}
        strokeWidth={0.7}
      />

      {/* Bore #2 — visual hole for inner gear */}
      <circle cx={cx} cy={cy} r={5.5} fill="var(--secondary)" />

      {/* Center hub dot */}
      <circle cx={cx} cy={cy} r={2} fill="var(--secondary)" fillOpacity={0.9} />
    </svg>
  );
}
