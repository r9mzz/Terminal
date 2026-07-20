import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import ListRow from '../components/ListRow';
import db from '../db';

const CATEGORIES = ['ICT', 'Price Action', 'Psychologie', 'Gestion du risque', 'Indices', 'Macro'];

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
      <div className="px-4 pb-24 pt-8">
        <button onClick={() => setActive(null)} className="text-sm text-[#8a8a8e]">
          ← Concepts
        </button>
        <h1 className="mt-2 text-2xl text-[#f5f5f7]">{active}</h1>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-[#8a8a8e]">{list.length} concepts</span>
          <button onClick={() => setOpen((o) => !o)} className="text-[#0a84ff]">
            {open ? 'Annuler' : '+ Ajouter'}
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
              className="flex-1 border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none placeholder:text-[#8a8a8e]"
            />
            <button onClick={() => add(active)} className="text-[#0a84ff]">
              OK
            </button>
          </div>
        )}

        <div className="mt-6">
          {list.map((c) => (
            <ListRow key={c.id} to={`/concepts/${c.id}`} title={c.titre} />
          ))}
          {list.length === 0 && <p className="py-3 text-[#8a8a8e]">Aucun concept.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <h1 className="text-2xl text-[#f5f5f7]">Concepts</h1>
      <div className="mt-6">
        {CATEGORIES.map((cat) => {
          const count = concepts.filter((c) => c.categorie === cat).length;
          return (
            <button key={cat} onClick={() => setActive(cat)} className="block w-full text-left">
              <div className="flex items-center justify-between border-b border-[#1c1c1e] py-4">
                <span className="text-lg text-[#f5f5f7]">{cat}</span>
                <span className="text-sm text-[#8a8a8e]">{count}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
