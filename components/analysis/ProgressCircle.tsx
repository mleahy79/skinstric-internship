export function ProgressCircle({
  percentage,
  size = 384,
  strokeWidth = 12,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#D9D9D9"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1A1B1C"
          strokeWidth={strokeWidth}
          strokeDasharray={`${filled} ${circumference - filled}`}
        />
      </svg>
      <span className="absolute text-4xl font-light text-gray-900">
        {percentage.toFixed(2)}
        <span className="text-xl">%</span>
      </span>
    </div>
  );
}
