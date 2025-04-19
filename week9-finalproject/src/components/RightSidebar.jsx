import React from 'react';
import { Link } from 'react-router-dom';
import './RightSidebar.css';

function RightSidebar() {
  return (
    <div className="sidebar">
      <div className="right-sidebar">
        <div className="right-sidebar-header">
          About Champions League Hub
        </div>
        <div className="right-sidebar-content">
          <div className="community-info">
            Your source for all Champions League news, rumors, and discussions. Join fellow football enthusiasts to discuss matches, players, and more!
          </div>
          <div className="community-info">
            <strong>Created:</strong> April 2025
          </div>
          <div className="community-info">
            <strong>Members:</strong> 142,783
          </div>
          <Link to="/create">
            <button className="sidebar-button">Create Post</button>
          </Link>
        </div>
      </div>
      
      <div className="right-sidebar">
        <div className="right-sidebar-header">
          Upcoming Matches
        </div>
        <div className="right-sidebar-content">
          <div className="community-info">
            <strong>Manchester City vs Real Madrid</strong>
            <div>Today at 20:00 GMT</div>
          </div>
          <div className="community-info">
            <strong>PSG vs Bayern Munich</strong>
            <div>Tomorrow at 20:00 GMT</div>
          </div>
          <div className="community-info">
            <strong>Barcelona vs Liverpool</strong>
            <div>Wednesday at 20:00 GMT</div>
          </div>
        </div>
      </div>
      
      <div className="right-sidebar">
        <div className="right-sidebar-header">
          Champions League Rules
        </div>
        <div className="right-sidebar-content">
          <ol style={{ paddingLeft: '20px' }}>
            <li>Be respectful to others</li>
            <li>No spam or self-promotion</li>
            <li>Use appropriate post flairs</li>
            <li>No low-effort content</li>
            <li>Mark spoilers for recent matches</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;