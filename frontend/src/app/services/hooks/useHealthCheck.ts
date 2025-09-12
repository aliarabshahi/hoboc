"use client";

import { useEffect, useState } from "react";

/** Client-side hook to periodically check backend health status */
export default function useHealthCheck(intervalMs = 30000) {
  const [healthy, setHealthy] = useState(true);

  // Perform one health check
  async function check() {
    try {
      const res = await fetch("http://localhost/hoboc/api/health/", {
        cache: "no-store", // Always fetch fresh health status
      });
      setHealthy(res.ok);
    } catch {
      setHealthy(false);
    }
  }

  useEffect(() => {
    check(); // Run on mount
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id); // Clean up interval on unmount
  }, [intervalMs]); // ✅ added intervalMs to deps

  return healthy;
}
