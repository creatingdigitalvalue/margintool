import React, { useState, useEffect } from 'react';

// Inside IngredientCard component
interface IngredientCardProps {
  ingredient: string;
  ingredient_id: string;
  onClick: () => void;
  onDeleteIngredient: () => void;
}


const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  ingredient_id,
  onClick,
  onDeleteIngredient, // Add onDeleteIngredient to props
}) => {
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  const openMenuItems = () => {
    setShowMenuItems(true);
  };

  const closeMenuItems = () => {
    setShowMenuItems(false);
  };

  const showDeleteConfirmation = () => {
      setShowConfirmation(true);
  };

  


  const handleDeleteConfirm = () => {
    fetch(`http://localhost:3000/api/ingredients/${ingredient_id}`, {
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
      <div className="ingredient-card">
        <h3>{ingredient}</h3>
    <svg onClick={openMenuItems} width="20" height="20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.9 0C17.9 0 0 17.8 0 39.9C0 61.9 17.8 79.8 39.9 79.8C61.9 79.8 79.8 62 79.8 39.9C79.7 17.8 61.9 0 39.9 0ZM16.9 45.7C9.4 45.7 9.5 34.1 16.9 34.1C24.4 34.2 24.3 45.7 16.9 45.7ZM39.9 45.7C32.4 45.7 32.5 34.1 39.9 34.1C47.4 34.2 47.3 45.7 39.9 45.7ZM63.1 45.7C55.6 45.7 55.7 34.1 63.1 34.1C70.5 34.2 70.5 45.7 63.1 45.7Z" fill="#E7FFEF"/>
</svg>
</div>
      {showMenuItems && (
        <div className="menu-options">
          <button onClick={onClick}>View Item</button>
          <button onClick={() => {
              showDeleteConfirmation();
              closeMenuItems();
          }}>Delete Item</button>
          <button >Edit Item</button>
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

export default IngredientCard;