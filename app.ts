import express from 'express';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import { initDb } from './db/init';
import { runMigrations } from './db/migrations';
import path from 'path';

const app = express();
app.use(express.json());

async function initializeApp() {
  try {
    await initDb();
    await runMigrations();
    console.log('Base de datos inicializada y migraciones completadas');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/api', (req, res) => {
  res.json({
    message: 'API de autenticación',
    endpoints: {
      register: '/auth/register',
      login: '/auth/login',
      dashboard: '/dashboard'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
initializeApp().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});