"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Se crea una única instancia de PrismaClient.
// En desarrollo, se reutiliza la instancia existente para evitar crear múltiples conexiones a la base de datos.
const client = global.prisma || new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
// Si no estamos en producción, se asigna la instancia al objeto global.
if (process.env.NODE_ENV !== 'production') {
    global.prisma = client;
}
exports.default = client;
