import React from 'react';
import { Link } from 'react-router-dom';
import './LeftSidebar.css';

function LeftSidebar() {
  return (
    <div className="left-sidebar">
      <div className="sidebar-section">
        <Link to="/" className="sidebar-menu-item active">
          <span className="sidebar-menu-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
              <path fill="currentColor" d="M18.16,12,10,4.43,1.84,12a1.33,1.33,0,0,1-1.86,0,1.23,1.23,0,0,1,0-1.78L9.06,1.9a1.38,1.38,0,0,1,1.88,0l9.08,8.32a1.23,1.23,0,0,1,0,1.78A1.33,1.33,0,0,1,18.16,12ZM10,8.24h0L4,13.83V18.5a1.5,1.5,0,0,0,1.5,1.5h3A0.5,0.5,0,0,0,9,19.5V16.25a0.75,0.75,0,0,1,.75-0.75h0.5a0.75,0.75,0,0,1,.75.75V19.5a0.5,0.5,0,0,0,.5.5h3A1.5,1.5,0,0,0,16,18.5V13.83Z"></path>
            </svg>
          </span>
          Home
        </Link>
        <Link to="/" className="sidebar-menu-item">
          <span className="sidebar-menu-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
              <path fill="currentColor" d="M16.5,3h-1a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5v-1A.5.5,0,0,0,16.5,3ZM10,10a4,4,0,1,0,4,4A4,4,0,0,0,10,10Zm0,7a3,3,0,1,1,3-3A3,3,0,0,1,10,17ZM18.5,5H1.5A1.5,1.5,0,0,0,0,6.5v9A1.5,1.5,0,0,0,1.5,17h6.9A6,6,0,0,1,18,9.73V6.5A1.5,1.5,0,0,0,18.5,5Zm.5,2.25a6,6,0,0,1-1,3.34V6.5A.5.5,0,0,1,18.5,6a.5.5,0,0,1,.5.5V7.25ZM1.5,6h15a.5.5,0,0,1,.5.5v.9a6,6,0,0,1-11.58,7.1H1.5a.5.5,0,0,1-.5-.5v-7A.5.5,0,0,1,1.5,6Z"></path>
            </svg>
          </span>
          Popular
        </Link>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">Topics</div>
        <div className="sidebar-menu-item">
          <span className="sidebar-menu-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
              <path fill="currentColor" d="M10,18.5A8.5,8.5,0,0,1,10,1.5a8.59,8.59,0,0,1,1.93.22,1,1,0,1,1-.45,1.95A6.53,6.53,0,0,0,10,3.5a6.5,6.5,0,1,0,6.5,6.5,6.53,6.53,0,0,0-.17-1.48,1,1,0,0,1,1.95-.45A8.59,8.59,0,0,1,18.5,10,8.5,8.5,0,0,1,10,18.5ZM15.51,12l-3.76-1.25L10.5,7l-1.25,3.75L5.49,12l3.76,1.25L10.5,17l1.25-3.75Z"></path>
            </svg>
          </span>
          Premier League
        </div>
        <div className="sidebar-menu-item">
          <span className="sidebar-menu-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
              <path fill="currentColor" d="M10,18.5A8.5,8.5,0,0,1,10,1.5a8.59,8.59,0,0,1,1.93.22,1,1,0,1,1-.45,1.95A6.53,6.53,0,0,0,10,3.5a6.5,6.5,0,1,0,6.5,6.5,6.53,6.53,0,0,0-.17-1.48,1,1,0,0,1,1.95-.45A8.59,8.59,0,0,1,18.5,10,8.5,8.5,0,0,1,10,18.5ZM15.51,12l-3.76-1.25L10.5,7l-1.25,3.75L5.49,12l3.76,1.25L10.5,17l1.25-3.75Z"></path>
            </svg>
          </span>
          La Liga
        </div>
        <div className="sidebar-menu-item">
          <span className="sidebar-menu-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
              <path fill="currentColor" d="M10,18.5A8.5,8.5,0,0,1,10,1.5a8.59,8.59,0,0,1,1.93.22,1,1,0,1,1-.45,1.95A6.53,6.53,0,0,0,10,3.5a6.5,6.5,0,1,0,6.5,6.5,6.53,6.53,0,0,0-.17-1.48,1,1,0,0,1,1.95-.45A8.59,8.59,0,0,1,18.5,10,8.5,8.5,0,0,1,10,18.5ZM15.51,12l-3.76-1.25L10.5,7l-1.25,3.75L5.49,12l3.76,1.25L10.5,17l1.25-3.75Z"></path>
            </svg>
          </span>
          Bundesliga
        </div>
        <div className="sidebar-menu-item">
          <span className="sidebar-menu-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
              <path fill="currentColor" d="M10,18.5A8.5,8.5,0,0,1,10,1.5a8.59,8.59,0,0,1,1.93.22,1,1,0,1,1-.45,1.95A6.53,6.53,0,0,0,10,3.5a6.5,6.5,0,1,0,6.5,6.5,6.53,6.53,0,0,0-.17-1.48,1,1,0,0,1,1.95-.45A8.59,8.59,0,0,1,18.5,10,8.5,8.5,0,0,1,10,18.5ZM15.51,12l-3.76-1.25L10.5,7l-1.25,3.75L5.49,12l3.76,1.25L10.5,17l1.25-3.75Z"></path>
            </svg>
          </span>
          Serie A
        </div>
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-title">Teams</div>
        <div className="sidebar-menu-item">
          <span className="sidebar-menu-item-icon">⚽</span>
          Manchester City
        </div>
        <div className="sidebar-menu-item">
          <span className="sidebar-menu-item-icon">⚽</span>
          Real Madrid
        </div>
        <div className="sidebar-menu-item">
          <span className="sidebar-menu-item-icon">⚽</span>
          Bayern Munich
        </div>
        <div className="sidebar-menu-item">
          <span className="sidebar-menu-item-icon">⚽</span>
          FC Barcelona
        </div>
        <div className="sidebar-menu-item">
          <span className="sidebar-menu-item-icon">⚽</span>
          Liverpool
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;