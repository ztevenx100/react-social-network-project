import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import './Feed.css';
import { useAuthStore } from '../../store/auth.store';

// Interfaces para tipar los datos que vienen del backend
interface Author {
  name: string;
  lastname: string;
  alias?: string;
}

interface Post {
  id: string; // El ID de Prisma (cuid) es un string
  title: string;
  content: string;
  author: Author;
  likes: number;
  createdAt?: string; // Añadimos la fecha de creación (opcional)
  authorId: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const { token, user } = useAuthStore();

  // --- Estados para el modal de edición ---
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  // -----------------------------------------

  // Obtener los posts del backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<Post[]>('/posts');
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar las publicaciones.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Función para dar like a un post
  const handleLike = async (postId: string) => {
    try {
      const response = await apiClient.patch<Post>(`/posts/${postId}/like`);
      // Actualizar el estado local con el nuevo número de likes
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, likes: response.data.likes } : post
      ));
    } catch (err) {
      console.error('Error al dar like:', err);
    }
  };

  // Función para crear un nuevo post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert('El título y el contenido no pueden estar vacíos.');
      return;
    }
    
    try {
      setLoading(true);
      
      // Enviar la solicitud y usar la respuesta
      const createResponse = await apiClient.post<Post>('/posts', {
        title: newPostTitle,
        content: newPostContent,
      });
      
      // Añadir el nuevo post (que viene en la respuesta) al principio de la lista
      setPosts(currentPosts => [createResponse.data, ...currentPosts]);
      
      // Limpiar el formulario
      setNewPostTitle('');
      setNewPostContent('');
      
    } catch (err: unknown) {
      // Manejo de errores mejorado
      console.error('Error al crear la publicación:', err);
      
      let errorMessage = 'Hubo un error al crear la publicación.';
      
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      }
      
      alert(errorMessage);
    } finally {
      // Asegurarnos de quitar el estado de carga
      setLoading(false);
    }
  };

  // Añadir esta nueva función
  const handleDelete = async (postId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      try {
        await apiClient.delete(`/posts/${postId}`);
        // Actualizar la UI eliminando el post del estado
        setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
      } catch (err) {
        console.error('Error al eliminar la publicación:', err);
        alert('No se pudo eliminar la publicación.');
      }
    }
  };

  // --- Funciones para editar ---
  const handleEditClick = (post: Post) => {
    setEditingPost(post);
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingPost(null);
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      const response = await apiClient.patch<Post>(`/posts/${editingPost.id}`, {
        title: editedTitle,
        content: editedContent,
      });

      // Actualizar el post en el estado local
      setPosts(posts.map(p => (p.id === editingPost.id ? response.data : p)));
      handleCancelEdit(); // Cerrar el modal
    } catch (err) {
      console.error('Error al actualizar la publicación:', err);
      alert('No se pudo actualizar la publicación.');
    }
  };
  // -----------------------------

  if (loading) return <div className="feed-container">Cargando publicaciones...</div>;
  if (error) return <div className="feed-container error-message">{error}</div>;

  return (
    <div className="feed-container">
      <h1>Últimas Publicaciones</h1>

      {/* Formulario para crear un nuevo post (solo si está autenticado) */}
      {token && (
        <form onSubmit={handleCreatePost} className="create-post-form">
          <h2>Crear una nueva publicación</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Título de tu publicación"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="¿Qué estás pensando?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-post-button">Publicar</button>
        </form>
      )}

      {/* --- Modal de Edición --- */}
      {isEditing && editingPost && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Publicación</h2>
            <form onSubmit={handleUpdatePost}>
              <div className="form-group">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={handleCancelEdit} className="cancel-button">Cancelar</button>
                <button type="submit" className="submit-post-button">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ----------------------- */}

      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-author">
              <strong>
                {post.author ? `${post.author.name || ''} ${post.author.lastname || ''}` : 'Usuario'}
              </strong>
              {post.author?.alias && <span className="post-author-alias">@{post.author.alias}</span>}
            </div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
            <div className="post-actions">
              <button onClick={() => handleLike(post.id)} className="like-button">
                ❤️ Me gusta ({post.likes || 0})
              </button>
              {user && user.id === post.authorId && (
                <>
                  <button onClick={() => handleEditClick(post)} className="edit-button">
                    ✏️ Editar
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="delete-button">
                    🗑️ Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;