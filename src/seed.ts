import db from './db';
import { SEED_ERREURS, SEED_CONCEPTS, SEED_STRATEGIES, SEED_RESSOURCES } from './seedData';

export async function isDatabaseEmpty() {
  const counts = await Promise.all([
    db.concepts.count(),
    db.erreurs.count(),
    db.strategies.count(),
    db.ressources.count(),
  ]);
  return counts.every((c) => c === 0);
}

export async function seedDatabase() {
  await db.transaction('rw', db.concepts, db.erreurs, db.strategies, db.ressources, async () => {
    await db.concepts.bulkAdd(SEED_CONCEPTS);
    await db.erreurs.bulkAdd(SEED_ERREURS);
    await db.strategies.bulkAdd(SEED_STRATEGIES);
    await db.ressources.bulkAdd(SEED_RESSOURCES);
  });
}
