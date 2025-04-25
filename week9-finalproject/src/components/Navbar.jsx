import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
      <Link to="/" className="navbar-logo">
        <div className="champions-logo">
          <img 
            src="/src/assets/UEFA_Champions_League.svg.png" 
            alt="Champions League" 
            width="32" 
            height="32" 
            style={{ marginRight: '8px' }}
          />
        </div>
        <span className="navbar-logo-text">Champions League Hub</span>
      </Link>
        
        <div className="navbar-search">
          <span className="navbar-search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
              <path fill="currentColor" d="M15.59,13.91l2.78,2.69a1.25,1.25,0,1,1-1.74,1.8l-2.82-2.73a8,8,0,1,1,1.77-1.78ZM8,14A6,6,0,1,0,2,8,6,6,0,0,0,8,14Z"></path>
            </svg>
          </span>
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search Champions League Hub"
          />
        </div>
      </div>
      
      <div className="navbar-right">
        <Link to="/create">
          <button className="navbar-button create-post-button">Create Post</button>
        </Link>
        <button className="navbar-button login-button">Log In</button>
      </div>
    </header>
  );
}

export default Navbar;