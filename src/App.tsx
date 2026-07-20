import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import SearchOverlay from './components/Search';
import { isDatabaseEmpty, seedDatabase } from './seed';
import Home from './pages/Home';
import Erreurs from './pages/Erreurs';
import ErreurDetail from './pages/ErreurDetail';
import Concepts from './pages/Concepts';
import ConceptDetail from './pages/ConceptDetail';
import Strategies from './pages/Strategies';
import StrategieDetail from './pages/StrategieDetail';
import Journal from './pages/Journal';
import Ressources from './pages/Ressources';

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('terminal_seeded')) return;
    localStorage.setItem('terminal_seeded', '1');
    isDatabaseEmpty().then((empty) => {
      if (empty) seedDatabase();
    });
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <BrowserRouter basename="/Terminal">
      <Sidebar onSearch={() => setSearchOpen(true)} />

      <div className="md:pl-64">
        <button
          onClick={() => setSearchOpen(true)}
          className="fixed right-4 top-6 z-40 text-sm text-zinc-500 md:hidden"
        >
          Rechercher
        </button>

        <div className="mx-auto max-w-5xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/erreurs" element={<Erreurs />} />
            <Route path="/erreurs/:id" element={<ErreurDetail />} />
            <Route path="/concepts" element={<Concepts />} />
            <Route path="/concepts/:id" element={<ConceptDetail />} />
            <Route path="/strategies" element={<Strategies />} />
            <Route path="/strategies/:id" element={<StrategieDetail />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/ressources" element={<Ressources />} />
          </Routes>
        </div>
      </div>

      <Nav />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </BrowserRouter>
  );
}

export default App;
