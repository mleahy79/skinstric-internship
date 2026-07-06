"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TextStep from "../components/phase-one/text-step";
import Processing from "../components/phase-one/processing";
import { useOnboardingStore } from "../store/onboarding";

const PHASE_ONE_ENDPOINT =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";
const MIN_PROCESSING_MS = 1500;

const BASE_SHIFT = 572;

function DiamondSection({
  side,
  label,
  onHover,
  onLeave,
  onClick,
  hidden,
  active,
}: {
  side: "left" | "right";
  label: string;
  onHover: () => void;
  onLeave: () => void;
  onClick?: () => void;
  hidden: boolean;
  active: boolean;
}) {
  const isLeft = side === "left";
  const edgePosition = isLeft ? "left-0" : "right-0";
  const buttonEdgePosition = isLeft ? "left-8" : "right-8";
  const opacityClass = hidden ? "opacity-0" : "opacity-100";

  const icon = (
    <span className="relative flex h-7.5 w-7.5 items-center justify-center duration-300 group-hover:scale-105">
      <span className="absolute inset-0 rotate-45 border border-solid border-black duration-300 group-hover:scale-110" />
      <span className="absolute inset-1.5 rotate-45 border border-dotted border-black opacity-0 duration-300 group-hover:scale-110 group-hover:opacity-100" />
      <span
        className={`h-0 w-0 border-y-[6px] border-l-8 border-y-transparent border-l-black duration-300 group-hover:scale-105 ${
          isLeft ? "rotate-180" : ""
        }`}
      />
    </span>
  );

  return (
    <>
      <div
        className={`pointer-events-none hidden lg:block fixed top-1/2 ${edgePosition} h-125 w-125 -translate-y-1/2 ${
          isLeft ? "-translate-x-70.75" : "translate-x-70.75"
        } ${opacityClass} transition-opacity duration-500 ease-in-out`}
      >
        <div className="absolute inset-0 h-full w-full rotate-45 border border-dotted border-[#A0A4AB]" />
        <div
          className={`absolute -inset-4 rotate-45 border border-dotted border-[#A0A4AB] transition-opacity duration-300 ${
            active ? "opacity-60" : "opacity-0"
          }`}
        />
        <div
          className={`absolute -inset-8 rotate-45 border border-dotted border-[#A0A4AB] transition-opacity duration-300 ${
            active ? "opacity-30" : "opacity-0"
          }`}
        />
      </div>
      <button
        className={`group fixed top-1/2 ${buttonEdgePosition} h-9 -translate-y-1/2 inline-flex cursor-pointer items-center justify-center gap-4 whitespace-nowrap rounded-md px-3 py-1 text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 ${opacityClass} transition-opacity duration-500 ease-in-out`}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {isLeft ? (
          <>
            {icon}
            <span>{label}</span>
          </>
        ) : (
          <>
            <span>{label}</span>
            {icon}
          </>
        )}
      </button>
    </>
  );
}

export default function Home() {
  const [step, setStep] = useState<
    "hero" | "introduce" | "location" | "processing"
  >("hero");
  const [submitStatus, setSubmitStatus] = useState<"loading" | "done">(
    "loading",
  );
  const { name, location, setName, setLocation } = useOnboardingStore();
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const sophisticatedRef = useRef<HTMLSpanElement>(null);
  const skincareRef = useRef<HTMLSpanElement>(null);
  const [gap, setGap] = useState(0);

  useEffect(() => {
    const measure = () => {
      const sophisticatedWidth = sophisticatedRef.current?.offsetWidth ?? 0;
      const skincareWidth = skincareRef.current?.offsetWidth ?? 0;
      setGap((sophisticatedWidth - skincareWidth) / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const direction = hoverSide === "left" ? 1 : hoverSide === "right" ? -1 : 0;

  const submitPhaseOne = async () => {
    setStep("processing");
    setSubmitStatus("loading");

    const minDelay = new Promise((resolve) =>
      setTimeout(resolve, MIN_PROCESSING_MS),
    );
    const request = fetch(PHASE_ONE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, location }),
    });

    await Promise.all([request, minDelay]);
    setSubmitStatus("done");
  };

  if (step === "introduce") {
    return (
      <TextStep
        value={name}
        onChange={setName}
        placeholder="Introduce Yourself"
        onBack={() => setStep("hero")}
        onSubmit={() => setStep("location")}
      />
    );
  }

  if (step === "location") {
    return (
      <TextStep
        value={location}
        onChange={setLocation}
        placeholder="Where are you from?"
        onBack={() => setStep("introduce")}
        onSubmit={submitPhaseOne}
      />
    );
  }

  if (step === "processing") {
    return (
      <Processing
        status={submitStatus}
        onBack={() => setStep("location")}
        onProceed={() => {
          // TODO: Phase 2 route doesn't exist yet
        }}
      />
    );
  }

  return (
    <main className="relative px-8 min-h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center">
      <DiamondSection
        side="left"
        label="DISCOVER A.I."
        onHover={() => setHoverSide("left")}
        onLeave={() => setHoverSide(null)}
        hidden={hoverSide === "right"}
        active={hoverSide === "left"}
      />
      <DiamondSection
        side="right"
        label="TAKE TEST"
        onHover={() => setHoverSide("right")}
        onLeave={() => setHoverSide(null)}
        onClick={() => setStep("introduce")}
        hidden={hoverSide === "left"}
        active={hoverSide === "right"}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 w-auto h-auto text-center">
        <div>
          <h1 className="text-[60px] text-[#1A1B1C] lg:text-[105px] font-light tracking-[-0.07em] leading-[0.9375]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.span
                ref={sophisticatedRef}
                className="inline-block"
                animate={{ x: direction * BASE_SHIFT }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                Sophisticated
              </motion.span>
            </motion.span>
            <motion.span
              className="block text-[#1A1B1C]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <motion.span
                ref={skincareRef}
                className="inline-block"
                animate={{ x: direction * (BASE_SHIFT + gap) }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                skincare
              </motion.span>
            </motion.span>
          </h1>
        </div>
      </div>
      <p className="fixed bottom-15.5 left-14.25 w-79 h-18 text-sm font-normal uppercase leading-6 tracking-normal text-[#1A1B1C]">
        Skinstric developed an A.I. that creates a highly-personalized routine
        tailored to what your skin needs.
      </p>
    </main>
  );
}
