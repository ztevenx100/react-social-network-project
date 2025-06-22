import { Response } from 'express';
import client from '../lib/client';
import { AuthRequest } from '../middleware/auth.middleware';

export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  const userId = req.user?.userId;

  if (!title || !content) {
    return res.status(400).json({ message: 'El título y el contenido son requeridos' });
  }

  if (!userId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  try {
    const newPost = await client.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
