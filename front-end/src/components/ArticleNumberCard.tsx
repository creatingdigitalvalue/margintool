// ArticleNumberCard.jsx
import React from 'react';


interface ArticleNumberCardProps {
    ingredientId: string, 
    id: number, 
    timestamp: string, 
    amount: number, 
    unit: string, 
    price: number
  }

  const ArticleNumberCard: React.FC<ArticleNumberCardProps> = ({
    ingredientId,
    id,
    timestamp,
    amount,
    unit,
    price,
  }) => {
    return (
      <div className="ingredient-card">
        <h3>Article number: <br></br>{ingredientId}</h3>
        <p>History Id:<br></br>{id}</p>
        <p>Timestamp: <br></br>{timestamp}</p>
        <p>Amount: <br></br>{amount}</p>
        <p>Price: <br></br>{price} </p>
        <p>Unit: <br></br>{unit}</p>

        <button>edit</button>
        

      </div>
    );
  };
export default ArticleNumberCard;