// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IngredientPage from './components/IngredientPage';
import RecipePage from './components/RecipePage';
import RecipeDetailsPage from './components/RecipeDetailsPage'; // Assuming you have a component for recipe details

import "./App.css"

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/ingredients" element={<IngredientPage />} />
            <Route path="/recipes" element={<RecipePage />} />
            <Route path="/" element={<RecipePage />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />
          </Routes>
        </div>
        <nav className="bottom-nav">
          <ul>
            <li>
              <Link to="/recipes">
                <svg width="100" height="42" viewBox="0 0 60 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.75 12.1997H11.25C11.25 11.938 11.3817 11.687 11.6161 11.502C11.8505 11.3169 12.1685 11.213 12.5 11.213C12.8315 11.213 13.1495 11.3169 13.3839 11.502C13.6183 11.687 13.75 11.938 13.75 12.1997ZM25 6.27954V24.0399C25 24.825 24.6049 25.5779 23.9017 26.133C23.1984 26.6881 22.2446 27 21.25 27H3.75001C2.75545 27 1.80162 26.6881 1.09836 26.133C0.395102 25.5779 1.36065e-05 24.825 1.36065e-05 24.0399V6.27954C-0.00254054 5.53068 0.354579 4.80889 0.999413 4.25961C1.64425 3.71033 2.52886 3.37438 3.47501 3.31947L17.725 0.112731C18.2843 -0.0127322 18.873 -0.0338024 19.4444 0.0511849C20.0158 0.136172 20.5544 0.324888 21.0175 0.602422C21.4807 0.879957 21.8557 1.2387 22.113 1.65032C22.3703 2.06194 22.5028 2.51514 22.5 2.97413V3.50694C23.2274 3.70994 23.8578 4.08511 24.3052 4.5813C24.7526 5.07748 24.9953 5.67052 25 6.27954ZM16.25 20.0932C16.25 19.8315 16.1183 19.5805 15.8839 19.3955C15.6495 19.2104 15.3315 19.1065 15 19.1065H10C9.66849 19.1065 9.35055 19.2104 9.11613 19.3955C8.88171 19.5805 8.75001 19.8315 8.75001 20.0932C8.75001 20.3549 8.88171 20.6058 9.11613 20.7909C9.35055 20.9759 9.66849 21.0799 10 21.0799H15C15.3315 21.0799 15.6495 20.9759 15.8839 20.7909C16.1183 20.6058 16.25 20.3549 16.25 20.0932ZM16.25 17.1331C16.25 16.8714 16.1183 16.6205 15.8839 16.4354C15.6495 16.2504 15.3315 16.1464 15 16.1464H10C9.66849 16.1464 9.35055 16.2504 9.11613 16.4354C8.88171 16.6205 8.75001 16.8714 8.75001 17.1331C8.75001 17.3948 8.88171 17.6458 9.11613 17.8308C9.35055 18.0158 9.66849 18.1198 10 18.1198H15C15.3315 18.1198 15.6495 18.0158 15.8839 17.8308C16.1183 17.6458 16.25 17.3948 16.25 17.1331ZM16.25 12.1997C16.2504 11.5873 16.0102 10.9899 15.5624 10.4898C15.1147 9.98965 14.4815 9.61147 13.75 9.40734C13.758 9.3516 13.758 9.29534 13.75 9.2396C13.75 8.97792 13.6183 8.72695 13.3839 8.54191C13.1495 8.35687 12.8315 8.25291 12.5 8.25291C12.1685 8.25291 11.8505 8.35687 11.6161 8.54191C11.3817 8.72695 11.25 8.97792 11.25 9.2396C11.243 9.29208 11.243 9.345 11.25 9.39747C10.5165 9.60216 9.88189 9.98184 9.43396 10.4839C8.98603 10.986 8.74701 11.5856 8.75001 12.1997V13.1864C8.75001 13.448 8.88171 13.699 9.11613 13.8841C9.35055 14.0691 9.66849 14.173 10 14.173H15C15.3315 14.173 15.6495 14.0691 15.8839 13.8841C16.1183 13.699 16.25 13.448 16.25 13.1864V12.1997ZM20 2.97413C20 2.82095 19.9548 2.66987 19.868 2.53287C19.7812 2.39586 19.6552 2.27668 19.5 2.18478C19.3448 2.09287 19.1645 2.03076 18.9736 2.00335C18.7827 1.97595 18.5863 1.98402 18.4 2.02691L12.675 3.31947H20V2.97413Z" fill="#B5E48D"/>
</svg>
<p>Recipes</p></Link>
            </li>
            <li>
              <Link to="/ingredients"><svg width="100" height="50" viewBox="0 0 60 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31.1124 37.0604C35.8038 32.4441 35.3057 24.0265 30.1298 19.9696C26.5372 17.0189 24.7154 13.6082 24.7154 9.83283C24.7154 4.98469 21.6241 1.10969 17.0235 0.189764C12.7452 -0.66717 7.25547 1.30353 4.62119 7.62873C0.0567412 18.5867 0.00449518 24.1326 0.00644828 24.3035C-0.000875919 24.4202 -0.55654 35.9896 10.5709 40.7718C17.463 43.833 25.8824 42.5128 31.1124 37.0604ZM11.36 38.9339C1.546 34.7161 1.97959 24.8392 2.0045 24.3655C2.00498 24.3123 2.0836 18.9232 6.46787 8.39728C8.8774 2.98967 12.6682 1.54185 16.6314 2.15056C19.4381 2.71174 22.7154 5.06037 22.7154 9.83283C22.7154 14.1736 24.8404 18.2137 28.8609 21.5159C28.8609 21.5154 28.8614 21.5159 28.8609 21.5159C33.1406 24.8676 33.5592 31.849 29.6806 35.6639C24.9892 40.4837 17.7334 41.7024 11.36 38.9339Z" fill="#B5E48D"/>
<path d="M18.2651 22.4626C15.21 22.4626 12.7246 24.948 12.7246 28.0027C12.9848 35.3347 23.546 35.3333 23.8052 28.0026C23.8052 24.948 21.3198 22.4626 18.2651 22.4626ZM18.2651 31.5427C13.5861 31.3941 13.5872 24.6106 18.2652 24.4626C22.9435 24.6111 22.9424 31.395 18.2651 31.5427Z" fill="#B5E48D"/>
<path d="M41.996 44.9929H30.4095L27.702 42.2859C26.7774 41.3662 25.3647 42.7707 26.288 43.7L29.2885 46.7C29.476 46.8875 29.7303 46.9929 29.9955 46.9929H41.996C43.3046 46.9719 43.3151 45.016 41.996 44.9929Z" fill="#B5E48D"/>
<path d="M58.9966 39.9929H45.9961C45.4438 39.9929 44.9961 40.4407 44.9961 40.9929V49.9929C44.9961 50.5452 45.4438 50.9929 45.9961 50.9929H58.9966C59.5488 50.9929 59.9966 50.5452 59.9966 49.9929V40.9929C59.9966 40.4407 59.5488 39.9929 58.9966 39.9929ZM57.9966 48.9929H46.9961V41.9929H57.9966V48.9929Z" fill="#B5E48D"/>
<path d="M27.9962 10.9929C28.2047 10.9929 28.4152 10.928 28.5954 10.7927L32.3288 7.99292H43.9958C45.3044 7.97269 45.3146 6.01543 43.9957 5.99292L31.9953 5.99292C31.779 5.99292 31.5685 6.06323 31.3952 6.19312L27.3952 9.19312C26.6247 9.72942 27.0723 11.0288 27.9962 10.9929Z" fill="#B5E48D"/>
<path d="M58.9966 1.99292H47.9961C47.4438 1.99292 46.9961 2.44067 46.9961 2.99292V10.9929C46.9961 11.5452 47.4438 11.9929 47.9961 11.9929H58.9966C59.5488 11.9929 59.9966 11.5452 59.9966 10.9929V2.99292C59.9966 2.44067 59.5488 1.99292 58.9966 1.99292ZM57.9966 9.99292H48.9961V3.99292H57.9966V9.99292Z" fill="#B5E48D"/>
<path d="M43.9958 24.9929H36.9954C35.6831 25.0146 35.6794 26.9705 36.9954 26.9929L43.9958 26.9929C45.3082 26.9712 45.3118 25.0153 43.9958 24.9929Z" fill="#B5E48D"/>
<path d="M58.9966 19.9929H47.9961C47.4438 19.9929 46.9961 20.4407 46.9961 20.9929V29.9929C46.9961 30.5452 47.4438 30.9929 47.9961 30.9929H58.9966C59.5488 30.9929 59.9966 30.5452 59.9966 29.9929V20.9929C59.9966 20.4407 59.5488 19.9929 58.9966 19.9929ZM57.9966 28.9929H48.9961V21.9929H57.9966V28.9929Z" fill="#B5E48D"/>
</svg>
<p>Ingredients</p></Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
};

export default App;
