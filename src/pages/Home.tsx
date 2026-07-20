import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AlertTriangle, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import db from '../db';
import { seedDatabase } from '../seed';
import EmptyState from '../components/EmptyState';

export default function Home() {
  const lastConcepts = useLiveQuery(() => db.concepts.orderBy('date').reverse().limit(4).toArray(), []) ?? [];
  const topErreur = useLiveQuery(() => db.erreurs.orderBy('occurrences').reverse().first(), []);
  const conceptsCount = useLiveQuery(() => db.concepts.count(), []) ?? 0;
  const erreursCount = useLiveQuery(() => db.erreurs.count(), []) ?? 0;
  const strategiesCount = useLiveQuery(() => db.strategies.count(), []) ?? 0;
  const [seeding, setSeeding] = useState(false);

  async function chargerDemo() {
    setSeeding(true);
    await seedDatabase();
    localStorage.setItem('terminal_seeded', '1');
    setSeeding(false);
  }

  return (
    <div className="px-4 pb-24 pt-8 md:px-8 md:pb-12 md:pt-10">
      <h1 className="text-3xl font-medium text-zinc-100">Terminal</h1>
      <p className="mt-1 text-sm text-zinc-500">Ton second cerveau de trading.</p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="flex items-center gap-1.5 text-indigo-400">
            <BookOpen size={14} />
            <span className="text-xs uppercase tracking-wide">Concepts</span>
          </div>
          <div className="mt-2 text-2xl font-medium text-zinc-100">{conceptsCount}</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="flex items-center gap-1.5 text-rose-400">
            <AlertTriangle size={14} />
            <span className="text-xs uppercase tracking-wide">Erreurs</span>
          </div>
          <div className="mt-2 text-2xl font-medium text-zinc-100">{erreursCount}</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <TrendingUp size={14} />
            <span className="text-xs uppercase tracking-wide">Stratégies</span>
          </div>
          <div className="mt-2 text-2xl font-medium text-zinc-100">{strategiesCount}</div>
        </div>
      </div>

      {topErreur && (
        <Link
          to={`/erreurs/${topErreur.id}`}
          className="mt-6 block rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
        >
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle size={16} />
            <span className="text-xs font-medium uppercase tracking-wide">Erreur récurrente</span>
          </div>
          <div className="mt-2 text-xl font-medium text-zinc-100">{topErreur.titre}</div>
          <span className="mt-2 inline-block rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-400">
            {topErreur.occurrences} exemples
          </span>
        </Link>
      )}

      <div className="mt-8">
        <div className="flex items-center gap-2 text-indigo-400">
          <BookOpen size={16} />
          <span className="text-xs font-medium uppercase tracking-wide">Derniers concepts ouverts</span>
        </div>

        {lastConcepts.length > 0 ? (
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {lastConcepts.map((c) => (
              <Link
                key={c.id}
                to={`/concepts/${c.id}`}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
              >
                <span className="text-xs text-zinc-600">{c.categorie}</span>
                <div className="mt-1 text-base font-medium text-zinc-100">{c.titre}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-3">
            <EmptyState icon={Sparkles} title="Rien pour l'instant" description="Ouvre un concept pour le retrouver ici." />
          </div>
        )}
      </div>

      <button
        onClick={chargerDemo}
        disabled={seeding}
        className="mt-10 text-sm text-zinc-600 transition-colors duration-200 hover:text-zinc-400 disabled:opacity-40"
      >
        {seeding ? 'Chargement...' : 'Charger les données de démonstration'}
      </button>
    </div>
  );
}
