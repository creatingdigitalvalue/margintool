// App.tsx
import React from 'react';
import IngredientPage from './components/IngredientPage';
import "./App.css"

const App: React.FC = () => {
  return (
    <div className="App">
      <IngredientPage />
    </div>
  );
};

export default App;