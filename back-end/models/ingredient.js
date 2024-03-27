// models/Ingredient.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Ingredient extends Model {}

Ingredient.init({
  ingredient_id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ingredient_name: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ingredient_article_number: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ingredient_unit_measurement: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ingredient_amount: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ingredient_supplier: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ingredient_cost: {
    type: DataTypes.STRING,
    primaryKey: true
  },
}, {
  sequelize,
  modelName: 'ingredients',
  timestamps: false
});

module.exports = Ingredient;

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const Recipe = require('./recipe');
// const RecipeIngredient = require('./recipe_ingredient');

// const Ingredient = sequelize.define('ingredients', {
//     ingredient_id: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     ingredient_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     ingredient_article_number: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     ingredient_unit_measurement: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     ingredient_amount: {
//         type: DataTypes.FLOAT,
//         allowNull: true
//     },
//     ingredient_supplier: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     ingredient_cost: {
//         type: DataTypes.FLOAT,
//         allowNull: true
//     }
// }, {
//     timestamps: false // Disable timestamps
// });

// Ingredient.hasMany(RecipeIngredient, { foreignKey: 'ingredient_id' });

// module.exports = Ingredient;
