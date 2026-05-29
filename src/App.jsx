import { Toaster } from "./components/ui/toaster";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// 1. Import hook useIsMobile
import { useIsMobile } from './hooks/use-mobile';

import PageNotFound from './lib/PageNotFound';
import Landing from './pages/Landing';
import Upload from './pages/Upload';
import Results from './pages/Results';

function App() {
  // 2. Panggil hook di dalam komponen utama
  const isMobile = useIsMobile();

  return (
    // 3. Gunakan isMobile untuk mengatur wrapper pembungkus layar
    <div className={isMobile ? "w-full min-h-screen overflow-x-hidden" : "max-w-7xl mx-auto min-h-screen relative shadow-sm"}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;