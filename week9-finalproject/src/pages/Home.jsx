import React, { useState, useEffect } from 'react';
import supabase from '../supabase';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';
import './Home.css';

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

// Champions League mock posts
const championsLeaguePosts = [
  {
    id: 1001,
    username: 'football_expert',
    avatar: '⚽',
    title: "Barcelona Making a Comeback 4-3 against Celta Vigo",
    content: "Barcelona pulled off a stunning comeback against Celta Vigo, winning 4-3 in a thrilling La Liga encounter. After Celta Vigo's Borja Iglesias scored a hat-trick to put his team ahead 3-1, Barcelona mounted a late resurgence. Substitute Dani Olmo scored to reduce the deficit, and then Raphinha headed in an equalizer. In the dying moments of the game, Raphinha scored a penalty to secure a dramatic victory for Barcelona.",
    image_url: "https://pbs.twimg.com/media/Go6SV0iXUAA6nPB?format=jpg&name=4096x4096",
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
    image_url: "https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/491522503_1403676194456486_4503916489214234668_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3XThXNN1-hkQ7kNvwFVK_aO&_nc_oc=AdnQkb9HN49DLhnly4CzjdzVkbLJTTb3t731NT3Yc6P7VCVyEOvE5nNrkr0KYca_WCg&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=0wNMNoXEZmPvpec1pSQhjA&oh=00_AfHqxyooYba9WCIrFa_Abz18jP7Nr9i8Up391aHBfZ083w&oe=68120EB6",
    upvotes: 245,
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    isMockData: true
  },
  {
    id: 1003,
    username: 'inter_milano',
    avatar: '⚫',
    title: "Champions League Semifinals: Inter Milan vs Barcelona",
    content: "The Champions League semifinal first leg between Barcelona and Inter Milan is next Wednesday at 12 PM PT in Barcelona. The second leg in Milan is on Wednesday the following week at the same time.",
    image_url: "https://www.fcbarcelona.com/photo-resources/2025/04/16/516123a4-cc70-46ff-b4a5-18b24c1cff62/inter_3200x2000_UCL2025-RIVAL-semis.jpg?width=1200&height=750",
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
    image_url: "https://image-service.onefootball.com/transform?w=840&h=630&dpr=2&image=https%3A%2F%2Ffootballtoday.com%2Fwp-content%2Fuploads%2F2022%2F10%2Fsoccer-nations-league-d6-netherlands-vs-belgium-scaled.jpg",
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
    image_url: "https://cdn.vox-cdn.com/thumbor/ZghPgJMahLgpVwfyrsxNrnRMteE=/0x0:4977x3318/920x613/filters:focal(2012x230:2808x1026):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/73753091/2181237996.0.jpg",
    upvotes: 277,
    created_at: new Date(Date.now() - 38 * 60 * 60 * 1000).toISOString(), // 38 hours ago
    isMockData: true
  }
];

function Home() {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState('created_at');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');

    // Fetch Supabase posts and combine with Champions League posts
    useEffect(() => {
        fetchPosts();
    }, [orderBy, searchTerm]);

    // Sort all posts based on orderBy parameter
    useEffect(() => {
        if (allPosts.length > 0) {
            let sortedPosts = [...allPosts];
            
            if (orderBy === 'created_at') {
                sortedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else if (orderBy === 'upvotes') {
                sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
            }
            
            if (searchTerm) {
                sortedPosts = sortedPosts.filter(post => 
                    post.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            
            setPosts(sortedPosts);
        }
    }, [allPosts, orderBy, searchTerm]);

    async function fetchPosts() {
        setLoading(true);
        try {
            // Fetch posts from Supabase
            const { data, error } = await supabase
                .from('posts')
                .select('*');

            if (error) {
                throw error;
            }
            
            // Combine Supabase posts with Champions League posts
            const combinedPosts = [...(data || []), ...championsLeaguePosts];
            setAllPosts(combinedPosts);
            
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSearchTerm(searchInput);
        }
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchSubmit = () => {
        setSearchTerm(searchInput);
    };

    const handleUpvote = (postId) => {
        setAllPosts(allPosts.map(post => 
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
                        value={searchInput}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearch}
                    />
                    <button onClick={handleSearchSubmit} className="search-button">
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

            {searchTerm && (
                <div className="search-results-info">
                    <p>Search results for: "{searchTerm}"</p>
                    <button onClick={() => {setSearchTerm(''); setSearchInput('')}} className="clear-search">
                        Clear search
                    </button>
                </div>
            )}

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading posts...</p>
                </div>
            ) : (
                <div className="posts-list">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="post-card">
                                <div className="post-votes">
                                    <button 
                                        className="vote-button upvote" 
                                        onClick={() => handleUpvote(post.id)} 
                                        aria-label="Upvote"
                                    >
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
                                        Posted by <span className="community-name">
                                            {post.isMockData ? `${post.avatar} u/${post.username}` : 'u/footballfan'} 
                                        </span>
                                        {' '}{formatRelativeTime(new Date(post.created_at))} to <span className="community-name">r/ChampionsLeague</span>
                                    </div>
                                    
                                    <div className="post-body">{post.content}</div>
                                    
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
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-posts">
                            <p>No posts found. Be the first to create a post!</p>
                            <Link to="/create">
                                <button className="create-post-button">Create Post</button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;