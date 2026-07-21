# EduTech — Landing (Next.js)

Vista pública de la plataforma de cursos. Muestra el catálogo de cursos
consumiendo la API del backend con **Server-Side Rendering** (fetch directo
en Server Components, sin cache: `cache: "no-store"`).

Sigue el mismo sistema de diseño que el prototipo HTML (`design/prototipo`)
y el panel Angular (`apps/admin-angular`): paleta azul/morado, tipografía
Segoe UI, componentes `.btn`, `.card`, `.badge`, etc.

## Instalación y ejecución (local)

```bash
cd apps/landing-next
npm install
cp .env.local.example .env.local     # ajusta API_URL si es necesario
npm run dev                          # http://localhost:3001 (o el puerto que asigne Next)
```

> Requisito: el backend debe estar corriendo (`cd backend && npm start`,
> por defecto en `http://localhost:3000`).

## Variables de entorno

| Variable  | Descripción                                   |
| --------- | ---------------------------------------------- |
| `API_URL` | Base de la API del backend, ej. `http://localhost:3000/api` |

## Rutas

| Ruta            | Descripción                                  |
| --------------- | --------------------------------------------- |
| `/`             | Home con hero + cursos destacados             |
| `/cursos`       | Catálogo completo de cursos                   |
| `/cursos/[id]`  | Detalle de un curso                           |

Todas usan `GET /api/courses` y `GET /api/courses/:id`, ambos públicos (no
requieren JWT).

## Despliegue

Pensado para Vercel. Configura la variable de entorno `API_URL` apuntando
a la URL de Render del backend en producción.
