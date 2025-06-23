import { Response, Request } from 'express'; // <-- Añadir Request
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

// Modificar esta función para que acepte AuthRequest
export const getAllPosts = async (req: AuthRequest, res: Response) => { // <-- Corregido
  try {
    const posts = await client.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            name: true,
            lastname: true,
            alias: true,
          },
        },
      },
    });
    // Mapear para devolver un objeto más plano y con authorId
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      likes: post.likes,
      authorId: post.authorId,
      author: {
        name: post.author.name,
        lastname: post.author.lastname,
        alias: post.author.alias,
      }
    }));
    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las publicaciones' });
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
          increment: 1,
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

// Añadir esta nueva función al final del archivo
export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
  const postId = req.params.id;
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: 'No autorizado' });
    return;
  }

  try {
    // 1. Buscar el post para verificar el autor
    const post = await client.post.findUnique({
      where: { id: parseInt(postId, 10) },
    });

    if (!post) {
      res.status(404).json({ message: 'Publicación no encontrada' });
      return;
    }

    // 2. Verificar que el usuario es el autor del post
    if (post.authorId !== userId) {
      res.status(403).json({ message: 'No tienes permiso para eliminar esta publicación' });
      return;
    }

    // 3. Si todo es correcto, eliminar el post
    await client.post.delete({
      where: { id: parseInt(postId, 10) },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la publicación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Añadir esta nueva función
export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
  const postId = req.params.id;
  const userId = req.userId;
  const { title, content } = req.body;

  if (!userId) {
    res.status(401).json({ message: 'No autorizado' });
    return;
  }

  if (!title || !content) {
    res.status(400).json({ message: 'El título y el contenido son obligatorios' });
    return;
  }

  try {
    const post = await client.post.findUnique({
      where: { id: parseInt(postId, 10) },
    });

    if (!post) {
      res.status(404).json({ message: 'Publicación no encontrada' });
      return;
    }

    if (post.authorId !== userId) {
      res.status(403).json({ message: 'No tienes permiso para editar esta publicación' });
      return;
    }

    const updatedPost = await client.post.update({
      where: { id: parseInt(postId, 10) },
      data: { title, content },
      include: { // Devolvemos el post con los datos del autor para el frontend
        author: {
          select: { name: true, lastname: true, alias: true },
        },
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error al actualizar la publicación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
