import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState(true);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://localhost:3001/api/user', {
        credentials: 'include',
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user');
      }
    };

    fetchUser();

    if (id) {
      const fetchPost = async () => {
        const response = await fetch(`http://localhost:3001/posts/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const post = await response.json();
          setTitle(post.title);
          setDescription(post.description);
          setImageLink(post.image);
          setLink(post.link);
          setStatus(post.status);
        }
      };

      fetchPost();
    }
  }, [id]);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    setImageLink('');
  };

  const handleImageLinkChange = (e) => {
    setImageLink(e.target.value);
    setFile(null);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!title || !description || (!file && !imageLink) || !link) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('status', status.toString());

    if (file) {
      formData.append('image', file);
    } else {
      formData.append('imageLink', imageLink);
    }
  
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3001/posts/${id}` : 'http://localhost:3001/posts'

    const response = await fetch(url, {
      method,
      credentials: 'include',
      body: formData,
    });

    if (response.ok) {
      navigate('/dashboard');
    } else {
      console.error('Failed to save post:', await response.json());
    }
  };

  return (
    <div className="post-form-container">
    <form onSubmit={submit} className="post-form" encType="multipart/form-data">
        <h1>{id ? 'Edit Post' : 'Create Post'}</h1>
        <input
          id="post-title"
          name="title"
          className='input-post-title'
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          id="post-description"
          name="description"
          className='input-post-description'
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          id="post-file"
          name="imageFile"
          className='imput-post-image'
          type="file"
          onChange={handleImageChange}
        />
        <input
          id="post-image-link"
          name="imageLink"
          className='input-post-image-link'
          type="text"
          placeholder="Or Enter Image Link"
          value={imageLink}
          onChange={handleImageLinkChange}
          required={!file}
        />
        <input
          id="post-auth-link"
          name="authorLink"
          className='input-post-auth-link'
          type="text"
          placeholder="Link to Author's Website"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <label htmlFor="post-status" className='input-post-status'>
          Publish
          <input
            id="post-status"
            name="status"
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit" className='submit-post'>Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
