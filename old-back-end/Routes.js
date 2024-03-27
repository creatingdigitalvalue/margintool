// Route.js
const express = require("express");
const router = express.Router();
var fs = require('fs');
var path = require('path');

const ingredientRoutes = require('./ingredients.js')

router.use(ingredientRoutes) 


var jsonPath = path.join(__dirname, '..', 'data', 'ingredients.json');


const deleteIngredientData = (ingredientName) => {
  // Read existing JSON data from the file
  const existingData = fs.readFileSync(jsonPath);
  const jsonData = JSON.parse(existingData);

  // Check if the ingredient exists
  if (!jsonData.ingredients.hasOwnProperty(ingredientName)) {
    console.log(`Ingredient '${ingredientName}' not found`);
    return;
  }

  // Delete the ingredient and its data
  delete jsonData.ingredients[ingredientName];

  // Convert the updated data to JSON format
  const updatedData = JSON.stringify(jsonData, null, 2);

  // Write the updated JSON data back to the file
  fs.writeFileSync(jsonPath, updatedData);

  console.log(`Ingredient '${ingredientName}' deleted successfully`);
};

// util functions
const saveIngredientData = (newIngredientData) => {
  // Read existing JSON data from the file
  const existingData = fs.readFileSync(jsonPath);
  const jsonData = JSON.parse(existingData);

  // Append the new ingredient data to the existing data under the "ingredients" key
  jsonData.ingredients = { ...jsonData.ingredients, ...newIngredientData };

  // Convert the updated data to JSON format
  const updatedData = JSON.stringify(jsonData, null, 2);

  // Write the updated JSON data back to the file
  fs.writeFileSync(jsonPath, updatedData);
};

const getIngredientData = () => {
    const jsonData = fs.readFileSync(jsonPath)
    return JSON.parse(jsonData)   
}

ingredientRoutes.post('/ingredient/addingredient', (req, res) => {
 
    data = req.body
    console.log("test",data)

    const productName = Object.keys(data)[0];
    const articleNumber = Object.keys(data[productName])[0];
    const { id, timestamp, amount, unit, price } = data[productName][articleNumber][0];

    // Creating the object to add to the JSON file
    const newIngredient = {
      [productName]: {
        [articleNumber]: [
          {
            id,
            timestamp,
            amount,
            unit,
            price
          }
        ]
      }
    };

    console.log("tetxt",newIngredient);
    saveIngredientData(newIngredient);
    res.send({success: true, msg: 'account added successfully'})
})

// Read - get all accounts from the json file
ingredientRoutes.get('/ingredient/list', (req, res) => {
    const accounts = getIngredientData()
    res.send(accounts)
  })
  
// Update - using Put method
ingredientRoutes.put('/ingredient/:id', (req, res) => {
    var existAccounts = getIngredientData()
    fs.readFile(jsonPath, 'utf8', (err, data) => {
      const accountId = req.params['id'];
      existAccounts[accountId] = req.body;
      saveIngredientData(existAccounts);
      res.send(`accounts with id ${accountId} has been updated`)
    }, true);
  });


  // Fetch selected ingredient by name
ingredientRoutes.get('/ingredient/:name', (req, res) => {
  const ingredientName = req.params.name
  const ingredients = getIngredientData().ingredients;
  const selectedIngredient = ingredients[ingredientName];
  
  if (selectedIngredient) {
      res.send(selectedIngredient);
      console.log(selectedIngredient)
  } else {
      res.status(404).send({ error: 'Ingredient not found' });
  }
});

ingredientRoutes.delete('/ingredient/delete/:ingredient', (req, res) => {
  const ingredientId = req.params.ingredient;
  console.log('Ingredient ID received:', ingredientId);

  // Assuming deleteIngredientData performs the deletion operation
  deleteIngredientData(ingredientId);
  
  // Since there's no response sent from the backend, you can just log a message if the deletion is successful
  console.log(`Ingredient '${ingredientId}' deleted successfully`);

  // Optionally, you can send a status code as an acknowledgment of the request being processed successfully
  res.sendStatus(204); // No Content status
});

module.exports = router;
