// AddIngredientButton.tsx
import React from 'react';

interface AddIngredientButtonProps {
  onClick: () => void;
}

const AddIngredientButton: React.FC<AddIngredientButtonProps> = ({ onClick }) => {
  return (
    <button className="add-ingredient-button" onClick={onClick}>
      Add Ingredient
    </button>
  );
};

export default AddIngredientButton;
