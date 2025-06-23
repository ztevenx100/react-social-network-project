"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware para parsear JSON
app.use(express_1.default.json());
// Rutas de la aplicación
app.use('/auth', auth_routes_1.default);
app.use('/posts', posts_routes_1.default);
// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('<h1>Bienvenido a la API del Social Network</h1>');
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
