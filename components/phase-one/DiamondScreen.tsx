"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const DIAMOND_STEP = 80;

export function BackButton({
  onClick,
  light,
}: {
  onClick: () => void;
  light?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group absolute bottom-8 left-8 inline-flex cursor-pointer items-center gap-4 text-sm font-semibold ${
        light ? "text-white" : "text-[#1A1B1C]"
      }`}
    >
      <span className="relative flex h-7.5 w-7.5 items-center justify-center duration-300 group-hover:scale-105">
        <span
          className={`absolute inset-0 rotate-45 border border-solid duration-300 group-hover:scale-110 ${
            light ? "border-white" : "border-black"
          }`}
        />
        <span
          className={`h-0 w-0 rotate-180 border-y-[6px] border-l-8 border-y-transparent duration-300 group-hover:scale-105 ${
            light ? "border-l-white" : "border-l-black"
          }`}
        />
      </span>
      <span className="hidden sm:inline">BACK</span>
    </button>
  );
}

export function ProceedButton({
  onClick,
  light,
}: {
  onClick: () => void;
  light?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group absolute bottom-8 right-8 inline-flex cursor-pointer items-center gap-4 text-sm font-semibold ${
        light ? "text-white" : "text-[#1A1B1C]"
      }`}
    >
      PROCEED
      <span className="relative flex h-7.5 w-7.5 items-center justify-center duration-300 group-hover:scale-105">
        <span
          className={`absolute inset-0 rotate-45 border border-solid duration-300 group-hover:scale-110 ${
            light ? "border-white" : "border-black"
          }`}
        />
        <span
          className={`h-0 w-0 border-y-[6px] border-l-8 border-y-transparent duration-300 group-hover:scale-105 ${
            light ? "border-l-white" : "border-l-black"
          }`}
        />
      </span>
    </motion.button>
  );
}

export default function DiamondScreen({
  onBack,
  children,
}: {
  onBack: () => void;
  children: ReactNode;
}) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [baseSize, setBaseSize] = useState(604);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (measureRef.current) {
        setBaseSize(Math.round(measureRef.current.offsetWidth * 1.414));
      }
    });
  }, []);

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-8">
      <span
        ref={measureRef}
        className="invisible absolute whitespace-pre text-[48px] leading-none font-normal tracking-tighter"
      >
        Where are you from?
      </span>

      <p className="absolute top-0 left-8 text-sm font-semibold tracking-wide text-[#1A1B1C]">
        TO START ANALYSIS
      </p>

      <div className="absolute top-[42%] left-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2">
        <motion.img
          src="/Rectangle 2778 (1).svg"
          alt=""
          style={{ width: baseSize, height: baseSize }}
          className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        />
        <motion.img
          src="/Rectangle 2779 (1).svg"
          alt=""
          style={{ width: baseSize + DIAMOND_STEP, height: baseSize + DIAMOND_STEP }}
          className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          initial={{ rotate: 12 }}
          animate={{ rotate: 372 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <motion.img
          src="/Rectangle 2780.svg"
          alt=""
          style={{
            width: baseSize + DIAMOND_STEP * 2,
            height: baseSize + DIAMOND_STEP * 2,
          }}
          className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          initial={{ rotate: 20 }}
          animate={{ rotate: 380 }}
          transition={{ duration: 66, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {children}

      <BackButton onClick={onBack} />
    </main>
  );
}
