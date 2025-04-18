import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  // Function to determine which image to show based on character name
  const getCharacterImage = (name, show) => {
    // Simplified check - in a real app you might have more sophisticated logic
    const cleanName = name.toLowerCase().trim();
    
    if (cleanName.includes('finn')) return '/finn.png';
    if (cleanName.includes('ben') || cleanName.includes('tennyson')) return '/ben10.png';
    if (cleanName.includes('blossom')) return '/blossom.png';
    if (cleanName.includes('marceline') || cleanName.includes('vampire')) return '/marceline.png';
    if (cleanName.includes('gumball')) return '/gumball.png';
    if (cleanName.includes('mojo')) return '/mojojojo.png';
    
    // If no match, determine a default based on the show
    switch(show) {
      case 'Adventure Time': return '/adventure-time-default.png';
      case 'Ben 10': return '/ben10-default.png';
      case 'Powerpuff Girls': return '/powerpuff-default.png';
      case 'Regular Show': return '/regular-show-default.png';
      case 'Amazing World of Gumball': return '/gumball-default.png';
      case 'Teen Titans': return '/teen-titans-default.png';
      default: return '/default-character.png';
    }
  };

  // Function to get CSS class for the show
  const getShowClass = (show) => {
    switch(show) {
      case 'Adventure Time': return 'show-adventure-time';
      case 'Ben 10': return 'show-ben-10';
      case 'Powerpuff Girls': return 'show-powerpuff';
      case 'Amazing World of Gumball': return 'show-gumball';
      default: return '';
    }
  };

  return (
    <div className={`character-card ${getShowClass(character.show)}`}>
      <div className="character-card-inner">
        <div className="character-avatar">
          <img 
            src={getCharacterImage(character.name, character.show)} 
            alt={character.name}
            onError={(e) => {e.target.src = '/default-character.png'}}
          />
        </div>
        <div className="character-info">
          <p><strong>Name:</strong> {character.name}</p>
          <p><strong>Power:</strong> {character.power}</p>
          <p><strong>Show:</strong> {character.show}</p>
        </div>
        <div className="character-actions">
          <Link to={`/update/${character.id}`}>
            <button className="edit-button">Edit Character</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;