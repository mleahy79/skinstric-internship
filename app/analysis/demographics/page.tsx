"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "../../../components/phase-one/DiamondScreen";
import { ProgressCircle } from "../../../components/analysis/ProgressCircle";
import { useAnalysisStore } from "../../../store/analysis";
import type { DemographicsData } from "../../../store/analysis";

function formatLabel(key: string) {
  return key.replace(/\b\w/g, (char) => char.toUpperCase());
}

const FILTERS = [
  { key: "race", label: "Race" },
  { key: "age", label: "Age" },
  { key: "gender", label: "Sex" },
] as const;

type Category = (typeof FILTERS)[number]["key"];

export default function DemographicsPage() {
  const router = useRouter();
  const demographics = useAnalysisStore((state) => state.demographics);
  const activeLabels = useAnalysisStore((state) => state.activeLabels);
  const edits = useAnalysisStore((state) => state.edits);
  const confirmed = useAnalysisStore((state) => state.confirmed);
  const selectLabel = useAnalysisStore((state) => state.selectLabel);
  const setEditValue = useAnalysisStore((state) => state.setEditValue);
  const confirm = useAnalysisStore((state) => state.confirm);
  const resetOverrides = useAnalysisStore((state) => state.resetOverrides);
  const [activeFilter, setActiveFilter] = useState<Category>("race");

  function scoreFor(category: Category, label: string, aiScore: number) {
    return edits[category]?.[label] ?? aiScore * 100;
  }

  // Age has a natural chronological order and always stays in it, regardless of edits.
  // Race/Sex have no inherent order, so they rank by confidence (re-sorting only on submit).
  function sortedEntries(category: Category) {
    const entries = Object.entries(
      demographics?.data[category as keyof DemographicsData] ?? {},
    );
    if (category === "age") {
      return entries.sort(
        ([labelA], [labelB]) => parseInt(labelA, 10) - parseInt(labelB, 10),
      );
    }
    return entries.sort(
      ([labelA, scoreA], [labelB, scoreB]) =>
        scoreFor(category, labelB, scoreB) - scoreFor(category, labelA, scoreA),
    );
  }

  function activeEntryFor(category: Category) {
    const entries = sortedEntries(category);
    const [topLabel] = entries[0] ?? ["—", 0];
    const label = activeLabels[category] ?? topLabel;
    const score = scoreFor(
      category,
      label,
      entries.find(([entryLabel]) => entryLabel === label)?.[1] ?? 0,
    );
    return { label, score, entries };
  }

  const {
    label: activeLabel,
    score: activeScore,
    entries: activeEntries,
  } = activeEntryFor(activeFilter);

  const draftInputRef = useRef<HTMLInputElement>(null);

  function commitEdit() {
    const parsed = Number(draftInputRef.current?.value);
    if (!Number.isNaN(parsed)) {
      setEditValue(activeFilter, activeLabel, Math.min(100, Math.max(0, parsed)));
    }
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] px-8">
      <p className="absolute top-0 left-8 text-base font-semibold mb-4 tracking-wide leading-[24px] text-[#1A1B1C]">
        A. I. ANALYSIS
      </p>
      <h1 className="text-4xl md:text-7xl pt-4 mt-3 font-normal tracking-tighter leading-[64px]">
        DEMOGRAPHICS
      </h1>
      <h2 className="text-sm mt-2 leading-[24px]">PREDICTED RACE &amp; AGE</h2>

    <div className="w-full min-h-136 pb-10 mt-24">

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_8.5fr_3.15fr] flex-1 gap-4  mx-auto">

        {/* Left Column: Filter Menu */}
        <div className=" border-[#1a1b1c]">
          <div className="space-y-2 ">
            {FILTERS.map((filter) => {
              const selectedLabel = activeEntryFor(filter.key).label;
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={
                    filter.key === activeFilter
                      ? "w-full h-[104px] flex flex-col justify-between text-left px-2 py-4 bg-black text-white cursor-pointer border-t border-[#1a1b1c] text-sm font-semibold"
                      : "w-full h-[104px] flex flex-col justify-between text-left px-2 py-4 bg-gray-100 hover:bg-gray-200 cursor-pointer border-t border-[#1a1b1c] text-sm font-semibold"
                  }
                >
                  <span className="block">{formatLabel(selectedLabel)}</span>
                  <span className="block">{filter.label.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Middle Column: Chart Area */}
        <div className="bg-gray-100 p-6  border-t border-[#1a1b1c] flex flex-col justify-between min-h-136">
          <div>
            <h1 className="text-2xl font-semibold capitalize text-gray-900">
              {formatLabel(activeLabel)}
              {activeFilter === "age" ? " y.o." : ""}
            </h1>
          </div>
          <div className="flex items-center justify-end py-6">
            <ProgressCircle percentage={activeScore} size={384} strokeWidth={2} />
          </div>
        </div>

        {/* Right Column: Confidence Data Table */}
        <div className="bg-gray-100 h-100% p-4 border-t border-[#1a1b1c]">
          <div className="flex justify-between pb-2 mb-3 text-xs font-bold text-gray-400 tracking-wider">
            <span>{FILTERS.find((filter) => filter.key === activeFilter)?.label.toUpperCase()}</span>
            <span>A.I. CONFIDENCE</span>
          </div>
          <div className="space-y-3 text-sm">
            {activeEntries.map(([label, score]) => {
              const isActive = label === activeLabel;
              const displayScore = scoreFor(activeFilter, label, score);
              return (
                <div
                  key={label}
                  className={
                    isActive
                      ? "flex w-full justify-between items-center bg-black text-white p-2 rounded"
                      : "flex w-full justify-between items-center text-gray-600 px-2"
                  }
                >
                  <button
                    onClick={() => selectLabel(activeFilter, label)}
                    disabled={confirmed}
                    className={
                      isActive
                        ? "cursor-pointer font-medium disabled:cursor-not-allowed"
                        : "cursor-pointer hover:text-gray-900 disabled:cursor-not-allowed"
                    }
                  >
                    {isActive ? "✦" : "◇"} {formatLabel(label)}
                  </button>
                  {isActive && !confirmed ? (
                    <input
                      ref={draftInputRef}
                      type="number"
                      step={0.01}
                      min={0}
                      max={100}
                      defaultValue={displayScore.toFixed(2)}
                      onBlur={commitEdit}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          commitEdit();
                          e.currentTarget.blur();
                        }
                      }}
                      className="w-16 border-b border-white/40 bg-transparent text-right font-mono outline-none"
                    />
                  ) : (
                    <span className="font-mono">{displayScore.toFixed(2)}%</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 items-center gap-4 mt-6 md:grid-cols-[200px_1fr_300px]">
        <div />
        <p className="text-sm text-gray-400 text-center">
          If A.I. estimate is wrong, select the correct one.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={resetOverrides}
            className="cursor-pointer border border-[#1a1b1c] px-6 py-2 text-sm font-semibold hover:bg-gray-100"
          >
            RESET
          </button>
          <button
            onClick={confirm}
            disabled={confirmed}
            className="cursor-pointer bg-black px-6 py-2 text-sm font-semibold text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>





<BackButton onClick={() => router.back()} />
  </main>
);
}
