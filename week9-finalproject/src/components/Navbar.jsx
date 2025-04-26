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
              src="/src/assets/uefa-logo.png" 
              alt="Champions League" 
              width="32" 
              height="32"
              onError={(e) => {
                console.error("Logo image failed to load");
                e.target.style.display = 'none';
              }}
            />
          </div>
        </Link>
      </div>

      <div className="navbar-center">
        <span className="navbar-logo-text">Champions League Hub</span>
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