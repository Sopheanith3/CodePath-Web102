import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create">Create a Character</Link>
      <Link to="/gallery">Squad Gallery</Link>
      
      {/* Optional small character image in navbar */}
      <div className="nav-character">
        <img src="/finn-icon.png" alt="Finn" className="nav-icon" />
      </div>
    </nav>
  );
};

export default NavBar;