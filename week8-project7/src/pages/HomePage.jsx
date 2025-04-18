import React from 'react';
import { Link } from 'react-router-dom';
import allCharImg from '../assets/allChar.png';
import logoImg from '../assets/Cartoon-network-logo.png';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Cartoon Network Squad Creator!</h1>
      
      <div className="home-content">
        <p className="home-description">
          Here is where you will strategically assemble your Cartoon Network squad to take down those vicious 'Bloons.'
        </p>
        
        <div className="home-image">
          <img 
            src={allCharImg} 
            alt="Cartoon Network Characters" 
          />
          
          <img 
            src={logoImg} 
            alt="Cartoon Network Logo" 
            style={{marginTop: '2rem'}}
          />
        </div>
        
        <div className="home-buttons">
          <Link to="/create">
            <button>Create a Character</button>
          </Link>
          <Link to="/gallery">
            <button>View Squad</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;