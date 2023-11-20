import * as crypto from 'crypto';

class EncryptionUtils {
	// Function to generate a random salt
	static generateSalt(): string {
		return crypto.randomBytes(16).toString('hex'); // You can adjust the length of the salt as needed
	}

	// Function to encrypt a message using AES-256
	static encrypt(text: string, key: string, iv: string): string {
		const cipher = crypto.createCipheriv(
			'aes-256-cbc',
			Buffer.from(key),
			Buffer.from(iv, 'hex')
		);
		let encrypted = cipher.update(text, 'utf-8', 'hex');
		encrypted += cipher.final('hex');
		return encrypted;
	}

	// Function to decrypt an AES-256 encrypted message
	static decrypt(text: string, key: string, iv: string): string {
		const decipher = crypto.createDecipheriv(
			'aes-256-cbc',
			Buffer.from(key),
			Buffer.from(iv, 'hex')
		);
		let decrypted = decipher.update(text, 'hex', 'utf-8');
		decrypted += decipher.final('utf-8');
		return decrypted;
	}
}

export default EncryptionUtils;
