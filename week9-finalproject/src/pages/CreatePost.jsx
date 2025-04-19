import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          { 
            title, 
            content, 
            image_url: imageUrl,
            upvotes: 0,
            created_at: new Date().toISOString()
          }
        ])
        .select();
        
      if (error) {
        throw error;
      }
      
      // Navigate to the new post page
      if (data && data.length > 0) {
        navigate(`/post/${data[0].id}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-post-container">
      <h1 className="create-post-title">Create Post</h1>
      
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        
        <textarea
          className="create-post-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Text (optional)"
        />
        
        <input
          type="url"
          className="create-post-input"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL (optional)"
        />
        
        <button 
          type="submit" 
          className="create-post-button" 
          disabled={loading || !title.trim()}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;