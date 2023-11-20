import { Router } from 'express';
import authController from '../controllers/authController';

const { loginUser, signUpUser } = authController;

const router = Router();

// Route for user login
router.post('/login', loginUser);

// Route for user signup
router.post('/signup', signUpUser);

export default router;
