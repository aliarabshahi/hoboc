export function getServerConfig() {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhostt/hoboc/api/";

  const MEDIA_STATIC_BASE_URL =
    process.env.NEXT_PUBLIC_MEDIA_STATIC_BASE_URL || "http://localhostt/hoboc/";

  const API_TOKEN =
    process.env.NEXT_PUBLIC_API_TOKEN || "";

  const PUBLIC_SITE_FALLBACK =
    process.env.NEXT_PUBLIC_SITE_FALLBACK || "http://localhost:3000";

  return {
    API_BASE_URL,
    MEDIA_STATIC_BASE_URL,
    API_TOKEN,
    PUBLIC_SITE_FALLBACK,
  };
}
