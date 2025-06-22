# React Social Network Project

Este proyecto es una aplicación de red social desarrollada con una arquitectura moderna, separando el frontend y backend.

## Estructura del Proyecto

El proyecto está organizado en dos carpetas principales:

- `frontend/`: Aplicación cliente desarrollada con React, TypeScript y React Router
- `backend/`: API RESTful desarrollada con Node.js, Express y TypeScript

## Frontend

### Características

- Sistema de navegación con React Router
- Página de inicio (Home)
- Sistema de autenticación (Login)
- Perfiles de usuario
- Feed de noticias/publicaciones

### Estructura de rutas

- `/`: Página de inicio
- `/login`: Página de inicio de sesión
- `/profile`: Perfil de usuario
- `/feed`: Feed de publicaciones

### Tecnologías utilizadas

- React 18
- TypeScript
- React Router v6
- Vite (como herramienta de construcción)
- CSS para los estilos

### Instalación y ejecución (Frontend)

1. Navega a la carpeta frontend: `cd frontend`
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`

### Scripts disponibles (Frontend)

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa local de la versión de producción
- `npm run lint`: Ejecuta el linter
- `npm run format`: Formatea el código con Prettier

## Backend

### Características

- API RESTful
- Autenticación con JWT
- Base de datos con Prisma ORM
- Validación de datos

### Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- Prisma (ORM)
- JWT para autenticación

### Instalación y ejecución (Backend)

1. Navega a la carpeta backend: `cd backend`
2. Instala las dependencias: `npm install`
3. Configura las variables de entorno (crea un archivo `.env`)
4. Ejecuta las migraciones de la base de datos: `npx prisma migrate dev`
5. Inicia el servidor: `npm run dev`

### Scripts disponibles (Backend)

- `npm run dev`: Inicia el servidor de desarrollo con hot-reload
- `npm run build`: Compila el código TypeScript
- `npm start`: Inicia el servidor en modo producción
- `npm run lint`: Ejecuta el linter
- `npm run format`: Formatea el código con Prettier

## Desarrollo

Para trabajar en ambos servicios simultáneamente, se recomienda abrir dos terminales:
- Una para el frontend: `cd frontend && npm run dev`
- Otra para el backend: `cd backend && npm run dev`