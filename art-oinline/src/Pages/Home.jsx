import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/posts', {
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        const publishedPosts = data.filter(post => post.status);
        setPosts(publishedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-container">
      <div className="posts-grid">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="post-card">
              <img src={post.image} alt={post.title} className="post-image" />
              <h2>{post.title}</h2>
              <p>Created by: {post.user ? post.user.name : 'Unknown User'}</p>
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                Visit Author's Website
              </a>
            </div>
          ))
        ) : (
          <p>No published posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
