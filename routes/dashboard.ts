import express from 'express';
import jwt from 'jsonwebtoken';
import { openDb } from '../db/database';
import { decrypt } from '../utils/encryption';

const router = express.Router();
const JWT_SECRET = 'tu_clave_secreta';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token requerido' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

router.get('/', authMiddleware, (req, res) => {
  res.json({ message: `Bienvenido, ${req.user.name}` });
});

router.get('/users', authMiddleware, async (req, res) => {
  try {
    const db = await openDb();
    const users = await db.all('SELECT id, name, email, rfc, card_number FROM users');

    const formattedUsers = users.map(user => {
      const decryptedRfc = decrypt(user.rfc);
      const decryptedCardNumber = decrypt(user.card_number);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        rfc: decryptedRfc ? '****' + decryptedRfc.slice(-3) : 'No disponible',
        cardNumber: decryptedCardNumber ? '**** **** **** ' + decryptedCardNumber.slice(-4) : 'No disponible'
      };
    });

    res.json({ users: formattedUsers });
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
  }
});

export default router;