import './App.css';
import Navbar from './component/Navbar';
import Content from './component/Content';
import Footer from './component/Footer';
import Login from './component/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pengumuman from './component/Pengumuman/Pengumuman';
//Dashboard
import HeadDash from './component/Dashboard/HeadDash';

import SideDash from './component/Dashboard/SideDash';
import Dashboard from './component/Dashboard/Content/Dasboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/pengumuman" element={<Navbar />} />
          <Route path="/login" element={<Navbar />} />
        </Routes>
      </Router>
      <Router>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pengumuman" element={<Pengumuman />} />
          <Route
            path="/dashboard"
            element={
              <>
                <HeadDash />
                <Dashboard />
                <SideDash />
              </>
            }
          />
        </Routes>
      </Router>
      <Router>
        <Routes>
          <Route path="/" element={<Footer />} />
          <Route path="/pengumuman" element={<Footer />} />
          <Route path="/login" element={<Footer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
