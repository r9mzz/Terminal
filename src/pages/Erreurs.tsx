import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import ListRow from '../components/ListRow';
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
    <div className="px-4 pb-24 pt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-[#f5f5f7]">Erreurs</h1>
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
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="Nom de l'erreur"
            className="flex-1 border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none placeholder:text-[#8a8a8e]"
          />
          <button onClick={add} className="text-[#0a84ff]">
            OK
          </button>
        </div>
      )}

      <div className="mt-6">
        {erreurs.map((e) => (
          <ListRow key={e.id} to={`/erreurs/${e.id}`} title={e.titre} subtitle={`${e.occurrences}`} />
        ))}
        {erreurs.length === 0 && <p className="py-3 text-[#8a8a8e]">Aucune erreur enregistrée.</p>}
      </div>
    </div>
  );
}
