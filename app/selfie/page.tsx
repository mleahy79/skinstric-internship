"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import PhotoUpload, { type PhotoUploadHandle } from "./PhotoUpload";
import CameraCapture from "./CameraCapture";
import DiamondScreen, { BackButton, ProceedButton } from "../../components/phase-one/DiamondScreen";
import { CameraTips } from "../../components/phase-one/CameraTips";
import Processing from "../../components/phase-one/Processing";
import { useAnalysisStore } from "../../store/analysis";

const PHASE_TWO_ENDPOINT =
  "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo";
const MIN_PROCESSING_MS = 1500;

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

  const smallestDiamondSize = 400;
  const lineReach = smallestDiamondSize / (2 * Math.SQRT2);
  const textGap = 20;

  // Positive reach = extend right before rotating (camera's side);
  // negative = extend left (gallery's side). Same rotation angle as the line itself.
  const reach = isLeft ? lineReach : -lineReach;
  const textReach = isLeft ? lineReach + textGap : -(lineReach + textGap);

  const dotStyle = {
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) rotate(-35deg) translateX(${reach}px)`,
  };

  const textAnchorStyle = {
    top: "50%",
    left: "50%",
    transform: `rotate(-35deg) translateX(${textReach}px)`,
  };

  return (
    <>
      {/* Mobile: stacked, label centered below the icon */}
      <button
        onClick={onClick}
        className="group relative flex h-56 w-56 shrink-0 cursor-pointer flex-col items-center justify-center gap-3 sm:hidden"
      >
        <div className="relative flex h-36 w-36 items-center justify-center">
          <motion.img
            src="/Rectangle 2778 (1).svg"
            alt=""
            className="pointer-events-none absolute top-1/2 left-1/2 h-44 w-44 max-w-none -translate-x-1/2 -translate-y-1/2"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          />
          <motion.img
            src="/Rectangle 2779 (1).svg"
            alt=""
            className="pointer-events-none absolute top-1/2 left-1/2 h-52 w-52 max-w-none -translate-x-1/2 -translate-y-1/2"
            initial={{ rotate: 12 }}
            animate={{ rotate: 372 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          />
          <motion.img
            src="/Rectangle 2780.svg"
            alt=""
            className="pointer-events-none absolute top-1/2 left-1/2 h-60 w-60 max-w-none -translate-x-1/2 -translate-y-1/2"
            initial={{ rotate: 20 }}
            animate={{ rotate: 380 }}
            transition={{ duration: 66, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative z-10 h-24 w-24 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
            <Image src={icon} alt={label} width={96} height={96} />
          </div>
        </div>
        <p className="text-center text-sm font-normal text-[#1A1B1C]">
          <span className="block">ALLOW A.I.</span>
          <span className="block">{label}</span>
        </p>
      </button>

      {/* Tablet/desktop: full-size diagonal line + offset label (stacked below xl, row at xl+) */}
      <button
        onClick={onClick}
        className="group relative hidden h-80 w-80 shrink-0 -translate-y-12.5 cursor-pointer items-center justify-center sm:flex"
      >
        <motion.img
          src="/Rectangle 2778 (1).svg"
          alt=""
          className="pointer-events-none absolute top-1/2 left-1/2 h-100 w-100 max-w-none -translate-x-1/2 -translate-y-1/2 "
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        />
        <motion.img
          src="/Rectangle 2779 (1).svg"
          alt=""
          className="pointer-events-none absolute top-1/2 left-1/2 h-120 w-120 max-w-none -translate-x-1/2 -translate-y-1/2 "
          initial={{ rotate: 12 }}
          animate={{ rotate: 372 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <motion.img
          src="/Rectangle 2780.svg"
          alt=""
          className="pointer-events-none absolute top-1/2 left-1/2 h-140 w-140 max-w-none -translate-x-1/2 -translate-y-1/2 "
          initial={{ rotate: 20 }}
          animate={{ rotate: 380 }}
          transition={{ duration: 66, repeat: Infinity, ease: "linear" }}
        />

        <div
          style={{ width: iconSize, height: iconSize }}
          className="relative z-10 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105"
        >
          <Image src={icon} alt={label} width={iconSize} height={iconSize} />
        </div>

        <div
          className={`absolute top-1/2 h-px rotate-[-35deg] bg-[#1A1B1C] ${
            isLeft ? "left-1/2 origin-left" : "right-1/2 origin-right"
          }`}
          style={{
            width: lineReach,
            maskImage: `linear-gradient(to ${isLeft ? "right" : "left"}, transparent ${iconSize / 2}px, black ${iconSize / 2}px)`,
            WebkitMaskImage: `linear-gradient(to ${isLeft ? "right" : "left"}, transparent ${iconSize / 2}px, black ${iconSize / 2}px)`,
          }}
        />
        <span
          className="absolute h-2 w-2 rounded-full border border-[#1A1B1C]"
          style={dotStyle}
        />

        <div className="absolute" style={textAnchorStyle}>
          <div
            className={`absolute top-0 text-sm font-normal whitespace-nowrap text-[#1A1B1C] ${
              isLeft ? "left-0 text-left" : "right-0 text-right"
            }`}
            style={{
              transform: isLeft
                ? "translateY(calc(-50% + 40px)) rotate(35deg)"
                : "translateY(calc(-50% - 40px)) rotate(35deg)",
            }}
          >
            <p>ALLOW A.I.</p>
            <p>{label}</p>
          </div>
        </div>
      </button>
    </>
  );
}

function CameraAuthPopup({
  onAllow,
  onDeny,
}: {
  onAllow: () => void;
  onDeny: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed top-1/2 left-6 right-6 z-20 -translate-y-1/2 bg-[#1A1B1C] text-[#FCFCFC] xl:absolute xl:left-full xl:right-auto xl:ml-12 xl:w-125 xl:translate-y-[-35%]"
    >
      <p className="px-8 pt-8 pb-10 text-sm font-semibold tracking-wide uppercase">
        Allow A.I. to access your camera
      </p>
      <div className="flex items-center justify-end gap-8 border-t border-white/20 px-8 py-5 text-sm font-semibold">
        <button
          onClick={onDeny}
          className="cursor-pointer text-white/40 duration-200 hover:text-white/70"
        >
          DENY
        </button>
        <button onClick={onAllow} className="cursor-pointer duration-200 hover:opacity-70">
          ALLOW
        </button>
      </div>
    </motion.div>
  );
}

export default function SelfiePage() {
  const router = useRouter();
  const photoUploadRef = useRef<PhotoUploadHandle>(null);
  const setResult = useAnalysisStore((state) => state.setResult);

  const [step, setStep] = useState<
    "select" | "camera" | "preview" | "processing"
  >("select");
  const [showCameraAuth, setShowCameraAuth] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [captureSource, setCaptureSource] = useState<"camera" | "gallery" | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"loading" | "done">(
    "loading",
  );

  const submitPhaseTwo = async () => {
    if (!image) return;
    setStep("processing");
    setSubmitStatus("loading");

    // Skinstric API wants raw base64 — strip the data URL prefix
    const base64 = image.split(",")[1];

    const minDelay = new Promise((resolve) =>
      setTimeout(resolve, MIN_PROCESSING_MS),
    );
    const request = fetch(PHASE_TWO_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 }),
    }).then((res) => res.json());

    const [demographics] = await Promise.all([request, minDelay]);
    setResult(image, demographics);
    setSubmitStatus("done");
  };

  if (step === "processing") {
    return (
      <Processing
        status={submitStatus}
        onBack={() => setStep("preview")}
        onProceed={() => router.push("/analysis")}
      />
    );
  }

  if (step === "camera") {
    return (
      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <p className="absolute top-0 left-8 z-10 text-sm font-semibold tracking-wide text-[#1A1B1C]">
          TO START ANALYSIS
        </p>
        <CameraCapture
          onCapture={(base64) => {
            setError(null);
            setCaptureSource("camera");
            setImage(base64);
            setStep("preview");
          }}
          onError={(message) => {
            setError(message);
            setStep("select");
          }}
        />
        <BackButton onClick={() => setStep("select")} />
      </main>
    );
  }

  if (step === "preview" && image && captureSource === "camera") {
    return (
      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <p className="absolute top-0 left-8 z-10 text-sm font-semibold tracking-wide text-[#1A1B1C]">
          TO START ANALYSIS
        </p>
        <img
          src={image}
          alt="Captured selfie preview"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <p className="absolute top-24 left-1/2 -translate-x-1/2 text-sm font-semibold tracking-wide text-white">
          GREAT SHOT!
        </p>
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
          <CameraTips light />
        </div>
        <BackButton
          onClick={() => {
            setImage(null);
            setStep("select");
          }}
        />
        <ProceedButton onClick={submitPhaseTwo} />
      </main>
    );
  }

  if (step === "preview" && image) {
    return (
      <DiamondScreen
        onBack={() => {
          setImage(null);
          setStep("select");
        }}
      >
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={image}
            alt="Selected photo preview"
            className="h-64 w-64 rounded-full object-cover"
          />
        </div>
        <ProceedButton onClick={submitPhaseTwo} />
      </DiamondScreen>
    );
  }

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 overflow-hidden px-8 py-24 sm:gap-16 xl:flex-row xl:gap-100 xl:py-8">
      <p className="absolute top-0 left-8 text-sm font-semibold tracking-wide text-[#1A1B1C]">
        TO START ANALYSIS
      </p>

      <PhotoUpload
        ref={photoUploadRef}
        onSelect={(base64) => {
          setError(null);
          setCaptureSource("gallery");
          setImage(base64);
          setStep("preview");
        }}
        onError={setError}
      />

      <div className="relative">
        <CaptureOption
          side="left"
          icon="/camera.svg"
          iconSize={136}
          label="TO SCAN YOUR FACE"
          onClick={() => setShowCameraAuth(true)}
        />

        <AnimatePresence>
          {showCameraAuth && (
            <CameraAuthPopup
              onAllow={() => {
                setShowCameraAuth(false);
                setStep("camera");
              }}
              onDeny={() => setShowCameraAuth(false)}
            />
          )}
        </AnimatePresence>
      </div>

      <CaptureOption
        side="right"
        icon="/gallery-icon2.svg"
        iconSize={136}
        label="ACCESS GALLERY"
        onClick={() => photoUploadRef.current?.open()}
      />

      {error && (
        <p className="absolute bottom-20 left-1/2 -translate-x-1/2 text-sm text-red-600">
          {error}
        </p>
      )}

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
