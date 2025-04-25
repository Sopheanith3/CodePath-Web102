import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChampionsLeagueFeed.css';

// Function to format relative time
const formatRelativeTime = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
};

// Mock user data
const users = [
  { id: 1, username: 'football_expert', avatar: '⚽' },
  { id: 2, username: 'barca_fan1899', avatar: '🔵' },
  { id: 3, username: 'arsenal_gunner', avatar: '🔴' },
  { id: 4, username: 'real_madrid_fanatic', avatar: '⚪' },
  { id: 5, username: 'inter_milano', avatar: '⚫' },
  { id: 6, username: 'psg_supporter', avatar: '🔵' },
  { id: 7, username: 'bayern_bavaria', avatar: '🔴' }
];

// Mock post data with Champions League content
const posts = [
  {
    id: 1,
    userId: 1,
    title: "Barcelona Making a Comeback 4-3 against Celta Vigo",
    content: "Barcelona pulled off a stunning comeback against Celta Vigo, winning 4-3 in a thrilling La Liga encounter. After Celta Vigo's Borja Iglesias scored a hat-trick to put his team ahead 3-1, Barcelona mounted a late resurgence. Substitute Dani Olmo scored to reduce the deficit, and then Raphinha headed in an equalizer. In the dying moments of the game, Raphinha scored a penalty to secure a dramatic victory for Barcelona.",
    imageUrl: "https://picsum.photos/id/235/640/360",
    upvotes: 328,
    comments: 47,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
  },
  {
    id: 2,
    userId: 3,
    title: "Champions League Semifinals: Arsenal vs PSG Preview",
    content: "Arsenal will face PSG in what promises to be an exciting Champions League semifinal. After impressively knocking out Real Madrid in the quarterfinals, Arsenal have shown they can compete at the highest level. However, PSG look more able to expose Arsenal's defensive vulnerabilities with the pace of Dembélé and Kvaratskhelia up front. The midfield battle between Rice and PSG's Vitinha will be crucial. Both legs should provide high-scoring contests with the first match at Emirates Stadium next Tuesday.",
    imageUrl: "https://picsum.photos/id/421/640/360",
    upvotes: 245,
    comments: 78,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000) // 8 hours ago
  },
  {
    id: 3,
    userId: 5,
    title: "Inter Milan vs Barcelona: Tactical Breakdown",
    content: "The Champions League semifinal between Inter Milan and Barcelona pits the tournament's most prolific attacking side against its best defense. Barcelona have scored an impressive 37 goals in the competition this season, while Inter have conceded just five goals and kept eight clean sheets in 12 games. Barcelona's dynamic wingers Lamine Yamal and Raphinha will test Inter's defensive organization, but the Serie A champions have the experience to handle the pressure. The first leg at Camp Nou comes just three days after Barcelona's Copa del Rey final against Real Madrid, which could impact their performance.",
    imageUrl: "https://picsum.photos/id/143/640/360",
    upvotes: 156,
    comments: 43,
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000) // 14 hours ago
  },
  {
    id: 4,
    userId: 7,
    title: "Champions League Injury Update for Semifinalists",
    content: "All four Champions League semifinalists are facing significant injury concerns. Real Madrid will be without long-term absentees Thibaut Courtois and David Alaba, though Ferland Mendy is expected to return. Dortmund will miss Sebastian Haller for the rest of the season with an ankle injury, while Ramy Bensebaini is also unlikely to feature again this campaign due to a knee ligament injury. PSG received a boost with captain Marquinhos returning, but Presnel Kimpembe remains sidelined. Arsenal are concerned about Gabriel's absence in defense, which could be crucial against PSG's potent attack.",
    imageUrl: "https://picsum.photos/id/866/640/360",
    upvotes: 189,
    comments: 54,
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000) // 26 hours ago
  },
  {
    id: 5,
    userId: 2,
    title: "Lamine Yamal: The Breakthrough Star of Champions League 2024/25",
    content: "Barcelona's teenage sensation Lamine Yamal has been the breakthrough star of this Champions League campaign. At just 17 years old, he's already breaking records and terrorizing defenses across Europe. His combination of close control, acceleration, and decision-making belies his young age. In Barcelona's quarterfinal victory, he was instrumental with both goals and assists. As Barcelona prepare for their semifinal against Inter Milan, Yamal will be key to unlocking the Italian side's formidable defense. Could he become the youngest ever Champions League finalist if Barcelona progress?",
    imageUrl: "https://picsum.photos/id/532/640/360",
    upvotes: 277,
    comments: 61,
    createdAt: new Date(Date.now() - 38 * 60 * 60 * 1000) // 38 hours ago
  },
  {
    id: 6,
    userId: 6,
    title: "PSG's Path to Champions League Glory",
    content: "After years of disappointment, PSG have a golden opportunity to finally win the Champions League this season. Under Luis Enrique's guidance, the team has evolved to be less dependent on individual brilliance and more focused on collective performance. The midfield trio of Vitinha, Zaïre-Emery, and Neves provides the perfect balance, while Dembélé and Kvaratskhelia offer devastating pace on the flanks. Their quarterfinal dismantling of Dortmund showed their potential, but they'll need to overcome a resilient Arsenal side in the semifinals. Could this finally be the year PSG lift the trophy?",
    imageUrl: "https://picsum.photos/id/193/640/360",
    upvotes: 201,
    comments: 58,
    createdAt: new Date(Date.now() - 52 * 60 * 60 * 1000) // 52 hours ago
  },
  {
    id: 7,
    userId: 4,
    title: "Champions League Final Venue: Allianz Arena Preparations",
    content: "The Allianz Arena in Munich is undergoing final preparations to host the Champions League final on May 31, 2025. Bayern Munich's home stadium has been transformed with UEFA branding and upgraded facilities to welcome the two finalists and thousands of fans. Special security measures have been implemented around the city, with fan zones being set up in key locations. Transportation systems have been reinforced to handle the influx of supporters. Which two teams will make it to the grand finale in Munich? With Barcelona, Inter Milan, Arsenal, and PSG still in contention, it promises to be a spectacular end to the tournament.",
    imageUrl: "https://picsum.photos/id/378/640/360",
    upvotes: 132,
    comments: 29,
    createdAt: new Date(Date.now() - 73 * 60 * 60 * 1000) // 73 hours ago
  }
];

// Mock comments
const allComments = {
  1: [
    { id: 1, userId: 3, content: "What a comeback! Raphinha was on fire!", createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) },
    { id: 2, userId: 4, content: "Barcelona's resilience is impressive. Could be crucial for their CL semifinals.", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 3, userId: 7, content: "Dani Olmo proving to be a great signing. His impact off the bench was decisive.", createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000) }
  ],
  2: [
    { id: 1, userId: 1, content: "Arsenal's defense will be tested by PSG's front line. Gabriel's injury is a massive concern.", createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
    { id: 2, userId: 6, content: "Don't underestimate Arsenal. They showed incredible composure against Real Madrid.", createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) },
    { id: 3, userId: 5, content: "The Declan Rice vs Vitinha midfield battle will decide this tie. Can't wait!", createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) }
  ],
  3: [
    { id: 1, userId: 2, content: "Barcelona's attack vs Inter's defense. Classic unstoppable force meets immovable object scenario.", createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) },
    { id: 2, userId: 4, content: "The schedule doesn't favor Barcelona with the Copa del Rey final right before. Could be decisive.", createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000) },
    { id: 3, userId: 7, content: "Inter's defensive organization is incredible this season. 8 clean sheets in 12 CL games!", createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000) }
  ],
  4: [
    { id: 1, userId: 3, content: "Gabriel's absence could be huge for Arsenal. Our defense looks much shakier without him.", createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    { id: 2, userId: 6, content: "Marquinhos returning is massive for PSG. He brings so much leadership to the backline.", createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000) },
    { id: 3, userId: 1, content: "Injuries always play a crucial role in the late stages of the Champions League. Squad depth matters.", createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
  ],
  5: [
    { id: 1, userId: 5, content: "Yamal is unbelievable for his age. Inter will need special tactics to contain him.", createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    { id: 2, userId: 7, content: "The composure he shows in big moments reminds me of early Messi. Special talent.", createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    { id: 3, userId: 4, content: "I wonder if Inter will assign a specific defender to mark him or try to cut off his supply.", createdAt: new Date(Date.now() - 32 * 60 * 60 * 1000) }
  ],
  6: [
    { id: 1, userId: 3, content: "PSG have improved this season, but Arsenal won't be intimidated after beating Madrid.", createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000) },
    { id: 2, userId: 5, content: "Luis Enrique has transformed PSG's mentality. They're much more resilient now.", createdAt: new Date(Date.now() - 40 * 60 * 60 * 1000) },
    { id: 3, userId: 7, content: "The absence of a single superstar might actually be helping PSG play more as a team.", createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000) }
  ],
  7: [
    { id: 1, userId: 2, content: "I'm predicting a Barcelona vs Arsenal final. Would be an exciting match-up!", createdAt: new Date(Date.now() - 55 * 60 * 60 * 1000) },
    { id: 2, userId: 6, content: "Munich is a great venue for the final. The atmosphere at Allianz Arena is always special.", createdAt: new Date(Date.now() - 60 * 60 * 60 * 1000) },
    { id: 3, userId: 1, content: "Whatever happens, this Champions League season has been one of the most exciting in years.", createdAt: new Date(Date.now() - 70 * 60 * 60 * 1000) }
  ]
};

function ChampionsLeagueFeed() {
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('created_at');
  
  // Fetch and set posts when component mounts or orderBy changes
  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      
      // Simulate API fetch delay
      setTimeout(() => {
        // Sort posts based on orderBy parameter
        let sortedPosts = [...posts];
        if (orderBy === 'created_at') {
          sortedPosts.sort((a, b) => b.createdAt - a.createdAt);
        } else if (orderBy === 'upvotes') {
          sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
        }
        
        setFeedPosts(sortedPosts);
        setLoading(false);
      }, 500);
    };
    
    fetchPosts();
  }, [orderBy]);
  
  const handleUpvote = (postId) => {
    setFeedPosts(feedPosts.map(post => 
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
  };
  
  return (
    <div className="home-container">
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search posts..."
            className="search-input"
          />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
              <path fill="currentColor" d="M15.59,13.91l2.78,2.69a1.25,1.25,0,1,1-1.74,1.8l-2.82-2.73a8,8,0,1,1,1.77-1.78ZM8,14A6,6,0,1,0,2,8,6,6,0,0,0,8,14Z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="sort-container">
        <button 
          className={`sort-button ${orderBy === 'created_at' ? 'active' : ''}`}
          onClick={() => setOrderBy('created_at')}
        >
          <svg className="sort-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
            <path fill="currentColor" d="M7.25,3.06a1,1,0,0,0-1.41,0L1.44,7.46a1,1,0,0,0,0,1.41l4.4,4.4a1,1,0,0,0,1.41-1.41L4.66,9.27h8.59A5.76,5.76,0,0,1,19,15v2a1,1,0,0,0,2,0V15a7.76,7.76,0,0,0-7.75-7.75H4.66L7.25,4.46A1,1,0,0,0,7.25,3.06Z"></path>
          </svg>
          New
        </button>
        <button 
          className={`sort-button ${orderBy === 'upvotes' ? 'active' : ''}`}
          onClick={() => setOrderBy('upvotes')}
        >
          <svg className="sort-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
            <path fill="currentColor" d="M12.5,3.05a1,1,0,0,1,1.41,0L18.32,7.5a1,1,0,0,1-1.41,1.41L13.5,5.46V16a1,1,0,0,1-2,0V5.46L8.09,8.91A1,1,0,0,1,6.68,7.5ZM1,19a1,1,0,0,1,1-1H17a1,1,0,0,1,0,2H2A1,1,0,0,1,1,19Z"></path>
          </svg>
          Top
        </button>
        <button className="sort-button">
          <svg className="sort-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
            <path fill="currentColor" d="M18,3H15V5h2.94A7.25,7.25,0,0,1,11,11.95a5.27,5.27,0,0,0-2-2.26A9.27,9.27,0,0,0,17,3.06V1H15a1,1,0,0,0,0-2h4a1,1,0,0,0,1,1V4A1,1,0,0,0,18,3ZM7,7A6,6,0,1,0,13,13,6,6,0,0,0,7,7Zm3.5,6a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,10.5,13ZM7,15a2,2,0,1,1,2-2A2,2,0,0,1,7,15Z"></path>
          </svg>
          Hot
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading posts...</p>
        </div>
      ) : (
        <div className="posts-list">
          {feedPosts.length > 0 ? (
            feedPosts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                handleUpvote={handleUpvote}
                comments={allComments[post.id] || []}
              />
            ))
          ) : (
            <div className="no-posts">
              <p>No posts found. Check back later for Champions League updates!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PostCard({ post, handleUpvote, comments }) {
  const user = users.find(u => u.id === post.userId);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  return (
    <div className="post-card">
      <div className="post-votes">
        <button className="vote-button upvote" onClick={() => handleUpvote(post.id)} aria-label="Upvote">
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
          Posted by <span className="community-name">{user.avatar} u/{user.username}</span> {formatRelativeTime(post.createdAt)} to <span className="community-name">r/ChampionsLeague</span>
        </div>
        
        <div className="post-body">{post.content}</div>
        
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className="post-image" />
        )}
        
        <div className="post-actions">
          <div className="post-action" onClick={() => setShowComments(!showComments)}>
            <span className="post-action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
                <path fill="currentColor" d="M15,5H12.5V2.5A1.25,1.25,0,0,0,11.25,1.25h-2.5A1.25,1.25,0,0,0,7.5,2.5V5H5A1.25,1.25,0,0,0,3.75,6.25v12.5A1.25,1.25,0,0,0,5,20H15a1.25,1.25,0,0,0,1.25-1.25V6.25A1.25,1.25,0,0,0,15,5ZM8.75,5h2.5V2.5h-2.5Z"></path>
              </svg>
            </span>
            {post.comments} Comments
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
        </div>
        
        {showComments && (
          <div className="comments-container">
            <form className="add-comment-form">
              <textarea
                className="add-comment-textarea"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What are your thoughts?"
              />
              <button 
                type="submit" 
                className="add-comment-button" 
                disabled={!commentText.trim()}
              >
                Comment
              </button>
            </form>
            
            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment) => {
                  const commentUser = users.find(u => u.id === comment.userId);
                  return (
                    <div key={comment.id} className="comment">
                      <div className="comment-meta">
                        <span className="comment-author">{commentUser.avatar} u/{commentUser.username}</span> • {formatRelativeTime(comment.createdAt)}
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
                  );
                })
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChampionsLeagueFeed;