import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Announcement from './pages/Announcement';
import LoginUser from './pages/login';
import Dashboard_con from './pages/Users/Dashboard_con';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pengumuman" element={<Announcement />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/dashboard" element={<Dashboard_con />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
