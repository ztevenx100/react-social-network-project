# ========= Etapa de Desarrollo =========
FROM node:20-slim AS development

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluidas las de desarrollo)
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

# Exponer el puerto de la aplicación
EXPOSE 3001

# Comando para iniciar el servidor en modo de desarrollo
CMD ["npm", "run", "dev"]

# ========= Etapa de Build (Construcción) =========
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./

# Instalar todas las dependencias para poder compilar
RUN npm install

COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

# Compilar el código de TypeScript a JavaScript
RUN npm run build

# ========= Etapa de Producción =========
FROM node:20-slim AS production

WORKDIR /app

# Copiar solo el package.json para instalar solo dependencias de producción
COPY package*.json ./

# Instalar solo las dependencias de producción
RUN npm install --omit=dev

# Copiar el código compilado desde la etapa de build
COPY --from=build /app/dist ./dist

# Copiar el schema de Prisma para que esté disponible en producción
COPY --from=build /app/prisma ./prisma

# Copiar el cliente de Prisma generado
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Exponer el puerto
EXPOSE 3001

# Comando para iniciar el servidor en producción
CMD ["npm", "run", "start"]
