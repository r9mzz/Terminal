import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import db from '../db';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
}

export default function Journal() {
  const entries = useLiveQuery(() => db.journal.orderBy('date').reverse().toArray(), []) ?? [];
  const [texte, setTexte] = useState('');

  async function add() {
    if (!texte.trim()) return;
    await db.journal.add({ date: new Date().toISOString(), contenu: texte });
    setTexte('');
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <h1 className="text-2xl text-[#f5f5f7]">Journal</h1>

      <div className="mt-6">
        <textarea
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="Aujourd'hui..."
          rows={4}
          className="w-full resize-none border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none placeholder:text-[#8a8a8e]"
        />
        <button onClick={add} className="mt-2 text-[#0a84ff]">
          Enregistrer
        </button>
      </div>

      <div className="mt-10">
        {entries.map((e) => (
          <div key={e.id} className="border-b border-[#1c1c1e] py-5">
            <div className="text-sm text-[#8a8a8e]">{formatDate(e.date)}</div>
            <p className="mt-2 whitespace-pre-wrap text-[#f5f5f7]">{e.contenu}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
