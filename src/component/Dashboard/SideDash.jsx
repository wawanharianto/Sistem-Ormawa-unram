import React from 'react';
import './SideDash.css';

function SideDash() {
  return (
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
  );
}

export default SideDash;
