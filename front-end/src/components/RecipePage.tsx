import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

interface RecipeData {
    recipe_id: string;
    recipe_name: string;
  }

const RecipePage: React.FC = () => {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);

// Fetch ingredients from API
  useEffect(() => {
    fetch('http://localhost:3000/api/recipes')
      .then(response => response.json())
      .then(data => {
        setRecipes(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to ensure it only runs once on component mount

  return (
    <div className="container">
      <div className="header-row">
        <h1>Recipes</h1>
      </div>

      <div className="ingredient-list">
        {recipes.map((recipes, index) => (
          <RecipeCard
            key={index}
            recipe_name={recipes.recipe_name}
            recipe_id={recipes.recipe_id}            
          />
        ))}
      </div>
      </div>
)};

export default RecipePage;