import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI || '', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		} as mongoose.ConnectOptions);
		console.log('MongoDB Connected');
	} catch (error: any) {
		console.error('Error connecting to MongoDB:', error.message);
		process.exit(1);
	}
};

export default connectDB;
