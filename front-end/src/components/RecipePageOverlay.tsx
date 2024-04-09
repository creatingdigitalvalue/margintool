// RecipePageOverlay.tsx

import React, { useState, useEffect } from 'react';
import RecipeIngredientCard from './RecipeIngredientCard';
import RecipeIngredientPrompt from './RecipeIngredientPrompt';
import { Ingredient } from '../types/types';

interface RecipePageOverlayProps {
  onClose: () => void;
}


const RecipePageOverlay: React.FC<RecipePageOverlayProps> = ({ onClose }) => {
  const [recipeName, setRecipeName] = useState<string>("");
  const [Ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipeIngredients, setRecipeIngredients] = useState<Ingredient[]>([]);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<any>({});
  


  const handleSaveRecipe = () => {
    // Combine recipe name and submitted data to send to backend
    const recipeData = {
      recipeName: recipeName,
      ingredients: submittedData
    };

    console.log(recipeData)

    // Example fetch to save recipe data to backend
    fetch('http://localhost:3000/api/recipe_ingredient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    })
    
    .then(response => response.json())
    .then(data => {
      console.log('Recipe saved successfully:', data);
      // Optionally handle success response
    })
    .catch(error => {
      console.error('Error saving recipe:', error);
      // Optionally handle error
    });
  };

  useEffect(() => {
    // Fetch ingredient data
    fetch('http://localhost:3000/api/ingredients')
      .then(response => response.json())
      .then(data => {
        setIngredients(data);
      })
      .catch(error => console.error('Error fetching ingredient data:', error));
  }, []);

  const handleAddToRecipe = (ingredient: Ingredient) => {
    setRecipeIngredients(prevIngredients => [...prevIngredients, ingredient]);
    setSelectedIngredientId(ingredient.ingredient_id); // Use the ingredient_id as the identifier
    setShowPrompt(true);
  };
  const handleClosePrompt = () => {
    setShowPrompt(false);
  };

  const handleSubmitPrompt = (formData: any) => {
    setSubmittedData((prevData: any) => ({
      ...prevData,
      [selectedIngredientId]: formData, // Use selectedIngredientId as the key
    }));
  };
  
  const handleEditIngredient = (ingredientId: string) => {
    setShowPrompt(true);
    setSelectedIngredientId(ingredientId); // Set the selected ingredient ID
    setSubmittedData((prevData: any) => ({
      ...prevData,
      [ingredientId]: prevData[ingredientId] || {} // Ensure the ingredient data exists
    }));
  };
  

  const handleDeleteIngredient = (ingredientId: string) => {
    setSubmittedData((prevData: any) => {
      const newData = { ...prevData };
      delete newData[ingredientId];
      return newData;
    });
  };


  return (
    <div className="recipe-overlay">
      <div className='container'>
      <button onClick={onClose} className="close-button-svg" >
            <svg width="18" height="18" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.79829 0.201708C7.52934 -0.067243 7.09331 -0.0672292 6.82437 0.201708L3.99999 3.02608L1.17563 0.201717C0.906688 -0.0672207 0.470656 -0.0672345 0.201707 0.201717C-0.0672398 0.470668 -0.0672316 0.906703 0.201707 1.17564L3.02607 4L0.201717 6.82436C-0.0672205 7.09329 -0.0672301 7.52933 0.201717 7.79828C0.470665 8.06723 0.906699 8.06722 1.17564 7.79828L3.99999 4.97391L6.82436 7.7983C7.09329 8.06723 7.52933 8.06723 7.79828 7.7983C8.06722 7.52935 8.06722 7.0933 7.79828 6.82436L4.97391 4L7.79829 1.17563C8.06722 0.906695 8.06723 0.470659 7.79829 0.201708Z" fill="#B9CCBF"></path></svg>
          </button>  
        <h1>Create Recipe Menu</h1>      
        <div>
          <button onClick={handleSaveRecipe}>Save Recipe</button>
        </div>
        <div className='recipe-name-input'>
          <label htmlFor="recipeName">Recipe Name:</label>
          <input
            type="text"
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </div>
        <h2>Selected Ingredients for Recipe:</h2>
        <div className='selected-ingredients'>
        <div className="selected-ingredient-wrapper">
    {(Object.entries(submittedData) as [string, any][]).map(([ingredientId, ingredient]) => (
      <div className="ingredient-card" key={ingredientId}>
                <p>{(ingredient as Ingredient).ingredient_name}</p>
                <p>Amount: {(ingredient as any).data1}</p>
                <p>Waste: {(ingredient as any).data2}</p>
                <svg className="selected-ingredient-card-delete" width="18" height="18" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleDeleteIngredient(ingredientId.toString())} ><path d="M7.79829 0.201708C7.52934 -0.067243 7.09331 -0.0672292 6.82437 0.201708L3.99999 3.02608L1.17563 0.201717C0.906688 -0.0672207 0.470656 -0.0672345 0.201707 0.201717C-0.0672398 0.470668 -0.0672316 0.906703 0.201707 1.17564L3.02607 4L0.201717 6.82436C-0.0672205 7.09329 -0.0672301 7.52933 0.201717 7.79828C0.470665 8.06723 0.906699 8.06722 1.17564 7.79828L3.99999 4.97391L6.82436 7.7983C7.09329 8.06723 7.52933 8.06723 7.79828 7.7983C8.06722 7.52935 8.06722 7.0933 7.79828 6.82436L4.97391 4L7.79829 1.17563C8.06722 0.906695 8.06723 0.470659 7.79829 0.201708Z" fill="#B9CCBF"></path></svg>
                <a className="selected-ingredient-card-edit" onClick={() => handleEditIngredient(ingredientId.toString())}>Edit</a>

            </div>
            ))}
        </div>
          {showPrompt && (
        <RecipeIngredientPrompt
          ingredientId={selectedIngredientId}
          initialFormData={submittedData}
          onClose={handleClosePrompt}
          onSubmit={handleSubmitPrompt}
        />
      )}
        </div>
        <h2>Ingredient List</h2>
        <div className="ingredient-list overlay">
          {Ingredients.map((ingredient, index) => (
            <RecipeIngredientCard
              key={index}
              ingredient={ingredient}
              index={index}
              onClick={() => handleAddToRecipe(ingredient)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipePageOverlay;
