import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { supabase } from '../utils/supabaseClient';

const GalleryPage = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch characters when component mounts
    const fetchCharacters = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('character')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setCharacters(data || []);
      } catch (error) {
        console.error('Error fetching characters:', error);
        alert('Error fetching characters: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Function to calculate squad stats
  const calculateSquadStats = () => {
    if (characters.length === 0) return null;
    
    // Count characters by show
    const showCounts = characters.reduce((acc, char) => {
      acc[char.show] = (acc[char.show] || 0) + 1;
      return acc;
    }, {});
    
    // Find most common power
    const powerCounts = characters.reduce((acc, char) => {
      acc[char.power] = (acc[char.power] || 0) + 1;
      return acc;
    }, {});
    
    const mostCommonPower = Object.entries(powerCounts).sort((a, b) => b[1] - a[1])[0];
    
    // Calculate squad effectiveness (just for fun)
    const powerScore = characters.reduce((score, char) => {
      switch(char.power) {
        case 'Super Strength': return score + 8;
        case 'Flight': return score + 7;
        case 'Shape Shifting': return score + 9;
        case 'Magic': return score + 10;
        case 'Speed': return score + 6;
        case 'Intelligence': return score + 7;
        case 'Elemental Control': return score + 9;
        case 'Invulnerability': return score + 8;
        default: return score + 5;
      }
    }, 0);
    
    const effectiveness = ((powerScore / (characters.length * 10)) * 100).toFixed(0);
    
    return {
      showCounts,
      mostCommonPower: mostCommonPower ? mostCommonPower[0] : 'None',
      effectiveness
    };
  };

  const squadStats = calculateSquadStats();

  return (
    <div className="gallery-page">
      <h1>Your Cartoon Network Squad!</h1>

      {isLoading ? (
        <div className="loading">Loading characters...</div>
      ) : characters.length === 0 ? (
        // Empty state when no characters exist
        <div className="empty-state">
          <p>You haven't created any characters yet!</p>
          <img 
            src="/empty-squad.png" 
            alt="Empty Squad" 
            style={{maxWidth: '300px', margin: '2rem 0'}}
            onError={(e) => {e.target.src = 'https://via.placeholder.com/300x200?text=Empty+Squad'}}
          />
          <Link to="/create">
            <button>Create one here!</button>
          </Link>
        </div>
      ) : (
        <>
          {/* Squad stats section */}
          {squadStats && (
            <div className="fun-stats">
              <h3>Squad Stats</h3>
              <p>Total Squad Members: <span className="stat-highlight">{characters.length}</span></p>
              <p>Most Common Power: <span className="stat-highlight">{squadStats.mostCommonPower}</span></p>
              <p>Squad Effectiveness Against Bloons: <span className="stat-highlight">{squadStats.effectiveness}%</span></p>
              {squadStats.effectiveness > 75 ? 
                <p>Your squad is unstoppable! The Bloons don't stand a chance!</p> :
                squadStats.effectiveness > 50 ?
                <p>Pretty good squad! Keep adding powerful members!</p> :
                <p>Your squad might need some more training before taking on the Bloons!</p>
              }
            </div>
          )}
          
          {/* Display the character gallery */}
          <div className="gallery-container">
            {characters.map(character => (
              <Link to={`/character/${character.id}`} key={character.id} style={{ textDecoration: 'none' }}>
                <CharacterCard character={character} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GalleryPage;