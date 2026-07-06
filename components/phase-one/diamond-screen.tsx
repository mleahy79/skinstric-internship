"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group absolute bottom-8 left-8 inline-flex cursor-pointer items-center gap-4 text-sm font-semibold text-[#1A1B1C]"
    >
      <span className="relative flex h-7.5 w-7.5 items-center justify-center duration-300 group-hover:scale-105">
        <span className="absolute inset-0 rotate-45 border border-solid border-black duration-300 group-hover:scale-110" />
        <span className="h-0 w-0 rotate-180 border-y-[6px] border-l-8 border-y-transparent border-l-black duration-300 group-hover:scale-105" />
      </span>
      BACK
    </button>
  );
}

export function ProceedButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group absolute bottom-8 right-8 inline-flex cursor-pointer items-center gap-4 text-sm font-semibold text-[#1A1B1C]"
    >
      PROCEED
      <span className="relative flex h-7.5 w-7.5 items-center justify-center duration-300 group-hover:scale-105">
        <span className="absolute inset-0 rotate-45 border border-solid border-black duration-300 group-hover:scale-110" />
        <span className="h-0 w-0 border-y-[6px] border-l-8 border-y-transparent border-l-black duration-300 group-hover:scale-105" />
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
  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-8">
      <p className="absolute top-0 left-8 text-sm font-semibold tracking-wide text-[#1A1B1C]">
        TO START ANALYSIS
      </p>

      <div className="absolute top-[42%] left-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute inset-0 border border-dotted border-[#A0A4AB] opacity-100"
          initial={{ rotate: 45 }}
          animate={{ rotate: 405 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -inset-8 border border-dotted border-[#A0A4AB] opacity-50"
          initial={{ rotate: 12 }}
          animate={{ rotate: 372 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -inset-16 border border-dotted border-[#A0A4AB] opacity-25"
          initial={{ rotate: 20 }}
          animate={{ rotate: 380 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {children}

      <BackButton onClick={onBack} />
    </main>
  );
}
