import { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import db from '../db';

interface Hit {
  type: string;
  id: number;
  titre: string;
  path: string;
}

export default function Search({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const concepts = useLiveQuery(() => db.concepts.toArray(), []) ?? [];
  const erreurs = useLiveQuery(() => db.erreurs.toArray(), []) ?? [];
  const strategies = useLiveQuery(() => db.strategies.toArray(), []) ?? [];
  const ressources = useLiveQuery(() => db.ressources.toArray(), []) ?? [];

  const items: Hit[] = useMemo(
    () => [
      ...concepts.map((c) => ({ type: 'Concept', id: c.id!, titre: c.titre, path: `/concepts/${c.id}` })),
      ...erreurs.map((e) => ({ type: 'Erreur', id: e.id!, titre: e.titre, path: `/erreurs/${e.id}` })),
      ...strategies.map((s) => ({ type: 'Stratégie', id: s.id!, titre: s.nom, path: `/strategies/${s.id}` })),
      ...ressources.map((r) => ({ type: 'Ressource', id: r.id!, titre: r.titre, path: `/ressources` })),
    ],
    [concepts, erreurs, strategies, ressources]
  );

  const fuse = useMemo(() => new Fuse(items, { keys: ['titre', 'type'], threshold: 0.35 }), [items]);
  const results = q ? fuse.search(q).map((r) => r.item) : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0b0c]/95 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-auto mt-24 w-full max-w-lg px-4" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher..."
          className="w-full border-b border-[#1c1c1e] bg-transparent py-3 text-2xl text-[#f5f5f7] outline-none placeholder:text-[#8a8a8e]"
        />
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {results.map((r) => (
            <button
              key={`${r.type}-${r.id}`}
              onClick={() => {
                navigate(r.path);
                onClose();
              }}
              className="block w-full border-b border-[#1c1c1e] py-3 text-left transition-opacity duration-300 active:opacity-60"
            >
              <span className="text-sm text-[#8a8a8e]">{r.type}</span>
              <div className="text-lg text-[#f5f5f7]">{r.titre}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
