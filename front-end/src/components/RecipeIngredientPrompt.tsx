// RecipeIngredientPrompt.tsx

import React, { useState } from 'react';

interface RecipeIngredientPromptProps {
  ingredientId: string;
  initialFormData: any;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}


const RecipeIngredientPrompt: React.FC<RecipeIngredientPromptProps> = ({ ingredientId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData); // Pass the form data to the parent component
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <div className="prompt">
      <h3>Add data for Ingredient ID: {ingredientId}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input type="text" name="amount" onChange={handleChange} />
        </label>
        <label>
          Waste:
          <input type="text" name="waste" onChange={handleChange} />
        </label>
        {/* Add more form fields as needed */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RecipeIngredientPrompt;
