import React from 'react';
import './BanList.css';

function BanList({ banList, onRemoveFromBanList }) {
  if (banList.length === 0) {
    return (
      <div className="ban-list-container">
        <h2>Ban List</h2>
        <p className="empty-message">Select an attribute in your listing to ban it.</p>
      </div>
    );
  }

return (
    <div className="ban-list-container">
      <h2>Ban List</h2>
      <ul className="ban-list">
        {banList.map((item, index) => (
          <li key={index} className="ban-item">
            <div className="ban-info">
              <span className="ban-attribute">{formatAttribute(item.attribute)}:</span>
              <span className="ban-value">{item.value}</span>
            </div>
            <button 
              className="remove-button" 
              onClick={() => onRemoveFromBanList(index)}
              aria-label="Remove from ban list"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Helper function to format attribute names
function formatAttribute(attribute) {
  if (!attribute) return '';
  
  // Convert snake_case to Title Case
  return attribute
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export default BanList;