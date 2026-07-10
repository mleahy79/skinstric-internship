"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DiamondScreen, { ProceedButton } from "./DiamondScreen";

const VALID_TEXT = /^[a-zA-Z\s'-]+$/;

export default function TextStep({
  value,
  onChange,
  placeholder,
  onBack,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(0);
  const displayText = value || placeholder;
  const canProceed = VALID_TEXT.test(value.trim());

  useEffect(() => {
    if (measureRef.current) {
      setInputWidth(measureRef.current.offsetWidth);
    }
  }, [displayText]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && canProceed) {
      onSubmit();
    }
  };

  return (
    <DiamondScreen onBack={onBack}>
      <div className="absolute top-[42%] left-1/2 w-full max-w-125 -translate-x-1/2 -translate-y-1/2 px-8 text-center">
        <p className="mb-2 text-sm font-normal tracking-wide text-[#A0A4AB] uppercase">
          Click to type
        </p>
        <span
          ref={measureRef}
          className="invisible absolute whitespace-pre text-[48px] leading-none font-normal tracking-tighter"
        >
          {displayText}
        </span>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
          style={inputWidth ? { width: inputWidth } : undefined}
          className="border-b border-[#1A1B1C] bg-transparent pb-0 text-center text-[48px] leading-none font-normal tracking-tighter text-[#1A1B1C] placeholder:text-[#1A1B1C] focus:outline-none"
        />
      </div>
      <AnimatePresence>
        {canProceed && <ProceedButton onClick={onSubmit} />}
      </AnimatePresence>
    </DiamondScreen>
  );
}
