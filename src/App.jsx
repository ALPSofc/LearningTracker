import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import MinhasMetas from './pages/MinhasMetas.jsx';
import Statistics from './pages/Statistics.jsx';
import Settings from './pages/Settings.jsx';
import About from './pages/About.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route index element={<Home />} />
          <Route path="minhasmetas" element={<MinhasMetas />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={
            <div className="text-center p-12">
              <h1 className="text-3xl font-bold">404</h1>
              <p>Página não encontrada</p>
            </div>
          } /> 
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;