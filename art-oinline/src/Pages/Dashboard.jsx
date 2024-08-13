import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3001/posts/my-posts', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        navigate('/login');
      }
    };

    fetchPosts();
  }, [navigate]);

  const deletePost = async (id) => {
    await fetch(`http://localhost:3001/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Dashboard</h1>
        <button className="btn btn-primary" onClick={() => navigate('/posts/new')}>Create New Post</button>
      </div>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt={post.title} className="post-image" />
            <div className="post-content">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p><strong>Author:</strong> {post.user ? post.user.name : 'Unknown'}</p>
              <p><strong>Link:</strong> <a href={post.link} target="_blank" rel="noopener noreferrer">{post.link}</a></p>
              <button className="btn btn-secondary" onClick={() => navigate(`/posts/edit/${post.id}`)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
