import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>Veni Vici!</h1>
      <p>Discover cats from your wildest dreams!</p>
      <div className="rainbow-divider">
        {'🐈 🐱 😼 😾 😿 😸 🙀 🐈'.split(' ').map((emoji, index) => (
          <span key={index} className="emoji">{emoji}</span>
        ))}
      </div>
    </header>
  );
}

export default Header;