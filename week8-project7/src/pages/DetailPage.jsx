// DetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import AdventureTime from '../assets/AdventureTime.gif';
import Ben10 from '../assets/Ben10.gif';
import PowerPuffGirls from '../assets/PowerPuffGirls.gif';
import RegularShow from '../assets/RegularShow.gif';
import AmazingWorldofGumball from '../assets/AmazingWorldofGumball.gif';
import DefaultCharacter from '../assets/allChar.png';
import './DetailPage.css';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('character')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setCharacter(data);
        } else {
          alert('Character not found');
          navigate('/gallery');
        }
      } catch (error) {
        console.error('Error fetching character details:', error);
        alert('Error fetching character details: ' + error.message);
        navigate('/gallery');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [id, navigate]);

  const getCharacterImage = (name, show) => {
    const cleanName = name ? name.toLowerCase().trim() : '';
    
    if (cleanName.includes('finn') || cleanName.includes('jake')) return AdventureTime;
    if (cleanName.includes('ben') || cleanName.includes('tennyson')) return Ben10;
    if (cleanName.includes('blossom') || cleanName.includes('bubbles') || cleanName.includes('buttercup')) return PowerPuffGirls;
    if (cleanName.includes('mordecai') || cleanName.includes('rigby')) return RegularShow;
    if (cleanName.includes('gumball')) return AmazingWorldofGumball;
    
    if (show) {
      switch(show) {
        case 'Adventure Time': return AdventureTime;
        case 'Ben 10': return Ben10;
        case 'Powerpuff Girls': return PowerPuffGirls;
        case 'Regular Show': return RegularShow;
        case 'Amazing World of Gumball': return AmazingWorldofGumball;
        default: return DefaultCharacter;
      }
    }
    
    return DefaultCharacter;
  };

  const getPowerDescription = (power) => {
    switch(power) {
      case 'Super Strength':
        return "Can lift heavy objects and deal powerful physical attacks. Perfect for taking down those tough Bloons!";
      case 'Flight':
        return "Can soar through the skies with ease, accessing areas others can't reach and giving a tactical advantage.";
      case 'Shape Shifting':
        return "Can transform into different forms, adapting to any situation and confusing enemies.";
      case 'Magic':
        return "Wields mystical powers to cast spells, create illusions, and manipulate reality itself.";
      case 'Speed':
        return "Moves at incredible velocities, able to outrun enemies and attack in rapid succession.";
      case 'Intelligence':
        return "Uses superior intellect to outsmart foes, create gadgets, and develop winning strategies.";
      case 'Elemental Control':
        return "Commands the forces of nature, wielding fire, water, earth, or air against enemies.";
      case 'Invulnerability':
        return "Nearly impervious to harm, able to withstand attacks that would defeat others.";
      default:
        return "A mysterious power not yet fully understood.";
    }
  };

  const getShowDescription = (show) => {
    switch(show) {
      case 'Adventure Time':
        return "A post-apocalyptic land filled with magic and strange creatures, where heroes embark on surreal adventures.";
      case 'Ben 10':
        return "The story of a boy who discovers an alien device that allows him to transform into different alien heroes.";
      case 'Powerpuff Girls':
        return "Three super-powered kindergartners created in a laboratory accident who fight crime and the forces of evil.";
      case 'Regular Show':
        return "The surreal adventures of two groundskeepers who try to deal with bizarre situations but usually make things worse.";
      case 'Amazing World of Gumball':
        return "The misadventures of Gumball Watterson, a twelve-year-old cat, and his best friend Darwin in the town of Elmore.";
      case 'Teen Titans':
        return "A team of teenage superheroes who fight crime and various villains while dealing with issues common to adolescents.";
      default:
        return "A mysterious show with its own unique style and challenges.";
    }
  };

  if (isLoading) {
    return <div className="loading">Loading character details...</div>;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="detail-page">
      <h1 className="character-title">Character: {character.name}</h1>
      
      <div className="detail-container">
        <div className="character-name-container">
          <h2 className="character-name">{character.name}</h2>
        </div>
        
        <div className="character-content">
          <div className="character-image">
            <img 
              src={getCharacterImage(character.name, character.show)} 
              alt={character.name}
              onError={(e) => {e.target.src = DefaultCharacter}}
            />
          </div>
          
          <div className="character-info">
            <p><strong>From:</strong> {character.show}</p>
            <p><strong>Power:</strong> {character.power}</p>
          </div>
        </div>
        
        <div className="character-details">
          <div className="detail-section">
            <h3 className="section-title">Power Details</h3>
            <p>{getPowerDescription(character.power)}</p>
          </div>
          
          <div className="detail-section">
            <h3 className="section-title">Show Background</h3>
            <p>{getShowDescription(character.show)}</p>
          </div>
          
          <div className="detail-section">
            <h3 className="section-title">Combat Effectiveness</h3>
            <p>This character would be particularly effective against Bloons with their {character.power} abilities, especially when teamed up with other characters from {character.show}!</p>
          </div>
        </div>
        
        <div className="detail-actions">
          <Link to={`/update/${character.id}`}>
            <button className="edit-button">Edit This Character</button>
          </Link>
          <Link to="/gallery">
            <button className="back-button">Back to Squad</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;