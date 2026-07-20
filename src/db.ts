import Dexie, { type EntityTable } from 'dexie';

export interface Page {
  id?: number;
  parentId: number;
  titre: string;
  contenu: string;
  date: string;
}

export const ROOT = 0;

const db = new Dexie('TerminalDB') as Dexie & {
  pages: EntityTable<Page, 'id'>;
};

db.version(1).stores({
  concepts: '++id, titre, categorie, date',
  erreurs: '++id, titre, occurrences, date',
  strategies: '++id, nom, date',
  trades: '++id, date, marche, strategie',
  journal: '++id, date',
  ressources: '++id, titre, type',
});

db.version(2).stores({
  concepts: null,
  erreurs: null,
  strategies: null,
  trades: null,
  journal: null,
  ressources: null,
  pages: '++id, parentId, date',
});

export default db;
