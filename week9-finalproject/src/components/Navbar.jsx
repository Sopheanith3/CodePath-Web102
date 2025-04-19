import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="28" height="28">
            <g>
              <circle fill="#FF4500" cx="10" cy="10" r="10"></circle>
              <path fill="#FFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path>
            </g>
          </svg>
          <span className="navbar-logo-text">ChampionsHub</span>
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
          <button className="navbar-button signup-button">Create Post</button>
        </Link>
        <button className="navbar-button login-button">Get App</button>
        <button className="navbar-button login-button">Log In</button>
      </div>
    </header>
  );
}

export default Navbar;