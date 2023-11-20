import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

// Function to search for recipes based on ingredients
const recipeController = {
	getRecipes: async (req: Request, res: Response) => {
		try {
			// Extract user-selected ingredients from the request body
			const userIngredients: string[] = req.body.userIngredients;
			// Spoonacular API endpoint for searching recipes by ingredients
			const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';

			// Spoonacular API key
			const apiKey = process.env.SPOONACULAR_API_KEY;

			// Set up the query parameters
			const queryParams = {
				query: userIngredients.join(','),
				addRecipeInformation: 'true', // Include additional recipe information
				fillIngredients: 'true', // Add information about the ingredients and whether they are used or missing in relation to the query.
			};

			// Make the API request
			const response: AxiosResponse = await axios.get(apiUrl, {
				params: {
					apiKey,
					...queryParams,
				},
			});

			// Send the recipe data to the frontend
			res.json(response.data);
		} catch (error: any) {
			console.error('Error searching for recipes:', error.message);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
};

export default recipeController;
