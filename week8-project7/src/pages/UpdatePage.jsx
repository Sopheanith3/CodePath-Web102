import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CharacterForm from '../components/CharacterForm';
import { supabase } from '../utils/supabaseClient';

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        console.error('Error fetching character for update:', error);
        alert('Error fetching character: ' + error.message);
        navigate('/gallery');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [id, navigate]);

  const handleUpdateCharacter = async (updatedData) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('character')
        .update(updatedData)
        .eq('id', id)
        .select();
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        navigate(`/character/${id}`);
      } else {
        alert('Failed to update character. Please try again.');
      }
    } catch (error) {
      console.error('Error updating character:', error);
      alert('Error updating character: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCharacter = async () => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase
          .from('character')
          .delete()
          .eq('id', id);
        
        if (error) {
          throw error;
        }
        
        navigate('/gallery');
      } catch (error) {
        console.error('Error deleting character:', error);
        alert('Error deleting character: ' + error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return <div className="loading">Loading character data...</div>;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="update-page">
      <h1>Update Your Character</h1>
      
      <div className="current-info">
        <h3>Current Character Info:</h3>
        <p>Name: {character.name}, Power: {character.power}, Show: {character.show}</p>
      </div>
      
      <CharacterForm 
        initialData={character}
        onSubmit={handleUpdateCharacter}
        buttonText={isSubmitting ? 'Updating...' : 'Update Character'}
        showDelete={true}
        onDelete={handleDeleteCharacter}
      />
    </div>
  );
};

export default UpdatePage;