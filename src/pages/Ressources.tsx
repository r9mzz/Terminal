import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import db from '../db';

const TYPES = ['Livre', 'PDF', 'Chaîne YouTube', 'Thread X', 'Site', 'Outil'];

export default function Ressources() {
  const ressources = useLiveQuery(() => db.ressources.toArray(), []) ?? [];
  const [titre, setTitre] = useState('');
  const [type, setType] = useState(TYPES[0]);
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);

  async function add() {
    if (!titre.trim()) return;
    await db.ressources.add({ titre, type, url, concepts: [], date: new Date().toISOString() });
    setTitre('');
    setUrl('');
    setOpen(false);
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-[#f5f5f7]">Ressources</h1>
        <button onClick={() => setOpen((o) => !o)} className="text-[#0a84ff]">
          {open ? 'Annuler' : '+ Ajouter'}
        </button>
      </div>

      {open && (
        <div className="mt-4 flex flex-col gap-3">
          <input
            autoFocus
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Titre"
            className="border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none placeholder:text-[#8a8a8e]"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none"
          >
            {TYPES.map((t) => (
              <option key={t} value={t} className="bg-[#0b0b0c]">
                {t}
              </option>
            ))}
          </select>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Lien (optionnel)"
            className="border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none placeholder:text-[#8a8a8e]"
          />
          <button onClick={add} className="self-start text-[#0a84ff]">
            OK
          </button>
        </div>
      )}

      <div className="mt-6">
        {TYPES.map((t) => {
          const list = ressources.filter((r) => r.type === t);
          if (list.length === 0) return null;
          return (
            <div key={t} className="mb-6">
              <div className="text-sm text-[#8a8a8e]">{t}</div>
              {list.map((r) => (
                <a
                  key={r.id}
                  href={r.url || undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="block border-b border-[#1c1c1e] py-3"
                >
                  <span className="text-lg text-[#f5f5f7]">{r.titre}</span>
                </a>
              ))}
            </div>
          );
        })}
        {ressources.length === 0 && <p className="py-3 text-[#8a8a8e]">Aucune ressource.</p>}
      </div>
    </div>
  );
}
