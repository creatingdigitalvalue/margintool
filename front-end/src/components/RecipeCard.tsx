import React from 'react';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  recipe_name: string;
  recipe_id: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe_name, recipe_id }) => {
  return (
    <div className="recipe-card">
      <h2>{recipe_name}</h2>
      {/* Add a button or link to navigate to the new page */}
      <Link to={`/recipes/${recipe_id}`}>View Details</Link>
    </div>
  );
};

export default RecipeCard;
