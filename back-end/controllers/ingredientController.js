const Ingredient = require('../models/ingredient');
const RecipeIngredient = require('../models/recipe_ingredient');

// Controller method to get all ingredients
exports.getAllIngredients = async (req, res) => {
    try {
        const ingredient = await Ingredient.findAll();
        res.json(ingredient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller method to get a single ingredient by ID
exports.getIngredientById = async (req, res) => {
    const { id } = req.params;
    try {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json(ingredient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller method to create a new ingredient
exports.createIngredient = async (req, res) => {
    // Log the incoming data
    console.log('Incoming data:', req.body);
    
    const { ingredient_name, ingredient_amount, ingredient_unit_measurement, ingredient_cost, ingredient_supplier, ingredient_article_number } = req.body;
    try {
        let latestNumber = 0;
        
        // Find the highest existing ingredient_id
        const latestIngredient = await Ingredient.findOne({ 
            order: [ [ 'ingredient_id', 'DESC' ]]
        });
        
        if (latestIngredient) {
            // Extract the number from the highest existing ingredient_id
            const latestId = latestIngredient.ingredient_id;
            const matches = latestId.match(/\d+$/);
            if (matches) {
                latestNumber = parseInt(matches[0]);
            }
        }
        
        // Increment the number by 1
        let newNumber = latestNumber + 1;
        
        // Generate the new ingredient_id
        let newIngredientId;
        do {
            newIngredientId = `INGR${newNumber}`;
            // Check if the new ingredient_id already exists
            const existingIngredient = await Ingredient.findOne({ where: { ingredient_id: newIngredientId } });
            if (existingIngredient) {
                // If it exists, increment the number and try again
                newNumber++;
            } else {
                // If it doesn't exist, break the loop
                break;
            }
        } while (true);
        
        // Create the new ingredient object with the generated ID
        const newIngredient = await Ingredient.create({ 
            ingredient_id: newIngredientId,
            ingredient_name,
            ingredient_amount,
            ingredient_unit_measurement,
            ingredient_cost,
            ingredient_supplier,
            ingredient_article_number
        });
        res.status(201).json(newIngredient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Controller method to update an existing ingredient
exports.updateIngredient = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        await ingredient.update({ name });
        res.json(ingredient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Controller method to delete a recipe
exports.deleteIngredient = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete all data in the recipes_ingredients table where recipe_id equals the received id
        await RecipeIngredient.destroy({ where: { ingredient_id: id } });

        // Then delete the corresponding entry from the recipe table
        await Ingredient.destroy({ where: { ingredient_id: id } });

        // If everything goes well, send a success response
        res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error deleting recipe:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// // Controller method to delete an ingredient
// exports.deleteIngredient = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const ingredient = await Ingredient.findByPk(id);
//         if (!ingredient) {
//             return res.status(404).json({ message: 'Ingredient not found' });
//         }
//         await ingredient.destroy();
//         res.status(204).end();
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };