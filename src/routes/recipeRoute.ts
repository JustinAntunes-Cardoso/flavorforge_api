import { Router } from 'express';
import recipeController from '../controllers/recipeController';

const { getRecipes } = recipeController;

const router = Router();

// Route for getting recipes
router.post('/ingredients', getRecipes);

export default router;
