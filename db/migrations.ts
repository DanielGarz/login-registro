import { openDb } from './database';

export async function runMigrations() {
  const db = await openDb();

  try {
    const tableInfo = await db.all("PRAGMA table_info(users)");
    const columns = tableInfo.map(col => col.name);

    if (!columns.includes('rfc')) {
      await db.exec('ALTER TABLE users ADD COLUMN rfc TEXT');
      console.log('Columna RFC agregada');
    }

    if (!columns.includes('card_number')) {
      await db.exec('ALTER TABLE users ADD COLUMN card_number TEXT');
      console.log('Columna card_number agregada');
    }

    console.log('Migraciones completadas exitosamente');
  } catch (error) {
    console.error('Error al ejecutar migraciones:', error);
    throw error;
  }
}