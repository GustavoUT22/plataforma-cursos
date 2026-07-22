// Capa de acceso a la API REST del backend.
// La URL base se toma de la variable de entorno VITE_API_URL (ver .env.example).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// El token JWT del estudiante se guarda en localStorage tras iniciar sesión.
export function getToken() {
  return localStorage.getItem("token");
}

async function request(path, { auth = false } = {}) {
  const headers = {};
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, { headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Error ${res.status}`);
  }
  return res.json();
}

// GET /courses (público)
export async function getCourses() {
  const json = await request("/courses");
  return json.data || [];
}

// GET /enrollments/me (requiere token de estudiante)
export async function getMyEnrollments() {
  const json = await request("/enrollments/me", { auth: true });
  return json.data || [];
}
