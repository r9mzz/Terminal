import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Plus } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import db from '../db';

export default function Erreurs() {
  const erreurs = useLiveQuery(() => db.erreurs.orderBy('occurrences').reverse().toArray(), []) ?? [];
  const [titre, setTitre] = useState('');
  const [open, setOpen] = useState(false);

  async function add() {
    if (!titre.trim()) return;
    await db.erreurs.add({
      titre,
      description: '',
      solution: '',
      captures: [],
      occurrences: 1,
      liens: [],
      date: new Date().toISOString(),
    });
    setTitre('');
    setOpen(false);
  }

  return (
    <div className="px-4 pb-24 pt-8 md:px-8 md:pb-12 md:pt-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle size={18} />
            <span className="text-xs font-medium uppercase tracking-wide">Erreurs</span>
          </div>
          <h1 className="mt-1 text-2xl font-medium text-zinc-100">Mon livre d'erreurs</h1>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-300 transition-colors duration-200 hover:border-zinc-700"
        >
          <Plus size={15} />
          Ajouter
        </button>
      </div>

      {open && (
        <div className="mt-4 flex gap-2">
          <input
            autoFocus
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="Nom de l'erreur"
            className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-700"
          />
          <button
            onClick={add}
            className="rounded-lg bg-[#0a84ff] px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            OK
          </button>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {erreurs.map((e) => (
          <Link
            key={e.id}
            to={`/erreurs/${e.id}`}
            className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base font-medium text-zinc-100">{e.titre}</h2>
              <span className="shrink-0 rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-400">
                {e.occurrences}
              </span>
            </div>
            {e.description && (
              <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{e.description}</p>
            )}
          </Link>
        ))}
      </div>

      {erreurs.length === 0 && (
        <div className="mt-8">
          <EmptyState
            icon={AlertTriangle}
            title="Aucune erreur enregistrée"
            description="Ajoute ta première erreur pour commencer à construire ton livre d'erreurs."
          />
        </div>
      )}
    </div>
  );
}
