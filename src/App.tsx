import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import SearchOverlay from './components/Search';
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

  return (
    <BrowserRouter>
      <div className="mx-auto max-w-xl">
        <button
          onClick={() => setSearchOpen(true)}
          className="fixed right-4 top-6 z-40 text-sm text-[#8a8a8e]"
        >
          Rechercher
        </button>

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

        <Nav />
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
