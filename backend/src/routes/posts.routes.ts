import { Router, Request, Response } from 'express';

const router = Router();

// Obtener todos los posts
router.get('/', (req: Request, res: Response) => {
  // Lógica para obtener posts
  res.json({ posts: [] });
});

// Crear un nuevo post
router.post('/', (req: Request, res: Response) => {
  const { content } = req.body;
  // Lógica para crear un post
  res.status(201).json({ message: 'Post creado', post: { content } });
});

export default router;
