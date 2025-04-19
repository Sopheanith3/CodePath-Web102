import React, { useState, useEffect } from 'react';
import supabase from '../supabase';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';
import './Home.css'; 

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState('created_at');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchPosts();
    }, [orderBy, searchTerm]);

    async function fetchPosts() {
        setLoading(true);
        try {
        let query = supabase
            .from('posts')
            .select('*')
            .order(orderBy, { ascending: false });

        if (searchTerm) {
            query = query.ilike('title', `%${searchTerm}%`);
        }

        const { data, error } = await query;

        if (error) {
            throw error;
        } else {
            setPosts(data || []);
        }
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

    return (
        <div>
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
                <PostCard key={post.id} post={post} />
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