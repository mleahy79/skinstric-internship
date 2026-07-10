"use client"

import { useEffect, useState } from "react"

export default function GridOverlay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return
        setVisible((prev) => !prev)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  if (process.env.NODE_ENV !== "development" || !visible) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-9999"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, rgba(255,0,0,0.15) 0 1px, transparent 1px 10px), repeating-linear-gradient(to bottom, rgba(255,0,0,0.15) 0 1px, transparent 1px 10px)",
      }}
    >
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-blue-500/50" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-blue-500/50" />
      <div className="fixed bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
        grid on — press &quot;g&quot; to toggle
      </div>
    </div>
  )
}
