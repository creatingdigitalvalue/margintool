import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 1. Generate the dataframes
excel_file = "fill_script/data.xlsx"

ingredients_df = pd.read_excel(excel_file, sheet_name="Zutaten")
recipes_df = pd.read_excel(excel_file, sheet_name="Rezepte")

# 2. Generate the primary and secondary keys for recipes and ingredients
unique_produkt_ids = {produkt: f'RCPT{index + 1}' for index, produkt in enumerate(recipes_df['Produkt'].unique())}
recipes_df['recipe_id'] = recipes_df['Produkt'].map(unique_produkt_ids)

unique_ingredient_ids = {produkt: f'INGR{index + 1}' for index, produkt in enumerate(ingredients_df['Produkte '].unique())}
ingredients_df['ingredient_id'] = ingredients_df['Produkte '].map(unique_ingredient_ids)

# 3. Get the column names from SQL 
# Replace 'username', 'password', 'hostname', 'port', and 'database_name' with your actual database credentials
DATABASE_URL = 'postgresql://kefjqjhlizwfla:cdb95c6d3b0c28a498d8eb0f12a2c3877de44df6f72edcec96f126034a6b331f@ec2-34-241-67-9.eu-west-1.compute.amazonaws.com:5432/dbco8dtbojf1n6'

# Create the database engine
engine = create_engine(DATABASE_URL)

# Create a Session class bound to the engine
Session = sessionmaker(bind=engine)

# Create a session
session = Session()

tables = ['ingredients', 'recipes', 'recipes_ingredients']

column_names_dict = {}


column_names_dict = {}
for table in tables:
    query = f"""
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = '{table}';
    """
    df = pd.read_sql(query, engine)
    column_names_dict[table] = df['column_name'].tolist()

# 4. Map DataFrame columns to the columns in the ingredients table
ingredients_columns_mapping = {
    "ingredient_id": "ingredient_id",
    'Lieferant': 'ingredient_supplier',
    'Art Nr': 'ingredient_article_number',
    'Produkte ': 'ingredient_name',
    'Gewicht(g)/ ml / Stk': 'ingredient_amount',
    'Preis(€)': 'ingredient_cost',
}
ingredients_df = ingredients_df.rename(columns=ingredients_columns_mapping)

# Remove duplicate rows based on all columns
ingredients_df = ingredients_df.drop_duplicates()
ingredients_df = ingredients_df.drop('Preis pro g/ml', axis=1)
ingredients_df = ingredients_df.dropna(subset=['ingredient_id'])
ingredients_df = ingredients_df.dropna(subset=['ingredient_name'])

# Check if 'ingredient_id' column exists in the DataFrame
ingredients_df = ingredients_df.drop_duplicates(subset=['ingredient_id'])

unique_produkt_ids = {produkt: f'RCPT{index + 1}' for index, produkt in enumerate(recipes_df['Produkt'].unique())}
recipes_df['recipe_id'] = recipes_df['Produkt'].map(unique_produkt_ids)
# Replace ingredient names with ingredient IDs in recipes_df
def replace_with_ids(ingredients):
    ingredient_list = ingredients.split(', ')
    return ', '.join([unique_ingredient_ids.get(ingredient, ingredient) for ingredient in ingredient_list])

recipes_df['Zutat'] = recipes_df['Zutat'].apply(replace_with_ids)

# Remove the unnecessary columns
recipes_df.rename(columns={'Zutat': 'ingredient_id'}, inplace=True)
recipes_df.rename(columns={'Produkt': 'recipe_name'}, inplace=True)

recipe_df_new = recipes_df[['recipe_id','recipe_name']]
recipe_df_new = recipe_df_new.drop_duplicates()
# print(ingredients_df)


# Map DataFrame columns to the columns in the recipes table
recipes_ingredients_columns_mapping = {
    'recipe_id': 'recipe_id',
    'ingredient_id': 'ingredient_id',
    'Menge' : 'ingredient_amount',
    'Verlust' : 'ingredient_amount_waste',
    'Einheit':'ingredient_amount_unit'
}

# Extract the relevant columns from the renamed recipes DataFrame
recipes_ingredient_df = recipes_df[['recipe_id', 'ingredient_id', 'Menge', 'Verlust','Einheit']]

# Rename the columns
recipes_ingredient_df = recipes_ingredient_df.rename(columns=recipes_ingredients_columns_mapping)
# Convert 'ingredient_amount_waste' column to float
recipes_ingredient_df['ingredient_amount_waste'] = recipes_ingredient_df['ingredient_amount_waste'].astype(float)

recipes_ingredient_df = recipes_ingredient_df[recipes_ingredient_df['ingredient_id'].str.contains('INGR')]




# print("ingredients",ingredients_df)
# print("recipe_ingredients",recipes_ingredient_df)


# 5. Push the data from the Ingredients DataFrame to the 'ingredients' table in the database
# try:
#     ingredients_df.to_sql('ingredients', con=engine, if_exists='append', index=False)
#     print("Data inserted into 'ingredients' table successfully.")
# except Exception as e:
#     print("Error inserting data into 'ingredients' table:", e)

# 6. Push the data from the Recipes DataFrame to the 'recipes' table in the database
# try:
#     recipe_df_new.to_sql('recipes', con=engine, if_exists='append', index=False)
#     print("Data inserted into 'recipes' table successfully.")
# except Exception as e:
#     print("Error inserting data into 'recipes' table:", e)

# 7. Map DataFrame columns to the columns in the recipes_ingredients table
# recipes_ingredients_columns_mapping = {
#     'recipe_id': 'recipe_id',
#     'ingredient_id': 'ingredient_id',
# }

# Extract the relevant columns from the original recipes DataFrame
# recipes_ingredient_df = recipes_df[['recipe_id', 'ingredient_id']]

# Rename the columns
# recipes_ingredient_df = recipes_ingredient_df.rename(columns=recipes_ingredients_columns_mapping)

# Remove rows where ingredient_id is missing in ingredients_df
# recipes_ingredient_df = recipes_ingredient_df[recipes_ingredient_df['ingredient_id'].isin(ingredients_df['ingredient_id'])]

# print(recipes_ingredient_df)

# 8. Push the data from the merged DataFrame to the 'recipes_ingredients' table in the database
# Remove duplicates from the 'ingredient_id' column in place

try:
    recipes_ingredient_df.to_sql('recipe_ingredients', con=engine, if_exists='append', index=False)
    print("Data inserted into 'recipes_ingredients' table successfully.")
except Exception as e:
    print("Error inserting data into 'recipes_ingredients' table:", e)


# import pandas as pd
# from sqlalchemy import create_engine
# import numpy as np

# #1 Genetrate the dataframes
# excel_file = "fill_script/data.xlsx"

# ingredients_df = pd.read_excel(excel_file, sheet_name="Zutaten")
# recipes_df  = pd.read_excel(excel_file, sheet_name="Rezepte")

# #2 Generate the primary and secondary keys!
# unique_ingredient_ids = {produkt: f'INGR{index + 1}' for index, produkt in enumerate(ingredients_df['Produkte '].unique())}
# ingredients_df['ingredient_id'] = ingredients_df['Produkte '].map(unique_ingredient_ids)

# unique_produkt_ids = {produkt: f'RCPT{index + 1}' for index, produkt in enumerate(recipes_df['Produkt'].unique())}
# recipes_df['recipe_id'] = recipes_df['Produkt'].map(unique_produkt_ids)
# # Replace ingredient names with ingredient IDs in recipes_df
# def replace_with_ids(ingredients):
#     ingredient_list = ingredients.split(', ')
#     return ', '.join([unique_ingredient_ids.get(ingredient, ingredient) for ingredient in ingredient_list])

# recipes_df['Zutat'] = recipes_df['Zutat'].apply(replace_with_ids)


# ###########
# ###########

# #3 Get the column names from SQL 

# engine = create_engine('postgresql://postgres:123@localhost:5432/margintool')

# tables = ['ingredients', 'recipes', 'recipes_ingredients']

# column_names_dict = {}


# for table in tables:
#     query = f"""
#     SELECT column_name
#     FROM information_schema.columns
#     WHERE table_name = '{table}';
#     """
    
#     df = pd.read_sql(query, engine)

#     column_names_dict[table] = df['column_name'].tolist()
    

# print(column_names_dict)
# # Map DataFrame columns to the columns in the ingredients table
# ingredients_columns_mapping = {
#     "ingredient_id": "ingredient_id",
#     'Lieferant': 'ingredient_supplier',
#     'Art Nr': 'ingredient_article_number',
#     'Produkte ': 'ingredient_name',
#     'Gewicht(g)/ ml / Stk': 'ingredient_amount',
#     'Preis(€)': 'ingredient_cost',
# }

# # Rename DataFrame columns based on the mapping
# ingredients_df = ingredients_df.rename(columns=ingredients_columns_mapping)

# ingredients_df = ingredients_df.dropna(subset=['ingredient_name'])
# # Delete everything after index 243
# ingredients_df = ingredients_df.iloc[:243]

# ingredients_df['ingredient_article_number'] = ingredients_df['ingredient_article_number'].replace('REWE', np.nan)

# # Map DataFrame columns to the columns in the recipes table
# recipes_columns_mapping = {
#     "recipe_id": "recipe_id",
#     'Produkt': 'recipe_name',
#     "Zutat" : "ingredient_id" 
# }

# # Rename DataFrame columns based on the mapping
# recipes_df = recipes_df.rename(columns=recipes_columns_mapping)

# #Remove duplicate rows based on all columns
# recipes_df = recipes_df.drop_duplicates()

# # Map DataFrame columns to the columns in the recipes table
# recipes_ingredients_columns_mapping = {
#     'recipe_id': 'recipe_id',
#     'ingredient_id': 'ingredient_id',
#     'Menge' : 'ingredient_amount',
#     'Einheit' : 'ingredient_amount_unit',
#     'Verlust' : 'ingredient_amount_waste'
# }

# # Extract the relevant columns from the renamed recipes DataFrame
# recipes_ingredient_df = recipes_df[['recipe_id', 'ingredient_id', 'Menge', 'Einheit', 'Verlust']]

# # Rename the columns
# recipes_ingredient_df = recipes_ingredient_df.rename(columns=recipes_ingredients_columns_mapping)
# # Convert 'ingredient_amount_waste' column to float
# recipes_ingredient_df['ingredient_amount_waste'] = recipes_ingredient_df['ingredient_amount_waste'].astype(float)



# columns_to_drop = ['Menge', 'Einheit', 'Verlust','Zubereitete Menge', 'Preis pro Einheit', 'Unnamed: 7', 'Unnamed: 8','ingredient_id']
# recipes_df = recipes_df.drop(columns_to_drop, axis=1)

# ingredients_df = ingredients_df.drop('Preis pro g/ml', axis=1)


# # Print the column names to verify
# # print('recipe_ingreadient_df:', recipes_ingredient_df['ingredient_id'])
# # print('recipes_df:',recipes_df.columns)

# # try:
# #     # Push the data from the Ingredients DataFrame to the 'ingredients' table in the database
# #     ingredients_df.to_sql('ingredients', con=engine, if_exists='append', index=False)
# #     print("Data inserted into 'ingredients' table successfully.")
# # except Exception as e:
# #     print("Error inserting data into 'ingredients' table:", e)



# # try:
# #     # Push the data from the Recipes DataFrame to the 'recipes' table in the database
# #     recipes_df.to_sql('recipes', con=engine, if_exists='append', index=False)
# #     print("Data inserted into 'recipes' table successfully.")
# # except Exception as e:
# #     print("Error inserting data into 'recipes' table:", e)
# # List to store ingredient IDs not present in the ingredients table
# missing_ingredient_ids = []

# # Iterate over each row in recipes_ingredient_df
# for index, row in recipes_ingredient_df.iterrows():
#     ingredient_id = row['ingredient_id']
#     # Check if the ingredient_id exists in the ingredients DataFrame
#     if ingredient_id not in ingredients_df['ingredient_id'].values:
#         missing_ingredient_ids.append(ingredient_id)
#         # Drop the row from recipes_ingredient_df if the ingredient_id is missing
#         recipes_ingredient_df.drop(index, inplace=True)


# try:
#     # Push the data from the merged DataFrame to the 'recipes_ingredients' table in the database
#     recipes_ingredient_df.to_sql('recipes_ingredients', con=engine, if_exists='append', index=False)
#     print("Data inserted into 'recipes_ingredients' table successfully.")
# except Exception as e:
#     print("Error inserting data into 'recipes_ingredients' table:", e)



