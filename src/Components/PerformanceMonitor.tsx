"use client";

import { useEffect, useRef, useState } from "react";

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(0);
  const [heapUsed, setHeapUsed] = useState<number | null>(null);
  const [heapLimit, setHeapLimit] = useState<number | null>(null);

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const scrollEvents = useRef(0);

  // ==========================================================================
  // FPS MONITOR
  // ==========================================================================
  useEffect(() => {
    let rafId: number;

    const updateFPS = () => {
      frameCount.current++;
      const now = performance.now();
      const elapsed = now - lastTime.current;

      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCount.current * 1000) / elapsed);
        setFps(currentFps);

        // Log with purple color distinct from timeline
        const color = currentFps < 30 ? "color:#ff4d4d" : "color:#b47bff";
        console.log(`%c🌐 [GLOBAL PERF] FPS: ${currentFps}`, color);

        if (currentFps < 30) {
          console.warn("⚠️ Low FPS detected. Check animations or heavy effects.");
        }

        frameCount.current = 0;
        lastTime.current = now;
      }

      rafId = requestAnimationFrame(updateFPS);
    };

    rafId = requestAnimationFrame(updateFPS);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ==========================================================================
  // MEMORY MONITOR
  // ==========================================================================
  useEffect(() => {
    if (!("memory" in performance)) return;

    const checkMemory = setInterval(() => {
      // @ts-ignore
      const memory = performance.memory;
      setHeapUsed(memory.usedJSHeapSize);
      setHeapLimit(memory.jsHeapSizeLimit);

      const usage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
      console.log(
        "%c🌐 [GLOBAL PERF] Memory:",
        "color:#b47bff",
        `${(memory.usedJSHeapSize / 1048576).toFixed(1)} MB / ${(memory.jsHeapSizeLimit / 1048576).toFixed(1)} MB`
      );

      if (usage > 0.9) {
        console.warn("🚨 High memory usage — consider reducing active animations or 3D effects.");
      }
    }, 5000);

    return () => clearInterval(checkMemory);
  }, []);

  // ==========================================================================
  // SCROLL EVENT MONITOR
  // ==========================================================================
  useEffect(() => {
    const handleScroll = () => {
      scrollEvents.current++;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const interval = setInterval(() => {
      if (scrollEvents.current > 0) {
        console.log(
          "%c🌐 [GLOBAL PERF] Scroll events:",
          "color:#b47bff",
          scrollEvents.current
        );
        scrollEvents.current = 0;
      }
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  // ==========================================================================
  // VISUAL OVERLAY
  // ==========================================================================
  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        left: 10,
        zIndex: 99999,
        background: "rgba(30, 0, 60, 0.8)",
        border: "1px solid #b47bff",
        borderRadius: 6,
        color: "#b47bff",
        fontFamily: "monospace",
        fontSize: 13,
        padding: "8px 12px",
        boxShadow: "0 0 10px #a970ff80",
        pointerEvents: "none",
      }}
    >
      <div>🌐 <b>GLOBAL PERF</b></div>
      <div>FPS: {fps}</div>
      {heapUsed && heapLimit && (
        <div>
          MEM: {(heapUsed / 1048576).toFixed(1)} /{" "}
          {(heapLimit / 1048576).toFixed(1)} MB
        </div>
      )}
    </div>
  );
}
