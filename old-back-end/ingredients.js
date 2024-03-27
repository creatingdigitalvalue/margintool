// ingredients.js
const fs = require('fs');
const path = require('path');

class IngredientService {
  constructor(jsonPath) {
    this.jsonPath = jsonPath;
  }

  saveIngredientData(newIngredientData) {
    const existingData = this.readDataFromFile();
    const jsonData = JSON.parse(existingData);
    jsonData.ingredients = { ...jsonData.ingredients, ...newIngredientData };
    this.writeDataToFile(jsonData);
  }

  readDataFromFile() {
    return fs.readFileSync(this.jsonPath);
  }

  writeDataToFile(data) {
    fs.writeFileSync(this.jsonPath, JSON.stringify(data, null, 2));
  }

  getIngredientData() {
    return JSON.parse(this.readDataFromFile());
  }

  deleteIngredientData(ingredientName) {
    const jsonData = this.getIngredientData();
    if (!jsonData.ingredients.hasOwnProperty(ingredientName)) {
      console.log(`Ingredient '${ingredientName}' not found`);
      return;
    }
    delete jsonData.ingredients[ingredientName];
    this.writeDataToFile(jsonData);
    console.log(`Ingredient '${ingredientName}' deleted successfully`);
  }
}

module.exports = IngredientService;