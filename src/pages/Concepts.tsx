import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronLeft, Plus } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import db from '../db';
import { CATEGORIES } from '../categories';

export default function Concepts() {
  const concepts = useLiveQuery(() => db.concepts.toArray(), []) ?? [];
  const [active, setActive] = useState<string | null>(null);
  const [titre, setTitre] = useState('');
  const [open, setOpen] = useState(false);

  async function add(categorie: string) {
    if (!titre.trim()) return;
    await db.concepts.add({
      titre,
      categorie,
      contenu: '',
      images: [],
      liens: [],
      date: new Date().toISOString(),
    });
    setTitre('');
    setOpen(false);
  }

  if (active) {
    const list = concepts.filter((c) => c.categorie === active);
    return (
      <div className="px-4 pb-24 pt-8 md:px-8 md:pb-12 md:pt-10">
        <button
          onClick={() => setActive(null)}
          className="flex items-center gap-1 text-sm text-zinc-500 transition-colors duration-200 hover:text-zinc-300"
        >
          <ChevronLeft size={15} />
          Concepts
        </button>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400">
              <BookOpen size={18} />
              <span className="text-xs font-medium uppercase tracking-wide">{active}</span>
            </div>
            <h1 className="mt-1 text-2xl font-medium text-zinc-100">{list.length} concepts</h1>
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
              onKeyDown={(e) => e.key === 'Enter' && add(active)}
              placeholder="Nom du concept"
              className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-700"
            />
            <button
              onClick={() => add(active)}
              className="rounded-lg bg-[#0a84ff] px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              OK
            </button>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <Link
              key={c.id}
              to={`/concepts/${c.id}`}
              className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
            >
              {c.images.length > 0 && (
                <img src={c.images[0]} alt="" className="mb-3 h-24 w-full rounded-lg border border-zinc-800 object-cover" />
              )}
              <h2 className="text-base font-medium text-zinc-100">{c.titre}</h2>
              {c.contenu && <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{c.contenu}</p>}
            </Link>
          ))}
        </div>

        {list.length === 0 && (
          <div className="mt-8">
            <EmptyState icon={BookOpen} title="Aucun concept dans cette catégorie" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 pb-24 pt-8 md:px-8 md:pb-12 md:pt-10">
      <div className="flex items-center gap-2 text-indigo-400">
        <BookOpen size={18} />
        <span className="text-xs font-medium uppercase tracking-wide">Concepts</span>
      </div>
      <h1 className="mt-1 text-2xl font-medium text-zinc-100">Bibliothèque de concepts</h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const count = concepts.filter((c) => c.categorie === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="group flex flex-col items-start rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-left transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-base font-medium text-zinc-100">{cat}</span>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-400">
                  {count}
                </span>
              </div>
              <span className="mt-1 text-sm text-zinc-600">
                {count === 0 ? 'Aucun concept' : count === 1 ? '1 concept' : `${count} concepts`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
