import React, { useState, useEffect } from 'react';

const CharacterForm = ({ initialData = {}, onSubmit, buttonText, showDelete = false, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    power: '',
    show: '',
    ...initialData
  });

  // Update form if initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        power: initialData.power || '',
        show: initialData.show || '',
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePowerSelect = (power) => {
    setFormData({ ...formData, power });
  };

  const handleShowSelect = (show) => {
    setFormData({ ...formData, show });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      alert('Please enter a name for your character!');
      return;
    }
    
    if (!formData.power) {
      alert('Please select a power for your character!');
      return;
    }
    
    if (!formData.show) {
      alert('Please select a show for your character!');
      return;
    }
    
    // Call the provided onSubmit function with the form data
    onSubmit(formData);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Character Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter character name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Power:</label>
        <div className="power-options">
          {['Super Strength', 'Flight', 'Shape Shifting', 'Magic', 'Speed', 'Intelligence', 'Elemental Control', 'Invulnerability'].map((power) => (
            <div className="option" key={power}>
              <input
                type="radio"
                id={`power-${power}`}
                name="power"
                value={power}
                checked={formData.power === power}
                onChange={() => handlePowerSelect(power)}
              />
              <label htmlFor={`power-${power}`}>{power}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Show:</label>
        <div className="show-options">
          {['Adventure Time', 'Ben 10', 'Powerpuff Girls', 'Regular Show', 'Amazing World of Gumball', 'Teen Titans'].map((show) => (
            <div className="option" key={show}>
              <input
                type="radio"
                id={`show-${show}`}
                name="show"
                value={show}
                checked={formData.show === show}
                onChange={() => handleShowSelect(show)}
              />
              <label htmlFor={`show-${show}`}>{show}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">{buttonText || 'Create Character'}</button>
        
        {showDelete && (
          <button 
            type="button" 
            className="button-delete" 
            onClick={onDelete}
          >
            Delete Character
          </button>
        )}
      </div>
    </form>
  );
};

export default CharacterForm;