import Dexie, { type EntityTable } from 'dexie';

export interface Concept {
  id?: number;
  titre: string;
  categorie: string;
  contenu: string;
  images: string[];
  liens: number[];
  date: string;
}

export interface Erreur {
  id?: number;
  titre: string;
  description: string;
  solution: string;
  captures: string[];
  occurrences: number;
  liens: number[];
  date: string;
}

export interface Strategie {
  id?: number;
  nom: string;
  objectif: string;
  conditions: string;
  etapes: string;
  captures: string[];
  checklist: string[];
  date: string;
}

export interface Trade {
  id?: number;
  date: string;
  marche: string;
  rr: number;
  captures: string[];
  erreurs: number[];
  concepts: number[];
  strategie?: number;
  journal: string;
}

export interface JournalEntry {
  id?: number;
  date: string;
  contenu: string;
}

export interface Ressource {
  id?: number;
  titre: string;
  type: string;
  url: string;
  concepts: number[];
  date: string;
}

const db = new Dexie('TerminalDB') as Dexie & {
  concepts: EntityTable<Concept, 'id'>;
  erreurs: EntityTable<Erreur, 'id'>;
  strategies: EntityTable<Strategie, 'id'>;
  trades: EntityTable<Trade, 'id'>;
  journal: EntityTable<JournalEntry, 'id'>;
  ressources: EntityTable<Ressource, 'id'>;
};

db.version(1).stores({
  concepts: '++id, titre, categorie, date',
  erreurs: '++id, titre, occurrences, date',
  strategies: '++id, nom, date',
  trades: '++id, date, marche, strategie',
  journal: '++id, date',
  ressources: '++id, titre, type',
});

export default db;
