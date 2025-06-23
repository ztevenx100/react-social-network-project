import { Router } from 'express';
import {
  createPost,
  getAllPosts,
  likePost,
  deletePost,
} from '../controllers/posts.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Aplica el middleware de autenticación a TODAS las rutas de este archivo
router.use(authMiddleware);

// POST /api/posts -> Crear una nueva publicación
router.post('/', createPost);

// GET /api/posts -> Listar todas las publicaciones de otros usuarios
router.get('/', getAllPosts);

// PATCH /api/posts/:id/like -> Dar like a una publicación
router.patch('/:id/like', likePost);

// DELETE /api/posts/:id -> Eliminar una publicación
router.delete('/:id', deletePost);

export default router;
