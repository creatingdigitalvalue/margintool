const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

// GET all ingredients
router.get('/', ingredientController.getAllIngredients);

// GET a single ingredient by ID
router.get('/:id', ingredientController.getIngredientById);

// POST a new ingredient
router.post('/', ingredientController.createIngredient);

// PUT update an existing ingredient
router.put('/:id', ingredientController.updateIngredient);

// DELETE an ingredient
router.delete('/:id', ingredientController.deleteIngredient);

module.exports = router;
