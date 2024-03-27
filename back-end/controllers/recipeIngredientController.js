const RecipeIngredient = require('../models/recipe_ingredient');
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');


// Controller method to get all recipe ingredients
exports.getAllRecipeIngredients = async (req, res) => {
    try {
        const recipeIngredients = await RecipeIngredient.findAll();
        res.json(recipeIngredients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getRecipeIngredientsAndName = async (req, res) => {
    const { recipe_id } = req.params;

    try {
        const recipeIngredients = await RecipeIngredient.findAll({
            where: { recipe_id },
            include: [{ model: Ingredient, attributes: ['ingredient_name', 'ingredient_cost','ingredient_amount'] }]
        });

        // Calculate ingredient_amount_totaly_added for each ingredient
        const formattedIngredients = recipeIngredients.map(ingredient => {
            exports.getRecipeIngredientsAndName = async (req, res) => {
                const { recipe_id } = req.params;
            
                try {
                    const recipeIngredients = await RecipeIngredient.findAll({
                        where: { recipe_id },
                        include: [{ model: Ingredient, attributes: ['ingredient_name', 'ingredient_cost', 'ingredient_amount'] }]
                    });
            
                    // Calculate ingredient_amount_totaly_added for each ingredient
                    const formattedIngredients = recipeIngredients.map(ingredient => {
                        let totalAdded;
                        if (ingredient.ingredient_amount_waste === 0) {
                            totalAdded = ingredient.ingredient_amount;
                        } else {
                            totalAdded = ingredient.ingredient_amount * ingredient.ingredient_amount_waste;
                        }
            
                        // Calculate the new value based on the given formula and round it to two decimal places
                        const newValue = ((ingredient.ingredient.ingredient_cost / ingredient.ingredient.ingredient_amount) * totalAdded).toFixed(2);
            
                        return {
                            recipe_id: ingredient.recipe_id,
                            ingredient_id: ingredient.ingredient_id,
                            ingredient_name: ingredient.ingredient ? ingredient.ingredient.ingredient_name : 'Unknown',
                            ingredient_cost: ingredient.ingredient ? ingredient.ingredient.ingredient_cost : 'Unknown',
                            ingredient_amount_eka: ingredient.ingredient ? ingredient.ingredient.ingredient_amount : 'Unknown',
                            ingredient_amount: ingredient.ingredient_amount,
                            ingredient_amount_unit: ingredient.ingredient_amount_unit,
                            ingredient_amount_waste: ingredient.ingredient_amount_waste,
                            ingredient_amount_totaly_added: totalAdded, // Add calculated ingredient_amount_totaly_added
                            new_calculation: newValue // Add the new calculation
                        };
                    });
            
                    // Sum up all the new values
                    const sumOfNewValues = formattedIngredients.reduce((total, ingredient) => total + parseFloat(ingredient.new_calculation), 0);
            
                    // Multiply the sum by 3.09 and 1.07
                    const multipliedValue = (sumOfNewValues * 3.09 * 1.07).toFixed(2);
            
                    res.json({
                        formattedIngredients,
                        sumOfNewValues,
                        multipliedValue
                    });
                } catch (error) {
                    console.error('Error retrieving recipe ingredients:', error);
                    res.status(500).json({ message: 'Internal server error' });
                }
            };
                  let totalAdded;
            if (ingredient.ingredient_amount_waste === 0) {
                totalAdded = ingredient.ingredient_amount;
            } else {
                totalAdded = ingredient.ingredient_amount * ingredient.ingredient_amount_waste;
            }

            // Calculate the new value based on the given formula and round to two decimal places
            const newValue = ((ingredient.ingredient.ingredient_cost / ingredient.ingredient.ingredient_amount) * totalAdded).toFixed(2);


            return {
                recipe_id: ingredient.recipe_id,
                ingredient_id: ingredient.ingredient_id,
                ingredient_name: ingredient.ingredient ? ingredient.ingredient.ingredient_name : 'Unknown',
                ingredient_cost: ingredient.ingredient ? ingredient.ingredient.ingredient_cost : 'Unknown',
                ingredient_amount_eka: ingredient.ingredient ? ingredient.ingredient.ingredient_amount : 'Unknown',
                ingredient_amount: ingredient.ingredient_amount,
                ingredient_amount_unit: ingredient.ingredient_amount_unit,
                ingredient_amount_waste: ingredient.ingredient_amount_waste,
                ingredient_amount_totaly_added: totalAdded, // Add calculated ingredient_amount_totaly_added
                ingredient_amount_costs: newValue // Add the new calculation
            };
        });
        
        // Function to sum up all the values of ingredient_amount_costs
        function sumIngredientCosts(ingredients) {
            let totalCost = 0;
            ingredients.forEach(ingredient => {
            totalCost += parseFloat(ingredient.ingredient_amount_costs);
            });
            return totalCost;
        }
        
        // Calculate the sum of ingredient_amount_costs
        const totalIngredientCosts = sumIngredientCosts(formattedIngredients);
        console.log(totalIngredientCosts)

        // Multiply the sum by 3.09 and 1.07
        const multipliedValue = (totalIngredientCosts * 3.09 * 1.07).toFixed(2);
        console.log(multipliedValue)


        res.json({
            formattedIngredients,
            totalIngredientCosts,
            multipliedValue
        });

    } catch (error) {
        console.error('Error retrieving recipe ingredients:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

