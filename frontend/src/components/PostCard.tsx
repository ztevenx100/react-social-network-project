import React, { useState } from 'react';
import './PostCard.css';

interface PostCardProps {
  author: string;
  date: string;
  message: string;
  initialLikes: number;
}

const PostCard: React.FC<PostCardProps> = ({ author, date, message, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    // En una aplicación real, esto llamaría a una API para actualizar el like en el backend.
    // Por ahora, solo incrementa el estado localmente.
    setLikes(likes + 1);
  };

  return (
    <div className="post-card">
      <div className="post-card-header">
        <span className="post-card-author">{author}</span>
        <span className="post-card-date">{date}</span>
      </div>
      <div className="post-card-body">
        <p>{message}</p>
      </div>
      <div className="post-card-footer">
        <button onClick={handleLike} className="like-button">
          👍 Like
        </button>
        <span className="likes-counter">{likes} Likes</span>
      </div>
    </div>
  );
};

export default PostCard;
