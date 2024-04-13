import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import RecipePageOverlay from './RecipePageOverlay';

interface RecipeData {
  recipe_id: string;
  recipe_name: string;
}

const RecipePage: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeData[]>([]);
  const [showOverlay, setShowOverlay] = useState(false); // State for controlling overlay visibility



  // Fetch ingredients from API
  useEffect(() => {
    fetch('/api/recipes')
      .then(response => response.json())
      .then(data => {
        setRecipes(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to ensure it only runs once on component mount

  
  useEffect(() => {
    // Ensure recipes is defined before filtering
    if (recipes) {
      const filtered = recipes.filter(recipe =>
        recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [searchQuery, recipes]);
  const closeOverlay = async () => {
    setShowOverlay(false);
  
    try {
      // Refetch recipes from API
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    
    // Inside IngredientPage component
const reloadRecipes = () => {
  fetch('/api/recipes')
    .then(response => response.json())
    .then(data => {
      setRecipes(data.recipes);
    })
    .catch(error => console.error('Error fetching data:', error));
};


  return (
    <div className="container">
      <div className="header-row">
        <h1>Recipes</h1>
      </div>

      <div className='button-wrapper'>    
        <div className='search-wrapper'>
          <div className='svg-box'>
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6483 9.81663L8.68232 7.77195C9.21642 6.97207 9.53043 6.00072 9.53043 4.95492C9.53043 2.22256 7.39227 0 4.7649 0C2.1374 0 0 2.22256 0 4.95492C0 7.68793 2.1374 9.91036 4.7649 9.91036C5.48896 9.91036 6.17533 9.74126 6.79048 9.43937L8.9009 11.6343C9.12843 11.8701 9.4321 12 9.75518 12C10.0863 12 10.3988 11.8647 10.6349 11.6197C11.1165 11.1188 11.1224 10.3094 10.6483 9.81663ZM1.90583 4.95492C1.90583 3.31569 3.18857 1.98163 4.7649 1.98163C6.34147 1.98163 7.62421 3.31569 7.62421 4.95492C7.62421 6.59467 6.34147 7.9286 4.7649 7.9286C3.18857 7.9286 1.90583 6.59467 1.90583 4.95492Z" fill="#B5E48D"/>
            </svg>
          </div>
          <input
            className="search-bar"
            type="text"
            placeholder="Search recipe..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
    
        {showOverlay && <RecipePageOverlay onClose={closeOverlay} />} {/* Render overlay conditionally based on state */}
        
        <button onClick={() => setShowOverlay(true)}>
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 0C14.3736 0 13.4605 0.913113 13.4605 2.03947V13.4606H2.03947C0.913113 13.4606 0 14.3736 0 15.5C0 16.6265 0.913113 17.5395 2.03947 17.5395H13.4605V28.9605C13.4605 30.0869 14.3736 31 15.5 31C16.6264 31 17.5395 30.0869 17.5395 28.9605V17.5395H28.9605C30.0869 17.5395 31 16.6265 31 15.5C31 14.3736 30.0869 13.4606 28.9605 13.4606H17.5395V2.03947C17.5395 0.913113 16.6264 0 15.5 0Z" fill="#B5E48D"/>
          </svg>
        </button>
      </div>

      <div className="ingredient-list">
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe_name={recipe.recipe_name}
            recipe_id={recipe.recipe_id}   
            onDeleteIngredient={reloadRecipes} // Pass the reloadIngredients function as a prop      
          />
        ))}
      </div>
      
    </div>
  );
};

export default RecipePage;
