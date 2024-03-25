import React, { useState } from 'react';

interface AddIngredientFormProps {
  onSubmit: (ingredient: any) => void;
}

const AddIngredientForm: React.FC<AddIngredientFormProps> = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [articleNumber, setArticleNumber] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  // Create a new ingredient object
  const newIngredient = {
    [productName]: {
      [articleNumber]: [
        {
          id: 1, // You may want to generate this dynamically
          timestamp: new Date().toISOString(), // Current timestamp
          amount: parseFloat(weight),
          unit: unit, // Assuming the unit is always grams
          price: parseFloat(price)
        }
      ]
    }
  };

  console.log(newIngredient)
    // Call the onSubmit function with the newIngredient object
    onSubmit(newIngredient);

    // Reset form fields
    setProductName('');
    setArticleNumber('');
    setWeight('');
    setPrice('');
    setUnit('');
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit} className="add-ingredient-form">
        <h2>Add Ingredient</h2>
        <input type="text" placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} required />
        <input type="text" placeholder="ArticleNumber" value={articleNumber} onChange={e => setArticleNumber(e.target.value)} required />
        <input type="number" placeholder="Amount" value={weight} onChange={e => setWeight(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <input type="text" placeholder="Unit" value={unit} onChange={e => setUnit(e.target.value)} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddIngredientForm;
