import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, content } = req.body;
  const authorId = req.userId;

  if (!title || !content) {
    res.status(400).json({ message: 'El título y el contenido son requeridos' });
    return;
  }

  if (!authorId) {
    // Esta validación es una salvaguarda; el middleware ya debería haber prevenido esto.
    res.status(403).json({ message: 'Acción no permitida. Usuario no autenticado.' });
    return;
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: authorId,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
