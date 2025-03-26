import React, { useState, useEffect } from 'react';
import './App.css';
import ContentCard from './components/ContentCard';
import BanList from './components/BanList';
import Header from './components/Header';
import History from './components/History';

function App() {
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  // Get API key from environment variables
  const apiKey = import.meta.env.VITE_APP_CAT_API_KEY;
  
  // Fetch a random cat from the API
  const fetchRandomCat = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=1', {
        headers: {
          'x-api-key': apiKey
        }
      });
      const data = await response.json();
      
      if (data && data.length > 0) {
        // Get more details about the breed
        const breedId = data[0].breeds[0].id;
        const breedResponse = await fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`);
        const breedData = await breedResponse.json();
        
        // Combine data
        const catWithDetails = {
          ...data[0],
          breedDetails: breedData
        };
        
        // Check if the cat matches any attributes in the ban list
        const isBanned = checkIfBanned(catWithDetails);
        
        if (isBanned) {
          // If banned, fetch another cat
          fetchRandomCat();
        } else {
          setCurrentItem(catWithDetails);
          // Add to history
          setHistory(prevHistory => [catWithDetails, ...prevHistory]);
        }
      } else {
        setError('No cat data found. Please try again.');
      }
    } catch (err) {
      setError('Error fetching cat data. Please try again.');
      console.error(err);
    }
    
    setIsLoading(false);
  };

  // Check if an item is banned based on its attributes
  const checkIfBanned = (item) => {
    if (!item.breeds || item.breeds.length === 0) return false;
    
    return banList.some(bannedAttr => {
      const { attribute, value } = bannedAttr;
      
      if (attribute === 'origin') {
        return item.breeds[0].origin === value;
      } else if (attribute === 'temperament') {
        return item.breeds[0].temperament.includes(value);
      } else if (attribute === 'life_span') {
        return item.breeds[0].life_span === value;
      }
      
      return false;
    });
  };

  // Add an attribute to the ban list
  const addToBanList = (attribute, value) => {
    if (!attribute || !value) return;
    
    // Check if already in ban list
    const alreadyBanned = banList.some(item => 
      item.attribute === attribute && item.value === value
    );
    
    if (!alreadyBanned) {
      setBanList([...banList, { attribute, value }]);
    }
  };

  // Remove an attribute from the ban list
  const removeFromBanList = (index) => {
    const updatedBanList = [...banList];
    updatedBanList.splice(index, 1);
    setBanList(updatedBanList);
  };

  // Initialize with a random cat when the component mounts
  useEffect(() => {
    fetchRandomCat();
  }, []);

  return (
    <div className="app">
      <Header />
      
      <div className="content-container">
        <div className="main-content">
          <ContentCard 
            item={currentItem} 
            isLoading={isLoading} 
            error={error}
            onDiscover={fetchRandomCat}
            onAddToBanList={addToBanList}
          />
          
          <button 
            className="discover-button" 
            onClick={fetchRandomCat} 
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Discover!'}
          </button>
        </div>
        
        <div className="sidebar">
          <BanList 
            banList={banList} 
            onRemoveFromBanList={removeFromBanList} 
          />
          
          <History history={history} />
        </div>
      </div>
    </div>
  );
}

export default App;