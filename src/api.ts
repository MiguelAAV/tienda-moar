const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  // 👉 Añadir token JWT si existe
  const token = localStorage.getItem("token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Error HTTP ${res.status}`);
  }

  // No content
  if (res.status === 204) return null;

  return res.json();
}


