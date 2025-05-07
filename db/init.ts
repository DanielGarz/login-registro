import { openDb } from './database';

export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
  console.log('Base de datos inicializada');
}

if (require.main === module) {
  initDb()
    .then(() => console.log('Inicialización completada'))
    .catch(err => console.error('Error al inicializar la base de datos:', err));
}
