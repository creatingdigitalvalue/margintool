const express = require('express');
const ingredientRoutes = require('./routes/ingredientRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const recipeIngredientRoutes = require('./routes/recipeIngredientRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/recipe_ingredient', recipeIngredientRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});