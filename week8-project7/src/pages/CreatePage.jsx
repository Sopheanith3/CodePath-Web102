import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterForm from '../components/CharacterForm';
import { supabase } from '../utils/supabaseClient';

const CreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateCharacter = async (characterData) => {
    setIsLoading(true);
    
    try {
      // Insert the new character into the database
      const { data, error } = await supabase
        .from('character')
        .insert([characterData])
        .select();
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        // Success! Navigate to the gallery page
        navigate('/gallery');
      } else {
        // Handle the case where no data was returned
        alert('Failed to create character. Please try again.');
      }
    } catch (error) {
      console.error('Error creating character:', error);
      alert('An error occurred while creating the character: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-page">
      <h1>Create a New Character</h1>
      
      {/* Optional character creation illustration */}
      <div className="character-image" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <img 
          src="/character-creation.png" 
          alt="Character Creation" 
          style={{maxHeight: '200px'}}
          onError={(e) => {e.target.src = 'https://via.placeholder.com/200x200?text=Character+Creation'}}
        />
      </div>
      
      <CharacterForm 
        onSubmit={handleCreateCharacter} 
        buttonText={isLoading ? 'Creating...' : 'Create Character'} 
      />
    </div>
  );
};

export default CreatePage;