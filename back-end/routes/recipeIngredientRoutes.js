const express = require('express');
const router = express.Router();
const recipeIngredientController = require('../controllers/recipeIngredientController');

// GET all ingredients
router.get('/', recipeIngredientController.getAllRecipeIngredients);
router.get('/:recipe_id', recipeIngredientController.getRecipeIngredientsAndName);
router.post('/', recipeIngredientController.createRecipeWithIngredients);

module.exports = router;
