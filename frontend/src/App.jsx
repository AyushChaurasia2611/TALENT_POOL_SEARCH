import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Upload from './pages/Upload';
import Search from './pages/Search';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <div className="header-inner">
            <div className="logo">
              <span className="logo-icon">🎯</span>
              <span className="logo-text">TalentPool</span>
            </div>
            <nav className="app-nav">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="nav-icon">⬆️</span> Upload
              </NavLink>
              <NavLink to="/search" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="nav-icon">🔍</span> Search
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
