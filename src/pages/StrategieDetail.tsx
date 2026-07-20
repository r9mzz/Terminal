import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import db from '../db';

const FIELDS: { key: 'objectif' | 'conditions' | 'etapes'; label: string }[] = [
  { key: 'objectif', label: 'Objectif' },
  { key: 'conditions', label: 'Conditions / Horaires' },
  { key: 'etapes', label: 'Entrée, Stop, TP, Invalidation' },
];

export default function StrategieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const strategie = useLiveQuery(() => db.strategies.get(Number(id)), [id]);
  const [nom, setNom] = useState('');
  const [values, setValues] = useState({ objectif: '', conditions: '', etapes: '' });
  const [checklistText, setChecklistText] = useState('');

  useEffect(() => {
    if (strategie) {
      setNom(strategie.nom);
      setValues({
        objectif: strategie.objectif,
        conditions: strategie.conditions,
        etapes: strategie.etapes,
      });
      setChecklistText(strategie.checklist.join('\n'));
    }
  }, [strategie]);

  if (!strategie) return null;

  async function save(overrides: Partial<{ nom: string }> = {}) {
    await db.strategies.update(Number(id), {
      nom,
      ...values,
      checklist: checklistText.split('\n').filter(Boolean),
      ...overrides,
    });
  }

  async function supprimer() {
    await db.strategies.delete(Number(id));
    navigate('/strategies');
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <input
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        onBlur={() => save({ nom })}
        className="block w-full bg-transparent text-2xl text-[#f5f5f7] outline-none"
      />

      {FIELDS.map((f) => (
        <div key={f.key} className="mt-6">
          <div className="text-sm text-[#8a8a8e]">{f.label}</div>
          <textarea
            value={values[f.key]}
            onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
            onBlur={() => save()}
            rows={3}
            className="mt-2 w-full resize-none border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none"
          />
        </div>
      ))}

      <div className="mt-6">
        <div className="text-sm text-[#8a8a8e]">Checklist (une ligne par item)</div>
        <textarea
          value={checklistText}
          onChange={(e) => setChecklistText(e.target.value)}
          onBlur={() => save()}
          rows={5}
          className="mt-2 w-full resize-none border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none"
        />
      </div>

      <button onClick={supprimer} className="mt-10 text-sm text-[#8a8a8e]">
        Supprimer cette stratégie
      </button>
    </div>
  );
}
