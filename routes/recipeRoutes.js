const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// GET all recipes and ingredients
router.get('/', recipeController.getAllRecipes);

// GET a single recipe by ID
router.get('/:id', recipeController.getRecipeById);

// POST a new recipe
router.post('/', recipeController.createRecipe);

// PUT update an existing recipe
router.put('/:id', recipeController.updateRecipe);

// DELETE a recipe
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
