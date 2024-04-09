import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface IngredientRecipes {
    ingredient_id: string;
    recipe_id: string;
    ingredient_name: string;
    ingredient_amount: number;
    ingredient_amount_unit: string;
    ingredient_amount_waste: number;
    ingredient_amount_totaly_added: number;
    ingredient_amount_costs: number;
}

const RecipeDetailsPage: React.FC = () => {
    const { recipeId } = useParams(); // Get the recipe ID from the URL
    const [ingredientRecipes, setIngredientRecipes] = useState<IngredientRecipes[]>([]);
    const [sumOfNewValues, setSumOfNewValues] = useState<number>(0);
    const [multipliedValue, setMultipliedValue] = useState<number>(0);

    // Fetch ingredient recipes using recipeId
    useEffect(() => {
        fetch(`http://localhost:3000/api/recipe_ingredient/${recipeId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setIngredientRecipes(data.formattedIngredients);
                setSumOfNewValues(data.totalIngredientCosts);
                setMultipliedValue(data.multipliedValue);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [recipeId]); // Include recipeId in the dependency array to re-run effect when recipeId changes

    return (
        <div className='container'>
            <h1>Recipe Details</h1>
            <p>Recipe ID: {recipeId}</p>
            <h2>Ingredient Recipes:</h2>
            <div>
                <div className='ingredient-recipes'>
                    {ingredientRecipes.map(ingredientRecipe => (
                        <div className="ingredient-card" key={`${ingredientRecipe.recipe_id}-${ingredientRecipe.ingredient_id}`}>
                            <h3>{ingredientRecipe.ingredient_name}</h3>
                            <p>Amount: {ingredientRecipe.ingredient_amount} {ingredientRecipe.ingredient_amount_unit}</p>
                            <p>Waste: {ingredientRecipe.ingredient_amount_waste}</p>
                            <p>Amount added: {ingredientRecipe.ingredient_amount_totaly_added} {ingredientRecipe.ingredient_amount_unit}</p>
                            <p>Cost pro Unit: {ingredientRecipe.ingredient_amount_costs} Euro</p>
                        </div>
                    ))}
                </div>
            </div>
            <h2>Summary:</h2>
            <div className="ingredient-recipes-summary">
                <p>Net Amount Produkts: € {sumOfNewValues}</p>
                <p>Gross Amount Target Price: € {multipliedValue}</p>
            </div>
        </div>
    );
};

export default RecipeDetailsPage;
