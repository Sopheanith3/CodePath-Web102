import React from 'react';
import { Link } from 'react-router-dom';
// Import the navigation.gif
import navigationGif from '../assets/navigation.gif';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create">Create a Character</Link>
      <Link to="/gallery">Squad Gallery</Link>
      
      {/* Using the navigation.gif in navbar with increased size */}
      <div className="nav-character">
        <img 
          src={navigationGif} 
          alt="Navigation" 
          className="nav-icon" 
          style={{ width: '225px', height: '220px' }} // Adjust these values as needed
        />
      </div>
    </nav>
  );
};

export default NavBar;