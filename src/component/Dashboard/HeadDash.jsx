import React from 'react';
import './HeadDash.css';

function HeadDash() {
  return (
    <div className="HeadDash on-burger">
      <div className="burger-button">
        <input id="menu-toggle" type="checkbox" />
        <label class="menu-button-container" for="menu-toggle">
          <div class="menu-button"></div>
        </label>
      </div>
      <h1>
        ORMAWA
        <i class="fa-solid fa-circle" />
      </h1>
      <div className="backBeranda">
        <i class="fa-solid fa-house"></i>
        <p>Beranda</p>

        <a href="/">
          <i class="fa-solid fa-right-from-bracket"></i>
        </a>
      </div>
    </div>
  );
}

export default HeadDash;
