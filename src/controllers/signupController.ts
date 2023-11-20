import { Request, Response } from 'express';
import User from '../models/User';
import EncryptionUtils from '../utils/encryptionUtils';

const signUpController = {
	signUpUser: async (req: Request, res: Response) => {
		const { username, password, email } = req.body;

		try {
			// Check to see if username or email is already taken
			const existingUser = await User.findOne({
				$or: [{ username }, { email }],
			});

			if (existingUser)
				return res
					.status(400)
					.json({ message: 'Username or email already taken' });

			// Generate a random salt for password hashing
			const salt = EncryptionUtils.generateSalt();

			// Hash the password with the generated salt using SHA-256
			const hashedPassword = EncryptionUtils.hashPassword(password, salt);

			// Create a new user with hashed password
			const newUser = new User({
				username,
				password: hashedPassword,
				email,
			});

			// Save the new user to the database
			await newUser.save();

			return res
				.status(201)
				.json({ message: 'User registration successful', user: newUser });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	},
};

export default signUpController;
