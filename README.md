# React Social Network Project
## Pruebas técnicas - Periferia IT Group
Autor: Pedro Castiblanco

Este proyecto es una aplicación full-stack de una red social simple, diseñada con una arquitectura moderna y desacoplada de cliente-servidor.

## Core Technologies

- **Frontend:** React, TypeScript, Vite, React Router, Zustand
- **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Containerization:** Docker, Docker Compose

## Arquitectura del Proyecto

El proyecto sigue un modelo cliente-servidor:

-   **`frontend/`**: Una Single Page Application (SPA) desarrollada con React que consume la API del backend. Se encarga de toda la lógica de la interfaz de usuario y la interacción con el usuario.
-   **`backend/`**: Una API RESTful desarrollada con Node.js y Express. Gestiona la lógica de negocio, la autenticación de usuarios y la comunicación con la base de datos PostgreSQL.

## Getting Started

A continuación se describen los pasos para levantar el proyecto completo.

### Prerrequisitos

-   Node.js (v18 o superior)
-   Docker y Docker Compose

### 1. Método Recomendado: Usando Docker Compose

Este es el método más sencillo para levantar toda la aplicación, ya que gestiona la base de datos, el backend y el frontend automáticamente.

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL-DEL-REPOSITORIO>
    cd react-social-network-project
    ```

2.  **Crear el archivo de variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto copiando el archivo de ejemplo `.env.example` y llenando los valores.
    ```bash
    cp .env.example .env
    ```

3.  **Levantar los servicios:**
    Este comando construirá las imágenes y levantará los tres contenedores (db, backend, frontend).
    ```bash
    docker-compose up --build
    ```

La aplicación estará disponible en:
-   **Frontend:** `http://localhost:3000`
-   **Backend:** `http://localhost:3001`

### 2. Método Alternativo: Ejecución Local (Manual)

Si prefieres no usar Docker, puedes ejecutar cada servicio por separado.

#### Backend Setup

1.  Navega a la carpeta del backend: `cd backend`
2.  Instala las dependencias: `npm install`
3.  Crea un archivo `.env` con las variables de entorno (puedes usar el `.env.example` como guía).
4.  Asegúrate de tener una instancia de PostgreSQL corriendo y que la `DATABASE_URL` en tu `.env` apunte a ella.
5.  Ejecuta las migraciones de la base de datos: `npx prisma migrate dev`
6.  Inicia el servidor de desarrollo: `npm run dev`

#### Frontend Setup

1.  En otra terminal, navega a la carpeta del frontend: `cd frontend`
2.  Instala las dependencias: `npm install`
3.  Inicia el servidor de desarrollo: `npm run dev`

## Estructura de Carpetas

```
.
├── backend/         # Código fuente de la API (Node.js)
│   ├── prisma/
│   └── src/
├── frontend/        # Código fuente de la App (React)
│   └── src/
├── .env.example     # Ejemplo de variables de entorno
├── .gitignore
├── docker-compose.yml # Orquestación de los servicios
└── README.md
```

## API Endpoints Principales

La API base se encuentra en `/api`.

| Método  | Endpoint              | Descripción                                     | Requiere Auth |
| :------ | :-------------------- | :---------------------------------------------- | :------------ |
| `POST`  | `/auth/register`      | Registra un nuevo usuario.                      | No            |
| `POST`  | `/auth/login`         | Inicia sesión y devuelve un token JWT.          | No            |
| `GET`   | `/auth/profile`       | Obtiene el perfil del usuario autenticado.      | Sí            |
| `GET`   | `/posts`              | Obtiene todas las publicaciones.                | Sí            |
| `POST`  | `/posts`              | Crea una nueva publicación.                     | Sí            |
| `PATCH` | `/posts/:id/like`     | Incrementa los "me gusta" de una publicación.   | Sí            |
| `PATCH` | `/posts/:id`          | Edita una publicación propia.                   | Sí            |
| `DELETE`| `/posts/:id`          | Elimina una publicación propia.                 | Sí            |

## Scripts Disponibles

### Frontend (`/frontend`)

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Construye la aplicación para producción.
-   `npm run lint`: Ejecuta el linter para detectar errores.

### Backend (`/backend`)

-   `npm run dev`: Inicia el servidor de desarrollo con hot-reload.
-   `npm start`: Inicia el servidor en modo producción (requiere `npm run build` primero).
-   `npm run lint`: Ejecuta el linter para detectar errores.
-   `npm test`: Ejecuta las pruebas automatizadas con Jest.

### Configuración Adicional

Para la configuración de TypeScript, Prisma y otras herramientas, consulta los archivos de configuración en las carpetas `backend` y `frontend`. Asegúrate de tener instaladas las dependencias necesarias globalmente si deseas ejecutar comandos como `ts-node` o `prisma` desde la línea de comandos.

#### Ejemplo de configuración de `package.json` en el backend:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "src/index.ts",
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint . --ext .ts",
    "test": "jest"
  },
  "dependencies": {
    "@prisma/client": "^3.6.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "nodemailer": "^6.4.11",
    "reflect-metadata": "^0.1.13",
    "typeorm": "^0.2.34"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/cors": "^2.8.12",
    "@types/dotenv": "^10.0.3",
    "@types/jest": "^27.0.2",
    "@types/node": "^16.11.7",
    "jest": "^27.0.6",
    "nodemon": "^3.1.9",
    "ts-node": "^10.4.0",
    "ts-node-dev": "^1.1.8",
    "typescript": "^4.5.4"
  }
}
```
