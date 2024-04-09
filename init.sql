-- Create the 'recipes' table
CREATE TABLE recipes (
    recipe_id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(255)
);

-- Create the 'ingredients' table
CREATE TABLE ingredients (
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(255),
    ingredient_unit_measurement VARCHAR(50),
    ingredient_article_number VARCHAR(50),
    ingredient_cost NUMERIC(10, 2),
    ingredient_supplier VARCHAR(255)
);

-- Create the 'recipes_ingredients' table
CREATE TABLE recipes_ingredients (
    recipe_id INT,
    ingredient_id INT,
    ingredient_amount NUMERIC(10, 2),
    ingredient_amount_waste NUMERIC(10, 2),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);
-- Add foreign key constraints to recipes_ingredients table
ALTER TABLE recipes_ingredients
ADD CONSTRAINT fk_recipe_id
FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
ADD CONSTRAINT fk_ingredient_id
FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id);
