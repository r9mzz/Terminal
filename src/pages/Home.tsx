import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import db from '../db';

export default function Home() {
  const lastConcepts = useLiveQuery(() => db.concepts.orderBy('date').reverse().limit(4).toArray(), []) ?? [];
  const topErreur = useLiveQuery(
    () => db.erreurs.orderBy('occurrences').reverse().first(),
    []
  );

  return (
    <div className="px-4 pb-24 pt-8">
      <h1 className="text-3xl text-[#f5f5f7]">Terminal</h1>

      {topErreur && (
        <Link to={`/erreurs/${topErreur.id}`} className="mt-8 block">
          <div className="text-sm text-[#8a8a8e]">Erreur récurrente</div>
          <div className="mt-1 text-xl text-[#f5f5f7]">{topErreur.titre}</div>
          <div className="mt-1 text-sm text-[#8a8a8e]">{topErreur.occurrences} exemples</div>
        </Link>
      )}

      <div className="mt-10">
        <div className="text-sm text-[#8a8a8e]">Derniers concepts ouverts</div>
        <div className="mt-2">
          {lastConcepts.map((c) => (
            <Link key={c.id} to={`/concepts/${c.id}`} className="block border-b border-[#1c1c1e] py-3">
              <span className="text-lg text-[#f5f5f7]">{c.titre}</span>
            </Link>
          ))}
          {lastConcepts.length === 0 && (
            <p className="py-3 text-[#8a8a8e]">Rien pour l'instant.</p>
          )}
        </div>
      </div>
    </div>
  );
}
