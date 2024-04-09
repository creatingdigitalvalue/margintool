import React, { useState, useEffect } from 'react';
import IngredientCard from './IngredientCard';
import AddIngredientForm from './AddIngredientForm';

interface IngredientData {
  ingredient_id: string;
  ingredient_name: string;
  ingredient_article_number: number;
  ingredient_unit_measurement: string;
  ingredient_amount: number;
  ingredient_supplier: string;
  ingredient_cost: number;
}

const IngredientPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<IngredientData[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<IngredientData | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showForm, setShowForm] = useState(false);

  // Fetch ingredients from API
  useEffect(() => {
    fetch('http://localhost:3000/api/ingredients')
      .then(response => response.json())
      .then(data => {
        setIngredients(data || []); // Ensure data is not undefined before setting state
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to ensure it only runs once on component mount

  useEffect(() => {
    if (selectedIngredient) {
      fetch(`http://localhost:3000/api/ingredients/${selectedIngredient}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch additional information');
          }
          return response.json();
        })
        .then(data => {
          setAdditionalInfo(data);
          console.log(data);
        })
        .catch(error => console.error('Error fetching additional information:', error));
    }
  }, [selectedIngredient]);

  // Filter ingredients based on search query
  const filteredIngredients = ingredients.filter(ingredient => {
    return ingredient.ingredient_name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Function to reload ingredients
  const reloadIngredients = () => {
    fetch('http://localhost:3000/api/ingredients')
      .then(response => response.json())
      .then(data => {
        setIngredients(data || []); // Ensure data is not undefined before setting state
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  // Function to handle adding a new ingredient
  const handleAddIngredient = (newIngredient: any) => {
    fetch('http://localhost:3000/api/ingredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIngredient),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add ingredient');
      }
      return response.json();
    })
    .then(data => {
      setIngredients(prevIngredients => {
        // Assuming newIngredient has unique ID
        return [...prevIngredients, newIngredient];
      });
      setShowForm(false);
    })
    .catch(error => {
      console.error('Error adding ingredient:', error);
    });
  };

  // Function to handle click on ingredient card
  const handleCardClick = (ingredientId: string) => {
    setSelectedIngredient(ingredientId);
  };


  return (
    <div className="container">
      <div className="header-row">
        <h1>Ingredients</h1>
      </div>
      <div className='button-wrapper'>    
      <div className='search-wrapper'>
          <div className='svg-box'>
          <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.6483 9.81663L8.68232 7.77195C9.21642 6.97207 9.53043 6.00072 9.53043 4.95492C9.53043 2.22256 7.39227 0 4.7649 0C2.1374 0 0 2.22256 0 4.95492C0 7.68793 2.1374 9.91036 4.7649 9.91036C5.48896 9.91036 6.17533 9.74126 6.79048 9.43937L8.9009 11.6343C9.12843 11.8701 9.4321 12 9.75518 12C10.0863 12 10.3988 11.8647 10.6349 11.6197C11.1165 11.1188 11.1224 10.3094 10.6483 9.81663ZM1.90583 4.95492C1.90583 3.31569 3.18857 1.98163 4.7649 1.98163C6.34147 1.98163 7.62421 3.31569 7.62421 4.95492C7.62421 6.59467 6.34147 7.9286 4.7649 7.9286C3.18857 7.9286 1.90583 6.59467 1.90583 4.95492Z" fill="#B5E48D"/>
          </svg>
          </div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search ingredient..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        </div>
    
                  <button onClick={() => setShowForm(true)}><svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 0C14.3736 0 13.4605 0.913113 13.4605 2.03947V13.4606H2.03947C0.913113 13.4606 0 14.3736 0 15.5C0 16.6265 0.913113 17.5395 2.03947 17.5395H13.4605V28.9605C13.4605 30.0869 14.3736 31 15.5 31C16.6264 31 17.5395 30.0869 17.5395 28.9605V17.5395H28.9605C30.0869 17.5395 31 16.6265 31 15.5C31 14.3736 30.0869 13.4606 28.9605 13.4606H17.5395V2.03947C17.5395 0.913113 16.6264 0 15.5 0Z" fill="#B5E48D"/>
        </svg>
        </button>
        </div>


      <div className="ingredient-list">
        {ingredients.map((ingredient, index) => (
          <IngredientCard
            key={index}
            ingredient={ingredient.ingredient_name}
            ingredient_id={ingredient.ingredient_id}            
            onClick={() => handleCardClick(ingredient.ingredient_id)}
            onDeleteIngredient={reloadIngredients} // Pass the reloadIngredients function as a prop
          />
        ))}
      </div>
    
      {/* Conditionally render the AddIngredientForm */}
      {showForm && <AddIngredientForm 
        onSubmit={handleAddIngredient} // Assuming handleAddIngredient is a function to handle form submission
        setShowForm={setShowForm} 
      />}


      {/* Overlay menu to display additional information */}
      {selectedIngredient && additionalInfo && (
        <div className="overlay-menu">
          <h2>Additional Information</h2>
          <p>Ingredient ID: {additionalInfo.ingredient_id}</p>
          <p>Name: {additionalInfo.ingredient_name}</p>
          <p>Article Number: {additionalInfo.ingredient_article_number}</p>
          <p>Unit Measurement: {additionalInfo.ingredient_unit_measurement}</p>
          <p>Amount: {additionalInfo.ingredient_amount}</p>
          <p>Supplier: {additionalInfo.ingredient_supplier}</p>
          <p>Cost: {additionalInfo.ingredient_cost}</p>
          <button onClick={() => setSelectedIngredient(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default IngredientPage;
