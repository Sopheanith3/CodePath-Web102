import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import './EditPost.css';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchPost();
  }, [id]);
  
  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        throw error;
      }
      
      // Populate form fields
      setTitle(data.title || '');
      setContent(data.content || '');
      setImageUrl(data.image_url || '');
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post. It may have been deleted or moved.');
    } finally {
      setLoading(false);
    }
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    setUpdating(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('posts')
        .update({ 
          title, 
          content, 
          image_url: imageUrl 
        })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Navigate back to the post page
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post. Please try again.');
    } finally {
      setUpdating(false);
    }
  }
  
  if (loading) {
    return <div>Loading post...</div>;
  }
  
  if (error && !title) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div className="create-post-container">
      <h1 className="create-post-title">Edit Post</h1>
      
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
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            className="create-post-button" 
            disabled={updating || !title.trim()}
          >
            {updating ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button 
            type="button" 
            className="create-post-button" 
            style={{ backgroundColor: '#878a8c' }}
            onClick={() => navigate(`/post/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;