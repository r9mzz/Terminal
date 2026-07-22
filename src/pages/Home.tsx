import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BookOpen, FileText, ArrowRight, Download } from 'lucide-react';
import db from '../db';
import EmptyState from '../components/EmptyState';
import { isImportPending, runImport } from '../importData';

export default function Home() {
  const recent = useLiveQuery(() => db.pages.orderBy('date').reverse().limit(6).toArray(), []) ?? [];
  const total = useLiveQuery(() => db.pages.count(), []) ?? 0;
  const [pendingImport, setPendingImport] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    isImportPending().then(setPendingImport);
  }, []);

  async function importer() {
    setImporting(true);
    await runImport();
    setPendingImport(false);
    setImporting(false);
  }

  return (
    <div className="px-4 pb-24 pt-8 md:px-8 md:pb-12 md:pt-10">
      <h1 className="text-3xl font-medium text-zinc-100">Terminal</h1>
      <p className="mt-1 text-sm text-zinc-500">Ton second cerveau. Écris, organise, retrouve.</p>

      {pendingImport && (
        <button
          onClick={importer}
          disabled={importing}
          className="mt-6 flex w-full items-center gap-3 rounded-xl border border-emerald-800/50 bg-emerald-500/10 p-4 text-left transition-colors duration-200 hover:border-emerald-700 disabled:opacity-50"
        >
          <Download size={18} className="shrink-0 text-emerald-400" />
          <div>
            <div className="text-sm font-medium text-emerald-300">
              {importing ? 'Import en cours...' : 'Importer les notes triées du groupe'}
            </div>
            <div className="text-xs text-emerald-500/80">3 pages : trade, macro, habitudes de session</div>
          </div>
        </button>
      )}

      <Link
        to="/connaissance"
        className="mt-8 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <BookOpen size={18} />
          </div>
          <div>
            <div className="text-base font-medium text-zinc-100">Connaissance</div>
            <div className="text-sm text-zinc-500">{total} page{total > 1 ? 's' : ''}</div>
          </div>
        </div>
        <ArrowRight size={18} className="text-zinc-600" />
      </Link>

      <div className="mt-8">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-600">Récemment modifié</span>

        {recent.length > 0 ? (
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recent.map((p) => (
              <Link
                key={p.id}
                to={`/connaissance/${p.id}`}
                className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
              >
                <FileText size={15} className="shrink-0 text-zinc-500" />
                <span className="truncate text-base font-medium text-zinc-100">{p.titre}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-3">
            <EmptyState
              icon={FileText}
              title="Rien pour l'instant"
              description="Ouvre Connaissance pour créer ta première page."
            />
          </div>
        )}
      </div>
    </div>
  );
}
