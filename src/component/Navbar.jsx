import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navContainer">
      <h1>
        <a href="/">ORMAWA</a>
        <i class="fa-solid fa-circle" />
      </h1>
      <ul>
        <li>
          <a href="dashboard">Beranda</a>
        </li>
        <li>
          <a href="Pengumuman">Pengumuman</a>
        </li>
        <li>
          <a href="login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
