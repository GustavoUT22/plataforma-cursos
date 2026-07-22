# Plataforma de Gestión de Cursos e Inscripciones

Proyecto integrador full stack del curso **Programación Web II (ISIL)**. Permite el
registro e inicio de sesión de usuarios, consulta de cursos, inscripción de estudiantes,
visualización de inscripciones y administración de cursos y usuarios, con autenticación
por JWT y roles (administrador, docente, estudiante).

## Problema y objetivo

La gestión de cursos e inscripciones suele hacerse con procesos fragmentados. Esta
plataforma centraliza la oferta académica y el flujo de inscripción de principio a fin,
integrando frontend, backend, base de datos, autenticación y despliegue en la nube.

## Arquitectura

Monorepo con las siguientes piezas:

```
plataforma-cursos/
├── backend/              API REST — Node.js + Express + MongoDB (Mongoose) + JWT
├── apps/
│   ├── admin-angular/    Panel administrativo — Angular
│   ├── portal-react/     Portal del estudiante — React (consume la API)
│   └── landing-next/     Vista pública — Next.js (SSR/SSG)             [en progreso]
├── design/               Prototipo HTML/CSS de referencia
└── docs/                 Documentación técnica
```

- **Backend:** desplegado en **Render**.
- **Frontends:** desplegados en **Vercel**.
- **Base de datos:** **MongoDB Atlas**.

## Tecnologías

TypeScript · Angular · React · Next.js · Node.js · Express · MongoDB · Mongoose · JWT ·
bcrypt · Helmet · CORS.

## URLs desplegadas

| App | URL |
|-----|-----|
| API (Render) | https://plataforma-cursos-4ipc.onrender.com |
| Panel Angular (Vercel) | https://plataforma-cursos-qtmu.vercel.app/login |
| Portal React (Vercel) | https://plataforma-cursos-dy3q.vercel.app/ |
| Landing Next.js (Vercel) | _pendiente de completar_ |

Base de la API para los frontends: `https://plataforma-cursos-4ipc.onrender.com/api`

> El plan gratuito de Render suspende el servicio tras 15 minutos sin tráfico. La
> primera petición después de ese tiempo puede tardar ~50 segundos en responder
> mientras el servicio despierta; no es un error.

## Video de sustentación

_Enlace de YouTube: pendiente de completar._

## Integrantes

| Integrante | Aporte principal |
|------------|------------------|
| _Nombre 1_ | Backend + despliegue (Render/Atlas) |
| _Nombre 2_ | Panel Angular |
| Diego Alonso Josue García Díaz | Portal React |
| _Nombre 4_ | Landing Next.js + documentación |

---

## Credenciales de prueba

> Se generan al ejecutar la semilla (`pnpm seed` en `backend/`). No son secretos reales.

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | `admin@test.com` | `admin123` |
| Docente | `docente@test.com` | `docente123` |
| Estudiante | `estudiante@test.com` | `estudiante123` |

La semilla también crea 3 cursos de ejemplo y una inscripción del estudiante al primer curso.

---

## Instalación y ejecución (local)

> **Gestor de paquetes: `pnpm`** (v11+). Todos los proyectos del monorepo lo usan —
> no mezcles `npm install`, generaría un `package-lock.json` que no debe subirse.
> Instalación: `npm install -g pnpm` o `corepack enable`.

### Backend

```bash
cd backend
pnpm install
cp .env.example .env      # y completa MONGO_URI y JWT_SECRET
pnpm seed              # carga usuarios y cursos de prueba (opcional)
pnpm start                 # API en http://localhost:3000
```

Variables de entorno (ver `backend/.env.example`):

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto de la API (por defecto 3000) |
| `MONGO_URI` | Cadena de conexión a MongoDB Atlas |
| `JWT_SECRET` | Clave para firmar los JWT |
| `CORS_ORIGINS` | URLs de los frontends permitidas, separadas por coma |

### Panel Angular

```bash
cd apps/admin-angular
pnpm install
cp .env.example .env      # y ajusta NG_APP_API_URL si hace falta
pnpm start                 # http://localhost:4200
```

La URL de la API se lee de un `.env` mediante `@ngx-env/builder`. Las variables
deben llevar el prefijo `NG_APP_` para exponerse al cliente.

| Variable | Descripción |
|----------|-------------|
| `NG_APP_API_URL` | URL base de la API (por defecto `http://localhost:3000/api`) |

En producción (Vercel) define `NG_APP_API_URL` con la URL de Render.

### Portal React (estudiante)

```bash
cd apps/portal-react
pnpm install
cp .env.example .env      # y ajusta VITE_API_URL si hace falta
pnpm dev                   # http://localhost:5173
```

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base de la API (por defecto `http://localhost:3000/api`) |

El catálogo de cursos y las inscripciones del estudiante se cargan desde la API.
Para ver las inscripciones propias debe existir un token de estudiante en
`localStorage` (clave `token`).

### Landing Next.js

```bash
cd apps/landing-next
pnpm install
cp .env.local.example .env.local   # y ajusta API_URL si hace falta
pnpm dev                            # http://localhost:3000
```

---

## Endpoints de la API

Base: `/api`

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| POST | `/register` | Público | Registrar usuario (siempre como `student`) |
| POST | `/login` | Público | Iniciar sesión, devuelve JWT |
| GET | `/users` | Admin | Listar usuarios |
| GET | `/courses` | Público | Listar cursos |
| GET | `/courses/:id` | Público | Detalle de un curso |
| POST | `/courses` | Admin | Crear curso |
| PUT | `/courses/:id` | Admin | Actualizar curso |
| DELETE | `/courses/:id` | Admin | Eliminar curso |
| POST | `/enrollments` | Estudiante | Inscribirse a un curso |
| POST | `/enrollments/admin` | Admin | Inscribir a un estudiante en un curso (`studentId`, `courseId`) |
| GET | `/enrollments/me` | Estudiante | Ver mis inscripciones |
| GET | `/enrollments/student/:studentId` | Admin / Docente | Ver inscripciones de un estudiante |

Autenticación: enviar el header `Authorization: Bearer <token>`.

## Seguridad

- Contraseñas cifradas con **bcrypt**.
- Autenticación con **JWT** y autorización por **roles**.
- **Helmet** para cabeceras HTTP seguras.
- **CORS restringido** a los orígenes definidos en `CORS_ORIGINS`.
- El registro público fuerza el rol `student` (no permite crear administradores).
- Secretos fuera del repositorio: `.env` ignorado, se entrega `.env.example`.

## Documentación técnica

Ver la carpeta [`/docs`](./docs): estructura del proyecto, alcance, historias de usuario,
modelo de datos, endpoints y checklist de seguridad.
