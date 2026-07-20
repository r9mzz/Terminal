import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/connaissance', label: 'Connaissance' },
];

export default function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-sm md:hidden">
      <ul className="flex justify-between overflow-x-auto px-2 py-3 text-xs">
        {links.map((l) => (
          <li key={l.to} className="flex-1 text-center">
            <NavLink
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `block px-2 py-1 transition-colors duration-300 ${
                  isActive ? 'text-[#0a84ff]' : 'text-[#8a8a8e]'
                }`
              }
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
