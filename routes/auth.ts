import express from 'express';
import { registerUser, findUserByEmail } from '../models/user';
import { comparePassword } from '../utils/hash';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'tu_clave_secreta';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    await registerUser({ name, email, password });
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      name: user.name
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;