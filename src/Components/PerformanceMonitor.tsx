// components/PerformanceMonitor.tsx
"use client";

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Clear animations when memory pressure high
    if ('memory' in performance) {
      const checkMemory = setInterval(() => {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
          console.warn('High memory usage - consider reducing animations');
        }
      }, 5000);
      
      return () => clearInterval(checkMemory);
    }
  }, []);
  
  return null;
}