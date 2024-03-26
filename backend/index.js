const express = require('express');
const axios = require('axios');
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())

// Route to handle POST requests for generating recipes
app.post('/generate-recipe', async (req, res) => {
  try {
    const ingredients = req.body.ingredients;

    // Call Spoonacular API to get recipe based on ingredients
    const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
      params: {
        ingredients: ingredients.join(','),
        apiKey: '8b7abb33e9e644f29f8bebe6fc6d8f10' // Replace with your Spoonacular API key
      }
    });

    if (response.data.length === 0) {
      res.status(404).json({ message: 'No recipes found for the provided ingredients.' });
      return;
    }

    // Choose a random recipe from the response
    const randomRecipe = response.data[Math.floor(Math.random() * response.data.length)];

    // Get detailed information about the chosen recipe
    const recipeDetails = await axios.get(`https://api.spoonacular.com/recipes/${randomRecipe.id}/information`, {
      params: {
        apiKey: '8b7abb33e9e644f29f8bebe6fc6d8f10' // Replace with your Spoonacular API key
      }
    });

    // Extract step by step instructions from recipe details
    const instructions = recipeDetails.data.instructions || 'No instructions available.';

    res.json({ recipe: instructions });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
