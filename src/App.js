import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Announcement from './pages/Announcement';
import LoginUser from './pages/login';
import Dashboard_con from './pages/Users/Dashboard_con';
import Users_con from './pages/Users/Users_con';
import AddUsers from './pages/Users/AddUsers';
import AddProposal from './pages/Users/AddProposal';
import PengajuanProposal_con from './pages/Users/PengajuanProposal_con';
import Register from './component/Dashboard/Users/Register/Register';
import ApproveProposal from './pages/Users/ApproveProposal';
import PengajuanDana from './pages/Users/PengajuanDana';

import LPJ from './pages/Users/LPJ';
import SPJ from './pages/Users/SPJ';
import AddPengajuanDana from './pages/Users/AddPengajuanDana';
import UpdateUsers from './pages/Users/EditUsers';
import UpdateProposals from './pages/Users/EditProposal';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pengumuman" element={<Announcement />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/dashboard" element={<Dashboard_con />} />
          <Route path="users" element={<Users_con />} />
          <Route path="users/add" element={<AddUsers />} />
          <Route path="users/edit/:uuid" element={<UpdateUsers />} />
          <Route path="pengajuan-proposal" element={<PengajuanProposal_con />} />
          <Route path="pengajuan-proposal/add" element={<AddProposal />} />
          <Route path="proposal/edit/:uuid" element={<UpdateProposals />} />
          <Route path="register" element={<Register />} />
          <Route path="approve-proposal" element={<ApproveProposal />} />
          <Route path="pengajuan-dana" element={<PengajuanDana />} />
          <Route path="pengajuan-dana/add" element={<AddPengajuanDana />} />
          <Route path="LPJ" element={<LPJ />} />
          <Route path="SPJ" element={<SPJ />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
