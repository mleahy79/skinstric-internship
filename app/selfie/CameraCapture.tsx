"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CameraTips } from "../../components/phase-one/CameraTips";

interface CameraCaptureProps {
  onCapture: (base64DataUrl: string) => void;
  onError: (message: string) => void;
}

export default function CameraCapture({
  onCapture,
  onError,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => onError("Camera access was denied"));

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [onError]);

  const capture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // mirror so the capture matches the mirrored live preview
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    onCapture(canvas.toDataURL("image/png"));
  };

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        onLoadedMetadata={() => setReady(true)}
        className={`h-full w-full -scale-x-100 object-cover transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />

      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-white">
          <div className="relative h-191 w-191">
            <motion.img
              src="/Rectangle 2778 (1).svg"
              alt=""
              className="pointer-events-none absolute top-1/2 left-1/2 h-151 w-151 max-w-none -translate-x-1/2 -translate-y-1/2"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            />
            <motion.img
              src="/Rectangle 2779 (1).svg"
              alt=""
              className="pointer-events-none absolute top-1/2 left-1/2 h-171 w-171 max-w-none -translate-x-1/2 -translate-y-1/2"
              initial={{ rotate: 12 }}
              animate={{ rotate: 372 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.img
              src="/Rectangle 2780.svg"
              alt=""
              className="pointer-events-none absolute top-1/2 left-1/2 h-191 w-191 max-w-none -translate-x-1/2 -translate-y-1/2"
              initial={{ rotate: 20 }}
              animate={{ rotate: 380 }}
              transition={{ duration: 66, repeat: Infinity, ease: "linear" }}
            />
            <Image
              src="/camera.svg"
              alt=""
              width={136}
              height={136}
              className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <p className="text-sm font-semibold tracking-wide text-[#1A1B1C]">
            SETTING UP CAMERA ...
          </p>
          <CameraTips />
        </div>
      )}

      {ready && (
        <>
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
            <CameraTips light />
          </div>
          <button
            onClick={capture}
            className="group absolute top-1/2 right-8 -translate-y-1/2 inline-flex cursor-pointer items-center gap-4 text-sm font-semibold text-white"
          >
            CAPTURE
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white duration-300 group-hover:scale-105">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 5.5L9.5 4H14.5L15.5 5.5H18.5C19.6046 5.5 20.5 6.39543 20.5 7.5V17C20.5 18.1046 19.6046 19 18.5 19H5.5C4.39543 19 3.5 18.1046 3.5 17V7.5C3.5 6.39543 4.39543 5.5 5.5 5.5H8.5Z"
                  stroke="#1A1B1C"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12.5" r="3.5" stroke="#1A1B1C" strokeWidth="1.5" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
}
