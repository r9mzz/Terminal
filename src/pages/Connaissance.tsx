import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FileText, Plus, ChevronRight, BookOpen } from 'lucide-react';
import db, { ROOT, type Page } from '../db';
import EmptyState from '../components/EmptyState';

async function getBreadcrumb(pageId: number): Promise<Page[]> {
  const trail: Page[] = [];
  let current = await db.pages.get(pageId);
  while (current) {
    trail.unshift(current);
    if (current.parentId === ROOT) break;
    current = await db.pages.get(current.parentId);
  }
  return trail;
}

async function deleteRecursive(pageId: number) {
  const children = await db.pages.where('parentId').equals(pageId).toArray();
  for (const child of children) {
    if (child.id) await deleteRecursive(child.id);
  }
  await db.pages.delete(pageId);
}

export default function Connaissance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageId = id ? Number(id) : ROOT;

  const page = useLiveQuery(() => (pageId !== ROOT ? db.pages.get(pageId) : undefined), [pageId]);
  const breadcrumb = useLiveQuery(() => (pageId !== ROOT ? getBreadcrumb(pageId) : Promise.resolve([])), [pageId]) ?? [];
  const children = useLiveQuery(() => db.pages.where('parentId').equals(pageId).toArray(), [pageId]) ?? [];

  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [creating, setCreating] = useState(false);
  const [newTitre, setNewTitre] = useState('');

  useEffect(() => {
    if (page) {
      setTitre(page.titre);
      setContenu(page.contenu);
    } else if (pageId === ROOT) {
      setTitre('');
      setContenu('');
    }
  }, [page, pageId]);

  if (pageId !== ROOT && page === undefined) return null;

  async function save(fields: Partial<Page>) {
    if (pageId === ROOT) return;
    await db.pages.update(pageId, fields);
  }

  async function creerSousPage() {
    if (!newTitre.trim()) return;
    const newId = await db.pages.add({
      parentId: pageId,
      titre: newTitre,
      contenu: '',
      date: new Date().toISOString(),
    });
    setNewTitre('');
    setCreating(false);
    navigate(`/connaissance/${newId}`);
  }

  async function supprimer() {
    if (pageId === ROOT) return;
    const parentId = page?.parentId ?? ROOT;
    await deleteRecursive(pageId);
    navigate(parentId === ROOT ? '/connaissance' : `/connaissance/${parentId}`);
  }

  return (
    <div className="px-4 pb-24 pt-8 md:px-8 md:pb-12 md:pt-10">
      <div className="flex items-center gap-2 text-indigo-400">
        <BookOpen size={18} />
        <span className="text-xs font-medium uppercase tracking-wide">Connaissance</span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1 text-sm text-zinc-500">
        <Link to="/connaissance" className="transition-colors duration-200 hover:text-zinc-300">
          Racine
        </Link>
        {breadcrumb.map((p) => (
          <span key={p.id} className="flex items-center gap-1">
            <ChevronRight size={13} />
            <Link to={`/connaissance/${p.id}`} className="transition-colors duration-200 hover:text-zinc-300">
              {p.titre}
            </Link>
          </span>
        ))}
      </div>

      {pageId === ROOT ? (
        <h1 className="mt-3 text-2xl font-medium text-zinc-100">Toutes mes connaissances</h1>
      ) : (
        <input
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          onBlur={() => save({ titre })}
          className="mt-3 block w-full bg-transparent text-2xl font-medium text-zinc-100 outline-none"
        />
      )}

      {pageId !== ROOT && (
        <textarea
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          onBlur={() => save({ contenu })}
          rows={8}
          placeholder="Écris tout ce que tu veux ici..."
          className="mt-4 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-700"
        />
      )}

      <div className="mt-8 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-600">
          {children.length === 0 ? 'Sous-pages' : `${children.length} sous-page${children.length > 1 ? 's' : ''}`}
        </span>
        <button
          onClick={() => setCreating((c) => !c)}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-300 transition-colors duration-200 hover:border-zinc-700"
        >
          <Plus size={15} />
          Nouvelle page
        </button>
      </div>

      {creating && (
        <div className="mt-4 flex gap-2">
          <input
            autoFocus
            value={newTitre}
            onChange={(e) => setNewTitre(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && creerSousPage()}
            placeholder="Titre de la page"
            className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-700"
          />
          <button
            onClick={creerSousPage}
            className="rounded-lg bg-[#0a84ff] px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            Créer
          </button>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {children.map((c) => (
          <Link
            key={c.id}
            to={`/connaissance/${c.id}`}
            className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div className="flex items-center gap-2 text-zinc-500">
              <FileText size={15} />
              <span className="text-base font-medium text-zinc-100">{c.titre}</span>
            </div>
            {c.contenu && <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{c.contenu}</p>}
          </Link>
        ))}
      </div>

      {children.length === 0 && !creating && (
        <div className="mt-4">
          <EmptyState
            icon={FileText}
            title="Aucune sous-page"
            description="Crée ta première page pour commencer à écrire tes connaissances."
          />
        </div>
      )}

      {pageId !== ROOT && (
        <button onClick={supprimer} className="mt-10 text-sm text-zinc-600 transition-colors duration-200 hover:text-rose-400">
          Supprimer cette page {children.length > 0 ? 'et ses sous-pages' : ''}
        </button>
      )}
    </div>
  );
}
