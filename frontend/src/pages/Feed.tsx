interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const Feed = () => {
  const posts: Post[] = [
    {
      id: 1,
      author: 'Jane Smith',
      avatar: 'https://via.placeholder.com/50',
      content: 'Just finished my new React project! Check it out.',
      image: 'https://via.placeholder.com/500x300',
      likes: 42,
      comments: 8,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      author: 'John Doe',
      avatar: 'https://via.placeholder.com/50',
      content: 'Learning TypeScript has been a game changer for my development workflow.',
      likes: 28,
      comments: 5,
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      author: 'Sarah Johnson',
      avatar: 'https://via.placeholder.com/50',
      content: 'Beautiful day for coding outside! #devlife',
      image: 'https://via.placeholder.com/500x300',
      likes: 76,
      comments: 12,
      timestamp: '1 day ago'
    }
  ];

  return (
    <div className="feed-page">
      <h1>News Feed</h1>
      
      <div className="create-post">
        <textarea placeholder="What's on your mind?"></textarea>
        <button>Post</button>
      </div>
      
      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img src={post.avatar} alt={post.author} className="avatar" />
              <div>
                <h3>{post.author}</h3>
                <span className="timestamp">{post.timestamp}</span>
              </div>
            </div>
            
            <p className="post-content">{post.content}</p>
            
            {post.image && (
              <img src={post.image} alt="Post" className="post-image" />
            )}
            
            <div className="post-actions">
              <button>❤️ {post.likes}</button>
              <button>💬 {post.comments}</button>
              <button>📤 Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
