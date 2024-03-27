const Recipe = require('../models/recipe');
const { Ingredient } = require('../models/ingredient'); 


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
        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        await recipe.destroy();
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
