const Ingredient = require('../models/ingredient');

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
    const { name } = req.body;
    try {
        const newIngredient = await Ingredient.create({ name });
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

// Controller method to delete an ingredient
exports.deleteIngredient = async (req, res) => {
    const { id } = req.params;
    try {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        await ingredient.destroy();
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};