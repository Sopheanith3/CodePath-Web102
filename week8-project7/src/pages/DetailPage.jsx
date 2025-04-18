import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

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
          // Character not found, navigate back to gallery
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

  // Function to get character image
  const getCharacterImage = (name, show) => {
    const cleanName = name ? name.toLowerCase().trim() : '';
    
    if (cleanName.includes('finn')) return '/finn.png';
    if (cleanName.includes('ben') || cleanName.includes('tennyson')) return '/ben10.png';
    if (cleanName.includes('blossom')) return '/blossom.png';
    if (cleanName.includes('marceline') || cleanName.includes('vampire')) return '/marceline.png';
    if (cleanName.includes('gumball')) return '/gumball.png';
    if (cleanName.includes('mojo')) return '/mojojojo.png';
    
    // If no match, determine a default based on the show
    if (show) {
      switch(show) {
        case 'Adventure Time': return '/adventure-time-default.png';
        case 'Ben 10': return '/ben10-default.png';
        case 'Powerpuff Girls': return '/powerpuff-default.png';
        case 'Regular Show': return '/regular-show-default.png';
        case 'Amazing World of Gumball': return '/gumball-default.png';
        case 'Teen Titans': return '/teen-titans-default.png';
        default: return '/default-character.png';
      }
    }
    
    return '/default-character.png';
  };

  // Function to get power description
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

  // Function to get show description
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
      <h1>Character: {character.name}</h1>
      
      <div className="detail-container">
        <div className="detail-header">
          <img 
            src={getCharacterImage(character.name, character.show)} 
            alt={character.name}
            className="detail-image"
            onError={(e) => {e.target.src = '/default-character.png'}}
          />
          
          <div>
            <h2>{character.name}</h2>
            <p><strong>From:</strong> {character.show}</p>
            <p><strong>Power:</strong> {character.power}</p>
          </div>
        </div>
        
        <div className="detail-stats">
          <h3>Power Details</h3>
          <p>{getPowerDescription(character.power)}</p>
          
          <h3>Show Background</h3>
          <p>{getShowDescription(character.show)}</p>
          
          <h3>Combat Effectiveness</h3>
          <p>This character would be particularly effective against Bloons with their {character.power} abilities, especially when teamed up with other characters from {character.show}!</p>
        </div>
        
        <div className="detail-actions">
          <Link to={`/update/${character.id}`}>
            <button>Edit This Character</button>
          </Link>
          <Link to="/gallery">
            <button>Back to Squad</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;