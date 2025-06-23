import { Router, Request, Response } from 'express';
import { createPost } from '../controllers/posts.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Obtener todos los posts
router.get('/', (req: Request, res: Response) => {
  // Lógica para obtener posts
  res.json({ posts: [] });
});

// Crear un nuevo post (ruta protegida)
router.post('/', authMiddleware, createPost);

export default router;
