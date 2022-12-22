import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Announcement from './pages/Announcement';
import LoginUser from './pages/login';
import Dashboard_con from './pages/Users/Dashboard_con';
import Users_con from './pages/Users/Users_con';
import AddUsers from './pages/Users/AddUsers';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pengumuman" element={<Announcement />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/dashboard" element={<Dashboard_con />} />
          <Route path="/dashboard/users" element={<Users_con />} />
          <Route path="dashboard/users/add" element={<AddUsers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
