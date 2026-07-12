const TIPS = ["Neutral Expression", "Frontal Pose", "Adequate Lighting"];

export function CameraTips({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center gap-3 text-xs font-semibold tracking-wide ${
        light ? "text-white/90" : "text-[#1A1B1C]"
      }`}
    >
      <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
      <div className="flex gap-6">
        {TIPS.map((tip) => (
          <span key={tip} className="flex items-center gap-1.5">
            <span className="text-[10px]">◇</span>
            {tip.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
