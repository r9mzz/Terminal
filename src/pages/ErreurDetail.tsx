import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import db, { type Erreur } from '../db';

export default function ErreurDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const erreur = useLiveQuery(() => db.erreurs.get(Number(id)), [id]);

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [solution, setSolution] = useState('');

  useEffect(() => {
    if (erreur) {
      setTitre(erreur.titre);
      setDescription(erreur.description);
      setSolution(erreur.solution);
    }
  }, [erreur]);

  if (!erreur) return null;

  async function save(fields: Partial<Erreur>) {
    await db.erreurs.update(Number(id), fields);
  }

  async function incrementer() {
    await db.erreurs.update(Number(id), { occurrences: erreur!.occurrences + 1 });
  }

  async function supprimer() {
    await db.erreurs.delete(Number(id));
    navigate('/erreurs');
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <input
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        onBlur={() => save({ titre })}
        className="block w-full bg-transparent text-2xl text-[#f5f5f7] outline-none"
      />

      <div className="mt-6">
        <div className="text-sm text-[#8a8a8e]">Description / Pourquoi je fais cette erreur</div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => save({ description })}
          rows={5}
          className="mt-2 w-full resize-none border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none"
        />
      </div>

      <div className="mt-6">
        <div className="text-sm text-[#8a8a8e]">Comment l'éviter</div>
        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          onBlur={() => save({ solution })}
          rows={5}
          className="mt-2 w-full resize-none border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none"
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <div className="text-sm text-[#8a8a8e]">Occurrences</div>
          <div className="text-3xl text-[#f5f5f7]">{erreur.occurrences}</div>
        </div>
        <button onClick={incrementer} className="text-[#0a84ff]">
          + Ajouter un exemple
        </button>
      </div>

      <button onClick={supprimer} className="mt-10 text-sm text-[#8a8a8e]">
        Supprimer cette erreur
      </button>
    </div>
  );
}
