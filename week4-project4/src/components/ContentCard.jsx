import React from 'react';
import './ContentCard.css';

function ContentCard({ item, isLoading, error, onAddToBanList, onDiscover }) {
  if (isLoading) {
    return (
      <div className="content-card loading">
        <div className="loading-spinner"></div>
        <p>Finding an amazing cat for you...</p>
        <button 
          className="discover-button" 
          onClick={onDiscover} 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Discover!'}
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-card error">
        <p>{error}</p>
        <button 
          className="discover-button" 
          onClick={onDiscover} 
          disabled={isLoading}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!item || !item.breeds || item.breeds.length === 0) {
    return (
      <div className="content-card empty">
        <p>No cat data available. Click "Discover!" to find a cat.</p>
        <button 
          className="discover-button" 
          onClick={onDiscover} 
          disabled={isLoading}
        >
          Discover!
        </button>
      </div>
    );
  }

  const breed = item.breeds[0];

  return (
    <div className="content-card">
      <div className="image-container">
        <img src={item.url} alt={breed.name} className="cat-image" />
      </div>
      
      <div className="cat-details">
        <h2>{breed.name}</h2>
        
        <div className="attribute-row">
          <span className="attribute-label">Origin:</span>
          <span 
            className="attribute-value clickable" 
            onClick={() => onAddToBanList('origin', breed.origin)}
            title="Click to ban this origin"
          >
            {breed.origin}
          </span>
        </div>
        
        <div className="attribute-row">
          <span className="attribute-label">Temperament:</span>
          <div className="temperament-tags">
            {breed.temperament.split(', ').map((trait, index) => (
              <span 
                key={index} 
                className="temperament-tag clickable"
                onClick={() => onAddToBanList('temperament', trait)}
                title="Click to ban this trait"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
        
        <div className="attribute-row">
          <span className="attribute-label">Life Span:</span>
          <span 
            className="attribute-value clickable" 
            onClick={() => onAddToBanList('life_span', breed.life_span)}
            title="Click to ban this life span"
          >
            {breed.life_span} years
          </span>
        </div>
        
        <div className="description">
          <p>{breed.description}</p>
        </div>
        
        <button 
          className="discover-button" 
          onClick={onDiscover} 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Discover!'}
        </button>
      </div>
    </div>
  );
}

export default ContentCard;