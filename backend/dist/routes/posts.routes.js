"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Obtener todos los posts
router.get('/', (req, res) => {
    // Lógica para obtener posts
    res.json({ posts: [] });
});
// Crear un nuevo post (ruta protegida)
router.post('/', auth_middleware_1.authMiddleware, (req, res) => {
    const { content } = req.body;
    // Lógica para crear un post
    res.status(201).json({ message: 'Post creado', post: { content } });
});
exports.default = router;
