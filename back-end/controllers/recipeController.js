const Recipe = require('../models/recipe');
const RecipeIngredient = require('../models/recipe_ingredient'); 


// Controller method to get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.findAll();
        res.json(recipes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller method to get a single recipe by ID
exports.getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller method to create a new recipe
exports.createRecipe = async (req, res) => {
    const { name, ingredients } = req.body;
    try {
        const newRecipe = await Recipe.create({ name, ingredients });
        res.status(201).json(newRecipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller method to update an existing recipe
exports.updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients } = req.body;
    try {
        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        await recipe.update({ name, ingredients });
        res.json(recipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller method to delete a recipe
exports.deleteRecipe = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete all data in the recipes_ingredients table where recipe_id equals the received id
        await RecipeIngredient.destroy({ where: { recipe_id: id } });

        // Then delete the corresponding entry from the recipe table
        await Recipe.destroy({ where: { recipe_id: id } });

        // If everything goes well, send a success response
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error deleting recipe:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
