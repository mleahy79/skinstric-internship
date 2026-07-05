"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BASE_SHIFT = 320;

export default function Home() {
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

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center">
      <Image
        src="/Rectangle 2779.svg"
        alt=""
        width={302}
        height={604}
        priority
        className="pointer-events-none select-none absolute left-0.5 top-[calc(50%-10px)] -translate-y-1/2"
      />
      <Image
        src="/Rectangle 2778.svg"
        alt=""
        width={302}
        height={604}
        className="pointer-events-none select-none absolute right-0.5 top-[calc(50%-10px)] -translate-y-1/2"
      />
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-2"
        onMouseEnter={() => setHoverSide("left")}
        onMouseLeave={() => setHoverSide(null)}
      >
        <Image src="/buttin-icon-shrunk-l.svg" alt="" width={44} height={44} />
        <span className="text-sm font-semibold tracking-wide">
          DISCOVER A.I.
        </span>
      </div>
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2"
        onMouseEnter={() => setHoverSide("right")}
        onMouseLeave={() => setHoverSide(null)}
      >
        <span className="text-sm font-semibold tracking-wide">TAKE TEST</span>
        <Image src="/buttin-icon-r.svg" alt="" width={44} height={44} />
      </div>
      <div className="px-8 text-center">
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
    </main>
  );
}
