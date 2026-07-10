"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BackButton } from "../../components/phase-one/DiamondScreen";
import { useAnalysisStore } from "../../store/analysis";

type HoverZone = "top" | "side" | "bottom" | null;

function GetSummaryButton() {
  return (
    <button className="group absolute right-8 bottom-8 inline-flex cursor-pointer items-center gap-4 text-sm font-semibold text-[#1A1B1C]">
      GET SUMMARY
      <span className="relative flex h-7.5 w-7.5 items-center justify-center duration-300 group-hover:scale-105">
        <span className="absolute inset-0 rotate-45 border border-solid border-black duration-300 group-hover:scale-110" />
        <span className="h-0 w-0 border-y-[6px] border-l-8 border-y-transparent border-l-black duration-300 group-hover:scale-105" />
      </span>
    </button>
  );
}

export default function SelectAnalysis() {
  const router = useRouter();
  const image = useAnalysisStore((state) => state.image);
  const demographics = useAnalysisStore((state) => state.demographics);
  const [hoverZone, setHoverZone] = useState<HoverZone>(null);

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-8">
      <p className="absolute top-0 left-8 text-sm font-semibold tracking-wide text-[#1A1B1C]">
        A. I. ANALYSIS
      </p>
      <p className="absolute top-8 left-8 text-xs text-[#A0A4AB]">
        A. I. HAS ESTIMATED THE FOLLOWING.
        <br />
        FIX ESTIMATED INFORMATION IF NEEDED.
      </p>

      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <img
          src="/Rectangle 2778 (1).svg"
          alt=""
          className={`pointer-events-none absolute top-1/2 left-1/2 h-140 w-140 max-w-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            hoverZone === "top" ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src="/Rectangle 2779 (1).svg"
          alt=""
          className={`pointer-events-none absolute top-1/2 left-1/2 h-160 w-160 max-w-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            hoverZone === "side" ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src="/Rectangle 2780.svg"
          alt=""
          className={`pointer-events-none absolute top-1/2 left-1/2 h-180 w-180 max-w-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            hoverZone === "bottom" ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative grid grid-cols-2 gap-1.25 rotate-45 bg-white">
          <Link
            href="/analysis/demographics"
            onMouseEnter={() => setHoverZone("top")}
            onMouseLeave={() => setHoverZone(null)}
            className="relative flex h-40 w-40 items-center justify-center bg-gray-100 shadow-inner hover:bg-gray-200 hover:scale-105"
          >
            <span className="absolute -rotate-45 cursor-pointer text-center text-sm font-semibold text-[#1A1B1C]">
              DEMOGRAPHICS
            </span>
          </Link>

          <div
            onMouseEnter={() => setHoverZone("side")}
            onMouseLeave={() => setHoverZone(null)}
            className="relative flex h-40 w-40 cursor-default items-center justify-center bg-gray-100 shadow-inner hover:bg-gray-200"
          >
            <span className="absolute -rotate-45 text-center text-sm leading-5 font-semibold text-[#1A1B1C]">
              COSMETIC
              <br />
              CONCERNS
            </span>
          </div>

          <div
            onMouseEnter={() => setHoverZone("side")}
            onMouseLeave={() => setHoverZone(null)}
            className="relative flex h-40 w-40 cursor-default items-center justify-center shadow-inner bg-gray-100 hover:bg-gray-200"
          >
            <span className="absolute -rotate-45 text-center text-sm leading-5 font-semibold text-[#1A1B1C]">
              SKIN TYPE
              <br />
              DETAILS
            </span>
          </div>

          <div
            onMouseEnter={() => setHoverZone("bottom")}
            onMouseLeave={() => setHoverZone(null)}
            className="relative flex h-40 w-40 cursor-default items-center justify-center shadow-inner bg-gray-100 hover:bg-gray-200"
          >
            <span className="absolute -rotate-45 text-center text-sm font-semibold text-[#1A1B1C]">
              WEATHER
            </span>
          </div>
        </div>
      </div>

      <BackButton onClick={() => router.back()} />
      <GetSummaryButton />
    </main>
  );
}

