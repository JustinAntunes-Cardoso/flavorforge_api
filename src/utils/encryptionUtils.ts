import * as crypto from 'crypto';

class EncryptionUtils {
	// Generates a random salt
	static generateSalt(): string {
		return crypto.randomBytes(16).toString('hex');
	}

	// Function to hash a password using SHA-256
	static hashPassword(password: string, salt: string): string {
		const hash = crypto
			.createHmac('sha256', salt)
			.update(password)
			.digest('hex');
		return hash;
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

	// Function to decrypt a message using AES-256
	static decrypt(encryptedText: string, key: string, iv: string): string {
		const decipher = crypto.createDecipheriv(
			'aes-256-cbc',
			Buffer.from(key),
			Buffer.from(iv, 'hex')
		);
		let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
		decrypted += decipher.final('utf-8');
		return decrypted;
	}
}

export default EncryptionUtils;
