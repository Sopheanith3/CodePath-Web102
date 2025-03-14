import React from 'react';

function ShuffleButton({ onClick }) {
  return (
    <button 
      className="shuffle-button" 
      onClick={onClick}
      style={{
        padding: '8px 15px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '0 10px'
      }}
    >
      Shuffle Cards
    </button>
  );
}

export default ShuffleButton;