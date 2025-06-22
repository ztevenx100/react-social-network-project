import { PrismaClient } from '@prisma/client';

// Declaración para extender el objeto global de Node.js
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Se crea una única instancia de PrismaClient.
// En desarrollo, se reutiliza la instancia existente para evitar crear múltiples conexiones a la base de datos.
const client = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Si no estamos en producción, se asigna la instancia al objeto global.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = client;
}

export default client;
