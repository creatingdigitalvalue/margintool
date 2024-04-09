import React from 'react';

interface Ingredient {
  // Define the properties of the ingredient object
  // For example:
  ingredient_name: string;

  // Add more properties as needed
}

interface RecipeIngredientCardProps {
  ingredient: Ingredient;
  index: number;
  onClick: () => void; // Define onClick prop
}

const RecipeIngredientCard: React.FC<RecipeIngredientCardProps> = ({ ingredient, index, onClick }) => {
    return (

    <div className="ingredient-card" onClick={onClick}>
      <h3>{ingredient.ingredient_name}</h3>
    </div>
  );
};

export default RecipeIngredientCard;
