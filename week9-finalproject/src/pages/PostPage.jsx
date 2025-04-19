import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import supabase from '../supabase';
import CommentSection from '../components/CommentSection';
import './PostPage.css';

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchPost();
    fetchComments();
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
      
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post. It may have been deleted or moved.');
    } finally {
      setLoading(false);
    }
  }
  
  async function fetchComments() {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }
  
  async function handleUpvote() {
    if (!post) return;
    
    try {
      const { error } = await supabase
        .from('posts')
        .update({ upvotes: post.upvotes + 1 })
        .eq('id', post.id);
        
      if (error) {
        throw error;
      }
      
      // Update the local state
      setPost({
        ...post,
        upvotes: post.upvotes + 1
      });
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  }
  
  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const { error } = await supabase
          .from('posts')
          .delete()
          .eq('id', id);
          
        if (error) {
          throw error;
        }
        
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  }
  
  if (loading) {
    return <div>Loading post...</div>;
  }
  
  if (error || !post) {
    return <div>Error: {error || 'Post not found'}</div>;
  }
  
  const formattedDate = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });
  
  return (
    <div>
      <div className="post-card" style={{ marginBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        <div className="post-votes">
          <button className="vote-button upvote" onClick={handleUpvote} aria-label="Upvote">
            ▲
          </button>
          <div className="vote-score">{post.upvotes}</div>
          <button className="vote-button downvote" aria-label="Downvote">
            ▼
          </button>
        </div>
        
        <div className="post-content">
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            Posted by <span className="community-name">u/footballfan</span> {formattedDate} to <span className="community-name">r/ChampionsLeague</span>
          </div>
          
          {post.content && (
            <div className="post-body">
              {post.content}
            </div>
          )}
          
          {post.image_url && (
            <img src={post.image_url} alt={post.title} className="post-image" />
          )}
          
          <div className="post-actions">
            <div className="post-action">
              <span className="post-action-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
                  <path fill="currentColor" d="M15,5H12.5V2.5A1.25,1.25,0,0,0,11.25,1.25h-2.5A1.25,1.25,0,0,0,7.5,2.5V5H5A1.25,1.25,0,0,0,3.75,6.25v12.5A1.25,1.25,0,0,0,5,20H15a1.25,1.25,0,0,0,1.25-1.25V6.25A1.25,1.25,0,0,0,15,5ZM8.75,5h2.5V2.5h-2.5Z"></path>
                </svg>
              </span>
              Comments
            </div>
            <div className="post-action">
              <span className="post-action-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
                  <path fill="currentColor" d="M20,11.25a.75.75,0,0,1-.75.75H14.31l-1.72,5.2a.76.76,0,0,1-.7.51.669.669,0,0,1-.62-.4l-1.91-7-1.13-.39L3.15,13a.74.74,0,0,1-.88-.5l-.38-1.14a.75.75,0,0,1,.49-.94l6.46-2.15,2.86-5.73a.782.782,0,0,1,1.02-.32l1.26.63a.72.72,0,0,1,.32,1.02L11.54,9l4.25,1.42h3.46A.75.75,0,0,1,20,11.25Z"></path>
                </svg>
              </span>
              Share
            </div>
            <div className="post-action">
              <span className="post-action-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
                  <path fill="currentColor" d="M16.5,3A3.5,3.5,0,0,0,13,6.5a3.43,3.43,0,0,0,.09.8l-5.11,3.84a3.48,3.48,0,0,0-2.29-.84A3.5,3.5,0,1,0,9,13.5a3.43,3.43,0,0,0-.09-.8L14,8.86a3.48,3.48,0,0,0,2.29.84A3.5,3.5,0,1,0,16.5,3ZM5.71,14.29A1.71,1.71,0,1,1,4,12.58,1.71,1.71,0,0,1,5.71,14.29ZM13,7.5a1.71,1.71,0,1,1,1.71-1.71A1.71,1.71,0,0,1,13,7.5Z"></path>
                </svg>
              </span>
              Save
            </div>
            <Link to={`/edit/${post.id}`} className="post-action">
              <span className="post-action-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
                  <path fill="currentColor" d="M17.56,2.44a1.5,1.5,0,0,0-2.12,0L3,14.87V18H6.13L18.56,5.56A1.5,1.5,0,0,0,17.56,2.44ZM5.57,16H5v-.57l9.31-9.31.57.57Z"></path>
                </svg>
              </span>
              Edit
            </Link>
            <div className="post-action" onClick={handleDelete}>
              <span className="post-action-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
                  <path fill="currentColor" d="M15,4H1a1,1,0,0,0,0,2H3V15a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V6h2a1,1,0,0,0,0-2ZM15,15a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V6h10ZM6.5,2A2.5,2.5,0,0,0,9,4.5a1,1,0,0,0,2,0A2.5,2.5,0,0,0,13.5,2h-7Z"></path>
                </svg>
              </span>
              Delete
            </div>
          </div>
        </div>
      </div>
      
      <CommentSection postId={id} comments={comments} />
    </div>
  );
}

export default PostPage;