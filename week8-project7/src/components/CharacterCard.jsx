import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdventureTime from '../assets/AdventureTime.gif';
import Ben10 from '../assets/Ben10.gif';
import PowerPuffGirls from '../assets/PowerPuffGirls.gif';
import RegularShow from '../assets/RegularShow.gif';
import AmazingWorldofGumball from '../assets/AmazingWorldofGumball.gif';
import DefaultCharacter from '../assets/allChar.png';
import { supabase } from '../utils/supabaseClient';
import './CharacterCard.css';

const CharacterCard = ({ character, onDelete }) => {
  const navigate = useNavigate();

  const getCharacterImage = (name, show) => {
    const cleanName = name.toLowerCase().trim();

    if (cleanName.includes('finn') || cleanName.includes('jake')) return AdventureTime;
    if (cleanName.includes('ben') || cleanName.includes('tennyson')) return Ben10;
    if (cleanName.includes('blossom') || cleanName.includes('bubbles') || cleanName.includes('buttercup')) return PowerPuffGirls;
    if (cleanName.includes('mordecai') || cleanName.includes('rigby')) return RegularShow;
    if (cleanName.includes('gumball')) return AmazingWorldofGumball;

    switch (show) {
      case 'Adventure Time': return AdventureTime;
      case 'Ben 10': return Ben10;
      case 'Powerpuff Girls': return PowerPuffGirls;
      case 'Regular Show': return RegularShow;
      case 'Amazing World of Gumball': return AmazingWorldofGumball;
      default: return DefaultCharacter;
    }
  };

  const getShowClass = (show) => {
    switch (show) {
      case 'Adventure Time': return 'glow-adventure-time';
      case 'Ben 10': return 'glow-ben10';
      case 'Powerpuff Girls': return 'glow-powerpuff';
      case 'Regular Show': return 'glow-regular';
      case 'Amazing World of Gumball': return 'glow-gumball';
      default: return 'glow-default';
    }
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
