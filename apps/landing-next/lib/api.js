const API_URL = process.env.API_URL || "http://localhost:3000/api";

/**
 * Trae la lista de cursos desde el backend.
 * El backend responde: { status, results, data: [...] }
 * SSR puro: sin cache, siempre datos frescos en cada request.
 */
export async function getCourses() {
  try {
    const res = await fetch(`${API_URL}/courses`, { cache: "no-store" });
    if (!res.ok) {
      return { courses: [], error: `El backend respondió con estado ${res.status}` };
    }
    const json = await res.json();
    return { courses: json.data ?? [], error: null };
  } catch (err) {
    return {
      courses: [],
      error:
        "No se pudo conectar con la API. Verifica que el backend esté corriendo en " +
        API_URL,
    };
  }
}

/**
 * Trae el detalle de un curso por id.
 */
export async function getCourseById(id) {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, { cache: "no-store" });
    if (!res.ok) {
      return { course: null, error: `El backend respondió con estado ${res.status}` };
    }
    const json = await res.json();
    return { course: json.data ?? null, error: null };
  } catch (err) {
    return {
      course: null,
      error:
        "No se pudo conectar con la API. Verifica que el backend esté corriendo en " +
        API_URL,
    };
  }
}
