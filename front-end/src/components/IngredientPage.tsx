import React, { useState, useEffect } from 'react';
import IngredientCard from './IngredientCard';
import AddIngredientForm from './AddIngredientForm';
import ArticleNumberCard from './ArticleNumberCard';

const IngredientPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<Array<{ ingredientId: string, id: number, timestamp: string, amount: number, unit: string, price: number }>>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3000/ingredient/list')
      .then(response => response.json())
      .then(data => {
        setIngredients(data.ingredients);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [showForm]);

  useEffect(() => {
    if (selectedIngredient) {
      fetch(`http://localhost:3000/ingredient/${selectedIngredient}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch additional information');
          }
          return response.json();
        })
        .then((data: { [key: string]: Array<{ id: number; timestamp: string; amount: number; unit: string; price: number }> }) => {
          const transformedData = Object.entries(data).flatMap(([ingredientId, ingredientInfo]) =>
            ingredientInfo.map(item => ({
              ingredientId,
              id: item.id,
              timestamp: item.timestamp,
              amount: item.amount,
              unit: item.unit,
              price: item.price
            }))
          );
          setAdditionalInfo(transformedData);
        })
        .catch(error => console.error('Error fetching additional information:', error));
    }
  }, [selectedIngredient]);

  const handleCardClick = (ingredientName: string) => {
    setSelectedIngredient(ingredientName);
  };

  // Inside IngredientPage component
const reloadIngredients = () => {
  fetch('http://localhost:3000/ingredient/list')
    .then(response => response.json())
    .then(data => {
      setIngredients(data.ingredients);
    })
    .catch(error => console.error('Error fetching data:', error));
};



  const handleAddIngredient = (newIngredient: any) => {
    fetch('http://localhost:3000/ingredient/addingredient', {
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
        const updatedIngredients = { ...prevIngredients };
        updatedIngredients[newIngredient.name] = newIngredient;
        return updatedIngredients;
      });
      setShowForm(false);
    })
    .catch(error => {
      console.error('Error adding ingredient:', error);
    });
  };

  const filteredIngredients = Object.keys(ingredients).filter(ingredient => {
    return ingredient.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container">
      <div className="header-row">
        <div>
        <h1>Ingredients</h1>
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
        </div>

        <div className='button-wrapper'>        
          <button onClick={() => setShowForm(true)}><svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5 0C14.3736 0 13.4605 0.913113 13.4605 2.03947V13.4606H2.03947C0.913113 13.4606 0 14.3736 0 15.5C0 16.6265 0.913113 17.5395 2.03947 17.5395H13.4605V28.9605C13.4605 30.0869 14.3736 31 15.5 31C16.6264 31 17.5395 30.0869 17.5395 28.9605V17.5395H28.9605C30.0869 17.5395 31 16.6265 31 15.5C31 14.3736 30.0869 13.4606 28.9605 13.4606H17.5395V2.03947C17.5395 0.913113 16.6264 0 15.5 0Z" fill="#B5E48D"/>
</svg>
</button>
        </div>

      </div>


      {showForm && <AddIngredientForm onSubmit={handleAddIngredient} />}

      <div className="ingredient-list">
        {selectedIngredient ? (
          additionalInfo.map((info, index) => (
            <ArticleNumberCard 
              key={index}
              ingredientId={info.ingredientId}
              id={info.id}
              timestamp={info.timestamp}
              amount={info.price}
              unit={info.unit}
              price={info.price}
            />
          ))
        ) : (
          filteredIngredients.map((ingredientName, index) => (
// Inside return statement, pass reloadIngredients as prop to IngredientCard
<IngredientCard
  key={index}
  ingredient={ingredientName}
  articleNumberCount={0}
  onClick={() => handleCardClick(ingredientName)}
  onDeleteIngredient={reloadIngredients} // Pass the reloadIngredients function as a prop
/>
          ))
        )}
      </div>
    </div>
  );
};

export default IngredientPage;
