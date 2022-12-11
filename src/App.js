import './App.css';
import Navbar from './component/Navbar';
import Content from './component/Content';
import Footer from './component/Footer';
import Login from './component/Login/Login';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
import Pengumuman from './component/Pengumuman/Pengumuman';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pengumuman" element={<Pengumuman />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
