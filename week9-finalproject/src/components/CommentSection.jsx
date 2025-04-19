import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import supabase from '../supabase';

function CommentSection({ postId, comments: initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAddComment(e) {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          { 
            post_id: postId, 
            content: newComment,
            created_at: new Date().toISOString()
          }
        ])
        .select();
        
      if (error) {
        throw error;
      }
      
      // Add the new comment to the list
      if (data && data.length > 0) {
        setComments([data[0], ...comments]);
      }
      
      // Reset comment input
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="comments-container">
      <form onSubmit={handleAddComment} className="add-comment-form">
        <textarea
          className="add-comment-textarea"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="What are your thoughts?"
          required
        />
        <button 
          type="submit" 
          className="add-comment-button" 
          disabled={loading || !newComment.trim()}
        >
          {loading ? 'Commenting...' : 'Comment'}
        </button>
      </form>
      
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-meta">
                <span className="comment-author">u/footballfan</span> • {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </div>
              <div className="comment-content">
                {comment.content}
              </div>
              <div className="comment-actions">
                <div className="comment-action">
                  <span className="post-action-icon">▲</span>
                  Upvote
                </div>
                <div className="comment-action">
                  <span className="post-action-icon">▼</span>
                  Downvote
                </div>
                <div className="comment-action">
                  Reply
                </div>
                <div className="comment-action">
                  Share
                </div>
                <div className="comment-action">
                  Report
                </div>
                <div className="comment-action">
                  Save
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default CommentSection;