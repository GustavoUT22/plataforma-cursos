# Gestión de Cursos e Inscripciones

API REST desarrollada con Node.js, Express y MongoDB para administrar usuarios, cursos e inscripciones académicas con autenticación JWT.
---

##  Tecnologías utilizadas

- **Node.js** — Entorno de ejecución
- **Express** — Framework HTTP
- **MongoDB** — Base de datos NoSQL
- **Mongoose** — ODM para MongoDB
- **JWT (jsonwebtoken)** — Autenticación con tokens
- **bcryptjs** — Encriptación de contraseñas
- **dotenv** — Variables de entorno
- **cors** — Configuración de CORS
- **helmet** — Seguridad HTTP
- **Docker** — Contenedor de MongoDB

---

##  Estructura del proyecto

```
courses-management/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   └── enrollmentController.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Course.model.js
│   │   └── Enrollment.model.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   └── enrollmentRoutes.js
│   ├── utils/
│   │   └── rolesAvailable.js
│   └── app.js
├── .env
├── .gitignore
└── package.json
```

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/GustavoUT22/Gestion-de-Cursos-e-Inscripciones
cd Gestion-de-Cursos-e-Inscripciones
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/gestion_cursos
JWT_SECRET=una_clave_secreta_muy_larga_y_segura
```


### 4. Ejecutar el servidor

```bash
node src/app.js | npm start
```

El servidor estará disponible en `http://localhost:3000`

---
