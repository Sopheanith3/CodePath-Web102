import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Cartoon Network Squad Creator!</h1>
      
      <div className="home-content">
        <p className="home-description">
          Here is where you will strategically assemble your Cartoon Network squad to take down those vicious 'Bloons.'
        </p>
        
        <div className="home-image">
          {/* You would need to add the actual cartoon network character images */}
          <img 
            src="/cartoon-squad.png" 
            alt="Cartoon Network Characters" 
            onError={(e) => {e.target.src = 'https://via.placeholder.com/800x400?text=Cartoon+Network+Characters'}}
          />
          
          <img 
            src="/bloon.png" 
            alt="Bloon Enemy" 
            style={{marginTop: '2rem'}}
            onError={(e) => {e.target.src = 'https://via.placeholder.com/400x200?text=Bloon+Enemy'}}
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