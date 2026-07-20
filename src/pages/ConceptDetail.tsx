import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import db, { type Concept } from '../db';
import { CATEGORIES } from '../categories';

export default function ConceptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const concept = useLiveQuery(() => db.concepts.get(Number(id)), [id]);
  const [titre, setTitre] = useState('');
  const [categorie, setCategorie] = useState('');
  const [contenu, setContenu] = useState('');

  useEffect(() => {
    if (concept) {
      setTitre(concept.titre);
      setCategorie(concept.categorie);
      setContenu(concept.contenu);
    }
  }, [concept]);

  if (!concept) return null;

  async function save(fields: Partial<Concept>) {
    await db.concepts.update(Number(id), fields);
  }

  async function supprimer() {
    await db.concepts.delete(Number(id));
    navigate('/concepts');
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <select
        value={categorie}
        onChange={(e) => {
          setCategorie(e.target.value);
          save({ categorie: e.target.value });
        }}
        className="border-none bg-transparent text-sm text-[#8a8a8e] outline-none"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c} className="bg-[#0b0b0c]">
            {c}
          </option>
        ))}
      </select>

      <input
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        onBlur={() => save({ titre })}
        className="block w-full bg-transparent text-2xl text-[#f5f5f7] outline-none"
      />

      {concept.images.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          {concept.images.map((src) => (
            <img key={src} src={src} alt={concept.titre} className="w-full rounded-lg border border-[#1c1c1e]" />
          ))}
        </div>
      )}

      <textarea
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
        onBlur={() => save({ contenu })}
        rows={14}
        placeholder="Définition, explication, conditions, invalidation, exemple, sources, notes personnelles..."
        className="mt-6 w-full resize-none border-b border-[#1c1c1e] bg-transparent py-2 text-[#f5f5f7] outline-none placeholder:text-[#8a8a8e]"
      />

      <button onClick={supprimer} className="mt-10 text-sm text-[#8a8a8e]">
        Supprimer ce concept
      </button>
    </div>
  );
}
