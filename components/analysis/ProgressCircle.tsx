export function ProgressCircle({
  percentage,
  size = 384,
  strokeWidth = 12,
  light = false,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  light?: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (percentage / 100) * circumference;

  return (
    <div
      className="relative flex aspect-square w-full items-center justify-center"
      style={{ maxWidth: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={light ? "#4B4B4B" : "#D9D9D9"}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={light ? "#FFFFFF" : "#1A1B1C"}
          strokeWidth={strokeWidth}
          strokeDasharray={`${filled} ${circumference - filled}`}
        />
      </svg>
      <span
        className={`absolute text-[clamp(1.25rem,6vw,2.25rem)] font-light ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {percentage.toFixed(2)}
        <span className="text-[0.55em]">%</span>
      </span>
    </div>
  );
}
