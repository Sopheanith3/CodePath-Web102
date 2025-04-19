import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import supabase from '../supabase';

function PostCard({ post }) {
  const formattedDate = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });
  
  const handleUpvote = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const { error } = await supabase
        .from('posts')
        .update({ upvotes: post.upvotes + 1 })
        .eq('id', post.id);
        
      if (error) {
        throw error;
      }
      
      // Update the post locally in the parent component
      post.upvotes += 1;
      
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };
  
  return (
    <div className="post-card">
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
        <h2 className="post-title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h2>
        
        <div className="post-meta">
          Posted by <span className="community-name">u/footballfan</span> {formattedDate} to <span className="community-name">r/ChampionsLeague</span>
        </div>
        
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
          <div className="post-action">
            <span className="post-action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
                <path fill="currentColor" d="M12.11,15.39,10,13.41,7.89,15.39A.48.48,0,0,1,7.11,15l.74-3L5.38,9.75A.48.48,0,0,1,5.62,9L8.9,8.8l1.1-2.77a.48.48,0,0,1,.9,0L12,8.8l3.28.27a.48.48,0,0,1,.24.83L13.15,12l.74,3A.48.48,0,0,1,12.11,15.39Z"></path>
              </svg>
            </span>
            Award
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;