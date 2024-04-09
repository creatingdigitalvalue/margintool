import React, { useState } from 'react';

interface AddIngredientFormProps {
  onSubmit: (ingredient: any) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>; // Define setShowForm in AddIngredientFormProps
}

const AddIngredientForm: React.FC<AddIngredientFormProps> = ({ onSubmit, setShowForm }) => {
  const [productName, setProductName] = useState('');
  const [articleNumber, setArticleNumber] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [supplier, setSupplier] = useState('');

  const handleCloseForm = () => {
    setShowForm(false); // Set setShowForm to false to close the form
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new ingredient object
    const newIngredient = {
      ingredient_name: productName,
      ingredient_amount: parseFloat(weight),
      ingredient_unit_measurement: unit,
      ingredient_cost: parseFloat(price),
      ingredient_supplier: supplier,
      ingredient_article_number: articleNumber
    };

    // Call the onSubmit function with the newIngredient object
    onSubmit(newIngredient);

    // Reset form fields
    setProductName('');
    setArticleNumber('');
    setWeight('');
    setPrice('');
    setUnit('');
    setSupplier('');
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit} className="add-ingredient-form">
      <svg className="close-form-button "onClick={handleCloseForm} width="18" height="18" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.79829 0.201708C7.52934 -0.067243 7.09331 -0.0672292 6.82437 0.201708L3.99999 3.02608L1.17563 0.201717C0.906688 -0.0672207 0.470656 -0.0672345 0.201707 0.201717C-0.0672398 0.470668 -0.0672316 0.906703 0.201707 1.17564L3.02607 4L0.201717 6.82436C-0.0672205 7.09329 -0.0672301 7.52933 0.201717 7.79828C0.470665 8.06723 0.906699 8.06722 1.17564 7.79828L3.99999 4.97391L6.82436 7.7983C7.09329 8.06723 7.52933 8.06723 7.79828 7.7983C8.06722 7.52935 8.06722 7.0933 7.79828 6.82436L4.97391 4L7.79829 1.17563C8.06722 0.906695 8.06723 0.470659 7.79829 0.201708Z" fill="#B9CCBF"/>
</svg>

        <h2>Add Ingredient</h2>
        <input type="text" placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} required />
        <input type="text" placeholder="ArticleNumber" value={articleNumber} onChange={e => setArticleNumber(e.target.value)} required />
        <input type="number" placeholder="Amount" value={weight} onChange={e => setWeight(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <input type="text" placeholder="Unit" value={unit} onChange={e => setUnit(e.target.value)} required />
        <input type="text" placeholder="Supplier" value={supplier} onChange={e => setSupplier(e.target.value)} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddIngredientForm;
