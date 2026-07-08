"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function CaptureOption({
  side,
  icon,
  iconSize,
  label,
  onClick,
}: {
  side: "left" | "right";
  icon: string;
  iconSize: number;
  label: string;
  onClick: () => void;
}) {
  const isLeft = side === "left";

  return (
    <button
      onClick={onClick}
      className="group relative flex h-100 w-100 shrink-0 -translate-y-12.5 cursor-pointer items-center justify-center"
    >
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

      <Image
        src={icon}
        alt={label}
        width={iconSize}
        height={iconSize}
        className="relative transition-transform duration-300 group-hover:scale-105"
      />

      <div
        className={`absolute top-1/2 h-px w-24 rotate-[-35deg] bg-[#A0A4AB] ${
          isLeft ? "left-1/2 origin-left" : "right-1/2 origin-right"
        }`}
      />
      <span
        className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-19.5 rounded-full bg-[#A0A4AB] ${
          isLeft ? "left-[calc(50%+1px)]" : "right-[calc(50%+1px)]"
        }`}
      />

      <div
        className={`absolute top-1/2 -translate-y-30 text-sm font-normal whitespace-nowrap text-[#1A1B1C] ${
          isLeft ? "left-1/2 ml-6 text-left" : "right-1/2 mr-6 text-right"
        }`}
      >
        <p>ALLOW A.I.</p>
        <p>{label}</p>
      </div>
    </button>
  );
}

export default function SelfiePage() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center gap-100 overflow-hidden px-8">
      <p className="absolute top-0 left-8 text-sm font-semibold tracking-wide text-[#1A1B1C]">
        TO START ANALYSIS
      </p>

      <CaptureOption
        side="left"
        icon="/camera.svg"
        iconSize={136}
        label="TO SCAN YOUR FACE"
        onClick={() => {
          // TODO: camera capture flow (Phase 3) not built yet
        }}
      />

      <CaptureOption
        side="right"
        icon="/gallery.svg"
        iconSize={120}
        label="ACCESS GALLERY"
        onClick={() => {
          // TODO: gallery upload flow (Phase 2) not built yet
        }}
      />

      <button
        onClick={() => router.push("/")}
        className="group absolute bottom-8 left-8 inline-flex cursor-pointer items-center gap-4 text-sm font-semibold text-[#1A1B1C]"
      >
        <span className="relative flex h-7.5 w-7.5 items-center justify-center duration-300 group-hover:scale-105">
          <span className="absolute inset-0 rotate-45 border border-solid border-black duration-300 group-hover:scale-110" />
          <span className="h-0 w-0 rotate-180 border-y-[6px] border-l-8 border-y-transparent border-l-black duration-300 group-hover:scale-105" />
        </span>
        BACK
      </button>
    </main>
  );
}
