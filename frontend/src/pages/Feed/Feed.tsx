import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import './Feed.css';

// Interfaces para tipar los datos que vienen del backend
interface Author {
  name: string;
  lastname: string;
}

interface Post {
  id: number;
  content: string;
  author: Author;
  likes: number;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const handleLike = async (postId: number) => {
    try {
      const response = await apiClient.patch<Post>(`/posts/${postId}/like`);
      // Actualizar el estado local con el nuevo número de likes
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: response.data.likes } : post
      ));
    } catch (err) {
      console.error('Error al dar like:', err);
      // Opcional: mostrar un error al usuario
    }
  };

  if (loading) return <div className="feed-container">Cargando publicaciones...</div>;
  if (error) return <div className="feed-container error-message">{error}</div>;

  return (
    <div className="feed-container">
      <h1>Últimas Publicaciones</h1>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-author">
              <strong>{post.author.name} {post.author.lastname}</strong>
            </div>
            <p className="post-content">{post.content}</p>
            <div className="post-actions">
              <button onClick={() => handleLike(post.id)} className="like-button">
                ❤️ Me gusta ({post.likes})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
