import React from 'react';
import { Link } from 'react-router-dom';
// Import the navigation.gif - make sure the path is correct
import navigationGif from '../assets/navigation.gif';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create">Create a Character</Link>
      <Link to="/gallery">Squad Gallery</Link>
  
      <div className="nav-character">
        <img 
          src={navigationGif} 
          alt="Navigation" 
          className="nav-icon" 
          style={{ width: '225px', height: '220px' }}
        />
      </div>
    </nav>
  );
};

export default NavBar;