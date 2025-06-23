import { Router } from 'express';
import {
  createPost,
  getPosts,
  likePost,
} from '../controllers/posts.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Aplica el middleware de autenticación a TODAS las rutas de este archivo
router.use(authMiddleware);

// POST /api/posts -> Crear una nueva publicación
router.post('/', createPost);

// GET /api/posts -> Listar todas las publicaciones de otros usuarios
router.get('/', getPosts);

// PATCH /api/posts/:id/like -> Dar like a una publicación
router.patch('/:id/like', likePost);

export default router;
