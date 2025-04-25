import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import supabase from '../supabase';
import CommentSection from '../components/CommentSection';

// Champions League mock posts with detailed data
const championsLeaguePosts = [
  {
    id: 1001,
    username: 'football_expert',
    avatar: '⚽',
    title: "Barcelona Making a Comeback 4-3 against Celta Vigo",
    content: "Barcelona pulled off a stunning comeback against Celta Vigo, winning 4-3 in a thrilling La Liga encounter. After Celta Vigo's Borja Iglesias scored a hat-trick to put his team ahead 3-1, Barcelona mounted a late resurgence. Substitute Dani Olmo scored to reduce the deficit, and then Raphinha headed in an equalizer. In the dying moments of the game, Raphinha scored a penalty to secure a dramatic victory for Barcelona.",
    image_url: "https://picsum.photos/id/235/640/360",
    upvotes: 328,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    isMockData: true
  },
  {
    id: 1002,
    username: 'arsenal_gunner',
    avatar: '🔴',
    title: "Champions League Semifinals: Arsenal vs PSG Preview",
    content: "Arsenal will face PSG in what promises to be an exciting Champions League semifinal. After impressively knocking out Real Madrid in the quarterfinals, Arsenal have shown they can compete at the highest level. However, PSG look more able to expose Arsenal's defensive vulnerabilities with the pace of Dembélé and Kvaratskhelia up front. The midfield battle between Rice and PSG's Vitinha will be crucial. Both legs should provide high-scoring contests with the first match at Emirates Stadium next Tuesday.",
    image_url: "https://picsum.photos/id/421/640/360",
    upvotes: 245,
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    isMockData: true
  },
  {
    id: 1003,
    username: 'inter_milano',
    avatar: '⚫',
    title: "Inter Milan vs Barcelona: Tactical Breakdown",
    content: "The Champions League semifinal between Inter Milan and Barcelona pits the tournament's most prolific attacking side against its best defense. Barcelona have scored an impressive 37 goals in the competition this season, while Inter have conceded just five goals and kept eight clean sheets in 12 games. Barcelona's dynamic wingers Lamine Yamal and Raphinha will test Inter's defensive organization, but the Serie A champions have the experience to handle the pressure. The first leg at Camp Nou comes just three days after Barcelona's Copa del Rey final against Real Madrid, which could impact their performance.",
    image_url: "https://picsum.photos/id/143/640/360",
    upvotes: 156,
    created_at: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), // 14 hours ago
    isMockData: true
  },
  {
    id: 1004,
    username: 'bayern_bavaria',
    avatar: '🔴',
    title: "Champions League Injury Update for Semifinalists",
    content: "All four Champions League semifinalists are facing significant injury concerns. Real Madrid will be without long-term absentees Thibaut Courtois and David Alaba, though Ferland Mendy is expected to return. Dortmund will miss Sebastian Haller for the rest of the season with an ankle injury, while Ramy Bensebaini is also unlikely to feature again this campaign due to a knee ligament injury. PSG received a boost with captain Marquinhos returning, but Presnel Kimpembe remains sidelined. Arsenal are concerned about Gabriel's absence in defense, which could be crucial against PSG's potent attack.",
    image_url: "https://picsum.photos/id/866/640/360",
    upvotes: 189,
    created_at: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // 26 hours ago
    isMockData: true
  },
  {
    id: 1005,
    username: 'barca_fan1899',
    avatar: '🔵',
    title: "Lamine Yamal: The Breakthrough Star of Champions League 2024/25",
    content: "Barcelona's teenage sensation Lamine Yamal has been the breakthrough star of this Champions League campaign. At just 17 years old, he's already breaking records and terrorizing defenses across Europe. His combination of close control, acceleration, and decision-making belies his young age. In Barcelona's quarterfinal victory, he was instrumental with both goals and assists. As Barcelona prepare for their semifinal against Inter Milan, Yamal will be key to unlocking the Italian side's formidable defense. Could he become the youngest ever Champions League finalist if Barcelona progress?",
    image_url: "https://picsum.photos/id/532/640/360",
    upvotes: 277,
    created_at: new Date(Date.now() - 38 * 60 * 60 * 1000).toISOString(), // 38 hours ago
    isMockData: true
  }
];

// Mock comments for Champions League posts
const championsLeagueComments = {
  1001: [
    { id: 1, userId: 3, username: 'arsenal_gunner', avatar: '🔴', content: "What a comeback! Raphinha was on fire!", createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) },
    { id: 2, userId: 4, username: 'real_madrid_fanatic', avatar: '⚪', content: "Barcelona's resilience is impressive. Could be crucial for their CL semifinals.", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 3, userId: 7, username: 'bayern_bavaria', avatar: '🔴', content: "Dani Olmo proving to be a great signing. His impact off the bench was decisive.", createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000) }
  ],
  1002: [
    { id: 1, userId: 1, username: 'football_expert', avatar: '⚽', content: "Arsenal's defense will be tested by PSG's front line. Gabriel's injury is a massive concern.", createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
    { id: 2, userId: 6, username: 'psg_supporter', avatar: '🔵', content: "Don't underestimate Arsenal. They showed incredible composure against Real Madrid.", createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) },
    { id: 3, userId: 5, username: 'inter_milano', avatar: '⚫', content: "The Declan Rice vs Vitinha midfield battle will decide this tie. Can't wait!", createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) }
  ],
  1003: [
    { id: 1, userId: 2, username: 'barca_fan1899', avatar: '🔵', content: "Barcelona's attack vs Inter's defense. Classic unstoppable force meets immovable object scenario.", createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) },
    { id: 2, userId: 4, username: 'real_madrid_fanatic', avatar: '⚪', content: "The schedule doesn't favor Barcelona with the Copa del Rey final right before. Could be decisive.", createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000) },
    { id: 3, userId: 7, username: 'bayern_bavaria', avatar: '🔴', content: "Inter's defensive organization is incredible this season. 8 clean sheets in 12 CL games!", createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000) }
  ],
  1004: [
    { id: 1, userId: 3, username: 'arsenal_gunner', avatar: '🔴', content: "Gabriel's absence could be huge for Arsenal. Our defense looks much shakier without him.", createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    { id: 2, userId: 6, username: 'psg_supporter', avatar: '🔵', content: "Marquinhos returning is massive for PSG. He brings so much leadership to the backline.", createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000) },
    { id: 3, userId: 1, username: 'football_expert', avatar: '⚽', content: "Injuries always play a crucial role in the late stages of the Champions League. Squad depth matters.", createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
  ],
  1005: [
    { id: 1, userId: 5, username: 'inter_milano', avatar: '⚫', content: "Yamal is unbelievable for his age. Inter will need special tactics to contain him.", createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    { id: 2, userId: 7, username: 'bayern_bavaria', avatar: '🔴', content: "The composure he shows in big moments reminds me of early Messi. Special talent.", createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    { id: 3, userId: 4, username: 'real_madrid_fanatic', avatar: '⚪', content: "I wonder if Inter will assign a specific defender to mark him or try to cut off his supply.", createdAt: new Date(Date.now() - 32 * 60 * 60 * 1000) }
  ]
};

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // First, check if it's a Champions League post (IDs 1001-1005)
    const postId = parseInt(id);
    const isMockPost = postId >= 1000 && postId <= 1005;
    
    if (isMockPost) {
      // Find the post in the Champions League posts
      const mockPost = championsLeaguePosts.find(p => p.id === postId);
      if (mockPost) {
        setPost(mockPost);
        setComments(championsLeagueComments[postId] || []);
        setLoading(false);
      } else {
        setError('Post not found');
        setLoading(false);
      }
    } else {
      // It's a real post, fetch from Supabase
      fetchPost();
      fetchComments();
    }
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
    
    if (post.isMockData) {
      // Handle upvote for mock post (in-memory only)
      setPost({
        ...post,
        upvotes: post.upvotes + 1
      });
    } else {
      // Handle upvote for real post (in Supabase)
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
  }
  
  async function handleDelete() {
    if (!post || post.isMockData) return;
    
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
  
  function formatRelativeTime(date) {
    if (!date) return "some time ago";
    
    try {
      const dateObj = new Date(date);
      // Check if dateObj is valid before proceeding
      if (isNaN(dateObj.getTime())) {
        return "some time ago";
      }
      return formatDistanceToNow(dateObj, { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error, date);
      return "some time ago";
    }
  }
  
  if (loading) {
    return <div>Loading post...</div>;
  }
  
  if (error || !post) {
    return <div>Error: {error || 'Post not found'}</div>;
  }
  
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
            Posted by <span className="community-name">
              {post.isMockData ? `${post.avatar} u/${post.username}` : 'u/footballfan'}
            </span> {formatRelativeTime(post.created_at)} to <span className="community-name">r/ChampionsLeague</span>
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
            {!post.isMockData && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="comments-container">
        <form className="add-comment-form">
          <textarea
            className="add-comment-textarea"
            placeholder="What are your thoughts?"
            rows="3"
          ></textarea>
          <button 
            type="submit" 
            className="add-comment-button" 
          >
            Comment
          </button>
        </form>
        
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-meta">
                  <span className="comment-author">
                    {post.isMockData ? 
                      `${comment.avatar} u/${comment.username}` : 
                      'u/footballfan'
                    }
                  </span> • {comment.createdAt ? formatRelativeTime(comment.createdAt) : formatRelativeTime(comment.created_at)}
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
    </div>
  );
}

export default PostPage;