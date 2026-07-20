import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import ListRow from '../components/ListRow';
import db from '../db';

export default function Strategies() {
  const strategies = useLiveQuery(() => db.strategies.toArray(), []) ?? [];
  const [nom, setNom] = useState('');
  const [open, setOpen] = useState(false);

  async function add() {
    if (!nom.trim()) return;
    await db.strategies.add({
      nom,
      objectif: '',
      conditions: '',
      etapes: '',
      captures: [],
      checklist: [],
      date: new Date().toISOString(),
    });
    setNom('');
    setOpen(false);
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-[#f5f5f7]">Stratégies</h1>
        <button onClick={() => setOpen((o) => !o)} className="text-[#0a84ff]">
          {open ? 'Annuler' : '+ Ajouter'}
        </button>
      </div>

      {open && (
        <div className="mt-4 flex gap-2">
          <input
            autoFocus
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="Nom de la stratégie"
            className="flex-1 border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none placeholder:text-[#8a8a8e]"
          />
          <button onClick={add} className="text-[#0a84ff]">
            OK
          </button>
        </div>
      )}

      <div className="mt-6">
        {strategies.map((s) => (
          <ListRow key={s.id} to={`/strategies/${s.id}`} title={s.nom} />
        ))}
        {strategies.length === 0 && <p className="py-3 text-[#8a8a8e]">Aucune stratégie.</p>}
      </div>
    </div>
  );
}
