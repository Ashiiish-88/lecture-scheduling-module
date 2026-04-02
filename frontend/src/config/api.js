const rawApiBase = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").trim();

const withProtocol = (() => {
  if (rawApiBase.startsWith("http://") || rawApiBase.startsWith("https://")) {
    return rawApiBase;
  }

  if (rawApiBase.startsWith("localhost") || rawApiBase.startsWith("127.0.0.1")) {
    return `http://${rawApiBase}`;
  }

  return `https://${rawApiBase}`;
})();

export const API_BASE = withProtocol.replace(/\/+$/, "");
