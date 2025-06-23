import { Response } from 'express';
import client from '../lib/client';
import { AuthRequest } from '../middleware/auth.middleware';

// 1. Crear una nueva publicación
export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, content } = req.body;
  const authorId = req.userId; // Obtenido del middleware de autenticación

  if (!title || !content) {
    res.status(400).json({ message: 'El título y el contenido son requeridos' });
    return;
  }

  if (!authorId) {
    // Esta validación es una salvaguarda; el middleware ya debería haber prevenido esto.
    res.status(403).json({ message: 'Acción no autorizada, ID de usuario no encontrado' });
    return;
  }

  try {
    const newPost = await client.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// 2. Listar todas las publicaciones (excluyendo las del propio usuario)
export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId;

  try {
    const posts = await client.post.findMany({
      where: {
        authorId: {
          not: userId, // Excluir los posts del usuario actual
        },
      },
      include: {
        author: {
          select: { // Seleccionar solo los campos públicos del autor
            alias: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Mostrar los más recientes primero
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// 3. Incrementar el contador de likes de una publicación
export const likePost = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params; // ID de la publicación

  try {
    const updatedPost = await client.post.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        likes: {
          increment: 1, // Incrementar el campo 'likes' en 1
        },
      },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error al dar like a la publicación:', error);
    // Manejar el caso en que el post no se encuentre (código de error de Prisma)
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: unknown }).code === 'P2025') {
      res.status(404).json({ message: 'Publicación no encontrada' });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};
