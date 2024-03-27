// models/RecipeIngredient.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');

class RecipeIngredient extends Model {}

RecipeIngredient.init({
  recipe_id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ingredient_id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ingredient_amount: DataTypes.NUMBER,
  ingredient_amount_waste: DataTypes.NUMBER,
  ingredient_amount_unit: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'RecipeIngredient',
  tableName: 'recipes_ingredients', // Make sure to specify the correct table name
  timestamps: false
});

// Define associations
RecipeIngredient.belongsTo(Recipe, { foreignKey: 'recipe_id', onDelete: 'CASCADE' });
RecipeIngredient.belongsTo(Ingredient, { foreignKey: 'ingredient_id', onDelete: 'CASCADE' });

module.exports = RecipeIngredient;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Recipe = require('./recipe');
// const Ingredient = require('./ingredient');


// const RecipeIngredient = sequelize.define('recipes_ingredients', {
//     recipe_id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     ingredient_id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     ingredient_amount: {
//         type: DataTypes.NUMBER,
//     },
//     ingredient_amount_waste: {
//         type: DataTypes.NUMBER,
//     },
//     ingredient_amount_unit: {
//         type: DataTypes.STRING,
//     },
// }, {
//     timestamps: false
// });


// RecipeIngredient.associate = (models) => {
//     RecipeIngredient.belongsTo(models.Recipe, { foreignKey: 'recipe_id' });
//     RecipeIngredient.belongsTo(models.Ingredient, { foreignKey: 'ingredient_id' });    
// };




// module.exports = RecipeIngredient;

