import Navbar from './component/Navbar';
import Content from './component/Content';
import Footer from './component/Footer';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Pengumuman from './component/Pengumuman/Pengumuman';
//Dashboard
import HeadDash from './component/Dashboard/HeadDash';
import Dashboard from './component/Dashboard/Content/Dasboard';
import Register from './component/Register/Register';
import Home from './pages/home';
import Announcement from './pages/Announcement';
import LoginUser from './pages/login';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pengumuman" element={<Announcement />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/dashboard" element={<>
          <HeadDash/>
          <Dashboard/>
        </>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
