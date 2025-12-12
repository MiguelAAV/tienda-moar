const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  //  Adjuntar token JWT si existe
  const token = localStorage.getItem("token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const textError = await res.text();
    throw new Error(textError || `Error HTTP ${res.status}`);
  }

  // No content (DELETE 204, etc.)
  if (res.status === 204) return null;

  //  Manejar respuestas sin JSON
  const text = await res.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    // Por si algún endpoint devuelve texto plano
    return text as unknown;
  }
}



