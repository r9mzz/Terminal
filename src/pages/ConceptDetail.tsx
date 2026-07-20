import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import db from '../db';

export default function ConceptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const concept = useLiveQuery(() => db.concepts.get(Number(id)), [id]);
  const [contenu, setContenu] = useState('');

  useEffect(() => {
    if (concept) setContenu(concept.contenu);
  }, [concept]);

  if (!concept) return null;

  async function save() {
    await db.concepts.update(Number(id), { contenu });
  }

  async function supprimer() {
    await db.concepts.delete(Number(id));
    navigate('/concepts');
  }

  return (
    <div className="px-4 pb-24 pt-8">
      <div className="text-sm text-[#8a8a8e]">{concept.categorie}</div>
      <h1 className="text-2xl text-[#f5f5f7]">{concept.titre}</h1>

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
        onBlur={save}
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
