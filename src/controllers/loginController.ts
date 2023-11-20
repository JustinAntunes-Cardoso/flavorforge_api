import { Request, Response } from 'express';
import User from '../models/User';
import EncryptionUtils from '../utils/encryptionUtils';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'temp';

const loginController = {
	loginUser: async (req: Request, res: Response) => {
		const { username, password } = req.body;

		try {
			// Find the user by username
			const existingUser = await User.findOne({ username });

			// Check if the user exists
			if (!existingUser) {
				return res
					.status(401)
					.json({ message: 'Invalid username or password' });
			}

			// Hash the provided password with the user's salt using SHA-256
			const hashedPassword = EncryptionUtils.hashPassword(
				password,
				existingUser.salt
			);

			// Compare the hashed password with the stored hashed password
			if (hashedPassword !== existingUser.password) {
				return res
					.status(401)
					.json({ message: 'Invalid username or password' });
			}

			// Generate a JWT token
			const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

			// Set the token as a cookie
			res.cookie('token', token, {
				httpOnly: true,
				expires: new Date(Date.now() + 3600000),
			});

			return res.status(200).json({ message: 'Login successful', token });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	},
};

export default loginController;
