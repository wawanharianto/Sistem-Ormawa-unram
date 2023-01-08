import React, { useState } from 'react';
import './Navbar.css';
import 'animate.css';

const Navbar = () => {
  const [isChecked, setisChecked] = useState(false);

  const handleChecked = (e) => {
    const burger = document.getElementsByClassName('menuside')[0];
    // console.log(burger);
    if (e.target.checked) {
      // console.log(e.target.checked);
      burger.classList.toggle('menuon');
    } else {
      burger.classList.toggle('menuon');
    }
  };
  return (
    <>
      <nav className="navContainer">
        <h1>
          <a href="/">ORMAWA</a>
          <i class="fa-solid fa-circle" />
        </h1>

        <ul className="menuside">
          <li>
            <a href="/">Beranda</a>
          </li>
          <li>
            <a href="Pengumuman">Pengumuman</a>
          </li>
          <li>
            <a href="login">Login</a>
          </li>
        </ul>
        <div className="showoff-nav">
          <div className="burger-button ">
            <input id="menu-toggle" type="checkbox" value={isChecked} onChange={handleChecked} />
            <label class="menu-button-container" for="menu-toggle">
              <div class="menu-button"></div>
            </label>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
