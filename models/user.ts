import { openDb } from '../db/database';
import { hashPassword } from '../utils/hash';
import { encrypt } from '../utils/encryption';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  rfc?: string;
  cardNumber?: string;
}

export async function createUserTable() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      rfc TEXT NOT NULL,
      card_number TEXT NOT NULL
    )
  `);
}

export async function registerUser(user: User) {
  const db = await openDb();
  const hashedPassword = await hashPassword(user.password);

  const encryptedRfc = encrypt(user.rfc || '');
  const encryptedCardNumber = encrypt(user.cardNumber || '');

  await db.run(
    'INSERT INTO users (name, email, password, rfc, card_number) VALUES (?, ?, ?, ?, ?)',
    user.name,
    user.email,
    hashedPassword,
    encryptedRfc,
    encryptedCardNumber
  );
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const db = await openDb();
  const user = await db.get('SELECT * FROM users WHERE email = ?', email);
  return user;
}
