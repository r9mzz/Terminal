import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Search, Terminal } from 'lucide-react';

const links = [
  { to: '/', label: 'Accueil', icon: Home, end: true },
  { to: '/connaissance', label: 'Connaissance', icon: BookOpen, end: false },
];

export default function Sidebar({ onSearch }: { onSearch: () => void }) {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-zinc-800 bg-zinc-950/60 px-4 py-6 md:flex">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a84ff]/15 text-[#0a84ff]">
          <Terminal size={18} />
        </div>
        <span className="text-lg font-medium text-zinc-100">Terminal</span>
      </div>

      <button
        onClick={onSearch}
        className="mt-6 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-500 transition-colors duration-200 hover:border-zinc-700 hover:text-zinc-300"
      >
        <Search size={15} />
        Rechercher
        <kbd className="ml-auto rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[10px] text-zinc-600">
          /
        </kbd>
      </button>

      <nav className="mt-6 flex flex-1 flex-col gap-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                isActive
                  ? 'bg-zinc-800/60 text-zinc-100'
                  : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Local · sauvegarde automatique
      </div>
    </aside>
  );
}
