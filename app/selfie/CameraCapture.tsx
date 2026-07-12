"use client";

import Image from "next/image";
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
          <div className="flex h-24 w-24 rotate-45 items-center justify-center border border-[#1A1B1C]">
            <Image
              src="/camera.svg"
              alt=""
              width={40}
              height={40}
              className="-rotate-45"
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
            className="group absolute right-8 bottom-8 inline-flex cursor-pointer items-center gap-4 text-sm font-semibold text-white"
          >
            CAPTURE
            <span className="relative flex h-7.5 w-7.5 items-center justify-center duration-300 group-hover:scale-105">
              <span className="absolute inset-0 rotate-45 border border-solid border-white duration-300 group-hover:scale-110" />
              <span className="h-0 w-0 border-y-[6px] border-l-8 border-y-transparent border-l-white duration-300 group-hover:scale-105" />
            </span>
          </button>
        </>
      )}
    </div>
  );
}
