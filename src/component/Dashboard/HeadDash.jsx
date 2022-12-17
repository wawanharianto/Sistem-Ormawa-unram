import React from 'react';
import './HeadDash.css';

function HeadDash() {
  return (
    <>
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
      {/* side bar */}

      <div className="SideDash">
        <div className="c-SideDash">
          <img src="" alt="" />
          <p>Nama Ormawa</p>
          <div className="sideDash-f">
            <div className="icon select-f">
              <i class="fa-solid fa-qrcode" />
              <p>Dashboard</p>
            </div>
            <div className="icon">
              <i class="fa-solid fa-file-circle-plus"></i>
              <p>Pengajuan Proposal</p>
            </div>
            <div className="icon">
              <i class="fa-regular fa-file-lines"></i>
              <p>LPJ</p>
            </div>
            <div className="icon">
              <i class="fa-regular fa-file"></i>
              <p>SPJ</p>
            </div>
            <div className="icon">
              <i class="fa-solid fa-folder-tree"></i>
              <p>Arsip</p>
            </div>
            <div className="icon">
              <i class="fa-solid fa-user"></i>
              <p>Users</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadDash;
