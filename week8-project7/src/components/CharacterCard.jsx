import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdventureTime from '../assets/AdventureTime.gif';
import Ben10 from '../assets/Ben10.gif';
import PowerPuffGirls from '../assets/PowerPuffGirls.gif';
import RegularShow from '../assets/RegularShow.gif';
import AmazingWorldofGumball from '../assets/AmazingWorldofGumball.gif';
import TeenTitans from '../assets/TeenTitans.gif'; 
import DefaultCharacter from '../assets/allChar.png';
import { supabase } from '../utils/supabaseClient';
import './CharacterCard.css';

const CharacterCard = ({ character, onDelete }) => {
  const navigate = useNavigate();

  const getCharacterImage = (name, show) => {
    const cleanName = name.toLowerCase().trim();
    const cleanShow = show.toLowerCase().trim();

    if (cleanName.includes('finn') || cleanName.includes('jake')) return AdventureTime;
    if (cleanName.includes('ben') || cleanName.includes('tennyson')) return Ben10;
    if (cleanName.includes('blossom') || cleanName.includes('bubbles') || cleanName.includes('buttercup')) return PowerPuffGirls;
    if (cleanName.includes('mordecai') || cleanName.includes('rigby')) return RegularShow;
    if (cleanName.includes('gumball')) return AmazingWorldofGumball;
    if (cleanName.includes('robin') || cleanName.includes('raven') || cleanName.includes('cyborg') || cleanShow === 'teen titans') return TeenTitans;

    switch (cleanShow) {
      case 'adventure time': return AdventureTime;
      case 'ben 10': return Ben10;
      case 'powerpuff girls': return PowerPuffGirls;
      case 'regular show': return RegularShow;
      case 'amazing world of gumball': return AmazingWorldofGumball;
      case 'teen titans': return TeenTitans;
      default: return DefaultCharacter;
    }
  };

  const getShowClass = (show) => {
    const normalized = show.toLowerCase().trim();

    if (normalized === 'teen titans') return 'glow-teen-titans';
    if (normalized === 'adventure time') return 'glow-adventure-time';
    if (normalized === 'ben 10') return 'glow-ben10';
    if (normalized === 'powerpuff girls') return 'glow-powerpuff';
    if (normalized === 'regular show') return 'glow-regular';
    if (normalized === 'amazing world of gumball') return 'glow-gumball';

    return 'glow-default';
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${character.name}?`);
    if (!confirmed) return;

    const { error } = await supabase
      .from('character')
      .delete()
      .eq('id', character.id);

    if (error) {
      console.error('Delete failed:', error.message);
      alert('Failed to delete character.');
    } else {
      alert(`${character.name} has been removed.`);
      onDelete(); // refresh the list
    }
  };

  return (
    <div className={`character-card ${getShowClass(character.show)}`}>
      <div className="character-card-inner">
        <div className="character-avatar">
          <img
            src={getCharacterImage(character.name, character.show)}
            alt={character.name}
            onError={(e) => { e.target.src = DefaultCharacter }}
          />
        </div>
        <div className="character-info">
          <p><strong>Name:</strong> {character.name}</p>
          <p><strong>Power:</strong> {character.power}</p>
          <p><strong>Show:</strong> {character.show}</p>
        </div>
        <div className="character-actions">
          <button className="view-button" onClick={() => navigate(`/character/${character.id}`)}>View</button>
          <Link to={`/update/${character.id}`}>
            <button className="edit-button">Edit</button>
          </Link>
          <button className="delete-button" onClick={handleDelete}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
