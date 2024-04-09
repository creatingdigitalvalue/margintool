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

exports.createRecipeWithIngredients = async (req, res) => {
    try {
        // Extract data from the request body
        const { recipeName, ingredients } = req.body;

        // Generate a new recipe_id
        let latestNumber = 0;
        
        // Find the highest existing recipe_id
        const latestRecipe = await Recipe.findOne({ 
            order: [ [ 'recipe_id', 'DESC' ]]
        });
        
        if (latestRecipe) {
            // Extract the number from the highest existing recipe_id
            const latestId = latestRecipe.recipe_id;
            const matches = latestId.match(/\d+$/);
            if (matches) {
                latestNumber = parseInt(matches[0]);
            }
        }
        
        // Increment the number by 1
        let newNumber = latestNumber + 1;
        
        // Generate the new recipe_id
        let newRecipeId;
        do {
            newRecipeId = `RCPT${newNumber}`;
            // Check if the new recipe_id already exists
            const existingRecipe = await Recipe.findOne({ where: { recipe_id: newRecipeId } });
            if (existingRecipe) {
                // If it exists, increment the number and try again
                newNumber++;
            } else {
                // If it doesn't exist, break the loop
                break;
            }
        } while (true);

        // Create a new record in the recipes table
        const newRecipe = await Recipe.create({
            recipe_id: newRecipeId,
            recipe_name: recipeName
        });

        console.log('New Recipe:', newRecipe);

         // Create an array to store ingredients data
         const recipeIngredients = [];

         // Iterate over the ingredients object
         for (const [ingredientId, ingredientData] of Object.entries(ingredients)) {
             // Extract data for each ingredient
             const { amount, waste } = ingredientData;
 
             // Create an object with recipe_id, ingredient_id, ingredient_amount, and ingredient_amount_waste
             const recipeIngredient = {
                 recipe_id: newRecipeId, // Use the newly generated recipe_id
                 ingredient_id: ingredientId,
                 ingredient_amount: amount,
                 ingredient_amount_waste: waste
             };

             
 
             // Push the object into the array
             recipeIngredients.push(recipeIngredient);
                         // Create a new record in the recipe_ingredients table for each ingredient
            await RecipeIngredient.create({
                recipe_id: newRecipeId, // Use the newly generated recipe_id
                ingredient_id: ingredientId,
                ingredient_amount: amount,
                ingredient_amount_waste: waste
            });
        }
 
         // Now you have an array of objects with recipe_id, ingredient_id, ingredient_amount, and ingredient_amount_waste
         console.log('Recipe Ingredients:', recipeIngredients);


        } catch (error) {
            console.error('Error creating new recipe:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    //  try {
    //      let latestNumber = 0;
         
    //      // Find the highest existing ingredient_id
    //      const lastRecipe = await Ingredient.findOne({ 
    //          order: [ [ 'ingredient_id', 'DESC' ]]
    //      });
         
    //      if (lastRecipe) {
    //          // Extract the number from the highest existing ingredient_id
    //          const latestId = lastRecipe.ingredient_id;
    //          const matches = latestId.match(/\d+$/);
    //          if (matches) {
    //              latestNumber = parseInt(matches[0]);
    //          }
    //      }
         
    //      // Increment the number by 1
    //      let newNumber = latestNumber + 1;
         
    //      // Generate the new ingredient_id
    //      let newRecipeId;
    //      do {
    //         newRecipeId = `INGR${newNumber}`;
    //          // Check if the new ingredient_id already exists
    //          const existingRecipe = await Ingredient.findOne({ where: { recipe_id: newRecipeId } });
    //          if (existingRecipe) {
    //              // If it exists, increment the number and try again
    //              newNumber++;
    //          } else {
    //              // If it doesn't exist, break the loop
    //              break;
    //          }
    //      } while (true);
         
    //      // Create the new ingredient object with the generated ID
    //      const newIngredient = await Ingredient.create({ 
    //          ingredient_id: newIngredientId,
    //          ingredient_name,
    //          ingredient_amount,
    //          ingredient_unit_measurement,
    //          ingredient_cost,
    //          ingredient_supplier,
    //          ingredient_article_number
    //      });
    //      res.status(201).json(newIngredient);
    //  } catch (err) {
    //      console.error(err);
    //      res.status(500).json({ message: 'Internal Server Error' });
    //  }
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

