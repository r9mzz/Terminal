import { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import db from '../db';

export default function Search({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const pages = useLiveQuery(() => db.pages.toArray(), []) ?? [];

  const fuse = useMemo(() => new Fuse(pages, { keys: ['titre', 'contenu'], threshold: 0.35 }), [pages]);
  const results = q ? fuse.search(q).map((r) => r.item) : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-auto mt-24 w-full max-w-lg px-4" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une page..."
          className="w-full border-b border-zinc-800 bg-transparent py-3 text-2xl text-zinc-100 outline-none placeholder:text-zinc-600"
        />
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                navigate(`/connaissance/${p.id}`);
                onClose();
              }}
              className="block w-full border-b border-zinc-800 py-3 text-left transition-opacity duration-300 active:opacity-60"
            >
              <div className="text-lg text-zinc-100">{p.titre}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
