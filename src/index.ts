import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import connectDB from './database';
import authRoute from './routes/authRoute';
import recipeRoute from './routes/recipeRoute';

const app = express();
require('dotenv').config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5050;

//Middleware
app.use(express.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

//Routes
app.use('/auth', authRoute);
app.use('/recipes', recipeRoute);

app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});
