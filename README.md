# 📚 Course App

Una aplicación web desarrollada en **Angular** para gestionar cursos de manera eficiente. Permite listar, crear, editar y visualizar el detalle de cada curso.

---

## 🗂 Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   └── services/
│   │       └── course.service.ts       # Servicio principal de cursos
│   ├── features/
│   │   ├── courses/
│   │   │   ├── course-detail/          # Vista de detalle del curso
│   │   │   ├── course-form/            # Formulario de creación/edición
│   │   │   └── course-list/            # Listado de cursos
│   │   └── home/
│   │       ├── home.ts
│   │       ├── home.html
│   │       └── home.css
│   └── shared/
│       ├── components/
│       │   ├── header/                 # Componente de cabecera
│       │   └── footer/                 # Componente de pie de página
│       └── models/
│           └── course.model.ts         # Modelo de datos Course
├── app.config.ts
└── app.css
```

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Herramienta | Versión recomendada |
|-------------|---------------------|
| Node.js     | >= 18.x             |
| npm         | >= 9.x              |
| Angular CLI | >= 17.x             |

Para instalar Angular CLI globalmente:

```bash
npm install -g @angular/cli
```

---

## 🚀 Instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/GustavoUT22/course-app
cd course-app
```

2. **Instala las dependencias:**

```bash
npm install
```

---

## ▶️ Ejecución

### Entorno de desarrollo

```bash
ng serve
```

La aplicación estará disponible en: [http://localhost:4200](http://localhost:4200)

Con recarga automática ante cualquier cambio en los archivos fuente.




## 🧩 Modelo de Datos

```typescript
// course.model.ts
export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: number;       // en horas
  category: string;
  createdAt: Date;
}
```

---

## 🛠️ Scripts Disponibles

| Comando              | Descripción                            |
|----------------------|----------------------------------------|
| `ng serve`           | Inicia el servidor de desarrollo       |

---

## 📁 Convenciones del Proyecto

- **Arquitectura**: Feature-based (módulos por funcionalidad)
- **Estilo**: CSS por componente (encapsulación de estilos)
- **Servicios**: Centralizados en `core/services/`
- **Modelos**: Interfaces TypeScript en `shared/models/`
- **Componentes compartidos**: En `shared/components/`

