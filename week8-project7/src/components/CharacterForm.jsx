import React, { useState } from 'react';
import './CharacterForm.css'; 

const CharacterForm = ({ onSubmit, buttonText }) => {
  const [characterName, setCharacterName] = useState('');
  const [power, setPower] = useState('');
  const [show, setShow] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!characterName || !power || !show) {
      alert('Please fill out all fields.');
      return;
    }

    const characterData = {
      name: characterName,
      power,
      show,
    };

    onSubmit(characterData);
  };

  return (
    <form className="character-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <label className="form-label">Character Name:</label>
        <input
          type="text"
          className="form-input"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          placeholder="Enter character name"
        />
      </div>

      <div className="form-section">
        <p className="form-label">Power:</p>
        <div className="radio-grid">
          {[
            'Super Strength', 'Flight',
            'Shape Shifting', 'Magic',
            'Speed', 'Intelligence',
            'Elemental Control', 'Invulnerability',
          ].map((p) => (
            <label key={p} className="radio-label">
              <input
                type="radio"
                name="power"
                value={p}
                checked={power === p}
                onChange={(e) => setPower(e.target.value)}
              />
              {p}
            </label>
          ))}
        </div>
      </div>

      <div className="form-section">
        <p className="form-label">Show:</p>
        <div className="radio-grid">
          {[
            'Adventure Time', 'Ben 10',
            'Powerpuff Girls', 'Regular Show',
            'Amazing World of Gumball', 'Teen Titans',
          ].map((s) => (
            <label key={s} className="radio-label">
              <input
                type="radio"
                name="show"
                value={s}
                checked={show === s}
                onChange={(e) => setShow(e.target.value)}
              />
              {s}
            </label>
          ))}
        </div>
      </div>

      <div className="button-container">
        <button type="submit" className="submit-button">
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default CharacterForm;
