import React, { useState, useEffect } from 'react';

// Inside IngredientCard component
interface IngredientCardProps {
  ingredient: string;
  articleNumberCount: number;
  onClick: () => void;
  onDeleteIngredient: () => void; // Define onDeleteIngredient prop
}


const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  articleNumberCount,
  onClick,
  onDeleteIngredient, // Add onDeleteIngredient to props
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  const handleDeleteConfirmation = () => {
    console.log({ingredient})
    setShowConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmation(false);
  };

  
  const handleDeleteConfirm = () => {
    fetch(`http://localhost:3000/ingredient/delete/${ingredient}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete ingredient');
        }
        return response.text();
      })
      .then(deletedIngredientName => {
        console.log(`Deleted ingredient: ${deletedIngredientName}`);
        onDeleteIngredient(); // Call onDeleteIngredient after successful deletion
        setShowConfirmation(false)
      })
      .catch(error => {
        console.error('Error deleting ingredient:', error);
      });
  };
  

  useEffect(() => {
    if (deleteStatus) {
      console.log(deleteStatus); // You can handle the delete status here as needed
    }
  }, [deleteStatus]);

  return (
    <div className='ingredient-card-wrapper'>
      <div className="ingredient-card" onClick={onClick}>
        <h3>{ingredient}</h3>
      </div>
      <div className='button-wrapper'>
        <button className='delete-button' onClick={handleDeleteConfirmation}>Delete</button>
      </div>
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete {ingredient}?</p>
          <button onClick={handleDeleteConfirm}>Yes</button>
          <button onClick={handleDeleteCancel}>No</button>
        </div>
      )}
    </div>
  );
};

export default IngredientCard;
