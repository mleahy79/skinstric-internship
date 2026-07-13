                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          "use client";

import { motion } from "framer-motion";
import DiamondScreen, { ProceedButton } from "./DiamondScreen";

function LoadingDots() {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-[#A0A4AB]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Processing({
  status,
  onBack,
  onProceed,
}: {
  status: "loading" | "done";
  onBack: () => void;
  onProceed: () => void;
}) {
  return (
    <DiamondScreen onBack={onBack}>
      <div className="absolute top-[42%] left-1/2 w-full max-w-125 -translate-x-1/2 -translate-y-1/2 px-8 text-center">
        {status === "loading" ? (
          <>
            <p className="text-2xl font-normal text-[#1A1B1C]">
              Processing submission
            </p>
            <LoadingDots />
          </>
        ) : (
          <>
            <p className="text-2xl font-normal text-[#1A1B1C]">Thank you!</p>
            <p className="mt-2 text-sm text-[#A0A4AB]">
              Proceed for the next step
            </p>
          </>
        )}
      </div>
      {status === "done" && <ProceedButton onClick={onProceed} />}
    </DiamondScreen>
  );
}
