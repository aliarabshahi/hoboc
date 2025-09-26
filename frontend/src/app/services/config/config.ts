function logWithTime(...args: any[]) {
  console.log(new Date().toISOString(), "[config.ts]", ...args);
}

export function getServerConfig() {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhostt/hoboc/api/";

  const MEDIA_STATIC_BASE_URL =
    process.env.NEXT_PUBLIC_MEDIA_STATIC_BASE_URL || "http://localhostt/hoboc/";

  const API_TOKEN =
    process.env.NEXT_PUBLIC_API_TOKEN || "";

  const PUBLIC_SITE_FALLBACK =
    process.env.NEXT_PUBLIC_SITE_FALLBACK || "http://localhost:3000";

  logWithTime("Loaded config:", {
    API_BASE_URL,
    MEDIA_STATIC_BASE_URL,
    API_TOKEN: API_TOKEN ? API_TOKEN.slice(0, 6) + "..." : "undefined",
    PUBLIC_SITE_FALLBACK,
  });

  return {
    API_BASE_URL,
    MEDIA_STATIC_BASE_URL,
    API_TOKEN,
    PUBLIC_SITE_FALLBACK,
  };
}
