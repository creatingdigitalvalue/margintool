import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  recipe_name: string;
  recipe_id: string;
  onDeleteIngredient: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe_name, 
  recipe_id,
  onDeleteIngredient
}) => {
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  const showDeleteConfirmation = () => {
    setShowConfirmation(true);
};

  const openMenuItems = () => {
    setShowMenuItems(true);
  };

  const closeMenuItems = () => {
    setShowMenuItems(false);
  };

  const handleViewDetails = () => {
    closeMenuItems(); // Close the menu when viewing details
  };

  
  const handleDeleteConfirm = () => {
    // Send DELETE request to the API
    fetch(`http://localhost:3000/api/recipes/${recipe_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Optionally handle success, like updating UI or refreshing data
        console.log('Recipe deleted successfully');
        onDeleteIngredient(); // Call onDeleteIngredient after successful deletion
      } else {
        // Handle error, maybe show an error message
        console.error('Failed to delete recipe');
      }
    })
    .catch(error => {
      console.error('Error deleting recipe:', error);
    })
    .finally(() => {
      setShowConfirmation(false); // Close the confirmation modal regardless of success or failure
    });
  };
  

  useEffect(() => {
    if (deleteStatus) {
      console.log(deleteStatus); // You can handle the delete status here as needed
    }
  }, [deleteStatus]);

  return (
    <div className='ingredient-card-wrapper'>
      <div className="ingredient-card">
        <h3>{recipe_name}</h3>
        {/* SVG Icon */}
        <svg onClick={openMenuItems} width="20" height="20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M39.9 0C17.9 0 0 17.8 0 39.9C0 61.9 17.8 79.8 39.9 79.8C61.9 79.8 79.8 62 79.8 39.9C79.7 17.8 61.9 0 39.9 0ZM16.9 45.7C9.4 45.7 9.5 34.1 16.9 34.1C24.4 34.2 24.3 45.7 16.9 45.7ZM39.9 45.7C32.4 45.7 32.5 34.1 39.9 34.1C47.4 34.2 47.3 45.7 39.9 45.7ZM63.1 45.7C55.6 45.7 55.7 34.1 63.1 34.1C70.5 34.2 70.5 45.7 63.1 45.7Z" fill="#E7FFEF"/>
        </svg>
      </div>
        {showMenuItems && (
          <div className="menu-options">
            {/* Link to view details */}
            <Link to={`/recipes/${recipe_id}`} onClick={handleViewDetails}>View Details</Link>
            {/* Other menu options */}
            <button onClick={() => {
              showDeleteConfirmation();
              closeMenuItems();
          }}>Delete Item</button>
            <button>Edit Item</button>
            <button onClick={closeMenuItems}> X </button>
          </div>
        )}

      {showConfirmation && (
        <div className="menu-delete-conformation">
          <p>Are you sure you want to delete?</p>
          <button onClick={() => {
              handleDeleteConfirm();
          }}>Yes</button>
          <button >No</button>
        </div>
      )}

      </div>
  );
};

export default RecipeCard;
