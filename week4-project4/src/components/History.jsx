import React from 'react';
import './History.css';

function History({ history }) {
  if (history.length <= 1) {
    return null;
  }
  const previousItems = history.slice(1, 6); 

  return (
      <div className="history-container">
        <h2>Previously Discovered</h2>
        <div className="history-items">
          {previousItems.map((item, index) => {
            if (!item.breeds || item.breeds.length === 0) return null;
            
            const breed = item.breeds[0];
            
            return (
              <div key={index} className="history-item">
                <div className="history-image-container">
                  <img src={item.url} alt={breed.name} className="history-image" />
                </div>
                <div className="history-details">
                  <h3>{breed.name}</h3>
                  <p>{breed.origin}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
}

export default History;