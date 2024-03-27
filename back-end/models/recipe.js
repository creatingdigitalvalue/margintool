// models/Recipe.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Recipe extends Model {}

Recipe.init({
  recipe_id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  recipe_name: {
    type: DataTypes.STRING,
    primaryKey: true
  },
}, {
  sequelize,
  modelName: 'recipes',
  timestamps: false
});

module.exports = Recipe;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const Ingredient = require('./ingredient');
// const RecipeIngredient = require('./recipe_ingredient');


// const Recipe = sequelize.define('recipes', {
//     recipe_id: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     recipe_name: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//         allowNull: false
//     }}
//     ,{
//         timestamps: false // Disable timestamps
//     });

// Recipe.hasMany(RecipeIngredient, { foreignKey: 'recipe_id' });

// module.exports = Recipe;