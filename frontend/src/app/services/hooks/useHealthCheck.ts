"use client";

import { useEffect, useState } from "react";
import { getServerConfig } from "../config/config";

export default function useHealthCheck(intervalMs = 30000) {
  const [healthy, setHealthy] = useState(true);
  const { API_BASE_URL } = getServerConfig(); 
  const healthUrl = `${API_BASE_URL}health/`;

  async function check() {
    try {
      const res = await fetch(healthUrl, {
        cache: "no-store",
        redirect: "follow",
      });
      setHealthy(res.ok);
    } catch {
      setHealthy(false);
    }
  }

  useEffect(() => {
    check();
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, healthUrl]);

  return healthy;
}
