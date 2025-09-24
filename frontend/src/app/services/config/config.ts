function logWithTime(...args: any[]) {
  console.log(new Date().toISOString(), "[config.ts]", ...args);
}

export function getServerConfig() {
  const API_BASE_URL = "http://nginx/hoboc/api/"; // API endpoints
  const MEDIA_STATIC_BASE_URL = "http://nginx/hoboc/"; // for media/static
  // const API_BASE_URL = "http://localhost/hoboc/api/";
  // const MEDIA_STATIC_BASE_URL = "http://localhost/hoboc/";

  const API_TOKEN = "c0881af7b46e2dc06f1ff49c2ff8472b9084e13e";
  const PUBLIC_SITE_FALLBACK = "http://localhost:3000";

  logWithTime("Loaded config:", {
    API_BASE_URL,
    MEDIA_STATIC_BASE_URL,
    API_TOKEN: API_TOKEN.slice(0, 6) + "...",
    PUBLIC_SITE_FALLBACK,
  });

  return {
    API_BASE_URL,
    MEDIA_STATIC_BASE_URL,
    API_TOKEN,
    PUBLIC_SITE_FALLBACK,
  };
}
