import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import SearchOverlay from './components/Search';
import Home from './pages/Home';
import Connaissance from './pages/Connaissance';

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

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
            <Route path="/connaissance" element={<Connaissance />} />
            <Route path="/connaissance/:id" element={<Connaissance />} />
          </Routes>
        </div>
      </div>

      <Nav />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </BrowserRouter>
  );
}

export default App;
