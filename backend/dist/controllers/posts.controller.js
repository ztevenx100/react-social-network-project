"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const client_1 = __importDefault(require("../lib/client"));
const createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user?.userId;
    if (!title || !content) {
        return res.status(400).json({ message: 'El título y el contenido son requeridos' });
    }
    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    try {
        const newPost = await client_1.default.post.create({
            data: {
                title,
                content,
                authorId: userId,
            },
        });
        res.status(201).json(newPost);
    }
    catch (error) {
        console.error('Error al crear el post:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.createPost = createPost;
