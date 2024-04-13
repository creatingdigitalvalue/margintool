const express = require('express');
const ingredientRoutes = require('./routes/ingredientRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const recipeIngredientRoutes = require('./routes/recipeIngredientRoutes');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
const path = require('path');
const { join } = require('path');

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'build')))

app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/recipe_ingredient', recipeIngredientRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});